import type { Metadata } from 'next';
import { Bot } from 'lucide-react';
import { getAllBots } from '@/lib/content';
import { BotsExplorer } from '@/components/BotsExplorer';

export const metadata: Metadata = {
  title: 'Bots — 16 AI Workforce Personas',
  description:
    '16 AI agent trong lực lượng AI Workforce của TVT Agency & toilatung.com: system prompt chuyên sâu cho điều phối, nội dung & video, marketing & SEO, CRM & tự động hóa — copy 1 chạm.',
  alternates: { canonical: '/bots' },
};

export default function BotsPage() {
  const bots = getAllBots();
  return (
    <div className="pt-10">
      <header className="mb-8 max-w-3xl">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-violet-300 uppercase">
          <Bot className="size-4" aria-hidden />
          AI Workforce
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{bots.length} Bots chuyên trách</h1>
        <p className="mt-3 text-muted">
          Mỗi Bot là một agent có vai trò, quy trình, định dạng đầu ra và ranh giới an toàn riêng. Copy system prompt vào Claude
          Projects, ChatGPT GPTs, Claude Code subagent hoặc node AI của n8n — các Bot bàn giao việc cho nhau qua khối HANDOFF.
        </p>
      </header>
      <BotsExplorer bots={bots} />
    </div>
  );
}
