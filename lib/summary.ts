import type { HubItem, HubItemSummary } from '@/types/hub';
import { buildWorkbenchModel } from '@/lib/variables';
import { extractStack } from '@/lib/facets';

export function itemCategory(item: HubItem): string {
  return item.tier === 'boost' ? (item.category ?? item.reasoningType) : item.category;
}

export function toSummary(item: HubItem): HubItemSummary {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    tier: item.tier,
    persona: item.persona,
    category: itemCategory(item),
    tags: item.tags,
    stack: extractStack(item),
    slashCommand: item.tier === 'boost' ? item.slashCommand : undefined,
    variableCount: buildWorkbenchModel(item).variables.length,
    gateCount: item.tier === 'skill' ? item.auditGates.length : 0,
    createdAt: item.createdAt,
  };
}
