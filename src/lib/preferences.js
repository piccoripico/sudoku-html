export const PREFERENCES_ENABLED_STORAGE_KEY = 'sudoku_preferences_enabled';
export const CLUE_COUNT_STORAGE_KEY = 'sudoku_clue_count';
export const SEED_STORAGE_KEY = 'sudoku_seed';
export const LANGUAGE_STORAGE_KEY = 'sudoku_lang';
export const THEME_STORAGE_KEY = 'sudoku_theme';

const PREFERENCE_STORAGE_KEYS = [
  PREFERENCES_ENABLED_STORAGE_KEY,
  CLUE_COUNT_STORAGE_KEY,
  SEED_STORAGE_KEY,
  LANGUAGE_STORAGE_KEY,
  THEME_STORAGE_KEY
];

function resolveStorage(storage) {
  if (storage) {
    return storage;
  }

  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

function readRawStorageValue(key, storage) {
  const target = resolveStorage(storage);
  if (!target) {
    return null;
  }

  try {
    return target.getItem(key);
  } catch {
    return null;
  }
}

function storeRawStorageValue(key, value, storage) {
  const target = resolveStorage(storage);
  if (!target) {
    return false;
  }

  try {
    target.setItem(key, String(value));
    return true;
  } catch {
    return false;
  }
}

function removeRawStorageValue(key, storage) {
  const target = resolveStorage(storage);
  if (!target) {
    return false;
  }

  try {
    target.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function isPreferencePersistenceEnabled(storage) {
  return readRawStorageValue(PREFERENCES_ENABLED_STORAGE_KEY, storage) === 'true';
}

export function clearPreferenceStorage(storage) {
  let succeeded = true;

  for (const key of PREFERENCE_STORAGE_KEYS) {
    succeeded = removeRawStorageValue(key, storage) && succeeded;
  }

  return succeeded;
}

export function normalizePreferenceStorage(storage) {
  if (isPreferencePersistenceEnabled(storage)) {
    return true;
  }

  clearPreferenceStorage(storage);
  return false;
}

export function setPreferencePersistenceEnabled(enabled, storage) {
  if (enabled) {
    return storeRawStorageValue(PREFERENCES_ENABLED_STORAGE_KEY, 'true', storage);
  }

  return clearPreferenceStorage(storage);
}

export function readPreferenceValue(key, storage) {
  if (!isPreferencePersistenceEnabled(storage)) {
    return null;
  }

  return readRawStorageValue(key, storage);
}

export function storePreferenceValue(key, value, storage) {
  if (!isPreferencePersistenceEnabled(storage)) {
    return false;
  }

  return storeRawStorageValue(key, value, storage);
}

export function removePreferenceValue(key, storage) {
  if (!isPreferencePersistenceEnabled(storage)) {
    return false;
  }

  return removeRawStorageValue(key, storage);
}

export function readStoredClueCount(storage) {
  const rawValue = readPreferenceValue(CLUE_COUNT_STORAGE_KEY, storage);
  if (rawValue == null || rawValue.trim() === '') {
    return null;
  }

  const clueCount = Number(rawValue);
  return Number.isInteger(clueCount) ? clueCount : null;
}

export function storeClueCount(value, storage) {
  const clueCount = Number(value);
  if (!Number.isInteger(clueCount)) {
    return false;
  }

  return storePreferenceValue(CLUE_COUNT_STORAGE_KEY, clueCount, storage);
}

export function readStoredSeed(storage) {
  return readPreferenceValue(SEED_STORAGE_KEY, storage) ?? '';
}

export function storeSeed(value, storage) {
  const seed = String(value ?? '').trim();

  if (seed === '') {
    return removePreferenceValue(SEED_STORAGE_KEY, storage);
  }

  return storePreferenceValue(SEED_STORAGE_KEY, seed, storage);
}
