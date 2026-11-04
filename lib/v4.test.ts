import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import vi from '../locales/vi.json';
import en from '../locales/en.json';
import { flattenKeys, LOCALE_BOOT_SCRIPT, resolveLocale, translate } from './i18n';
import { customInstructionsText, parsePersonaMarkdown, personaSlug, personaToBot, SLUG_MAX, SPECIALTIES, uniqueSlug } from './personas';
import { BOT_ID_PATTERN, validateBot, validatePrompt } from './schema';
import { loadContent } from './loader';
import { handleMcpPayload, LATEST_PROTOCOL_VERSION, MCP_TOOLS, RPC_ERRORS, type JsonRpcResponse, type McpCatalog } from './mcp';

// ── i18n ────────────────────────────────────────────────────────────────────
test('i18n: vi.json and en.json have 100% key parity and matching placeholders', () => {
  const viKeys = flattenKeys(vi).sort();
  const enKeys = flattenKeys(en).sort();
  assert.deepEqual(enKeys, viKeys);
  assert.ok(viKeys.length > 150, `dictionary looks too small (${viKeys.length})`);
  const get = (dict: unknown, key: string) => key.split('.').reduce<unknown>((n, k) => (n as Record<string, unknown>)[k], dict) as string;
  const vars = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
  for (const key of viKeys) {
    assert.ok(get(vi, key).trim() && get(en, key).trim(), `empty string at ${key}`);
    assert.equal(vars(get(en, key)), vars(get(vi, key)), `placeholder mismatch at ${key}`);
  }
});

test('i18n: translate interpolates and falls back', () => {
  assert.equal(translate('en', 'filter.results', { count: 3 }), '3 results');
  assert.equal(translate('vi', 'filter.results', { count: 3 }), '3 kết quả');
  assert.equal(translate('en', 'does.not.exist' as never), 'does.not.exist');
});

