import type { Metadata } from 'next';
import Link from 'next/link';
import { Bot, Database, FileCheck2, GitBranch, Globe, Rocket, ShieldCheck, Sparkles, Star, Workflow } from 'lucide-react';
import { getStats } from '@/lib/content';
import type { HubStats } from '@/types/hub';
import { GithubMark } from '@/components/Badges';
import { ContributeButton } from '@/components/ContributeButton';
import { Localized } from '@/components/Localized';
import { localeAlternates } from '@/lib/seo';
import { REPO_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Build in Public',
  description:
    'Câu chuyện xây dựng LexiHub công khai: từ 4 file đặc tả đến nền tảng mã nguồn mở với hơn 500 Prompt, Skill, Bot và Workflow — bởi Claude Code Cloud + Antigravity, không database, hosting tĩnh.',
  alternates: localeAlternates('/build-in-public'),
};

type L = { vi: string; en: string };

/** Milestones taken from the repository's git history. */
const TIMELINE: { date: string; title: L; body: L; Icon: typeof Bot }[] = [
  {
    date: '02/11/2026',
    title: { vi: 'Bản đặc tả trước, code sau', en: 'Spec first, code second' },
    body: {
      vi: 'Khởi tạo repo chỉ với CLAUDE.md, POD, SPEC và ROADMAP — 4 file chỉ thị đủ để một AI agent tự chủ thực thi.',
      en: 'The repo started with only CLAUDE.md, POD, SPEC and ROADMAP — four briefing files were enough for an autonomous AI agent to execute.',
    },
    Icon: FileCheck2,
  },
  {
    date: '02/11/2026',
    title: { vi: 'Claude Code Cloud thực thi Milestone 1 → 4', en: 'Claude Code Cloud ships Milestones 1 → 4' },
    body: {
      vi: 'Next.js 16 + React 19 + Tailwind v4, Interactive Variable Replacer, copy đa nền tảng, Command Palette, 51 mục nội dung và bộ validator chặn lỗi schema & secret.',
      en: 'Next.js 16 + React 19 + Tailwind v4, the interactive variable replacer, multi-target copy, the command palette, 51 items and a validator that blocks schema errors and secrets.',
    },
    Icon: Bot,
  },
  {
    date: '03/11/2026',
    title: { vi: '57 Agent Skills & 139 Prompts', en: '57 agent skills & 139 prompts' },
    body: {
      vi: 'Bổ sung skill vận hành doanh nghiệp, 22 skill sản xuất video bằng code (HyperFrames) và đồng bộ 107 prompt thực chiến từ toilatung.com.',
      en: 'Added business-operations skills, 22 code-driven video skills (HyperFrames) and synced 107 battle-tested prompts from toilatung.com.',
    },
    Icon: Sparkles,
  },
  {
    date: '03/11/2026',
    title: { vi: 'V2: SEO/GEO, Dark/Light & Power Workbench', en: 'V2: SEO/GEO, dark/light & power workbench' },
    body: {
      vi: 'JSON-LD cho từng trang, sitemap, llms.txt cho AI search, ảnh OpenGraph động, theme Sáng/Tối/Hệ thống, Yêu thích và bộ lọc nâng cao.',
      en: 'Per-page JSON-LD, sitemap, llms.txt for AI search, dynamic OpenGraph images, dark/light/system themes, favorites and advanced filters.',
    },
    Icon: Rocket,
  },
  {
    date: '03/11/2026',
    title: { vi: 'V3: Workflows DAG & 16 AI Workforce Bots', en: 'V3: workflow DAGs & 16 AI workforce bots' },
    body: {
      vi: 'Dây chuyền nhiều bước với mô phỏng nối biến trực tiếp, xuất n8n / Python CLI, và 16 bot lõi với system prompt chuyên sâu.',
      en: 'Multi-step pipelines with a live variable-piping simulator, n8n / Python CLI export, and 16 core bots with deep system prompts.',
    },
    Icon: Workflow,
  },
  {
    date: '03/11/2026',
    title: { vi: 'V4: 317 Bots, MCP server, Docs & song ngữ', en: 'V4: 317 bots, MCP server, docs & bilingual UI' },
    body: {
      vi: '301 specialist persona theo 10 chuyên khoa, endpoint MCP cho Cursor / Claude / Windsurf, trang tài liệu, cẩm nang prompt 2026 và giao diện Việt – Anh.',
      en: '301 specialist personas across 10 fields, an MCP endpoint for Cursor / Claude / Windsurf, documentation, the 2026 prompt guide and a Vietnamese–English interface.',
    },
    Icon: Globe,
  },
];

const PRINCIPLES: { Icon: typeof Bot; title: L; body: L }[] = [
  {
    Icon: Database,
    title: { vi: 'Không database', en: 'No database' },
    body: { vi: 'Toàn bộ nội dung là file Markdown/JSON trong Git — đóng góp bằng Pull Request, review bằng diff.', en: 'All content is Markdown/JSON in Git — contributions are pull requests, reviews are diffs.' },
  },
  {
    Icon: ShieldCheck,
    title: { vi: 'Validator là người gác cổng', en: 'The validator is the gatekeeper' },
    body: { vi: 'Mọi lần build đều kiểm tra schema, biến {{VARIABLE}} và quét secret trước khi xuất bản.', en: 'Every build checks schemas, {{VARIABLES}} and scans for secrets before publishing.' },
  },
  {
    Icon: Sparkles,
    title: { vi: 'Trang tĩnh, nhanh và rẻ', en: 'Static, fast and cheap' },
    body: { vi: 'Mọi trang được prerender lúc build — chạy trên Vercel, VPS hay Docker.', en: 'Every page is prerendered at build time — runs on Vercel, a VPS or Docker.' },
  },
  {
    Icon: GitBranch,
    title: { vi: 'Agent làm, người duyệt', en: 'Agents build, humans approve' },
    body: { vi: 'AI agent viết code và nội dung theo đặc tả; con người duyệt Pull Request và quyết định merge.', en: 'AI agents write code and content from the spec; humans review the pull request and decide to merge.' },
  },
];

