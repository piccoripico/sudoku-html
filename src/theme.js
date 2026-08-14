import { I18N, translate } from './lib/i18n.js';
import { LANGUAGE_STORAGE_KEY, THEME_STORAGE_KEY, readPreferenceValue, storePreferenceValue } from './lib/preferences.js';
const THEME_PREFERENCES = new Set(['system', 'light', 'dark']);
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const themeSelectEl = document.getElementById('theme');
const themeLabelEl = document.getElementById('themeLabel');
const langSelectEl = document.getElementById('lang');

let themePreference = readStoredThemePreference();

function readStoredThemePreference() {
  const savedPreference = readPreferenceValue(THEME_STORAGE_KEY);
  return THEME_PREFERENCES.has(savedPreference) ? savedPreference : 'system';
}

function storeThemePreference(preference) {
  storePreferenceValue(THEME_STORAGE_KEY, preference);
}

function resolveTheme(preference) {
  if (preference === 'dark') return 'dark';
  if (preference === 'light') return 'light';
  return systemThemeQuery.matches ? 'dark' : 'light';
}

function applyTheme(preference) {
  document.documentElement.dataset.theme = resolveTheme(preference);

  if (themeSelectEl.value !== preference) {
    themeSelectEl.value = preference;
  }
}

function getInitialLanguage() {
  const savedLang = readPreferenceValue(LANGUAGE_STORAGE_KEY);
  if (I18N[savedLang]) {
    return savedLang;
  }

  return (navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

function updateThemeLabels(lang = langSelectEl.value) {
  const resolvedLang = I18N[lang] ? lang : 'ja';
  themeLabelEl.textContent = translate(resolvedLang, 'themeLabel');

  const labels = {
    system: translate(resolvedLang, 'themeSystem'),
    light: translate(resolvedLang, 'themeLight'),
    dark: translate(resolvedLang, 'themeDark')
  };

  for (const option of themeSelectEl.options) {
    option.textContent = labels[option.value] || option.value;
  }
}

function handleSystemThemeChange() {
  if (themePreference === 'system') {
    applyTheme(themePreference);
  }
}

themeSelectEl.addEventListener('change', (event) => {
  const nextPreference = THEME_PREFERENCES.has(event.target.value)
    ? event.target.value
    : 'system';

  themePreference = nextPreference;
  storeThemePreference(themePreference);
  applyTheme(themePreference);
});

langSelectEl.addEventListener('change', () => updateThemeLabels());

if (typeof systemThemeQuery.addEventListener === 'function') {
  systemThemeQuery.addEventListener('change', handleSystemThemeChange);
} else if (typeof systemThemeQuery.addListener === 'function') {
  systemThemeQuery.addListener(handleSystemThemeChange);
}

applyTheme(themePreference);
updateThemeLabels(getInitialLanguage());
