/**
 * Requests permission to send notifications to the user.
 * @returns A Promise that resolves with the permission status
 */
export function requestNotificationPermission(): Promise<NotificationPermission> {
  return Notification.requestPermission();
}

/**
 * Sends a browser notification with options.
 * @param title - Title of the notification
 * @param options - Optional NotificationOptions object
 * @returns A Promise that resolves after showing the notification
 */
export function sendNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!("Notification" in window)) {
      reject(new Error("This browser does not support notifications."));
      return;
    }

    if (Notification.permission !== "granted") {
      reject(new Error("Notification permission not granted."));
      return;
    }

    const notification = new Notification(title, options);
    notification.onclick = () => resolve();
  });
}
