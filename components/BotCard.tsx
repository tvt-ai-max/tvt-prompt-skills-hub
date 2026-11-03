import Link from 'next/link';
import { ArrowUpRight, Cpu } from 'lucide-react';
import type { BotItem } from '@/types/hub';
import { BOT_DEPARTMENT_META } from '@/lib/labels';
import { CopyTextButton } from '@/components/CopyTextButton';

export function BotAvatar({ bot, size = 'md' }: { bot: Pick<BotItem, 'avatar' | 'name'>; size?: 'md' | 'lg' }) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-2xl border border-line-strong bg-gradient-to-br from-neon-cyan/20 via-neon-violet/15 to-neon-emerald/20 shadow-card ${
        size === 'lg' ? 'size-20 text-4xl' : 'size-12 text-2xl'
      }`}
    >
      {bot.avatar}
    </span>
  );
}

export function BotCard({ bot }: { bot: BotItem }) {
  const dept = BOT_DEPARTMENT_META[bot.department];
  return (
    <article className="surface-card group relative flex h-full flex-col rounded-2xl p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-glow-violet">
      <div className="flex items-start gap-3">
        <BotAvatar bot={bot} />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg leading-tight font-bold text-ink">
            <Link href={`/bots/${bot.id}`} className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-neon-violet/70">
              {bot.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-muted">{bot.role}</p>
        </div>
      </div>
      <span className={`mt-3 inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${dept.accent}`}>
        {dept.short}
      </span>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{bot.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {bot.recommendedModels.slice(0, 2).map((model) => (
          <span key={model} className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-0.5 text-[11px] text-muted">
            <Cpu className="size-3" aria-hidden />
            {model}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <CopyTextButton text={bot.systemPrompt} label="Copy System Prompt" toastMessage={`Đã copy system prompt của ${bot.name}`} />
        <Link
          href={`/bots/${bot.id}`}
          className="focus-ring relative z-10 inline-flex items-center gap-0.5 rounded px-1 text-xs text-faint transition hover:text-ink"
          aria-label={`Chi tiết ${bot.name}`}
        >
          Chi tiết <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
