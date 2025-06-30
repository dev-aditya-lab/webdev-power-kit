/**
 * Copies a given string to the clipboard.
 * @param text - The text to copy
 * @returns A Promise that resolves when the copy is complete
 */
export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

/**
 * Reads the current string from the clipboard.
 * @returns A Promise that resolves to clipboard content
 */
export function readClipboard(): Promise<string> {
  return navigator.clipboard.readText();
}
