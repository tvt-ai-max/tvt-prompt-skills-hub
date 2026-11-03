'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { Bot, Check, Code2, Copy, Eye, FileDown, Link2, MessageSquare, RotateCcw, Braces, CircleAlert, Eraser } from 'lucide-react';
import type { CopyTarget, HubItem, PromptVariable } from '@/types/hub';
import { buildWorkbenchModel, initialValues, parseTemplate, unfilledKeys } from '@/lib/variables';
import { renderMarked, stripMarkers, tokenizePreview } from '@/lib/highlight';
import { COPY_TARGETS } from '@/lib/exporters';
import { downloadText } from '@/lib/clipboard';
import { useCopy } from '@/components/useCopy';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/components/I18nProvider';
import { buildDirectLink, parseDirectLink } from '@/lib/share';

const TARGET_ICONS = { chat: MessageSquare, cursor: Code2, skill: Bot } as const;
const TARGET_ORDER: CopyTarget[] = ['chat', 'cursor', 'skill'];

function estimateTokens(text: string) {
  // Rough heuristic: ~4 chars/token for latin text, Vietnamese diacritics push it lower.
  return Math.max(1, Math.round(text.length / 3.6));
}

function VariableField({
  variable,
  value,
  inputId,
  onChange,
}: {
  variable: PromptVariable;
  value: string;
  inputId: string;
  onChange: (value: string) => void;
}) {
  const { t } = useTranslation();
  const common = {
    id: inputId,
    value,
    placeholder: variable.placeholder ?? variable.defaultValue ?? t('workbench.placeholder', { label: variable.label.toLowerCase() }),
    onChange: (e: { target: { value: string } }) => onChange(e.target.value),
    className: 'field',
  };
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">{variable.label}</span>
        <code className="shrink-0 font-mono text-[11px] text-cyan-300/80">{`{{${variable.key}}}`}</code>
      </label>
      {variable.type === 'select' && variable.options ? (
        <select {...common} className="field appearance-none bg-[length:12px] pr-8">
          {variable.options.map((option) => (
            <option key={option} value={option} className="bg-surface">
              {option}
            </option>
          ))}
        </select>
      ) : variable.type === 'textarea' ? (
        <textarea {...common} rows={value.length > 160 ? 6 : 3} className="field scrollbar-thin resize-y leading-relaxed" />
      ) : (
        <input {...common} type="text" autoComplete="off" />
      )}
    </div>
  );
}

