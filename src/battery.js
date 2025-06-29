/**
 * Get battery status using the Battery API.
 * @returns {Promise<{ level: number, charging: boolean }>}
 */
export async function getBatteryStatus() {
  if (!navigator.getBattery) {
    throw new Error("Battery API not supported in this browser.");
  }

  const battery = await navigator.getBattery();

  return {
    level: Math.round(battery.level * 100),  // 0.58 → 58%
    charging: battery.charging
  };
}
