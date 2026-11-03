import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, Coins, Layers } from 'lucide-react';
import { getAllWorkflows, getWorkflowBySlug } from '@/lib/content';
import { getBotGlyphs } from '@/lib/bots';
import { categoryLabel } from '@/lib/labels';
import { workflowJsonLd, workflowUrl } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { ShareBar } from '@/components/ShareBar';
import { WorkflowStudio } from '@/components/WorkflowStudio';
import { DifficultyBadge } from '@/components/WorkflowCard';

export const dynamicParams = false;

interface WorkflowPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllWorkflows().map((wf) => ({ slug: wf.slug }));
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const wf = getWorkflowBySlug(slug);
  if (!wf) return {};
  return {
    title: wf.title,
    description: wf.summary,
    keywords: wf.tags,
    alternates: { canonical: `/workflows/${wf.slug}` },
    openGraph: { title: wf.title, description: wf.summary, type: 'article', url: `/workflows/${wf.slug}` },
    twitter: { card: 'summary_large_image', title: wf.title, description: wf.summary },
  };
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const wf = getWorkflowBySlug(slug);
  if (!wf) notFound();
  const agents = [...new Set(wf.steps.map((s) => s.agentRole.split(' (')[0]))];

  return (
    <article className="pt-8">
      <JsonLd data={workflowJsonLd(wf, SITE_URL)} />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-faint">
        <Link href="/" className="hover:text-ink">
          Hub
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link href="/workflows" className="hover:text-ink">
          Workflows
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="truncate text-muted">{wf.title}</span>
      </nav>

      <header className="mb-8 max-w-4xl space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={wf.difficulty} />
          <span className="text-xs text-faint">{categoryLabel(wf.category)}</span>
          <span className="text-xs text-faint">· {wf.author}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{wf.title}</h1>
        <p className="text-base leading-relaxed text-muted">{wf.summary}</p>
        <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <div className="inline-flex items-center gap-1.5">
            <Layers className="size-4 text-neon-cyan" aria-hidden />
            <dt className="sr-only">Số bước</dt>
            <dd>
              {wf.steps.length} bước · {agents.length} agent
            </dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Clock className="size-4 text-neon-cyan" aria-hidden />
            <dt className="sr-only">Thời gian</dt>
            <dd>{wf.estimatedTime}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Coins className="size-4 text-neon-cyan" aria-hidden />
            <dt className="sr-only">Chi phí</dt>
            <dd>{wf.estimatedCost}</dd>
          </div>
        </dl>
        <ShareBar url={workflowUrl(wf.slug, SITE_URL)} item={{ title: wf.title, description: wf.summary, tier: 'workflow' }} />
      </header>

      <WorkflowStudio wf={wf} bots={getBotGlyphs()} />
    </article>
  );
}