export function VariableWorkbench({
  item,
  compact = false,
  syncFromUrl = false,
}: {
  item: HubItem;
  compact?: boolean;
  /** Pre-fill values from `?KEY=value` query params (direct links). */
  syncFromUrl?: boolean;
}) {
  const model = useMemo(() => buildWorkbenchModel(item), [item]);
  const defaults = useMemo(() => initialValues(model.variables), [model.variables]);
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [target, setTarget] = useState<CopyTarget>('chat');
  const [view, setView] = useState<'preview' | 'template'>('preview');
  const { copied, copy } = useCopy();
  const toast = useToast();
  const { t, locale } = useTranslation();
  const numberLocale = locale === 'vi' ? 'vi-VN' : 'en-US';
  const baseId = useId();

  useEffect(() => {
    if (!syncFromUrl) return;
    const fromUrl = parseDirectLink(window.location.search, model.variables.map((v) => v.key));
    if (Object.keys(fromUrl).length) {
      setValues((prev) => ({ ...prev, ...fromUrl }));
      toast(t('workbench.prefilled'));
    }
  }, [syncFromUrl, model.variables, toast, t]);

  const copyWithToast = async (id: string, text: string, message: string) => {
    const ok = await copy(id, text);
    toast(ok ? message : t('common.clipboardBlocked'));
  };

  const marked = useMemo(() => renderMarked(model.template, values), [model.template, values]);
  const outputs = useMemo(() => {
    const result = {} as Record<CopyTarget, { marked: string; clean: string }>;
    for (const key of TARGET_ORDER) {
      const markedOut = COPY_TARGETS[key].build(item, marked);
      result[key] = { marked: markedOut, clean: stripMarkers(markedOut) };
    }
    return result;
  }, [item, marked]);

  const missing = unfilledKeys(model.variables, values);
  const active = outputs[target];
  const tokens = view === 'preview' ? tokenizePreview(active.marked) : null;
  const templateSegments = view === 'template' ? parseTemplate(model.template) : null;
  const fieldId = (key: string) => `${baseId}-${key}`;

  const focusField = (key: string) => {
    const el = document.getElementById(fieldId(key));
    if (el) {
      el.focus();
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  const skillFilename = `${item.id}.SKILL.md`;

  return (
    <div className={`grid gap-5 ${compact ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]' : 'lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]'}`}>
      {/* ── Variables form ── */}
      <section aria-labelledby={`${baseId}-vars`} className="min-w-0 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 id={`${baseId}-vars`} className="flex items-center gap-2 text-sm font-semibold tracking-wide text-muted uppercase">
            <Braces className="size-4 text-neon-cyan" aria-hidden />
            {t('workbench.variables', { count: model.variables.length })}
          </h3>
          {model.variables.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setValues(defaults)}
                title={t('workbench.restoreTitle')}
                className="focus-ring inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted transition hover:bg-overlay/5 hover:text-ink"
              >
                <RotateCcw className="size-3.5" aria-hidden />
                {t('common.defaults')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setValues(Object.fromEntries(model.variables.map((v) => [v.key, ''])));
                  document.getElementById(fieldId(model.variables[0].key))?.focus();
                }}
                title={t('workbench.clearTitle')}
                className="focus-ring inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted transition hover:bg-overlay/5 hover:text-ink"
              >
                <Eraser className="size-3.5" aria-hidden />
                {t('workbench.clear')}
              </button>
            </div>
          )}
        </div>

        {model.variables.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line p-4 text-sm text-muted">
            {t('workbench.noVars')}
          </p>
        ) : (
          <div className="space-y-4">
            {model.variables.map((variable) => (
              <VariableField
                key={variable.key}
                variable={variable}
                inputId={fieldId(variable.key)}
                value={values[variable.key] ?? ''}
                onChange={(value) => setValues((prev) => ({ ...prev, [variable.key]: value }))}
              />
            ))}
          </div>
        )}

        {missing.length > 0 && (
          <p className="flex items-start gap-2 rounded-lg border border-neon-amber/30 bg-neon-amber/10 px-3 py-2 text-xs text-amber-200" role="status">
            <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            {t('workbench.missing', { count: missing.length })}
          </p>
        )}
      </section>

      {/* ── Live preview + export ── */}
      <section aria-label={t('workbench.livePreview')} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-space-deep/70">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2">
          <div role="tablist" aria-label={t('workbench.formatsAria')} className="flex rounded-lg bg-overlay/[0.04] p-0.5">
            {TARGET_ORDER.map((key) => {
              const Icon = TARGET_ICONS[key];
              const selected = target === key;
              return (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setTarget(key)}
                  className={`focus-ring inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    selected ? 'bg-surface-2 text-ink shadow-sm' : 'text-muted hover:text-ink'
                  }`}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {COPY_TARGETS[key].label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setView((v) => (v === 'preview' ? 'template' : 'preview'))}
            className="focus-ring inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted transition hover:bg-overlay/5 hover:text-ink"
            aria-pressed={view === 'template'}
          >
            {view === 'preview' ? <Braces className="size-3.5" aria-hidden /> : <Eye className="size-3.5" aria-hidden />}
            {view === 'preview' ? t('workbench.showTemplate') : t('workbench.showPreview')}
          </button>
        </div>

        <pre
          className={`scrollbar-thin overflow-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed break-words whitespace-pre-wrap text-slate-200 ${
            compact ? 'max-h-[46vh] min-h-56' : 'max-h-[70vh] min-h-72'
          }`}
          aria-live="polite"
        >
          {tokens?.map((token, i) =>
            token.kind === 'text' ? (
              <span key={i}>{token.value}</span>
            ) : token.kind === 'filled' ? (
              <mark
                key={i}
                title={`{{${token.key}}}`}
                onClick={() => focusField(token.key)}
                className="cursor-pointer rounded bg-neon-emerald/15 px-0.5 text-emerald-200 ring-1 ring-neon-emerald/25 transition hover:bg-neon-emerald/25"
              >
                {token.value}
              </mark>
            ) : (
              <mark
                key={i}
                onClick={() => focusField(token.key)}
                className="cursor-pointer rounded bg-neon-amber/15 px-0.5 text-amber-200 ring-1 ring-neon-amber/30"
              >{`{{${token.key}}}`}</mark>
            ),
          )}
          {templateSegments?.map((segment, i) =>
            segment.kind === 'text' ? (
              <span key={i}>{segment.value}</span>
            ) : (
              <mark key={i} className="rounded bg-neon-cyan/15 px-0.5 text-cyan-200 ring-1 ring-neon-cyan/30">{`{{${segment.key}}}`}</mark>
            ),
          )}
        </pre>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-3 py-2 text-[11px] text-faint">
          <span>
            {t('workbench.stats', { chars: active.clean.length.toLocaleString(numberLocale), tokens: estimateTokens(active.clean).toLocaleString(numberLocale) })}
          </span>
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-sm bg-neon-emerald/60" /> {t('workbench.filled')}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-sm bg-neon-amber/60" /> {t('workbench.empty')}
            </span>
          </span>
        </div>

        <div className="grid gap-2 border-t border-line p-3 sm:grid-cols-2 xl:grid-cols-4">
          <button
            type="button"
            onClick={() => copyWithToast('chat', outputs.chat.clean, t('workbench.copiedChat'))}
            aria-label={t('workbench.copyChatAria')}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-neon-cyan px-3 py-2.5 text-sm font-semibold whitespace-nowrap text-on-accent transition hover:brightness-110"
          >
            {copied === 'chat' ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied === 'chat' ? t('common.copied') : 'ChatGPT / Claude'}
          </button>
          <button
            type="button"
            onClick={() => copyWithToast('cursor', outputs.cursor.clean, t('workbench.copiedCursor'))}
            aria-label={t('workbench.copyCursorAria')}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-neon-violet/40 bg-neon-violet/15 px-3 py-2.5 text-sm font-semibold whitespace-nowrap text-violet-100 transition hover:bg-neon-violet/25"
          >
            {copied === 'cursor' ? <Check className="size-4" aria-hidden /> : <Code2 className="size-4" aria-hidden />}
            {copied === 'cursor' ? t('common.copied') : '.cursorrules'}
          </button>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => {
                downloadText(skillFilename, outputs.skill.clean);
                toast(t('common.downloaded', { file: skillFilename }));
              }}
              aria-label={t('workbench.exportSkillAria')}
              className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-l-lg border border-neon-emerald/40 bg-neon-emerald/15 px-3 py-2.5 text-sm font-semibold whitespace-nowrap text-emerald-100 transition hover:bg-neon-emerald/25"
            >
              <FileDown className="size-4" aria-hidden />
              SKILL.md
            </button>
            <button
              type="button"
              onClick={() => copyWithToast('skill', outputs.skill.clean, t('workbench.copiedSkill'))}
              aria-label={t('workbench.copySkillAria')}
              title={t('workbench.copySkillAria')}
              className="focus-ring inline-flex items-center justify-center rounded-r-lg border border-neon-emerald/40 bg-neon-emerald/15 px-3 text-emerald-100 transition hover:bg-neon-emerald/25"
            >
              {copied === 'skill' ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            </button>
          </div>
          <button
            type="button"
            onClick={() =>
              copyWithToast('link', buildDirectLink(item.id, values, defaults, window.location.origin), t('workbench.copiedLink'))
            }
            aria-label={t('workbench.directLinkAria')}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-overlay/[0.03] px-3 py-2.5 text-sm font-semibold whitespace-nowrap text-ink transition hover:border-line-strong"
          >
            {copied === 'link' ? <Check className="size-4" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
            {t('workbench.directLink')}
          </button>
        </div>
      </section>
    </div>
  );
}
