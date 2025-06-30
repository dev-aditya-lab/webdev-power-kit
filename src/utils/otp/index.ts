/**
 * @fileoverview
 * A powerful and flexible OTP (One-Time Password) generator
 * Supports digits, uppercase, lowercase, symbols, and custom length
 */

export interface OTPOptions {
  /** Include digits like 0–9 (default: true) */
  digits?: boolean;
  /** Include lowercase letters like a–z */
  lowerCase?: boolean;
  /** Include uppercase letters like A–Z */
  upperCase?: boolean;
  /** Include symbols like @, #, $, %, etc. */
  symbols?: boolean;
}

/**
 * Generate a secure, random OTP using specified options.
 * Uses crypto.getRandomValues() for cryptographically secure randomness.
 *
 * @param length - Total length of the OTP (e.g., 6)
 * @param options - Character type options to include
 * @returns A string containing the generated OTP
 */
export function generateOTP(length: number, options: OTPOptions = { digits: true }): string {
  // Character pools
  const digitChars = '0123456789';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbolChars = '!@#$%^&*()_+[]{}<>?';

  // Combine selected character types into one string
  let characters = '';

  if (options.digits) characters += digitChars;
  if (options.lowerCase) characters += lowerChars;
  if (options.upperCase) characters += upperChars;
  if (options.symbols) characters += symbolChars;

  // Ensure at least one type is selected
  if (!characters) {
    throw new Error('At least one character type must be enabled in options.');
  }

  let otp = '';

  // Secure randomness: get 'length' random numbers using crypto API
  const cryptoObj = window.crypto || (window as any).msCrypto; // msCrypto fallback for old Edge
  const randomValues = new Uint32Array(length);
  cryptoObj.getRandomValues(randomValues);

  // Build OTP by mapping each random number to character in pool
  for (let i = 0; i < length; i++) {
    const index = randomValues[i] % characters.length;
    otp += characters.charAt(index);
  }

  return otp;
}
