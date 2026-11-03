import { Bot, Brain, Sparkles } from 'lucide-react';
import type { Persona, Tier } from '@/types/hub';
import { PERSONA_META, TIER_META } from '@/lib/labels';

export const TIER_STYLES: Record<Tier, { badge: string; glow: string; text: string; dot: string; ring: string }> = {
  prompt: {
    badge: 'border-neon-cyan/30 bg-neon-cyan/10 text-cyan-300',
    glow: 'hover:shadow-glow-cyan hover:border-neon-cyan/40',
    text: 'text-cyan-300',
    dot: 'bg-neon-cyan',
    ring: 'focus-visible:ring-neon-cyan/70',
  },
  skill: {
    badge: 'border-neon-emerald/30 bg-neon-emerald/10 text-emerald-300',
    glow: 'hover:shadow-glow-emerald hover:border-neon-emerald/40',
    text: 'text-emerald-300',
    dot: 'bg-neon-emerald',
    ring: 'focus-visible:ring-neon-emerald/70',
  },
  boost: {
    badge: 'border-neon-violet/35 bg-neon-violet/10 text-violet-300',
    glow: 'hover:shadow-glow-violet hover:border-neon-violet/40',
    text: 'text-violet-300',
    dot: 'bg-neon-violet',
    ring: 'focus-visible:ring-neon-violet/70',
  },
};

export const TIER_ICONS = { prompt: Sparkles, skill: Bot, boost: Brain } as const;

export function TierBadge({ tier }: { tier: Tier }) {
  const Icon = TIER_ICONS[tier];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${TIER_STYLES[tier].badge}`}
    >
      <Icon className="size-3" aria-hidden />
      {TIER_META[tier].label}
    </span>
  );
}

export function PersonaBadge({ persona }: { persona: Persona }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-overlay/[0.03] px-2 py-0.5 text-[11px] font-medium text-muted">
      {PERSONA_META[persona].label}
    </span>
  );
}

export function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
