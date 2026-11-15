import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { chromium, expect, test, type Page } from '@playwright/test';

interface PuzzleOptions {
  clueCount: number;
  seed: number;
}

interface CellCoordinates {
  row: string;
  col: string;
}

interface RawCellCoordinates {
  row: string | null;
  col: string | null;
}

function requireCellCoordinates(
  coordinates: RawCellCoordinates | null,
  description: string
): CellCoordinates {
  if (!coordinates || coordinates.row === null || coordinates.col === null) {
    throw new Error(`${description} is missing row/column metadata.`);
  }

  return {
    row: coordinates.row,
    col: coordinates.col
  };
}

async function openEnglishPage(page: Page): Promise<void> {
  await page.goto('/');
  await page.selectOption('#lang', 'en');
  await expect(page.locator('#help')).toHaveText('Help');
}

async function generatePuzzle(page: Page, { clueCount, seed }: PuzzleOptions): Promise<void> {
  await page.selectOption('#clueCount', String(clueCount));
  await page.locator('#seed').fill(String(seed));
  await page.locator('#newGame').click();
}

async function readBoard(page: Page): Promise<string[]> {
  return page.locator('#board .cell').evaluateAll((cells) => (
    cells.map((cell) => (cell.textContent ?? '').trim())
  ));
}

async function getFirstEmptyCell(page: Page): Promise<CellCoordinates> {
  const emptyCell = await page.locator('#board .cell').evaluateAll((cells): RawCellCoordinates | null => {
    const target = cells.find((cell) => (cell.textContent ?? '').trim() === '');
    return target ? {
      row: target.getAttribute('data-row'),
      col: target.getAttribute('data-col')
    } : null;
  });

  if (!emptyCell) {
    throw new Error('No empty cell was found.');
  }

  return requireCellCoordinates(emptyCell, 'Empty cell');
}

async function getFirstEmptyCells(page: Page, count: number): Promise<CellCoordinates[]> {
  const cells = await page.locator('#board .cell').evaluateAll((allCells, amount): RawCellCoordinates[] => (
    allCells
      .filter((cell) => (cell.textContent ?? '').trim() === '')
      .slice(0, amount)
      .map((cell) => ({
        row: cell.getAttribute('data-row'),
        col: cell.getAttribute('data-col')
      }))
  ), count);

  if (cells.length < count) {
    throw new Error(`Only found ${cells.length} empty cells.`);
  }

  return cells.map((cell, index) => requireCellCoordinates(cell, `Empty cell ${index}`));
}

async function getVisibleNotes(page: Page, row: string, col: string): Promise<string> {
  return page.locator(`#board .cell[data-row="${row}"][data-col="${col}"]`).evaluate((cell) => (
    Array.from(cell.querySelectorAll('.notes span'))
      .map((span) => span.textContent ?? '')
      .join('')
  ));
}

test('help dialog exposes the built-in guide and repository link', async ({ page }) => {
  await openEnglishPage(page);

  await page.locator('#help').click();
  await expect(page.locator('#helpDialog')).toBeVisible();
  await expect(page.locator('#helpTitle')).toHaveText('How to Play');
  await expect(page.locator('#helpContent')).toContainText('Seed');
  await expect(page.locator('#helpContent')).toContainText('Internet connection required');
  await expect(page.locator('#helpContent a[href="https://github.com/piccoripico/sudoku-html"]')).toBeVisible();

  await page.locator('#helpClose').click();
  await expect(page.locator('#helpOverlay')).toBeHidden();
});

test('the same seed and clue count reproduce the same puzzle', async ({ page }) => {
  await openEnglishPage(page);

  await generatePuzzle(page, { clueCount: 24, seed: 123456 });
  const firstBoard = await readBoard(page);

  await generatePuzzle(page, { clueCount: 24, seed: 123456 });
  const secondBoard = await readBoard(page);

  expect(secondBoard).toEqual(firstBoard);
});

test('Ctrl+Shift+Z redoes an undone entry', async ({ page }) => {
  await openEnglishPage(page);
  await generatePuzzle(page, { clueCount: 24, seed: 314159 });

  const target = await getFirstEmptyCell(page);
  const cell = page.locator(`#board .cell[data-row="${target.row}"][data-col="${target.col}"]`);
  await cell.click();

  await page.keyboard.press('1');
  await expect(cell).toHaveText('1');

  await page.keyboard.press('Control+Z');
  await expect(cell).toHaveText('');

  await page.keyboard.press('Control+Shift+Z');
  await expect(cell).toHaveText('1');
});

