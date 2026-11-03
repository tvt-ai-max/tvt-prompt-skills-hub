import Link from 'next/link';
import { ArrowUpRight, Clock, Coins, Gauge } from 'lucide-react';
import type { WorkflowItem } from '@/types/hub';
import type { BotGlyphs } from '@/components/WorkflowCanvas';
import { categoryLabel } from '@/lib/labels';
import { T } from '@/components/I18nProvider';

const DIFFICULTY_TONE: Record<WorkflowItem['difficulty'], string> = {
  Beginner: 'text-emerald-300 border-neon-emerald/30 bg-neon-emerald/10',
  Advanced: 'text-cyan-300 border-neon-cyan/30 bg-neon-cyan/10',
  'Enterprise OCP': 'text-violet-300 border-neon-violet/35 bg-neon-violet/10',
};

export function DifficultyBadge({ difficulty }: { difficulty: WorkflowItem['difficulty'] }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${DIFFICULTY_TONE[difficulty]}`}>
      <Gauge className="size-3" aria-hidden />
      {difficulty}
    </span>
  );
}

export function WorkflowCard({ wf, bots }: { wf: WorkflowItem; bots: BotGlyphs }) {
  return (
    <article className="surface-card group relative flex h-full flex-col rounded-2xl p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-glow-cyan">
      <div className="flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={wf.difficulty} />
        <span className="text-xs text-faint">{categoryLabel(wf.category)}</span>
      </div>
      <h3 className="mt-3 text-lg leading-snug font-bold text-ink">
        <Link href={`/workflows/${wf.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-neon-cyan/70">
          {wf.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{wf.summary}</p>

      <ol className="mt-4 flex items-center">
        {wf.steps.map((step, i) => (
          <li key={step.id} className="flex items-center">
            <span
              title={`B${step.stepNumber} · ${step.title} — ${step.agentRole}`}
              className="grid size-9 place-items-center rounded-xl border border-line-strong bg-surface-2 text-base shadow-card"
            >
              {step.botId && bots[step.botId] ? bots[step.botId].avatar : step.stepNumber}
            </span>
            {i < wf.steps.length - 1 && <span className="h-px w-3 bg-gradient-to-r from-neon-cyan to-neon-violet sm:w-5" aria-hidden />}
          </li>
        ))}
      </ol>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs text-faint">
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" aria-hidden />
          {wf.estimatedTime}
        </span>
        <span className="inline-flex items-center gap-1">
          <Coins className="size-3.5" aria-hidden />
          {wf.estimatedCost.split('(')[0].trim()}
        </span>
        <span className="ml-auto inline-flex items-center gap-0.5 text-muted transition group-hover:text-ink">
          <T k="studio.openStudio" /> <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}
