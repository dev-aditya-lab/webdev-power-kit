/**
 * Returns true if the current tab is visible.
 */
export function isTabVisible(): boolean {
  return document.visibilityState === "visible";
}

/**
 * Subscribes to tab visibility changes.
 * @param callback - function to run on change (true = visible)
 */
export function onTabVisibilityChange(callback: (isVisible: boolean) => void): void {
  document.addEventListener("visibilitychange", () => {
    callback(document.visibilityState === "visible");
  });
}