test('game keyboard shortcuts keep working after a pad button receives focus', async ({ page }) => {
  await openEnglishPage(page);
  await generatePuzzle(page, { clueCount: 24, seed: 271828 });

  const target = await getFirstEmptyCell(page);
  const cell = page.locator(`#board .cell[data-row="${target.row}"][data-col="${target.col}"]`);
  await cell.click();

  const oneButton = page.locator('#pad button.num').filter({ hasText: /^1$/ });
  await oneButton.click();
  await expect(cell).toHaveText('1');
  await expect(oneButton).toBeFocused();

  await page.keyboard.press('2');
  await expect(cell).toHaveText('2');

  await page.keyboard.press('Enter');
  await expect(cell).toHaveText('1');
  await expect(page.locator('#padModes .pad-action:not(.red-note)')).not.toHaveClass(/active/);
});

test('preference saving is opt-in for settings and both highlight toggles', async ({ page }) => {
  await openEnglishPage(page);

  const persistenceToggle = page.locator('#persistPreferences');
  const seedField = page.locator('#seedField');
  const seedInput = page.locator('#seed');

  await expect(page.locator('#seedLabel')).toHaveText('Seed (blank for random)');
  await expect(seedInput).toHaveAttribute('placeholder', 'Optional (blank for random)');
  await expect(page.locator('#preferenceSaveLabel')).toHaveText('Save settings');
  await expect(persistenceToggle).not.toBeChecked();

  await page.selectOption('#clueCount', '28');
  await seedInput.fill('424242');
  await page.selectOption('#theme', 'dark');
  await expect(seedField).toHaveClass(/seed-specified/);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);

  await page.reload();
  await expect(persistenceToggle).not.toBeChecked();
  await expect(page.locator('#clueCount')).toHaveValue('32');
  await expect(seedInput).toHaveValue('');
  await expect(page.locator('#theme')).toHaveValue('system');
  await expect(seedField).not.toHaveClass(/seed-specified/);

  await page.selectOption('#lang', 'en');
  await page.selectOption('#clueCount', '28');
  await seedInput.fill('424242');
  await page.selectOption('#theme', 'dark');
  await page.locator('#highlightSettings').click();
  await page.locator('#highlightCompletedToggle').uncheck();
  await page.locator('#highlightDuplicateToggle').uncheck();
  await page.locator('#highlightSettingsClose').click();
  await persistenceToggle.check();
  await expect(persistenceToggle).toBeChecked();

  const savedPreferences = await page.evaluate(() => ({
    enabled: localStorage.getItem('sudoku_preferences_enabled'),
    clues: localStorage.getItem('sudoku_clue_count'),
    seed: localStorage.getItem('sudoku_seed'),
    language: localStorage.getItem('sudoku_lang'),
    theme: localStorage.getItem('sudoku_theme'),
    highlightCompleted: localStorage.getItem('sudoku_highlight_completed'),
    highlightDuplicate: localStorage.getItem('sudoku_highlight_duplicate')
  }));
  expect(savedPreferences).toEqual({
    enabled: 'true',
    clues: '28',
    seed: '424242',
    language: 'en',
    theme: 'dark',
    highlightCompleted: 'false',
    highlightDuplicate: 'false'
  });

  await page.reload();
  await expect(persistenceToggle).toBeChecked();
  await expect(page.locator('#clueCount')).toHaveValue('28');
  await expect(seedInput).toHaveValue('424242');
  await expect(page.locator('#lang')).toHaveValue('en');
  await expect(page.locator('#theme')).toHaveValue('dark');
  await expect(seedField).toHaveClass(/seed-specified/);
  await page.locator('#highlightSettings').click();
  await expect(page.locator('#highlightCompletedToggle')).not.toBeChecked();
  await expect(page.locator('#highlightDuplicateToggle')).not.toBeChecked();
  await page.locator('#highlightSettingsClose').click();

  await persistenceToggle.uncheck();
  await expect(persistenceToggle).not.toBeChecked();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);

  await page.reload();
  await expect(persistenceToggle).not.toBeChecked();
  await expect(page.locator('#clueCount')).toHaveValue('32');
  await expect(seedInput).toHaveValue('');
  await expect(page.locator('#theme')).toHaveValue('system');
});