test('i18n: locale resolution priority (query → saved → browser) and bots stay on the default', () => {
  assert.equal(resolveLocale({ query: 'en', stored: 'vi' }), 'en');
  assert.equal(resolveLocale({ stored: 'en', cookie: 'vi' }), 'en');
  assert.equal(resolveLocale({ cookie: 'en' }), 'en');
  assert.equal(resolveLocale({ languages: ['vi-VN', 'en'] }), 'vi');
  assert.equal(resolveLocale({ languages: ['en-US'] }), 'en');
  assert.equal(resolveLocale({ languages: ['en-US'], userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1)' }), 'vi');
  assert.equal(resolveLocale({}), 'vi');
});

function runLocaleBoot(opts: { search?: string; stored?: string | null; cookie?: string; languages?: string[]; ua?: string }) {
  const attrs: Record<string, string> = {};
  const root = { lang: '', setAttribute: (k: string, v: string) => (attrs[k] = v), removeAttribute: (k: string) => delete attrs[k] };
  vm.runInNewContext(LOCALE_BOOT_SCRIPT, {
    document: { documentElement: root, cookie: opts.cookie ?? '' },
    location: { search: opts.search ?? '' },
    URLSearchParams,
    localStorage: { getItem: () => opts.stored ?? null },
    navigator: { userAgent: opts.ua ?? 'Mozilla/5.0', languages: opts.languages ?? ['vi-VN'], language: (opts.languages ?? ['vi-VN'])[0] },
    setTimeout: () => 0,
  });
  return { lang: root.lang, pending: 'data-i18n-pending' in attrs, locale: attrs['data-locale'] };
}

test('i18n boot script (zero-FOUC): sets <html lang>, hides only non-default locales until hydration', () => {
  assert.deepEqual(runLocaleBoot({}), { lang: 'vi', pending: false, locale: 'vi' });
  assert.deepEqual(runLocaleBoot({ search: '?lang=en' }), { lang: 'en', pending: true, locale: 'en' });
  assert.deepEqual(runLocaleBoot({ languages: ['en-GB'] }), { lang: 'en', pending: true, locale: 'en' });
  assert.deepEqual(runLocaleBoot({ languages: ['en-GB'], stored: 'vi' }), { lang: 'vi', pending: false, locale: 'vi' });
  assert.deepEqual(runLocaleBoot({ cookie: 'NEXT_LOCALE=en' }), { lang: 'en', pending: true, locale: 'en' });
  assert.deepEqual(runLocaleBoot({ languages: ['en-US'], ua: 'Googlebot/2.1' }), { lang: 'vi', pending: false, locale: 'vi' });
});

// ── specialist personas ─────────────────────────────────────────────────────
test('personas: slug rules (≤ 31 chars, no parentheses, risk-mgmt, unique)', () => {
  assert.equal(personaSlug('Risk Management Specialist'), 'risk-mgmt-specialist');
  assert.equal(personaSlug('IoT Specialist (Internet of Things)'), 'iot-specialist');
  assert.equal(personaSlug('Natural Language Processing Developer'), 'nlp-developer');
  assert.equal(personaSlug('Mergers and Acquisitions Consultant'), 'mergers-acquisitions-consultant');
  const long = personaSlug('Corporate Social Responsibility Specialist');
  assert.ok(long.length <= SLUG_MAX && BOT_ID_PATTERN.test(long), long);
  const taken = new Set(['lexi']);
  assert.equal(uniqueSlug('lexi', taken), 'lexi-2');
  assert.equal(uniqueSlug('lexi', taken), 'lexi-3');
});

test('personas: markdown parsing → valid specialist bot with ChatGPT custom instructions', () => {
  const file = path.join(process.cwd(), 'data/personas-source/categories/business/personas/Risk Management Specialist.md');
  const parsed = parsePersonaMarkdown(fs.readFileSync(file, 'utf8'));
  assert.equal(parsed.name, 'Risk Management Specialist');
  assert.ok(parsed.know.some((b) => /responsibilit/i.test(b.label)));
  assert.ok(parsed.respond.length >= 5);
  const bot = personaToBot(parsed, 'business', 'risk-mgmt-specialist');
  assert.deepEqual(validateBot(bot as unknown as Record<string, unknown>, 'x').issues, []);
  assert.equal(bot.department, 'command');
  assert.equal(bot.avatar, '💼');
  assert.ok(bot.systemPrompt.length >= 400 && bot.systemPrompt.includes('no AI clichés'));
  assert.ok(bot.description.length <= 200);
  const ci = customInstructionsText(bot);
  assert.match(ci, /What would you like ChatGPT to know/);
  assert.match(ci, /How would you like ChatGPT to respond/);
  assert.throws(() => parsePersonaMarkdown('# Only a title'));
});

test('secret scanner: no false positive on "risk-management…" slugs, still catches real keys', () => {
  const base = {
    id: 'demo-prompt', title: 'Demo', description: 'x', category: 'seo', tier: 'prompt', persona: 'general', tags: ['t'],
    author: 'A', variables: [], template: 'Hello', createdAt: '2026-11-03',
  };
  assert.deepEqual(validatePrompt({ ...base, description: 'see risk-management-specialist-for-enterprise-teams' }, 'x').issues, []);
  assert.ok(validatePrompt({ ...base, description: 'key: sk-proj-abcdefghijklmnopqrstuvwxyz123' }, 'x').issues.some((i) => i.includes('secret')));
});

const content = loadContent();

test('content: 317 bots — 16 core + 301 specialists, unique valid ids, 10 specialties', () => {
  assert.deepEqual(content.issues, []);
  assert.ok(content.bots.length >= 317);
  const ids = content.bots.map((b) => b.id);
  assert.equal(new Set(ids).size, ids.length, 'bot ids are unique');
  assert.ok(ids.every((id) => BOT_ID_PATTERN.test(id)));
  const specialists = content.bots.filter((b) => b.tier === 'specialist');
  assert.equal(specialists.length, 301);
  const counts = Object.fromEntries(SPECIALTIES.map((s) => [s, specialists.filter((b) => b.specialty === s).length]));
  assert.equal(counts.marketing, 31);
  for (const s of SPECIALTIES.filter((x) => x !== 'marketing')) assert.equal(counts[s], 30, s);
  assert.ok(ids.includes('risk-mgmt-specialist'));
  assert.ok(specialists.every((b) => b.recommendedModels.join() === 'Claude Sonnet 5.5,Claude Opus 5.5'));
});

// ── MCP ─────────────────────────────────────────────────────────────────────
const catalog: McpCatalog = {
  items: [...content.prompts, ...content.skills, ...content.boosts],
  bots: content.bots,
  workflows: content.workflows,
  baseUrl: 'https://hub.example.com',
};
const rpc = (body: unknown) => handleMcpPayload(JSON.stringify(body), catalog) as JsonRpcResponse;
const call = (name: string, args: Record<string, unknown> = {}) =>
  rpc({ jsonrpc: '2.0', id: 9, method: 'tools/call', params: { name, arguments: args } }).result as {
    content: { type: string; text: string }[];
    isError?: boolean;
    structuredContent?: Record<string, unknown>;
  };

test('MCP: initialize negotiates the protocol and advertises tools', () => {
  const res = rpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 't', version: '1' } } });
  assert.equal(res.jsonrpc, '2.0');
  assert.equal(res.id, 1);
  const result = res.result as { protocolVersion: string; capabilities: { tools: object }; serverInfo: { name: string } };
  assert.equal(result.protocolVersion, '2025-06-18');
  assert.ok(result.capabilities.tools);
  assert.equal(result.serverInfo.name, 'lexihub');
  const unknown = rpc({ jsonrpc: '2.0', id: 2, method: 'initialize', params: { protocolVersion: '1999-01-01' } }).result as { protocolVersion: string };
  assert.equal(unknown.protocolVersion, LATEST_PROTOCOL_VERSION);
});

