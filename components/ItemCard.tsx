'use client';

import Link from 'next/link';
import { ArrowUpRight, Braces, Check, Copy, ListChecks, Terminal } from 'lucide-react';
import type { HubItem } from '@/types/hub';
import { PersonaBadge, TIER_STYLES, TierBadge } from '@/components/Badges';
import { useHub } from '@/components/HubProvider';
import { useCopy } from '@/components/useCopy';
import { buildWorkbenchModel, initialValues, renderTemplate } from '@/lib/variables';
import { toChatMarkdown } from '@/lib/exporters';
import { categoryLabel } from '@/lib/labels';
import { itemCategory } from '@/lib/search';

export function ItemCard({ item }: { item: HubItem }) {
  const { openItem } = useHub();
  const { copied, copy } = useCopy();
  const model = buildWorkbenchModel(item);
  const styles = TIER_STYLES[item.tier];

  const quickCopy = (event: React.MouseEvent) => {
    event.stopPropagation();
    const rendered = renderTemplate(model.template, initialValues(model.variables));
    void copy('quick', toChatMarkdown(item, rendered));
  };

  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl border border-line bg-surface/80 p-5 transition duration-200 hover:-translate-y-0.5 ${styles.glow}`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <TierBadge tier={item.tier} />
          <PersonaBadge persona={item.persona} />
        </div>
        <button
          type="button"
          onClick={quickCopy}
          aria-label={`Copy nhanh ${item.title}`}
          title="Copy nhanh (giá trị mặc định)"
          className="focus-ring relative z-10 rounded-lg border border-line bg-space/60 p-2 text-muted transition hover:border-line-strong hover:text-ink"
        >
          {copied ? <Check className="size-4 text-neon-emerald" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        </button>
      </div>

      <h3 className="text-base leading-snug font-semibold text-ink">
        <button
          type="button"
          onClick={() => openItem(item.id)}
          className="text-left outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-neon-cyan/70"
        >
          {item.title}
        </button>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.description}</p>

      {item.tier === 'boost' && (
        <code className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md border border-neon-violet/25 bg-neon-violet/10 px-2 py-1 font-mono text-xs text-violet-200">
          <Terminal className="size-3.5" aria-hidden />
          {item.slashCommand}
        </code>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[11px] text-faint">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs text-faint">
        <span className="flex items-center gap-3">
          <span>{categoryLabel(itemCategory(item))}</span>
          <span className={`inline-flex items-center gap-1 ${styles.text}`}>
            {item.tier === 'skill' ? <ListChecks className="size-3.5" aria-hidden /> : <Braces className="size-3.5" aria-hidden />}
            {item.tier === 'skill' ? `${item.auditGates.length} gates` : `${model.variables.length} biến`}
          </span>
        </span>
        <Link
          href={`/items/${item.id}`}
          className="focus-ring relative z-10 inline-flex items-center gap-0.5 rounded px-1 text-faint transition hover:text-ink"
          aria-label={`Trang chi tiết ${item.title}`}
        >
          Chi tiết <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
