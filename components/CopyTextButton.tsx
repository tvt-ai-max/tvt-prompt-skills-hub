'use client';

import { Check, Copy } from 'lucide-react';
import { useCopy } from '@/components/useCopy';
import { useToast } from '@/components/ToastProvider';

/** One-click copy with ✓ state + toast. */
export function CopyTextButton({
  text,
  label,
  toastMessage,
  className = '',
  variant = 'primary',
}: {
  text: string;
  label: string;
  toastMessage: string;
  className?: string;
  variant?: 'primary' | 'ghost';
}) {
  const { copied, copy } = useCopy();
  const toast = useToast();
  const styles =
    variant === 'primary'
      ? 'bg-neon-cyan text-on-accent hover:brightness-110'
      : 'border border-line bg-overlay/[0.03] text-ink hover:border-line-strong';
  return (
    <button
      type="button"
      onClick={async (event) => {
        event.stopPropagation();
        toast((await copy('copy', text)) ? toastMessage : 'Trình duyệt chặn clipboard — hãy copy thủ công');
      }}
      className={`focus-ring relative z-10 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap transition ${styles} ${className}`}
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      {copied ? 'Đã copy!' : label}
    </button>
  );
}
