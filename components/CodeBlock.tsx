'use client';

import { Check, Copy } from 'lucide-react';
import { useCopy } from '@/components/useCopy';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/components/I18nProvider';

export function CodeBlock({ code, title, language }: { code: string; title?: string; language?: string }) {
  const { copied, copy } = useCopy();
  const toast = useToast();
  const { t } = useTranslation();
  return (
    <figure className="my-4 overflow-hidden rounded-xl border border-line bg-space-deep/80">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-3 py-1.5">
        <span className="truncate font-mono text-[11px] text-faint">
          {title}
          {language && !title ? language : ''}
        </span>
        <button
          type="button"
          onClick={async () => toast((await copy('code', code)) ? t('docs.copiedSnippet') : t('common.clipboardBlocked'))}
          className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2 py-1 text-xs text-ink transition hover:border-line-strong"
        >
          {copied ? <Check className="size-3.5 text-neon-emerald" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
          {copied ? t('common.copied') : t('docs.copy')}
        </button>
      </figcaption>
      <pre className="scrollbar-thin overflow-x-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