test('clear removes values and notes even while note mode is active', async ({ page }) => {
  await openEnglishPage(page);
  await generatePuzzle(page, { clueCount: 24, seed: 246810 });
  const noteButton = page.locator('#padModes .pad-action:not(.red-note)');

  const target = await getFirstEmptyCell(page);
  const cell = page.locator(`#board .cell[data-row="${target.row}"][data-col="${target.col}"]`);
  await cell.click();

  await page.keyboard.press('1');
  await expect(cell).toHaveText('1');

  await page.keyboard.press('Enter');
  await expect(noteButton).toHaveClass(/active/);
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(cell).toHaveText('');

  await cell.click();
  await page.keyboard.press('2');
  await expect.poll(() => getVisibleNotes(page, target.row, target.col)).toBe('2');
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect.poll(() => getVisibleNotes(page, target.row, target.col)).toBe('');
});

test('mobile viewport keeps the board and pad actions usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openEnglishPage(page);

  await expect(page.locator('#board')).toBeVisible();
  await expect(page.locator('#pad')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Red Note' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clear' })).toBeVisible();
});

test('save and load restore progress, notes, and undo history', async ({ page }) => {
  await openEnglishPage(page);
  await generatePuzzle(page, { clueCount: 24, seed: 13579 });

  const targets = await getFirstEmptyCells(page, 2);
  const valueTarget = targets[0];
  const noteTarget = targets[1];
  if (valueTarget === undefined || noteTarget === undefined) {
    throw new Error('Expected at least two empty cells for save/load coverage.');
  }
  const noteButton = page.locator('#padModes .pad-action:not(.red-note)');
  const valueCell = page.locator(`#board .cell[data-row="${valueTarget.row}"][data-col="${valueTarget.col}"]`);
  const noteCell = page.locator(`#board .cell[data-row="${noteTarget.row}"][data-col="${noteTarget.col}"]`);

  await valueCell.click();
  await page.keyboard.press('1');
  await expect(valueCell).toHaveText('1');

  await noteCell.click();
  await page.keyboard.press('Enter');
  await expect(noteButton).toHaveClass(/active/);
  await page.keyboard.press('2');
  await expect.poll(() => getVisibleNotes(page, noteTarget.row, noteTarget.col)).toBe('2');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Save' }).click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  if (downloadPath === null) {
    throw new Error('Playwright did not provide a download path.');
  }
  const saveText = await readFile(downloadPath, 'utf8');
  const savedJson: unknown = JSON.parse(saveText);

  expect(savedJson).toMatchObject({
    format: 'sudoku-html-save',
    version: 2
  });

  await generatePuzzle(page, { clueCount: 32, seed: 24680 });

  await page.locator('#loadFile').setInputFiles({
    name: 'saved-game.json',
    mimeType: 'application/json',
    buffer: Buffer.from(saveText, 'utf8')
  });

  await expect(page.locator('#status')).toHaveText('The saved state has been loaded.');
  await expect(valueCell).toHaveText('1');
  await expect.poll(() => getVisibleNotes(page, noteTarget.row, noteTarget.col)).toBe('2');
  await expect(page.locator('#stats')).toContainText('Clues: 24');
  await expect(page.locator('#stats')).toContainText('Seed: 13579');

  await page.getByRole('button', { name: 'Undo' }).click();
  await expect.poll(() => getVisibleNotes(page, noteTarget.row, noteTarget.col)).toBe('');
});


test('built single-file distribution runs directly from file://', async ({ page }) => {
  const singleFileUrl = pathToFileURL(path.resolve('dist', `Sudoku_v${(JSON.parse(await readFile('package.json', 'utf8')) as { version: string }).version}.html`)).href;
  await page.goto(singleFileUrl);

  await expect(page.locator('#board .cell')).toHaveCount(81);
  await page.selectOption('#lang', 'en');
  await expect(page.locator('#help')).toHaveText('Help');

  await generatePuzzle(page, { clueCount: 24, seed: 424242 });
  await expect(page.locator('#stats')).toContainText('Seed: 424242');
  const target = await getFirstEmptyCell(page);
  const cell = page.locator(`#board .cell[data-row="${target.row}"][data-col="${target.col}"]`);
  await cell.click();
  await page.keyboard.press('1');
  await expect(cell).toHaveText('1');
});

