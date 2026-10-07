import { getPublishedCalculators, SITE_URL, type ChangeFrequency } from './calculators.ts';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: ChangeFrequency | 'daily';
  priority: number;
}

/**
 * Home plus every published calculator. Placeholder routes stay out.
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

  return [home, ...calculators];
}
