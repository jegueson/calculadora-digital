/**
 * Measurement ids already present in the site, plus empty placeholders.
 *
 * GTM-5LSC26G is the only tag id checked into the repo.
 * There is no GA4 measurement id (G-...) and no AdSense publisher id (ca-pub-...).
 * Do not invent them. Set the env vars below when the real ids exist.
 */

export const GTM_ID = 'GTM-5LSC26G';

const GA4_PATTERN = /^G-[A-Z0-9]+$/;
const ADSENSE_CLIENT_PATTERN = /^ca-pub-\d+$/;

function readMatchingEnv(name: string, pattern: RegExp): string {
  const value = process.env[name]?.trim() ?? '';
  return pattern.test(value) ? value : '';
}

/** Empty until NEXT_PUBLIC_GA4_MEASUREMENT_ID is a real G- id. */
export const GA4_MEASUREMENT_ID = readMatchingEnv('NEXT_PUBLIC_GA4_MEASUREMENT_ID', GA4_PATTERN);

/** Empty until NEXT_PUBLIC_ADSENSE_CLIENT is a real ca-pub- id. */
export const ADSENSE_CLIENT_ID = readMatchingEnv('NEXT_PUBLIC_ADSENSE_CLIENT', ADSENSE_CLIENT_PATTERN);

/**
 * Ad unit ids are not in the repo. Placements stay empty so no slot is requested.
 * The layout still reserves these names below the calculator, never above the inputs.
 */
export const ADSENSE_SLOT_IDS = {
  'after-calculator': '',
  'after-related': '',
} as const;

export type AdPlacement = keyof typeof ADSENSE_SLOT_IDS;
