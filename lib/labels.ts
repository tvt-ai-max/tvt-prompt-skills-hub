import type { Persona, Tier } from '@/types/hub';

export const TIER_META: Record<Tier, { label: string; plural: string; tagline: string; accent: string }> = {
  prompt: { label: 'Prompt', plural: 'Prompts', tagline: 'Micro-prompts với biến động', accent: 'cyan' },
  skill: { label: 'Skill', plural: 'Skills', tagline: 'Agent SOP chuẩn SKILL.md', accent: 'emerald' },
  /** Boosts are presented as a Prompts category since V3 ("Deep Reasoning"); data model unchanged. */
  boost: { label: 'Deep Reasoning', plural: 'Deep Reasoning', tagline: 'Meta-prompt suy luận sâu & slash command', accent: 'violet' },
};

export const PERSONA_META: Record<Persona, { label: string; short: string }> = {
  'tvt-agency': { label: 'TVT Agency', short: 'Agency' },
  toilatung: { label: 'toilatung.com', short: 'OCP' },
  general: { label: 'General', short: 'General' },
};

export const CATEGORY_LABELS: Record<string, string> = {
  image: 'Image',
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
  'deep-reasoning': 'Deep Reasoning',
  'chain-of-thought': 'Chain-of-Thought',
  'tree-of-thought': 'Tree-of-Thought',
  'red-team': 'Red-Team',
  'system1-vs-2': 'System 1 vs 2',
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Catalog section an item is listed under (Deep Reasoning boosts live inside Prompts). */
export function catalogTier(tier: Tier): 'prompt' | 'skill' {
  return tier === 'skill' ? 'skill' : 'prompt';
}

export const DEEP_REASONING_CATEGORY = 'deep-reasoning';

export const BOT_DEPARTMENT_META: Record<import('@/types/hub').BotDepartment, { label: string; short: string; accent: string }> = {
  command: { label: 'Điều phối (Command)', short: 'Command', accent: 'text-amber-500 border-neon-amber/35 bg-neon-amber/10' },
  'content-video': { label: 'Content & Video', short: 'Content/Video', accent: 'text-cyan-300 border-neon-cyan/30 bg-neon-cyan/10' },
  'marketing-seo': { label: 'Marketing & SEO', short: 'Marketing/SEO', accent: 'text-emerald-300 border-neon-emerald/30 bg-neon-emerald/10' },
  'crm-automation': { label: 'CRM, Automation & Ops', short: 'CRM/Automation', accent: 'text-violet-300 border-neon-violet/35 bg-neon-violet/10' },
};
