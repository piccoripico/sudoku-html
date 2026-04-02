import { readFile } from 'node:fs/promises';

import { expect, test } from '@playwright/test';

async function openEnglishPage(page) {
  await page.goto('/');
  await page.selectOption('#lang', 'en');
  await expect(page.locator('#help')).toHaveText('How to Play');
}

async function generatePuzzle(page, { clueCount, seed }) {
  await page.selectOption('#clueCount', String(clueCount));
  await page.locator('#seed').fill(String(seed));
  await page.locator('#newGame').click();
}

async function readBoard(page) {
  return page.locator('#board .cell').evaluateAll((cells) => (
    cells.map((cell) => cell.textContent.trim())
  ));
}

async function getFirstEmptyCell(page) {
  const emptyCell = await page.locator('#board .cell').evaluateAll((cells) => {
    const target = cells.find((cell) => cell.textContent.trim() === '');
    return target ? {
      row: target.dataset.row,
      col: target.dataset.col
    } : null;
  });

  if (!emptyCell) {
    throw new Error('No empty cell was found.');
  }

  return emptyCell;
}

async function getFirstEmptyCells(page, count) {
  const cells = await page.locator('#board .cell').evaluateAll((allCells, amount) => (
    allCells
      .filter((cell) => cell.textContent.trim() === '')
      .slice(0, amount)
      .map((cell) => ({
        row: cell.dataset.row,
        col: cell.dataset.col
      }))
  ), count);

  if (cells.length < count) {
    throw new Error(`Only found ${cells.length} empty cells.`);
  }

  return cells;
}

async function getVisibleNotes(page, row, col) {
  return page.locator(`#board .cell[data-row="${row}"][data-col="${col}"]`).evaluate((cell) => (
    Array.from(cell.querySelectorAll('.notes span'))
      .map((span) => span.textContent)
      .join('')
  ));
}

test('help dialog exposes the built-in guide and repository link', async ({ page }) => {
  await openEnglishPage(page);

  await page.locator('#help').click();
  await expect(page.locator('#helpDialog')).toBeVisible();
  await expect(page.locator('#helpTitle')).toHaveText('How to Play');
  await expect(page.locator('#helpContent')).toContainText('Seed');
  await expect(page.locator('#helpContent')).toContainText('Internet connection required.');
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

test('clear removes values and notes even while note mode is active', async ({ page }) => {
  await openEnglishPage(page);
  await generatePuzzle(page, { clueCount: 24, seed: 246810 });
  const noteButton = page.locator('#pad .pad-action:not(.red-note)');

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

  const [valueTarget, noteTarget] = await getFirstEmptyCells(page, 2);
  const noteButton = page.locator('#pad .pad-action:not(.red-note)');
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
  const saveText = await readFile(downloadPath, 'utf8');
  const savedJson = JSON.parse(saveText);

  expect(savedJson.format).toBe('sudoku-html-save');
  expect(savedJson.version).toBe(1);

  await generatePuzzle(page, { clueCount: 32, seed: 24680 });

  await page.locator('#loadFile').setInputFiles({
    name: 'saved-game.json',
    mimeType: 'application/json',
    buffer: Buffer.from(saveText, 'utf8')
  });

  await expect(page.locator('#status')).toHaveText('The saved state has been loaded.');
  await expect(valueCell).toHaveText('1');
  await expect.poll(() => getVisibleNotes(page, noteTarget.row, noteTarget.col)).toBe('2');
  await expect(page.locator('#stats')).toContainText('Actual clues: 24');
  await expect(page.locator('#stats')).toContainText('Seed: 13579');

  await page.getByRole('button', { name: 'Undo' }).click();
  await expect.poll(() => getVisibleNotes(page, noteTarget.row, noteTarget.col)).toBe('');
});
