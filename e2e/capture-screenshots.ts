import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import { LANGUAGES } from '../src/lib/i18n.js';

const root = process.cwd();
const packageData: { version: string } = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const html = await readFile(path.join(root, 'dist', `Sudoku_v${packageData.version}.html`), 'utf8');
const readmeScreenshots = path.join(root, 'docs', 'READMEs', 'screenshots');
const storeSources = path.join(root, 'docs', 'store-assets', 'sources');

const completedNines = [
  { row: 0, col: 6, digit: '9' },
  { row: 1, col: 5, digit: '9' },
  { row: 3, col: 7, digit: '9' },
  { row: 4, col: 0, digit: '9' }
] as const;
const conflictEntry = { row: 0, col: 1, digit: '8' } as const;
const noteEntries = [
  { row: 1, col: 1, digits: ['1', '6'] },
  { row: 6, col: 0, digits: ['2', '7'] }
] as const;
const redNoteEntries = [
  { row: 1, col: 2, digits: ['2', '8'] },
  { row: 6, col: 1, digits: ['4', '5'] }
] as const;

async function selectCell(page: Page, row: number, col: number) {
  await page.locator(`#board .cell[data-row="${row}"][data-col="${col}"]`).click();
}

async function clickPadDigit(page: Page, digit: string) {
  await page.locator('#pad .num').filter({ hasText: digit }).click();
}

async function enterDigits(page: Page, row: number, col: number, digits: readonly string[]) {
  await selectCell(page, row, col);
  for (const digit of digits) {
    await clickPadDigit(page, digit);
  }
}

async function decorateBoardState(page: Page) {
  for (const entry of completedNines) {
    await enterDigits(page, entry.row, entry.col, [entry.digit]);
  }
  await enterDigits(page, conflictEntry.row, conflictEntry.col, [conflictEntry.digit]);

  await page.locator('#padModes .pad-action').first().click();
  for (const entry of noteEntries) {
    await enterDigits(page, entry.row, entry.col, entry.digits);
  }
  await page.locator('#padModes .pad-action.red-note').click();
  for (const entry of redNoteEntries) {
    await enterDigits(page, entry.row, entry.col, entry.digits);
  }
  await page.locator('#padModes .pad-action').first().click();

  await expect(page.locator('#board .completed-number')).toHaveCount(9);
  await expect(page.locator('#board .conflict')).toHaveCount(3);
  await expect(page.locator('#board .notes')).toHaveCount(4);
  await expect(page.locator('#board .notes .highlighted')).toHaveCount(4);
  await page.locator('#timer').evaluate((el) => { el.textContent = '09:13'; });
}

// Screenshots come from the actual self-contained application, using a fixed seed.
async function setup(page: Page, lang: string, theme: 'light' | 'dark') {
  await page.setContent(html);
  await expect(page.locator('#board .cell')).toHaveCount(81);
  await page.selectOption('#lang', lang);
  await page.selectOption('#theme', theme);
  await page.selectOption('#clueCount', '32');
  await page.locator('#seed').fill('12345');
  await page.locator('#newGame').click();
  await expect(page.locator('#stats')).toContainText('12345');
  await page.evaluate(() => document.fonts.ready);
  await decorateBoardState(page);
}

for (const lang of LANGUAGES) {
  test(`${lang}: README desktop and mobile screenshots`, async ({ browser }) => {
    await mkdir(readmeScreenshots, { recursive: true });

    const desktop = await browser.newPage({ viewport: { width: 1420, height: 920 }, deviceScaleFactor: 1 });
    await setup(desktop, lang, 'light');
    await desktop.screenshot({ path: path.join(readmeScreenshots, `screenshot_desktop_${lang}.jpeg`), type: 'jpeg', quality: 86 });
    if (lang === 'en') {
      await mkdir(storeSources, { recursive: true });
      await setup(desktop, 'en', 'dark');
      await desktop.screenshot({
        path: path.join(storeSources, 'screenshot_desktop_en_dark.jpeg'),
        type: 'jpeg', quality: 86
      });
    }
    await desktop.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    await setup(mobile, lang, 'light');
    await mobile.screenshot({ path: path.join(readmeScreenshots, `screenshot_mobile_${lang}.jpeg`), type: 'jpeg', quality: 86, fullPage: true });
    if (lang === 'en') {
      // Crop coordinates come from the rendered DOM, not guessed pixel offsets.
      // This prevents the 9x9 grid from being split when the mobile layout changes.
      const regions = await mobile.evaluate(() => {
        const box = (selector: string) => {
          const element = document.querySelector(selector);
          if (!element) throw new Error(`Missing screenshot region: ${selector}`);
          const rect = element.getBoundingClientRect();
          const x = Math.floor(rect.left + window.scrollX);
          const y = Math.floor(rect.top + window.scrollY);
          return {
            x, y,
            width: Math.ceil(rect.right + window.scrollX) - x,
            height: Math.ceil(rect.bottom + window.scrollY) - y
          };
        };
        return {
          screenshotWidth: document.documentElement.scrollWidth,
          screenshotHeight: document.documentElement.scrollHeight,
          board: box('#board'),
          controls: box('.sidebar .panel')
        };
      });
      await writeFile(path.join(storeSources, 'mobile-en-regions.json'),
                      `${JSON.stringify(regions, null, 2)}\n`, 'utf8');
    }
    await mobile.close();
  });
}
