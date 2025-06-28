/**
 * Sends a browser notification.
 * @param title - Main title shown in notification
 * @param options - Body, icon, etc. (optional)
 */
export async function sendNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  if (!("Notification" in window)) {
    throw new Error("This browser does not support notifications.");
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    new Notification(title, options);
  } else {
    throw new Error("Notification permission denied.");
  }
}
