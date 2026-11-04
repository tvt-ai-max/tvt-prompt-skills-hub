import Fuse from 'fuse.js';
import type { BotItem, HubItem, WorkflowItem } from '@/types/hub';
import { buildWorkbenchModel } from '@/lib/variables';
import { toSkillMarkdown } from '@/lib/exporters';
import { customInstructionsText } from '@/lib/personas';
import { itemCategory } from '@/lib/summary';
import { SITE_URL } from '@/lib/site';

/**
 * Model Context Protocol server core (JSON-RPC 2.0 over Streamable HTTP, stateless).
 * Pure: the route handler passes the catalog in, tests pass fixtures.
 */

export const MCP_SERVER_INFO = { name: 'lexihub', title: 'LexiHub', version: '4.0.0' } as const;
export const SUPPORTED_PROTOCOL_VERSIONS = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05'] as const;
export const LATEST_PROTOCOL_VERSION = SUPPORTED_PROTOCOL_VERSIONS[0];

export interface McpCatalog {
  items: HubItem[];
  bots: BotItem[];
  workflows: WorkflowItem[];
  baseUrl?: string;
}

export const MCP_TOOLS = [
  {
    name: 'tvt_search',
    title: 'Search LexiHub',
    description:
      'Fuzzy search across every prompt (incl. Deep Reasoning), agent skill, bot persona and workflow. Returns ids to pass to the tvt_get_* tools.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keywords, e.g. "seo audit", "meta ads", "risk analyst".' },
        tier: { type: 'string', enum: ['all', 'prompt', 'skill', 'bot', 'workflow'], description: 'Restrict to one section (default: all).' },
        limit: { type: 'integer', minimum: 1, maximum: 50, description: 'Maximum results (default 10).' },
      },
      required: ['query'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: 'tvt_get_prompt',
    title: 'Get a prompt',
    description: 'Returns a prompt template (with {{VARIABLES}}) and its variable definitions. Works for Deep Reasoning prompts too.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string', description: 'Prompt id from tvt_search.' } },
      required: ['id'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: 'tvt_get_skill',
    title: 'Get an agent skill (SKILL.md)',
    description: 'Returns the full SKILL.md (frontmatter, inputs, tools, step-by-step SOP) and its audit gates.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string', description: 'Skill id from tvt_search.' } },
      required: ['id'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: 'tvt_get_bot',
    title: 'Get a bot persona',
    description: 'Returns a bot persona: system prompt (Claude / Cursor) and ChatGPT Custom Instructions.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string', description: 'Bot id from tvt_search, e.g. "lexi" or "risk-mgmt-specialist".' } },
      required: ['id'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: 'tvt_list_workflows',
    title: 'List workflows',
    description:
      'Lists every multi-step workflow with its steps (agent, model, output format). Pass an id to get one workflow with its full prompt templates and data piping.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string', description: 'Optional workflow id or slug for full detail.' } },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
] as const;

type JsonRpcId = string | number | null;
interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: JsonRpcId;
  method: string;
  params?: Record<string, unknown>;
}
export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: JsonRpcId;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

export const RPC_ERRORS = { parse: -32700, invalidRequest: -32600, methodNotFound: -32601, invalidParams: -32602, internal: -32603 } as const;

interface ToolResult {
  content: { type: 'text'; text: string }[];
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
}

const text = (body: string, structuredContent?: Record<string, unknown>): ToolResult => ({
  content: [{ type: 'text', text: body }],
  ...(structuredContent ? { structuredContent } : {}),
});
const toolError = (message: string): ToolResult => ({ content: [{ type: 'text', text: message }], isError: true });

type Kind = 'prompt' | 'skill' | 'bot' | 'workflow';
interface SearchDoc {
  kind: Kind;
  id: string;
  title: string;
  description: string;
  tags: string[];
  extra: string;
  url: string;
}

const indexCache = new WeakMap<McpCatalog, { docs: SearchDoc[]; fuse: Fuse<SearchDoc> }>();

