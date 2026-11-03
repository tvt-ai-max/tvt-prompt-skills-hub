import { SITE_URL } from '@/lib/site';

export function absoluteUrl(path: string, base: string = SITE_URL): string {
  return new URL(path, base.endsWith('/') ? base : `${base}/`).toString();
}

export function itemPath(id: string): string {
  return `/items/${encodeURIComponent(id)}`;
}

/**
 * Direct link that pre-fills the workbench: only values that differ from the defaults are
 * encoded, so links stay short. `/items/<id>?TOPIC=...&AUDIENCE=...`
 */
export function buildDirectLink(
  id: string,
  values: Record<string, string>,
  defaults: Record<string, string>,
  base: string = SITE_URL,
): string {
  const url = new URL(absoluteUrl(itemPath(id), base));
  for (const [key, value] of Object.entries(values)) {
    if (value !== (defaults[key] ?? '')) url.searchParams.set(key, value);
  }
  return url.toString();
}

/** Reads workbench values back from a query string, accepting only known variable keys. */
export function parseDirectLink(search: string, keys: string[]): Record<string, string> {
  const params = new URLSearchParams(search);
  const out: Record<string, string> = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value !== null) out[key] = value.slice(0, 20_000);
  }
  return out;
}

export interface ShareTargets {
  x: string;
  linkedin: string;
  facebook: string;
}

export function buildShareUrls(url: string, text: string): ShareTargets {
  const u = encodeURIComponent(url);
  return {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
  };
}

/** Short, hook-style caption for social posts (fits X's limit together with the URL). */
export function shareCaption(item: { title: string; description: string; tier: string }, max = 220): string {
  const label = item.tier === 'skill' ? 'Agent Skill' : item.tier === 'boost' ? 'Boost meta-prompt' : 'Prompt';
  const base = `⚡ ${label}: ${item.title} — ${item.description}`;
  const suffix = ' #AI #PromptEngineering #AgentSkills';
  const room = max - suffix.length;
  const body = base.length > room ? `${base.slice(0, room - 1).trimEnd()}…` : base;
  return body + suffix;
}
