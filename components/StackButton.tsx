'use client';

import { Layers, Check } from 'lucide-react';
import { useStack } from '@/components/useStack';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/components/I18nProvider';

export function StackButton({
  id,
  title,
  className = '',
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const { isInStack, toggle } = useStack();
  const toast = useToast();
  const { locale } = useTranslation();
  const active = isInStack(id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggle(id);
    const msg = added
      ? locale === 'vi'
        ? `Đã thêm "${title}" vào Bộ Ghép (Stack)`
        : `Added "${title}" to your Stack`
      : locale === 'vi'
        ? `Đã bỏ "${title}" khỏi Bộ Ghép`
        : `Removed "${title}" from your Stack`;
    toast(msg);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? 'Xóa khỏi Stack' : 'Thêm vào Stack'}
      title={active ? 'Đã thêm vào Stack (Bấm để gỡ)' : 'Thêm vào Stack dự án'}
      className={`focus-ring rounded-lg border p-2 transition ${
        active
          ? 'border-neon-cyan/60 bg-neon-cyan/15 text-neon-cyan'
          : 'border-line bg-space/60 text-muted hover:border-line-strong hover:text-ink'
      } ${className}`}
    >
      {active ? <Check className="size-4" aria-hidden /> : <Layers className="size-4" aria-hidden />}
    </button>
  );
}
