'use client';

import { GitPullRequest } from 'lucide-react';
import { useHub } from '@/components/HubProvider';
import { useTranslation } from '@/components/I18nProvider';

export function ContributeButton({ className = '' }: { className?: string }) {
  const { openContribute } = useHub();
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={openContribute}
      className={`focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-neon-emerald/40 bg-neon-emerald/10 px-5 text-sm font-semibold text-emerald-200 transition hover:bg-neon-emerald/20 ${className}`}
    >
      <GitPullRequest className="size-4" aria-hidden /> {t('nav.contributeLong')}
    </button>
  );
}
