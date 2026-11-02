import type { Persona, Tier } from '@/types/hub';

export const TIER_META: Record<Tier, { label: string; plural: string; tagline: string; accent: string }> = {
  prompt: { label: 'Prompt', plural: 'Prompts', tagline: 'Micro-prompts với biến động', accent: 'cyan' },
  skill: { label: 'Skill', plural: 'Skills', tagline: 'Agent SOP chuẩn SKILL.md', accent: 'emerald' },
  boost: { label: 'Boost', plural: 'Boosts', tagline: 'Meta-prompt & slash command', accent: 'violet' },
};

export const PERSONA_META: Record<Persona, { label: string; short: string }> = {
  'tvt-agency': { label: 'TVT Agency', short: 'Agency' },
  toilatung: { label: 'toilatung.com', short: 'OCP' },
  general: { label: 'General', short: 'General' },
};

export const CATEGORY_LABELS: Record<string, string> = {
  video: 'Video & Motion',
  ads: 'Paid Ads',
  marketing: 'Marketing & Growth',
  seo: 'SEO / GEO',
  copywriting: 'Copywriting',
  branding: 'Brand Strategy',
  sales: 'Sales & Enablement',
  'system-design': 'System Design & AI',
  operations: 'Operations & SOP',
  coding: 'Coding & Dev',
  devops: 'DevOps & VPS',
  security: 'Security & Audit',
  finance: 'Finance & Accounting',
  strategy: 'Business Strategy',
  'chain-of-thought': 'Chain-of-Thought',
  'tree-of-thought': 'Tree-of-Thought',
  'red-team': 'Red-Team',
  'system1-vs-2': 'System 1 vs 2',
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
