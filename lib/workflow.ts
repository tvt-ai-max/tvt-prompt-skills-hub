import type { WorkflowInput, WorkflowItem, WorkflowStep } from '@/types/hub';
import { VARIABLE_PATTERN } from '@/lib/variables';

/**
 * Workflow engine — pure functions shared by the UI (live piping simulator), the exporters
 * and the tests. A workflow is a DAG whose edges are `previous_step` inputs.
 */

export type StepOutputs = Record<string, string>;

/** Unique user inputs across all steps (first definition wins; defaults merged from any step). */
export function collectUserInputs(wf: WorkflowItem): WorkflowInput[] {
  const byKey = new Map<string, WorkflowInput>();
  for (const step of wf.steps) {
    for (const input of step.inputs) {
      if (input.source !== 'user_input') continue;
      const existing = byKey.get(input.key);
      if (!existing) byKey.set(input.key, { ...input });
      else if (existing.defaultValue === undefined && input.defaultValue !== undefined) existing.defaultValue = input.defaultValue;
    }
  }
  return [...byKey.values()];
}

export function defaultUserValues(wf: WorkflowItem): Record<string, string> {
  return Object.fromEntries(collectUserInputs(wf).map((i) => [i.key, i.defaultValue ?? '']));
}

export interface WorkflowEdge {
  from: string;
  to: string;
  key: string;
}

/** Data edges (deduplicated by from→to; keys joined). */
export function workflowEdges(wf: WorkflowItem): WorkflowEdge[] {
  const edges = new Map<string, WorkflowEdge>();
  for (const step of wf.steps) {
    for (const input of step.inputs) {
      if (input.source !== 'previous_step' || !input.fromStepId) continue;
      const id = `${input.fromStepId}->${step.id}`;
      const existing = edges.get(id);
      if (existing) existing.key = `${existing.key}, ${input.key}`;
      else edges.set(id, { from: input.fromStepId, to: step.id, key: input.key });
    }
  }
  return [...edges.values()];
}

export function stepById(wf: WorkflowItem, id: string): WorkflowStep | undefined {
  return wf.steps.find((s) => s.id === id);
}

export type StepToken =
  | { kind: 'text'; value: string }
  | { kind: 'user'; key: string; value: string }
  | { kind: 'user-empty'; key: string }
  | { kind: 'piped'; key: string; fromStepId: string; value: string }
  | { kind: 'piped-pending'; key: string; fromStepId: string; label: string };

/** Placeholder shown where a previous step's output will be pasted / piped. */
export function pipedPlaceholder(wf: WorkflowItem, fromStepId: string): string {
  const source = stepById(wf, fromStepId);
  return source ? `[[⟵ Kết quả Bước ${source.stepNumber}: ${source.title}]]` : `[[⟵ ${fromStepId}]]`;
}

/** Tokenizes a step template with user values and (optionally) real outputs from earlier steps. */
export function tokenizeStep(wf: WorkflowItem, step: WorkflowStep, values: Record<string, string>, outputs: StepOutputs = {}): StepToken[] {
  const inputs = new Map(step.inputs.map((i) => [i.key, i]));
  const tokens: StepToken[] = [];
  let cursor = 0;
  for (const match of step.promptTemplate.matchAll(VARIABLE_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) tokens.push({ kind: 'text', value: step.promptTemplate.slice(cursor, index) });
    const key = match[1];
    const input = inputs.get(key);
    if (input?.source === 'previous_step' && input.fromStepId) {
      const out = outputs[input.fromStepId]?.trim();
      tokens.push(
        out
          ? { kind: 'piped', key, fromStepId: input.fromStepId, value: out }
          : { kind: 'piped-pending', key, fromStepId: input.fromStepId, label: pipedPlaceholder(wf, input.fromStepId) },
      );
    } else {
      const value = values[key]?.trim();
      tokens.push(value ? { kind: 'user', key, value: values[key] } : { kind: 'user-empty', key });
    }
    cursor = index + match[0].length;
  }
  if (cursor < step.promptTemplate.length) tokens.push({ kind: 'text', value: step.promptTemplate.slice(cursor) });
  return tokens;
}

export function tokensToText(tokens: StepToken[]): string {
  return tokens
    .map((t) => {
      switch (t.kind) {
        case 'text':
          return t.value;
        case 'user':
        case 'piped':
          return t.value;
        case 'user-empty':
          return `{{${t.key}}}`;
        case 'piped-pending':
          return t.label;
      }
    })
    .join('');
}

