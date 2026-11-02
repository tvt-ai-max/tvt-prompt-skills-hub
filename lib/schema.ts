import {
  PERSONAS,
  PROMPT_CATEGORIES,
  REASONING_TYPES,
  VARIABLE_TYPES,
  type BoostItem,
  type HubItem,
  type PromptItem,
  type PromptVariable,
  type SkillItem,
  type Tier,
} from '@/types/hub';
import { extractVariables } from '@/lib/variables';

/** Runtime validation that mirrors types/hub.ts. Pure — usable in scripts and at build time. */

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const KEY_PATTERN = /^[a-zA-Z0-9_]+$/;
export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const SLASH_PATTERN = /^\/boost [A-Z0-9_]+$/;

/** Patterns that look like real secrets. Content must never ship these. */
const SECRET_PATTERNS: [string, RegExp][] = [
  ['OpenAI key', /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/],
  ['Anthropic key', /sk-ant-[A-Za-z0-9_-]{20,}/],
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
