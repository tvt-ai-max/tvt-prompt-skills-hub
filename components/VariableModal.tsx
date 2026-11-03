'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, CircleAlert, Terminal, X } from 'lucide-react';
import type { HubItemSummary } from '@/types/hub';
import { PersonaBadge, TierBadge } from '@/components/Badges';
import { FavoriteButton } from '@/components/FavoriteButton';
import { VariableWorkbench } from '@/components/VariableWorkbench';
import { useDialog } from '@/components/useDialog';
import { useItem } from '@/components/useItem';
import { categoryLabel } from '@/lib/labels';
import { useTranslation } from '@/components/I18nProvider';

function WorkbenchSkeleton() {
  return (
    <div className="grid animate-pulse gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" aria-hidden>
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-40 rounded bg-overlay/[0.06]" />
            <div className="h-20 rounded-lg bg-overlay/[0.04]" />
          </div>
        ))}
      </div>
      <div className="h-80 rounded-xl bg-overlay/[0.04]" />
    </div>
  );
}

export function VariableModal({ summary, onClose }: { summary: HubItemSummary | null; onClose: () => void }) {
  const panelRef = useDialog(summary !== null, onClose);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { item, error } = useItem(summary?.id ?? null);
  const { t } = useTranslation();

  useEffect(() => {
    if (summary) closeRef.current?.focus();
  }, [summary]);

  if (!summary) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
      <div className="absolute inset-0 animate-fade-in bg-scrim backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="variable-modal-title"
        className="relative flex h-full w-full max-w-6xl animate-slide-in flex-col border-l border-line bg-space shadow-2xl"
      >
        <header className="flex items-start gap-3 border-b border-line px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <TierBadge tier={summary.tier} />
              <PersonaBadge persona={summary.persona} />
              <span className="text-xs text-faint">{categoryLabel(summary.category)}</span>
              {summary.slashCommand && (
                <code className="inline-flex items-center gap-1 rounded bg-neon-violet/10 px-1.5 py-0.5 font-mono text-[11px] text-violet-300">
                  <Terminal className="size-3" aria-hidden />
                  {summary.slashCommand}
                </code>
              )}
            </div>
            <h2 id="variable-modal-title" className="text-lg leading-snug font-semibold text-ink sm:text-xl">
              {summary.title}
            </h2>
            <p className="text-sm text-muted">{summary.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <FavoriteButton id={summary.id} title={summary.title} />
            <Link
              href={`/items/${summary.id}`}
              onClick={onClose}
              className="focus-ring hidden items-center gap-1 rounded-md px-2 py-1.5 text-xs text-muted transition hover:bg-overlay/5 hover:text-ink sm:inline-flex"
            >
              {t('modal.details')} <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t('common.close')}
              className="focus-ring rounded-md p-2 text-muted transition hover:bg-overlay/5 hover:text-ink"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </header>
        <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {error ? (
            <p className="flex items-center gap-2 rounded-lg border border-neon-amber/30 bg-neon-amber/10 p-4 text-sm text-amber-200" role="alert">
              <CircleAlert className="size-4" aria-hidden /> {t('common.loadFailed')}.{' '}
              <Link href={`/items/${summary.id}`} className="underline">
                {t('modal.openDetail')}
              </Link>
            </p>
          ) : item ? (
            <VariableWorkbench key={item.id} item={item} compact />
          ) : (
            <WorkbenchSkeleton />
          )}
        </div>
      </div>
    </div>
  );
}
