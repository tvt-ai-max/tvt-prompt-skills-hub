import type { HubItem } from '@/types/hub';

/**
 * Well-known tools / platforms we surface as an "Agent tools & stack" filter.
 * Detected from declared `tools` and from the item text (templates & SOPs), case-insensitive.
 */
const KNOWN_STACK: { label: string; pattern: RegExp }[] = [
  { label: 'FFmpeg', pattern: /\bffmpeg\b/i },
  { label: 'ElevenLabs', pattern: /\belevenlabs\b/i },
  { label: 'Whisper ASR', pattern: /\bwhisper\b/i },
  { label: 'HyperFrames', pattern: /\bhyperframes?\b/i },
  { label: 'Python', pattern: /\bpython3?\b/i },
  { label: 'Playwright', pattern: /\bplaywright\b/i },
  { label: 'Chromium', pattern: /\bchromium\b/i },
  { label: 'n8n', pattern: /\bn8n\b/i },
  { label: 'Telegram', pattern: /\btelegram\b/i },
  { label: 'Zalo OA', pattern: /\bzalo\b/i },
  { label: 'Meta Marketing API', pattern: /\bmeta[_ ]marketing[_ ]api\b|\bgraph api\b/i },
  { label: 'WordPress', pattern: /\bwordpress\b|\bwp[_ ]cli\b/i },
  { label: 'HestiaCP', pattern: /\bhestiacp\b|\bv-list-/i },
  { label: 'Canva', pattern: /\bcanva\b/i },
  { label: 'Gemini', pattern: /\bgemini\b/i },
  { label: 'Claude', pattern: /\bclaude\b/i },
  { label: 'Obsidian', pattern: /\bobsidian\b/i },
  { label: 'Google Sheets', pattern: /\bgoogle sheets\b/i },
];

/** Generic agent tool names (from frontmatter `tools`) we keep as-is, e.g. web_search, read_file. */
function normalizeTool(raw: string): string | null {
  const head = raw.trim().split(/[\s(]/)[0].replace(/[.:].*$/, '').toLowerCase();
  if (!head || head.length < 3) return null;
  return head;
}

function itemText(item: HubItem): string {
  if (item.tier === 'skill') return `${item.title}\n${item.description}\n${(item.tools ?? []).join('\n')}\n${item.sopMarkdown}`;
  return `${item.title}\n${item.description}\n${item.template}`;
}

export function extractStack(item: HubItem): string[] {
  const found = new Set<string>();
  const text = itemText(item);
  for (const { label, pattern } of KNOWN_STACK) if (pattern.test(text)) found.add(label);
  if (item.tier === 'skill') {
    for (const tool of item.tools ?? []) {
      const normalized = normalizeTool(tool);
      if (!normalized) continue;
      const known = KNOWN_STACK.find((k) => k.pattern.test(normalized.replace(/_/g, ' ')) || k.pattern.test(normalized));
      found.add(known ? known.label : normalized);
    }
  }
  return [...found].sort((a, b) => a.localeCompare(b));
}

export interface FacetCount {
  value: string;
  count: number;
}

/** Counts values across items, most frequent first (ties alphabetical). */
export function countFacet(lists: string[][], min = 1): FacetCount[] {
  const counts = new Map<string, number>();
  for (const list of lists) for (const value of new Set(list)) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts]
    .filter(([, count]) => count >= min)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}