function searchIndex(catalog: McpCatalog) {
  const cached = indexCache.get(catalog);
  if (cached) return cached;
  const base = (catalog.baseUrl ?? SITE_URL).replace(/\/$/, '');
  const docs: SearchDoc[] = [
    ...catalog.items.map((item) => ({
      kind: (item.tier === 'skill' ? 'skill' : 'prompt') as Kind,
      id: item.id,
      title: item.title,
      description: item.description,
      tags: item.tags,
      extra: `${itemCategory(item)} ${item.tier === 'boost' ? `${item.slashCommand} deep reasoning` : ''}`,
      url: `${base}/items/${item.id}`,
    })),
    ...catalog.bots.map((bot) => ({
      kind: 'bot' as Kind,
      id: bot.id,
      title: bot.role === bot.name ? bot.name : `${bot.name} — ${bot.role}`,
      description: bot.description,
      tags: bot.tags,
      extra: `${bot.department} ${bot.specialty ?? ''} ${bot.tier ?? 'core'}`,
      url: `${base}/bots/${bot.id}`,
    })),
    ...catalog.workflows.map((wf) => ({
      kind: 'workflow' as Kind,
      id: wf.id,
      title: wf.title,
      description: wf.summary,
      tags: wf.tags,
      extra: wf.steps.map((s) => `${s.title} ${s.agentRole}`).join(' '),
      url: `${base}/workflows/${wf.slug}`,
    })),
  ];
  const fuse = new Fuse(docs, {
    ignoreLocation: true,
    threshold: 0.4,
    keys: [
      { name: 'title', weight: 0.45 },
      { name: 'tags', weight: 0.2 },
      { name: 'description', weight: 0.2 },
      { name: 'extra', weight: 0.1 },
      { name: 'id', weight: 0.05 },
    ],
  });
  const value = { docs, fuse };
  indexCache.set(catalog, value);
  return value;
}

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function callTool(name: string, args: Record<string, unknown>, catalog: McpCatalog): ToolResult | null {
  const base = (catalog.baseUrl ?? SITE_URL).replace(/\/$/, '');
  switch (name) {
    case 'tvt_search': {
      const query = str(args.query);
      if (!query) return toolError('Missing required argument "query".');
      const tier = str(args.tier) ?? 'all';
      if (!['all', 'prompt', 'skill', 'bot', 'workflow'].includes(tier)) return toolError('"tier" must be one of all, prompt, skill, bot, workflow.');
      const limit = Math.min(50, Math.max(1, Number.isInteger(args.limit) ? (args.limit as number) : 10));
      const { fuse } = searchIndex(catalog);
      const results = fuse
        .search(query)
        .map((r) => r.item)
        .filter((d) => tier === 'all' || d.kind === tier)
        .slice(0, limit);
      if (!results.length) return text(`No results for "${query}".`, { results: [] });
      const body = results.map((d, i) => `${i + 1}. [${d.kind}] ${d.title} — id: \`${d.id}\`\n   ${d.description}\n   ${d.url}`).join('\n');
      return text(`Found ${results.length} result(s) for "${query}":\n\n${body}`, {
        results: results.map(({ kind, id, title, description, url }) => ({ kind, id, title, description, url })),
      });
    }
    case 'tvt_get_prompt': {
      const id = str(args.id);
      if (!id) return toolError('Missing required argument "id".');
      const item = catalog.items.find((i) => i.id === id);
      if (!item) return toolError(`No prompt with id "${id}". Use tvt_search to find ids.`);
      if (item.tier === 'skill') return toolError(`"${id}" is a skill — use tvt_get_skill instead.`);
      const { variables, template } = buildWorkbenchModel(item);
      const vars = variables.length
        ? variables.map((v) => `- {{${v.key}}} — ${v.label}${v.defaultValue ? ` (example: ${v.defaultValue})` : ''}`).join('\n')
        : '- (none)';
      const header = item.tier === 'boost' ? `Deep Reasoning · ${item.slashCommand} · ${item.reasoningType}` : `Prompt · ${itemCategory(item)}`;
      return text(
        `# ${item.title}\n${header}\n\n${item.description}\n\n## Variables\n${vars}\n\n## Template\n${template}\n\nInteractive version: ${base}/items/${item.id}`,
        { id: item.id, title: item.title, template, variables: variables.map(({ key, label, defaultValue }) => ({ key, label, defaultValue })) },
      );
    }
    case 'tvt_get_skill': {
      const id = str(args.id);
      if (!id) return toolError('Missing required argument "id".');
      const item = catalog.items.find((i) => i.id === id);
      if (!item) return toolError(`No skill with id "${id}". Use tvt_search with tier "skill" to find ids.`);
      if (item.tier !== 'skill') return toolError(`"${id}" is a prompt — use tvt_get_prompt instead.`);
      const skillMd = toSkillMarkdown(item, buildWorkbenchModel(item).template);
      return text(`${skillMd}\n---\nAudit gates: ${item.auditGates.join(' · ')}\nInteractive version: ${base}/items/${item.id}`, {
        id: item.id,
        auditGates: item.auditGates,
      });
    }
    case 'tvt_get_bot': {
      const id = str(args.id);
      if (!id) return toolError('Missing required argument "id".');
      const bot = catalog.bots.find((b) => b.id === id);
      if (!bot) return toolError(`No bot with id "${id}". Use tvt_search with tier "bot" to find ids.`);
      const custom = customInstructionsText(bot);
      return text(
        `# ${bot.name}${bot.role !== bot.name ? ` — ${bot.role}` : ''}\n${bot.description}\n\n## System prompt (Claude / Cursor)\n\n${bot.systemPrompt}\n\n## Custom Instructions (ChatGPT)\n\n${custom}\n\nPage: ${base}/bots/${bot.id}`,
        { id: bot.id, name: bot.name, systemPrompt: bot.systemPrompt, customInstructions: custom },
      );
    }
    case 'tvt_list_workflows': {
      const id = str(args.id);
      if (id) {
        const wf = catalog.workflows.find((w) => w.id === id || w.slug === id);
        if (!wf) return toolError(`No workflow "${id}".`);
        const steps = wf.steps
          .map((s) => {
            const inputs = s.inputs.map((i) => (i.source === 'previous_step' ? `{{${i.key}}} ← ${i.fromStepId}` : `{{${i.key}}} (user)`)).join(', ');
            return `## Step ${s.stepNumber}: ${s.title}\nAgent: ${s.agentRole} · Model: ${s.targetModel} · Output: ${s.outputFormat}\nInputs: ${inputs}\nQuality gate: ${s.qualityGate}\n\n${s.promptTemplate}`;
          })
          .join('\n\n');
        return text(`# ${wf.title}\n${wf.summary}\n\n${steps}\n\nStudio: ${base}/workflows/${wf.slug}`, { id: wf.id, slug: wf.slug, steps: wf.steps.length });
      }
      const body = catalog.workflows
        .map((wf) => {
          const steps = wf.steps.map((s) => `   ${s.stepNumber}. ${s.title} — ${s.agentRole} (${s.targetModel}, ${s.outputFormat})`).join('\n');
          return `- ${wf.title} — id: \`${wf.id}\` · ${wf.difficulty} · ${wf.estimatedTime}\n${steps}\n   ${base}/workflows/${wf.slug}`;
        })
        .join('\n');
      return text(`${catalog.workflows.length} workflow(s):\n\n${body}`, {
        workflows: catalog.workflows.map((wf) => ({ id: wf.id, slug: wf.slug, title: wf.title, steps: wf.steps.length })),
      });
    }
    default:
      return null;
  }
}

