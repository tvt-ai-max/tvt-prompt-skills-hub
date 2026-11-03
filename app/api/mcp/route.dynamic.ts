import { getAllBots, getAllItems, getAllWorkflows } from '@/lib/content';
import { handleMcpPayload, MCP_SERVER_INFO, type McpCatalog } from '@/lib/mcp';

/**
 * MCP server endpoint (Model Context Protocol, Streamable HTTP, stateless, read-only).
 * File suffix `.dynamic.ts` → only built when a server runtime exists (see next.config.ts);
 * the fully static export (`npm run build:static`) skips it.
 */
export const dynamic = 'force-dynamic';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id',
};

let catalog: McpCatalog | undefined;
function getCatalog(): McpCatalog {
  catalog ??= { items: getAllItems(), bots: getAllBots(), workflows: getAllWorkflows() };
  return catalog;
}

const MAX_BODY = 256 * 1024;

export async function POST(request: Request) {
  const body = await request.text();
  if (body.length > MAX_BODY) {
    return Response.json({ jsonrpc: '2.0', id: null, error: { code: -32600, message: 'Request too large' } }, { status: 413, headers: CORS });
  }
  const result = handleMcpPayload(body, getCatalog());
  if (result === null) return new Response(null, { status: 202, headers: CORS });
  return Response.json(result, { headers: { ...CORS, 'Cache-Control': 'no-store' } });
}

/** No server-initiated SSE stream: per the Streamable HTTP transport, answer GET with 405. */
export function GET() {
  return Response.json(
    { name: MCP_SERVER_INFO.name, version: MCP_SERVER_INFO.version, transport: 'streamable-http', usage: 'POST JSON-RPC 2.0 messages to this URL.' },
    { status: 405, headers: { ...CORS, Allow: 'POST, OPTIONS' } },
  );
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
