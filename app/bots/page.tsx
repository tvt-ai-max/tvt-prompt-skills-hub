import type { Metadata } from 'next';
import { Bot } from 'lucide-react';
import { getAllBots } from '@/lib/content';
import { toBotSummary } from '@/lib/bot-summary';
import { BotsExplorer } from '@/components/BotsExplorer';
import { T } from '@/components/I18nProvider';
import { localeAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Bots — 317 AI Workforce & Specialist Personas',
  description:
    '16 agent lõi của TVT Agency & toilatung.com và 301 chuyên gia theo 10 chuyên khoa (Marketing, Developing, Technology, Business, Writing, Creative Arts, Finance, Education, Entertainment, Fitness) — copy System Prompt hoặc ChatGPT Custom Instructions 1 chạm.',
  alternates: localeAlternates('/bots'),
};

export default function BotsPage() {
  const bots = getAllBots().map(toBotSummary);
  return (
    <div className="pt-10">
      <header className="mb-8 max-w-3xl">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-violet-300 uppercase">
          <Bot className="size-4" aria-hidden />
          <T k="bots.eyebrow" />
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          <T k="bots.title" vars={{ count: bots.length }} />
        </h1>
        <p className="mt-3 text-muted">
          <T k="bots.lead" />
        </p>
      </header>
      <BotsExplorer bots={bots} />
    </div>
  );
}
