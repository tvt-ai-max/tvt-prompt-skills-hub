import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import type { BoostItem, HubItemSummary, PromptItem, SkillItem } from '../types/hub';
import { flipPreference, nextPreference, parsePreference, resolveTheme, THEME_BOOT_SCRIPT, THEME_STORAGE_KEY } from './theme';
import { parseFavorites, pinFavorites, readFavorites, toggleFavorite, writeFavorites, FAVORITES_KEY } from './favorites';
import { applyCatalogFilter, type CatalogFilter } from './filter';
import { countFacet, extractStack } from './facets';
import { buildDirectLink, buildShareUrls, parseDirectLink, shareCaption } from './share';
import { buildHowToSteps, buildItemFaq, buildLlmsTxt, buildSitemapEntries, homeJsonLd, itemJsonLd, serializeJsonLd } from './seo';
import { buildReadmeIndex, injectIndex, INDEX_END, INDEX_START } from './readme';
import { toSummary } from './summary';

// ── fixtures ────────────────────────────────────────────────────────────────
const prompt: PromptItem = {
  id: 'demo-prompt',
  title: 'Demo Prompt',
  description: 'Viết bài SEO chuẩn GEO.',
  category: 'seo',
  tier: 'prompt',
  persona: 'tvt-agency',
  tags: ['SEO', 'B2B'],
  author: 'TVT',
  variables: [
    { key: 'TOPIC', label: 'Chủ đề', defaultValue: 'AI Agent' },
    { key: 'AUDIENCE', label: 'Độc giả', defaultValue: 'CEO' },
  ],
  template: 'Viết về {{TOPIC}} cho {{AUDIENCE}}',
  createdAt: '2026-11-02',
};
const skill: SkillItem = {
  id: 'demo-skill',
  title: 'Demo Video Skill',
  description: 'Cắt video tự động.',
  category: 'video',
  tier: 'skill',
  persona: 'toilatung',
  tags: ['Video', 'B2B'],
  inputs: [{ name: 'footage', type: 'string', description: 'File video', required: true }],
  auditGates: ['Zero Word-Clipping Gate'],
  tools: ['read_file', 'web_search (SERP)', 'meta_marketing_api.create_campaign'],
  sopMarkdown: '# SOP\n\n## Bước 1 — Bóc transcript\nChạy Whisper ASR trên {{footage}}.\n\n## Bước 2 — Cắt khoảng lặng\nDùng ffmpeg để cắt.\n',
  createdAt: '2026-11-03',
};
const boost: BoostItem = {
  id: 'demo-boost',
  title: 'Demo Boost',
  description: 'Phản biện kiến trúc.',
  slashCommand: '/boost DEMO',
  tier: 'boost',
  persona: 'toilatung',
  reasoningType: 'red-team',
  tags: ['Red-Team'],
  template: '/boost DEMO\n{{PLAN}}',
  createdAt: '2026-11-01',
};
const BASE = 'https://hub.example.com';

// ── theme ───────────────────────────────────────────────────────────────────
test('theme: parse, resolve, cycle and flip preferences', () => {
  assert.equal(parsePreference('light'), 'light');
  assert.equal(parsePreference('neon'), 'dark');
  assert.equal(parsePreference(null), 'dark');
  assert.equal(resolveTheme('system', true), 'light');
  assert.equal(resolveTheme('system', false), 'dark');
  assert.equal(resolveTheme('light', false), 'light');
  assert.deepEqual(['dark', 'light', 'system'].map((p) => nextPreference(p as 'dark')), ['light', 'system', 'dark']);
  assert.equal(flipPreference('dark'), 'light');
  assert.equal(flipPreference('light'), 'dark');
});

function runBootScript(stored: string | null, prefersLight: boolean, storageThrows = false) {
  const attrs: Record<string, string> = {};
  const style: Record<string, string> = {};
  const context = {
    document: { documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v), style } },
    localStorage: {
      getItem: (k: string) => {
        if (storageThrows) throw new Error('blocked');
        return k === THEME_STORAGE_KEY ? stored : null;
      },
    },
    window: { matchMedia: (q: string) => ({ matches: q.includes('light') && prefersLight }) },
  };
  vm.runInNewContext(THEME_BOOT_SCRIPT, context);
  return { theme: attrs['data-theme'], pref: attrs['data-theme-pref'], scheme: style.colorScheme };
}

