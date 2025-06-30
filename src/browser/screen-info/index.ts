export interface ScreenInfo {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  devicePixelRatio: number;
  orientation: string;
  isLandscape: boolean;
}

/**
 * Get current screen and viewport info
 */
export function getScreenInfo(): ScreenInfo {
  const orientation =
    (screen.orientation || {}).type || "unknown";

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    devicePixelRatio: window.devicePixelRatio,
    orientation: orientation,
    isLandscape: window.innerWidth > window.innerHeight
  };
}

/**
 * Listen for screen size changes (resize/orientation change)
 */
export function onScreenResize(
  callback: (info: ScreenInfo) => void
): void {
  const handler = () => callback(getScreenInfo());

  window.addEventListener("resize", handler);
  window.addEventListener("orientationchange", handler);
}
