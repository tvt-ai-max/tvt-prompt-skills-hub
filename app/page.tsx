import { Hero } from '@/components/Hero';
import { HubExplorer } from '@/components/HubExplorer';
import { TierLadder } from '@/components/TierLadder';
import { getStats } from '@/lib/content';

export default function HomePage() {
  const stats = getStats();
  return (
    <>
      <Hero stats={stats} />
      <TierLadder />
      <section id="catalog" aria-labelledby="catalog-title" className="scroll-mt-20 pt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 id="catalog-title" className="text-2xl font-bold tracking-tight">
              Kho năng lực
            </h2>
            <p className="mt-1 text-sm text-muted">Bấm vào một thẻ để điền biến, xem live preview và copy đa nền tảng.</p>
          </div>
        </div>
        <HubExplorer />
      </section>
    </>
  );
}
