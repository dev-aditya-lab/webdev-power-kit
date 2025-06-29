/**
 * Check if the user is online.
 * @returns {boolean} - true if online, false if offline
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * Subscribe to online/offline status changes.
 * @param {(status: boolean) => void} callback - called with true (online) or false (offline)
 */
export function listenNetworkStatus(callback) {
  const updateStatus = () => callback(navigator.onLine);

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);

  // Call once initially
  updateStatus();

  return () => {
    window.removeEventListener("online", updateStatus);
    window.removeEventListener("offline", updateStatus);
  };
}
