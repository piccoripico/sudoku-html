import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { I18N, LANGUAGES, resolveLanguage, translate } from '../src/lib/i18n.js';

const root = process.cwd();
const languages = ['ja', 'en', 'zh-CN', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'pt-PT', 'ru', 'de', 'id', 'bn', 'tr', 'ko', 'vi', 'it', 'nl', 'pl', 'th', 'ur', 'fa', 'sw', 'zh-TW', 'uk'] as const;
const extensionCodes = {'ja': 'ja', 'en': 'en', 'zh-CN': 'zh_CN', 'hi': 'hi', 'es': 'es', 'ar': 'ar', 'fr': 'fr', 'pt-BR': 'pt_BR', 'pt-PT': 'pt_PT', 'ru': 'ru', 'de': 'de', 'id': 'id', 'bn': 'bn', 'tr': 'tr', 'ko': 'ko', 'vi': 'vi', 'it': 'it', 'nl': 'nl', 'pl': 'pl', 'th': 'th', 'ur': 'ur', 'fa': 'fa', 'sw': 'sw', 'zh-TW': 'zh_TW', 'uk': 'uk' } as const;
const placeholders = (value: string): string[] => [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1] ?? '').sort();

test('all 25-locale dictionaries have complete translated UI keys and interpolation parameters', () => {
  assert.deepEqual(LANGUAGES, languages);
  const reference = I18N.en;
  const expected = Object.keys(reference).sort();
  for (const lang of languages) {
    const dictionary = I18N[lang];
    assert.deepEqual(Object.keys(dictionary).sort(), expected, `${lang}: keys`);
    for (const key of expected) {
      const base = reference[key as keyof typeof reference];
      const localized = dictionary[key as keyof typeof dictionary];
      if (typeof base === 'string') {
        assert.equal(typeof localized, 'string', `${lang}:${key}`);
        assert.ok(String(localized).trim().length > 0, `${lang}:${key} must not be blank`);
        assert.deepEqual(placeholders(String(localized)), placeholders(base), `${lang}:${key} variables`);
      }
    }
    assert.equal(dictionary.helpSections.length, reference.helpSections.length, `${lang}: help sections`);
    dictionary.helpSections.forEach((section, index) => {
      assert.equal(section.items.length, reference.helpSections[index]?.items.length, `${lang}: help section ${index}`);
      for (const item of section.items) {
        assert.ok(item.label.trim(), `${lang}: empty help label`);
        if ('text' in item) assert.ok(item.text.trim(), `${lang}: empty help body`);
      }
    });
    assert.deepEqual(Object.keys(dictionary.clueOptionLabels).sort(), Object.keys(reference.clueOptionLabels).sort());
  }
});

test('browser locale selection normalizes only supported primary language and Chinese script', () => {
  for (const [locale, expected] of [
    ['ja-JP', 'ja'], ['en-GB', 'en'], ['fr-CA', 'fr'], ['es-MX', 'es'], ['hi-IN', 'hi'], ['ar-SA', 'ar'],
    ['zh-Hans-CN', 'zh-CN'], ['zh-CN', 'zh-CN'], ['zh', 'zh-CN'],
    ['zh-Hant-TW', 'zh-TW'], ['zh-HK', 'zh-TW'], ['zh-TW', 'zh-TW'],
    ['pt', 'pt-BR'], ['pt-BR', 'pt-BR'], ['pt-PT', 'pt-PT'], ['pt-AO', 'pt-PT'],
    ['ko-KR', 'ko'], ['fa-IR', 'fa'], ['ur-PK', 'ur'], ['bn-BD', 'bn'], ['th-TH', 'th']
  ] as const) {
    assert.equal(resolveLanguage([locale]), expected);
  }
  assert.equal(resolveLanguage(['xx-ZZ', 'fr-FR']), 'fr');
  assert.equal(resolveLanguage([]), 'en');
});

test('interpolation is correct in all 25-locales and does not remove the count', () => {
  for (const lang of languages) {
    assert.ok(translate(lang, 'statsClues', { count: 27 }).includes('27'));
    assert.ok(translate(lang, 'statusSolved', { time: '01:23' }).includes('01:23'));
  }
});

test('extension bundles have translated manifest messages in all 25-locale directories', () => {
  for (const lang of languages) {
    const file = path.join(root, 'src-extension', '_locales', extensionCodes[lang], 'messages.json');
    assert.ok(existsSync(file), `missing extension messages ${lang}`);
    const raw: unknown = JSON.parse(readFileSync(file, 'utf8'));
    assert.ok(raw && typeof raw === 'object');
    const entries = raw as Record<string, { message?: string }>;
    assert.deepEqual(Object.keys(entries).sort(), ['extensionActionTitle', 'extensionDescription', 'extensionName', 'extensionShortName']);
    for (const value of Object.values(entries)) assert.ok(value.message && value.message.trim());
  }
});

test('public README and game guides exist for every supported locale', () => {
  for (const lang of languages) {
    const suffix = lang === 'en' ? '' : `.${lang}`;
    for (const rel of [lang === 'en' ? 'README.md' : `docs/READMEs/README.${lang}.md`, `docs/game-guides/GAME_GUIDE${suffix}.md`]) {
      assert.ok(existsSync(path.join(root, rel)), `missing ${rel}`);
    }
  }
});

test('RTL application text does not reverse the Sudoku board', () => {
  const app = readFileSync(path.join(root, 'src/main.ts'), 'utf8');
  const css = readFileSync(path.join(root, 'src/styles.css'), 'utf8');
  assert.match(app, /document\.documentElement\.dir\s*=\s*\['ar', 'fa', 'ur'\]\.includes\(state\.currentLang\) \? 'rtl' : 'ltr'/);
  assert.match(css, /\.board\s*\{[^}]*direction:\s*ltr/s);
  assert.match(css, /\.pad\s*\{[^}]*direction:\s*ltr/s);
});


test('new locale catalogs contain substantive translations rather than English fallback copy', () => {
  const userKeys = Object.keys(I18N.en).filter((key) => typeof I18N.en[key as keyof typeof I18N.en] === 'string');
  for (const locale of languages.slice(7)) {
    const catalog = I18N[locale];
    const differences = userKeys.filter((key) => catalog[key as keyof typeof catalog] !== I18N.en[key as keyof typeof I18N.en]);
    assert.ok(differences.length >= 35, `${locale}: only ${differences.length} translated user-facing strings`);
    const firstHelp = catalog.helpSections[0]?.items[0];
    assert.ok(firstHelp && 'text' in firstHelp && firstHelp.text !== I18N.en.helpSections[0].items[0]?.text, `${locale}: Help was not localized`);
  }
  assert.notEqual(I18N['pt-BR'].preferenceSaveLabel, I18N['pt-PT'].preferenceSaveLabel);
  assert.notEqual(I18N['zh-TW'].clueLabel, I18N['zh-CN'].clueLabel);
});
