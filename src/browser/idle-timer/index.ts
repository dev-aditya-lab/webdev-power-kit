let idleTimeoutID: ReturnType<typeof setTimeout> | null = null;
let isListening = false;

/**
 * Starts the idle timer.
 * @param timeout - Time in milliseconds before user is considered idle.
 * @param callback - Function to call when user becomes idle.
 */
export function startIdleTimer(timeout: number, callback: () => void): void {
  if (isListening) return; // Avoid duplicate listeners
  isListening = true;

  const resetTimer = () => {
    if (idleTimeoutID) clearTimeout(idleTimeoutID);
    idleTimeoutID = setTimeout(callback, timeout);
  };

  // Events that indicate activity
  const events = [
    "mousemove", "keydown", "mousedown", "touchstart", "scroll"
  ];

  events.forEach((event) =>
    window.addEventListener(event, resetTimer, { passive: true })
  );

  resetTimer(); // start on load
}

/**
 * Manually reset the idle timer.
 */
export function resetIdleTimer(): void {
  if (idleTimeoutID) {
    clearTimeout(idleTimeoutID);
    idleTimeoutID = null;
  }
}

/**
 * Stops the idle timer and removes event listeners.
 */
export function stopIdleTimer(): void {
  if (!isListening) return;

  const events = [
    "mousemove", "keydown", "mousedown", "touchstart", "scroll"
  ];

  events.forEach((event) =>
    window.removeEventListener(event, resetIdleTimer)
  );

  if (idleTimeoutID) {
    clearTimeout(idleTimeoutID);
    idleTimeoutID = null;
  }

  isListening = false;
}
