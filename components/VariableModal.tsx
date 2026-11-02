'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, Terminal, X } from 'lucide-react';
import type { HubItem } from '@/types/hub';
import { PersonaBadge, TierBadge } from '@/components/Badges';
import { VariableWorkbench } from '@/components/VariableWorkbench';
import { useDialog } from '@/components/useDialog';
import { categoryLabel } from '@/lib/labels';
import { itemCategory } from '@/lib/search';

export function VariableModal({ item, onClose }: { item: HubItem | null; onClose: () => void }) {
  const panelRef = useDialog(item !== null, onClose);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (item) closeRef.current?.focus();
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
      <div className="absolute inset-0 animate-fade-in bg-space-deep/75 backdrop-blur-sm" onClick={onClose} aria-hidden />
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
              <TierBadge tier={item.tier} />
              <PersonaBadge persona={item.persona} />
              <span className="text-xs text-faint">{categoryLabel(itemCategory(item))}</span>
              {item.tier === 'boost' && (
                <code className="inline-flex items-center gap-1 rounded bg-neon-violet/10 px-1.5 py-0.5 font-mono text-[11px] text-violet-300">
                  <Terminal className="size-3" aria-hidden />
                  {item.slashCommand}
                </code>
              )}
            </div>
            <h2 id="variable-modal-title" className="text-lg leading-snug font-semibold text-ink sm:text-xl">
              {item.title}
            </h2>
            <p className="text-sm text-muted">{item.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Link
              href={`/items/${item.id}`}
              onClick={onClose}
              className="focus-ring hidden items-center gap-1 rounded-md px-2 py-1.5 text-xs text-muted transition hover:bg-white/5 hover:text-ink sm:inline-flex"
            >
              Trang chi tiết <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="focus-ring rounded-md p-2 text-muted transition hover:bg-white/5 hover:text-ink"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </header>
        <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <VariableWorkbench key={item.id} item={item} compact />
        </div>
      </div>
    </div>
  );
}
