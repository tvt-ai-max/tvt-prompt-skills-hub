/**
 * TVT Intelligence Hub — Single Source of Truth for content schemas.
 * Mirrors docs/SPEC.md §2. Every file under content/ must conform to these types
 * (enforced by scripts/validate-data.ts at build time).
 */

export const TIERS = ['prompt', 'skill', 'boost'] as const;
export type Tier = (typeof TIERS)[number];

export const PERSONAS = ['tvt-agency', 'toilatung', 'general'] as const;
export type Persona = (typeof PERSONAS)[number];

export const PROMPT_CATEGORIES = [
  'marketing',
  'seo',
  'copywriting',
  'coding',
  'system-design',
  'operations',
  'video',
  'branding',
  'ads',
] as const;
export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];

export const REASONING_TYPES = [
  'chain-of-thought',
  'tree-of-thought',
  'red-team',
  'system1-vs-2',
] as const;
export type ReasoningType = (typeof REASONING_TYPES)[number];

export const VARIABLE_TYPES = ['text', 'textarea', 'select'] as const;
export type VariableType = (typeof VARIABLE_TYPES)[number];

export interface PromptVariable {
  /** e.g. "TARGET_AUDIENCE" — must match /^[a-zA-Z0-9_]+$/ */
  key: string;
  /** e.g. "Đối Tượng Khách Hàng" */
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: VariableType;
  options?: string[];
}

interface BaseItem {
  /** slug format: "b2b-seo-geo-writer" */
  id: string;
  title: string;
  description: string;
  persona: Persona;
  tags: string[];
  author?: string;
  /** ISO date string (YYYY-MM-DD) */
  createdAt: string;
}

export interface PromptItem extends BaseItem {
  category: PromptCategory;
  tier: 'prompt';
  author: string;
  variables: PromptVariable[];
  /** raw string containing {{VARIABLE}} */
  template: string;
}

export interface SkillInput {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface SkillItem extends BaseItem {
  category: string;
  tier: 'skill';
  inputs: SkillInput[];
  /** e.g. ["7-Point Quality Audit", "Anti-Secret Redaction"] */
  auditGates: string[];
  /** Tools the agent is expected to call while executing the SOP. */
  tools?: string[];
  /** Full markdown content of the SOP */
  sopMarkdown: string;
}

export interface BoostItem extends BaseItem {
  /** e.g. "/boost OCP_ARCHITECT" */
  slashCommand: string;
  tier: 'boost';
  persona: 'tvt-agency' | 'toilatung';
  reasoningType: ReasoningType;
  category?: string;
  /** Optional rich metadata for {{VARIABLES}} used in the template. */
  variables?: PromptVariable[];
  template: string;
}

export type HubItem = PromptItem | SkillItem | BoostItem;

/** Lightweight stats for the hero section. */
export interface HubStats {
  prompts: number;
  skills: number;
  boosts: number;
  total: number;
}

/** Normalized view consumed by the Interactive Variable Replacer. */
export interface WorkbenchModel {
  variables: PromptVariable[];
  template: string;
}

export type CopyTarget = 'chat' | 'cursor' | 'skill';

/**
 * Lightweight card/search model shipped to every page. Full items (templates, SOPs)
 * are loaded on demand from /data/items/[id] to keep HTML payloads small.
 */
export interface HubItemSummary {
  id: string;
  title: string;
  description: string;
  tier: Tier;
  persona: Persona;
  category: string;
  tags: string[];
  /** Agent tools / tech stack detected for the item (normalized, display-ready). */
  stack: string[];
  slashCommand?: string;
  variableCount: number;
  gateCount: number;
  createdAt: string;
}