test('theme boot script (zero-FOUC) resolves stored and system preferences', () => {
  assert.deepEqual(runBootScript(null, true), { theme: 'dark', pref: 'dark', scheme: 'dark' });
  assert.deepEqual(runBootScript('light', false), { theme: 'light', pref: 'light', scheme: 'light' });
  assert.deepEqual(runBootScript('system', true), { theme: 'light', pref: 'system', scheme: 'light' });
  assert.deepEqual(runBootScript('system', false), { theme: 'dark', pref: 'system', scheme: 'dark' });
  assert.deepEqual(runBootScript('garbage', true), { theme: 'dark', pref: 'dark', scheme: 'dark' });
  assert.deepEqual(runBootScript(null, false, true), { theme: 'dark', pref: 'dark', scheme: 'dark' });
});

// ── favorites ───────────────────────────────────────────────────────────────
test('favorites: parsing is defensive and toggling is newest-first', () => {
  assert.deepEqual(parseFavorites(null), []);
  assert.deepEqual(parseFavorites('not json'), []);
  assert.deepEqual(parseFavorites('{"a":1}'), []);
  assert.deepEqual(parseFavorites('["a", 1, "b", "a", ""]'), ['a', 'b']);
  assert.deepEqual(toggleFavorite(['a'], 'b'), ['b', 'a']);
  assert.deepEqual(toggleFavorite(['b', 'a'], 'b'), ['a']);
});

test('favorites: storage round-trip survives a throwing storage', () => {
  const mem = new Map<string, string>();
  const storage = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v) };
  assert.equal(writeFavorites(storage, ['x', 'y']), true);
  assert.equal(mem.get(FAVORITES_KEY), '["x","y"]');
  assert.deepEqual(readFavorites(storage), ['x', 'y']);
  const broken = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('quota'); } };
  assert.deepEqual(readFavorites(broken), []);
  assert.equal(writeFavorites(broken, ['x']), false);
});

test('favorites: pinFavorites keeps order and moves favorites first', () => {
  const items = ['a', 'b', 'c', 'd'].map((id) => ({ id }));
  assert.deepEqual(pinFavorites(items, ['c', 'a']).map((i) => i.id), ['a', 'c', 'b', 'd']);
  assert.equal(pinFavorites(items, []), items);
});

// ── facets & filter ─────────────────────────────────────────────────────────
test('facets: stack detection from text and declared tools', () => {
  const stack = extractStack(skill);
  for (const expected of ['FFmpeg', 'Whisper ASR', 'Meta Marketing API', 'read_file', 'web_search']) {
    assert.ok(stack.includes(expected), `missing ${expected} in ${stack.join(', ')}`);
  }
  assert.deepEqual(countFacet([['a', 'b'], ['a'], ['a', 'a']]), [
    { value: 'a', count: 3 },
    { value: 'b', count: 1 },
  ]);
  assert.deepEqual(countFacet([['a', 'b'], ['a']], 2), [{ value: 'a', count: 2 }]);
});

const summaries: HubItemSummary[] = [prompt, skill, boost].map(toSummary);
const NO_FILTER: CatalogFilter = { tier: 'all', persona: 'all', category: 'all', stack: 'all', tags: [], favoritesOnly: false };

