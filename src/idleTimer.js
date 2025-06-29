let timeoutId = null;
const activityEvents = ["mousemove", "keydown", "scroll", "touchstart"];

/**
 * Detects user inactivity and runs a callback after given seconds.
 * @param {number} seconds - Idle time in seconds before triggering
 * @param {() => void} onIdle - Callback to run when user becomes idle
 * @returns {() => void} - Function to stop the idle timer
 */
export function startIdleTimer(seconds, onIdle) {
  const ms = seconds * 1000;

  const resetTimer = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(onIdle, ms);
  };

  activityEvents.forEach((event) =>
    window.addEventListener(event, resetTimer)
  );

  resetTimer(); // Start the initial timer

  return () => {
    clearTimeout(timeoutId);
    activityEvents.forEach((event) =>
      window.removeEventListener(event, resetTimer)
    );
  };
}
