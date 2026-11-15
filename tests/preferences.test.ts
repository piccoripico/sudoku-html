import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CLUE_COUNT_STORAGE_KEY,
  COMPLETED_HIGHLIGHT_STORAGE_KEY,
  DUPLICATE_HIGHLIGHT_STORAGE_KEY,
  LANGUAGE_STORAGE_KEY,
  PREFERENCES_ENABLED_STORAGE_KEY,
  SEED_STORAGE_KEY,
  THEME_STORAGE_KEY,
  isPreferencePersistenceEnabled,
  normalizePreferenceStorage,
  readPreferenceValue,
  readStoredClueCount,
  readStoredCompletedHighlight,
  readStoredDuplicateHighlight,
  readStoredSeed,
  setPreferencePersistenceEnabled,
  storeClueCount,
  storeCompletedHighlight,
  storeDuplicateHighlight,
  storePreferenceValue,
  storeSeed,
  type StorageLike
} from '../src/lib/preferences.js';

function createStorage(initial: Record<string, string> = {}): StorageLike {
  const values = new Map<string, string>(Object.entries(initial));

  return {
    getItem(key: string): string | null {
      return values.get(key) ?? null;
    },
    setItem(key: string, value: string): void {
      values.set(key, String(value));
    },
    removeItem(key: string): void {
      values.delete(key);
    }
  };
}

test('preference persistence is off by default and stale values are removed', () => {
  const storage = createStorage({
    [CLUE_COUNT_STORAGE_KEY]: '28',
    [SEED_STORAGE_KEY]: '12345',
    [LANGUAGE_STORAGE_KEY]: 'ja',
    [THEME_STORAGE_KEY]: 'dark',
    [COMPLETED_HIGHLIGHT_STORAGE_KEY]: 'false',
    [DUPLICATE_HIGHLIGHT_STORAGE_KEY]: 'false'
  });

  assert.equal(normalizePreferenceStorage(storage), false);
  assert.equal(isPreferencePersistenceEnabled(storage), false);
  assert.equal(storage.getItem(PREFERENCES_ENABLED_STORAGE_KEY), null);
  assert.equal(storage.getItem(CLUE_COUNT_STORAGE_KEY), null);
  assert.equal(storage.getItem(SEED_STORAGE_KEY), null);
  assert.equal(storage.getItem(LANGUAGE_STORAGE_KEY), null);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), null);
  assert.equal(storage.getItem(COMPLETED_HIGHLIGHT_STORAGE_KEY), null);
  assert.equal(storage.getItem(DUPLICATE_HIGHLIGHT_STORAGE_KEY), null);
});

test('opting in stores the enabled flag and allows preferences to persist', () => {
  const storage = createStorage();

  assert.equal(setPreferencePersistenceEnabled(true, storage), true);
  assert.equal(storage.getItem(PREFERENCES_ENABLED_STORAGE_KEY), 'true');
  assert.equal(storeClueCount(28, storage), true);
  assert.equal(storeSeed('001234', storage), true);
  assert.equal(storePreferenceValue(LANGUAGE_STORAGE_KEY, 'ja', storage), true);
  assert.equal(storePreferenceValue(THEME_STORAGE_KEY, 'dark', storage), true);
  assert.equal(storeCompletedHighlight(false, storage), true);
  assert.equal(storeDuplicateHighlight(true, storage), true);

  assert.equal(readStoredClueCount(storage), 28);
  assert.equal(readStoredSeed(storage), '001234');
  assert.equal(readPreferenceValue(LANGUAGE_STORAGE_KEY, storage), 'ja');
  assert.equal(readPreferenceValue(THEME_STORAGE_KEY, storage), 'dark');
  assert.equal(readStoredCompletedHighlight(storage), false);
  assert.equal(readStoredDuplicateHighlight(storage), true);
});

