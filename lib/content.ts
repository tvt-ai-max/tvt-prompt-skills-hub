import 'server-only';
import type { BotItem, HubItem, HubItemSummary, HubStats, WorkflowItem } from '@/types/hub';
import { toSummary } from '@/lib/summary';
import { loadContent } from '@/lib/loader';

let cache: HubItem[] | undefined;
let v3cache: { workflows: WorkflowItem[]; bots: BotItem[] } | undefined;

function loadValidated() {
  const result = loadContent();
  if (result.issues.length) {
    throw new Error(`Invalid content (${result.issues.length} issue(s)):\n- ${result.issues.join('\n- ')}`);
  }
  return result;
}

/** All hub items, validated. Throws at build time if any content file is invalid. */
export function getAllItems(): HubItem[] {
  if (process.env.NODE_ENV === "production" && cache) return cache;
  const { prompts, skills, boosts } = loadValidated();
  const byTitle = (a: HubItem, b: HubItem) => a.title.localeCompare(b.title);
  cache = [...prompts.sort(byTitle), ...skills.sort(byTitle), ...boosts.sort(byTitle)];
  return cache;
}

export function getItemById(id: string): HubItem | undefined {
  return getAllItems().find((item) => item.id === id);
}

function getV3(): { workflows: WorkflowItem[]; bots: BotItem[] } {
  if (process.env.NODE_ENV === 'production' && v3cache) return v3cache;
  const { workflows, bots } = loadValidated();
  v3cache = {
    workflows: [...workflows].sort((a, b) => a.title.localeCompare(b.title)),
    bots: [...bots].sort((a, b) => a.name.localeCompare(b.name)),
  };
  return v3cache;
}

export function getAllWorkflows(): WorkflowItem[] {
  return getV3().workflows;
}

export function getWorkflowBySlug(slug: string): WorkflowItem | undefined {
  return getAllWorkflows().find((w) => w.slug === slug);
}

export function getAllBots(): BotItem[] {
  return getV3().bots;
}

export function getBotById(id: string): BotItem | undefined {
  return getAllBots().find((b) => b.id === id);
}

export function getStats(items: HubItem[] = getAllItems()): HubStats {
  const prompts = items.filter((i) => i.tier === 'prompt').length;
  const skills = items.filter((i) => i.tier === 'skill').length;
  const boosts = items.filter((i) => i.tier === 'boost').length;
  const { workflows, bots } = getV3();
  return { prompts, skills, boosts, bots: bots.length, workflows: workflows.length, total: items.length };
}

export function getAllSummaries(): HubItemSummary[] {
  return getAllItems().map(toSummary);
}