test('filter: tiers, tags (AND), stack, favorites and pinning', () => {
  let r = applyCatalogFilter(summaries, NO_FILTER, [], false);
  assert.deepEqual(r.counts, { all: 3, prompt: 2, skill: 1, boost: 1 }, 'Prompts include Deep Reasoning');

  r = applyCatalogFilter(summaries, { ...NO_FILTER, tier: 'prompt' }, [], false);
  assert.deepEqual(r.visible.map((i) => i.id), ['demo-prompt', 'demo-boost']);
  assert.equal(toSummary(boost).category, 'deep-reasoning');

  r = applyCatalogFilter(summaries, { ...NO_FILTER, tier: 'skill' }, [], false);
  assert.deepEqual(r.visible.map((i) => i.id), ['demo-skill']);
  assert.equal(r.counts.all, 3, 'tier counts ignore the tier filter');

  r = applyCatalogFilter(summaries, { ...NO_FILTER, tags: ['B2B'] }, [], false);
  assert.deepEqual(r.visible.map((i) => i.id), ['demo-prompt', 'demo-skill']);
  r = applyCatalogFilter(summaries, { ...NO_FILTER, tags: ['B2B', 'Video'] }, [], false);
  assert.deepEqual(r.visible.map((i) => i.id), ['demo-skill']);

  r = applyCatalogFilter(summaries, { ...NO_FILTER, stack: 'FFmpeg' }, [], false);
  assert.deepEqual(r.visible.map((i) => i.id), ['demo-skill']);

  r = applyCatalogFilter(summaries, NO_FILTER, ['demo-boost'], false);
  assert.equal(r.visible[0].id, 'demo-boost', 'favorites pinned to top');
  r = applyCatalogFilter(summaries, NO_FILTER, ['demo-boost'], true);
  assert.equal(r.visible[0].id, 'demo-prompt', 'search relevance wins over pinning');

  r = applyCatalogFilter(summaries, { ...NO_FILTER, favoritesOnly: true, tier: 'prompt' }, ['demo-boost'], false);
  assert.deepEqual(r.visible.map((i) => i.id), ['demo-boost'], 'favorites view spans all tiers');
});

test('summary: card model has counts and no heavy fields', () => {
  const s = toSummary(skill);
  assert.equal(s.variableCount, 1);
  assert.equal(s.gateCount, 1);
  assert.equal(toSummary(boost).slashCommand, '/boost DEMO');
  assert.ok(!('sopMarkdown' in s) && !('template' in toSummary(prompt)));
});

// ── sharing & direct links ──────────────────────────────────────────────────
test('direct link encodes only changed values and round-trips unicode', () => {
  const defaults = { TOPIC: 'AI Agent', AUDIENCE: 'CEO' };
  const link = buildDirectLink('demo-prompt', { TOPIC: 'Tối ưu chi phí & ROI', AUDIENCE: 'CEO' }, defaults, BASE);
  const url = new URL(link);
  assert.equal(url.origin + url.pathname, `${BASE}/items/demo-prompt`);
  assert.equal(url.searchParams.has('AUDIENCE'), false);
  assert.deepEqual(parseDirectLink(url.search, ['TOPIC', 'AUDIENCE']), { TOPIC: 'Tối ưu chi phí & ROI' });
  assert.deepEqual(parseDirectLink('?EVIL=1&TOPIC=x', ['TOPIC']), { TOPIC: 'x' }, 'unknown keys ignored');
  assert.equal(buildDirectLink('demo-prompt', defaults, defaults, BASE), `${BASE}/items/demo-prompt`);
});

test('share URLs are encoded and captions fit X limits', () => {
  const urls = buildShareUrls(`${BASE}/items/a?x=1&y=2`, 'Hook & caption');
  assert.ok(urls.x.includes(encodeURIComponent(`${BASE}/items/a?x=1&y=2`)));
  assert.ok(urls.x.includes('Hook%20%26%20caption'));
  assert.ok(urls.linkedin.startsWith('https://www.linkedin.com/sharing/share-offsite/?url='));
  assert.ok(urls.facebook.startsWith('https://www.facebook.com/sharer/sharer.php?u='));
  const long = shareCaption({ title: 'T'.repeat(150), description: 'D'.repeat(300), tier: 'skill' });
  assert.ok(long.length <= 220 && long.includes('Agent Skill') && long.endsWith('#AgentSkills'));
});

// ── SEO / GEO ───────────────────────────────────────────────────────────────
test('JSON-LD: item graph has TechArticle, HowTo, FAQPage and breadcrumbs', () => {
  const graph = itemJsonLd(skill, BASE)['@graph'] as Record<string, unknown>[];
  assert.deepEqual(graph.map((n) => n['@type']), ['TechArticle', 'HowTo', 'FAQPage', 'BreadcrumbList']);
  const article = graph[0];
  assert.equal(article.url, `${BASE}/items/demo-skill`);
  assert.equal(article.datePublished, '2026-11-03');
  const howto = graph[1] as { step: { name: string }[]; supply: unknown[]; tool: { name: string }[] };
  assert.deepEqual(howto.step.map((s) => s.name), ['Bước 1 — Bóc transcript', 'Bước 2 — Cắt khoảng lặng']);
  assert.equal(howto.supply.length, 1);
  assert.ok(howto.tool.some((t) => t.name === 'Claude Code') && howto.tool.some((t) => t.name === 'FFmpeg'));
  const faq = graph[2] as { mainEntity: unknown[] };
  assert.equal(faq.mainEntity.length, buildItemFaq(skill).length);
});

