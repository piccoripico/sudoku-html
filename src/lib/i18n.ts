import { JA } from './locales/ja.js';
import { EN } from './locales/en.js';
import { ZH_CN } from './locales/zh-CN.js';
import { HI } from './locales/hi.js';
import { ES } from './locales/es.js';
import { AR } from './locales/ar.js';
import { FR } from './locales/fr.js';
import { PT_BR } from './locales/pt-BR.js';
import { PT_PT } from './locales/pt-PT.js';
import { RU } from './locales/ru.js';
import { DE } from './locales/de.js';
import { ID } from './locales/id.js';
import { BN } from './locales/bn.js';
import { TR } from './locales/tr.js';
import { KO } from './locales/ko.js';
import { VI } from './locales/vi.js';
import { IT } from './locales/it.js';
import { NL } from './locales/nl.js';
import { PL } from './locales/pl.js';
import { TH } from './locales/th.js';
import { UR } from './locales/ur.js';
import { FA } from './locales/fa.js';
import { SW } from './locales/sw.js';
import { ZH_TW } from './locales/zh-TW.js';
import { UK } from './locales/uk.js';

export const I18N = {
  ja: JA,
  en: EN,
  'zh-CN': ZH_CN,
  hi: HI,
  es: ES,
  ar: AR,
  fr: FR,
  'pt-BR': PT_BR,
  'pt-PT': PT_PT,
  ru: RU,
  de: DE,
  id: ID,
  bn: BN,
  tr: TR,
  ko: KO,
  vi: VI,
  it: IT,
  nl: NL,
  pl: PL,
  th: TH,
  ur: UR,
  fa: FA,
  sw: SW,
  'zh-TW': ZH_TW,
  uk: UK,
} as const;
export const LANGUAGES = ['ja', 'en', 'zh-CN', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'pt-PT', 'ru', 'de', 'id', 'bn', 'tr', 'ko', 'vi', 'it', 'nl', 'pl', 'th', 'ur', 'fa', 'sw', 'zh-TW', 'uk'] as const;
export type Language = (typeof LANGUAGES)[number];
type JapaneseDictionary = typeof JA;
export type TranslationKey = {
  [Key in keyof JapaneseDictionary]: JapaneseDictionary[Key] extends string ? Key : never;
}[keyof JapaneseDictionary];
export type TranslationVariables = Readonly<Record<string, string | number>>;

export function isLanguage(value: string): value is Language {
  return LANGUAGES.some((lang) => lang === value);
}

export function resolveLanguage(preferred: readonly string[]): Language {
  for (const value of preferred) {
    const normalized = value.toLowerCase().replace(/_/g, '-');
    if (normalized === 'zh' || normalized.startsWith('zh-')) {
      if (normalized.startsWith('zh-hant') || ['tw', 'hk', 'mo'].some((region) => normalized.split('-').includes(region))) return 'zh-TW';
      return 'zh-CN';
    }
    if (normalized === 'pt' || normalized.startsWith('pt-')) {
      const region = normalized.split('-')[1];
      return region === 'pt' || region === 'ao' || region === 'mz' || region === 'cv'
        || region === 'gw' || region === 'st' || region === 'tl' ? 'pt-PT' : 'pt-BR';
    }
    const primary = normalized.split('-')[0];
    if (primary && isLanguage(primary)) return primary;
  }
  return 'en';
}

export function translate(lang: string, key: TranslationKey, vars: TranslationVariables = {}): string {
  const dict = I18N[isLanguage(lang) ? lang : 'en'];
  const template: string = dict[key];
  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ''));
}
