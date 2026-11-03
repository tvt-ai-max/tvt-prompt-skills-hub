import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { DocsLayout } from '@/components/DocsLayout';
import { JsonLd } from '@/components/JsonLd';
import { Localized } from '@/components/Localized';
import { localeAlternates } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cẩm nang viết Prompt hiệu quả 2026 — How to Write Effective Prompts',
  description:
    '5 chương thực chiến: nguyên tắc vàng viết prompt, thiết kế system prompt cho AI Agent, thinking mode & deep reasoning, chuyển prompt thành SKILL.md có quality gates, và thiết kế workflow nhiều bước.',
  alternates: localeAlternates('/guide'),
};

const CODE = {
  template: `# Vai trò
Bạn là {{ROLE}} với 10 năm kinh nghiệm trong {{INDUSTRY}}.

# Bối cảnh
{{CONTEXT}}

# Nhiệm vụ
Viết {{DELIVERABLE}} cho {{AUDIENCE}} để đạt mục tiêu: {{GOAL}}.

# Ràng buộc
- Tối đa {{LENGTH}} từ, giọng {{TONE}}.
- Không dùng cam kết tuyệt đối, không bịa số liệu — ghi [CẦN XÁC MINH].

# Ví dụ đạt chuẩn
{{EXAMPLE}}

# Định dạng đầu ra
Markdown: tiêu đề, 3 ý chính, 1 CTA.`,
  systemPrompt: `# <NAME> — <ROLE>
You are <NAME>, <ROLE>. <Mission in one sentence: what outcome you own.>

## Operating principles
1. <Non-negotiable rule>
2. <Quality bar>

## Process
1. Clarify the goal and missing inputs (max 3 questions).
2. <Domain steps…>

## Output format
- <Exact structure, length, tables/JSON>

## Boundaries & safety
- Never print or request secrets; draft first, a human approves side effects.

## HANDOFF
- Status: DONE | BLOCKED | NEEDS_REVIEW · Next agent: <who>`,
  thinking: `import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY or an \`ant auth login\` profile

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    thinking={"type": "adaptive"},          # the model decides how much to think
    output_config={"effort": "high"},       # low | medium | high | xhigh | max
    messages=[{"role": "user", "content": "Stress-test this pricing decision: ..."}],
)
for block in response.content:
    if block.type == "text":
        print(block.text)`,
  skill: `---
name: seo-content-audit
description: "Audit a draft against the 7-point quality bar before publishing."
inputs:
  - name: draft_content
    type: markdown
    required: true
tools: ["read_file", "web_search"]
audit_gates:
  - "7-Point Audit score ≥ 85/100"
  - "Every statistic has a source or [VERIFY] tag"
---

# SOP
## Step 1 — Search intent match
...
## Step 7 — CTA & conversion
...
## Output
Score table + prioritized fixes + PASS / FAIL.`,
  workflow: `{
  "stepNumber": 2,
  "id": "step-2-copywriting",
  "agentRole": "Quill (Copywriter)",
  "targetModel": "Claude Opus 5.5",
  "inputs": [
    { "key": "RESEARCH_BRIEF", "source": "previous_step", "fromStepId": "step-1-research" },
    { "key": "PRODUCT", "source": "user_input" }
  ],
  "promptTemplate": "Using {{RESEARCH_BRIEF}}, write the launch copy for {{PRODUCT}}…",
  "outputFormat": "markdown",
  "qualityGate": "One CTA per variant; character limits respected; no absolute claims."
}`,
};

const CHAPTERS = [
  { id: 'principles', vi: '1. 5 nguyên tắc vàng viết prompt chuyển đổi', en: '1. Five golden rules for prompts that convert' },
  { id: 'system-prompts', vi: '2. Nghệ thuật phân vai system prompt cho AI Agent', en: '2. Designing system prompts for autonomous agents' },
  { id: 'thinking', vi: '3. Thinking mode & Deep Reasoning', en: '3. Thinking mode & deep reasoning' },
  { id: 'skills', vi: '4. Từ prompt đến Agent SOP (SKILL.md)', en: '4. From prompt to agent SOP (SKILL.md)' },
  { id: 'workflows', vi: '5. Thiết kế dây chuyền nhiều bước (Workflows DAG)', en: '5. Designing multi-step pipelines (workflow DAGs)' },
];

