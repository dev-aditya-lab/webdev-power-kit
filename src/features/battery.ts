/**
 * Returns the battery level as a percentage (0–100)
 */
export async function getBatteryLevel(): Promise<number> {
  const battery = await (navigator as any).getBattery();
  return Math.round(battery.level * 100);
}

/**
 * Checks if the device is currently charging
 */
export async function isCharging(): Promise<boolean> {
  const battery = await (navigator as any).getBattery();
  return battery.charging;
}

/**
 * Listen to battery level or charging state change
 * @param callback Function to call on any battery change
 */
export async function onBatteryChange(callback: () => void): Promise<void> {
  const battery = await (navigator as any).getBattery();

  battery.addEventListener("chargingchange", callback);
  battery.addEventListener("levelchange", callback);
}
