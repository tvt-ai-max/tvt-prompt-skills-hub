import { getAllWorkflows, getWorkflowBySlug } from '@/lib/content';
import { OG_SIZE, renderOgCard } from '@/lib/og';
import { SITE_NAME } from '@/lib/site';

export const alt = `${SITE_NAME} — AI workflow`;
export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllWorkflows().map((wf) => ({ slug: wf.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wf = getWorkflowBySlug(slug);
  if (!wf) return renderOgCard({ tier: 'hub', eyebrow: SITE_NAME, title: 'Không tìm thấy', description: '' });
  return renderOgCard({
    tier: 'workflow',
    eyebrow: `${wf.steps.length} bước · ${wf.difficulty}`,
    title: wf.title,
    description: wf.summary,
    chips: wf.steps.map((s) => s.agentRole.split(' (')[0]),
  });
}
