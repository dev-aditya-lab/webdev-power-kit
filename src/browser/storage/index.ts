/**
 * @fileoverview A utility to interact safely with localStorage and sessionStorage
 * with built-in error handling and JSON support.
 */

type StorageType = 'local' | 'session';

/**
 * Returns the correct Storage object based on type.
 * @param type - 'local' or 'session'
 */
function getStorage(type: StorageType): Storage | null {
  try {
    const storage = type === 'local' ? window.localStorage : window.sessionStorage;
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return storage;
  } catch (err) {
    console.error(`[webdev-power-kit][storage] Storage unavailable:`, err);
    return null;
  }
}

/**
 * Sets a value in storage.
 * @param key - Storage key
 * @param value - Any serializable value
 * @param type - 'local' (default) or 'session'
 */
export function setItem<T>(key: string, value: T, type: StorageType = 'local'): void {
  const storage = getStorage(type);
  if (!storage) return;

  try {
    const json = JSON.stringify(value);
    storage.setItem(key, json);
  } catch (err) {
    console.error(`[webdev-power-kit][storage] Failed to set item "${key}":`, err);
  }
}

/**
 * Gets a value from storage.
 * @param key - Storage key
 * @param type - 'local' (default) or 'session'
 * @returns Parsed value or null
 */
export function getItem<T>(key: string, type: StorageType = 'local'): T | null {
  const storage = getStorage(type);
  if (!storage) return null;

  try {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error(`[webdev-power-kit][storage] Failed to get item "${key}":`, err);
    return null;
  }
}

/**
 * Removes a key from storage.
 * @param key - Key to remove
 * @param type - 'local' (default) or 'session'
 */
export function removeItem(key: string, type: StorageType = 'local'): void {
  const storage = getStorage(type);
  if (!storage) return;

  try {
    storage.removeItem(key);
  } catch (err) {
    console.error(`[webdev-power-kit][storage] Failed to remove item "${key}":`, err);
  }
}

/**
 * Clears all storage keys.
 * @param type - 'local' (default) or 'session'
 */
export function clearStorage(type: StorageType = 'local'): void {
  const storage = getStorage(type);
  if (!storage) return;

  try {
    storage.clear();
  } catch (err) {
    console.error(`[webdev-power-kit][storage] Failed to clear ${type}Storage:`, err);
  }
}

/**
 * Checks if a key exists in storage.
 * @param key - Key to check
 * @param type - 'local' (default) or 'session'
 * @returns true if exists, false otherwise
 */
export function hasItem(key: string, type: StorageType = 'local'): boolean {
  const storage = getStorage(type);
  if (!storage) return false;

  try {
    return storage.getItem(key) !== null;
  } catch (err) {
    console.error(`[webdev-power-kit][storage] Failed to check item "${key}":`, err);
    return false;
  }
}

/**
 * Returns all keys in storage.
 * @param type - 'local' (default) or 'session'
 * @returns Array of keys
 */
export function getAllKeys(type: StorageType = 'local'): string[] {
  const storage = getStorage(type);
  if (!storage) return [];

  try {
    return Object.keys(storage);
  } catch (err) {
    console.error(`[webdev-power-kit][storage] Failed to get keys:`, err);
    return [];
  }
}
