'use client';

import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { Search } from 'lucide-react';
import type { BotDepartment, BotSummary } from '@/types/hub';
import { BOT_DEPARTMENTS } from '@/types/hub';
import { SPECIALTIES } from '@/lib/personas';
import type { MessageKey } from '@/lib/i18n';
import { BotCard } from '@/components/BotCard';
import { DEPT_KEYS } from '@/lib/bot-ui';
import { useTranslation } from '@/components/I18nProvider';

const PAGE = 48;
type Roster = 'core' | 'specialist';

function Pill({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition ${
        selected ? 'border-neon-violet/50 bg-neon-violet/15 text-violet-100' : 'border-line bg-overlay/[0.02] text-muted hover:border-line-strong hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

export function BotsExplorer({ bots }: { bots: BotSummary[] }) {
  const { t } = useTranslation();
  const core = useMemo(() => bots.filter((b) => b.tier === 'core'), [bots]);
  const specialists = useMemo(() => bots.filter((b) => b.tier === 'specialist'), [bots]);
  const [roster, setRoster] = useState<Roster>('core');
  const [dept, setDept] = useState<BotDepartment | 'all'>('all');
  const [specialty, setSpecialty] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);

  // Deep links: /bots?roster=specialist&specialty=finance
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('roster') === 'specialist' || params.get('specialty')) setRoster('specialist');
    const s = params.get('specialty');
    if (s && (SPECIALTIES as readonly string[]).includes(s)) setSpecialty(s);
  }, []);

  useEffect(() => setLimit(PAGE), [roster, dept, specialty, query]);

  const pool = roster === 'core' ? core : specialists;
  const index = useMemo(
    () =>
      new Fuse(pool, {
        ignoreLocation: true,
        threshold: 0.35,
        keys: [
          { name: 'name', weight: 0.45 },
          { name: 'role', weight: 0.2 },
          { name: 'tags', weight: 0.15 },
          { name: 'description', weight: 0.2 },
        ],
      }),
    [pool],
  );

  const visible = useMemo(() => {
    const base = query.trim() ? index.search(query.trim()).map((r) => r.item) : pool;
    return base.filter((b) =>
      roster === 'core' ? dept === 'all' || b.department === dept : specialty === 'all' || b.specialty === specialty,
    );
  }, [pool, index, query, roster, dept, specialty]);

  const countSpecialty = (s: string) => specialists.filter((b) => b.specialty === s).length;

  return (
    <div className="space-y-5">
      <div role="tablist" aria-label={t('bots.tabsAria')} className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {(['core', 'specialist'] as const).map((r) => {
          const selected = roster === r;
          return (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setRoster(r)}
              className={`focus-ring shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition ${
                selected ? 'border-neon-cyan/50 bg-neon-cyan/15 text-cyan-100 shadow-glow-cyan' : 'border-line bg-surface/70 text-muted hover:text-ink'
              }`}
            >
              {r === 'core' ? t('bots.tabCore', { count: core.length }) : t('bots.tabSpecialists', { count: specialists.length })}
            </button>
          );
        })}
      </div>

      <div className="glass space-y-3 rounded-2xl border border-line p-3">
        <label className="relative flex items-center">
          <span className="sr-only">{t('bots.search')}</span>
          <Search className="pointer-events-none absolute left-3 size-4 text-faint" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('bots.search')}
            className="focus-ring h-11 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-sm text-ink placeholder:text-faint"
          />
        </label>
        {roster === 'core' ? (
          <div role="tablist" aria-label={t('bots.deptAria')} className="scrollbar-thin -mx-1 flex gap-1 overflow-x-auto px-1">
            <Pill selected={dept === 'all'} onClick={() => setDept('all')}>
              {t('bots.all')} <span className="text-[11px] opacity-70">{core.length}</span>
            </Pill>
            {BOT_DEPARTMENTS.map((d) => (
              <Pill key={d} selected={dept === d} onClick={() => setDept(d)}>
                {t(DEPT_KEYS[d])} <span className="text-[11px] opacity-70">{core.filter((b) => b.department === d).length}</span>
              </Pill>
            ))}
          </div>
        ) : (
          <div role="tablist" aria-label={t('bots.specialtyAria')} className="scrollbar-thin -mx-1 flex gap-1 overflow-x-auto px-1">
            <Pill selected={specialty === 'all'} onClick={() => setSpecialty('all')}>
              {t('bots.all')} <span className="text-[11px] opacity-70">{specialists.length}</span>
            </Pill>
            {SPECIALTIES.map((s) => (
              <Pill key={s} selected={specialty === s} onClick={() => setSpecialty(s)}>
                {t(`specialty.${s}` as MessageKey)} <span className="text-[11px] opacity-70">{countSpecialty(s)}</span>
              </Pill>
            ))}
          </div>
        )}
        <p className="text-xs text-faint" aria-live="polite">
          {t('bots.results', { count: visible.length })}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line px-6 py-14 text-center text-sm text-muted">{t('bots.noResults')}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visible.slice(0, limit).map((bot) => (
            <li key={bot.id}>
              <BotCard bot={bot} />
            </li>
          ))}
        </ul>
      )}
      {visible.length > limit && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="focus-ring rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-line-strong"
          >
            {t('common.showMore', { count: Math.min(PAGE, visible.length - limit) })}
          </button>
        </div>
      )}
    </div>
  );
}
