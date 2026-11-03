import type { BotItem, HubItem, HubStats, WorkflowItem } from '@/types/hub';
import { collectUserInputs } from '@/lib/workflow';
import { buildWorkbenchModel } from '@/lib/variables';
import { extractStack } from '@/lib/facets';
import { itemCategory } from '@/lib/summary';
import { catalogTier, categoryLabel, PERSONA_META, TIER_META } from '@/lib/labels';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, REPO_URL } from '@/lib/site';

/**
 * SEO / GEO / AEO builders. Pure functions (no Next.js imports) so they are unit-testable
 * and reusable from route handlers, pages and scripts.
 */

export const TARGET_AGENTS = ['ChatGPT', 'Claude', 'Claude Code', 'Cursor', 'Windsurf', 'OpenClaw', 'Hermes'] as const;

const TIER_NOUN: Record<HubItem['tier'], string> = {
  prompt: 'Prompt (micro-prompt có biến)',
  skill: 'Agent Skill (SOP chuẩn SKILL.md)',
  boost: 'Prompt Deep Reasoning (meta-prompt / slash command)',
};

function abs(path: string, base: string) {
  return new URL(path, base.endsWith('/') ? base : `${base}/`).toString();
}

function lowerFirst(text: string) {
  return text ? text.charAt(0).toLowerCase() + text.slice(1) : text;
}

