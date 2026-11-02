import Fuse, { type IFuseOptions } from 'fuse.js';
import type { HubItem } from '@/types/hub';

export interface SearchDoc {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  tier: string;
  persona: string;
  slashCommand: string;
}

export function itemCategory(item: HubItem): string {
  return item.tier === 'boost' ? (item.category ?? item.reasoningType) : item.category;
}

export function toSearchDoc(item: HubItem): SearchDoc {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    tags: item.tags,
    category: itemCategory(item),
    tier: item.tier,
    persona: item.persona,
    slashCommand: item.tier === 'boost' ? item.slashCommand : '',
  };
}

const OPTIONS: IFuseOptions<SearchDoc> = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.38,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'slashCommand', weight: 0.2 },
    { name: 'tags', weight: 0.2 },
    { name: 'description', weight: 0.12 },
    { name: 'category', weight: 0.05 },
    { name: 'id', weight: 0.03 },
  ],
};

export function createSearchIndex(items: HubItem[]) {
  return new Fuse(items.map(toSearchDoc), OPTIONS);
}

/** Fuzzy search returning item ids ranked by relevance. Empty query → all ids in original order. */
export function searchIds(index: Fuse<SearchDoc>, items: HubItem[], query: string, limit?: number): string[] {
  const q = query.trim();
  if (!q) return (limit ? items.slice(0, limit) : items).map((i) => i.id);
  return index.search(q, limit ? { limit } : undefined).map((r) => r.item.id);
}
