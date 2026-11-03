'use client';

import { ChevronDown, Search, SlidersHorizontal, Star, Tags, Wrench, X } from 'lucide-react';
import type { Persona, Tier } from '@/types/hub';
import { PERSONAS } from '@/types/hub';
import type { FacetCount } from '@/lib/facets';
import { categoryLabel, PERSONA_META } from '@/lib/labels';
import { useTranslation } from '@/components/I18nProvider';

export type TierFilter = Tier | 'all';

export interface FilterState {
  tier: TierFilter;
  persona: Persona | 'all';
  category: string;
  stack: string;
  tags: string[];
  query: string;
  favoritesOnly: boolean;
}

export const EMPTY_FILTERS: FilterState = {
  tier: 'all',
  persona: 'all',
  category: 'all',
  stack: 'all',
  tags: [],
  query: '',
  favoritesOnly: false,
};

interface Props {
  state: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onReset: () => void;
  categories: string[];
  tagCloud: FacetCount[];
  stackFacets: FacetCount[];
  counts: Record<TierFilter, number>;
  favoriteCount: number;
  resultCount: number;
  advancedOpen: boolean;
  onToggleAdvanced: () => void;
}

const TIER_PILLS: TierFilter[] = ['all', 'prompt', 'skill'];

function SelectBox({
  label,
  value,
  onChange,
  icon,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="relative flex min-w-0 flex-1 items-center sm:flex-none">
      <span className="sr-only">{label}</span>
      {icon && <span className="pointer-events-none absolute left-3 text-faint">{icon}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`focus-ring h-10 w-full appearance-none rounded-lg border border-line bg-surface py-0 pr-8 text-sm text-ink transition hover:border-line-strong sm:w-44 ${
          icon ? 'pl-9' : 'pl-3'
        }`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 size-4 text-faint" aria-hidden />
    </label>
  );
}

export function FilterBar(props: Props) {
  const { state, onChange, categories, tagCloud, stackFacets, counts, favoriteCount, resultCount, advancedOpen } = props;
  const { t } = useTranslation();
  const dirty =
    state.tier !== 'all' ||
    state.persona !== 'all' ||
    state.category !== 'all' ||
    state.stack !== 'all' ||
    state.tags.length > 0 ||
    state.query !== '' ||
    state.favoritesOnly;
  const advancedActive = state.tags.length + (state.stack !== 'all' ? 1 : 0);

  const toggleTag = (tag: string) =>
    onChange({ tags: state.tags.includes(tag) ? state.tags.filter((t) => t !== tag) : [...state.tags, tag] });

  return (
    <div className="glass z-30 -mx-4 space-y-3 border-y border-line px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border lg:sticky lg:top-20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label={t('filter.tiersAria')} className="scrollbar-thin -mx-1 flex gap-1 overflow-x-auto px-1">
          {TIER_PILLS.map((key) => {
            const selected = state.tier === key && !state.favoritesOnly;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onChange({ tier: key, category: 'all', favoritesOnly: false })}
                className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  selected
                    ? 'border-neon-cyan/50 bg-neon-cyan/15 text-cyan-100'
                    : 'border-line bg-overlay/[0.02] text-muted hover:border-line-strong hover:text-ink'
                }`}
              >
                {key === 'all' ? t('filter.all') : key === 'skill' ? t('filter.skills') : t('filter.prompts')}
                <span className={`rounded-full px-1.5 text-[11px] ${selected ? 'bg-neon-cyan/25' : 'bg-overlay/5'}`}>{counts[key]}</span>
              </button>
            );
          })}
          <button
            type="button"
            role="tab"
            aria-selected={state.favoritesOnly}
            onClick={() => onChange({ favoritesOnly: !state.favoritesOnly })}
            className={`focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              state.favoritesOnly
                ? 'border-neon-amber/50 bg-neon-amber/15 text-amber-200'
                : 'border-line bg-overlay/[0.02] text-muted hover:border-line-strong hover:text-ink'
            }`}
          >
            <Star className={`size-3.5 ${state.favoritesOnly ? 'fill-current' : ''}`} aria-hidden />
            {t('filter.favorites')}
            <span className={`rounded-full px-1.5 text-[11px] ${state.favoritesOnly ? 'bg-neon-amber/25' : 'bg-overlay/5'}`}>{favoriteCount}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="relative flex min-w-0 basis-full items-center sm:basis-auto">
            <span className="sr-only">{t('filter.quickFilter')}</span>
            <Search className="pointer-events-none absolute left-3 size-4 text-faint" aria-hidden />
            <input
              type="search"
              value={state.query}
              onChange={(e) => onChange({ query: e.target.value })}
              placeholder={t('filter.quickFilter')}
              className="focus-ring h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-sm text-ink placeholder:text-faint sm:w-52"
            />
          </label>
          <SelectBox label={t('filter.persona')} value={state.persona} onChange={(v) => onChange({ persona: v as Persona | 'all' })}>
            <option value="all">{t('filter.anyPersona')}</option>
            {PERSONAS.map((p) => (
              <option key={p} value={p}>
                {PERSONA_META[p].label}
              </option>
            ))}
          </SelectBox>
          <SelectBox label={t('filter.category')} value={state.category} onChange={(v) => onChange({ category: v })}>
            <option value="all">{t('filter.anyCategory')}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {categoryLabel(c)}
              </option>
            ))}
          </SelectBox>
        </div>
      </div>

      {advancedOpen && (
        <div id="advanced-filters" className="space-y-3 border-t border-line pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              <Tags className="size-3.5" aria-hidden /> {t('filter.popularTags')}
            </span>
            {tagCloud.map(({ value, count }) => {
              const active = state.tags.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTag(value)}
                  className={`focus-ring rounded-full border px-2.5 py-1 text-xs transition ${
                    active
                      ? 'border-neon-emerald/50 bg-neon-emerald/15 text-emerald-200'
                      : 'border-line text-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  #{value} <span className="text-faint">{count}</span>
                </button>
              );
            })}
          </div>
          <SelectBox
            label={t('filter.stack')}
            value={state.stack}
            onChange={(v) => onChange({ stack: v })}
            icon={<Wrench className="size-4" aria-hidden />}
          >
            <option value="all">{t('filter.anyStack')}</option>
            {stackFacets.map(({ value, count }) => (
              <option key={value} value={value}>
                {value} ({count})
              </option>
            ))}
          </SelectBox>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 text-xs text-faint">
        <span className="inline-flex items-center gap-3">
          <span>{t('filter.results', { count: resultCount })}</span>
          <button
            type="button"
            onClick={props.onToggleAdvanced}
            aria-expanded={advancedOpen}
            aria-controls="advanced-filters"
            className="focus-ring inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-muted transition hover:text-ink"
          >
            <SlidersHorizontal className="size-3.5" aria-hidden />
            {advancedOpen ? t('filter.hideAdvanced') : t('filter.showAdvanced')}
            {advancedActive > 0 && <span className="rounded-full bg-neon-emerald/20 px-1.5 text-emerald-200">{advancedActive}</span>}
          </button>
        </span>
        {dirty && (
          <button
            type="button"
            onClick={props.onReset}
            className="focus-ring inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-muted transition hover:text-ink"
          >
            <X className="size-3.5" aria-hidden /> {t('filter.clear')}
          </button>
        )}
      </div>
    </div>
  );
}