function stripMd(text: string) {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[>#\-*\d.\s|:]+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function workflowUrl(slug: string, base: string) {
  return abs(`/workflows/${encodeURIComponent(slug)}`, base);
}

export function botUrl(id: string, base: string) {
  return abs(`/bots/${encodeURIComponent(id)}`, base);
}

function latestOf(list: { createdAt: string }[]): string {
  return list.reduce((max, i) => (i.createdAt > max ? i.createdAt : max), '1970-01-01');
}

/**
 * hreflang alternates. UI strings are localized client-side on the same static page; `?lang=en`
 * forces English (the boot script reads it), so each language has its own crawlable URL.
 */
export function localeAlternates(path: string) {
  const en = `${path}${path.includes('?') ? '&' : '?'}lang=en`;
  return { canonical: path, languages: { vi: path, en, 'x-default': path } };
}

export function itemUrl(id: string, base: string) {
  return abs(`/items/${encodeURIComponent(id)}`, base);
}

/** Answer-first definition paragraph (the snippet AI engines quote). */
export function answerFirst(item: HubItem): string {
  const { variables } = buildWorkbenchModel(item);
  const inputs = variables.length
    ? `Cần ${variables.length} đầu vào: ${variables
        .map((v) => v.label.replace(/[.…\s]+$/, ''))
        .slice(0, 4)
        .join('; ')}${variables.length > 4 ? ` và ${variables.length - 4} biến khác` : ''}.`
    : 'Không cần biến đầu vào — copy và dùng ngay.';
  return `${item.title} là một ${TIER_NOUN[item.tier]} thuộc nhóm ${categoryLabel(itemCategory(item))}, giúp ${lowerFirst(
    item.description.replace(/\.$/, ''),
  )}. ${inputs} Dùng trực tiếp với ChatGPT, Claude, Cursor/Windsurf hoặc xuất SKILL.md cho Claude Code, OpenClaw, Hermes.`;
}

export interface HowToStep {
  name: string;
  text: string;
}

/** Steps: skills use their SOP headings; prompts/boosts use the fill → preview → copy flow. */
export function buildHowToSteps(item: HubItem): HowToStep[] {
  if (item.tier === 'skill') {
    const lines = item.sopMarkdown.split('\n');
    const steps: HowToStep[] = [];
    for (let i = 0; i < lines.length && steps.length < 12; i++) {
      const heading = /^#{2,3}\s+(.+)$/.exec(lines[i]);
      if (!heading) continue;
      const name = stripMd(heading[1]);
      if (!name || /^(inputs?|tools?|quality gates?|đầu ra|output)$/i.test(name)) continue;
      let text = '';
      for (let j = i + 1; j < lines.length && !/^#{1,3}\s/.test(lines[j]); j++) {
        const candidate = stripMd(lines[j]);
        if (candidate.length > 12 && !/^[-|:\s]+$/.test(lines[j])) {
          text = candidate;
          break;
        }
      }
      steps.push({ name, text: (text || name).slice(0, 280) });
    }
    if (steps.length >= 2) return steps;
  }
  const { variables } = buildWorkbenchModel(item);
  return [
    {
      name: 'Điền biến đầu vào',
      text: variables.length
        ? `Điền ${variables.length} biến: ${variables.map((v) => v.label).join('; ')}.`
        : 'Mục này không có biến — chuyển thẳng sang bước tiếp theo.',
    },
    { name: 'Xem trước kết quả', text: 'Kiểm tra live preview: phần đã điền được tô xanh, biến còn trống được tô vàng.' },
    {
      name: 'Copy cho công cụ AI',
      text: 'Bấm Copy cho ChatGPT/Claude, Copy .cursorrules cho Cursor/Windsurf, hoặc tải SKILL.md cho Claude Code / OpenClaw / Hermes.',
    },
    {
      name: item.tier === 'boost' ? 'Kích hoạt Boost' : 'Chạy và tinh chỉnh',
      text:
        item.tier === 'boost'
          ? `Dán vào hội thoại, bắt đầu bằng lệnh ${item.slashCommand} để kích hoạt chế độ suy luận ${item.reasoningType}.`
          : 'Dán vào công cụ AI, đánh giá đầu ra và lưu lại phiên bản giá trị biến hiệu quả nhất bằng Direct link.',
    },
  ];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function buildItemFaq(item: HubItem): FaqEntry[] {
  const { variables } = buildWorkbenchModel(item);
  const faq: FaqEntry[] = [
    { question: `${item.title} dùng để làm gì?`, answer: answerFirst(item) },
    {
      question: 'Cần chuẩn bị những thông tin đầu vào nào?',
      answer: variables.length
        ? variables.map((v) => `${v.label} ({{${v.key}}})`).join('; ') + '. Mỗi biến có ô nhập riêng và giá trị mẫu để thử ngay.'
        : 'Không cần thông tin đầu vào riêng — nội dung đã sẵn sàng để copy.',
    },
    {
      question: `Dùng ${item.title} với ChatGPT, Claude hoặc Cursor như thế nào?`,
      answer: buildHowToSteps(item)
        .slice(0, 4)
        .map((s, i) => `${i + 1}. ${s.name}: ${s.text}`)
        .join(' '),
    },
  ];
  if (item.tier === 'skill') {
    faq.push({
      question: 'Skill này có những quality gate nào?',
      answer: `Trước khi bàn giao, agent phải vượt qua: ${item.auditGates.join('; ')}.`,
    });
  } else if (item.tier === 'boost') {
    faq.push({
      question: 'Kích hoạt Boost này bằng lệnh nào?',
      answer: `Dùng slash command ${item.slashCommand} ở đầu tin nhắn. Kiểu suy luận: ${item.reasoningType}.`,
    });
  } else {
    faq.push({
      question: 'Có thể chia sẻ prompt đã điền sẵn cho đồng đội không?',
      answer: 'Có. Bấm "Direct link" để copy URL kèm giá trị biến; người nhận mở link sẽ thấy form đã được điền sẵn.',
    });
  }
  return faq;
}

type JsonLd = Record<string, unknown>;

export function organizationsJsonLd(base: string): JsonLd[] {
  return [
    {
      '@type': 'Organization',
      '@id': 'https://tvtagency.com/#organization',
      name: 'TVT Agency',
      url: 'https://tvtagency.com',
      logo: abs('/icon.svg', base),
      sameAs: [REPO_URL],
    },
    {
      '@type': 'Organization',
      '@id': 'https://toilatung.com/#organization',
      name: 'toilatung.com',
      alternateName: 'Tôi Là Tùng',
      url: 'https://toilatung.com',
    },
  ];
}

export function homeJsonLd(base: string, stats: HubStats): JsonLd {
  const home = abs('/', base);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${home}#website`,
        url: home,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: ['vi', 'en'],
        publisher: { '@id': 'https://tvtagency.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${home}?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${home}#app`,
        name: SITE_NAME,
        alternateName: SITE_TAGLINE,
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'Prompt library & AI agent skills',
        operatingSystem: 'Web',
        url: home,
        description: `${SITE_DESCRIPTION} Gồm ${stats.prompts + stats.boosts} Prompts (trong đó ${stats.boosts} Deep Reasoning), ${stats.skills} Skills, ${stats.bots} Bots và ${stats.workflows} Workflows.`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isAccessibleForFree: true,
        license: 'https://opensource.org/licenses/MIT',
        codeRepository: REPO_URL,
        featureList: [
          'Interactive {{VARIABLE}} form with live preview',
          'Copy for ChatGPT / Claude',
          'Export .cursorrules for Cursor / Windsurf',
          'Export SKILL.md for Claude Code, OpenClaw, Hermes',
          'Cmd+K fuzzy command palette',
        ],
        author: [{ '@id': 'https://tvtagency.com/#organization' }, { '@id': 'https://toilatung.com/#organization' }],
      },
      ...organizationsJsonLd(base),
    ],
  };
}