test('built unpacked extension registers its worker and initializes the Sudoku page', async () => {
  const extensionPath = path.resolve('dist', 'extension-chromium');
  const userDataDir = await mkdtemp(path.join(tmpdir(), 'sudoku-extension-'));
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chromium',
    headless: true,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`
    ]
  });

  try {
    let [worker] = context.serviceWorkers();
    worker ??= await context.waitForEvent('serviceworker');
    const extensionId = new URL(worker.url()).host;
    expect(extensionId).not.toBe('');

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    await expect(page.locator('#board .cell')).toHaveCount(81);
    await page.selectOption('#lang', 'en');
    await expect(page.locator('#help')).toHaveText('Help');
  } finally {
    await context.close();
    await rm(userDataDir, { recursive: true, force: true });
  }
});

test('main panel has exactly two Number Pad instructions and bulleted messages', async ({ page }) => {
  await openEnglishPage(page);
  await expect(page.locator('.panel #hintText li')).toHaveCount(2);
  await expect(page.locator('.panel #hintText')).toContainText('✏️ Note');
  await expect(page.locator('.panel #hintText')).toContainText('🔴 Red Note');
  await expect(page.locator('.panel #hintText')).not.toContainText('Use Clear to erase');
  await expect(page.locator('.message-panel #stats li')).toHaveCount(4);
  await expect(page.locator('.message-panel #stats li')).toHaveText([
    /Clues: /,
    /Seed: /,
    /Hints filled: /,
    /Solution shown: /
  ]);
  await expect(page.locator('.message-panel h2')).toHaveCount(0);
});

test('highlight dialog contains only two toggles and leaves original top settings in place', async ({ page }) => {
  await openEnglishPage(page);
  for (const id of ['clueCount', 'seed', 'lang', 'theme', 'persistPreferences']) {
    await expect(page.locator(`.settings-grid #${id}`)).toHaveCount(1);
  }
  await page.locator('#highlightSettings').click();
  await expect(page.locator('#highlightSettingsDialog')).toBeVisible();
  await expect(page.locator('#highlightSettingsDialog input[type="checkbox"]')).toHaveCount(2);
  await expect(page.locator('#highlightCompletedToggle')).toBeChecked();
  await expect(page.locator('#highlightDuplicateToggle')).toBeChecked();
  await page.keyboard.press('Escape');
  await expect(page.locator('#highlightSettingsOverlay')).toBeHidden();
});

test('completed numbers visual toggle does not change the completed puzzle', async ({ page }) => {
  await openEnglishPage(page);
  await page.locator('#solve').click();
  const original = await readBoard(page);
  await expect(page.locator('.cell.completed-number')).toHaveCount(81);
  await page.locator('#highlightSettings').click();
  await page.locator('#highlightCompletedToggle').uncheck();
  await expect(page.locator('.cell.completed-number')).toHaveCount(0);
  await expect.poll(() => readBoard(page)).toEqual(original);
  await page.locator('#highlightCompletedToggle').check();
  await expect(page.locator('.cell.completed-number')).toHaveCount(81);
});

test('header uses the new vector-derived icon with high contrast in light and dark themes', async ({ page }) => {
  await openEnglishPage(page);
  await expect(page.locator('header .brand-wordmark')).toHaveText('Sudoku');
  await expect(page.locator('header .brand-caption')).toContainText('数独');
  const size = await page.locator('header .brand-icon').evaluate((img) => (img as HTMLImageElement).naturalWidth);
  expect(size).toBe(128);
  await page.selectOption('#theme', 'light');
  await expect(page.locator('header .brand-wordmark')).toHaveCSS('color', 'rgb(15, 23, 42)');
  await page.selectOption('#theme', 'dark');
  await expect(page.locator('header .brand-wordmark')).toHaveCSS('color', 'rgb(248, 250, 252)');
});


test('Settings sits between Load and Help in the header', async ({ page }) => {
  await openEnglishPage(page);
  const headerButtons = page.locator('.utility-buttons > button');
  await expect(headerButtons).toHaveText(['Save', 'Load', 'Settings', 'Help']);
  await expect(page.locator('.panel #highlightSettings')).toHaveCount(0);
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.locator('#highlightSettingsDialog input[type="checkbox"]')).toHaveCount(2);
  await page.locator('#highlightSettingsClose').click();
  await expect(page.locator('#highlightSettingsOverlay')).toBeHidden();
});

