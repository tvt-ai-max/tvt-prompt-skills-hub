'use client';

import { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import type { Persona } from '@/types/hub';
import { useHub } from '@/components/HubProvider';
import { FilterBar, type TierFilter } from '@/components/FilterBar';
import { ItemCard } from '@/components/ItemCard';
import { createSearchIndex, itemCategory, searchIds } from '@/lib/search';

export function HubExplorer({ initialTier = 'all' }: { initialTier?: TierFilter }) {
  const { items } = useHub();
  const [tier, setTier] = useState<TierFilter>(initialTier);
  const [persona, setPersona] = useState<Persona | 'all'>('all');
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const index = useMemo(() => createSearchIndex(items), [items]);

  // Items matching query + persona + category (tier counted separately for pill badges).
  const baseMatches = useMemo(() => {
    const order = searchIds(index, items, query);
    const byId = new Map(items.map((i) => [i.id, i]));
    return order
      .map((id) => byId.get(id)!)
      .filter((item) => (persona === 'all' || item.persona === persona) && (category === 'all' || itemCategory(item) === category));
  }, [index, items, query, persona, category]);

  const counts = useMemo(
    () => ({
      all: baseMatches.length,
      prompt: baseMatches.filter((i) => i.tier === 'prompt').length,
      skill: baseMatches.filter((i) => i.tier === 'skill').length,
      boost: baseMatches.filter((i) => i.tier === 'boost').length,
    }),
    [baseMatches],
  );

  const categories = useMemo(() => {
    const scoped = tier === 'all' ? items : items.filter((i) => i.tier === tier);
    return [...new Set(scoped.map(itemCategory))].sort();
  }, [items, tier]);

  const visible = tier === 'all' ? baseMatches : baseMatches.filter((i) => i.tier === tier);

  const reset = () => {
    setTier('all');
    setPersona('all');
    setCategory('all');
    setQuery('');
  };

  return (
    <div className="space-y-6">
      <FilterBar
        tier={tier}
        persona={persona}
        category={category}
        query={query}
        categories={categories}
        counts={counts}
        resultCount={visible.length}
        onTier={(t) => {
          setTier(t);
          setCategory('all');
        }}
        onPersona={setPersona}
        onCategory={setCategory}
        onQuery={setQuery}
        onReset={reset}
      />

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <SearchX className="size-8 text-faint" aria-hidden />
          <p className="text-sm text-muted">Không có mục nào khớp bộ lọc hiện tại.</p>
          <button type="button" onClick={reset} className="focus-ring rounded-lg border border-line px-3 py-1.5 text-sm text-ink hover:bg-white/5">
            Xoá bộ lọc
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <li key={item.id}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
