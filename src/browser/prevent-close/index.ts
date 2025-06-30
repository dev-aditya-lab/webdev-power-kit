let listenerAttached = false;
let currentMessage = "Are you sure you want to leave? Changes may not be saved.";

/**
 * Enables the tab close or refresh warning popup.
 * @param message Optional custom message for the prompt.
 */
export function enablePreventClose(message?: string): void {
  if (listenerAttached) return;
  listenerAttached = true;

  if (message) currentMessage = message;

  window.addEventListener("beforeunload", beforeUnloadHandler);
}

function beforeUnloadHandler(e: BeforeUnloadEvent): void {
  e.preventDefault();
  e.returnValue = currentMessage; // Most browsers use this for legacy
}

/**
 * Disables the warning popup and allows normal tab closing.
 */
export function disablePreventClose(): void {
  if (!listenerAttached) return;
  window.removeEventListener("beforeunload", beforeUnloadHandler);
  listenerAttached = false;
}