test('Number Pad instructions match note mode, and statistics have the requested labels and order', async ({ page }) => {
  await openEnglishPage(page);
  await expect(page.locator('#hintText li')).toHaveText([
    '1–9: Enter a number.',
    '✏️ Note: Add notes. (🔴 Red Note or right-click: Add red notes.)'
  ]);
  await expect(page.locator('#stats li')).toHaveText([
    /Clues: /,
    /Seed: /,
    /Hints filled: /,
    /Solution shown: /
  ]);
});


test('timer font size stays constant when inherited base font size changes', async ({ page }) => {
  await openEnglishPage(page);
  const sizes = await page.locator('#timer').evaluate((element) => {
    const originalFontSize = document.body.style.fontSize;
    document.body.style.fontSize = '13px';
    const smallerBase = getComputedStyle(element).fontSize;
    document.body.style.fontSize = '20px';
    const largerBase = getComputedStyle(element).fontSize;
    document.body.style.fontSize = originalFontSize;
    return { smallerBase, largerBase };
  });
  expect(sizes).toEqual({ smallerBase: '16px', largerBase: '16px' });
});


test('desktop 920px viewport retains a 690px board and full header in both languages', async ({ page }) => {
  await page.setViewportSize({ width: 1420, height: 920 });
  await openEnglishPage(page);
  for (const language of ['en', 'ja']) {
    await page.selectOption('#lang', language);
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('#timer')).toBeVisible();
    const metrics = await page.evaluate(() => ({
      boardSize: document.getElementById('board')!.getBoundingClientRect().width,
      boardHeight: document.getElementById('board')!.getBoundingClientRect().height,
      scrollHeight: document.documentElement.scrollHeight,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    }));
    expect(metrics.boardSize).toBeGreaterThanOrEqual(688);
    expect(metrics.boardHeight).toBeCloseTo(metrics.boardSize, 0);
    expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.innerHeight + 1);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
  }
});

test('rounded board perimeter is drawn once without overlapping cell borders', async ({ page }) => {
  await openEnglishPage(page);
  await expect(page.locator('#board')).toHaveCSS('border-width', '2px');
  await expect(page.locator('#board')).toHaveCSS('border-radius', '14px');

  const edges = [
    { selector: '.cell[data-row="0"][data-col="0"]', side: 'Top' },
    { selector: '.cell[data-row="0"][data-col="0"]', side: 'Left' },
    { selector: '.cell[data-row="0"][data-col="8"]', side: 'Right' },
    { selector: '.cell[data-row="8"][data-col="0"]', side: 'Bottom' },
    { selector: '.cell[data-row="8"][data-col="8"]', side: 'Right' }
  ] as const;

  for (const edge of edges) {
    const width = await page.locator(`#board ${edge.selector}`).evaluate((cell, side) => (
      getComputedStyle(cell).getPropertyValue(`border-${side.toLowerCase()}-width`)
    ), edge.side);
    expect(width).toBe('0px');
  }

  const internal = await page.locator('#board .cell[data-row="3"][data-col="3"]').evaluate((cell) => ({
    top: getComputedStyle(cell).borderTopWidth,
    left: getComputedStyle(cell).borderLeftWidth
  }));
  expect(internal).toEqual({ top: '2px', left: '2px' });
});

