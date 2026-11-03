import { getAllBots } from '@/lib/content';
import type { NavEntry } from '@/types/hub';

/** Compact search entries for the 301 specialists — fetched lazily by the command palette. */
export const dynamic = 'force-static';

export function GET() {
  const entries: NavEntry[] = getAllBots()
    .filter((bot) => bot.tier === 'specialist')
    .map((bot) => ({
      kind: 'bot',
      id: bot.id,
      title: bot.name,
      subtitle: bot.tags[0] ?? bot.role,
      description: bot.description,
      tags: bot.tags,
      href: `/bots/${bot.id}`,
      glyph: bot.avatar,
    }));
  return Response.json(entries, { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400' } });
}
