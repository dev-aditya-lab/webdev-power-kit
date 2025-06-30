/**
 * Checks if user's OS prefers dark mode.
 * @returns boolean - true if dark mode is preferred
 */
export function isDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Toggle dark mode by adding/removing a class on <html>.
 * @param className Optional CSS class to toggle (default: "dark")
 */
export function toggleDarkMode(className = "dark"): void {
  document.documentElement.classList.toggle(className);
}

/**
 * Subscribe to changes in system theme (dark/light).
 * @param callback Function triggered on change
 */
export function onThemeChange(callback: (isDark: boolean) => void): void {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener("change", () => {
    callback(media.matches);
  });
}
