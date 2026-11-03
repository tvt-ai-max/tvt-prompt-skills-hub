import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Cpu, Settings2, Workflow, Wrench } from 'lucide-react';
import { getAllBots, getAllWorkflows, getBotById } from '@/lib/content';
import { botSubagentMarkdown, toBotSummary } from '@/lib/bot-summary';
import { customInstructionsText } from '@/lib/personas';
import { botJsonLd, botUrl, localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import type { MessageKey } from '@/lib/i18n';
import { JsonLd } from '@/components/JsonLd';
import { BotAvatar, BotCard, BotCopyButton } from '@/components/BotCard';
import { DEPT_ACCENT, DEPT_KEYS } from '@/lib/bot-ui';
import { DownloadTextButton } from '@/components/DownloadTextButton';
import { ShareBar } from '@/components/ShareBar';
import { T } from '@/components/I18nProvider';

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
  const title = bot.role === bot.name ? `${bot.name} — AI Specialist Persona` : `${bot.name} — ${bot.role}`;
  return {
    title,
    description: bot.description,
    keywords: bot.tags,
    alternates: localeAlternates(`/bots/${bot.id}`),
    openGraph: { title, description: bot.description, type: 'article', url: `/bots/${bot.id}` },
    twitter: { card: 'summary_large_image', title, description: bot.description },
  };
}

export default async function BotPage({ params }: BotPageProps) {
  const { id } = await params;
  const bot = getBotById(id);
  if (!bot) notFound();
  const specialist = bot.tier === 'specialist';
  const usedIn = getAllWorkflows().filter((wf) => wf.steps.some((s) => s.botId === bot.id));
  const peers = getAllBots()
    .filter((b) => b.id !== bot.id && (specialist ? b.specialty === bot.specialty : b.tier !== 'specialist' && b.department === bot.department))
    .slice(0, 3)
    .map(toBotSummary);
  const labelKey: MessageKey = specialist ? (`specialty.${bot.specialty}` as MessageKey) : DEPT_KEYS[bot.department];
  const summary = toBotSummary(bot);

  return (
    <article className="pt-8">
      <JsonLd data={botJsonLd(bot, SITE_URL)} />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-faint">
        <Link href="/" className="hover:text-ink">
          <T k="item.hub" />
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link href={specialist ? `/bots?specialty=${bot.specialty}` : '/bots'} className="hover:text-ink">
          <T k="nav.bots" />
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="text-muted">{bot.name}</span>
      </nav>

      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start">
        <BotAvatar bot={bot} size="lg" />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${
                specialist ? 'border-line text-muted' : DEPT_ACCENT[bot.department]
              }`}
            >
              <T k={labelKey} />
            </span>
            <span className="text-xs text-faint">{specialist ? <T k="bots.specialist" /> : <>⭐ <T k="bots.core" /></>}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {bot.name} {bot.role !== bot.name && <span className="text-muted">— {bot.role}</span>}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-muted">{bot.description}</p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <BotCopyButton bot={summary} kind="system" label="📋 Copy System Prompt (Claude/Cursor)" className="h-10" />
            <BotCopyButton bot={summary} kind="custom" label="⚙️ Copy Custom Instructions (ChatGPT)" className="h-10" />
            <DownloadTextButton filename={`${bot.id}.agent.md`} text={botSubagentMarkdown(bot)} labelKey="bots.downloadMd" className="h-10" />
          </div>
          <ShareBar url={botUrl(bot.id, SITE_URL)} item={{ title: bot.role === bot.name ? bot.name : `${bot.name} — ${bot.role}`, description: bot.description, tier: 'bot' }} />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          <section aria-labelledby="system-prompt-title" className="overflow-hidden rounded-2xl border border-line bg-space-deep/70">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
              <h2 id="system-prompt-title" className="text-sm font-semibold text-ink">
                <T k="bots.systemPrompt" />
              </h2>
              <span className="text-[11px] text-faint">
                <T k="bots.chars" vars={{ count: bot.systemPrompt.length }} />
              </span>
            </div>
            <pre className="scrollbar-thin max-h-[70vh] overflow-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed break-words whitespace-pre-wrap text-slate-200">
              {bot.systemPrompt}
            </pre>
          </section>
          <section aria-labelledby="ci-title" className="overflow-hidden rounded-2xl border border-line bg-space-deep/70">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2">
              <Settings2 className="size-4 text-neon-cyan" aria-hidden />
              <h2 id="ci-title" className="text-sm font-semibold text-ink">
                Custom Instructions (ChatGPT)
              </h2>
            </div>
            <pre className="scrollbar-thin max-h-[50vh] overflow-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed break-words whitespace-pre-wrap text-slate-200">
              {customInstructionsText(bot)}
            </pre>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="surface-card rounded-2xl p-4">
            <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              <Cpu className="size-3.5" aria-hidden /> <T k="bots.models" />
            </h2>
            <ul className="space-y-1 text-sm text-ink">
              {bot.recommendedModels.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div className="surface-card rounded-2xl p-4">
            <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              <Wrench className="size-3.5" aria-hidden /> <T k="bots.tools" />
            </h2>
            <ul className="space-y-1 font-mono text-xs text-muted">
              {bot.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          {usedIn.length > 0 && (
            <div className="surface-card rounded-2xl p-4">
              <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
                <Workflow className="size-3.5" aria-hidden /> <T k="bots.inWorkflows" />
              </h2>
              <ul className="space-y-2 text-sm">
                {usedIn.map((wf) => (
                  <li key={wf.id}>
                    <Link href={`/workflows/${wf.slug}`} className="text-ink hover:text-cyan-300">
                      {wf.title}
                    </Link>
                    <p className="text-xs text-faint">
                      <T k="bots.stepsOf" vars={{ steps: wf.steps.filter((s) => s.botId === bot.id).map((s) => s.stepNumber).join(', ') }} />
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

      {peers.length > 0 && (
        <section aria-labelledby="peers-title" className="mt-14">
          <h2 id="peers-title" className="mb-4 text-xl font-bold tracking-tight">
            {specialist ? <T k="bots.sameSpecialty" /> : <T k="bots.sameDept" />}{' '}
            <T k={labelKey} />
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {peers.map((peer) => (
              <li key={peer.id}>
                <BotCard bot={peer} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
