import { I18N, translate } from './lib/i18n.js';

const THEME_STORAGE_KEY = 'sudoku_theme';
const THEME_PREFERENCES = new Set(['system', 'light', 'dark']);
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const themeSelectEl = document.getElementById('theme');
const themeLabelEl = document.getElementById('themeLabel');
const langSelectEl = document.getElementById('lang');

let themePreference = readStoredThemePreference();

function readStoredThemePreference() {
  try {
    const savedPreference = localStorage.getItem(THEME_STORAGE_KEY);
    if (THEME_PREFERENCES.has(savedPreference)) {
      return savedPreference;
    }
  } catch {
    // localStorage can be unavailable in restrictive browser contexts.
  }

  return 'system';
}

function storeThemePreference(preference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Keep the selected theme for the current page even if persistence fails.
  }
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
  try {
    const savedLang = localStorage.getItem('sudoku_lang');
    if (I18N[savedLang]) {
      return savedLang;
    }
  } catch {
    // Fall back to the browser language when storage is unavailable.
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
