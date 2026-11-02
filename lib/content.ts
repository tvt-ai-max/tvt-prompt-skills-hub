import 'server-only';
import type { HubItem, HubStats } from '@/types/hub';
import { loadContent } from '@/lib/loader';

let cache: HubItem[] | undefined;

/** All hub items, validated. Throws at build time if any content file is invalid. */
export function getAllItems(): HubItem[] {
  if (process.env.NODE_ENV === "production" && cache) return cache;
  const { prompts, skills, boosts, issues } = loadContent();
  if (issues.length) {
    throw new Error(`Invalid content (${issues.length} issue(s)):\n- ${issues.join('\n- ')}`);
  }
  const byTitle = (a: HubItem, b: HubItem) => a.title.localeCompare(b.title);
  cache = [...prompts.sort(byTitle), ...skills.sort(byTitle), ...boosts.sort(byTitle)];
  return cache;
}

export function getItemById(id: string): HubItem | undefined {
  return getAllItems().find((item) => item.id === id);
}

export function getStats(items: HubItem[] = getAllItems()): HubStats {
  const prompts = items.filter((i) => i.tier === 'prompt').length;
  const skills = items.filter((i) => i.tier === 'skill').length;
  const boosts = items.filter((i) => i.tier === 'boost').length;
  return { prompts, skills, boosts, total: items.length };
}