function Toc({ vi }: { vi: boolean }) {
  return (
    <nav aria-label={vi ? 'Mục lục' : 'Contents'} className="surface-card my-6 rounded-2xl p-4">
      <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">{vi ? 'Mục lục' : 'Contents'}</p>
      <ol className="space-y-1 text-sm">
        {CHAPTERS.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`}>{vi ? c.vi : c.en}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function TryIt({ vi, links }: { vi: boolean; links: [string, string][] }) {
  return (
    <p className="rounded-xl border-l-2 border-neon-emerald bg-neon-emerald/5 px-4 py-3 text-sm">
      <strong>{vi ? 'Thử ngay trên Hub: ' : 'Try it on the Hub: '}</strong>
      {links.map(([href, label], i) => (
        <span key={href}>
          {i > 0 && ' · '}
          <Link href={href}>{label}</Link>
        </span>
      ))}
    </p>
  );
}

function Body({ vi }: { vi: boolean }) {
  return (
    <>
      <p className="font-mono text-xs text-cyan-300">Master Guide · 2026</p>
      <h1>{vi ? 'Cẩm nang viết Prompt hiệu quả 2026' : 'How to Write Effective Prompts in 2026'}</h1>
      <p>
        {vi
          ? 'Prompt tốt không phải câu thần chú, mà là một bản brief rõ ràng: ai làm, cho ai, để đạt gì, trong giới hạn nào và trông như thế nào khi hoàn thành. Cẩm nang này đi từ prompt đơn lẻ đến agent tự chủ và dây chuyền nhiều bước — đúng 4 tầng của Hub.'
          : 'A good prompt is not a magic phrase — it is a clear brief: who does the work, for whom, toward what goal, within which limits, and what “done” looks like. This guide goes from single prompts to autonomous agents and multi-step pipelines — the same four tiers as the Hub.'}
      </p>
      <Toc vi={vi} />

      <h2 id="principles">{CHAPTERS[0][vi ? 'vi' : 'en']}</h2>
      <ol>
        <li>
          <strong>{vi ? 'Bối cảnh (Context):' : 'Context:'}</strong>{' '}
          {vi
            ? 'model không biết doanh nghiệp, khách hàng hay lịch sử của bạn. Đưa vào dữ kiện thật: sản phẩm, tệp khách, số liệu, những gì đã thử.'
            : 'the model knows nothing about your business, customers or history. Give it real facts: product, audience, numbers, what you already tried.'}
        </li>
        <li>
          <strong>{vi ? 'Mục tiêu & người nhận:' : 'Goal & audience:'}</strong>{' '}
          {vi ? 'một prompt — một người đọc — một hành động mong muốn. Nói rõ thành công trông như thế nào.' : 'one prompt — one reader — one desired action. Say what success looks like.'}
        </li>
        <li>
          <strong>{vi ? 'Ràng buộc (Constraints):' : 'Constraints:'}</strong>{' '}
          {vi
            ? 'độ dài, giọng văn, điều cấm, định dạng đầu ra. Ràng buộc cụ thể giúp đầu ra nhất quán hơn mọi tính từ.'
            : 'length, tone, what to avoid, output format. Specific constraints make output more consistent than any adjective.'}
        </li>
        <li>
          <strong>{vi ? 'Ví dụ mẫu (Few-shot):' : 'Examples (few-shot):'}</strong>{' '}
          {vi
            ? 'một ví dụ đạt chuẩn đáng giá hơn mười dòng mô tả. Dùng 1–3 ví dụ đa dạng để model học mẫu chứ không sao chép.'
            : 'one good example beats ten lines of description. Use 1–3 varied examples so the model learns the pattern instead of copying it.'}
        </li>
        <li>
          <strong>{vi ? 'Biến (Variables):' : 'Variables:'}</strong>{' '}
          {vi
            ? 'tách phần thay đổi thành {{BIẾN}} để prompt dùng lại được cho cả team — đó chính là form điền biến trên Hub.'
            : 'turn the parts that change into {{VARIABLES}} so the whole team can reuse the prompt — exactly what the Hub’s variable form does.'}
        </li>
      </ol>
      <CodeBlock title={vi ? 'Khung prompt có biến' : 'Prompt skeleton with variables'} code={CODE.template} />
      <TryIt
        vi={vi}
        links={[
          ['/items/b2b-cold-email-sequence', 'B2B Cold Email Sequence'],
          ['/items/b2b-ideal-customer-profile', 'ICP Builder'],
          ['/prompts', vi ? 'Tất cả Prompts' : 'All Prompts'],
        ]}
      />

      <h2 id="system-prompts">{CHAPTERS[1][vi ? 'vi' : 'en']}</h2>
      <p>
        {vi
          ? 'Một agent tự chủ cần nhiều hơn một vai diễn. System prompt tốt mô tả danh tính và kết quả agent chịu trách nhiệm, nguyên tắc không được vi phạm, quy trình làm việc, định dạng đầu ra cố định, ranh giới an toàn, và cách bàn giao cho agent tiếp theo.'
          : 'An autonomous agent needs more than a persona. A good system prompt states the identity and outcome the agent owns, rules it must not break, its process, a fixed output format, safety boundaries, and how it hands off to the next agent.'}
      </p>
      <ul>
        <li>{vi ? 'Viết ranh giới bằng hành vi kiểm chứng được (“chỉ tạo bản nháp, chờ người duyệt”), không bằng tính từ.' : 'Write boundaries as checkable behavior (“draft only, wait for human approval”), not adjectives.'}</li>
        <li>{vi ? 'Cho agent quyền hỏi tối đa 3 câu làm rõ thay vì đoán.' : 'Let the agent ask up to three clarifying questions instead of guessing.'}</li>
        <li>{vi ? 'Kết thúc bằng khối HANDOFF để nhiều agent phối hợp mà không mất ngữ cảnh.' : 'End with a HANDOFF block so several agents can collaborate without losing context.'}</li>
      </ul>
      <CodeBlock title="system-prompt.md" code={CODE.systemPrompt} />
      <TryIt
        vi={vi}
        links={[
          ['/bots/lexi', 'Lexi — Operations Manager'],
          ['/bots/shield', 'Shield — Security Gate'],
          ['/bots', vi ? '317 Bots' : '317 Bots'],
        ]}
      />

      <h2 id="thinking">{CHAPTERS[2][vi ? 'vi' : 'en']}</h2>
      <p>
        {vi
          ? 'Không phải câu hỏi nào cũng cần suy luận sâu. Phân loại trước: việc tra cứu, định dạng, phân loại nhanh là System 1 — dùng model nhanh, effort thấp. Quyết định có đánh đổi, khó đảo ngược, dữ liệu mâu thuẫn là System 2 — bật thinking và tăng effort.'
          : 'Not every question needs deep reasoning. Triage first: lookups, formatting and quick classification are System 1 — use a fast model at low effort. Decisions with trade-offs, hard-to-reverse consequences or conflicting data are System 2 — turn on thinking and raise effort.'}
      </p>
      <ul>
        <li>
          {vi
            ? 'Claude Opus 5.5 / Sonnet 5.5: dùng adaptive thinking và điều chỉnh độ sâu bằng output_config.effort (low → max) thay vì đặt ngân sách token cố định.'
            : 'Claude Opus 5.5 / Sonnet 5.5: use adaptive thinking and tune depth with output_config.effort (low → max) instead of a fixed token budget.'}
        </li>
        <li>
          {vi
            ? 'Gemini 2.5 Flash: hợp với tầng System 1 — nhanh, rẻ; tăng thinking budget khi cần lập luận nhiều bước.'
            : 'Gemini 2.5 Flash: a good fit for the System 1 tier — fast and cheap; raise its thinking budget for multi-step reasoning.'}
        </li>
        <li>
          {vi
            ? 'Đừng yêu cầu model in toàn bộ “suy nghĩ” ra câu trả lời. Hãy yêu cầu cấu trúc kết luận: các phương án, tiêu chí chấm điểm, phản biện, điều kiện đảo ngược quyết định.'
            : 'Don’t ask the model to print its whole “thinking” into the answer. Ask for a structured conclusion instead: options, scoring criteria, counter-arguments, reversal conditions.'}
        </li>
      </ul>
      <CodeBlock title="deep_reasoning.py" code={CODE.thinking} />
      <TryIt
        vi={vi}
        links={[
          ['/items/system1-system2-classifier', 'System 1 vs 2 Classifier'],
          ['/items/tree-of-thought-strategist', 'Tree-of-Thought'],
          ['/prompts?category=deep-reasoning', 'Deep Reasoning'],
        ]}
      />

      <h2 id="skills">{CHAPTERS[3][vi ? 'vi' : 'en']}</h2>
      <p>
        {vi
          ? 'Khi một prompt được dùng lặp lại và đầu ra cần đạt chuẩn, hãy nâng nó thành Skill: khai báo đầu vào, công cụ được phép dùng, các bước làm việc, và quality gate — điều kiện bắt buộc trước khi agent được bàn giao. SKILL.md chạy được trên Claude Code, OpenClaw và Hermes.'
          : 'When a prompt is reused and its output must meet a bar, promote it to a Skill: declare inputs, allowed tools, the step-by-step procedure, and quality gates — conditions the agent must pass before handing over. SKILL.md runs in Claude Code, OpenClaw and Hermes.'}
      </p>
      <CodeBlock title="SKILL.md" code={CODE.skill} />
      <TryIt
        vi={vi}
        links={[
          ['/items/seven-point-content-audit', '7-Point Content Audit'],
          ['/items/meta-ads-two-step-scheduler', 'Meta Ads 2-Step Scheduler'],
          ['/skills', vi ? 'Tất cả Skills' : 'All Skills'],
        ]}
      />

      <h2 id="workflows">{CHAPTERS[4][vi ? 'vi' : 'en']}</h2>
      <ol>
        <li>{vi ? 'Chia việc lớn thành các bước mà mỗi bước có một agent chịu trách nhiệm.' : 'Split the job into steps, each owned by one agent.'}</li>
        <li>
          {vi
            ? 'Viết hợp đồng dữ liệu: đầu ra của bước nào chảy vào bước nào, định dạng gì (Markdown, JSON, code).'
            : 'Write the data contract: which output flows into which step, in what format (Markdown, JSON, code).'}
        </li>
        <li>
          {vi
            ? 'Chỉ cho phép nối về bước trước — đồ thị không có vòng, chạy lại được, dễ gỡ lỗi.'
            : 'Only allow edges back to earlier steps — the graph stays acyclic, re-runnable and easy to debug.'}
        </li>
        <li>{vi ? 'Mỗi bước có quality gate riêng; thao tác tốn tiền hoặc gửi ra ngoài luôn dừng ở bản nháp chờ người duyệt.' : 'Give every step its own quality gate; anything that spends money or publishes stops at a draft for human approval.'}</li>
      </ol>
      <CodeBlock title="workflow-step.json" code={CODE.workflow} />
      <TryIt
        vi={vi}
        links={[
          ['/workflows/ocp-decision-stress-test', 'OCP Decision Stress Test'],
          ['/workflows/b2b-campaign-launcher', 'B2B Campaign Launcher'],
          ['/docs/api', vi ? 'Kết nối qua MCP' : 'Connect via MCP'],
        ]}
      />
    </>
  );
}

export default function GuidePage() {
  const url = `${SITE_URL.replace(/\/$/, '')}/guide`;
  return (
    <DocsLayout current="/guide">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Cẩm nang viết Prompt hiệu quả 2026 — How to Write Effective Prompts',
          url,
          inLanguage: ['vi', 'en'],
          author: { '@id': 'https://toilatung.com/#organization' },
          publisher: { '@id': 'https://tvtagency.com/#organization' },
          datePublished: '2026-11-03',
          hasPart: CHAPTERS.map((c) => ({ '@type': 'WebPageElement', name: c.vi, url: `${url}#${c.id}` })),
        }}
      />
      <Localized vi={<Body vi />} en={<Body vi={false} />} />
    </DocsLayout>
  );
}
