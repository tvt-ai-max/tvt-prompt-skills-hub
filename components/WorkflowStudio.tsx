'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  ClipboardList,
  FileCode,
  FileJson,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  Workflow as WorkflowIcon,
} from 'lucide-react';
import type { WorkflowInput, WorkflowItem } from '@/types/hub';
import {
  buildN8nWorkflow,
  buildPythonScript,
  buildSequentialPrompts,
  collectUserInputs,
  defaultUserValues,
  outputFormatLabel,
  renderStep,
  stepById,
  tokenizeStep,
  type StepOutputs,
} from '@/lib/workflow';
import { downloadText } from '@/lib/clipboard';
import { useCopy } from '@/components/useCopy';
import { useToast } from '@/components/ToastProvider';
import { WorkflowCanvas, type BotGlyphs } from '@/components/WorkflowCanvas';

function InputField({ input, value, onChange, usedIn }: { input: WorkflowInput; value: string; onChange: (v: string) => void; usedIn: number[] }) {
  const id = `wf-input-${input.key}`;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">{input.label}</span>
        <code className="shrink-0 font-mono text-[11px] text-emerald-300">{`{{${input.key}}}`}</code>
      </label>
      {input.type === 'select' && input.options ? (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field">
          {input.options.map((o) => (
            <option key={o} value={o} className="bg-surface">
              {o}
            </option>
          ))}
        </select>
      ) : input.type === 'textarea' ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="field scrollbar-thin resize-y leading-relaxed" />
      ) : (
        <input id={id} type="text" value={value} onChange={(e) => onChange(e.target.value)} autoComplete="off" className="field" placeholder={input.placeholder} />
      )}
      <p className="text-[11px] text-faint">Dùng ở bước {usedIn.join(', ')}</p>
    </div>
  );
}

