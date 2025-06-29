/**
 * Detect if user prefers dark mode based on system/browser settings.
 * @returns {boolean} - true if dark mode is preferred
 */
export function isDarkMode() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Listen for system theme changes in real-time.
 * @param {(isDark: boolean) => void} callback - Called when theme changes
 * @returns {() => void} - Function to remove listener
 */
export function listenDarkMode(callback) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e) => callback(e.matches);

  mediaQuery.addEventListener("change", handler);

  // Trigger once initially
  callback(mediaQuery.matches);

  return () => {
    mediaQuery.removeEventListener("change", handler);
  };
}