test('MCP: tools/list exposes the 5 tools with JSON schemas', () => {
  const tools = (rpc({ jsonrpc: '2.0', id: 3, method: 'tools/list' }).result as { tools: { name: string; inputSchema: { type: string } }[] }).tools;
  assert.deepEqual(tools.map((t) => t.name), ['tvt_search', 'tvt_get_prompt', 'tvt_get_skill', 'tvt_get_bot', 'tvt_list_workflows']);
  assert.ok(tools.every((t) => t.inputSchema.type === 'object'));
  assert.equal(MCP_TOOLS.length, 5);
});

test('MCP: tools/call returns MCP content for every tool', () => {
  const search = call('tvt_search', { query: 'risk analyst', tier: 'bot', limit: 3 });
  assert.equal(search.content[0].type, 'text');
  assert.ok(search.content[0].text.includes('id: `'));
  assert.ok((search.structuredContent?.results as { kind: string }[]).every((r) => r.kind === 'bot'));

  const prompt = call('tvt_get_prompt', { id: 'b2b-cold-email-sequence' });
  assert.ok(!prompt.isError && prompt.content[0].text.includes('{{PROSPECT_ROLE}}'));
  const deep = call('tvt_get_prompt', { id: 'system1-system2-classifier' });
  assert.ok(deep.content[0].text.includes('Deep Reasoning'));

  const skill = call('tvt_get_skill', { id: 'seven-point-content-audit' });
  assert.ok(skill.content[0].text.startsWith('---\nname: seven-point-content-audit'));
  assert.ok(skill.content[0].text.includes('Audit gates:'));

  const bot = call('tvt_get_bot', { id: 'risk-mgmt-specialist' });
  assert.ok(bot.content[0].text.includes('## System prompt') && bot.content[0].text.includes('## Custom Instructions (ChatGPT)'));

  const list = call('tvt_list_workflows');
  assert.ok(list.content[0].text.startsWith(`${content.workflows.length} workflow(s)`));
  const detail = call('tvt_list_workflows', { id: 'b2b-campaign-launcher' });
  assert.ok(detail.content[0].text.includes('## Step 5'));
});

test('MCP: tool-level errors use isError; protocol errors use JSON-RPC codes', () => {
  assert.equal(call('tvt_get_bot', { id: 'nope' }).isError, true);
  assert.equal(call('tvt_get_prompt', { id: 'seven-point-content-audit' }).isError, true, 'skill passed to get_prompt');
  assert.equal(call('tvt_search', {}).isError, true);
  assert.equal(rpc({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'rm_rf' } }).error?.code, RPC_ERRORS.invalidParams);
  assert.equal(rpc({ jsonrpc: '2.0', id: 5, method: 'resources/delete' }).error?.code, RPC_ERRORS.methodNotFound);
  assert.equal(rpc({ id: 6, method: 'ping' }).error?.code, RPC_ERRORS.invalidRequest);
  assert.equal((handleMcpPayload('{not json', catalog) as JsonRpcResponse).error?.code, RPC_ERRORS.parse);
  assert.deepEqual(rpc({ jsonrpc: '2.0', id: 'p', method: 'ping' }), { jsonrpc: '2.0', id: 'p', result: {} });
});

test('MCP: notifications get no response; batches answer only requests', () => {
  assert.equal(handleMcpPayload(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }), catalog), null);
  const batch = handleMcpPayload(
    JSON.stringify([
      { jsonrpc: '2.0', method: 'notifications/initialized' },
      { jsonrpc: '2.0', id: 1, method: 'ping' },
      { jsonrpc: '2.0', id: 2, method: 'tools/list' },
    ]),
    catalog,
  ) as JsonRpcResponse[];
  assert.deepEqual(batch.map((r) => r.id), [1, 2]);
  assert.equal((handleMcpPayload('[]', catalog) as JsonRpcResponse).error?.code, RPC_ERRORS.invalidRequest);
});
