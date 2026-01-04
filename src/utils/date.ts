/**
 * Get the current year dynamically
 * This ensures all year references update automatically without manual changes
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Get the current year as a string
 */
export function getCurrentYearString(): string {
  return getCurrentYear().toString();
}