export function renderStep(wf: WorkflowItem, step: WorkflowStep, values: Record<string, string>, outputs: StepOutputs = {}): string {
  return tokensToText(tokenizeStep(wf, step, values, outputs));
}

const FORMAT_LABEL: Record<WorkflowStep['outputFormat'], string> = {
  markdown: 'Markdown',
  json: 'JSON',
  image_prompt: 'Image prompt',
  code: 'Code',
};

export function outputFormatLabel(format: WorkflowStep['outputFormat']): string {
  return FORMAT_LABEL[format];
}

/** "Copy All Sequential Prompts" — numbered chain for Claude Projects / ChatGPT Canvas. */
export function buildSequentialPrompts(wf: WorkflowItem, values: Record<string, string>, outputs: StepOutputs = {}): string {
  const header = [
    `# ${wf.title}`,
    '',
    wf.summary,
    '',
    `> Cách dùng: chạy lần lượt từng bước trong cùng một dự án/hội thoại. Ở mỗi chỗ [[⟵ Kết quả Bước N]], dán kết quả thực tế của bước đó trước khi gửi.`,
    '',
  ];
  const body = wf.steps.map((step) =>
    [
      `---`,
      '',
      `## Bước ${step.stepNumber}/${wf.steps.length} — ${step.title}`,
      `**Agent:** ${step.agentRole} · **Model khuyến nghị:** ${step.targetModel} · **Đầu ra:** ${FORMAT_LABEL[step.outputFormat]}`,
      '',
      renderStep(wf, step, values, outputs).trim(),
      '',
      `**✅ Quality gate:** ${step.qualityGate}`,
      '',
    ].join('\n'),
  );
  return [...header, ...body].join('\n').trimEnd() + '\n';
}

// ───────────────────────────── n8n export ─────────────────────────────

/** Maps a human model label to a Claude API model id (non-Claude targets fall back to the default). */
export function claudeModelFor(targetModel: string): string {
  if (/haiku/i.test(targetModel)) return 'claude-haiku-5-5';
  if (/sonnet/i.test(targetModel)) return 'claude-sonnet-5-5';
  return 'claude-opus-5-5';
}

type N8nProvider = { type: string; typeVersion: number; parameters: Record<string, unknown>; label: string };

function n8nModelNode(targetModel: string): N8nProvider {
  if (/gemini/i.test(targetModel)) {
    return {
      type: '@n8n/n8n-nodes-langchain.lmChatGoogleGemini',
      typeVersion: 1,
      parameters: { modelName: 'models/gemini-2.5-flash', options: {} },
      label: 'Gemini',
    };
  }
  if (/deepseek/i.test(targetModel)) {
    return { type: '@n8n/n8n-nodes-langchain.lmChatDeepSeek', typeVersion: 1, parameters: { model: 'deepseek-chat', options: {} }, label: 'DeepSeek' };
  }
  return {
    type: '@n8n/n8n-nodes-langchain.lmChatAnthropic',
    typeVersion: 1.3,
    parameters: { model: { __rl: true, mode: 'id', value: claudeModelFor(targetModel) }, options: {} },
    label: 'Claude',
  };
}

