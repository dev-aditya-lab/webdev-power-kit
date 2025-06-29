/**
 * Ask user for notification permission if not already granted.
 * @returns {Promise<NotificationPermission>}
 */
export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    throw new Error("This browser does not support notifications.");
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  return Notification.requestPermission();
}

/**
 * Send a browser notification.
 * @param {string} title - Notification title
 * @param {Object} [options] - Optional settings like body, icon, etc.
 */
export async function sendNotification(title, options = {}) {
  const permission = await requestNotificationPermission();

  if (permission === "granted") {
    new Notification(title, options);
  } else {
    console.warn("Notification permission denied.");
  }
}
