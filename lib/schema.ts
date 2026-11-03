import {
  PERSONAS,
  PROMPT_CATEGORIES,
  REASONING_TYPES,
  VARIABLE_TYPES,
  BOT_DEPARTMENTS,
  WORKFLOW_DIFFICULTIES,
  WORKFLOW_INPUT_SOURCES,
  WORKFLOW_OUTPUT_FORMATS,
  type BotItem,
  type BoostItem,
  type HubItem,
  type WorkflowItem,
  type PromptItem,
  type PromptVariable,
  type SkillItem,
  type Tier,
} from '@/types/hub';
import { extractVariables } from '@/lib/variables';
import { SPECIALTIES } from '@/lib/personas';

/** Runtime validation that mirrors types/hub.ts. Pure — usable in scripts and at build time. */

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const KEY_PATTERN = /^[a-zA-Z0-9_]+$/;
export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const SLASH_PATTERN = /^\/boost [A-Z0-9_]+$/;

/** Patterns that look like real secrets. Content must never ship these. */
const SECRET_PATTERNS: [string, RegExp][] = [
  // Keys start a token: the look-behind avoids false positives inside words such as "risk-management-…".
  ['OpenAI key', /(?<![A-Za-z0-9])sk-(?:proj-)?[A-Za-z0-9_-]{20,}/],
  ['Anthropic key', /(?<![A-Za-z0-9])sk-ant-[A-Za-z0-9_-]{20,}/],
  ['AWS access key', /AKIA[0-9A-Z]{16}/],
  ['GitHub token', /gh[pousr]_[A-Za-z0-9]{30,}/],
  ['Google API key', /AIza[0-9A-Za-z_-]{35}/],
  ['Slack token', /xox[baprs]-[A-Za-z0-9-]{10,}/],
  ['Private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
];

type Raw = Record<string, unknown>;

export class Issues {
  readonly list: string[] = [];
  constructor(private readonly where: string) {}
  add(message: string) {
    this.list.push(`${this.where}: ${message}`);
  }
}

const isString = (v: unknown): v is string => typeof v === 'string';
const isNonEmpty = (v: unknown): v is string => isString(v) && v.trim().length > 0;
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every(isString);

function requireText(raw: Raw, field: string, issues: Issues) {
  if (!isNonEmpty(raw[field])) issues.add(`"${field}" must be a non-empty string`);
}

function oneOf<T extends readonly string[]>(value: unknown, allowed: T): value is T[number] {
  return isString(value) && (allowed as readonly string[]).includes(value);
}

function checkBase(raw: Raw, tier: Tier, issues: Issues) {
  requireText(raw, 'id', issues);
  if (isString(raw.id) && !SLUG_PATTERN.test(raw.id)) issues.add(`"id" must be kebab-case slug, got "${raw.id}"`);
  requireText(raw, 'title', issues);
  requireText(raw, 'description', issues);
  if (raw.tier !== tier) issues.add(`"tier" must be "${tier}", got ${JSON.stringify(raw.tier)}`);
  if (!oneOf(raw.persona, PERSONAS)) issues.add(`"persona" must be one of ${PERSONAS.join(', ')}`);
  if (!isStringArray(raw.tags) || raw.tags.length === 0) issues.add(`"tags" must be a non-empty string array`);
  if (raw.author !== undefined && !isNonEmpty(raw.author)) issues.add(`"author" must be a non-empty string when present`);
  if (!isString(raw.createdAt) || !DATE_PATTERN.test(raw.createdAt) || Number.isNaN(Date.parse(raw.createdAt))) {
    issues.add(`"createdAt" must be an ISO date (YYYY-MM-DD)`);
  }
}

function checkVariables(value: unknown, issues: Issues, required: boolean): PromptVariable[] {
  if (value === undefined && !required) return [];
  if (!Array.isArray(value)) {
    issues.add(`"variables" must be an array`);
    return [];
  }
  const keys = new Set<string>();
  value.forEach((v: unknown, i) => {
    if (typeof v !== 'object' || v === null) return issues.add(`variables[${i}] must be an object`);
    const variable = v as Raw;
    if (!isString(variable.key) || !KEY_PATTERN.test(variable.key)) issues.add(`variables[${i}].key must match ${KEY_PATTERN}`);
    else if (keys.has(variable.key)) issues.add(`variables[${i}].key "${variable.key}" is duplicated`);
    else keys.add(variable.key);
    if (!isNonEmpty(variable.label)) issues.add(`variables[${i}].label must be a non-empty string`);
    for (const opt of ['defaultValue', 'placeholder'] as const) {
      if (variable[opt] !== undefined && !isString(variable[opt])) issues.add(`variables[${i}].${opt} must be a string`);
    }
    if (variable.type !== undefined && !oneOf(variable.type, VARIABLE_TYPES)) {
      issues.add(`variables[${i}].type must be one of ${VARIABLE_TYPES.join(', ')}`);
    }
    if (variable.type === 'select') {
      if (!isStringArray(variable.options) || variable.options.length < 2) {
        issues.add(`variables[${i}] of type "select" needs at least 2 string options`);
      } else if (isString(variable.defaultValue) && !variable.options.includes(variable.defaultValue)) {
        issues.add(`variables[${i}].defaultValue must be one of its options`);
      }
    } else if (variable.options !== undefined) {
      issues.add(`variables[${i}].options is only allowed for type "select"`);
    }
  });
  return value as PromptVariable[];
}

/** Every {{VAR}} in the template must be declared, and every declared variable must be used. */
function checkVariableSchema(template: string, variables: PromptVariable[], issues: Issues, strict: boolean) {
  const used = new Set(extractVariables(template));
  const declared = new Set(variables.map((v) => v.key));
  if (strict) {
    for (const key of used) if (!declared.has(key)) issues.add(`template uses {{${key}}} but it is not declared in "variables"`);
  }
  for (const key of declared) if (!used.has(key)) issues.add(`variable "${key}" is declared but never used in the template`);
  const unbalanced = template.match(/\{\{(?![a-zA-Z0-9_]+\}\})[^}]*\}?\}?/g);
  if (unbalanced) issues.add(`template has malformed placeholders: ${unbalanced.slice(0, 3).join(', ')}`);
}

