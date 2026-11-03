import type { BotDepartment, BotItem } from '@/types/hub';

/**
 * Converts the "Antigravity Persona" Markdown sources (ChatGPT custom-instructions format:
 * "What would you like ChatGPT to know?" / "How would you like ChatGPT to respond?") into BotItems.
 * Pure functions — used by scripts/import-personas.ts and the unit tests.
 */

export const SPECIALTIES = [
  'marketing',
  'developing',
  'technology',
  'business',
  'writing',
  'creative-arts',
  'finance',
  'education',
  'entertainment',
  'fitness',
] as const;
export type Specialty = (typeof SPECIALTIES)[number];

export const SPECIALTY_META: Record<Specialty, { label: string; labelVi: string; avatar: string; department: BotDepartment }> = {
  marketing: { label: 'Marketing', labelVi: 'Marketing', avatar: '📢', department: 'marketing-seo' },
  developing: { label: 'Developing', labelVi: 'Lập trình', avatar: '💻', department: 'crm-automation' },
  technology: { label: 'Technology', labelVi: 'Công nghệ', avatar: '🤖', department: 'crm-automation' },
  business: { label: 'Business', labelVi: 'Kinh doanh', avatar: '💼', department: 'command' },
  writing: { label: 'Writing', labelVi: 'Viết lách', avatar: '✍️', department: 'content-video' },
  'creative-arts': { label: 'Creative Arts', labelVi: 'Nghệ thuật sáng tạo', avatar: '🎨', department: 'content-video' },
  finance: { label: 'Finance', labelVi: 'Tài chính', avatar: '📈', department: 'command' },
  education: { label: 'Education', labelVi: 'Giáo dục', avatar: '🎓', department: 'command' },
  entertainment: { label: 'Entertainment', labelVi: 'Giải trí', avatar: '🎬', department: 'content-video' },
  fitness: { label: 'Fitness', labelVi: 'Thể hình', avatar: '⚡', department: 'command' },
};

const KNOW_MARKER = 'What would you like ChatGPT to know?:';
const RESPOND_MARKER = 'How would you like ChatGPT to respond?:';

export interface ParsedPersona {
  name: string;
  know: { label: string; value: string }[];
  respond: { label: string; value: string }[];
}

function bullets(block: string): { label: string; value: string }[] {
  return block
    .split('•')
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((part) => {
      const idx = part.indexOf(':');
      return idx > 0 ? { label: part.slice(0, idx).trim(), value: part.slice(idx + 1).trim() } : { label: '', value: part };
    })
    .filter((b) => b.value);
}

export function parsePersonaMarkdown(markdown: string): ParsedPersona {
  const name = (/^#\s+(.+)$/m.exec(markdown)?.[1] ?? '').trim();
  const knowAt = markdown.indexOf(KNOW_MARKER);
  const respondAt = markdown.indexOf(RESPOND_MARKER);
  if (!name || knowAt < 0 || respondAt < knowAt) throw new Error('persona markdown is missing its title or the know/respond sections');
  return {
    name,
    know: bullets(markdown.slice(knowAt + KNOW_MARKER.length, respondAt)),
    respond: bullets(markdown.slice(respondAt + RESPOND_MARKER.length)),
  };
}

const PHRASES: [RegExp, string][] = [
  [/natural language processing/g, 'nlp'],
  [/user generated content/g, 'ugc'],
  [/internet of things/g, 'iot'],
  [/search engine optimization/g, 'seo'],
];
const WORDS: Record<string, string> = {
  management: 'mgmt',
  development: 'dev',
  international: 'intl',
  information: 'info',
  organizational: 'org',
  communications: 'comms',
  administrator: 'admin',
  technology: 'tech',
  engineering: 'eng',
};
const STOP = new Set(['and', 'of', 'the', 'for', 'a', 'an', 'in', 'to']);
export const SLUG_MAX = 31;

/** Short, safe slug: no parentheses, no stop-words, abbreviations, ≤ 31 chars on a word boundary. */
export function personaSlug(name: string): string {
  let text = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/&/g, ' and ');
  for (const [pattern, replacement] of PHRASES) text = text.replace(pattern, replacement);
  const words = text
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !STOP.has(w))
    .map((w) => WORDS[w] ?? w);
  let slug = '';
  for (const word of words) {
    const next = slug ? `${slug}-${word}` : word;
    if (next.length > SLUG_MAX) break;
    slug = next;
  }
  if (!/^[a-z]/.test(slug)) slug = `p-${slug}`.slice(0, SLUG_MAX).replace(/-$/, '');
  return slug;
}