test('opting out removes the enabled flag and every saved preference', () => {
  const storage = createStorage({
    [PREFERENCES_ENABLED_STORAGE_KEY]: 'true',
    [CLUE_COUNT_STORAGE_KEY]: '24',
    [SEED_STORAGE_KEY]: '98765',
    [LANGUAGE_STORAGE_KEY]: 'en',
    [THEME_STORAGE_KEY]: 'light',
    [COMPLETED_HIGHLIGHT_STORAGE_KEY]: 'false',
    [DUPLICATE_HIGHLIGHT_STORAGE_KEY]: 'false'
  });

  assert.equal(setPreferencePersistenceEnabled(false, storage), true);
  assert.equal(isPreferencePersistenceEnabled(storage), false);
  assert.equal(storage.getItem(PREFERENCES_ENABLED_STORAGE_KEY), null);
  assert.equal(storage.getItem(CLUE_COUNT_STORAGE_KEY), null);
  assert.equal(storage.getItem(SEED_STORAGE_KEY), null);
  assert.equal(storage.getItem(LANGUAGE_STORAGE_KEY), null);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), null);
  assert.equal(storage.getItem(COMPLETED_HIGHLIGHT_STORAGE_KEY), null);
  assert.equal(storage.getItem(DUPLICATE_HIGHLIGHT_STORAGE_KEY), null);
});

test('preferences are not written while persistence is disabled', () => {
  const storage = createStorage();

  assert.equal(storeClueCount(32, storage), false);
  assert.equal(storeSeed('123', storage), false);
  assert.equal(storePreferenceValue(LANGUAGE_STORAGE_KEY, 'ja', storage), false);
  assert.equal(storePreferenceValue(THEME_STORAGE_KEY, 'dark', storage), false);
  assert.equal(storeCompletedHighlight(false, storage), false);
  assert.equal(storeDuplicateHighlight(false, storage), false);
  assert.equal(storage.getItem(CLUE_COUNT_STORAGE_KEY), null);
  assert.equal(storage.getItem(SEED_STORAGE_KEY), null);
});

test('blank seed removes the saved seed while persistence remains enabled', () => {
  const storage = createStorage({ [PREFERENCES_ENABLED_STORAGE_KEY]: 'true' });

  assert.equal(storeSeed('001234', storage), true);
  assert.equal(readStoredSeed(storage), '001234');
  assert.equal(storeSeed('   ', storage), true);
  assert.equal(storage.getItem(SEED_STORAGE_KEY), null);
  assert.equal(readStoredSeed(storage), '');
  assert.equal(isPreferencePersistenceEnabled(storage), true);
});

test('invalid stored clue count is ignored when persistence is enabled', () => {
  const storage = createStorage({
    [PREFERENCES_ENABLED_STORAGE_KEY]: 'true',
    [CLUE_COUNT_STORAGE_KEY]: 'not-a-number'
  });

  assert.equal(readStoredClueCount(storage), null);
});

test('highlight preferences default to enabled when unset', () => {
  const storage = createStorage({ [PREFERENCES_ENABLED_STORAGE_KEY]: 'true' });

  assert.equal(readStoredCompletedHighlight(storage), true);
  assert.equal(readStoredDuplicateHighlight(storage), true);
});

test('storage failures are handled without throwing', () => {
  const storage = {
    getItem() {
      throw new Error('blocked');
    },
    setItem() {
      throw new Error('blocked');
    },
    removeItem() {
      throw new Error('blocked');
    }
  };

  assert.equal(normalizePreferenceStorage(storage), false);
  assert.equal(isPreferencePersistenceEnabled(storage), false);
  assert.equal(readPreferenceValue(LANGUAGE_STORAGE_KEY, storage), null);
  assert.equal(readStoredClueCount(storage), null);
  assert.equal(readStoredSeed(storage), '');
  assert.equal(readStoredCompletedHighlight(storage), true);
  assert.equal(readStoredDuplicateHighlight(storage), true);
  assert.equal(setPreferencePersistenceEnabled(true, storage), false);
  assert.equal(storeClueCount(32, storage), false);
  assert.equal(storeSeed('123', storage), false);
  assert.equal(storeCompletedHighlight(false, storage), false);
  assert.equal(storeDuplicateHighlight(false, storage), false);
});
