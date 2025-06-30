/**
 * @fileoverview Debounce utility — delays function execution until after a pause.
 * Useful for input events, search bars, resize listeners, etc.
 */

type DebouncedFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

/**
 * Creates a debounced version of the given function.
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns A debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  if (typeof fn !== 'function') {
    throw new TypeError('[webdev-power-kit][debounce] First argument must be a function.');
  }

  if (typeof delay !== 'number' || delay < 0) {
    throw new TypeError('[webdev-power-kit][debounce] Delay must be a non-negative number.');
  }

  let timer: ReturnType<typeof setTimeout> | null = null;

  return function debouncedFn(...args: Parameters<T>) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      try {
        fn(...args);
      } catch (err) {
        console.error('[webdev-power-kit][debounce] Function threw an error:', err);
      }
    }, delay);
  };
}
