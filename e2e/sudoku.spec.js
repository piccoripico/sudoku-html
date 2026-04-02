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
