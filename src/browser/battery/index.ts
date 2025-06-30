interface BatteryManager extends EventTarget {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
  addEventListener(
    type: "chargingchange" | "levelchange",
    listener: (this: BatteryManager, ev: Event) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

/**
 * Returns the battery status using the Navigator API.
 * @returns Promise that resolves to a BatteryManager object
 */
export async function getBattery(): Promise<BatteryManager> {
  if (!("getBattery" in navigator)) {
    throw new Error("Battery API not supported.");
  }
  return await (navigator as any).getBattery();
}

/**
 * Returns current battery level as percentage (0–100).
 */
export async function getBatteryLevel(): Promise<number> {
  const battery = await getBattery();
  return battery.level * 100;
}

/**
 * Returns current charging status (true/false).
 */
export async function isBatteryCharging(): Promise<boolean> {
  const battery = await getBattery();
  return battery.charging;
}

/**
 * Subscribes to battery level or charging change events.
 * @param onChange Callback that runs when battery info updates
 */
export async function onBatteryChange(
  onChange: (battery: BatteryManager) => void
): Promise<void> {
  const battery = await getBattery();

  battery.addEventListener("levelchange", () => onChange(battery));
  battery.addEventListener("chargingchange", () => onChange(battery));
}
