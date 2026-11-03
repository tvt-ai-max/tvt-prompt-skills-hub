/** Filesystem content loader — shared by the Next.js app and scripts/validate-data.ts. */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BotItem, BoostItem, PromptItem, SkillItem, WorkflowItem } from '@/types/hub';
import { checkUniqueIds, checkV3Links, validateBot, validateBoost, validatePrompt, validateSkill, validateWorkflow } from '@/lib/schema';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export interface ContentLoadResult {
  prompts: PromptItem[];
  skills: SkillItem[];
  boosts: BoostItem[];
  workflows: WorkflowItem[];
  bots: BotItem[];
  issues: string[];
  files: number;
  /** item id → repository-relative source path (for README index & edit links). */
  sources: Record<string, string>;
}

function walk(dir: string, extensions: string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full, extensions);
      return extensions.includes(path.extname(entry.name).toLowerCase()) ? [full] : [];
    })
    .sort();
}

function rel(file: string) {
  return path.relative(process.cwd(), file);
}

function readJson(file: string, issues: string[]): Record<string, unknown> | undefined {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, unknown>;
  } catch (error) {
    issues.push(`${rel(file)}: invalid JSON — ${(error as Error).message}`);
    return undefined;
  }
}

function toIsoDate(value: unknown): unknown {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}

/** Parses a SKILL.md-style file: YAML frontmatter (snake_case or camelCase) + SOP body. */
function readSkill(file: string): Record<string, unknown> {
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    category: data.category,
    tier: data.tier,
    persona: data.persona,
    tags: data.tags,
    author: data.author,
    inputs: data.inputs,
    auditGates: data.audit_gates ?? data.auditGates,
    tools: data.tools,
    createdAt: toIsoDate(data.created_at ?? data.createdAt),
    sopMarkdown: content.trim(),
  };
}

/** Reads and validates every file in content/. Never throws on bad content — returns issues. */
export function loadContent(root: string = CONTENT_ROOT): ContentLoadResult {
  const issues: string[] = [];
  const prompts: PromptItem[] = [];
  const skills: SkillItem[] = [];
  const boosts: BoostItem[] = [];
  const workflows: WorkflowItem[] = [];
  const bots: BotItem[] = [];
  let files = 0;
  const sources: Record<string, string> = {};

  for (const file of walk(path.join(root, 'prompts'), ['.json'])) {
    files++;
    const raw = readJson(file, issues);
    if (!raw) continue;
    const result = validatePrompt(raw, rel(file));
    issues.push(...result.issues);
    if (result.item) {
      prompts.push(result.item);
      sources[result.item.id] = rel(file);
    }
  }

  for (const file of walk(path.join(root, 'skills'), ['.md'])) {
    files++;
    let raw: Record<string, unknown>;
    try {
      raw = readSkill(file);
    } catch (error) {
      issues.push(`${rel(file)}: invalid frontmatter — ${(error as Error).message}`);
      continue;
    }
    const result = validateSkill(raw, rel(file));
    issues.push(...result.issues);
    if (result.item) {
      skills.push(result.item);
      sources[result.item.id] = rel(file);
    }
  }

  for (const file of walk(path.join(root, 'boosts'), ['.json'])) {
    files++;
    const raw = readJson(file, issues);
    if (!raw) continue;
    const result = validateBoost(raw, rel(file));
    issues.push(...result.issues);
    if (result.item) {
      boosts.push(result.item);
      sources[result.item.id] = rel(file);
    }
  }

  for (const file of walk(path.join(root, 'workflows'), ['.json'])) {
    files++;
    const raw = readJson(file, issues);
    if (!raw) continue;
    const result = validateWorkflow(raw, rel(file));
    issues.push(...result.issues);
    if (result.item) {
      workflows.push(result.item);
      sources[`workflow:${result.item.id}`] = rel(file);
    }
  }

  for (const file of walk(path.join(root, 'bots'), ['.json'])) {
    files++;
    const raw = readJson(file, issues);
    if (!raw) continue;
    const result = validateBot(raw, rel(file));
    issues.push(...result.issues);
    if (result.item) {
      bots.push(result.item);
      sources[`bot:${result.item.id}`] = rel(file);
    }
  }

  issues.push(...checkUniqueIds([...prompts, ...skills, ...boosts]));
  issues.push(...checkV3Links(workflows, bots));
  return { prompts, skills, boosts, workflows, bots, issues, files, sources };
}