/** Deterministic UUID-shaped id (stable exports, testable output). */
function stableId(seed: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < seed.length; i++) {
    h1 = Math.imul(h1 ^ seed.charCodeAt(i), 16777619) >>> 0;
    h2 = Math.imul(h2 + seed.charCodeAt(i), 2246822519) >>> 0;
  }
  const hex = (h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0')).repeat(2);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

export function n8nNodeName(step: WorkflowStep): string {
  return `B${step.stepNumber} · ${step.title}`.replace(/['"`\\]/g, '').slice(0, 60);
}

export const N8N_INPUTS_NODE = 'Workflow Inputs';

/** Converts a step template to an n8n expression string (leading "=" marks an expression field). */
export function toN8nExpression(wf: WorkflowItem, step: WorkflowStep): string {
  const inputs = new Map(step.inputs.map((i) => [i.key, i]));
  const text = step.promptTemplate.replace(VARIABLE_PATTERN, (_m, key: string) => {
    const input = inputs.get(key);
    if (input?.source === 'previous_step' && input.fromStepId) {
      const source = stepById(wf, input.fromStepId);
      return source ? `{{ $('${n8nNodeName(source)}').item.json.text }}` : `{{${key}}}`;
    }
    return `{{ $('${N8N_INPUTS_NODE}').item.json.${key} }}`;
  });
  return `=${text}`;
}

interface N8nNode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, unknown>;
}

export interface N8nWorkflow {
  name: string;
  nodes: N8nNode[];
  connections: Record<string, Record<string, { node: string; type: string; index: number }[][]>>;
  settings: Record<string, unknown>;
  pinData: Record<string, unknown>;
  meta: Record<string, unknown>;
}

/** "Export n8n Workflow JSON": Manual Trigger → Set (inputs) → one Basic LLM Chain per step with its chat model. */
export function buildN8nWorkflow(wf: WorkflowItem, values: Record<string, string> = defaultUserValues(wf)): N8nWorkflow {
  const nodes: N8nNode[] = [];
  const connections: N8nWorkflow['connections'] = {};
  const link = (from: string, to: string, type = 'main') => {
    connections[from] ??= {};
    connections[from][type] ??= [[]];
    connections[from][type][0].push({ node: to, type, index: 0 });
  };

  nodes.push({
    id: stableId(`${wf.id}:note`),
    name: 'Đọc trước khi chạy',
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position: [0, -260],
    parameters: {
      width: 520,
      height: 200,
      content: `## ${wf.title}\nXuất từ TVT Intelligence Hub. Gắn credential cho từng node model (Claude / Gemini / DeepSeek) sau khi import — file này không chứa API key. Kiểm tra model của từng node và quality gate của từng bước trước khi chạy thật.`,
    },
  });
  nodes.push({
    id: stableId(`${wf.id}:trigger`),
    name: 'Bắt đầu',
    type: 'n8n-nodes-base.manualTrigger',
    typeVersion: 1,
    position: [0, 0],
    parameters: {},
  });
  nodes.push({
    id: stableId(`${wf.id}:inputs`),
    name: N8N_INPUTS_NODE,
    type: 'n8n-nodes-base.set',
    typeVersion: 3.4,
    position: [240, 0],
    parameters: {
      assignments: {
        assignments: collectUserInputs(wf).map((input) => ({
          id: stableId(`${wf.id}:input:${input.key}`),
          name: input.key,
          value: values[input.key] ?? '',
          type: 'string',
        })),
      },
      options: {},
    },
  });
  link('Bắt đầu', N8N_INPUTS_NODE);

  let previous = N8N_INPUTS_NODE;
  wf.steps.forEach((step, i) => {
    const name = n8nNodeName(step);
    const x = 520 + i * 340;
    nodes.push({
      id: stableId(`${wf.id}:${step.id}`),
      name,
      type: '@n8n/n8n-nodes-langchain.chainLlm',
      typeVersion: 1.5,
      position: [x, 0],
      parameters: { promptType: 'define', text: toN8nExpression(wf, step), hasOutputParser: false },
    });
    const model = n8nModelNode(step.targetModel);
    const modelName = `${model.label} · B${step.stepNumber}`;
    nodes.push({
      id: stableId(`${wf.id}:${step.id}:model`),
      name: modelName,
      type: model.type,
      typeVersion: model.typeVersion,
      position: [x, 220],
      parameters: model.parameters,
    });
    link(previous, name);
    link(modelName, name, 'ai_languageModel');
    previous = name;
  });

  return {
    name: `TVT · ${wf.title}`.slice(0, 120),
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
    pinData: {},
    meta: { templateCredsSetupCompleted: false, source: 'tvt-intelligence-hub', workflowId: wf.id },
  };
}

// ───────────────────────────── Python CLI export ─────────────────────────────

function pyString(value: string): string {
  // JSON string literals are valid Python string literals for our content (no "\/" escapes emitted).
  return JSON.stringify(value);
}

/** "Export Python CLI Script": runs the chain with the Anthropic SDK, piping each output forward. */
export function buildPythonScript(wf: WorkflowItem, values: Record<string, string> = defaultUserValues(wf)): string {
  const userInputs = collectUserInputs(wf);
  const data = {
    id: wf.id,
    title: wf.title,
    steps: wf.steps.map((s) => ({
      id: s.id,
      number: s.stepNumber,
      title: s.title,
      agent: s.agentRole,
      target_model: s.targetModel,
      model: claudeModelFor(s.targetModel),
      output_format: s.outputFormat,
      quality_gate: s.qualityGate,
      template: s.promptTemplate,
      piped: Object.fromEntries(s.inputs.filter((i) => i.source === 'previous_step').map((i) => [i.key, i.fromStepId])),
    })),
  };
  const args = userInputs
    .map(
      (input) =>
        `    parser.add_argument(${pyString(`--${input.key}`)}, default=${pyString(values[input.key] ?? input.defaultValue ?? '')}, help=${pyString(input.label)})`,
    )
    .join('\n');

  return `#!/usr/bin/env python3
"""${wf.title.replace(/"/g, "'")}

Exported from TVT Intelligence Hub (workflow: ${wf.id}).
Runs the ${wf.steps.length}-step chain with Claude, piping each step's output into the next.

Setup:
    pip install -U anthropic
    export ANTHROPIC_API_KEY=...        # or: ant auth login  (never hard-code keys)

Usage:
    python ${wf.slug}.py --dry-run                 # print every rendered prompt, no API calls
    python ${wf.slug}.py --out ./runs/first-run    # run the whole chain
    python ${wf.slug}.py --help                    # list all input flags

Steps whose recommended model is not Claude (e.g. Gemini, Midjourney, DeepSeek) run on Claude by
default; the recommended model is printed for each step so you can route them yourself.
"""
import argparse
import json
import re
import sys
from pathlib import Path

WORKFLOW = json.loads(${pyString(JSON.stringify(data))})
VAR = re.compile(r"\\{\\{([a-zA-Z0-9_]+)\\}\\}")


def render(step, values, outputs):
    def sub(match):
        key = match.group(1)
        source = step["piped"].get(key)
        if source:
            return outputs.get(source, f"[[missing output of {source}]]")
        return values.get(key, match.group(0))

    return VAR.sub(sub, step["template"])


def run_step(client, model, prompt, effort, use_fallback):
    import anthropic

    kwargs = {
        "model": model,
        "max_tokens": 64000,
        "output_config": {"effort": effort},
        "messages": [{"role": "user", "content": prompt}],
    }
    if use_fallback and model != "claude-haiku-5-5":
        # Server-side refusal fallback: re-runs a declined request on Anthropic's recommended model.
        kwargs["betas"] = ["server-side-fallback-2026-07-01"]
        kwargs["fallbacks"] = "default"
    try:
        with client.beta.messages.stream(**kwargs) as stream:
            for text in stream.text_stream:
                print(text, end="", flush=True)
            message = stream.get_final_message()
    except anthropic.RateLimitError:
        sys.exit("Rate limited - wait a moment and re-run from this step.")
    except anthropic.APIStatusError as error:
        sys.exit(f"API error {error.status_code}: {error.message}")
    except anthropic.APIConnectionError:
        sys.exit("Network error - check your connection.")
    print()
    if message.stop_reason == "refusal":
        sys.exit("The model declined this step. Review the inputs and try again.")
    return "".join(block.text for block in message.content if block.type == "text")


def main():
    parser = argparse.ArgumentParser(description=WORKFLOW["title"])
${args}
    parser.add_argument("--model", default=None, help="Override the Claude model for every step (e.g. claude-opus-5-5)")
    parser.add_argument("--effort", default="high", choices=["low", "medium", "high", "xhigh", "max"])
    parser.add_argument("--out", default="./workflow-output", help="Directory for step outputs")
    parser.add_argument("--dry-run", action="store_true", help="Print rendered prompts without calling the API")
    parser.add_argument("--no-fallback", action="store_true", help="Disable server-side refusal fallback")
    args = parser.parse_args()

    values = {key: value for key, value in vars(args).items()}
    outputs = {}
    out_dir = Path(args.out)
    client = None
    if not args.dry_run:
        import anthropic

        client = anthropic.Anthropic()
        out_dir.mkdir(parents=True, exist_ok=True)

    total = len(WORKFLOW["steps"])
    for step in WORKFLOW["steps"]:
        model = args.model or step["model"]
        print(f"\\n=== Step {step['number']}/{total}: {step['title']} ({step['agent']}) ===")
        print(f"Recommended: {step['target_model']} | Running on: {model} | Output: {step['output_format']}")
        prompt = render(step, values, outputs)
        if args.dry_run:
            print(prompt)
            outputs[step["id"]] = f"[[output of step {step['number']}: {step['title']}]]"
        else:
            result = run_step(client, model, prompt, args.effort, not args.no_fallback)
            outputs[step["id"]] = result
            (out_dir / f"step-{step['number']:02d}-{step['id']}.md").write_text(result, encoding="utf-8")
        print(f"Quality gate: {step['quality_gate']}")

    if not args.dry_run:
        print(f"\\nDone. Outputs saved in {out_dir.resolve()}")


if __name__ == "__main__":
    main()
`;
}
