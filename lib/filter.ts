import type { HubItemSummary, Persona, Tier } from '@/types/hub';
import { pinFavorites } from '@/lib/favorites';

export interface CatalogFilter {
  tier: Tier | 'all';
  persona: Persona | 'all';
  category: string;
  stack: string;
  tags: string[];
  favoritesOnly: boolean;
}

/** Filters (everything except tier) — used for tier pill counts. Tags use AND semantics. */
export function matchesFacets(item: HubItemSummary, f: CatalogFilter, favorites: Set<string>): boolean {
  return (
    (f.persona === 'all' || item.persona === f.persona) &&
    (f.category === 'all' || item.category === f.category) &&
    (f.stack === 'all' || item.stack.includes(f.stack)) &&
    f.tags.every((t) => item.tags.includes(t)) &&
    (!f.favoritesOnly || favorites.has(item.id))
  );
}

/**
 * Applies filters to items already ordered by search relevance; favorites are pinned
 * to the top unless a search query is driving the order.
 */
export function applyCatalogFilter(
  ordered: HubItemSummary[],
  f: CatalogFilter,
  favorites: string[],
  hasQuery: boolean,
): { visible: HubItemSummary[]; counts: Record<Tier | 'all', number> } {
  const favSet = new Set(favorites);
  const base = ordered.filter((item) => matchesFacets(item, f, favSet));
  const counts = {
    all: base.length,
    prompt: base.filter((i) => i.tier === 'prompt').length,
    skill: base.filter((i) => i.tier === 'skill').length,
    boost: base.filter((i) => i.tier === 'boost').length,
  };
  const tiered = f.tier === 'all' || f.favoritesOnly ? base : base.filter((i) => i.tier === f.tier);
  return { visible: hasQuery ? tiered : pinFavorites(tiered, favorites), counts };
}
