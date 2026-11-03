import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { DocsLayout } from '@/components/DocsLayout';
import { Localized } from '@/components/Localized';
import { MCP_TOOLS, MCP_SERVER_INFO } from '@/lib/mcp';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'API & MCP Server — kết nối Cursor, Claude, Windsurf',
  description:
    'TVT Intelligence Hub là một MCP server (Model Context Protocol): tìm kiếm và lấy Prompt, Skill, Bot, Workflow trực tiếp từ Cursor, Claude Desktop, Claude Code, Windsurf và Antigravity. Kèm REST API tĩnh.',
  alternates: localeAlternates('/docs/api'),
};

const ENDPOINT = `${SITE_URL.replace(/\/$/, '')}/api/mcp`;

const CONFIGS = {
  cursor: JSON.stringify({ mcpServers: { 'tvt-hub': { url: ENDPOINT } } }, null, 2),
  claudeDesktop: JSON.stringify({ mcpServers: { 'tvt-hub': { command: 'npx', args: ['-y', 'mcp-remote', ENDPOINT] } } }, null, 2),
  windsurf: JSON.stringify({ mcpServers: { 'tvt-hub': { serverUrl: ENDPOINT } } }, null, 2),
  claudeCode: `claude mcp add --transport http tvt-hub ${ENDPOINT}`,
  curlList: `curl -s ${ENDPOINT} \\\n  -H 'Content-Type: application/json' \\\n  -H 'Accept: application/json, text/event-stream' \\\n  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`,
  curlCall: `curl -s ${ENDPOINT} \\\n  -H 'Content-Type: application/json' \\\n  -H 'Accept: application/json, text/event-stream' \\\n  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"tvt_search","arguments":{"query":"meta ads","tier":"skill"}}}'`,
};

function ToolsTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Tool</th>
          <th>Arguments</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {MCP_TOOLS.map((tool) => (
          <tr key={tool.name}>
            <td>
              <code>{tool.name}</code>
            </td>
            <td>
              <code>
                {Object.keys(tool.inputSchema.properties).length
                  ? Object.keys(tool.inputSchema.properties)
                      .map((k) => ((tool.inputSchema as { required?: readonly string[] }).required?.includes(k) ? k : `${k}?`))
                      .join(', ')
                  : '—'}
              </code>
            </td>
            <td>{tool.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Configs({ lang }: { lang: 'vi' | 'en' }) {
  const vi = lang === 'vi';
  return (
    <>
      <h3>Cursor</h3>
      <p>{vi ? 'Tạo file .cursor/mcp.json trong dự án (hoặc ~/.cursor/mcp.json cho mọi dự án):' : 'Create .cursor/mcp.json in your project (or ~/.cursor/mcp.json for all projects):'}</p>
      <CodeBlock title=".cursor/mcp.json" code={CONFIGS.cursor} />
      <h3>Claude Desktop</h3>
      <p>
        {vi
          ? 'Cách nhanh nhất: Settings → Connectors → Add custom connector và dán URL endpoint. Nếu dùng file cấu hình, Claude Desktop chạy server qua cầu nối mcp-remote (cần Node.js):'
          : 'Quickest: Settings → Connectors → Add custom connector and paste the endpoint URL. With the config file, Claude Desktop runs the server through the mcp-remote bridge (requires Node.js):'}
      </p>
      <CodeBlock title="claude_desktop_config.json" code={CONFIGS.claudeDesktop} />
      <h3>Claude Code</h3>
      <CodeBlock title="Terminal" code={CONFIGS.claudeCode} />
      <h3>Windsurf & Antigravity IDE</h3>
      <p>
        {vi
          ? 'Mở phần quản lý MCP của IDE (Windsurf: ~/.codeium/windsurf/mcp_config.json; Antigravity: Manage MCP Servers → View raw config) và thêm server từ xa:'
          : 'Open the IDE’s MCP settings (Windsurf: ~/.codeium/windsurf/mcp_config.json; Antigravity: Manage MCP Servers → View raw config) and add the remote server:'}
      </p>
      <CodeBlock title="mcp_config.json" code={CONFIGS.windsurf} />
      <p>
        {vi
          ? 'Tên trường URL có thể khác giữa các phiên bản IDE (serverUrl hoặc url) — kiểm tra tài liệu MCP của IDE nếu server không xuất hiện.'
          : 'The URL field name can differ between IDE versions (serverUrl or url) — check the IDE’s MCP docs if the server does not show up.'}
      </p>
    </>
  );
}

function RestDocs({ lang }: { lang: 'vi' | 'en' }) {
  const vi = lang === 'vi';
  const rows: [string, string, string][] = [
    ['GET /data/items/{id}', vi ? 'Prompt / Skill / Deep Reasoning đầy đủ (JSON)' : 'Full prompt / skill / deep-reasoning item (JSON)', '/data/items/b2b-cold-email-sequence'],
    ['GET /data/bots/{id}', vi ? 'System prompt + ChatGPT Custom Instructions của bot' : 'Bot system prompt + ChatGPT Custom Instructions', '/data/bots/lexi'],
    ['GET /data/bots-index', vi ? 'Chỉ mục tìm kiếm 301 specialist' : 'Search index of the 301 specialists', '/data/bots-index'],
    ['GET /llms.txt', vi ? 'Mục lục Markdown cho AI crawler' : 'Markdown index for AI crawlers', '/llms.txt'],
    ['GET /sitemap.xml', vi ? 'Sitemap toàn bộ trang' : 'Sitemap of every page', '/sitemap.xml'],
  ];
  return (
    <table>
      <thead>
        <tr>
          <th>Endpoint</th>
          <th>{vi ? 'Nội dung' : 'Returns'}</th>
          <th>{vi ? 'Ví dụ' : 'Example'}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([endpoint, desc, example]) => (
          <tr key={endpoint}>
            <td>
              <code>{endpoint}</code>
            </td>
            <td>{desc}</td>
            <td>
              <a href={example}>{example}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ApiDocsPage() {
  return (
    <DocsLayout current="/docs/api">
      <Localized
        vi={
          <>
            <p className="font-mono text-xs text-cyan-300">MCP-first API · {MCP_SERVER_INFO.name} v{MCP_SERVER_INFO.version}</p>
            <h1>Kết nối Hub vào IDE và AI của bạn</h1>
            <p>
              TVT Intelligence Hub là một <strong>MCP server</strong> (Model Context Protocol) công khai, chỉ đọc. Kết nối một lần, sau đó AI trong
              Cursor, Claude, Windsurf hay Antigravity có thể tự tìm và lấy đúng Prompt, Skill, Bot hoặc Workflow khi bạn đang làm việc — không cần
              copy qua lại.
            </p>
            <ul>
              <li>
                Endpoint: <code>{ENDPOINT}</code>
              </li>
              <li>Giao thức: JSON-RPC 2.0 qua Streamable HTTP (POST), không trạng thái, không cần API key.</li>
              <li>Phạm vi: toàn bộ Prompts, Skills, Bots (16 lõi + 301 chuyên gia) và Workflows.</li>
            </ul>
            <h2 id="tools">Các tool</h2>
            <ToolsTable />
            <h2 id="connect">Cấu hình 1 chạm</h2>
            <Configs lang="vi" />
            <h2 id="test">Thử nhanh bằng curl</h2>
            <CodeBlock title="tools/list" code={CONFIGS.curlList} />
            <CodeBlock title="tools/call → tvt_search" code={CONFIGS.curlCall} />
            <h2 id="rest">REST API tĩnh</h2>
            <p>Mọi dữ liệu cũng có sẵn dưới dạng file JSON / văn bản tĩnh, cache được qua CDN:</p>
            <RestDocs lang="vi" />
            <p>
              Lưu ý: endpoint MCP cần server runtime (Vercel, <code>next start</code>, Docker). Bản export tĩnh (<code>npm run build:static</code>)
              vẫn có đầy đủ REST tĩnh nhưng không có <code>/api/mcp</code>.
            </p>
          </>
        }
        en={
          <>
            <p className="font-mono text-xs text-cyan-300">MCP-first API · {MCP_SERVER_INFO.name} v{MCP_SERVER_INFO.version}</p>
            <h1>Plug the Hub into your IDE and AI</h1>
            <p>
              TVT Intelligence Hub is a public, read-only <strong>MCP server</strong> (Model Context Protocol). Connect it once and the AI in Cursor,
              Claude, Windsurf or Antigravity can find and fetch the right Prompt, Skill, Bot or Workflow while you work — no copy-pasting.
            </p>
            <ul>
              <li>
                Endpoint: <code>{ENDPOINT}</code>
              </li>
              <li>Protocol: JSON-RPC 2.0 over Streamable HTTP (POST), stateless, no API key required.</li>
              <li>Scope: every Prompt, Skill, Bot (16 core + 301 specialists) and Workflow.</li>
            </ul>
            <h2 id="tools">Tools</h2>
            <ToolsTable />
            <h2 id="connect">One-click configuration</h2>
            <Configs lang="en" />
            <h2 id="test">Quick test with curl</h2>
            <CodeBlock title="tools/list" code={CONFIGS.curlList} />
            <CodeBlock title="tools/call → tvt_search" code={CONFIGS.curlCall} />
            <h2 id="rest">Static REST API</h2>
            <p>All data is also available as static JSON / text files, cacheable on any CDN:</p>
            <RestDocs lang="en" />
            <p>
              Note: the MCP endpoint needs a server runtime (Vercel, <code>next start</code>, Docker). The static export (
              <code>npm run build:static</code>) keeps the static REST files but has no <code>/api/mcp</code>.
            </p>
          </>
        }
      />
    </DocsLayout>
  );
}
