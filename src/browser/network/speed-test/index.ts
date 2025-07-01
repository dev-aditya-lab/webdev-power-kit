/**
 * @fileoverview Downloads a dummy Blob to estimate download speed (in Mbps).
 * Fully client-side, no external server required.
 */

export interface SpeedTestResult {
  speedMbps: number;
  timeTaken: number; // in milliseconds
  success: boolean;
  error?: string;
}

/**
 * Measures approximate download speed by generating a Blob and downloading it.
 * @param sizeInMB - Size in MB to download (default is 1MB)
 * @returns Promise resolving to download speed in Mbps
 */
export async function testNetworkSpeed(sizeInMB = 1): Promise<SpeedTestResult> {
  if (typeof sizeInMB !== 'number' || sizeInMB <= 0) {
    throw new Error('[webdev-power-kit][speed-test] Size must be a positive number.');
  }

  const blobSize = sizeInMB * 1024 * 1024; // Convert MB to bytes
  const dummyData = new Uint8Array(blobSize);
  const blob = new Blob([dummyData]);

  const start = performance.now();

  try {
    // Simulate a download using blob → object URL → fetch
    const blobUrl = URL.createObjectURL(blob);
    await fetch(blobUrl).then(res => res.blob());
    const end = performance.now();

    const timeTaken = end - start;
    const speedMbps = ((blobSize * 8) / (timeTaken / 1000)) / (1024 * 1024); // bits/ms to Mbps

    return {
      success: true,
      speedMbps: +speedMbps.toFixed(2),
      timeTaken: Math.round(timeTaken),
    };
  } catch (err: any) {
    return {
      success: false,
      speedMbps: 0,
      timeTaken: 0,
      error: err.message || 'Unknown error',
    };
  }
}
