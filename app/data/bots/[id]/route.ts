import { getAllBots, getBotById } from '@/lib/content';
import { toBotPayload } from '@/lib/bot-summary';

/** Static JSON per bot (system prompt + ChatGPT custom instructions), loaded on demand by the copy buttons. */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBots().map((bot) => ({ id: bot.id }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bot = getBotById(id);
  if (!bot) return Response.json({ error: 'not_found' }, { status: 404 });
  return Response.json(toBotPayload(bot), { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400' } });
}
