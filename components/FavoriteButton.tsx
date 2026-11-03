'use client';

import { Star } from 'lucide-react';
import { useFavorites } from '@/components/useFavorites';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/components/I18nProvider';

export function FavoriteButton({ id, title, className = '', withLabel = false }: { id: string; title: string; className?: string; withLabel?: boolean }) {
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const { t } = useTranslation();
  const active = isFavorite(id);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? t('fav.remove', { title }) : t('fav.add', { title })}
      title={active ? t('fav.unpinTitle') : t('fav.pinTitle')}
      onClick={(event) => {
        event.stopPropagation();
        const nowActive = toggle(id);
        toast(nowActive ? t('fav.pinned') : t('fav.unpinned'));
      }}
      className={`focus-ring group/star inline-flex items-center justify-center gap-1.5 rounded-lg border transition ${
        active
          ? 'border-neon-amber/40 bg-neon-amber/10 text-amber-500'
          : 'border-line bg-space/60 text-muted hover:border-line-strong hover:text-ink'
      } ${withLabel ? 'h-9 px-3 text-sm' : 'p-2'} ${className}`}
    >
      <Star
        className={`size-4 transition-transform duration-300 group-active/star:scale-75 ${active ? 'fill-current' : ''}`}
        aria-hidden
      />
      {withLabel && <span>{active ? t('fav.labelOn') : t('fav.labelOff')}</span>}
    </button>
  );
}
