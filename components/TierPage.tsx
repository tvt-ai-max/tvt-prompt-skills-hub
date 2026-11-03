import type { Tier } from '@/types/hub';
import { HubExplorer } from '@/components/HubExplorer';
import { TIER_ICONS, TIER_STYLES } from '@/components/Badges';
import { T } from '@/components/I18nProvider';
import { getStats } from '@/lib/content';


export function TierPage({ tier }: { tier: Tier }) {
  const stats = getStats();
  const count = { prompt: stats.prompts + stats.boosts, skill: stats.skills, boost: stats.boosts }[tier];
  const Icon = TIER_ICONS[tier];
  return (
    <div className="pt-10">
      <header className="mb-8 max-w-3xl">
        <p className={`flex items-center gap-2 text-sm font-semibold tracking-wide uppercase ${TIER_STYLES[tier].text}`}>
          <Icon className="size-4" aria-hidden />
          <T k={tier === 'skill' ? 'tierPage.skillTagline' : 'tierPage.promptTagline'} />
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          <T k={tier === 'skill' ? 'tierPage.skillTitle' : 'tierPage.promptTitle'} vars={{ count }} />
        </h1>
        <p className="mt-3 text-muted">
          <T k={tier === 'skill' ? 'tierPage.skillIntro' : 'tierPage.promptIntro'} />
        </p>
      </header>
      <HubExplorer initialTier={tier} />
    </div>
  );
}
