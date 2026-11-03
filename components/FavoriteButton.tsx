'use client';

import { Star } from 'lucide-react';
import { useFavorites } from '@/components/useFavorites';
import { useToast } from '@/components/ToastProvider';

export function FavoriteButton({ id, title, className = '', withLabel = false }: { id: string; title: string; className?: string; withLabel?: boolean }) {
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const active = isFavorite(id);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Bỏ ${title} khỏi Yêu thích` : `Thêm ${title} vào Yêu thích`}
      title={active ? 'Bỏ ghim khỏi Yêu thích' : 'Ghim vào Yêu thích'}
      onClick={(event) => {
        event.stopPropagation();
        const nowActive = toggle(id);
        toast(nowActive ? 'Đã ghim vào ⭐ Yêu thích' : 'Đã bỏ khỏi Yêu thích');
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
      {withLabel && <span>{active ? 'Đã ghim' : 'Yêu thích'}</span>}
    </button>
  );
}
