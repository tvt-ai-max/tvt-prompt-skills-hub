import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractVariables, parseTemplate, renderTemplate, resolveVariables, buildWorkbenchModel, humanizeKey } from './variables';
import { toCursorRules, toSkillMarkdown } from './exporters';
import { validatePrompt } from './schema';
import type { PromptItem, SkillItem } from '../types/hub';

test('extractVariables returns unique keys in order', () => {
  assert.deepEqual(extractVariables('{{A}} x {{b_2}} {{A}}'), ['A', 'b_2']);
});

test('parseTemplate splits text and variables', () => {
  assert.deepEqual(parseTemplate('Hi {{NAME}}!'), [
    { kind: 'text', value: 'Hi ' },
    { kind: 'variable', key: 'NAME' },
    { kind: 'text', value: '!' },
  ]);
});

test('renderTemplate fills values and keeps empty placeholders', () => {
  assert.equal(renderTemplate('{{A}} & {{B}}', { A: 'x', B: '  ' }), 'x & {{B}}');
  assert.equal(renderTemplate('{{A}}', { A: '$1 $& ok' }), '$1 $& ok');
});

test('resolveVariables adds undeclared keys', () => {
  const vars = resolveVariables('{{TOPIC}} {{EXTRA_KEY}}', [{ key: 'TOPIC', label: 'Topic' }]);
  assert.equal(vars.length, 2);
  assert.equal(vars[1].label, 'Extra Key');
  assert.equal(humanizeKey('draft_content'), 'Draft Content');
});

const prompt: PromptItem = {
  id: 'demo-prompt',
  title: 'Demo',
  description: 'Demo prompt',
  category: 'seo',
  tier: 'prompt',
  persona: 'general',
  tags: ['demo'],
  author: 'TVT',
  variables: [{ key: 'TOPIC', label: 'Topic' }],
  template: 'Write about {{TOPIC}}',
  createdAt: '2026-11-02',
};

test('validatePrompt accepts a valid prompt and rejects undeclared variables', () => {
  assert.deepEqual(validatePrompt({ ...prompt }, 'x').issues, []);
  const bad = validatePrompt({ ...prompt, template: 'x {{OTHER}}' }, 'x').issues;
  assert.ok(bad.some((i) => i.includes('{{OTHER}}')));
  assert.ok(bad.some((i) => i.includes('never used')));
});

test('validatePrompt detects leaked secrets', () => {
  const issues = validatePrompt({ ...prompt, description: 'key sk-ant-abcdefghijklmnopqrstuvwxyz' }, 'x').issues;
  assert.ok(issues.some((i) => i.includes('secret')));
});

test('exporters produce cursor rules and SKILL.md frontmatter', () => {
  assert.match(toCursorRules(prompt, 'Write about AI'), /^# \.cursorrules — Demo/);
  const md = toSkillMarkdown(prompt, 'Write about AI');
  assert.match(md, /^---\nname: demo-prompt\n/);
  assert.match(md, /## Instructions\n\nWrite about AI/);
});

test('skill workbench exposes inputs as variables', () => {
  const skill: SkillItem = {
    id: 'demo-skill',
    title: 'Demo Skill',
    description: 'd',
    category: 'seo',
    tier: 'skill',
    persona: 'general',
    tags: ['x'],
    inputs: [{ name: 'draft_content', type: 'markdown', description: 'Draft', required: true }],
    auditGates: ['Gate A'],
    sopMarkdown: '# SOP\n## Bước 1\nĐọc {{draft_content}}',
    createdAt: '2026-11-02',
  };
  const model = buildWorkbenchModel(skill);
  assert.deepEqual(model.variables.map((v) => v.key), ['draft_content']);
  assert.equal(model.variables[0].type, 'textarea');
  assert.match(model.template, /- \[ \] Gate A/);
});

import { renderMarked, stripMarkers, tokenizePreview } from './highlight';

test('marked rendering round-trips and tokenizes filled + empty variables', () => {
  const marked = renderMarked('A {{X}} B {{Y}}', { X: 'hello', Y: '' });
  assert.equal(stripMarkers(marked), 'A hello B {{Y}}');
  const kinds = tokenizePreview(toCursorRules(prompt, marked)).map((t) => t.kind);
  assert.ok(kinds.includes('filled'));
  assert.ok(kinds.includes('empty'));
});
