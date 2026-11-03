'use client';

import { useTranslation } from '@/components/I18nProvider';
import { useToast } from '@/components/ToastProvider';
import { translate, type Locale } from '@/lib/i18n';

const OPTIONS: { locale: Locale; flag: string; code: string }[] = [
  { locale: 'vi', flag: '🇻🇳', code: 'VI' },
  { locale: 'en', flag: '🇬🇧', code: 'EN' },
];

/** Compact segmented badge: 🇻🇳 VI | 🇬🇧 EN */
/** `className` must include a display utility (default `inline-flex`), e.g. `hidden sm:inline-flex`. */
export function LanguageSwitcher({ className = 'inline-flex' }: { className?: string }) {
  const { locale, setLocale, t } = useTranslation();
  const toast = useToast();
  return (
    <div
      role="radiogroup"
      aria-label={t('lang.switchAria', { current: t(`lang.${locale}`) })}
      className={`h-10 shrink-0 items-center rounded-lg border border-line p-0.5 ${className}`}
    >
      {OPTIONS.map((option) => {
        const checked = option.locale === locale;
        return (
          <button
            key={option.locale}
            type="button"
            role="radio"
            aria-checked={checked}
            lang={option.locale}
            title={translate(option.locale, `lang.${option.locale}`)}
            onClick={() => {
              if (checked) return;
              setLocale(option.locale);
              toast(translate(option.locale, 'lang.changed'));
            }}
            className={`focus-ring inline-flex h-full items-center gap-1 rounded-md px-2 text-xs font-semibold whitespace-nowrap transition ${
              checked ? 'bg-surface-2 text-ink shadow-card' : 'text-muted hover:text-ink'
            }`}
          >
            <span aria-hidden>{option.flag}</span>
            {option.code}
          </button>
        );
      })}
    </div>
  );
}
