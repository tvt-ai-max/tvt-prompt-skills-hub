'use client';

import Link from 'next/link';
import { ArrowUpRight, Braces, Check, Copy, ListChecks, Loader2, Terminal } from 'lucide-react';
import { useState } from 'react';
import type { HubItemSummary } from '@/types/hub';
import { PersonaBadge, TIER_STYLES, TierBadge } from '@/components/Badges';
import { FavoriteButton } from '@/components/FavoriteButton';
import { useHub } from '@/components/HubProvider';
import { useToast } from '@/components/ToastProvider';
import { fetchItem, prefetchItem } from '@/components/useItem';
import { useCopy } from '@/components/useCopy';
import { buildWorkbenchModel, initialValues, renderTemplate } from '@/lib/variables';
import { toChatMarkdown } from '@/lib/exporters';
import { categoryLabel } from '@/lib/labels';
import { useTranslation } from '@/components/I18nProvider';

export function ItemCard({ item, pinned = false }: { item: HubItemSummary; pinned?: boolean }) {
  const { openItem } = useHub();
  const toast = useToast();
  const { t } = useTranslation();
  const { copied, copy } = useCopy();
  const [busy, setBusy] = useState(false);
  const styles = TIER_STYLES[item.tier];

  const quickCopy = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setBusy(true);
    try {
      const full = await fetchItem(item.id);
      const model = buildWorkbenchModel(full);
      const ok = await copy('quick', toChatMarkdown(full, renderTemplate(model.template, initialValues(model.variables))));
      toast(ok ? t('card.copiedTitle', { title: item.title }) : t('card.clipboardOpenDetail'));
    } catch {
      toast(t('common.loadFailed'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <article
      onPointerEnter={() => prefetchItem(item.id)}
      className={`surface-card group relative flex h-full flex-col rounded-2xl p-5 transition duration-200 hover:-translate-y-0.5 ${styles.glow} ${
        pinned ? 'ring-1 ring-neon-amber/30' : ''
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <TierBadge tier={item.tier} />
          <PersonaBadge persona={item.persona} />
        </div>
        <div className="relative z-10 flex items-center gap-1.5">
          <FavoriteButton id={item.id} title={item.title} />
          <button
            type="button"
            onClick={quickCopy}
            onFocus={() => prefetchItem(item.id)}
            aria-label={t('card.quickCopyAria', { title: item.title })}
            title={t('card.quickCopyTitle')}
            className="focus-ring rounded-lg border border-line bg-space/60 p-2 text-muted transition hover:border-line-strong hover:text-ink"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : copied ? (
              <Check className="size-4 text-neon-emerald" aria-hidden />
            ) : (
              <Copy className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <h3 className="text-base leading-snug font-semibold text-ink">
        <button
          type="button"
          onClick={() => openItem(item.id)}
          onFocus={() => prefetchItem(item.id)}
          className="text-left outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-neon-cyan/70"
        >
          {item.title}
        </button>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.description}</p>

      {item.slashCommand && (
        <code className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md border border-neon-violet/25 bg-neon-violet/10 px-2 py-1 font-mono text-xs text-violet-200">
          <Terminal className="size-3.5" aria-hidden />
          {item.slashCommand}
        </code>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md bg-overlay/[0.04] px-1.5 py-0.5 text-[11px] text-faint">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs text-faint">
        <span className="flex items-center gap-3">
          <span>{categoryLabel(item.category)}</span>
          <span className={`inline-flex items-center gap-1 ${styles.text}`}>
            {item.tier === 'skill' ? <ListChecks className="size-3.5" aria-hidden /> : <Braces className="size-3.5" aria-hidden />}
            {item.tier === 'skill' ? t('card.gates', { count: item.gateCount }) : t('card.vars', { count: item.variableCount })}
          </span>
        </span>
        <Link
          href={`/items/${item.id}`}
          className="focus-ring relative z-10 inline-flex items-center gap-0.5 rounded px-1 text-faint transition hover:text-ink"
          aria-label={t('card.detailsAria', { title: item.title })}
        >
          {t('common.details')} <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
