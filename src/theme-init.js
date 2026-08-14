(() => {
  const enabledStorageKey = 'sudoku_preferences_enabled';
  const themeStorageKey = 'sudoku_theme';
  const validPreferences = new Set(['system', 'light', 'dark']);
  let preference = 'system';

  try {
    const persistenceEnabled = localStorage.getItem(enabledStorageKey) === 'true';
    const savedPreference = persistenceEnabled ? localStorage.getItem(themeStorageKey) : null;
    if (validPreferences.has(savedPreference)) {
      preference = savedPreference;
    }
  } catch {
    // localStorage can be unavailable in restrictive browser contexts.
  }

  const systemPrefersDark = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = preference === 'dark' || (preference === 'system' && systemPrefersDark)
    ? 'dark'
    : 'light';

  document.documentElement.dataset.theme = theme;
})();