export function WorkflowStudio({ wf, bots }: { wf: WorkflowItem; bots: BotGlyphs }) {
  const userInputs = useMemo(() => collectUserInputs(wf), [wf]);
  const defaults = useMemo(() => defaultUserValues(wf), [wf]);
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [outputs, setOutputs] = useState<StepOutputs>({});
  const [activeId, setActiveId] = useState(wf.steps[0].id);
  const { copied, copy } = useCopy();
  const toast = useToast();

  const active = stepById(wf, activeId) ?? wf.steps[0];
  const activeIndex = wf.steps.indexOf(active);
  const tokens = tokenizeStep(wf, active, values, outputs);
  const completed = useMemo(() => new Set(Object.keys(outputs).filter((k) => outputs[k].trim())), [outputs]);
  const consumers = wf.steps.filter((s) => s.inputs.some((i) => i.source === 'previous_step' && i.fromStepId === active.id));
  const usedIn = (key: string) => wf.steps.filter((s) => s.inputs.some((i) => i.source === 'user_input' && i.key === key)).map((s) => s.stepNumber);

  const select = (id: string) => {
    setActiveId(id);
    document.getElementById(`node-${id}`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

  const copyWithToast = async (key: string, text: string, message: string) => {
    toast((await copy(key, text)) ? message : 'Trình duyệt chặn clipboard — hãy copy thủ công');
  };

  return (
    <div className="space-y-6">
      {/* ── Export bar ── */}
      <div className="grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => copyWithToast('all', buildSequentialPrompts(wf, values, outputs), `Đã copy chuỗi ${wf.steps.length} prompt`)}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-neon-cyan px-4 py-3 text-sm font-semibold text-on-accent transition hover:brightness-110"
        >
          <ClipboardList className="size-4" aria-hidden />
          {copied === 'all' ? 'Đã copy!' : 'Copy All Sequential Prompts'}
        </button>
        <button
          type="button"
          onClick={() => {
            downloadText(`${wf.slug}.n8n.json`, JSON.stringify(buildN8nWorkflow(wf, values), null, 2), 'application/json');
            toast(`Đã tải ${wf.slug}.n8n.json — import vào n8n rồi gắn credential`);
          }}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-neon-violet/40 bg-neon-violet/15 px-4 py-3 text-sm font-semibold text-violet-100 transition hover:bg-neon-violet/25"
        >
          <FileJson className="size-4" aria-hidden />
          Export n8n Workflow JSON
        </button>
        <button
          type="button"
          onClick={() => {
            downloadText(`${wf.slug}.py`, buildPythonScript(wf, values), 'text/x-python');
            toast(`Đã tải ${wf.slug}.py — chạy thử với --dry-run`);
          }}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-neon-emerald/40 bg-neon-emerald/15 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-neon-emerald/25"
        >
          <FileCode className="size-4" aria-hidden />
          Export Python CLI Script
        </button>
      </div>

      {/* ── Node canvas ── */}
      <WorkflowCanvas wf={wf} activeId={active.id} onSelect={select} completed={completed} bots={bots} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        {/* ── Live piping simulator ── */}
        <section aria-labelledby="sim-title" className="surface-card h-fit space-y-4 rounded-2xl p-5 lg:sticky lg:top-20">
          <div className="flex items-center justify-between gap-2">
            <h2 id="sim-title" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-muted uppercase">
              <SlidersHorizontal className="size-4 text-neon-emerald" aria-hidden />
              Đầu vào ({userInputs.length})
            </h2>
            <button
              type="button"
              onClick={() => setValues(defaults)}
              className="focus-ring inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted transition hover:bg-overlay/5 hover:text-ink"
            >
              <RotateCcw className="size-3.5" aria-hidden /> Mặc định
            </button>
          </div>
          <p className="text-xs leading-relaxed text-muted">Nhập một lần — giá trị tự động chảy vào mọi bước sử dụng biến đó.</p>
          {userInputs.map((input) => (
            <InputField
              key={input.key}
              input={input}
              value={values[input.key] ?? ''}
              usedIn={usedIn(input.key)}
              onChange={(v) => setValues((prev) => ({ ...prev, [input.key]: v }))}
            />
          ))}
          <div className="flex flex-wrap gap-3 border-t border-line pt-3 text-[11px] text-faint">
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-sm bg-neon-emerald/60" /> từ bạn
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-sm bg-neon-cyan/60" /> kết quả bước trước
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-sm bg-neon-violet/60" /> chờ kết quả
            </span>
          </div>
        </section>

        {/* ── Active step ── */}
        <section aria-labelledby="step-title" id={active.id} className="min-w-0 space-y-4">
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-xs text-cyan-300">
                Bước {active.stepNumber}/{wf.steps.length} · {outputFormatLabel(active.outputFormat)}
              </p>
              <h2 id="step-title" className="mt-1 text-xl font-bold tracking-tight">
                {active.title}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <UserRound className="size-3.5" aria-hidden />
                  {active.botId ? (
                    <Link href={`/bots/${active.botId}`} className="text-ink underline-offset-2 hover:underline">
                      {active.botId && bots[active.botId] ? `${bots[active.botId].avatar} ` : ''}
                      {active.agentRole}
                    </Link>
                  ) : (
                    active.agentRole
                  )}
                </span>
                <span className="font-mono text-xs text-cyan-300">{active.targetModel}</span>
              </p>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => select(wf.steps[activeIndex - 1].id)}
                aria-label="Bước trước"
                className="focus-ring rounded-lg border border-line p-2 text-muted transition hover:text-ink disabled:opacity-40"
              >
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                disabled={activeIndex === wf.steps.length - 1}
                onClick={() => select(wf.steps[activeIndex + 1].id)}
                aria-label="Bước sau"
                className="focus-ring rounded-lg border border-line p-2 text-muted transition hover:text-ink disabled:opacity-40"
              >
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </header>

          <div className="flex flex-wrap gap-1.5" aria-label="Nguồn dữ liệu của bước">
            {active.inputs.map((input) =>
              input.source === 'previous_step' && input.fromStepId ? (
                <button
                  key={input.key}
                  type="button"
                  onClick={() => select(input.fromStepId!)}
                  className="focus-ring inline-flex items-center gap-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2.5 py-1 text-xs text-cyan-200 transition hover:bg-neon-cyan/20"
                >
                  <WorkflowIcon className="size-3" aria-hidden />⟵ B{stepById(wf, input.fromStepId)?.stepNumber}: {input.label}
                </button>
              ) : (
                <span key={input.key} className="inline-flex items-center gap-1 rounded-full border border-neon-emerald/30 bg-neon-emerald/10 px-2.5 py-1 text-xs text-emerald-200">
                  <Braces className="size-3" aria-hidden />
                  {input.label}
                </span>
              ),
            )}
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-space-deep/70">
            <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
              <span className="text-xs font-semibold text-muted">Prompt đã nối biến (live)</span>
              <button
                type="button"
                onClick={() => copyWithToast('step', renderStep(wf, active, values, outputs), `Đã copy prompt bước ${active.stepNumber}`)}
                className="focus-ring inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 text-xs text-ink transition hover:border-line-strong"
              >
                {copied === 'step' ? 'Đã copy!' : 'Copy bước này'}
              </button>
            </div>
            <pre className="scrollbar-thin max-h-[52vh] overflow-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed break-words whitespace-pre-wrap text-slate-200" aria-live="polite">
              {tokens.map((t, i) => {
                switch (t.kind) {
                  case 'text':
                    return <span key={i}>{t.value}</span>;
                  case 'user':
                    return (
                      <mark key={i} title={`{{${t.key}}}`} className="rounded bg-neon-emerald/15 px-0.5 text-emerald-200 ring-1 ring-neon-emerald/25">
                        {t.value}
                      </mark>
                    );
                  case 'user-empty':
                    return <mark key={i} className="rounded bg-neon-amber/15 px-0.5 text-amber-200 ring-1 ring-neon-amber/30">{`{{${t.key}}}`}</mark>;
                  case 'piped':
                    return (
                      <mark key={i} title={`{{${t.key}}}`} className="rounded bg-neon-cyan/12 px-0.5 text-cyan-200 ring-1 ring-neon-cyan/25">
                        {t.value}
                      </mark>
                    );
                  case 'piped-pending':
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => select(t.fromStepId)}
                        className="rounded border border-dashed border-neon-violet/50 bg-neon-violet/10 px-1 text-left text-violet-200"
                      >
                        {t.label}
                      </button>
                    );
                }
              })}
            </pre>
          </div>

          <div className="flex gap-3 rounded-xl border border-neon-emerald/25 bg-neon-emerald/5 px-4 py-3 text-sm">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-neon-emerald" aria-hidden />
            <p>
              <span className="font-semibold text-ink">Quality gate: </span>
              <span className="text-muted">{active.qualityGate}</span>
            </p>
          </div>

          {consumers.length > 0 && (
            <div className="space-y-1.5">
              <label htmlFor={`out-${active.id}`} className="text-sm font-medium text-ink">
                Kết quả thực tế của bước này <span className="font-normal text-faint">(tuỳ chọn)</span>
              </label>
              <textarea
                id={`out-${active.id}`}
                value={outputs[active.id] ?? ''}
                onChange={(e) => setOutputs((prev) => ({ ...prev, [active.id]: e.target.value }))}
                rows={4}
                placeholder="Dán đầu ra từ Claude / ChatGPT tại đây…"
                className="field scrollbar-thin resize-y leading-relaxed"
              />
              <p className="text-[11px] text-faint">
                Tự động nối vào {consumers.map((c) => `B${c.stepNumber}`).join(', ')} — và vào các bản xuất bên trên.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
