import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { WorkflowItem } from '../types/hub';
import { checkV3Links, validateBot, validateWorkflow } from './schema';
import { loadContent } from './loader';
import {
  buildN8nWorkflow,
  buildPythonScript,
  buildSequentialPrompts,
  claudeModelFor,
  collectUserInputs,
  defaultUserValues,
  renderStep,
  tokenizeStep,
  workflowEdges,
} from './workflow';

const wf = (): WorkflowItem => ({
  id: 'wf-demo',
  slug: 'demo',
  title: 'Demo pipeline',
  summary: 'Research then write.',
  category: 'marketing',
  difficulty: 'Beginner',
  estimatedTime: '5 phút',
  estimatedCost: '≈ 0,1 USD',
  persona: 'tvt-agency',
  tags: ['Demo'],
  author: 'TVT',
  createdAt: '2026-11-03',
  steps: [
    {
      stepNumber: 1,
      id: 'step-1-research',
      title: 'Research',
      agentRole: 'Scout (Deep Research)',
      botId: 'scout',
      targetModel: 'Gemini 2.5 Flash',
      inputs: [{ key: 'TOPIC', label: 'Chủ đề', source: 'user_input', defaultValue: 'AI Agent' }],
      promptTemplate: 'Research {{TOPIC}}',
      outputFormat: 'markdown',
      qualityGate: 'Has sources',
    },
    {
      stepNumber: 2,
      id: 'step-2-write',
      title: 'Write',
      agentRole: 'Quill (Copywriter)',
      botId: 'quill',
      targetModel: 'Claude Sonnet 5.5',
      inputs: [
        { key: 'BRIEF', label: 'Brief', source: 'previous_step', fromStepId: 'step-1-research' },
        { key: 'TOPIC', label: 'Chủ đề', source: 'user_input' },
      ],
      promptTemplate: 'Write about {{TOPIC}} using:\n{{BRIEF}}',
      outputFormat: 'markdown',
      qualityGate: 'Clear CTA',
    },
  ],
});

const raw = (w: WorkflowItem) => JSON.parse(JSON.stringify(w)) as Record<string, unknown>;

// ── validator ───────────────────────────────────────────────────────────────
test('workflow validator accepts a valid DAG', () => {
  assert.deepEqual(validateWorkflow(raw(wf()), 'x').issues, []);
});

test('workflow validator rejects forward edges, bad numbering, undeclared vars and unused outputs', () => {
  const forward = wf();
  forward.steps[0].inputs.push({ key: 'LATER', label: 'Later', source: 'previous_step', fromStepId: 'step-2-write' });
  forward.steps[0].promptTemplate += ' {{LATER}}';
  assert.ok(validateWorkflow(raw(forward), 'x').issues.some((i) => i.includes('must reference an earlier step')));

  const numbering = wf();
  numbering.steps[1].stepNumber = 3;
  assert.ok(validateWorkflow(raw(numbering), 'x').issues.some((i) => i.includes('stepNumber must be 2')));

  const undeclared = wf();
  undeclared.steps[1].promptTemplate += ' {{GHOST}}';
  assert.ok(validateWorkflow(raw(undeclared), 'x').issues.some((i) => i.includes('{{GHOST}}')));

  const unused = wf();
  unused.steps[1].inputs = [{ key: 'TOPIC', label: 'Chủ đề', source: 'user_input' }];
  unused.steps[1].promptTemplate = 'Write about {{TOPIC}}';
  assert.ok(validateWorkflow(raw(unused), 'x').issues.some((i) => i.includes('output is never used')));

  const labels = wf();
  labels.steps[1].inputs[1].label = 'Một nhãn khác';
  assert.ok(validateWorkflow(raw(labels), 'x').issues.some((i) => i.includes('earlier step labels it')));

  const enums = { ...raw(wf()), difficulty: 'Expert' };
  assert.ok(validateWorkflow(enums, 'x').issues.some((i) => i.includes('"difficulty"')));
});

test('cross-collection check catches unknown bots and duplicate slugs', () => {
  const a = wf();
  const b = { ...wf(), id: 'wf-other' };
  const issues = checkV3Links([a, b], []);
  assert.ok(issues.some((i) => i.includes('duplicate workflow slug "demo"')));
  assert.ok(issues.some((i) => i.includes('unknown bot "scout"')));
});

