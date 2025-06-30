/**
 * @fileoverview Throttle utility — limits how often a function can run.
 * Useful for scroll events, mouse moves, resize, etc.
 */

type ThrottledFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

/**
 * Creates a throttled version of the given function.
 * @param fn - Function to throttle
 * @param interval - Minimum time (in ms) between calls
 * @returns A throttled function
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  interval: number
): ThrottledFunction<T> {
  if (typeof fn !== 'function') {
    throw new TypeError('[webdev-power-kit][throttle] First argument must be a function.');
  }

  if (typeof interval !== 'number' || interval < 0) {
    throw new TypeError('[webdev-power-kit][throttle] Interval must be a non-negative number.');
  }

  let lastCalled = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function throttledFn(...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCalled;

    if (timeSinceLastCall >= interval) {
      lastCalled = now;
      try {
        fn(...args);
      } catch (err) {
        console.error('[webdev-power-kit][throttle] Function threw an error:', err);
      }
    } else if (!timeoutId) {
      const timeRemaining = interval - timeSinceLastCall;
      timeoutId = setTimeout(() => {
        timeoutId = null;
        lastCalled = Date.now();
        try {
          fn(...args);
        } catch (err) {
          console.error('[webdev-power-kit][throttle] Function threw an error:', err);
        }
      }, timeRemaining);
    }
  };
}
