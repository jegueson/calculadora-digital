import { getPublishedCalculators, SITE_URL, type ChangeFrequency } from './calculators.ts';
import {
  GEO_HUB_CANONICAL,
  geoCanonical,
  getAllGeoLocations,
} from './geo-locations.ts';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: ChangeFrequency | 'daily';
  priority: number;
}

/**
 * Home, published calculators, and Brazil geo landing pages.
 * Placeholder calculator routes stay out.
 */
export function buildSitemapEntries(lastModified: string): SitemapEntry[] {
  const home: SitemapEntry = {
    url: SITE_URL,
    lastModified,
    changeFrequency: 'daily',
    priority: 1,
  };

  const calculators = getPublishedCalculators()
    .sort((a, b) => a.sitemapOrder - b.sitemapOrder)
    .map((entry) => ({
      url: `${SITE_URL}/${entry.slug}/`,
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.sitemapPriority,
    }));

  const geoHub: SitemapEntry = {
    url: GEO_HUB_CANONICAL,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  };

  const geoPages = getAllGeoLocations().map((location) => ({
    url: geoCanonical(location.slug),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [home, ...calculators, geoHub, ...geoPages];
}