function isRequest(value: unknown): value is JsonRpcRequest {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  const idOk = v.id === undefined || v.id === null || typeof v.id === 'string' || typeof v.id === 'number';
  const paramsOk = v.params === undefined || (typeof v.params === 'object' && v.params !== null);
  return v.jsonrpc === '2.0' && typeof v.method === 'string' && idOk && paramsOk;
}

const fail = (id: JsonRpcId, code: number, message: string, data?: unknown): JsonRpcResponse => ({
  jsonrpc: '2.0',
  id,
  error: { code, message, ...(data !== undefined ? { data } : {}) },
});

function handleOne(message: unknown, catalog: McpCatalog): JsonRpcResponse | null {
  if (!isRequest(message)) {
    const id = message && typeof message === 'object' && 'id' in message ? ((message as { id: JsonRpcId }).id ?? null) : null;
    return fail(id, RPC_ERRORS.invalidRequest, 'Invalid Request');
  }
  const isNotification = message.id === undefined;
  const id = message.id ?? null;
  const params = message.params ?? {};

  let response: JsonRpcResponse;
  switch (message.method) {
    case 'initialize': {
      const requested = str(params.protocolVersion);
      const protocolVersion =
        requested && (SUPPORTED_PROTOCOL_VERSIONS as readonly string[]).includes(requested) ? requested : LATEST_PROTOCOL_VERSION;
      response = {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion,
          capabilities: { tools: { listChanged: false } },
          serverInfo: MCP_SERVER_INFO,
          instructions:
            'Read-only access to LexiHub. Start with tvt_search, then fetch details with tvt_get_prompt, tvt_get_skill, tvt_get_bot or tvt_list_workflows.',
        },
      };
      break;
    }
    case 'ping':
      response = { jsonrpc: '2.0', id, result: {} };
      break;
    case 'tools/list':
      response = { jsonrpc: '2.0', id, result: { tools: MCP_TOOLS } };
      break;
    case 'tools/call': {
      const name = str(params.name);
      const args = params.arguments && typeof params.arguments === 'object' ? (params.arguments as Record<string, unknown>) : {};
      if (!name) {
        response = fail(id, RPC_ERRORS.invalidParams, 'Missing tool name');
        break;
      }
      const result = callTool(name, args, catalog);
      response = result ? { jsonrpc: '2.0', id, result } : fail(id, RPC_ERRORS.invalidParams, `Unknown tool: ${name}`);
      break;
    }
    default:
      if (message.method.startsWith('notifications/')) return null;
      response = fail(id, RPC_ERRORS.methodNotFound, `Method not found: ${message.method}`);
  }
  return isNotification ? null : response;
}

/**
 * Handles one HTTP request body (single message or batch). Returns the JSON-RPC payload, or null
 * when only notifications were sent (the route answers 202 Accepted with no body).
 */
export function handleMcpPayload(body: string, catalog: McpCatalog): JsonRpcResponse | JsonRpcResponse[] | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return fail(null, RPC_ERRORS.parse, 'Parse error');
  }
  if (Array.isArray(parsed)) {
    if (parsed.length === 0) return fail(null, RPC_ERRORS.invalidRequest, 'Invalid Request');
    const responses = parsed.map((m) => handleOne(m, catalog)).filter((r): r is JsonRpcResponse => r !== null);
    return responses.length ? responses : null;
  }
  return handleOne(parsed, catalog);
}
