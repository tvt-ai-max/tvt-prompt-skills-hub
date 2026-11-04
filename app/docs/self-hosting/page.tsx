import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { DocsLayout } from '@/components/DocsLayout';
import { Localized } from '@/components/Localized';
import { localeAlternates } from '@/lib/seo';
import { REPO_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Self-hosting — Docker, Vercel, Cloudflare, VPS HestiaCP',
  description: 'Tự triển khai LexiHub: Docker 1 lệnh, Vercel, Cloudflare Pages, hoặc VPS HestiaCP (static export hoặc Node.js).',
  alternates: localeAlternates('/docs/self-hosting'),
};

const SNIPPETS = {
  docker: `git clone ${REPO_URL}.git\ncd tvt-prompt-skills-hub\ndocker build --build-arg NEXT_PUBLIC_SITE_URL=https://lexihub.tech -t lexihub .\ndocker run -p 3000:3000 lexihub`,
  vercel: `npm i -g vercel\nvercel --prod   # set NEXT_PUBLIC_SITE_URL=https://lexihub.tech in the project settings`,
  cloudflare: `NEXT_PUBLIC_SITE_URL=https://lexihub.tech npm run build:static\nnpx wrangler pages deploy out --project-name lexihub`,
  hestiaStatic: `NEXT_PUBLIC_SITE_URL=https://lexihub.tech npm run build:static\nrsync -avz --delete out/ user@vps:/home/user/web/lexihub.tech/public_html/`,
  hestiaNode: `npm ci && NEXT_PUBLIC_SITE_URL=https://lexihub.tech npm run build\nnpx pm2 start "npm start -- -p 3000" --name lexihub\n# HestiaCP: Web → Edit domain → Proxy template "nodejs" (or an nginx proxy_pass to 127.0.0.1:3000)`,
};

function Body({ vi }: { vi: boolean }) {
  return (
    <>
      <p className="font-mono text-xs text-cyan-300">Self-hosting</p>
      <h1>{vi ? 'Tự triển khai Hub trong vài phút' : 'Self-host the Hub in minutes'}</h1>
      <p>
        {vi
          ? 'Mọi trang đều được prerender. Chọn chế độ có server (Docker, Vercel, Node.js) nếu bạn cần endpoint MCP /api/mcp; chọn static export cho hosting tĩnh rẻ nhất.'
          : 'Every page is prerendered. Choose a server mode (Docker, Vercel, Node.js) if you need the /api/mcp MCP endpoint; choose the static export for the cheapest static hosting.'}
      </p>
      <table>
        <thead>
          <tr>
            <th>{vi ? 'Cách' : 'Option'}</th>
            <th>MCP /api/mcp</th>
            <th>{vi ? 'Phù hợp' : 'Best for'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Docker</td>
            <td>✅</td>
            <td>{vi ? 'VPS bất kỳ, nội bộ doanh nghiệp' : 'Any VPS, internal deployments'}</td>
          </tr>
          <tr>
            <td>Vercel</td>
            <td>✅</td>
            <td>{vi ? 'Nhanh nhất, preview theo PR' : 'Fastest, per-PR previews'}</td>
          </tr>
          <tr>
            <td>Cloudflare Pages ({vi ? 'tĩnh' : 'static'})</td>
            <td>—</td>
            <td>{vi ? 'CDN toàn cầu, miễn phí' : 'Global CDN, free tier'}</td>
          </tr>
          <tr>
            <td>VPS HestiaCP</td>
            <td>{vi ? '✅ với Node.js · — với static' : '✅ with Node.js · — static'}</td>
            <td>{vi ? 'Hạ tầng agency sẵn có' : 'Existing agency infrastructure'}</td>
          </tr>
        </tbody>
      </table>

      <h2 id="docker">Docker</h2>
      <p>{vi ? 'Image standalone Next.js, chạy bằng user không phải root:' : 'Standalone Next.js image running as a non-root user:'}</p>
      <CodeBlock title="Terminal" code={SNIPPETS.docker} />

      <h2 id="vercel">Vercel</h2>
      <p>
        {vi ? 'Bấm nút Deploy with Vercel trong README, hoặc dùng CLI:' : 'Use the Deploy with Vercel button in the README, or the CLI:'}
      </p>
      <CodeBlock title="Terminal" code={SNIPPETS.vercel} />

      <h2 id="cloudflare">Cloudflare Pages</h2>
      <p>{vi ? 'Export tĩnh rồi deploy thư mục out/:' : 'Export statically, then deploy the out/ folder:'}</p>
      <CodeBlock title="Terminal" code={SNIPPETS.cloudflare} />

      <h2 id="hestiacp">VPS HestiaCP</h2>
      <h3>{vi ? 'Cách 1 — Static (đơn giản nhất)' : 'Option 1 — Static (simplest)'}</h3>
      <CodeBlock title="Terminal" code={SNIPPETS.hestiaStatic} />
      <h3>{vi ? 'Cách 2 — Node.js (có MCP)' : 'Option 2 — Node.js (with MCP)'}</h3>
      <CodeBlock title="Terminal" code={SNIPPETS.hestiaNode} />

      <h2 id="env">{vi ? 'Biến môi trường' : 'Environment variables'}</h2>
      <ul>
        <li>
          <code>NEXT_PUBLIC_SITE_URL</code> —{' '}
          {vi ? 'URL công khai, dùng cho canonical, sitemap, JSON-LD, OpenGraph và cấu hình MCP mẫu.' : 'public URL used for canonical links, the sitemap, JSON-LD, OpenGraph and the sample MCP configs.'}
        </li>
        <li>
          {vi ? 'Không cần API key hay database — nội dung nằm trong thư mục content/.' : 'No API keys or database — all content lives in content/.'}
        </li>
      </ul>
    </>
  );
}

export default function SelfHostingPage() {
  return (
    <DocsLayout current="/docs/self-hosting">
      <Localized vi={<Body vi />} en={<Body vi={false} />} />
    </DocsLayout>
  );
}
