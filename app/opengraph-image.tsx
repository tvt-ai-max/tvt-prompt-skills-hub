import { getStats } from '@/lib/content';
import { OG_SIZE, renderOgCard } from '@/lib/og';
import { SITE_TAGLINE } from '@/lib/site';

export const alt = 'LexiHub — The Open AI Prompt, Skill & Bot Intelligence Center';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function Image() {
  const stats = getStats();
  return renderOgCard({
    tier: 'hub',
    eyebrow: `${stats.prompts + stats.boosts} Prompts · ${stats.skills} Skills · ${stats.bots} Bots · ${stats.workflows} Workflows`,
    title: SITE_TAGLINE,
    description: 'Kho Prompt, Agent Skill (SKILL.md), AI Workforce Bots và Workflows — điền biến, xem trước, copy 1 chạm cho ChatGPT, Claude, Cursor.',
    chips: ['AgentSkills', 'Workflows', 'AIBots', 'ClaudeCode', 'Cursorrules'],
  });
}
