import type { Metadata } from 'next';
import Link from 'next/link';
import { Bot, Database, FileCheck2, GitBranch, Rocket, ShieldCheck, Sparkles, Star, Workflow } from 'lucide-react';
import { getStats } from '@/lib/content';
import { GithubMark } from '@/components/Badges';
import { ContributeButton } from '@/components/ContributeButton';
import { REPO_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Build in Public',
  description:
    'Câu chuyện xây dựng TVT Intelligence Hub công khai: từ bộ tài liệu đặc tả đến nền tảng mã nguồn mở với gần 100 Prompt, Skill, Boost — bởi Claude Code Cloud + Antigravity, không database, hosting tĩnh.',
  alternates: { canonical: '/build-in-public' },
};

/** Milestones taken from the repository's git history. */
const TIMELINE = [
  {
    date: '02/11/2026',
    title: 'Bản đặc tả trước, code sau',
    body: 'Khởi tạo repo chỉ với CLAUDE.md, POD, SPEC và ROADMAP — 4 file chỉ thị đủ để một AI agent tự chủ thực thi.',
    Icon: FileCheck2,
  },
  {
    date: '02/11/2026',
    title: 'Claude Code Cloud thực thi Milestone 1 → 4',
    body: 'Scaffold Next.js 16 + React 19 + Tailwind v4, Interactive Variable Replacer, copy đa nền tảng, Command Palette, 51 mục nội dung và bộ validator chặn lỗi schema & secret. Merge qua Pull Request #1.',
    Icon: Bot,
  },
  {
    date: '03/11/2026',
    title: 'Mở rộng lên 57 Agent Skills',
    body: 'Bổ sung và làm sạch 23 skill vận hành doanh nghiệp cùng 22 skill sản xuất video bằng code (HyperFrames), tái cấu trúc danh mục Video & Motion, Paid Ads, Brand Strategy.',
    Icon: Workflow,
  },
  {
    date: '03/11/2026',
    title: 'Đồng bộ 107 prompt thực chiến',
    body: 'Kho Prompts mở rộng lên 139 mục với các danh mục Video, Branding và Ads từ hệ sinh thái toilatung.com.',
    Icon: Sparkles,
  },
  {
    date: '03/11/2026',
    title: 'V2: SEO/GEO, Dark/Light & Power Workbench',
    body: 'JSON-LD cho từng trang, sitemap, llms.txt cho AI search, ảnh OpenGraph động, theme Sáng/Tối/Hệ thống, Yêu thích, lọc theo tag & công cụ Agent.',
    Icon: Rocket,
  },
  {
    date: '03/11/2026',
    title: 'V3: Workflows DAG & 16 AI Workforce Bots',
    body: 'Dây chuyền nhiều bước với mô phỏng nối biến trực tiếp, xuất n8n / Python CLI, và 16 bot với system prompt chuyên sâu. Boosts nhập vào Prompts thành nhóm Deep Reasoning.',
    Icon: Workflow,
  },
];

const PRINCIPLES = [
  { Icon: Database, title: 'Không database', body: 'Toàn bộ nội dung là file Markdown/JSON trong Git — đóng góp bằng Pull Request, review bằng diff.' },
  { Icon: ShieldCheck, title: 'Validator là người gác cổng', body: 'Mọi lần build đều chạy kiểm tra schema, biến {{VARIABLE}} và quét secret trước khi xuất bản.' },
  { Icon: Sparkles, title: 'Trang tĩnh, nhanh và rẻ', body: 'Mọi trang được prerender lúc build — chạy trên Vercel, VPS hay Docker mà không cần server ứng dụng phức tạp.' },
  { Icon: GitBranch, title: 'Agent làm, người duyệt', body: 'AI agent viết code và nội dung theo đặc tả; con người duyệt Pull Request và quyết định merge.' },
];

export default function BuildInPublicPage() {
  const stats = getStats();
  return (
    <div className="mx-auto max-w-4xl pt-12">
      <header className="space-y-4">
        <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-amber-500 uppercase">
          <Rocket className="size-4" aria-hidden /> Build in Public
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
          Từ 4 file đặc tả đến <span className="text-gradient">{stats.total + stats.bots + stats.workflows} tài sản trí tuệ</span> mã nguồn mở
        </h1>
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          TVT Intelligence Hub được khởi tạo và xây dựng thần tốc bởi <strong className="text-ink">Claude Code Cloud</strong> +{' '}
          <strong className="text-ink">Antigravity</strong> với ngân sách tối giản: không thuê đội dev, không database, không server
          ứng dụng. Chúng tôi công khai toàn bộ quá trình để cộng đồng lập trình viên và solopreneur có thể làm lại — và làm tốt hơn.
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

      <section aria-labelledby="timeline-title" className="mt-14">
        <h2 id="timeline-title" className="mb-6 text-2xl font-bold tracking-tight">
          Dòng thời gian
        </h2>
        <ol className="relative space-y-6 border-l border-line pl-6">
          {TIMELINE.map(({ date, title, body, Icon }) => (
            <li key={title} className="relative">
              <span className="absolute top-0.5 -left-[37px] grid size-7 place-items-center rounded-full border border-line-strong bg-surface text-neon-cyan">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <time className="font-mono text-xs text-faint">{date}</time>
              <h3 className="mt-0.5 font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="principles-title" className="mt-14">
        <h2 id="principles-title" className="mb-6 text-2xl font-bold tracking-tight">
          Nguyên tắc xây dựng
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PRINCIPLES.map(({ Icon, title, body }) => (
            <div key={title} className="surface-card rounded-2xl p-5">
              <Icon className="size-5 text-neon-emerald" aria-hidden />
              <h3 className="mt-3 font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="stack-title" className="mt-14">
        <h2 id="stack-title" className="mb-4 text-2xl font-bold tracking-tight">
          Kiến trúc trong một hình
        </h2>
        <pre className="surface-card scrollbar-thin overflow-x-auto rounded-2xl p-5 font-mono text-xs leading-relaxed text-muted sm:text-sm">{`content/*.json|md  ──►  validate-data.ts (schema · {{VAR}} · secret scan)
        │
        ▼
Next.js 16 build  ──►  ${stats.total} trang /items/[id] + JSON-LD + OG image
        │                 sitemap.xml · robots.txt · llms.txt
        ▼
Static hosting (Vercel / VPS / Docker)  ──►  Workbench: điền biến → copy
                                             ChatGPT · Claude · Cursor · SKILL.md`}</pre>
      </section>

      <section className="surface-card mt-14 flex flex-col items-center gap-4 rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Cùng xây tiếp</h2>
        <p className="max-w-xl text-sm text-muted">
          Một ngôi sao trên GitHub giúp dự án tiếp cận nhiều người hơn. Một Pull Request giúp kho tri thức dày hơn cho tất cả.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-neon-cyan px-5 text-sm font-semibold text-on-accent transition hover:brightness-110"
          >
            <GithubMark className="size-4" /> <Star className="size-4" aria-hidden /> Star trên GitHub
          </a>
          <ContributeButton />
        </div>
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Khám phá kho năng lực
        </Link>
      </section>
    </div>
  );
}
