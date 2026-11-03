import type { Tier } from '@/types/hub';
import { HubExplorer } from '@/components/HubExplorer';
import { TIER_ICONS, TIER_STYLES } from '@/components/Badges';
import { TIER_META } from '@/lib/labels';
import { getStats } from '@/lib/content';

const INTROS: Record<Tier, string> = {
  prompt:
    'Micro-prompt thực chiến cho B2B marketing, SEO/GEO, copywriting, coding và kiến trúc hệ thống. Mỗi biến {{VARIABLE}} đều có form điền và live preview. Bao gồm nhóm Deep Reasoning: meta-prompt Chain/Tree-of-Thought, Red-team, System 1 vs 2.',
  skill:
    'Agent SOP chuẩn SKILL.md với input schema, tool, quy trình từng bước và quality gate — dùng cho Claude Code, OpenClaw, Hermes.',
  boost: 'Meta-prompt & slash command kích hoạt Chain-of-Thought, Tree-of-Thought, Red-team và phân tầng System 1 vs System 2.',
};

export function TierPage({ tier }: { tier: Tier }) {
  const stats = getStats();
  const count = { prompt: stats.prompts + stats.boosts, skill: stats.skills, boost: stats.boosts }[tier];
  const Icon = TIER_ICONS[tier];
  return (
    <div className="pt-10">
      <header className="mb-8 max-w-3xl">
        <p className={`flex items-center gap-2 text-sm font-semibold tracking-wide uppercase ${TIER_STYLES[tier].text}`}>
          <Icon className="size-4" aria-hidden />
          {tier === 'prompt' ? 'Micro-prompts & Deep Reasoning' : TIER_META[tier].tagline}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {count} {tier === 'prompt' ? 'Prompts' : TIER_META[tier].plural}
        </h1>
        <p className="mt-3 text-muted">{INTROS[tier]}</p>
      </header>
      <HubExplorer initialTier={tier} />
    </div>
  );
}