test('header utility buttons have equal widths and status height is locale-independent', async ({ page }) => {
  await page.setViewportSize({ width: 1420, height: 920 });
  await page.goto('/');

  const measurements: Array<{ statusHeight: number; messageHeight: number; boardSize: number }> = [];
  for (const lang of ['en', 'ja']) {
    await page.selectOption('#lang', lang);
    const measured = await page.evaluate(() => {
      const headerButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.utility-buttons button'));
      const widths = headerButtons.map((button) => button.getBoundingClientRect().width);
      const status = document.querySelector<HTMLElement>('#status');
      const message = document.querySelector<HTMLElement>('.message-panel');
      const board = document.querySelector<HTMLElement>('#board');
      if (!status || !message || !board || widths.length !== 4) {
        throw new Error('The expected utility buttons, message card, and board are required.');
      }
      return {
        widths,
        overflow: headerButtons.some((button) => button.scrollWidth > button.clientWidth + 1),
        statusHeight: status.getBoundingClientRect().height,
        messageHeight: message.getBoundingClientRect().height,
        boardSize: board.getBoundingClientRect().width,
        pageScroll: document.documentElement.scrollHeight > window.innerHeight
      };
    });
    expect(Math.max(...measured.widths) - Math.min(...measured.widths)).toBeLessThanOrEqual(1);
    expect(measured.overflow).toBe(false);
    expect(measured.pageScroll).toBe(false);
    measurements.push(measured);
  }
  expect(measurements[0]?.statusHeight).toBe(measurements[1]?.statusHeight);
  expect(measurements[0]?.messageHeight).toBe(measurements[1]?.messageHeight);
  expect(measurements[0]?.boardSize).toBe(690);

  // Future translations must wrap inside equal-width buttons, not clip off-screen.
  await page.evaluate(() => {
    const examples = ['Enregistrer', 'Charger', 'Configuración', 'Aide et conseils'];
    document.querySelectorAll<HTMLButtonElement>('.utility-buttons button').forEach((button, index) => {
      button.textContent = examples[index] ?? '';
    });
  });
  const clipped = await page.locator('.utility-buttons button').evaluateAll((buttons) =>
    buttons.some((button) => button.scrollWidth > button.clientWidth + 1)
  );
  expect(clipped).toBe(false);
});

test('Clear is next to Number Pad title; Note and Red Note occupy equal two-column row', async ({ page }) => {
  await page.setViewportSize({ width: 1420, height: 920 });
  await openEnglishPage(page);
  const header = page.locator('.panel-header');
  await expect(header.locator('#padTitle')).toHaveText('Number Pad');
  await expect(header.locator('#clearPad')).toHaveText('Clear');
  await expect(page.locator('#pad button.num')).toHaveCount(9);
  await expect(page.locator('#padModes button')).toHaveCount(2);
  const row = await page.locator('#padModes button').evaluateAll((buttons) => buttons.map((button) => {
    const r = button.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  }));
  expect(row[0]!.w).toBeCloseTo(row[1]!.w, 0);
  expect(row[0]!.y).toBeCloseTo(row[1]!.y, 0);
  expect(row[1]!.x).toBeGreaterThan(row[0]!.x);

  // Clear must retain its original action after moving to the title row.
  const editable = page.locator('#board .cell:not(.given)').first();
  await editable.click();
  await page.locator('#pad button.num').filter({ hasText: /^1$/ }).click();
  await expect(editable).toHaveText('1');
  await header.locator('#clearPad').click();
  await expect(editable).toHaveText('');
});

test('shared button labels wrap without clipping at mobile width and on lengthy translations', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openEnglishPage(page);
  await page.evaluate(() => {
    document.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
      if (button.id === 'newGame' || button.id === 'clearPad' || button.classList.contains('pad-action')) {
        button.textContent = 'Très longue traduction pour le bouton';
      }
    });
  });
  const clipped = await page.locator('button').evaluateAll((buttons) => buttons.some((button) =>
    button.scrollWidth > button.clientWidth + 1
  ));
  expect(clipped).toBe(false);
});

test('selected cells remain visibly outlined inside every rounded board corner', async ({ page }) => {
  await page.setViewportSize({ width: 1420, height: 920 });
  await openEnglishPage(page);
  for (const theme of ['light', 'dark']) {
    await page.selectOption('#theme', theme);
    for (const [row, col] of [[0, 0], [0, 8], [8, 0], [8, 8]]) {
      const cell = page.locator(`#board .cell[data-row="${row}"][data-col="${col}"]`);
      await cell.click();
      const appearance = await cell.evaluate((element) => {
        const style = getComputedStyle(element);
        return { shadow: style.boxShadow, outline: style.outlineStyle };
      });
      expect(appearance.shadow).toContain('inset');
      expect(appearance.shadow).toContain('3px');
      expect(appearance.outline).toBe('none');
    }
  }
});

