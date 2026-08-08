(() => {
  const storageKey = 'sudoku_theme';
  const validPreferences = new Set(['system', 'light', 'dark']);
  let preference = 'system';

  try {
    const savedPreference = localStorage.getItem(storageKey);
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