/** Ensures uniqueness against ids already taken (core bots + earlier specialists). */
export function uniqueSlug(base: string, taken: Set<string>): string {
  let slug = base;
  for (let i = 2; taken.has(slug); i++) {
    const suffix = `-${i}`;
    slug = base.slice(0, SLUG_MAX - suffix.length).replace(/-$/, '') + suffix;
  }
  taken.add(slug);
  return slug;
}

const NO_CLICHE_RULES = [
  'Open with the answer or the first concrete step — no warm-up lines such as "Great question!", "Certainly!" or "As an AI…".',
  'Avoid filler and hype words: "delve", "unlock", "game-changer", "in today\'s fast-paced world", "leverage synergies", "revolutionize".',
  'Prefer specifics — numbers, named methods, short worked examples — over adjectives.',
  'Flag assumptions and say "I don\'t know" instead of inventing facts, figures or sources.',
  'Reply in the user\'s language (Vietnamese when asked in Vietnamese) and keep their terminology.',
  'Never ask for, store or repeat passwords, API keys or personal identifiers.',
];

function bulletLines(list: { label: string; value: string }[]): string {
  return list.map((b) => (b.label ? `- **${b.label}:** ${b.value}` : `- ${b.value}`)).join('\n');
}

function rawBullets(list: { label: string; value: string }[]): string {
  return list.map((b) => (b.label ? `• ${b.label}: ${b.value}` : `• ${b.value}`)).join('\n');
}

export function describePersona(p: ParsedPersona): string {
  const resp = p.know.find((b) => /responsibilit/i.test(b.label))?.value;
  const expertise = p.know.find((b) => /knowledge|expertise/i.test(b.label))?.value;
  let text = [resp, expertise ? `Expertise: ${expertise}` : ''].filter(Boolean).join(' ').trim() || `${p.name} specialist persona.`;
  if (!/[.!?]$/.test(text)) text += '.';
  return text.length > 200 ? `${text.slice(0, 197).trimEnd()}…` : text;
}

export function personaToBot(p: ParsedPersona, specialty: Specialty, id: string, createdAt = '2026-11-03'): BotItem {
  const meta = SPECIALTY_META[specialty];
  const systemPrompt = [
    `# ${p.name}`,
    '',
    `You are an expert ${p.name} and a hands-on partner to a professional working in this role. The context below describes the role's responsibilities, typical challenges and current projects — use it to tailor every answer, and ask follow-up questions when key details are missing.`,
    '',
    '## Professional profile — what to know',
    bulletLines(p.know),
    '',
    '## How to respond',
    bulletLines(p.respond),
    '',
    '## Writing rules — no AI clichés',
    NO_CLICHE_RULES.map((r) => `- ${r}`).join('\n'),
  ].join('\n');

  return {
    id,
    name: p.name,
    role: p.name,
    department: meta.department,
    avatar: meta.avatar,
    description: describePersona(p),
    systemPrompt,
    recommendedModels: ['Claude Sonnet 5.5', 'Claude Opus 5.5'],
    tools: ['read_file', 'web_search'],
    tags: [meta.label, 'Specialist', 'Antigravity Persona'],
    author: 'Tôi Là Tùng',
    createdAt,
    tier: 'specialist',
    specialty,
    customInstructions: { know: rawBullets(p.know), respond: rawBullets(p.respond) },
  };
}

/** ChatGPT "Custom Instructions" text (2 fields). Core bots derive it from their system prompt sections. */
export function customInstructionsText(bot: Pick<BotItem, 'name' | 'role' | 'description' | 'systemPrompt' | 'customInstructions'>): string {
  let know = bot.customInstructions?.know;
  let respond = bot.customInstructions?.respond;
  if (!know || !respond) {
    const sections = bot.systemPrompt.split(/\n(?=## )/);
    const pick = (re: RegExp) => sections.filter((s) => re.test(s.split('\n')[0])).join('\n\n').trim();
    know = `${bot.name} — ${bot.role}. ${bot.description}`;
    respond = [pick(/Nguyên tắc|Principles/i), pick(/Định dạng|Output/i), pick(/Ranh giới|Boundar/i)].filter(Boolean).join('\n\n') || bot.systemPrompt;
  }
  const clip = (text: string) => (text.length > 1500 ? `${text.slice(0, 1497).trimEnd()}…` : text);
  return [
    '### What would you like ChatGPT to know about you to provide better responses?',
    clip(know),
    '',
    '### How would you like ChatGPT to respond?',
    clip(respond),
  ].join('\n');
}
