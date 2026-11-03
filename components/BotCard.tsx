'use client';

import Link from 'next/link';
import { ArrowUpRight, Check, Copy, Cpu, Settings2 } from 'lucide-react';
import { useState } from 'react';
import type { BotSummary } from '@/types/hub';
import { useTranslation } from '@/components/I18nProvider';
import { useToast } from '@/components/ToastProvider';
import { copyText } from '@/lib/clipboard';
import { fetchBot, prefetchBot } from '@/components/useBotPayload';
import type { MessageKey } from '@/lib/i18n';
import { DEPT_ACCENT, DEPT_KEYS } from '@/lib/bot-ui';

export function BotAvatar({ bot, size = 'md' }: { bot: Pick<BotSummary, 'avatar' | 'name'>; size?: 'md' | 'lg' }) {
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

/** One-click copy of a bot's system prompt or ChatGPT custom instructions (fetched on demand). */
export function BotCopyButton({
  bot,
  kind,
  label,
  className = '',
}: {
  bot: Pick<BotSummary, 'id' | 'name'>;
  kind: 'system' | 'custom';
  label: string;
  className?: string;
}) {
  const { t } = useTranslation();
  const toast = useToast();
  const [done, setDone] = useState(false);
  const Icon = done ? Check : kind === 'system' ? Copy : Settings2;
  return (
    <button
      type="button"
      onPointerEnter={() => prefetchBot(bot.id)}
      onFocus={() => prefetchBot(bot.id)}
      onClick={async (event) => {
        event.stopPropagation();
        try {
          const payload = await fetchBot(bot.id);
          const ok = await copyText(kind === 'system' ? payload.systemPrompt : payload.customInstructions);
          if (!ok) return toast(t('common.clipboardBlocked'));
          setDone(true);
          setTimeout(() => setDone(false), 1800);
          toast(t(kind === 'system' ? 'bots.copiedSystem' : 'bots.copiedCustom', { name: bot.name }));
        } catch {
          toast(t('common.loadFailed'));
        }
      }}
      className={`focus-ring relative z-10 inline-flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap transition ${
        kind === 'system'
          ? 'bg-neon-cyan text-on-accent hover:brightness-110'
          : 'border border-line bg-overlay/[0.03] text-ink hover:border-line-strong'
      } ${className}`}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      <span className="truncate">{done ? t('common.copied') : label}</span>
    </button>
  );
}

export function BotCard({ bot }: { bot: BotSummary }) {
  const { t } = useTranslation();
  const badge = bot.tier === 'specialist' && bot.specialty ? t(`specialty.${bot.specialty}` as MessageKey) : t(DEPT_KEYS[bot.department]);
  const accent = bot.tier === 'specialist' ? 'text-muted border-line bg-overlay/[0.03]' : DEPT_ACCENT[bot.department];
  return (
    <article
      onPointerEnter={() => prefetchBot(bot.id)}
      className="surface-card group relative flex h-full flex-col rounded-2xl p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-glow-violet"
    >
      <div className="flex items-start gap-3">
        <BotAvatar bot={bot} />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg leading-tight font-bold text-ink">
            <Link
              href={`/bots/${bot.id}`}
              className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-neon-violet/70"
            >
              {bot.name}
            </Link>
          </h3>
          {bot.role !== bot.name && <p className="mt-0.5 text-sm text-muted">{bot.role}</p>}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className={`inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${accent}`}>
          {badge}
        </span>
        {bot.tier === 'core' && (
          <span className="rounded-full border border-neon-amber/35 bg-neon-amber/10 px-2 py-0.5 text-[11px] font-semibold text-amber-500">⭐ {t('bots.core')}</span>
        )}
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{bot.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {bot.recommendedModels.slice(0, 2).map((model) => (
          <span key={model} className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-0.5 text-[11px] text-muted">
            <Cpu className="size-3" aria-hidden />
            {model}
          </span>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-1 gap-2 pt-4">
        <BotCopyButton bot={bot} kind="system" label={t('bots.copySystemLong')} />
        <BotCopyButton bot={bot} kind="custom" label={t('bots.copyCustom')} />
        <Link
          href={`/bots/${bot.id}`}
          className="focus-ring relative z-10 inline-flex items-center justify-end gap-0.5 rounded px-1 text-xs text-faint transition hover:text-ink"
          aria-label={t('bots.detailsAria', { name: bot.name })}
        >
          {t('common.details')} <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