export function itemJsonLd(item: HubItem, base: string): JsonLd {
  const url = itemUrl(item.id, base);
  const { variables } = buildWorkbenchModel(item);
  const steps = buildHowToSteps(item);
  const faq = buildItemFaq(item);
  const tierPath = `/${catalogTier(item.tier)}s`;
  const author =
    item.persona === 'toilatung' ? { '@id': 'https://toilatung.com/#organization' } : { '@id': 'https://tvtagency.com/#organization' };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: item.title.slice(0, 110),
        description: item.description,
        abstract: answerFirst(item),
        inLanguage: ['vi', 'en'],
        datePublished: item.createdAt,
        dateModified: item.createdAt,
        author,
        publisher: { '@id': 'https://tvtagency.com/#organization' },
        image: abs(`/items/${encodeURIComponent(item.id)}/opengraph-image`, base),
        articleSection: `${TIER_META[item.tier].plural} · ${categoryLabel(itemCategory(item))}`,
        keywords: [...item.tags, TIER_META[item.tier].label, categoryLabel(itemCategory(item))].join(', '),
        proficiencyLevel: item.tier === 'prompt' ? 'Beginner' : 'Expert',
        audience: { '@type': 'Audience', audienceType: PERSONA_META[item.persona].label },
        about: TARGET_AGENTS.map((name) => ({ '@type': 'SoftwareApplication', name, applicationCategory: 'AI assistant' })),
        isAccessibleForFree: true,
        license: 'https://opensource.org/licenses/MIT',
        isPartOf: { '@id': `${abs('/', base)}#website` },
      },
      {
        '@type': 'HowTo',
        '@id': `${url}#howto`,
        name: `Cách dùng ${item.title}`,
        description: item.description,
        inLanguage: ['vi', 'en'],
        supply: variables.map((v) => ({ '@type': 'HowToSupply', name: `${v.label} ({{${v.key}}})` })),
        tool: [...TARGET_AGENTS, ...extractStack(item)].map((name) => ({ '@type': 'HowToTool', name })),
        step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text, url: `${url}#step-${i + 1}` })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Hub', item: abs('/', base) },
          { '@type': 'ListItem', position: 2, name: catalogTier(item.tier) === 'skill' ? 'Skills' : 'Prompts', item: abs(tierPath, base) },
          { '@type': 'ListItem', position: 3, name: item.title, item: url },
        ],
      },
    ],
  };
}

