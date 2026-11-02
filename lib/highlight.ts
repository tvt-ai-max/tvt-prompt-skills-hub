import { VARIABLE_PATTERN } from '@/lib/variables';

/**
 * Value markers let us run exporters on a rendered prompt and still know which
 * characters came from user input — so the live preview can highlight them.
 * Private-use code points never appear in real content.
 */
const OPEN = '';
const SEP = '';
const CLOSE = '';
const MARKED = new RegExp(`${OPEN}([a-zA-Z0-9_]+)${SEP}([\\s\\S]*?)${CLOSE}`, 'g');

export function renderMarked(template: string, values: Record<string, string>): string {
  return template.replace(VARIABLE_PATTERN, (placeholder, key: string) => {
    const value = values[key];
    return value !== undefined && value.trim() !== '' ? `${OPEN}${key}${SEP}${value}${CLOSE}` : placeholder;
  });
}

export function stripMarkers(text: string): string {
  return text.replace(MARKED, (_m, _key, value: string) => value);
}

export type PreviewToken =
  | { kind: 'text'; value: string }
  | { kind: 'filled'; key: string; value: string }
  | { kind: 'empty'; key: string };

export function tokenizePreview(text: string): PreviewToken[] {
  const tokens: PreviewToken[] = [];
  const combined = new RegExp(`${MARKED.source}|${VARIABLE_PATTERN.source}`, 'g');
  let cursor = 0;
  for (const match of text.matchAll(combined)) {
    const index = match.index ?? 0;
    if (index > cursor) tokens.push({ kind: 'text', value: text.slice(cursor, index) });
    if (match[1] !== undefined) tokens.push({ kind: 'filled', key: match[1], value: match[2] });
    else tokens.push({ kind: 'empty', key: match[3] });
    cursor = index + match[0].length;
  }
  if (cursor < text.length) tokens.push({ kind: 'text', value: text.slice(cursor) });
  return tokens;
}
