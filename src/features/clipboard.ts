/**
 * Copy given text to clipboard.
 * @param text - The string you want to copy
 * @returns A Promise<void> (successful or failed)
 */
export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

/**
 * Read current clipboard text.
 * @returns A Promise<string> - Clipboard's text content
 */
export function readClipboard(): Promise<string> {
  return navigator.clipboard.readText();
}
