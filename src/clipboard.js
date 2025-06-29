/**
 * Copy text to clipboard
 * @param {string} text - The text you want to copy
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

/**
 * Read text from clipboard
 * @returns {Promise<string>}
 */
export async function readClipboard() {
  return navigator.clipboard.readText();
}
