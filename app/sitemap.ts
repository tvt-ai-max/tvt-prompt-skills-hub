import type { MetadataRoute } from 'next';
import { getAllItems } from '@/lib/content';
import { buildSitemapEntries } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date().toISOString().slice(0, 10);
  return buildSitemapEntries(getAllItems(), SITE_URL, buildDate);
}
