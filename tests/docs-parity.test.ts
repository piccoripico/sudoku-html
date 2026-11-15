import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const locales = ['ja', 'en', 'zh-CN', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'pt-PT', 'ru', 'de', 'id', 'bn', 'tr', 'ko', 'vi', 'it', 'nl', 'pl', 'th', 'ur', 'fa', 'sw', 'zh-TW', 'uk'];
const readmePath = (locale: string) => locale === 'en' ? 'README.md' : `docs/READMEs/README.${locale}.md`;
const guidePath = (locale: string) => locale === 'en' ? 'docs/game-guides/GAME_GUIDE.md' : `docs/game-guides/GAME_GUIDE.${locale}.md`;
const read = (file: string) => readFileSync(path.join(root, file), 'utf8');

function sections(markdown: string): { title: string; content: string }[] {
  return markdown.split(/^## /m).slice(1).map((part) => {
    const [title, ...lines] = part.split('\n');
    return { title: title ?? '', content: lines.join('\n') };
  });
}
const bullets = (text: string) => (text.match(/^- /gm) ?? []).length;

test('every localized guide follows the English source without omitted or invented sections', () => {
  const canonical = sections(read(guidePath('en')));
  assert.deepEqual(canonical.map((s) => bullets(s.content)), [4, 13, 4, 7, 7]);
  for (const locale of locales) {
    const doc = read(guidePath(locale));
    assert.equal((doc.match(/<img\b/g) ?? []).length, 2, `${locale}: exactly two comparison-table screenshots`);
    assert.match(doc, new RegExp(`screenshot_desktop_${locale}\\.jpeg`));
    assert.match(doc, new RegExp(`screenshot_mobile_${locale}\\.jpeg`));
    const localeSections = sections(doc);
    assert.equal(localeSections.length, canonical.length, `${locale}: guide sections`);
    if (locale !== 'ja') {
      assert.deepEqual(localeSections.map((s) => bullets(s.content)), canonical.map((s) => bullets(s.content)), `${locale}: guide bullet parity`);
    }
    assert.equal((doc.match(/\]\([^)]*GAME_GUIDE[^)]*\)/g) ?? []).length, locales.length);
  }
});

test('all localized READMEs share the approved nine-feature layout', () => {
  for (const locale of locales) {
    const doc = read(readmePath(locale));
    const s = sections(doc);
    assert.equal(s.length, 4, `${locale}: sections`);
    const play = s[0]?.content ?? '';
    assert.match(play.trimStart().split('\n')[0] ?? '', /^\[[^\]]+\]\([^)]*GAME_GUIDE[^)]*\)$/, `${locale}: Game Guide first and without redundant prefix`);
    assert.equal((play.match(/\]\([^)]*GAME_GUIDE[^)]*\)/g) ?? []).length, 1, `${locale}: one guide link`);
    const rows = play.split('\n').filter(line => line.startsWith('| **'));
    assert.equal(rows.length, 3, `${locale}: three play rows`);
    assert.match(rows[0] ?? '', /\[Sudoku_v1\.9\.0\.html\]\(https:\/\/github\.com\/piccoripico\/sudoku-html\/releases\/latest\/download\/Sudoku_v1\.9\.0\.html\)<br \/>/, `${locale}: link and instructions separated`);
    assert.match(rows[1] ?? '', /<https:\/\/piccoripico\.github\.io\/sudoku-html\/><br \/>/, `${locale}: online link and instructions separated`);
    assert.equal((rows[2]?.match(/<a href=/g) ?? []).length, 3, `${locale}: badges inside third row`);
    assert.match(rows[2] ?? '', /https:\/\/addons\.mozilla\.org\/en-US\/firefox\/addon\/one-click-sudoku\//, `${locale}: Firefox Add-ons URL`);
    assert.match(rows[2] ?? '', /<br \/>\s*<a href=/, `${locale}: badges below instructions`);
    assert.equal((play.match(/^<a href=/gm) ?? []).length, 0, `${locale}: no badges outside table`);
    const highlights = (s[1]?.content ?? '').split('\n').filter(line => line.startsWith('- '));
    assert.equal(highlights.length, 9, `${locale}: exactly nine highlights`);
    assert.match(highlights.at(-1) ?? '', /609[.,\s]?5|6095|6,095/, `${locale}: board count last`);
    const dev = s[2]?.content ?? '';
    assert.ok(dev.trimStart().startsWith('1. '), `${locale}: development starts with numbered steps`);
    assert.equal((dev.match(/^\d+\. /gm) ?? []).length, 6, `${locale}: six development steps`);
    assert.doesNotMatch(dev, /config\/tsconfig\//, `${locale}: removed configuration paragraph`);
    assert.equal(bullets(s[3]?.content ?? ''), 3, `${locale}: automation bullets`);
    assert.ok(!doc.split('\n\n')[2]?.includes('GitHub Actions'), `${locale}: no repository internals in intro`);
    const nonBulletFeatureLines = (s[1]?.content ?? '').split('\n').filter(line => line.trim() && !line.startsWith('- '));
    assert.equal(nonBulletFeatureLines.length, 0, `${locale}: no standalone JSON compatibility note`);
    for (const literal of ['npm ci', 'npm run typecheck', 'npm test', 'npm run build', 'npm run test:e2e:install', 'npm run test:e2e', 'npm run verify', 'dist/Sudoku_v1.9.0.html', 'dist/extension-chromium', 'dist/extension-firefox']) {
      assert.ok(doc.includes(literal), `${locale}: missing ${literal}`);
    }
    for (const asset of ['ci.yml', 'pages.yml', 'release.yml']) assert.ok(doc.includes(asset), `${locale}: missing ${asset}`);
  }
});
