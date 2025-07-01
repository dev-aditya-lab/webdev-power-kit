/**
 * @fileoverview Performs a ping to a given URL by making a HEAD request.
 * Useful for checking server/API availability and latency.
 */

export interface PingResult {
  success: boolean;
  status?: number;
  time?: number; // in ms
  error?: string;
}

/**
 * Sends a HEAD request to the specified URL and measures the response time.
 * @param url - The URL to ping (must support HEAD method)
 * @returns A promise that resolves with result, status, and timing
 */
export async function ping(url: string): Promise<PingResult> {
  if (typeof url !== 'string' || !/^https?:\/\//.test(url)) {
    throw new Error('[webdev-power-kit][ping] Invalid URL. Must be a valid http(s) URL.');
  }

  const start = performance.now();

  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    const end = performance.now();

    return {
      success: res.ok,
      status: res.status,
      time: Math.round(end - start),
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Unknown error',
    };
  }
}
