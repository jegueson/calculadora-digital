import { MetadataRoute } from 'next';
import { buildSitemapEntries } from '@/data/sitemap-entries';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(new Date().toISOString());
}