function checkSecrets(raw: Raw, issues: Issues) {
  const blob = JSON.stringify(raw);
  for (const [name, pattern] of SECRET_PATTERNS) if (pattern.test(blob)) issues.add(`possible ${name} detected — never commit secrets`);
}

export function validatePrompt(raw: Raw, where: string): { item?: PromptItem; issues: string[] } {
  const issues = new Issues(where);
  checkBase(raw, 'prompt', issues);
  if (!oneOf(raw.category, PROMPT_CATEGORIES)) issues.add(`"category" must be one of ${PROMPT_CATEGORIES.join(', ')}`);
  requireText(raw, 'author', issues);
  requireText(raw, 'template', issues);
  const variables = checkVariables(raw.variables, issues, true);
  if (isString(raw.template)) checkVariableSchema(raw.template, variables, issues, true);
  checkSecrets(raw, issues);
  return issues.list.length ? { issues: issues.list } : { item: raw as unknown as PromptItem, issues: [] };
}

export function validateBoost(raw: Raw, where: string): { item?: BoostItem; issues: string[] } {
  const issues = new Issues(where);
  checkBase(raw, 'boost', issues);
  if (raw.persona === 'general') issues.add(`boost "persona" must be "tvt-agency" or "toilatung"`);
  if (!isString(raw.slashCommand) || !SLASH_PATTERN.test(raw.slashCommand)) {
    issues.add(`"slashCommand" must look like "/boost UPPER_SNAKE"`);
  }
  if (!oneOf(raw.reasoningType, REASONING_TYPES)) issues.add(`"reasoningType" must be one of ${REASONING_TYPES.join(', ')}`);
  if (raw.category !== undefined && !isNonEmpty(raw.category)) issues.add(`"category" must be a non-empty string when present`);
  requireText(raw, 'template', issues);
  const variables = checkVariables(raw.variables, issues, false);
  if (isString(raw.template)) {
    checkVariableSchema(raw.template, variables, issues, false);
    if (extractVariables(raw.template).length === 0) issues.add(`boost template should expose at least one {{VARIABLE}}`);
  }
  checkSecrets(raw, issues);
  return issues.list.length ? { issues: issues.list } : { item: raw as unknown as BoostItem, issues: [] };
}

