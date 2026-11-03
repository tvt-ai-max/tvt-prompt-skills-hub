'use client';

import { CheckCircle2 } from 'lucide-react';
import type { WorkflowItem } from '@/types/hub';
import { outputFormatLabel, workflowEdges } from '@/lib/workflow';

export const NODE_W = 232;
export const NODE_H = 132;
const GAP = 64;
const PAD = 16;
const ARC_STEP = 22;

export type BotGlyphs = Record<string, { name: string; avatar: string }>;

function nodeX(index: number) {
  return PAD + index * (NODE_W + GAP);
}

/**
 * Visual node canvas. Deterministic layout (fixed node size), so edges are computed without measuring
 * the DOM: adjacent data edges are straight neon arrows, longer jumps are arcs below the row.
 */
export function WorkflowCanvas({
  wf,
  activeId,
  onSelect,
  completed,
  bots,
}: {
  wf: WorkflowItem;
  activeId: string;
  onSelect: (id: string) => void;
  completed: Set<string>;
  bots: BotGlyphs;
}) {
  const index = new Map(wf.steps.map((s, i) => [s.id, i]));
  const edges = workflowEdges(wf);
  const maxSpan = Math.max(1, ...edges.map((e) => (index.get(e.to) ?? 0) - (index.get(e.from) ?? 0)));
  const width = PAD * 2 + wf.steps.length * NODE_W + (wf.steps.length - 1) * GAP;
  const arcBase = PAD + NODE_H;
  const height = arcBase + (maxSpan > 1 ? 18 + ARC_STEP * (maxSpan - 1) : 0) + PAD;
  const midY = PAD + NODE_H / 2;

  const adjacentHasData = new Set(edges.filter((e) => (index.get(e.to) ?? 0) - (index.get(e.from) ?? 0) === 1).map((e) => e.from));

  return (
    <div className="scrollbar-thin overflow-x-auto rounded-2xl border border-line bg-space-deep/60 shadow-card" role="group" aria-label="Sơ đồ các bước">
      <div className="relative" style={{ width, height }}>
        <svg width={width} height={height} className="absolute inset-0" aria-hidden>
          <defs>
            <marker id="wf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-neon-cyan)" />
            </marker>
            <marker id="wf-arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-line-strong)" />
            </marker>
          </defs>
          {/* execution order between adjacent steps */}
          {wf.steps.slice(0, -1).map((step, i) => {
            const hot = step.id === activeId || wf.steps[i + 1].id === activeId;
            const data = adjacentHasData.has(step.id);
            return (
              <line
                key={`seq-${step.id}`}
                x1={nodeX(i) + NODE_W + 4}
                y1={midY}
                x2={nodeX(i + 1) - 6}
                y2={midY}
                stroke={data ? (hot ? 'var(--color-neon-cyan)' : 'var(--color-line-strong)') : 'var(--color-line-strong)'}
                strokeWidth={data && hot ? 2.5 : 1.5}
                strokeDasharray={data ? undefined : '4 5'}
                className={data && hot ? 'edge-flow' : undefined}
                markerEnd={`url(#${data && hot ? 'wf-arrow' : 'wf-arrow-dim'})`}
              />
            );
          })}
          {/* data jumps over intermediate steps */}
          {edges
            .filter((e) => (index.get(e.to) ?? 0) - (index.get(e.from) ?? 0) > 1)
            .map((e) => {
              const a = index.get(e.from) ?? 0;
              const b = index.get(e.to) ?? 0;
              const depth = 18 + ARC_STEP * (b - a - 1);
              const x1 = nodeX(a) + NODE_W / 2;
              const x2 = nodeX(b) + NODE_W / 2 - 8;
              const hot = e.to === activeId || e.from === activeId;
              return (
                <path
                  key={`${e.from}-${e.to}`}
                  d={`M ${x1} ${arcBase} C ${x1} ${arcBase + depth * 1.6}, ${x2} ${arcBase + depth * 1.6}, ${x2} ${arcBase + 4}`}
                  fill="none"
                  stroke={hot ? 'var(--color-neon-violet)' : 'var(--color-line-strong)'}
                  strokeWidth={hot ? 2.2 : 1.3}
                  className={hot ? 'edge-flow' : undefined}
                  markerEnd={`url(#${hot ? 'wf-arrow' : 'wf-arrow-dim'})`}
                >
                  <title>{e.key}</title>
                </path>
              );
            })}
        </svg>

        {wf.steps.map((step, i) => {
          const active = step.id === activeId;
          const done = completed.has(step.id);
          const bot = step.botId ? bots[step.botId] : undefined;
          return (
            <button
              key={step.id}
              type="button"
              id={`node-${step.id}`}
              onClick={() => onSelect(step.id)}
              aria-pressed={active}
              aria-label={`Bước ${step.stepNumber}: ${step.title}`}
              className={`focus-ring absolute flex flex-col rounded-xl border p-3 text-left transition ${
                active
                  ? 'border-neon-cyan/70 bg-surface shadow-glow-cyan'
                  : 'border-line bg-surface/90 hover:border-line-strong hover:shadow-card'
              }`}
              style={{ left: nodeX(i), top: PAD, width: NODE_W, height: NODE_H }}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`grid size-6 place-items-center rounded-md font-mono text-[11px] font-bold ${
                      active ? 'bg-neon-cyan text-on-accent' : 'bg-overlay/[0.06] text-ink'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  {bot && (
                    <span className="text-lg leading-none" aria-hidden>
                      {bot.avatar}
                    </span>
                  )}
                </span>
                {done ? (
                  <CheckCircle2 className="size-4 text-neon-emerald" aria-label="Đã có kết quả" />
                ) : (
                  <span className="rounded bg-overlay/[0.05] px-1.5 py-0.5 text-[10px] text-faint">{outputFormatLabel(step.outputFormat)}</span>
                )}
              </span>
              <span className="mt-2 line-clamp-2 text-sm leading-snug font-semibold text-ink">{step.title}</span>
              <span className="mt-auto truncate text-[11px] text-muted">{step.agentRole}</span>
              <span className="truncate font-mono text-[10px] text-cyan-300">{step.targetModel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