test('bot validator enforces department, avatar and a substantial system prompt', () => {
  const bot = {
    id: 'demo',
    name: 'Demo',
    role: 'Tester',
    department: 'content-video',
    avatar: '🤖',
    description: 'Demo bot',
    systemPrompt: 'x'.repeat(500),
    recommendedModels: ['Claude Opus 5.5'],
    tools: ['read_file'],
    tags: ['Demo'],
    author: 'TVT',
    createdAt: '2026-11-03',
  };
  assert.deepEqual(validateBot(bot, 'x').issues, []);
  const bad = validateBot({ ...bot, department: 'sales', systemPrompt: 'too short', avatar: 'ABCDEFG' }, 'x').issues;
  assert.ok(bad.some((i) => i.includes('"department"')));
  assert.ok(bad.some((i) => i.includes('too thin')));
  assert.ok(bad.some((i) => i.includes('"avatar"')));
});

// ── loader (real content) ───────────────────────────────────────────────────
test('loader: 317 bots (16 core) and ≥5 workflows load cleanly with resolvable bot links', () => {
  const content = loadContent();
  assert.deepEqual(content.issues, []);
  const loaded = content;
  assert.ok(loaded.bots.length >= 317, `expected ≥ 317 bots, got ${loaded.bots.length}`);
  assert.equal(content.bots.filter((b) => b.tier !== 'specialist').length, 16, '16 core workforce bots');
  assert.ok(content.workflows.length >= 5);
  const botIds = new Set(content.bots.map((b) => b.id));
  for (const id of ['lexi', 'scout', 'quill', 'reel', 'pixel', 'shield', 'bolt', 'echo', 'metric', 'north', 'ally', 'arrow', 'buzz', 'craft', 'crown', 'pulse']) {
    assert.ok(botIds.has(id), `missing bot ${id}`);
  }
  for (const w of content.workflows) {
    assert.ok(w.steps.every((s) => !s.botId || botIds.has(s.botId)));
    assert.ok(content.sources[`workflow:${w.id}`]?.startsWith('content/workflows/'));
  }
});

// ── engine ──────────────────────────────────────────────────────────────────
test('piping: user values flow into every step; previous outputs replace placeholders', () => {
  const w = wf();
  assert.deepEqual(collectUserInputs(w).map((i) => i.key), ['TOPIC']);
  assert.deepEqual(defaultUserValues(w), { TOPIC: 'AI Agent' });
  assert.deepEqual(workflowEdges(w), [{ from: 'step-1-research', to: 'step-2-write', key: 'BRIEF' }]);

  const values = { TOPIC: 'Chatbot Zalo' };
  assert.equal(renderStep(w, w.steps[1], values), 'Write about Chatbot Zalo using:\n[[⟵ Kết quả Bước 1: Research]]');
  assert.equal(renderStep(w, w.steps[1], values, { 'step-1-research': 'Brief thật' }), 'Write about Chatbot Zalo using:\nBrief thật');
  const kinds = tokenizeStep(w, w.steps[1], { TOPIC: '' }).map((t) => t.kind);
  assert.deepEqual(kinds, ['text', 'user-empty', 'text', 'piped-pending']);
});

