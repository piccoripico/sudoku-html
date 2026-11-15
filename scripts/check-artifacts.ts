import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const chromiumDir = path.join(distDir, 'extension-chromium');
const firefoxDir = path.join(distDir, 'extension-firefox');
const packageData: { version: string } = JSON.parse(await readFile(path.join(rootDir, 'package.json'), 'utf8'));
const version = packageData.version;

// `dist/` is ephemeral and must contain only the current release outputs.
const distEntries = (await readdir(distDir)).sort();
const currentOutputs = [`Sudoku_v${version}.html`, 'extension-chromium', 'extension-firefox'].sort();
assertCondition(
  JSON.stringify(distEntries) === JSON.stringify(currentOutputs),
  `dist/ contains stale or missing artifacts: ${JSON.stringify(distEntries)}; expected ${JSON.stringify(currentOutputs)}`
);

async function assertFile(relativePath: string): Promise<string> {
  const absolutePath = path.join(rootDir, relativePath);
  await access(absolutePath);
  return absolutePath;
}

async function listFilesRecursive(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFilesRecursive(absolutePath));
    } else {
      files.push(absolutePath);
    }
  }
  return files;
}

function assertCondition(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertClassicScriptSyntax(source: string, label: string): void {
  try {
    // Parse only. Artifact verification must not execute browser code in Node.
    new Function(source);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid classic script in ${label}: ${message}`, { cause: error });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNodeErrorWithCode(value: unknown): value is Error & { code: string } {
  return value instanceof Error
    && 'code' in value
    && typeof (value as { code?: unknown }).code === 'string';
}

async function assertAbsent(relativePath: string): Promise<void> {
  try {
    await access(path.join(rootDir, relativePath));
  } catch (error: unknown) {
    if (isNodeErrorWithCode(error) && error.code === 'ENOENT') {
      return;
    }
    throw error;
  }

  throw new Error(`Legacy JavaScript config must not remain: ${relativePath}`);
}

const typedDomContract: Readonly<Record<string, string>> = {
  board: 'div',
  pad: 'div',
  padModes: 'div',
  clearPad: 'button',
  status: 'div',
  stats: 'ul',
  timer: 'div',
  undo: 'button',
  redo: 'button',
  help: 'button',
  helpOverlay: 'div',
  helpTitle: 'h2',
  helpContent: 'div',
  helpClose: 'button',
  highlightSettings: 'button',
  highlightSettingsOverlay: 'div',
  highlightSettingsTitle: 'h2',
  highlightSettingsClose: 'button',
  highlightCompletedToggle: 'input',
  highlightCompletedToggleText: 'span',
  highlightDuplicateToggle: 'input',
  highlightDuplicateToggleText: 'span',
  clueCount: 'select',
  seed: 'input',
  seedField: 'div',
  lang: 'select',
  theme: 'select',
  persistPreferences: 'input',
  preferenceSaveToggle: 'label',
  preferenceSaveLabel: 'span',
  saveGame: 'button',
  loadGame: 'button',
  loadFile: 'input',
  title: 'h1',
  clueCountLabel: 'label',
  seedLabel: 'label',
  langLabel: 'label',
  newGame: 'button',
  reset: 'button',
  hint: 'button',
  solve: 'button',
  padTitle: 'h2',
  hintText: 'ul'
};

function verifyTypedDomContract(html: string): void {
  for (const [id, tag] of Object.entries(typedDomContract)) {
    const pattern = new RegExp(`<${tag}\\b[^>]*\\bid=[\"']${id}[\"']`, 'i');
    assertCondition(pattern.test(html), `Typed DOM contract mismatch: expected #${id} to be <${tag}>.`);
  }
}

const sourceHtml = await readFile(path.join(rootDir, 'src/index.html'), 'utf8');
verifyTypedDomContract(sourceHtml);

const governedSourceDirectories = ['src', 'src-extension', 'scripts', 'tests', 'e2e', 'config'];
const governedSourceFiles = (await Promise.all(
  governedSourceDirectories.map((directory) => listFilesRecursive(path.join(rootDir, directory)))
)).flat();
const governedJavaScriptSources = governedSourceFiles.filter((file) => /\.(?:js|mjs|cjs|jsx)$/i.test(file));
assertCondition(
  governedJavaScriptSources.length === 0,
  `First-party executable source must be TypeScript-only (no JS/MJS/CJS/JSX): ${governedJavaScriptSources.join(', ')}`
);

for (const legacyRootConfig of ['playwright.config.js', 'playwright.config.mjs']) {
  await assertAbsent(legacyRootConfig);
}

const singleFilePath = await assertFile(`dist/Sudoku_v${version}.html`);
const singleFileHtml = await readFile(singleFilePath, 'utf8');
assertCondition(singleFileHtml.includes('<style>'), 'dist/Sudoku_v${version}.html must inline CSS.');
assertCondition(!singleFileHtml.includes('src="./main.js"'), 'dist/Sudoku_v${version}.html must inline main JavaScript.');
assertCondition(!singleFileHtml.includes('src="./theme.js"'), 'dist/Sudoku_v${version}.html must inline theme JavaScript.');
assertCondition(!singleFileHtml.includes('src="./theme-init.js"'), 'dist/Sudoku_v${version}.html must inline theme-init JavaScript.');
assertCondition(!singleFileHtml.includes('href="./styles.css"'), 'dist/Sudoku_v${version}.html must inline styles.');
const firstInlineScriptIndex = singleFileHtml.indexOf('<script>');
const inlineStyleIndex = singleFileHtml.indexOf('<style>');
assertCondition(firstInlineScriptIndex >= 0 && inlineStyleIndex >= 0 && firstInlineScriptIndex < inlineStyleIndex, 'Early theme-init script must remain before inlined CSS.');

assertCondition((singleFileHtml.match(/id=["']highlightCompletedToggle["']/g) || []).length === 1, 'Highlight settings must include exactly one completed-number toggle.');
assertCondition((singleFileHtml.match(/id=["']highlightDuplicateToggle["']/g) || []).length === 1, 'Highlight settings must include exactly one duplicate-number toggle.');

const inlineScripts = [...singleFileHtml.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
assertCondition(inlineScripts.length >= 3, 'dist/Sudoku_v${version}.html must contain the expected inline scripts.');
for (const [index, match] of inlineScripts.entries()) {
  const source = match[1];
  assertCondition(source !== undefined, `dist/Sudoku_v${version}.html inline script ${index + 1} must have source text.`);
  assertClassicScriptSyntax(source, `dist/Sudoku_v${version}.html inline script ${index + 1}`);
}

const emittedThemeInit = await readFile(path.join(rootDir, '.build/browser/theme-init.js'), 'utf8');
assertCondition(!/^\s*(?:import|export)\s/m.test(emittedThemeInit), 'theme-init must remain a standalone classic script without imports/exports.');

const requiredExtensionFiles = [
  'manifest.json',
  'index.html',
  'styles.css',
  'theme-init.js',
  'theme.js',
  'main.js',
  'background.js',
  'lib/board-analysis.js',
  'lib/dom.js',
  'lib/game-state.js',
  'lib/history.js',
  'lib/i18n.js',
  'lib/input.js',
  'lib/indexed-access.js',
  'lib/persistence.js',
  'lib/preferences.js',
  'lib/puzzle-templates.js',
  'lib/sudoku.js',
  'lib/timer.js',
  'lib/ui-elements.js',
  ...['ja', 'en', 'zh-CN', 'hi', 'es', 'ar', 'fr'].map((lang) => `lib/locales/${lang}.js`)
];
for (const [dir, browser] of [[chromiumDir, 'chromium'], [firefoxDir, 'firefox']] as const) {
  for (const relative of requiredExtensionFiles) {
    await access(path.join(dir, relative));
  }
  for (const lang of ['ja', 'en', 'zh_CN', 'hi', 'es', 'ar', 'fr']) {
    await assertFile(path.relative(rootDir, path.join(dir, '_locales', lang, 'messages.json')));
  }
  const manifestValue: unknown = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8'));
  assertCondition(isRecord(manifestValue), `${browser}: manifest must be an object.`);
  assertCondition(manifestValue.manifest_version === 3 && manifestValue.version === version, `${browser}: manifest version mismatch.`);
  const background = manifestValue.background;
  if (browser === 'firefox') {
    assertCondition(!Object.hasOwn(manifestValue, 'offline_enabled'), 'Firefox must omit unsupported offline_enabled.');
    assertCondition(isRecord(background) && Array.isArray(background.scripts)
      && background.scripts.length === 1 && background.scripts[0] === 'background.js', 'Firefox must use MV3 background.scripts.');
    const gecko = isRecord(manifestValue.browser_specific_settings) && manifestValue.browser_specific_settings.gecko;
    assertCondition(isRecord(gecko) && typeof gecko.id === 'string', 'Firefox must have a Gecko ID.');
  } else {
    assertCondition(manifestValue.offline_enabled === true, 'Chromium offline_enabled must be preserved.');
    assertCondition(isRecord(background) && background.service_worker === 'background.js', 'Chromium background service worker must be present.');
  }
  const extensionHtml = await readFile(path.join(dir, 'index.html'), 'utf8');
  const extensionThemeInitIndex = extensionHtml.indexOf('<script src="./theme-init.js"></script>');
  const extensionStyleIndex = extensionHtml.indexOf('<link rel="stylesheet" href="./styles.css" />');
  assertCondition(extensionThemeInitIndex >= 0 && extensionStyleIndex > extensionThemeInitIndex, 'Theme init must load before CSS.');
  assertCondition(extensionHtml.includes('src="./icons/icon128.png"'), 'Extension must reference the shared icon.');
  for (const reference of ['./theme-init.js', './main.js', './theme.js']) {
    assertCondition(extensionHtml.includes(reference), `Extension HTML must reference ${reference}.`);
  }
  const extensionFiles = await listFilesRecursive(dir);
  const forbidden = extensionFiles.filter((file) => /\.(?:ts|tsx|map)$/i.test(file));
  assertCondition(forbidden.length === 0, `Extension artifact contains source files: ${forbidden.join(', ')}`);
}

const filesToCompare = requiredExtensionFiles.filter((f) => f !== 'manifest.json');
for (const file of filesToCompare) {
  const [c, f] = await Promise.all([readFile(path.join(chromiumDir, file)), readFile(path.join(firefoxDir, file))]);
  assertCondition(c.equals(f), `Browser code must be identical: ${file}`);
}
assertCondition(sourceHtml.includes('class="brand-icon" src="./icons/icon128.png"'), 'Logo must use the shared icon.');
assertCondition(singleFileHtml.includes('src="data:image/png;base64,'), 'Standalone HTML must embed the new vector-derived icon.');
assertCondition(!sourceHtml.includes('brand-mark') && !sourceHtml.includes('brandGradient'), 'Old generated icon must not remain.');
assertCondition(sourceHtml.includes('class="stats-list"') && !sourceHtml.includes('id="messageTitle"'), 'Message stats must be a list with no heading.');
assertCondition(sourceHtml.includes('<ul class="pad-help-list"'), 'Pad instructions must be a list.');
console.log(`Artifact contract OK: Sudoku_v${version}.html + Chromium/Firefox + vector-derived logo icon.`);
