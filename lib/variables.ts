import type { HubItem, PromptVariable, WorkbenchModel } from '@/types/hub';

/** SPEC §1 — canonical variable regex. */
export const VARIABLE_PATTERN = /\{\{([a-zA-Z0-9_]+)\}\}/g;

export type TemplateSegment =
  | { kind: 'text'; value: string }
  | { kind: 'variable'; key: string };

/** Returns unique variable keys in order of first appearance. */
export function extractVariables(template: string): string[] {
  const seen = new Set<string>();
  for (const match of template.matchAll(VARIABLE_PATTERN)) {
    seen.add(match[1]);
  }
  return [...seen];
}

/** Splits a template into literal text and variable segments. */
export function parseTemplate(template: string): TemplateSegment[] {
  const segments: TemplateSegment[] = [];
  let cursor = 0;
  for (const match of template.matchAll(VARIABLE_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) segments.push({ kind: 'text', value: template.slice(cursor, index) });
    segments.push({ kind: 'variable', key: match[1] });
    cursor = index + match[0].length;
  }
  if (cursor < template.length) segments.push({ kind: 'text', value: template.slice(cursor) });
  return segments;
}

/**
 * Interpolates values into a template. Empty / missing values keep the
 * original `{{KEY}}` placeholder so users can see what is still unfilled.
 */
export function renderTemplate(template: string, values: Record<string, string>): string {
  return template.replace(VARIABLE_PATTERN, (placeholder, key: string) => {
    const value = values[key];
    return value !== undefined && value.trim() !== '' ? value : placeholder;
  });
}

/** Keys that still have no value. */
export function unfilledKeys(variables: PromptVariable[], values: Record<string, string>): string[] {
  return variables.filter((v) => !(values[v.key] ?? '').trim()).map((v) => v.key);
}

export function initialValues(variables: PromptVariable[]): Record<string, string> {
  return Object.fromEntries(variables.map((v) => [v.key, v.defaultValue ?? '']));
}

/** Turns "TARGET_AUDIENCE" / "draft_content" into "Target Audience" / "Draft Content". */
export function humanizeKey(key: string): string {
  return key
    .toLowerCase()
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Merges declared variable metadata with keys discovered in the template,
 * so every `{{VAR}}` always gets an input field.
 */
export function resolveVariables(template: string, declared: PromptVariable[] = []): PromptVariable[] {
  const byKey = new Map(declared.map((v) => [v.key, v]));
  const ordered: PromptVariable[] = [];
  for (const key of extractVariables(template)) {
    ordered.push(byKey.get(key) ?? { key, label: humanizeKey(key), type: 'textarea' });
    byKey.delete(key);
  }
  return ordered;
}

const LONG_INPUT_TYPES = ['markdown', 'textarea', 'long', 'json', 'code', 'object', 'array'];

/** Builds the template the Interactive Variable Replacer works on, for any tier. */
export function buildWorkbenchModel(item: HubItem): WorkbenchModel {
  if (item.tier === 'prompt') {
    return { template: item.template, variables: resolveVariables(item.template, item.variables) };
  }
  if (item.tier === 'boost') {
    return { template: item.template, variables: resolveVariables(item.template, item.variables) };
  }

  // Inputs already interpolated inside the SOP body are described, not duplicated.
  const usedInSop = new Set(extractVariables(item.sopMarkdown));
  const inputLines = item.inputs.map((input) => {
    const flag = input.required ? 'bắt buộc' : 'tuỳ chọn';
    return usedInSop.has(input.name)
      ? `- **${input.name}** (${input.type}, ${flag}) — ${input.description}`
      : `- **${input.name}** (${input.type}, ${flag}): {{${input.name}}}`;
  });
  const gateLines = item.auditGates.map((gate) => `- [ ] ${gate}`);
  const toolLines = (item.tools ?? []).map((tool) => `- ${tool}`);

  const template = [
    `# SKILL: ${item.title}`,
    '',
    item.description,
    '',
    '## INPUTS',
    ...inputLines,
    ...(toolLines.length ? ['', '## TOOLS', ...toolLines] : []),
    '',
    '## QUALITY GATES',
    ...gateLines,
    '',
    item.sopMarkdown.trim(),
  ].join('\n');

  const declared: PromptVariable[] = item.inputs.map((input) => ({
    key: input.name,
    label: input.description || humanizeKey(input.name),
    placeholder: `${input.type}${input.required ? ' • bắt buộc' : ' • tuỳ chọn'}`,
    type: LONG_INPUT_TYPES.some((t) => input.type.toLowerCase().includes(t)) ? 'textarea' : 'text',
  }));

  return { template, variables: resolveVariables(template, declared) };
}