function Body({ vi, stats }: { vi: boolean; stats: HubStats }) {
  const pick = (l: L) => (vi ? l.vi : l.en);
  const total = stats.total + stats.bots + stats.workflows;
  return (
    <>
      <header className="space-y-4">
        <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-amber-500 uppercase">
          <Rocket className="size-4" aria-hidden /> Build in Public
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
          {vi ? 'Từ 4 file đặc tả đến ' : 'From 4 spec files to '}
          <span className="text-gradient">{vi ? `${total} tài sản trí tuệ` : `${total} open assets`}</span>
          {vi ? ' mã nguồn mở' : ''}
        </h1>
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {vi ? (
            <>
              LexiHub (TVT Intelligence Hub) được khởi tạo và xây dựng thần tốc bởi <strong className="text-ink">Claude Code Cloud</strong> +{' '}
              <strong className="text-ink">Antigravity</strong> với ngân sách tối giản: không thuê đội dev, không database, không server ứng dụng phức
              tạp. Chúng tôi công khai toàn bộ quá trình để cộng đồng lập trình viên và solopreneur có thể làm lại — và làm tốt hơn.
            </>
          ) : (
            <>
              LexiHub (TVT Intelligence Hub) was started and built at speed with <strong className="text-ink">Claude Code Cloud</strong> +{' '}
              <strong className="text-ink">Antigravity</strong> on a minimal budget: no dev team, no database, no complex app server. We publish the
              whole process so developers and solopreneurs can repeat it — and do it better.
            </>
          )}
        </p>
        <dl className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
          {[
            ['Prompts', stats.prompts + stats.boosts],
            ['Skills', stats.skills],
            ['Bots', stats.bots],
            ['Workflows', stats.workflows],
          ].map(([label, value]) => (
            <div key={label} className="surface-card rounded-2xl p-4 text-center">
              <dt className="text-xs tracking-wide text-muted uppercase">{label}</dt>
              <dd className="mt-1 font-mono text-3xl font-bold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">{vi ? 'Dòng thời gian' : 'Timeline'}</h2>
        <ol className="relative space-y-6 border-l border-line pl-6">
          {TIMELINE.map(({ date, title, body, Icon }) => (
            <li key={title.en} className="relative">
              <span className="absolute top-0.5 -left-[37px] grid size-7 place-items-center rounded-full border border-line-strong bg-surface text-neon-cyan">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <time className="font-mono text-xs text-faint">{date}</time>
              <h3 className="mt-0.5 font-semibold text-ink">{pick(title)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{pick(body)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">{vi ? 'Nguyên tắc xây dựng' : 'How we build'}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PRINCIPLES.map(({ Icon, title, body }) => (
            <div key={title.en} className="surface-card rounded-2xl p-5">
              <Icon className="size-5 text-neon-emerald" aria-hidden />
              <h3 className="mt-3 font-semibold text-ink">{pick(title)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{pick(body)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">{vi ? 'Kiến trúc trong một hình' : 'The architecture at a glance'}</h2>
        <pre className="surface-card scrollbar-thin overflow-x-auto rounded-2xl p-5 font-mono text-xs leading-relaxed text-muted sm:text-sm">{`content/*.json|md  ──►  validate-data.ts (schema · {{VAR}} · secret scan)
        │
        ▼
Next.js 16 build  ──►  ${total} pages + JSON-LD + OG images · sitemap · llms.txt
        │
        ├─► Static hosting / Docker / Vercel  ──►  Workbench · Studio · 317 Bots
        └─► POST /api/mcp (MCP server)        ──►  Cursor · Claude · Windsurf · Antigravity`}</pre>
      </section>

      <section className="surface-card mt-14 flex flex-col items-center gap-4 rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight">{vi ? 'Cùng xây tiếp' : 'Build it with us'}</h2>
        <p className="max-w-xl text-sm text-muted">
          {vi
            ? 'Một ngôi sao trên GitHub giúp dự án tiếp cận nhiều người hơn. Một Pull Request giúp kho tri thức dày hơn cho tất cả.'
            : 'A GitHub star helps more builders find the project. A pull request makes the library richer for everyone.'}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-neon-cyan px-5 text-sm font-semibold text-on-accent transition hover:brightness-110"
          >
            <GithubMark className="size-4" /> <Star className="size-4" aria-hidden /> {vi ? 'Star trên GitHub' : 'Star on GitHub'}
          </a>
          <ContributeButton />
        </div>
        <Link href="/" className="text-sm text-muted hover:text-ink">
          {vi ? '← Khám phá kho năng lực' : '← Explore the library'}
        </Link>
      </section>
    </>
  );
}

export default function BuildInPublicPage() {
  const stats = getStats();
  return (
    <div className="mx-auto max-w-4xl pt-12">
      <Localized vi={<Body vi stats={stats} />} en={<Body vi={false} stats={stats} />} />
    </div>
  );
}
