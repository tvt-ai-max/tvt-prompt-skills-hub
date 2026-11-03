'use client';

import { useEffect, useRef } from 'react';
import { Bot, ExternalLink, GitPullRequest, Sparkles, Workflow, X } from 'lucide-react';
import { GithubMark } from '@/components/Badges';
import { useDialog } from '@/components/useDialog';
import { REPO_URL } from '@/lib/site';
import { useTranslation } from '@/components/I18nProvider';
import type { MessageKey } from '@/lib/i18n';

const TEMPLATES = [
  {
    Icon: Sparkles,
    title: 'contribute.promptTitle',
    body: 'contribute.promptBody',
    href: `${REPO_URL}/issues/new?template=new-prompt.yml`,
    tone: 'text-cyan-300',
  },
  {
    Icon: Bot,
    title: 'contribute.skillTitle',
    body: 'contribute.skillBody',
    href: `${REPO_URL}/issues/new?template=new-skill.yml`,
    tone: 'text-emerald-300',
  },
  {
    Icon: Workflow,
    title: 'contribute.workflowTitle',
    body: 'contribute.workflowBody',
    href: `${REPO_URL}/issues/new?template=new-workflow.yml`,
    tone: 'text-amber-500',
  },
] as const satisfies readonly { title: MessageKey; body: MessageKey; [k: string]: unknown }[];

const STEPS = ['contribute.step1', 'contribute.step2', 'contribute.step3', 'contribute.step4'] as const;

export function ContributeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useDialog(open, onClose);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:px-4" role="presentation">
      <div className="absolute inset-0 animate-fade-in bg-scrim backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contribute-title"
        className="scrollbar-thin relative max-h-[92dvh] w-full max-w-2xl animate-pop-in overflow-y-auto rounded-t-2xl border border-line-strong bg-space p-5 shadow-2xl sm:rounded-2xl sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-emerald-300 uppercase">
              <GitPullRequest className="size-3.5" aria-hidden /> {t('contribute.eyebrow')}
            </p>
            <h2 id="contribute-title" className="mt-1 text-xl font-bold tracking-tight">
              {t('contribute.title')}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {t('contribute.lead')}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="focus-ring rounded-md p-2 text-muted transition hover:bg-overlay/5 hover:text-ink"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {TEMPLATES.map(({ Icon, title, body, href, tone }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="focus-ring surface-card group flex flex-col gap-1.5 rounded-xl p-3 transition hover:border-line-strong"
            >
              <Icon className={`size-5 ${tone}`} aria-hidden />
              <span className="flex items-center gap-1 text-sm font-semibold text-ink">
                {t(title)} <ExternalLink className="size-3 text-faint" aria-hidden />
              </span>
              <span className="text-xs leading-relaxed text-muted">{t(body)}</span>
            </a>
          ))}
        </div>

        <h3 className="mt-6 mb-2 text-sm font-semibold text-ink">{t('contribute.viaPr')}</h3>
        <ol className="space-y-2">
          {STEPS.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-muted">
              <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line font-mono text-xs text-ink">{i + 1}</span>
              <span className="pt-0.5">{t(step)}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a
            href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-neon-cyan px-4 text-sm font-semibold text-on-accent transition hover:brightness-110"
          >
            {t('contribute.readGuide')}
          </a>
          <a
            href={`${REPO_URL}/fork`}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-ink transition hover:border-line-strong"
          >
            <GithubMark className="size-4" /> {t('contribute.fork')}
          </a>
        </div>
      </div>
    </div>
  );
}
