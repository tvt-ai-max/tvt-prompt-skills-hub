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
  /** Prompt-tier items only (Deep Reasoning boosts are counted separately in `boosts`). */
  prompts: number;
  skills: number;
  boosts: number;
  bots: number;
  workflows: number;
  /** Prompts + Skills + Boosts (catalog items). */
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

// ───────────────────────────── V3: Workflows (multi-step DAG pipelines) ─────────────────────────────

export const WORKFLOW_DIFFICULTIES = ['Beginner', 'Advanced', 'Enterprise OCP'] as const;
export type WorkflowDifficulty = (typeof WORKFLOW_DIFFICULTIES)[number];

export const WORKFLOW_OUTPUT_FORMATS = ['markdown', 'json', 'image_prompt', 'code'] as const;
export type WorkflowOutputFormat = (typeof WORKFLOW_OUTPUT_FORMATS)[number];

export const WORKFLOW_INPUT_SOURCES = ['user_input', 'previous_step'] as const;
export type WorkflowInputSource = (typeof WORKFLOW_INPUT_SOURCES)[number];

export interface WorkflowInput {
  /** Variable name used as {{KEY}} in the step's promptTemplate. */
  key: string;
  label: string;
  source: WorkflowInputSource;
  /** Required when source = previous_step; must reference an EARLIER step (keeps the graph acyclic). */
  fromStepId?: string;
  /** Example value for user inputs (pre-fills the simulator). */
  defaultValue?: string;
  placeholder?: string;
  type?: VariableType;
  options?: string[];
}

export interface WorkflowStep {
  /** 1-based, sequential. */
  stepNumber: number;
  /** e.g. "step-1-research" */
  id: string;
  title: string;
  /** e.g. "Scout (Deep Research)" */
  agentRole: string;
  /** Optional link to a Bot persona in content/bots (validated). */
  botId?: string;
  /** e.g. "Claude Sonnet 5.5", "Gemini 2.5 Flash", "Midjourney v6.1" */
  targetModel: string;
  inputs: WorkflowInput[];
  promptTemplate: string;
  outputFormat: WorkflowOutputFormat;
  /** Acceptance criteria for the step's output. */
  qualityGate: string;
}

export interface WorkflowItem {
  id: string;
  /** URL slug: /workflows/[slug] */
  slug: string;
  title: string;
  summary: string;
  category: string;
  difficulty: WorkflowDifficulty;
  estimatedTime: string;
  estimatedCost: string;
  persona: Persona;
  tags: string[];
  author: string;
  createdAt: string;
  steps: WorkflowStep[];
}

// ───────────────────────────── V3: Bots (AI workforce personas) ─────────────────────────────

export const BOT_DEPARTMENTS = ['command', 'content-video', 'marketing-seo', 'crm-automation'] as const;
export type BotDepartment = (typeof BOT_DEPARTMENTS)[number];

export interface BotItem {
  /** e.g. "lexi" */
  id: string;
  /** Display name, e.g. "Lexi" */
  name: string;
  /** e.g. "Senior AI Operations Manager" */
  role: string;
  department: BotDepartment;
  /** Single emoji used as the avatar glyph. */
  avatar: string;
  /** One-paragraph summary for cards & meta description. */
  description: string;
  systemPrompt: string;
  recommendedModels: string[];
  tools: string[];
  tags: string[];
  author: string;
  createdAt: string;
  /** "core" = the 16-agent TVT workforce (default); "specialist" = imported persona library. */
  tier?: 'core' | 'specialist';
  /** Specialist category (one of the 10 persona specialties). */
  specialty?: string;
  /** ChatGPT Custom Instructions source fields (specialists). */
  customInstructions?: { know: string; respond: string };
}

/** Lightweight palette/search entry for non-catalog pages (bots, workflows). */
export interface NavEntry {
  kind: 'bot' | 'workflow';
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
  glyph?: string;
}

/** Card/search model for bots (system prompts load on demand from /data/bots/[id]). */
export interface BotSummary {
  id: string;
  name: string;
  role: string;
  department: BotDepartment;
  avatar: string;
  description: string;
  tier: 'core' | 'specialist';
  specialty?: string;
  tags: string[];
  recommendedModels: string[];
}

/** Payload of /data/bots/[id]. */
export interface BotPayload {
  id: string;
  name: string;
  systemPrompt: string;
  customInstructions: string;
}
