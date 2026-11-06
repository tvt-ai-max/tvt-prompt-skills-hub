import type { HubItemSummary, Persona, Tier } from '@/types/hub';
import { pinFavorites } from '@/lib/favorites';

export interface CatalogFilter {
  /** 'prompt' also matches Deep Reasoning (boost) items. */
  tier: Tier | 'all';
  persona: Persona | 'all';
  category: string;
  stack: string;
  tags: string[];
  favoritesOnly: boolean;
  trendingOnly?: boolean;
}

/**
 * Calculates a dynamic velocity score for trending ranking.
 * Balances recency, gate count, slash commands, and high-demand topics.
 */
export function getTrendingScore(item: HubItemSummary): number {
  let score = 50;
  if (item.createdAt) {
    const ageDays = (Date.now() - Date.parse(item.createdAt)) / (1000 * 60 * 60 * 24);
    if (!isNaN(ageDays) && ageDays < 30) {
      score += Math.max(0, Math.round(50 - ageDays * 1.5));
    }
  }
  const tagsStr = item.tags.join(' ').toLowerCase();
  if (tagsStr.includes('security') || tagsStr.includes('firewall') || tagsStr.includes('protection')) score += 35;
  if (tagsStr.includes('seo') || tagsStr.includes('geo') || tagsStr.includes('audit')) score += 30;
  if (tagsStr.includes('video') || tagsStr.includes('shorts') || tagsStr.includes('motion')) score += 25;
  if (tagsStr.includes('multi-agent') || tagsStr.includes('workflow') || tagsStr.includes('orchestrator')) score += 30;
  if (item.slashCommand) score += 20;
  if (item.gateCount > 0) score += item.gateCount * 5;
  if (item.tier === 'boost') score += 15;
  return score;
}

export function isTrending(item: HubItemSummary): boolean {
  return getTrendingScore(item) >= 130;
}

/** Catalog sections: Prompts include Deep Reasoning (boost) items. */
export function tierMatches(itemTier: Tier, filter: Tier | 'all'): boolean {
  if (filter === 'all') return true;
  if (filter === 'prompt') return itemTier === 'prompt' || itemTier === 'boost';
  return itemTier === filter;
}

/** Filters (everything except tier) — used for tier pill counts. Tags use AND semantics. */
export function matchesFacets(item: HubItemSummary, f: CatalogFilter, favorites: Set<string>): boolean {
  return (
    (f.persona === 'all' || item.persona === f.persona) &&
    (f.category === 'all' || item.category === f.category) &&
    (f.stack === 'all' || item.stack.includes(f.stack)) &&
    f.tags.every((t) => item.tags.includes(t)) &&
    (!f.favoritesOnly || favorites.has(item.id)) &&
    (!f.trendingOnly || isTrending(item))
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
): { visible: HubItemSummary[]; counts: Record<Tier | 'all', number>; trendingCount: number } {
  const favSet = new Set(favorites);
  const base = ordered.filter((item) => matchesFacets(item, f, favSet));
  const counts = {
    all: base.length,
    prompt: base.filter((i) => tierMatches(i.tier, 'prompt')).length,
    skill: base.filter((i) => i.tier === 'skill').length,
    boost: base.filter((i) => i.tier === 'boost').length,
  };
  const tiered = f.tier === 'all' || f.favoritesOnly ? base : base.filter((i) => tierMatches(i.tier, f.tier));
  
  // If trending is active without search, sort by trending velocity score
  let finalItems = tiered;
  if (f.trendingOnly && !hasQuery) {
    finalItems = [...tiered].sort((a, b) => getTrendingScore(b) - getTrendingScore(a));
  } else if (!hasQuery) {
    finalItems = pinFavorites(tiered, favorites);
  }

  const trendingCount = ordered.filter((i) => isTrending(i)).length;

  return { visible: finalItems, counts, trendingCount };
}
