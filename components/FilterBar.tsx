'use client';

import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import type { Persona, Tier } from '@/types/hub';
import { PERSONAS } from '@/types/hub';
import { categoryLabel, PERSONA_META, TIER_META } from '@/lib/labels';

export type TierFilter = Tier | 'all';

interface Props {
  tier: TierFilter;
  persona: Persona | 'all';
  category: string;
  query: string;
  categories: string[];
  counts: Record<TierFilter, number>;
  onTier: (tier: TierFilter) => void;
  onPersona: (persona: Persona | 'all') => void;
  onCategory: (category: string) => void;
  onQuery: (query: string) => void;
  onReset: () => void;
  resultCount: number;
}

const TIER_PILLS: TierFilter[] = ['all', 'prompt', 'skill', 'boost'];

function SelectBox({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="relative flex min-w-0 flex-1 items-center sm:flex-none">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring h-10 w-full appearance-none rounded-lg border border-line bg-surface py-0 pr-8 pl-3 text-sm text-ink transition hover:border-line-strong sm:w-44"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 size-4 text-faint" aria-hidden />
    </label>
  );
}

export function FilterBar(props: Props) {
  const { tier, persona, category, query, categories, counts, resultCount } = props;
  const dirty = tier !== 'all' || persona !== 'all' || category !== 'all' || query !== '';

  return (
    <div className="glass z-30 -mx-4 space-y-3 border-y border-line px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border lg:sticky lg:top-20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Lọc theo tầng" className="scrollbar-thin -mx-1 flex gap-1 overflow-x-auto px-1">
          {TIER_PILLS.map((key) => {
            const selected = tier === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => props.onTier(key)}
                className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  selected
                    ? 'border-neon-cyan/50 bg-neon-cyan/15 text-cyan-100'
                    : 'border-line bg-white/[0.02] text-muted hover:border-line-strong hover:text-ink'
                }`}
              >
                {key === 'all' ? 'Tất cả' : TIER_META[key].plural}
                <span className={`rounded-full px-1.5 text-[11px] ${selected ? 'bg-neon-cyan/25' : 'bg-white/5'}`}>{counts[key]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="relative flex min-w-0 basis-full items-center sm:basis-auto">
            <span className="sr-only">Lọc nhanh</span>
            <Search className="pointer-events-none absolute left-3 size-4 text-faint" aria-hidden />
            <input
              value={query}
              onChange={(e) => props.onQuery(e.target.value)}
              placeholder="Lọc nhanh…"
              className="focus-ring h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-sm text-ink placeholder:text-faint sm:w-52"
            />
          </label>
          <SelectBox label="Persona" value={persona} onChange={(v) => props.onPersona(v as Persona | 'all')}>
            <option value="all">Mọi persona</option>
            {PERSONAS.map((p) => (
              <option key={p} value={p}>
                {PERSONA_META[p].label}
              </option>
            ))}
          </SelectBox>
          <SelectBox label="Danh mục" value={category} onChange={props.onCategory}>
            <option value="all">Mọi danh mục</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {categoryLabel(c)}
              </option>
            ))}
          </SelectBox>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-faint">
        <span className="inline-flex items-center gap-1.5">
          <SlidersHorizontal className="size-3.5" aria-hidden />
          {resultCount} kết quả
        </span>
        {dirty && (
          <button
            type="button"
            onClick={props.onReset}
            className="focus-ring inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-muted transition hover:text-ink"
          >
            <X className="size-3.5" aria-hidden /> Xoá bộ lọc
          </button>
        )}
      </div>
    </div>
  );
}