export function validateSkill(raw: Raw, where: string): { item?: SkillItem; issues: string[] } {
  const issues = new Issues(where);
  checkBase(raw, 'skill', issues);
  requireText(raw, 'category', issues);
  requireText(raw, 'sopMarkdown', issues);
  if (!Array.isArray(raw.inputs) || raw.inputs.length === 0) {
    issues.add(`"inputs" must be a non-empty array`);
  } else {
    const names = new Set<string>();
    raw.inputs.forEach((input: unknown, i) => {
      const r = (input ?? {}) as Raw;
      if (!isString(r.name) || !KEY_PATTERN.test(r.name)) issues.add(`inputs[${i}].name must match ${KEY_PATTERN}`);
      else if (names.has(r.name)) issues.add(`inputs[${i}].name "${r.name}" is duplicated`);
      else names.add(r.name);
      if (!isNonEmpty(r.type)) issues.add(`inputs[${i}].type must be a non-empty string`);
      if (!isNonEmpty(r.description)) issues.add(`inputs[${i}].description must be a non-empty string`);
      if (typeof r.required !== 'boolean') issues.add(`inputs[${i}].required must be a boolean`);
    });
  }
  if (!isStringArray(raw.auditGates) || raw.auditGates.length === 0) issues.add(`"auditGates" must be a non-empty string array`);
  if (raw.tools !== undefined && !isStringArray(raw.tools)) issues.add(`"tools" must be a string array`);
  if (isString(raw.sopMarkdown)) {
    if (!/^#{1,3} /m.test(raw.sopMarkdown)) issues.add(`SOP markdown must contain at least one heading`);
    const inputNames = new Set(Array.isArray(raw.inputs) ? raw.inputs.map((i) => (i as Raw).name) : []);
    for (const key of extractVariables(raw.sopMarkdown)) {
      if (!inputNames.has(key)) issues.add(`SOP uses {{${key}}} but no input with that name exists`);
    }
  }
  checkSecrets(raw, issues);
  return issues.list.length ? { issues: issues.list } : { item: raw as unknown as SkillItem, issues: [] };
}

export function checkUniqueIds(items: HubItem[]): string[] {
  const seen = new Map<string, number>();
  for (const item of items) seen.set(item.id, (seen.get(item.id) ?? 0) + 1);
  return [...seen].filter(([, n]) => n > 1).map(([id, n]) => `duplicate id "${id}" used by ${n} items`);
}

// ───────────────────────────── V3: Workflows & Bots ─────────────────────────────

function checkMeta(raw: Raw, issues: Issues) {
  requireText(raw, 'author', issues);
  if (!isStringArray(raw.tags) || raw.tags.length === 0) issues.add(`"tags" must be a non-empty string array`);
  if (!isString(raw.createdAt) || !DATE_PATTERN.test(raw.createdAt) || Number.isNaN(Date.parse(raw.createdAt))) {
    issues.add(`"createdAt" must be an ISO date (YYYY-MM-DD)`);
  }
}

/**
 * Workflow = ordered steps forming a DAG. Edges are `previous_step` inputs, which may only point
 * to EARLIER steps — that single rule makes cycles impossible. Every intermediate output must feed
 * a later step, and every {{VAR}} must be declared (and vice versa).
 */
export function validateWorkflow(raw: Raw, where: string): { item?: WorkflowItem; issues: string[] } {
  const issues = new Issues(where);
  requireText(raw, 'id', issues);
  for (const field of ['id', 'slug'] as const) {
    if (!isString(raw[field]) || !SLUG_PATTERN.test(raw[field])) issues.add(`"${field}" must be a kebab-case slug`);
  }
  for (const field of ['title', 'summary', 'category', 'estimatedTime', 'estimatedCost'] as const) requireText(raw, field, issues);
  if (!oneOf(raw.difficulty, WORKFLOW_DIFFICULTIES)) issues.add(`"difficulty" must be one of ${WORKFLOW_DIFFICULTIES.join(', ')}`);
  if (!oneOf(raw.persona, PERSONAS)) issues.add(`"persona" must be one of ${PERSONAS.join(', ')}`);
  checkMeta(raw, issues);

  if (!Array.isArray(raw.steps) || raw.steps.length < 2) {
    issues.add(`"steps" must contain at least 2 steps`);
    return { issues: issues.list };
  }

  const seenStepIds: string[] = [];
  const consumed = new Set<string>();
  const userLabels = new Map<string, string>();

  raw.steps.forEach((value: unknown, index) => {
    const step = (value ?? {}) as Raw;
    const at = `steps[${index}]`;
    if (step.stepNumber !== index + 1) issues.add(`${at}.stepNumber must be ${index + 1} (sequential, 1-based)`);
    if (!isString(step.id) || !SLUG_PATTERN.test(step.id)) issues.add(`${at}.id must be a kebab-case slug`);
    else if (seenStepIds.includes(step.id)) issues.add(`${at}.id "${step.id}" is duplicated`);
    for (const field of ['title', 'agentRole', 'targetModel', 'promptTemplate', 'qualityGate'] as const) {
      if (!isNonEmpty(step[field])) issues.add(`${at}.${field} must be a non-empty string`);
    }
    if (!oneOf(step.outputFormat, WORKFLOW_OUTPUT_FORMATS)) issues.add(`${at}.outputFormat must be one of ${WORKFLOW_OUTPUT_FORMATS.join(', ')}`);
    if (step.botId !== undefined && (!isString(step.botId) || !SLUG_PATTERN.test(step.botId))) issues.add(`${at}.botId must be a slug`);

    const keys: string[] = [];
    if (!Array.isArray(step.inputs)) {
      issues.add(`${at}.inputs must be an array`);
    } else {
      step.inputs.forEach((inputValue: unknown, j) => {
        const input = (inputValue ?? {}) as Raw;
        const iat = `${at}.inputs[${j}]`;
        if (!isString(input.key) || !KEY_PATTERN.test(input.key)) return issues.add(`${iat}.key must match ${KEY_PATTERN}`);
        if (keys.includes(input.key)) issues.add(`${iat}.key "${input.key}" is duplicated in this step`);
        keys.push(input.key);
        if (!isNonEmpty(input.label)) issues.add(`${iat}.label must be a non-empty string`);
        if (!oneOf(input.source, WORKFLOW_INPUT_SOURCES)) issues.add(`${iat}.source must be one of ${WORKFLOW_INPUT_SOURCES.join(', ')}`);
        if (input.source === 'previous_step') {
          if (!isString(input.fromStepId)) issues.add(`${iat} (previous_step) needs "fromStepId"`);
          else if (!seenStepIds.includes(input.fromStepId)) {
            issues.add(`${iat}.fromStepId "${input.fromStepId}" must reference an earlier step (no forward edges / cycles)`);
          } else consumed.add(input.fromStepId);
        } else if (input.source === 'user_input') {
          if (input.fromStepId !== undefined) issues.add(`${iat} (user_input) must not set "fromStepId"`);
          if (isString(input.label)) {
            const previous = userLabels.get(input.key);
            if (previous !== undefined && previous !== input.label) {
              issues.add(`${iat}: user input "${input.key}" has label "${input.label}" but an earlier step labels it "${previous}"`);
            } else userLabels.set(input.key, input.label);
          }
        }
        if (input.type !== undefined && !oneOf(input.type, VARIABLE_TYPES)) issues.add(`${iat}.type must be one of ${VARIABLE_TYPES.join(', ')}`);
        if (input.type === 'select' && (!isStringArray(input.options) || input.options.length < 2)) {
          issues.add(`${iat} of type "select" needs at least 2 options`);
        }
      });
    }
    if (isString(step.promptTemplate)) {
      const declared = keys.map((key) => ({ key, label: key }));
      const scoped = new Issues(at);
      checkVariableSchema(step.promptTemplate, declared, scoped, true);
      scoped.list.forEach((m) => issues.add(m.slice(where.length + 2)));
    }
    if (isString(step.id)) seenStepIds.push(step.id);
  });

  // Every intermediate output must be piped somewhere downstream.
  seenStepIds.slice(0, -1).forEach((id) => {
    if (!consumed.has(id)) issues.add(`step "${id}" output is never used by a later step`);
  });
  checkSecrets(raw, issues);
  return issues.list.length ? { issues: issues.list } : { item: raw as unknown as WorkflowItem, issues: [] };
}

export const BOT_ID_PATTERN = /^[a-z][a-z0-9-]{1,30}$/;
const MIN_SYSTEM_PROMPT = 400;

export function validateBot(raw: Raw, where: string): { item?: BotItem; issues: string[] } {
  const issues = new Issues(where);
  if (!isString(raw.id) || !BOT_ID_PATTERN.test(raw.id)) issues.add(`"id" must be a short lowercase slug`);
  for (const field of ['name', 'role', 'avatar', 'description', 'systemPrompt'] as const) requireText(raw, field, issues);
  if (!oneOf(raw.department, BOT_DEPARTMENTS)) issues.add(`"department" must be one of ${BOT_DEPARTMENTS.join(', ')}`);
  if (isString(raw.avatar) && [...raw.avatar].length > 4) issues.add(`"avatar" must be a single emoji / short glyph`);
  if (isString(raw.systemPrompt) && raw.systemPrompt.trim().length < MIN_SYSTEM_PROMPT) {
    issues.add(`"systemPrompt" is too thin (${raw.systemPrompt.trim().length} chars, minimum ${MIN_SYSTEM_PROMPT})`);
  }
  for (const field of ['recommendedModels', 'tools'] as const) {
    if (!isStringArray(raw[field]) || raw[field].length === 0) issues.add(`"${field}" must be a non-empty string array`);
  }
  if (raw.tier !== undefined && raw.tier !== 'core' && raw.tier !== 'specialist') issues.add(`"tier" must be "core" or "specialist"`);
  if (raw.tier === 'specialist') {
    if (!oneOf(raw.specialty, SPECIALTIES)) issues.add(`specialist "specialty" must be one of ${SPECIALTIES.join(', ')}`);
    const ci = raw.customInstructions as Raw | undefined;
    if (!ci || !isNonEmpty(ci.know) || !isNonEmpty(ci.respond)) issues.add(`specialist needs "customInstructions" with non-empty "know" and "respond"`);
  } else if (raw.specialty !== undefined) {
    issues.add(`"specialty" is only allowed on specialist bots`);
  }
  checkMeta(raw, issues);
  checkSecrets(raw, issues);
  return issues.list.length ? { issues: issues.list } : { item: raw as unknown as BotItem, issues: [] };
}

/** Cross-collection checks: unique ids and every workflow step botId resolves to a bot. */
export function checkV3Links(workflows: WorkflowItem[], bots: BotItem[]): string[] {
  const issues: string[] = [];
  const dup = (ids: string[], label: string) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) issues.push(`duplicate ${label} "${id}"`);
      seen.add(id);
    }
  };
  dup(workflows.map((w) => w.id), 'workflow id');
  dup(workflows.map((w) => w.slug), 'workflow slug');
  dup(bots.map((b) => b.id), 'bot id');
  const botIds = new Set(bots.map((b) => b.id));
  for (const wf of workflows) {
    for (const step of wf.steps) {
      if (step.botId && !botIds.has(step.botId)) issues.push(`workflow "${wf.id}" step "${step.id}" references unknown bot "${step.botId}"`);
    }
  }
  return issues;
}
