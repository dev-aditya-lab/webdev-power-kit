/**
 * @fileoverview Get browser network connection details using the Network Information API.
 * Provides type, speed estimate, save-data preference, etc.
 */

interface ConnectionInfo {
  type?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  isSupported: boolean;
}

/**
 * Returns current network connection information.
 * Falls back gracefully if API is not supported.
 * 
 * @returns An object with network type, speed, and flags.
 */
export function getConnectionInfo(): ConnectionInfo {
  const nav = navigator as any;

  if (!nav.connection) {
    return {
      isSupported: false
    };
  }

  const connection = nav.connection;

  return {
    type: connection.type ?? undefined,
    effectiveType: connection.effectiveType ?? undefined,
    downlink: connection.downlink ?? undefined,
    rtt: connection.rtt ?? undefined,
    saveData: connection.saveData ?? undefined,
    isSupported: true
  };
}
