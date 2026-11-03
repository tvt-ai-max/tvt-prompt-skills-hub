'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { nextPreference, THEME_PREFERENCES } from '@/lib/theme';
import { useTranslation } from '@/components/I18nProvider';

const ICONS = { dark: Moon, light: Sun, system: Monitor } as const;

/** Cycling icon button (Dark → Light → System). Icon visibility is CSS-driven by data-theme-pref. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { preference, setPreference } = useTheme();
  const { t } = useTranslation();
  const next = nextPreference(preference);
  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      aria-label={t('theme.toggleAria', { current: t(`theme.${preference}`) })}
      title={t('theme.toggleTitle', { current: t(`theme.${preference}`), next: t(`theme.${next}`) })}
      className={`focus-ring relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-line text-muted transition hover:border-line-strong hover:text-ink ${className}`}
    >
      <Moon className="theme-icon theme-icon-dark size-[18px] text-violet-300" aria-hidden />
      <Sun className="theme-icon theme-icon-light size-[18px] text-amber-500" aria-hidden />
      <Monitor className="theme-icon theme-icon-system size-[18px] text-cyan-300" aria-hidden />
    </button>
  );
}

/** Explicit 3-way segmented control (used in the mobile drawer). */
export function ThemeSegmented() {
  const { preference, setPreference } = useTheme();
  const { t } = useTranslation();
  return (
    <div role="radiogroup" aria-label={t('theme.group')} className="grid grid-cols-3 gap-1 rounded-lg border border-line bg-overlay/[0.03] p-1">
      {THEME_PREFERENCES.map((pref) => {
        const Icon = ICONS[pref];
        const checked = preference === pref;
        return (
          <button
            key={pref}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => setPreference(pref)}
            className={`focus-ring inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium transition ${
              checked ? 'bg-surface-2 text-ink shadow-card' : 'text-muted hover:text-ink'
            }`}
          >
            <Icon className="size-3.5" aria-hidden />
            {t(`theme.${pref}`)}
          </button>
        );
      })}
    </div>
  );
}