/** Escapes `<` so payload strings can never close the <script> tag (XSS-safe JSON-LD). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
  priority: number;
}

export interface V3Collections {
  workflows: WorkflowItem[];
  bots: BotItem[];
}

export function buildSitemapEntries(
  items: HubItem[],
  base: string,
  buildDate: string,
  v3: V3Collections = { workflows: [], bots: [] },
): SitemapEntry[] {
  const latest = items.reduce((max, i) => (i.createdAt > max ? i.createdAt : max), '1970-01-01');
  const latestFor = (tier: HubItem['tier']) =>
    items.filter((i) => i.tier === tier).reduce((max, i) => (i.createdAt > max ? i.createdAt : max), '1970-01-01');
  return [
    { url: abs('/', base), lastModified: latest, changeFrequency: 'daily', priority: 1 },
    { url: abs('/prompts', base), lastModified: [latestFor('prompt'), latestFor('boost')].sort().at(-1)!, changeFrequency: 'weekly', priority: 0.9 },
    { url: abs('/skills', base), lastModified: latestFor('skill'), changeFrequency: 'weekly', priority: 0.9 },
    ...(v3.bots.length ? [{ url: abs('/bots', base), lastModified: latestOf(v3.bots), changeFrequency: 'weekly' as const, priority: 0.9 }] : []),
    ...(v3.workflows.length
      ? [{ url: abs('/workflows', base), lastModified: latestOf(v3.workflows), changeFrequency: 'weekly' as const, priority: 0.9 }]
      : []),
    { url: abs('/build-in-public', base), lastModified: buildDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: abs('/guide', base), lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: abs('/docs/api', base), lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: abs('/docs/self-hosting', base), lastModified: buildDate, changeFrequency: 'monthly', priority: 0.5 },
    ...v3.workflows.map((wf) => ({ url: workflowUrl(wf.slug, base), lastModified: wf.createdAt, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...v3.bots.map((bot) => ({ url: botUrl(bot.id, base), lastModified: bot.createdAt, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...items.map((item) => ({
      url: itemUrl(item.id, base),
      lastModified: item.createdAt,
      changeFrequency: 'monthly' as const,
      priority: item.tier === 'prompt' ? 0.7 : 0.8,
    })),
  ];
}

/** /llms.txt — a curated, Markdown index of the site for LLM crawlers (llmstxt.org convention). */
export function buildLlmsTxt(items: HubItem[], base: string, v3: V3Collections = { workflows: [], bots: [] }): string {
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'Mỗi mục có trang chi tiết với form điền biến {{VARIABLE}}, live preview, và xuất ra ChatGPT/Claude, .cursorrules (Cursor/Windsurf) hoặc SKILL.md (Claude Code, OpenClaw, Hermes). Nội dung mở theo giấy phép MIT.',
    '',
    `- Mã nguồn: ${REPO_URL}`,
    `- MCP server (JSON-RPC 2.0, Streamable HTTP): ${abs('/api/mcp', base)} — tools: tvt_search, tvt_get_prompt, tvt_get_skill, tvt_get_bot, tvt_list_workflows`,
    `- Tài liệu API: ${abs('/docs/api', base)} · Cẩm nang prompt 2026: ${abs('/guide', base)}`,
    `- Sitemap: ${abs('/sitemap.xml', base)}`,
    '',
  ];
  for (const tier of ['prompt', 'skill', 'boost'] as const) {
    const group = items.filter((i) => i.tier === tier);
    if (!group.length) continue;
    lines.push(`## ${tier === 'boost' ? 'Prompts › Deep Reasoning' : TIER_META[tier].plural} (${group.length})`, '');
    for (const item of group) {
      const extra = item.tier === 'boost' ? ` Lệnh: \`${item.slashCommand}\`.` : '';
      lines.push(`- [${item.title}](${itemUrl(item.id, base)}): ${item.description}${extra}`);
    }
    lines.push('');
  }
  if (v3.workflows.length) {
    lines.push(`## Workflows (${v3.workflows.length})`, '');
    for (const wf of v3.workflows) {
      lines.push(`- [${wf.title}](${workflowUrl(wf.slug, base)}): ${wf.summary} (${wf.steps.length} bước, ${wf.difficulty}).`);
    }
    lines.push('');
  }
  if (v3.bots.length) {
    lines.push(`## Bots — AI Workforce (${v3.bots.length})`, '');
    for (const bot of v3.bots) lines.push(`- [${bot.name} — ${bot.role}](${botUrl(bot.id, base)}): ${bot.description}`);
    lines.push('');
  }
  return lines.join('\n');
}

export function workflowJsonLd(wf: WorkflowItem, base: string): JsonLd {
  const url = workflowUrl(wf.slug, base);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        '@id': `${url}#howto`,
        url,
        name: wf.title,
        description: wf.summary,
        inLanguage: ['vi', 'en'],
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: wf.estimatedCost },
        datePublished: wf.createdAt,
        author: wf.persona === 'toilatung' ? { '@id': 'https://toilatung.com/#organization' } : { '@id': 'https://tvtagency.com/#organization' },
        supply: collectUserInputs(wf).map((i) => ({ '@type': 'HowToSupply', name: i.label })),
        tool: [...new Set(wf.steps.map((s) => s.targetModel))].map((name) => ({ '@type': 'HowToTool', name })),
        step: wf.steps.map((s) => ({
          '@type': 'HowToStep',
          position: s.stepNumber,
          name: s.title,
          text: `${s.agentRole} · ${s.targetModel}. Tiêu chí nghiệm thu: ${s.qualityGate}`,
          url: `${url}#${s.id}`,
        })),
        keywords: wf.tags.join(', '),
        isAccessibleForFree: true,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Hub', item: abs('/', base) },
          { '@type': 'ListItem', position: 2, name: 'Workflows', item: abs('/workflows', base) },
          { '@type': 'ListItem', position: 3, name: wf.title, item: url },
        ],
      },
    ],
  };
}

export function botJsonLd(bot: BotItem, base: string): JsonLd {
  const url = botUrl(bot.id, base);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#bot`,
        url,
        name: `${bot.name} — ${bot.role}`,
        description: bot.description,
        applicationCategory: 'AI agent persona (system prompt)',
        operatingSystem: 'Claude, ChatGPT, Claude Code, Cursor, n8n',
        inLanguage: ['vi', 'en'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isAccessibleForFree: true,
        keywords: bot.tags.join(', '),
        datePublished: bot.createdAt,
        author: { '@id': 'https://tvtagency.com/#organization' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Hub', item: abs('/', base) },
          { '@type': 'ListItem', position: 2, name: 'Bots', item: abs('/bots', base) },
          { '@type': 'ListItem', position: 3, name: bot.name, item: url },
        ],
      },
    ],
  };
}
