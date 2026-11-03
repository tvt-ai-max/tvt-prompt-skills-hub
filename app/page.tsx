import { Hero } from '@/components/Hero';
import { HubExplorer } from '@/components/HubExplorer';
import { TierLadder } from '@/components/TierLadder';
import type { Metadata } from 'next';
import { getStats } from '@/lib/content';
import { JsonLd } from '@/components/JsonLd';
import { T } from '@/components/I18nProvider';
import { homeJsonLd, localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = { alternates: localeAlternates('/') };

export default function HomePage() {
  const stats = getStats();
  return (
    <>
      <JsonLd data={homeJsonLd(SITE_URL, stats)} />
      <Hero stats={stats} />
      <TierLadder />
      <section id="catalog" aria-labelledby="catalog-title" className="scroll-mt-20 pt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 id="catalog-title" className="text-2xl font-bold tracking-tight">
              <T k="home.catalogTitle" />
            </h2>
            <p className="mt-1 text-sm text-muted">
              <T k="home.catalogLead" />
            </p>
          </div>
        </div>
        <HubExplorer />
      </section>
    </>
  );
}
