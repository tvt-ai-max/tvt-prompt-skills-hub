'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchX, Star } from 'lucide-react';
import { useHub } from '@/components/HubProvider';
import { EMPTY_FILTERS, FilterBar, type FilterState, type TierFilter } from '@/components/FilterBar';
import { ItemCard } from '@/components/ItemCard';
import { useFavorites } from '@/components/useFavorites';
import { createSearchIndex, searchIds } from '@/lib/search';
import { countFacet } from '@/lib/facets';
import { applyCatalogFilter } from '@/lib/filter';

const TAG_CLOUD_SIZE = 18;
/** Tags that merely repeat the tier name add no signal to the cloud. */
const TAG_CLOUD_EXCLUDE = new Set(['boost', 'prompt', 'skill']);

/** Keeps `?q=` and `?tag=` shareable (also the target of the WebSite SearchAction JSON-LD). */
function syncUrl(state: FilterState) {
  const url = new URL(window.location.href);
  if (state.query) url.searchParams.set('q', state.query);
  else url.searchParams.delete('q');
  url.searchParams.delete('tag');
  for (const tag of state.tags) url.searchParams.append('tag', tag);
  if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
}

export function HubExplorer({ initialTier = 'all' }: { initialTier?: TierFilter }) {
  const { items } = useHub();
  const { favorites } = useFavorites();
  const [state, setState] = useState<FilterState>({ ...EMPTY_FILTERS, tier: initialTier });
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [hydratedFromUrl, setHydratedFromUrl] = useState(false);

  // Read ?q= / ?tag= once on mount (avoids a Suspense boundary for useSearchParams on static pages).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') ?? '';
    const tags = params.getAll('tag');
    if (query || tags.length) {
      setState((s) => ({ ...s, query, tags }));
      if (tags.length) setAdvancedOpen(true);
    }
    setHydratedFromUrl(true);
  }, []);

  useEffect(() => {
    if (hydratedFromUrl) syncUrl(state);
  }, [state, hydratedFromUrl]);

  const onChange = useCallback((patch: Partial<FilterState>) => setState((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => setState({ ...EMPTY_FILTERS }), []);

  const index = useMemo(() => createSearchIndex(items), [items]);
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);

  const { visible, counts } = useMemo(() => {
    const ordered = searchIds(index, items, state.query).map((id) => byId.get(id)!);
    return applyCatalogFilter(ordered, state, favorites, state.query.trim() !== '');
  }, [index, items, byId, state, favorites]);

  const scoped = useMemo(() => (state.tier === 'all' ? items : items.filter((i) => i.tier === state.tier)), [items, state.tier]);
  const categories = useMemo(() => [...new Set(scoped.map((i) => i.category))].sort(), [scoped]);
  const tagCloud = useMemo(() => {
    const top = countFacet(scoped.map((i) => i.tags), 2)
      .filter((t) => !TAG_CLOUD_EXCLUDE.has(t.value.toLowerCase()))
      .slice(0, TAG_CLOUD_SIZE);
    // Keep selected tags visible even if they fall out of the top list.
    for (const tag of state.tags) if (!top.some((t) => t.value === tag)) top.push({ value: tag, count: 0 });
    return top;
  }, [scoped, state.tags]);
  const stackFacets = useMemo(() => countFacet(scoped.map((i) => i.stack)), [scoped]);
  const favSet = useMemo(() => new Set(favorites), [favorites]);

  return (
    <div className="space-y-6">
      <FilterBar
        state={state}
        onChange={onChange}
        onReset={reset}
        categories={categories}
        tagCloud={tagCloud}
        stackFacets={stackFacets}
        counts={counts}
        favoriteCount={favorites.filter((id) => byId.has(id)).length}
        resultCount={visible.length}
        advancedOpen={advancedOpen}
        onToggleAdvanced={() => setAdvancedOpen((o) => !o)}
      />

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          {state.favoritesOnly ? <Star className="size-8 text-faint" aria-hidden /> : <SearchX className="size-8 text-faint" aria-hidden />}
          <p className="max-w-sm text-sm text-muted">
            {state.favoritesOnly
              ? 'Chưa có mục Yêu thích nào. Bấm ⭐ trên thẻ bất kỳ để ghim Prompt/Skill dùng hằng ngày lên đầu.'
              : 'Không có mục nào khớp bộ lọc hiện tại.'}
          </p>
          <button
            type="button"
            onClick={reset}
            className="focus-ring rounded-lg border border-line px-3 py-1.5 text-sm text-ink hover:bg-overlay/5"
          >
            Xem tất cả
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visible.map((item) => (
            <li key={item.id}>
              <ItemCard item={item} pinned={favSet.has(item.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
