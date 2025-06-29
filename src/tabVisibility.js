/**
 * Check if the current tab is visible (not minimized or hidden).
 * @returns {boolean}
 */
export function isTabVisible() {
  return document.visibilityState === "visible";
}

/**
 * Listen to tab visibility changes.
 * @param {(visible: boolean) => void} callback - Runs on visibility change
 * @returns {() => void} - Unsubscribe function
 */
export function listenTabVisibility(callback) {
  const handler = () => callback(document.visibilityState === "visible");

  document.addEventListener("visibilitychange", handler);

  // Call once initially
  handler();

  return () => {
    document.removeEventListener("visibilitychange", handler);
  };
}
