import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Cpu, Workflow, Wrench } from 'lucide-react';
import { getAllBots, getAllWorkflows, getBotById } from '@/lib/content';
import { BOT_DEPARTMENT_META } from '@/lib/labels';
import { botJsonLd, botUrl } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { BotAvatar, BotCard } from '@/components/BotCard';
import { CopyTextButton } from '@/components/CopyTextButton';
import { DownloadTextButton } from '@/components/DownloadTextButton';
import { ShareBar } from '@/components/ShareBar';

export const dynamicParams = false;

interface BotPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllBots().map((bot) => ({ id: bot.id }));
}

export async function generateMetadata({ params }: BotPageProps): Promise<Metadata> {
  const { id } = await params;
  const bot = getBotById(id);
  if (!bot) return {};
  const title = `${bot.name} — ${bot.role}`;
  return {
    title,
    description: bot.description,
    keywords: bot.tags,
    alternates: { canonical: `/bots/${bot.id}` },
    openGraph: { title, description: bot.description, type: 'article', url: `/bots/${bot.id}` },
    twitter: { card: 'summary_large_image', title, description: bot.description },
  };
}

export default async function BotPage({ params }: BotPageProps) {
  const { id } = await params;
  const bot = getBotById(id);
  if (!bot) notFound();
  const dept = BOT_DEPARTMENT_META[bot.department];
  const usedIn = getAllWorkflows().filter((wf) => wf.steps.some((s) => s.botId === bot.id));
  const teammates = getAllBots().filter((b) => b.department === bot.department && b.id !== bot.id).slice(0, 3);
  const markdown = `---\nname: ${bot.id}\ndescription: ${JSON.stringify(bot.description)}\nrole: ${JSON.stringify(bot.role)}\nmodels: [${bot.recommendedModels.map((m) => JSON.stringify(m)).join(', ')}]\ntools: [${bot.tools.map((t) => JSON.stringify(t)).join(', ')}]\n---\n\n${bot.systemPrompt}\n`;

  return (
    <article className="pt-8">
      <JsonLd data={botJsonLd(bot, SITE_URL)} />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-faint">
        <Link href="/" className="hover:text-ink">
          Hub
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link href="/bots" className="hover:text-ink">
          Bots
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="text-muted">{bot.name}</span>
      </nav>

      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start">
        <BotAvatar bot={bot} size="lg" />
        <div className="min-w-0 flex-1 space-y-3">
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${dept.accent}`}>
            {dept.label}
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {bot.name} <span className="text-muted">— {bot.role}</span>
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-muted">{bot.description}</p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <CopyTextButton text={bot.systemPrompt} label="Copy System Prompt" toastMessage={`Đã copy system prompt của ${bot.name}`} className="h-10" />
            <DownloadTextButton filename={`${bot.id}.agent.md`} text={markdown} label="Tải .md (subagent)" className="h-10" />
            <ShareBar url={botUrl(bot.id, SITE_URL)} item={{ title: `${bot.name} — ${bot.role}`, description: bot.description, tier: 'bot' }} />
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-labelledby="system-prompt-title" className="min-w-0 overflow-hidden rounded-2xl border border-line bg-space-deep/70">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
            <h2 id="system-prompt-title" className="text-sm font-semibold text-ink">
              System prompt
            </h2>
            <span className="text-[11px] text-faint">{bot.systemPrompt.length.toLocaleString('vi-VN')} ký tự</span>
          </div>
          <pre className="scrollbar-thin max-h-[75vh] overflow-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed break-words whitespace-pre-wrap text-slate-200">
            {bot.systemPrompt}
          </pre>
        </section>

        <aside className="space-y-4">
          <div className="surface-card rounded-2xl p-4">
            <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              <Cpu className="size-3.5" aria-hidden /> Model khuyến nghị
            </h2>
            <ul className="space-y-1 text-sm text-ink">
              {bot.recommendedModels.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div className="surface-card rounded-2xl p-4">
            <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              <Wrench className="size-3.5" aria-hidden /> Tools
            </h2>
            <ul className="space-y-1 font-mono text-xs text-muted">
              {bot.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          {usedIn.length > 0 && (
            <div className="surface-card rounded-2xl p-4">
              <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
                <Workflow className="size-3.5" aria-hidden /> Tham gia Workflows
              </h2>
              <ul className="space-y-2 text-sm">
                {usedIn.map((wf) => (
                  <li key={wf.id}>
                    <Link href={`/workflows/${wf.slug}`} className="text-ink hover:text-cyan-300">
                      {wf.title}
                    </Link>
                    <p className="text-xs text-faint">
                      Bước {wf.steps.filter((s) => s.botId === bot.id).map((s) => s.stepNumber).join(', ')}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {bot.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-overlay/[0.04] px-2 py-0.5 text-xs text-faint">
                #{tag}
              </span>
            ))}
          </div>
        </aside>
      </div>

      {teammates.length > 0 && (
        <section aria-labelledby="team-title" className="mt-14">
          <h2 id="team-title" className="mb-4 text-xl font-bold tracking-tight">
            Cùng phòng {dept.label}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teammates.map((mate) => (
              <li key={mate.id}>
                <BotCard bot={mate} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