test('JSON-LD: prompts get the generic fill → preview → copy steps; home has SearchAction', () => {
  assert.equal(buildHowToSteps(prompt)[0].name, 'Điền biến đầu vào');
  assert.match(buildHowToSteps(boost)[3].text, /\/boost DEMO/);
  const home = homeJsonLd(BASE, { prompts: 1, skills: 1, boosts: 1, bots: 16, workflows: 5, total: 3 })['@graph'] as Record<string, unknown>[];
  const site = home.find((n) => n['@type'] === 'WebSite') as { potentialAction: { target: { urlTemplate: string } } };
  assert.equal(site.potentialAction.target.urlTemplate, `${BASE}/?q={search_term_string}`);
  assert.ok(home.some((n) => n['@type'] === 'SoftwareApplication'));
  assert.equal(home.filter((n) => n['@type'] === 'Organization').length, 2);
});

test('serializeJsonLd escapes "<" so content cannot break out of the script tag', () => {
  const out = serializeJsonLd({ text: '</script><script>alert(1)</script>' });
  assert.ok(!out.includes('<'));
  assert.deepEqual(JSON.parse(out), { text: '</script><script>alert(1)</script>' });
});

test('sitemap covers home, tier pages, story page and every item', () => {
  const entries = buildSitemapEntries([prompt, skill, boost], BASE, '2026-11-03');
  assert.equal(entries.length, 7 + 3, 'home, /prompts, /skills, /build-in-public, /guide, /docs/api, /docs/self-hosting + items (no /boosts since V3)');
  assert.ok(!entries.some((e) => e.url.endsWith('/boosts')));
  assert.equal(entries[0].url, `${BASE}/`);
  assert.equal(entries[0].lastModified, '2026-11-03');
  assert.ok(entries.some((e) => e.url === `${BASE}/items/demo-boost` && e.lastModified === '2026-11-01'));
  assert.equal(new Set(entries.map((e) => e.url)).size, entries.length, 'no duplicate URLs');
  assert.ok(entries.every((e) => e.priority > 0 && e.priority <= 1));
});

test('llms.txt lists every item with absolute links', () => {
  const txt = buildLlmsTxt([prompt, skill, boost], BASE);
  assert.match(txt, /^# TVT Intelligence Hub/);
  for (const id of ['demo-prompt', 'demo-skill', 'demo-boost']) assert.ok(txt.includes(`${BASE}/items/${id}`));
  assert.ok(txt.includes('`/boost DEMO`'));
});

// ── README index ────────────────────────────────────────────────────────────
test('README index is grouped, linked and injection is idempotent', () => {
  const index = buildReadmeIndex([prompt, skill, boost], { 'demo-skill': 'content/skills/demo-skill.md' }, BASE);
  assert.ok(index.startsWith(INDEX_START) && index.endsWith(INDEX_END));
  assert.ok(index.includes(`[Demo Video Skill](${BASE}/items/demo-skill)`));
  assert.ok(index.includes('[📄](content/skills/demo-skill.md)'));
  assert.ok(index.includes('<a id="skill-video"></a>'));
  const readme = `# Title\n\n${INDEX_START}\nold\n${INDEX_END}\n\nFooter`;
  const once = injectIndex(readme, index);
  assert.equal(injectIndex(once, index), once);
  assert.ok(once.includes('Footer') && !once.includes('\nold\n'));
});

test('answer-first summary has clean punctuation when there are many inputs', async () => {
  const { answerFirst } = await import('./seo');
  const many: PromptItem = {
    ...prompt,
    variables: ['A', 'B', 'C', 'D', 'E'].map((k) => ({ key: k, label: `Nhãn ${k}…` })),
    template: '{{A}}{{B}}{{C}}{{D}}{{E}}',
  };
  const text = answerFirst(many);
  assert.match(text, /Nhãn D và 1 biến khác\./);
  assert.ok(!/[.…]{2,}/.test(text), text);
});
