---
name: ai-engineer
category: technology
persona-source: AI/Machine Learning Engineer
description: |
  AI Agent Skill for AI/ML system design, model selection, and implementation.
  Handles LLM integration, prompt engineering, and AI agent architecture.
  Optimized for ANTIGRAVITY AI stack (local models + OpenRouter).
---

# 🤖 AI Engineer Skill

> AI/ML system design, model selection, and agent architecture.
> Input: AI requirement. Output: Architecture + implementation plan.

## Trigger Phrases

- "AI system design...", "Thiết kế AI..."
- "Model selection...", "Chọn model..."
- "Prompt engineering...", "Viết prompt..."
- "Agent architecture...", "AI agent..."
- "LLM integration...", "Fine-tune..."
- "OpenRouter...", "Local model..."

## Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│1.DEFINE  │ →  │2.DESIGN  │ →  │3.BUILD   │ →  │4.EVALUATE│
│ Problem  │    │ Architect│    │ Implement│    │ Optimize │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## ANTIGRAVITY AI Stack

### Model Routing Strategy

```
Free / Local (Default):
├── Gemma 3 (Ollama) — Code, analysis
├── Gemini CLI — Design, complex tasks
└── Kokoro TTS — Vietnamese voice

Pay-per-use (Escalation):
├── OpenRouter
│   ├── Claude Sonnet — Complex reasoning
│   ├── Claude Opus — Deep analysis
│   ├── GPT-4o — Multimodal
│   └── Gemini Pro — Long context
└── Direct APIs (when OpenRouter is down)
```

### Model Selection Matrix

| Task | Model | Why | Cost |
|:---|:---|:---|:---|
| Code generation | Gemma 3 / Claude | Fast, accurate | Free / $$$ |
| Content writing | Claude Sonnet | Best Vietnamese | $$ |
| Image analysis | GPT-4o / Gemini | Multimodal | $$ |
| Prompt engineering | Claude Opus | Deep understanding | $$$ |
| Embeddings | Nomic Embed | Local, fast | Free |
| TTS Vietnamese | Kokoro / say -v Linh | Local | Free |

### Prompt Engineering Patterns

```
# System Prompt Pattern
Role: [Specific expert role]
Context: [Domain knowledge + constraints]
Task: [Clear instruction]
Format: [Output structure]
Examples: [Few-shot if needed]
Constraints: [What NOT to do]

# Chain-of-Thought
"Think step by step about [problem]."
"First analyze X, then consider Y, finally recommend Z."

# Few-Shot
"Here are examples:
Input: X → Output: Y
Input: A → Output: B
Now do: Input: C → Output: ?"
```

### Agent Architecture Patterns

```
Pattern 1: Simple Agent
User → [System Prompt + Tools] → LLM → Response

Pattern 2: Chain Agent  
User → Agent1 → Agent2 → Agent3 → Final Response

Pattern 3: Router Agent
User → Router Agent → [Specialist Agent 1..N] → Merge → Response

Pattern 4: Reflection Agent
User → Agent → Self-Review → Iterate → Final Response
```

## Evaluation Framework

| Metric | Tool | Target |
|:---|:---|:---|
| Accuracy | Manual review | >90% |
| Latency | Timer | <3s for simple |
| Cost per query | Token counter | <$0.01 default |
| Hallucination rate | Fact-check | <5% |

## Anti-Patterns

1. ❌ Always using expensive models — route by complexity
2. ❌ No system prompt — always define role + constraints
3. ❌ Giant prompts — concise, structured
4. ❌ No evaluation — always measure quality
5. ❌ Ignoring local models — free and fast for many tasks

## Integration

| System | Integration |
|:---|:---|
| **OpenClaw** | AI Gateway, model routing |
| **Hyperframes** | TTS + AI-generated content |
| **SKILL-FULLSTACK-DEV** | AI feature development |
| **All Skills** | Underlying AI engine |
