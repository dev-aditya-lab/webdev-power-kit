export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  heading?: number | null;
  speed?: number | null;
  timestamp: number;
}

export interface LocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

/**
 * Get current geolocation from user's device.
 */
export function getCurrentLocation(options?: LocationOptions): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation is not supported by this browser."));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = pos.coords;
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          altitude: coords.altitude,
          heading: coords.heading,
          speed: coords.speed,
          timestamp: pos.timestamp
        });
      },
      (err) => reject(err),
      options
    );
  });
}

/**
 * Continuously track user location.
 * @returns Watch ID to use with clearLocationWatch()
 */
export function watchLocation(
  callback: (location: Coordinates) => void,
  errorCallback?: (error: GeolocationPositionError) => void,
  options?: LocationOptions
): number {
  return navigator.geolocation.watchPosition(
    (pos) => {
      const coords = pos.coords;
      callback({
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        altitude: coords.altitude,
        heading: coords.heading,
        speed: coords.speed,
        timestamp: pos.timestamp
      });
    },
    errorCallback ?? (() => {}),
    options
  );
}

/**
 * Clear a location watch using its ID.
 */
export function clearLocationWatch(id: number): void {
  navigator.geolocation.clearWatch(id);
}
