/**
 * Vibrates the device using the given pattern.
 * @param pattern - A single duration or array of vibration timings in ms.
 * @returns True if vibration was triggered successfully.
 */
export function vibrate(pattern: number | number[]): boolean {
  if ("vibrate" in navigator) {
    return navigator.vibrate(pattern);
  }
  return false;
}

/**
 * Stops any ongoing vibration.
 */
export function stopVibration(): void {
  if ("vibrate" in navigator) {
    navigator.vibrate(0);
  }
}
