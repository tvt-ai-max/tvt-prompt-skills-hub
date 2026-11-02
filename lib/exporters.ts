import type { HubItem } from '@/types/hub';
import { TIER_META, PERSONA_META } from '@/lib/labels';

const SOURCE_URL = 'https://github.com/tvt-ai-max/tvt-prompt-skills-hub';

function itemCategory(item: HubItem): string {
  return item.tier === 'boost' ? (item.category ?? item.reasoningType) : item.category;
}

/** Copy for ChatGPT / Claude — the clean rendered prompt, nothing else. */
export function toChatMarkdown(_item: HubItem, rendered: string): string {
  return rendered.trim() + '\n';
}

/** Copy for Cursor / Windsurf — a `.cursorrules` / system context block. */
export function toCursorRules(item: HubItem, rendered: string): string {
  const lines = [
    `# .cursorrules — ${item.title}`,
    `# Source: TVT Intelligence Hub (${item.id}) — ${SOURCE_URL}`,
    `# Tier: ${TIER_META[item.tier].label} | Persona: ${PERSONA_META[item.persona].label} | Category: ${itemCategory(item)}`,
    '',
    '## Role & Context',
    item.description,
    '',
    '## Instructions',
    rendered.trim(),
    '',
    '## Operating Rules',
    '- Follow the instructions above for every request in this workspace.',
    '- Ask for clarification when a required input is missing instead of guessing.',
    '- Never print, log or commit API keys, tokens or other secrets.',
  ];
  if (item.tags.length) lines.push('', `## Tags`, item.tags.map((t) => `#${t.replace(/\s+/g, '-')}`).join(' '));
  return lines.join('\n') + '\n';
}

function yamlString(value: string): string {
  return JSON.stringify(value);
}

/** Export as SKILL.md — Agent Skill format for OpenClaw / Hermes / Claude Code. */
export function toSkillMarkdown(item: HubItem, rendered: string): string {
  const fm: string[] = [
    '---',
    `name: ${item.id}`,
    `description: ${yamlString(item.description)}`,
    `title: ${yamlString(item.title)}`,
    `tier: ${item.tier}`,
    `persona: ${item.persona}`,
    `category: ${itemCategory(item)}`,
    `tags: [${item.tags.map(yamlString).join(', ')}]`,
  ];
  if (item.tier === 'boost') fm.push(`slash_command: ${yamlString(item.slashCommand)}`, `reasoning: ${item.reasoningType}`);
  if (item.tier === 'skill') {
    if (item.inputs.length) {
      fm.push('inputs:');
      for (const input of item.inputs) {
        fm.push(
          `  - name: ${input.name}`,
          `    type: ${input.type}`,
          `    required: ${input.required}`,
          `    description: ${yamlString(input.description)}`,
        );
      }
    }
    if (item.auditGates.length) {
      fm.push('audit_gates:', ...item.auditGates.map((g) => `  - ${yamlString(g)}`));
    }
  }
  fm.push(`source: ${SOURCE_URL}`, '---', '');

  const body =
    item.tier === 'skill'
      ? rendered.trim()
      : [`# ${item.title}`, '', item.description, '', '## Instructions', '', rendered.trim()].join('\n');

  return fm.join('\n') + body + '\n';
}

export const COPY_TARGETS = {
  chat: { label: 'ChatGPT / Claude', build: toChatMarkdown },
  cursor: { label: 'Cursor / Windsurf', build: toCursorRules },
  skill: { label: 'SKILL.md', build: toSkillMarkdown },
} as const;
