'use client';

import { Download } from 'lucide-react';
import { downloadText } from '@/lib/clipboard';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/components/I18nProvider';
import type { MessageKey } from '@/lib/i18n';

export function DownloadTextButton({
  filename,
  text,
  labelKey,
  mime,
  className = '',
}: {
  filename: string;
  text: string;
  labelKey: MessageKey;
  mime?: string;
  className?: string;
}) {
  const toast = useToast();
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={() => {
        downloadText(filename, text, mime);
        toast(t('common.downloaded', { file: filename }));
      }}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-overlay/[0.03] px-3 py-2 text-sm font-semibold whitespace-nowrap text-ink transition hover:border-line-strong ${className}`}
    >
      <Download className="size-4" aria-hidden />
      {t(labelKey)}
    </button>
  );
}