test('shared top control geometry and proportional header buttons are precise on desktop', async ({ page }) => {
  for (const height of [920, 850]) {
    await page.setViewportSize({ width: 1420, height });
    await openEnglishPage(page);
    for (const locale of ['en', 'ja']) {
      await page.selectOption('#lang', locale);
      const geometry = await page.evaluate(() => {
        const width = (selector: string) => document.querySelector<HTMLElement>(selector)!.getBoundingClientRect().width;
        const height = (selector: string) => document.querySelector<HTMLElement>(selector)!.getBoundingClientRect().height;
        return {
          fields: ['#clueCount', '#seed', '#lang', '#theme'].map(width),
          primary: ['#newGame', '#reset', '#hint', '#solve'].map(width),
          header: Array.from(document.querySelectorAll<HTMLElement>('.utility-buttons button')).map((b) => b.getBoundingClientRect().width),
          headerHeights: Array.from(document.querySelectorAll<HTMLElement>('.utility-buttons button')).map((b) => b.getBoundingClientRect().height),
          primaryHeight: height('#solve'),
          clear: width('#clearPad'),
          digit: width('#pad .num'),
          note: height('#padModes button:first-child'),
          redNote: height('#padModes button:last-child'),
          undo: height('#undo'),
          redo: height('#redo'),
          board: width('#board'),
          scrollY: document.documentElement.scrollHeight > window.innerHeight + 1
        };
      });
      for (const value of [...geometry.fields, ...geometry.primary]) {
        expect(Math.abs(value - geometry.primary[0]!)).toBeLessThanOrEqual(1);
      }
      expect(Math.max(...geometry.header) - Math.min(...geometry.header)).toBeLessThanOrEqual(1);
      for (const buttonHeight of geometry.headerHeights) {
        expect(Math.abs(buttonHeight - geometry.primaryHeight)).toBeLessThanOrEqual(1);
      }
      expect(geometry.header[0]! / geometry.primary[0]!).toBeGreaterThan(0.32);
      expect(geometry.header[0]! / geometry.primary[0]!).toBeLessThan(0.34);
      expect(Math.abs(geometry.clear - geometry.digit)).toBeLessThanOrEqual(1);
      expect(geometry.note).toBe(geometry.undo);
      expect(geometry.redNote).toBe(geometry.redo);
      expect(geometry.board).toBe(height === 920 ? 690 : 620);
      expect(geometry.scrollY).toBe(false);
    }
  }
});


test('Japanese Clear label and hint count message match the new wording', async ({ page }) => {
  await page.setViewportSize({ width: 1420, height: 920 });
  await page.goto('/');
  await page.selectOption('#lang', 'ja');
  await expect(page.locator('#clearPad')).toHaveText('クリア');
  await expect(page.locator('#stats')).toContainText('ヒントを埋めた数: 0');
});


test('all 25 localized views preserve board dimensions, reading direction and button legibility', async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1420, height: 920 });
  await page.goto('/');
  for (const lang of ['ja', 'en', 'zh-CN', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'pt-PT', 'ru', 'de', 'id', 'bn', 'tr', 'ko', 'vi', 'it', 'nl', 'pl', 'th', 'ur', 'fa', 'sw', 'zh-TW', 'uk']) {
    await page.selectOption('#lang', lang);
    await expect(page.locator('#board .cell')).toHaveCount(81);
    await expect(page.locator('#help')).not.toBeEmpty();
    await expect(page.locator('#hintText li')).toHaveCount(2);
    await expect(page.locator('#stats li')).toHaveCount(4);
    const metrics = await page.evaluate(() => ({
      direction: document.documentElement.dir,
      boardDirection: getComputedStyle(document.querySelector('#board')!).direction,
      padDirection: getComputedStyle(document.querySelector('#pad')!).direction,
      boardSize: document.querySelector('#board')!.getBoundingClientRect().width,
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      verticalOverflow: document.documentElement.scrollHeight - document.documentElement.clientHeight,
      clippedButtons: [...document.querySelectorAll<HTMLButtonElement>('button')]
        .some((button) => button.scrollWidth > button.clientWidth + 2)
    }));
    expect(metrics.direction).toBe(['ar', 'fa', 'ur'].includes(lang) ? 'rtl' : 'ltr');
    expect(metrics.boardDirection).toBe('ltr');
    expect(metrics.padDirection).toBe('ltr');
    expect(metrics.boardSize).toBe(690);
    expect(metrics.horizontalOverflow).toBeLessThanOrEqual(1);
    expect(metrics.verticalOverflow).toBeLessThanOrEqual(['ja', 'en', 'zh-CN', 'hi', 'es', 'ar', 'fr'].includes(lang) ? 1 : 32);
    expect(metrics.clippedButtons).toBe(false);
  }
});
