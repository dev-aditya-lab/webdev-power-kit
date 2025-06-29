/**
 * Vibrate the device using the Vibration API.
 * @param {number | number[]} pattern - A single number or array of durations
 * @returns {boolean} - Whether vibration was successfully triggered
 */
export function vibrate(pattern) {
  if (!("vibrate" in navigator)) {
    console.warn("Vibration API not supported.");
    return false;
  }

  return navigator.vibrate(pattern);
}
