import type { JA } from './ja.js';

type RequiredTexts = {
  [Key in keyof typeof JA as (typeof JA)[Key] extends string ? Key : never]: string;
};

export type LocaleDictionary = RequiredTexts & {
  helpSections: readonly {
    title?: string;
    items: readonly {
      label: string;
      text?: string;
      href?: string;
      linkText?: string;
    }[];
  }[];
  clueOptionLabels: Readonly<Record<17 | 24 | 28 | 32 | 38 | 44, string>>;
};
