import { getAllBots, getBotById } from '@/lib/content';
import { BOT_DEPARTMENT_META } from '@/lib/labels';
import { OG_SIZE, renderOgCard } from '@/lib/og';
import { SITE_NAME } from '@/lib/site';

export const alt = `${SITE_NAME} — AI Workforce bot`;
export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllBots().map((bot) => ({ id: bot.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bot = getBotById(id);
  if (!bot) return renderOgCard({ tier: 'hub', eyebrow: SITE_NAME, title: 'Không tìm thấy', description: '' });
  return renderOgCard({
    tier: 'bot',
    eyebrow: BOT_DEPARTMENT_META[bot.department].label,
    title: `${bot.name} — ${bot.role}`,
    description: bot.description,
    chips: bot.tags,
  });
}
