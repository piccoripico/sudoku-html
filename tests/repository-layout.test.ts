import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const locales = ['ja', 'en', 'zh-CN', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'pt-PT', 'ru', 'de', 'id', 'bn', 'tr', 'ko', 'vi', 'it', 'nl', 'pl', 'th', 'ur', 'fa', 'sw', 'zh-TW', 'uk'] as const;

function text(file: string): string {
  return readFileSync(path.join(root, file), 'utf8');
}

test('local history is intentionally excluded from the public checkout', () => {
  assert.match(text('.gitignore'), /^docs\/history\/$/m);
  assert.equal(existsSync(path.join(root, 'docs/releases')), false);
});

test('all 25 public guides and screenshot files use the canonical folders', () => {
  const docs = path.join(root, 'docs');
  assert.ok(existsSync(path.join(root, 'README.md')));
  for (const lang of locales) {
    const suffix = lang === 'en' ? '' : `.${lang}`;
    const readme = lang === 'en' ? 'README.md' : `docs/READMEs/README.${lang}.md`;
    assert.ok(existsSync(path.join(root, readme)), readme);
    assert.ok(existsSync(path.join(docs, 'game-guides', `GAME_GUIDE${suffix}.md`)));
    if (lang !== 'en') assert.equal(existsSync(path.join(root, `README.${lang}.md`)), false);
    assert.equal(existsSync(path.join(docs, `GAME_GUIDE${suffix}.md`)), false);
    for (const view of ['desktop', 'mobile']) {
      assert.ok(existsSync(path.join(docs, 'READMEs', 'screenshots', `screenshot_${view}_${lang}.jpeg`)));
      assert.equal(existsSync(path.join(docs, `screenshot_${view}_${lang}.jpeg`)), false);
    }
  }
  assert.ok(existsSync(path.join(docs, 'store-assets', 'screenshots')));
  assert.ok(existsSync(path.join(docs, 'READMEs', 'badges')));
  assert.equal(existsSync(path.join(docs, 'store-assets', 'badges')), false);
  assert.equal(existsSync(path.join(docs, 'screenshots')), false);
});

test('each README has a 25-locale selector, no Documents section and one local Game Guide link in Play', () => {
  for (const lang of locales) {
    const p = lang === 'en' ? 'README.md' : `docs/READMEs/README.${lang}.md`;
    const body = text(p);
    assert.match(body, /\[日本語\]/);
    assert.match(body, /\[Français\]/);
    assert.doesNotMatch(body, /^##\s+(?:Documents|ドキュメント|文档|दस्तावेज़|Documentación|Documentation|الوثائق)\s*$/m);
    assert.equal((body.match(/\]\([^)]*GAME_GUIDE[^)]*\)/g) ?? []).length, 1, p);
    const play = body.split(/^## /m)[1];
    assert.ok(play?.includes('GAME_GUIDE'), `${p}: game guide must be in Play section`);
    const playPart = body.split('## ')[1] ?? '';
    assert.ok(playPart.indexOf('chrome-web-store-badge.png') > playPart.indexOf('| **'), `${p}: badge should follow installation instructions`);
    assert.ok(body.indexOf('GAME_GUIDE') < body.indexOf('chrome-web-store-badge.png'), `${p}: guide precedes the play table`);
    assert.ok(body.includes('microsoft-edge-addons-badge'), `${p}: Edge badge should be included`);
  }
});

test('guide files contain gameplay instructions, not physical main-screen layout history', () => {
  for (const lang of locales) {
    const file = lang === 'en' ? 'docs/game-guides/GAME_GUIDE.md' : `docs/game-guides/GAME_GUIDE.${lang}.md`;
    const body = text(file);
    assert.doesNotMatch(body, /(?:Main View Layout|Number Pad layout|メイン画面の構成|数字パッドの配置)/i);
    assert.ok(body.length > 500, file);
  }
});


test('all local Markdown/image links in public guides and README files resolve after moving folders', () => {
  const files = ['README.md'];
  for (const lang of locales) {
    if (lang !== 'en') files.push(`docs/READMEs/README.${lang}.md`);
    files.push(lang === 'en' ? 'docs/game-guides/GAME_GUIDE.md' : `docs/game-guides/GAME_GUIDE.${lang}.md`);
  }
  for (const file of files) {
    const source = text(file);
    const refs = [
      ...[...source.matchAll(/\]\((\.{1,2}\/[^)#]+)(?:#[^)]*)?\)/g)].map((m) => m[1]),
      ...[...source.matchAll(/src="(\.{1,2}\/[^"]+)"/g)].map((m) => m[1])
    ];
    for (const rel of refs) {
      assert.ok(existsSync(path.resolve(root, path.dirname(file), rel!)), `${file} -> ${rel}`);
    }
  }
});

test('root has no screenshot runner folder or Playwright configs; history is ignored intentionally', () => {
  assert.equal(existsSync(path.join(root, 'screenshots')), false);
  assert.equal(existsSync(path.join(root, 'playwright.config.ts')), false);
  assert.equal(existsSync(path.join(root, 'playwright.screenshots.config.ts')), false);
  assert.ok(existsSync(path.join(root, 'e2e', 'capture-screenshots.ts')));
  assert.ok(existsSync(path.join(root, 'config', 'playwright.config.ts')));
  assert.ok(existsSync(path.join(root, 'config', 'playwright.screenshots.config.ts')));
  assert.match(text('config/playwright.config.ts'), /cwd: process\.cwd\(\)/);
  const ignored = text('.gitignore');
  assert.match(ignored, /^docs\/history\/$/m);
  assert.match(ignored, /^docs\/EXTENSION_STORE_SUBMISSION\/$/m);
  const pkg = JSON.parse(text('package.json')) as {scripts: Record<string, string>};
  assert.match(pkg.scripts.screenshots ?? '', /config\/playwright\.screenshots\.config\.ts/);
});
