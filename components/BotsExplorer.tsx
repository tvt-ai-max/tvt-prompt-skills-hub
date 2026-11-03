'use client';

import { useMemo, useState } from 'react';
import type { BotDepartment, BotItem } from '@/types/hub';
import { BOT_DEPARTMENTS } from '@/types/hub';
import { BOT_DEPARTMENT_META } from '@/lib/labels';
import { BotCard } from '@/components/BotCard';

export function BotsExplorer({ bots }: { bots: BotItem[] }) {
  const [dept, setDept] = useState<BotDepartment | 'all'>('all');
  const visible = useMemo(() => (dept === 'all' ? bots : bots.filter((b) => b.department === dept)), [bots, dept]);
  const count = (d: BotDepartment) => bots.filter((b) => b.department === d).length;

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Lọc theo phòng ban" className="scrollbar-thin -mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
        {(['all', ...BOT_DEPARTMENTS] as const).map((key) => {
          const selected = dept === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setDept(key)}
              className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                selected
                  ? 'border-neon-violet/50 bg-neon-violet/15 text-violet-100'
                  : 'border-line bg-overlay/[0.02] text-muted hover:border-line-strong hover:text-ink'
              }`}
            >
              {key === 'all' ? 'Tất cả' : BOT_DEPARTMENT_META[key].label}
              <span className={`rounded-full px-1.5 text-[11px] ${selected ? 'bg-neon-violet/25' : 'bg-overlay/5'}`}>
                {key === 'all' ? bots.length : count(key)}
              </span>
            </button>
          );
        })}
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {visible.map((bot) => (
          <li key={bot.id}>
            <BotCard bot={bot} />
          </li>
        ))}
      </ul>
    </div>
  );
}
