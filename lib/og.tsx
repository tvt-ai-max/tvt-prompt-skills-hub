import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import type { Tier } from '@/types/hub';

export const OG_SIZE = { width: 1200, height: 630 };

const FONT_DIR = join(process.cwd(), 'node_modules/@fontsource/inter/files');
/** Latin + Latin-ext + Vietnamese subsets so diacritics (ă, ơ, ư, ệ…) render instead of tofu. */
const FONT_FILES = [
  ['inter-latin-400-normal.woff', 400],
  ['inter-latin-ext-400-normal.woff', 400],
  ['inter-vietnamese-400-normal.woff', 400],
  ['inter-latin-700-normal.woff', 700],
  ['inter-latin-ext-700-normal.woff', 700],
  ['inter-vietnamese-700-normal.woff', 700],
] as const;

let fontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: 'normal' }[]> | undefined;
function loadFonts() {
  fontsPromise ??= Promise.all(
    FONT_FILES.map(async ([file, weight]) => ({ name: 'Inter', data: await readFile(join(FONT_DIR, file)), weight, style: 'normal' as const })),
  );
  return fontsPromise;
}

const TIER_COLORS: Record<Tier | 'hub', { accent: string; label: string }> = {
  prompt: { accent: '#06B6D4', label: 'PROMPT' },
  skill: { accent: '#10B981', label: 'AGENT SKILL' },
  boost: { accent: '#8B5CF6', label: 'BOOST' },
  hub: { accent: '#06B6D4', label: 'OPEN SOURCE' },
};

function clamp(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export async function renderOgCard(opts: {
  tier: Tier | 'hub';
  eyebrow: string;
  title: string;
  description: string;
  chips?: string[];
}) {
  const { accent, label } = TIER_COLORS[opts.tier];
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0A0F1E 0%, #0D1428 55%, #131B2E 100%)',
          color: '#F8FAFC',
          fontFamily: 'Inter',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${accent}55 0%, transparent 70%)`,
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              padding: '8px 18px',
              borderRadius: 9999,
              border: `2px solid ${accent}`,
              color: accent,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            {label}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#94A3B8' }}>{clamp(opts.eyebrow, 60)}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', fontSize: opts.title.length > 60 ? 54 : 66, fontWeight: 700, lineHeight: 1.1 }}>
            {clamp(opts.title, 95)}
          </div>
          <div style={{ display: 'flex', fontSize: 28, color: '#CBD5E1', lineHeight: 1.4 }}>{clamp(opts.description, 170)}</div>
          {opts.chips && opts.chips.length > 0 && (
            <div style={{ display: 'flex', gap: 12 }}>
              {opts.chips.slice(0, 4).map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: 'flex',
                    padding: '6px 14px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.06)',
                    fontSize: 22,
                    color: '#94A3B8',
                  }}
                >
                  #{clamp(chip, 22)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                width: 48,
                height: 48,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #06B6D4, #10B981 55%, #8B5CF6)',
                color: '#0A0F1E',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              T
            </div>
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 700 }}>TVT Intelligence Hub</div>
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#94A3B8' }}>Prompt · Skill · Boost — ChatGPT · Claude · Cursor · SKILL.md</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
