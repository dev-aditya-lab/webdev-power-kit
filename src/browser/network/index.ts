/**
 * Checks if the browser is currently online.
 * @returns {boolean} True if online, false if offline.
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Listen for changes in network status (online/offline).
 * @param callback - A function that receives the current status.
 */
export function onNetworkChange(callback: (online: boolean) => void): void {
  const updateStatus = () => callback(navigator.onLine);

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
}