test('sequential export numbers every step with agent, model and quality gate', () => {
  const text = buildSequentialPrompts(wf(), { TOPIC: 'X' });
  assert.match(text, /## Bước 1\/2 — Research/);
  assert.match(text, /## Bước 2\/2 — Write/);
  assert.match(text, /\*\*Model khuyến nghị:\*\* Gemini 2\.5 Flash/);
  assert.match(text, /✅ Quality gate:\*\* Clear CTA/);
});

test('n8n export: valid graph, expressions reference existing nodes, model mapping, no secrets', () => {
  const n8n = buildN8nWorkflow(wf());
  const names = new Set(n8n.nodes.map((n) => n.name));
  assert.equal(n8n.nodes.length, 3 + 2 * 2);
  assert.equal(new Set(n8n.nodes.map((n) => n.id)).size, n8n.nodes.length, 'unique node ids');
  for (const [from, outputs] of Object.entries(n8n.connections)) {
    assert.ok(names.has(from), from);
    for (const list of Object.values(outputs)) for (const c of list[0]) assert.ok(names.has(c.node), c.node);
  }
  const step2 = n8n.nodes.find((n) => n.name === 'B2 · Write')!;
  const text = step2.parameters.text as string;
  assert.ok(text.startsWith('='));
  assert.ok(text.includes(`$('B1 · Research').item.json.text`));
  assert.ok(text.includes(`$('Workflow Inputs').item.json.TOPIC`));
  assert.equal(n8n.nodes.find((n) => n.name === 'Gemini · B1')?.type, '@n8n/n8n-nodes-langchain.lmChatGoogleGemini');
  assert.equal(n8n.connections['Claude · B2'].ai_languageModel[0][0].node, 'B2 · Write');
  assert.deepEqual(buildN8nWorkflow(wf()), n8n, 'deterministic output');
  assert.ok(!/sk-ant-|api[_-]?key"\s*:/i.test(JSON.stringify(n8n)));
});

test('model mapping uses current Claude ids', () => {
  assert.equal(claudeModelFor('Claude Haiku 5.5'), 'claude-haiku-5-5');
  assert.equal(claudeModelFor('Claude Sonnet 5.5'), 'claude-sonnet-5-5');
  assert.equal(claudeModelFor('Midjourney v6.1'), 'claude-opus-5-5');
});

test('python export is valid Python and its --dry-run pipes every step', (t) => {
  const python = spawnSync('python3', ['--version']);
  if (python.status !== 0) return t.skip('python3 not available');
  const script = buildPythonScript(wf(), { TOPIC: 'Chatbot "Zalo" & AI' });
  assert.ok(!/sk-ant-/.test(script));
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tvt-wf-'));
  const file = path.join(dir, 'demo.py');
  fs.writeFileSync(file, script);
  const run = spawnSync('python3', [file, '--dry-run'], { encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /Step 1\/2: Research/);
  assert.match(run.stdout, /Research Chatbot "Zalo" & AI/);
  assert.match(run.stdout, /\[\[output of step 1: Research\]\]/);
  assert.match(run.stdout, /Recommended: Gemini 2\.5 Flash \| Running on: claude-opus-5-5/);
  const help = spawnSync('python3', [file, '--help'], { encoding: 'utf8' });
  assert.match(help.stdout, /--TOPIC/);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('real workflows: every export builds and the Python script compiles', (t) => {
  const { workflows } = loadContent();
  const hasPython = spawnSync('python3', ['--version']).status === 0;
  for (const w of workflows) {
    const n8n = buildN8nWorkflow(w);
    assert.equal(n8n.nodes.filter((n) => n.type === '@n8n/n8n-nodes-langchain.chainLlm').length, w.steps.length);
    assert.ok(buildSequentialPrompts(w, defaultUserValues(w)).includes(`Bước ${w.steps.length}/${w.steps.length}`));
    if (hasPython) {
      const check = spawnSync('python3', ['-c', 'import ast,sys; ast.parse(sys.stdin.read())'], { input: buildPythonScript(w), encoding: 'utf8' });
      assert.equal(check.status, 0, `${w.id}: ${check.stderr}`);
    }
  }
  if (!hasPython) t.diagnostic('python3 not available — skipped compile check');
});

test('sitemap & llms.txt include bots and workflows', async () => {
  const { buildSitemapEntries, buildLlmsTxt, workflowJsonLd, botJsonLd } = await import('./seo');
  const { workflows, bots } = loadContent();
  const base = 'https://hub.example.com';
  const entries = buildSitemapEntries([], base, '2026-11-03', { workflows, bots });
  const urls = entries.map((e) => e.url);
  assert.ok(urls.includes(`${base}/bots`) && urls.includes(`${base}/workflows`));
  assert.ok(workflows.every((w) => urls.includes(`${base}/workflows/${w.slug}`)));
  assert.ok(bots.every((b) => urls.includes(`${base}/bots/${b.id}`)));
  const llms = buildLlmsTxt([], base, { workflows, bots });
  assert.match(llms, /## Workflows \(\d+\)/);
  assert.match(llms, /## Bots — AI Workforce \(317\)/);
  const howto = (workflowJsonLd(workflows[0], base)['@graph'] as { '@type': string; step?: unknown[] }[])[0];
  assert.equal(howto['@type'], 'HowTo');
  assert.equal(howto.step?.length, workflows[0].steps.length);
  assert.equal((botJsonLd(bots[0], base)['@graph'] as { '@type': string }[])[0]['@type'], 'SoftwareApplication');
});

test('README index lists workflows and bots with anchors and source links', async () => {
  const { buildReadmeIndex } = await import('./readme');
  const { workflows, bots, sources } = loadContent();
  const index = buildReadmeIndex([], sources, 'https://hub.example.com', { workflows, bots });
  assert.ok(index.includes('<a id="workflows"></a>') && index.includes('<a id="bots"></a>'));
  assert.ok(index.includes(`(https://hub.example.com/bots/lexi)`));
  assert.ok(workflows.every((w) => index.includes(`/workflows/${w.slug})`)));
  assert.ok(index.includes('[📄](content/bots/lexi.json)'));
  assert.match(index, /\*\*322 tài sản\*\*/);
  assert.ok(index.includes('🌐 Specialist Personas (301)'));
});
