import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import path from 'node:path';

const root = process.cwd();
const html = readFileSync(path.join(root, 'src/index.html'), 'utf8');
const translations = ['ja', 'en'].map((lang) => readFileSync(path.join(root, `src/lib/locales/${lang}.ts`), 'utf8')).join('\n');
const main = readFileSync(path.join(root, 'src/main.ts'), 'utf8');
const styles = readFileSync(path.join(root, 'src/styles.css'), 'utf8');

test('upper settings grid preserves its four fields and supports 25-locales', () => {
  const start = html.indexOf('      <div class="settings-grid">');
  const end = html.indexOf('      <div class="action-row primary-actions">');
  assert.ok(start >= 0 && end > start);
  const slice = html.slice(start, end);
  for (const id of ['clueCount', 'seed', 'lang', 'theme', 'persistPreferences']) {
    assert.ok(slice.includes(`id="${id}"`));
  }
  const languageOptions = slice.split('<select id="lang">')[1]?.split('</select>')[0] ?? '';
  assert.equal((languageOptions.match(/<option value="[^"]+">/g) ?? []).length, 25);
});

test('only the two highlight settings are in the new dialog', () => {
  const start = html.indexOf('<section class="settings-dialog"');
  const end = html.indexOf('</section>', start);
  assert.ok(start >= 0 && end > start);
  const contents = html.slice(start, end);
  assert.equal((contents.match(/type="checkbox"/g) ?? []).length, 2);
  assert.ok(contents.includes('id="highlightCompletedToggle"'));
  assert.ok(contents.includes('id="highlightDuplicateToggle"'));
  assert.ok(!contents.includes('id="clueCount"'));
  assert.ok(!contents.includes('id="lang"'));
});

test('Number Pad has exactly two bulleted instructions; message stats have no heading', () => {
  assert.match(html, /<ul class="pad-help-list" id="hintText"><\/ul>/);
  assert.match(html, /<ul class="stats-list" id="stats"><\/ul>/);
  assert.ok(!html.includes('id="messageTitle"'));
  for (const key of ['padHelpLine1', 'padHelpLine2']) {
    assert.match(translations, new RegExp(`\\b${key}:`));
  }
  assert.ok(!translations.includes('padHelpLine3:'));
  assert.ok(!translations.includes('Use Clear to erase, and Undo / Redo to reverse or repeat actions.'));
});

test('brand uses exact existing extension icon and theme-aware HTML text', () => {
  assert.match(html, /class="brand-icon" src="\.\/icons\/icon128\.png"/);
  assert.match(html, /class="brand-wordmark">Sudoku<\/span>/);
  assert.match(html, /class="brand-caption"/);
  assert.ok(!html.includes('brandGradient'));
});

test('Settings is a header button between Load and Help, not inside Number Pad', () => {
  const buttonsStart = html.indexOf('<div class="utility-buttons">');
  const buttonsEnd = html.indexOf('</div>', buttonsStart);
  const buttons = html.slice(buttonsStart, buttonsEnd);
  assert.match(buttons, /id="loadGame"[\s\S]*id="highlightSettings"[\s\S]*id="help"/);
  const panelStart = html.indexOf('<section class="panel"');
  const panelEnd = html.indexOf('</section>', panelStart);
  const panel = html.slice(panelStart, panelEnd);
  assert.ok(!panel.includes('id="highlightSettings"'));
  assert.ok(translations.includes("highlightSettingsButton: 'Settings'"));
  assert.ok(translations.includes("highlightSettingsButton: '設定'"));
});

test('Number Pad combines Note and Red Note into one English instruction', () => {
  assert.ok(translations.includes("padHelpLine1: '1–9: Enter a number.'"));
  assert.ok(translations.includes("padHelpLine2: '✏️ Note: Add notes. (🔴 Red Note or right-click: Add red notes.)'"));
});

test('message statistics are rendered in the specified order', () => {
  const start = main.indexOf('function updateStats()');
  const end = main.indexOf('function setStatus(', start);
  assert.ok(start > -1 && end > start);
  const updateStats = main.slice(start, end);
  const keys = ['statsClues', 'statsSeed', 'statsHintUsed', 'statsSolutionShown'];
  let previous = -1;
  for (const key of keys) {
    const index = updateStats.indexOf(`t('${key}'`);
    assert.ok(index > previous, `${key} must follow the previous statistic`);
    previous = index;
  }
  assert.ok(translations.includes("statsHintUsed: 'Hints filled: {count}'"));
  assert.ok(translations.includes("statsClues: 'Clues: {count}'"));
});


test('all buttons share one bounded font and wrapping primitive', () => {
  const baseRule = /(?:^|\n)button\s*\{([^}]*)\}/g;
  const rules = [...styles.matchAll(baseRule)];
  assert.ok(rules.length >= 1, 'A shared button rule is required');
  const shared = rules.map((match) => match[1] ?? '').join('\n');
  assert.match(shared, /font-size:\s*clamp\(var\(--button-font-min/);
  assert.match(shared, /white-space:\s*normal/);
  assert.match(shared, /overflow-wrap:\s*anywhere/);
  assert.match(shared, /min-width:\s*0/);
  assert.doesNotMatch(shared, /text-overflow:\s*ellipsis/);
  assert.doesNotMatch(styles, /\.utility-buttons button\s*\{[^}]*\bfont-size:/);
  assert.doesNotMatch(styles, /\.pad button\.num\s*\{[^}]*\bfont-size:/);
  assert.doesNotMatch(styles, /\.pad-modes button\s*\{[^}]*\bfont-size:/);
});

test('Clear belongs to the pad heading while Note and Red Note get their own two-column row', () => {
  const padPanelStart = html.indexOf('<section class="panel"');
  const padPanelEnd = html.indexOf('</section>', padPanelStart);
  const panel = html.slice(padPanelStart, padPanelEnd);
  assert.match(panel, /<div class="panel-header">[\s\S]*id="padTitle"[\s\S]*id="clearPad"[\s\S]*<\/div>/);
  assert.match(panel, /<div class="pad" id="pad"><\/div>/);
  assert.match(panel, /<div class="pad-modes" id="padModes"><\/div>/);
  assert.match(styles, /\.pad-modes\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  const buildPad = main.slice(main.indexOf('function buildPad()'), main.indexOf('function selectCell(', main.indexOf('function buildPad()')));
  assert.match(buildPad, /padModesEl\.appendChild\(noteToggleEl\)/);
  assert.match(buildPad, /padModesEl\.appendChild\(highlightNoteToggleEl\)/);
  assert.doesNotMatch(buildPad, /padEl\.appendChild\(clearPadButtonEl\)/);
  assert.match(main, /clearPadButtonEl\.addEventListener\('click', clearSelectedCell\)/);
});

test('Japanese Clear and hints-filled labels use the agreed wording', () => {
  assert.ok(translations.includes("clearButton: 'クリア'"));
  assert.ok(translations.includes("statsHintUsed: 'ヒントを埋めた数: {count}'"));
  assert.match(translations, /\{ label: 'クリア', text: '選択中のマスを消去します。' \}/);
  assert.ok(!translations.includes("clearButton: '消去'"));
});

test('upper settings headings use 14px without resizing Save settings or controls', () => {
  const labels = /\.field > label,\s*\.field-label-row > label:not\(\.preference-save-toggle\)\s*\{([^}]*)\}/.exec(styles)?.[1];
  assert.ok(labels, 'Missing common upper field label CSS');
  assert.match(labels, /font-size:\s*14px\s*;/);
  assert.doesNotMatch(labels, /(?:min-height|height|padding|width)\s*:/);

  const saveToggle = /\.preference-save-toggle\s*\{([^}]*)\}/.exec(styles)?.[1];
  assert.ok(saveToggle);
  assert.match(saveToggle, /font-size:\s*12px\s*;/);
});

test('New Puzzle uses bold primary-button typography without overriding shared sizing', () => {
  assert.match(html, /<button class="primary" id="newGame"/);
  const primary = /button\.primary\s*\{([^}]*)\}/.exec(styles)?.[1];
  assert.ok(primary, 'Missing primary button CSS rule');
  assert.match(primary, /font-weight:\s*700\s*;/);
  assert.doesNotMatch(primary, /font-size:|width:|height:/);
});

test('Help repository label embeds the connection requirement with no trailing note', () => {
  assert.ok(translations.includes("label: 'GitHub レポジトリ（インターネット接続が必要）'"));
  assert.ok(translations.includes("label: 'GitHub Repository (Internet connection required)'"));
  assert.ok(!translations.includes("note: '※インターネット接続が必要です。'"));
  assert.ok(!translations.includes("note: '*Internet connection required.'"));
  assert.doesNotMatch(main, /'note' in item/);
});
