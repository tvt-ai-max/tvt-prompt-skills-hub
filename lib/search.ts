import Fuse, { type IFuseOptions } from 'fuse.js';
import type { HubItemSummary } from '@/types/hub';

export { itemCategory } from '@/lib/summary';

const OPTIONS: IFuseOptions<HubItemSummary> = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.38,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.36 },
    { name: 'slashCommand', weight: 0.18 },
    { name: 'tags', weight: 0.2 },
    { name: 'stack', weight: 0.08 },
    { name: 'description', weight: 0.12 },
    { name: 'category', weight: 0.04 },
    { name: 'id', weight: 0.02 },
  ],
};

export function createSearchIndex(items: HubItemSummary[]) {
  return new Fuse(items, OPTIONS);
}

/** Fuzzy search returning item ids ranked by relevance. Empty query → all ids in original order. */
export function searchIds(index: Fuse<HubItemSummary>, items: HubItemSummary[], query: string, limit?: number): string[] {
  const q = query.trim();
  if (!q) return (limit ? items.slice(0, limit) : items).map((i) => i.id);
  return index.search(q, limit ? { limit } : undefined).map((r) => r.item.id);
}
