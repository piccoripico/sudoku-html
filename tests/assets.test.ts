import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import path from 'node:path';

const root = process.cwd();
const read = (name: string): Buffer => readFileSync(path.join(root, name));

function sizeOfPng(file: string): [number, number] {
  const image = read(file);
  assert.equal(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', file);
  assert.ok(image.length > 100, `PNG cannot be empty: ${file}`);
  return [image.readUInt32BE(16), image.readUInt32BE(20)];
}

test('canonical icon SVG contains exactly nine vector cells and the numeral 9', () => {
  const svg = read('docs/branding/icon-master.svg').toString('utf8');
  assert.match(svg, /viewBox="0 0 1024 1024"/);
  assert.equal((svg.match(/class="tile"/g) ?? []).length, 9);
  assert.match(svg, /id="center-nine"/);
  assert.match(svg, /fill="#FFC318"/);
  assert.match(svg, /fill="#31EAC1"/);
  assert.doesNotMatch(svg, /<image\b/);
});

test('all vector-derived icon exports have exact target sizes', () => {
  const sizes: Array<[string, number]> = [
    ['src-extension/icons/icon16.png', 16],
    ['src-extension/icons/icon32.png', 32],
    ['src-extension/icons/icon48.png', 48],
    ['src-extension/icons/icon128.png', 128],
    ['docs/branding/icon-180.png', 180],
    ['docs/branding/icon-192.png', 192],
    ['docs/branding/icon-256.png', 256],
    ['docs/store-assets/logos/store-logo-300x300.png', 300],
    ['docs/branding/icon-512.png', 512],
    ['docs/branding/icon-1024.png', 1024]
  ];
  for (const [file, size] of sizes) {
    assert.deepEqual(sizeOfPng(file), [size, size], file);
  }
});

test('promotional, logo, and four English store PNG exports have exact dimensions', () => {
  const assets: Array<[string, number, number]> = [
    ['docs/branding/logo-lockup-light.png', 1200, 300],
    ['docs/branding/logo-lockup-dark.png', 1200, 300],
    ['docs/store-assets/promo-440x280.png', 440, 280],
    ['docs/store-assets/promo-1400x560.png', 1400, 560],
    ['docs/store-assets/screenshots/01-desktop-light-notes-highlights-1280x800.png', 1280, 800],
    ['docs/store-assets/screenshots/02-desktop-dark-notes-highlights-1280x800.png', 1280, 800],
    ['docs/store-assets/screenshots/03-mobile-light-1280x800.png', 1280, 800],
    ['docs/store-assets/screenshots/04-one-click-launch-1280x800.png', 1280, 800]
  ];
  for (const [file, width, height] of assets) {
    assert.deepEqual(sizeOfPng(file), [width, height], file);
  }
});

test('all 25-locale README screenshots are present as JPEGs', () => {
  for (const lang of ['ja', 'en', 'zh-CN', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'pt-PT', 'ru', 'de', 'id', 'bn', 'tr', 'ko', 'vi', 'it', 'nl', 'pl', 'th', 'ur', 'fa', 'sw', 'zh-TW', 'uk']) {
    for (const view of ['desktop', 'mobile']) {
      const file = `docs/READMEs/screenshots/screenshot_${view}_${lang}.jpeg`;
      const image = read(file);
      assert.equal(image.subarray(0, 2).toString('hex'), 'ffd8', file);
      assert.ok(image.length > 5_000, `${file} is suspiciously small`);
    }
  }
});

test('editable theme SVG lockups embed the new vector icon with no raster dependencies', () => {
  for (const theme of ['light', 'dark']) {
    const svg = read(`docs/branding/logo-lockup-${theme}.svg`).toString('utf8');
    assert.match(svg, /viewBox="0 0 1200 300"/);
    assert.equal((svg.match(/class="tile"/g) ?? []).length, 9);
    assert.match(svg, /id="center-nine"/);
    assert.ok(svg.includes('>Sudoku</text>'));
    assert.ok(svg.includes('>数独</text>'));
    assert.doesNotMatch(svg, /<image\b|data:image\/png/);
  }
});


test('README screenshots contain only two JPEGs for each locale; store screenshots are English-only', () => {
  const locales = ['ja', 'en', 'zh-CN', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'pt-PT', 'ru', 'de', 'id', 'bn', 'tr', 'ko', 'vi', 'it', 'nl', 'pl', 'th', 'ur', 'fa', 'sw', 'zh-TW', 'uk'];
  const readmeExpected = locales.flatMap(lang => [
    `screenshot_desktop_${lang}.jpeg`, `screenshot_mobile_${lang}.jpeg`
  ]).sort();
  assert.deepEqual(readdirSync(path.join(root, 'docs', 'READMEs', 'screenshots')).sort(), readmeExpected);
  assert.deepEqual(readdirSync(path.join(root, 'docs', 'store-assets', 'screenshots')).sort(), [
    '01-desktop-light-notes-highlights-1280x800.png',
    '02-desktop-dark-notes-highlights-1280x800.png',
    '03-mobile-light-1280x800.png',
    '04-one-click-launch-1280x800.png'
  ]);
});

test('editable SVG logo uses symmetric centered caption and bars with the application wordmark width', () => {
  for (const name of ['logo-lockup-light', 'logo-lockup-dark', 'promo-440x280', 'promo-1400x560']) {
    const folder = name.startsWith('promo') ? 'docs/branding/' : 'docs/branding/';
    const svg = read(`${folder}${name}.svg`).toString('utf8');
    const value = (id: string, key: string) => {
      const tag = svg.match(new RegExp(`<[^>]+id="${id}"[^>]*>`))?.[0];
      assert.ok(tag, `${name}: missing ${id}`);
      const number = tag.match(new RegExp(`${key}="([0-9.]+)"`))?.[1];
      assert.ok(number, `${name}: missing ${key} on ${id}`);
      return Number(number);
    };
    const leftX = value('rule-left', 'x');
    const rightX = value('rule-right', 'x');
    const ruleWidth = value('rule-left', 'width');
    assert.equal(value('rule-right', 'width'), ruleWidth);
    assert.equal(value('rule-left', 'y'), value('rule-right', 'y'));
    const wordmarkX = value('wordmark', 'x');
    const wordmarkWidth = value('wordmark', 'data-width');
    const captionX = value('caption-text', 'x');
    const captionWidth = value('caption-text', 'data-width');
    assert.ok(Math.abs((leftX + rightX + ruleWidth) / 2 - (wordmarkX + wordmarkWidth / 2)) < 0.01);
    assert.ok(Math.abs(captionX - (wordmarkX + wordmarkWidth / 2)) < 0.01);
    assert.ok(Math.abs((captionX - captionWidth / 2 - leftX - ruleWidth) - (rightX - captionX - captionWidth / 2)) < 0.01);
  }
});
