import { ArrowRight } from 'lucide-react';
import { SECTIONS } from '@/components/Badges';
import Link from 'next/link';
import type { HubStats } from '@/types/hub';
import { SearchTrigger } from '@/components/Navbar';
import { SITE_TAGLINE } from '@/lib/site';

const DESCRIPTIONS = {
  prompts: 'Micro-prompt có form biến {{VAR}} + nhóm Deep Reasoning',
  skills: 'Agent SOP chuẩn SKILL.md: inputs, tools, quality gates',
  bots: 'AI Workforce: system prompt cho 16 agent chuyên trách',
  workflows: 'Dây chuyền nhiều bước, nối biến tự động, xuất n8n / Python',
} as const;

export function Hero({ stats }: { stats: HubStats }) {
  const counts = { prompts: stats.prompts + stats.boosts, skills: stats.skills, bots: stats.bots, workflows: stats.workflows };
  return (
    <section className="relative pt-12 pb-10 sm:pt-20 sm:pb-14">
      <div className="mx-auto max-w-3xl text-center">
        <Link
          href="/build-in-public"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted shadow-card transition hover:border-line-strong hover:text-ink"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-emerald opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-neon-emerald" />
          </span>
          Build in Public · {stats.total + stats.bots + stats.workflows} tài sản mã nguồn mở · xem câu chuyện →
        </Link>
        <h1 className="mt-6 text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-6xl">
          <span className="text-gradient">TVT Intelligence Hub</span>
        </h1>
        <p className="mt-3 text-lg font-medium text-ink/90 sm:text-xl">{SITE_TAGLINE}</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-pretty text-muted sm:text-base">
          Từ prompt đơn lẻ đến Agent Skill và Boost tư duy sâu — điền biến, xem trước kết quả theo thời gian thực và copy 1 chạm cho
          ChatGPT, Claude, Cursor hoặc xuất SKILL.md cho AI Agent.
        </p>
        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <SearchTrigger className="flex h-12 text-base sm:flex-1" />
          <Link
            href="#catalog"
            className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-emerald px-5 text-sm font-semibold text-on-accent transition hover:brightness-110"
          >
            Khám phá kho <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <dl className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SECTIONS.map(({ key, href, label, Icon, tone }) => (
          <Link
            key={key}
            href={href}
            className="focus-ring group flex items-start gap-4 rounded-2xl border border-line bg-surface/70 shadow-card p-4 transition hover:border-line-strong hover:bg-surface"
          >
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl border ${tone}`}>
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <dt className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-ink tabular-nums">{counts[key]}</span>
                <span className="text-sm font-semibold text-ink">{label}</span>
              </dt>
              <dd className="mt-0.5 text-xs leading-relaxed text-muted">{DESCRIPTIONS[key]}</dd>
            </div>
          </Link>
        ))}
      </dl>
    </section>
  );
}
