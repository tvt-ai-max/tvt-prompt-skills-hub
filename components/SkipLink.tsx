'use client';

import { useTranslation } from '@/components/I18nProvider';

export function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-lg bg-neon-cyan px-3 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {t('nav.skipToContent')}
    </a>
  );
}
