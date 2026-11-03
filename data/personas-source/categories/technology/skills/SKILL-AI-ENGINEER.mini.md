---
name: ai-engineer
mini: true
token_estimate: 380
full_file: SKILL-AI-ENGINEER.md
---
# AI Engineer [MINI]
> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"AI system", "model selection", "prompt engineering", "agent architecture", "LLM", "OpenRouter"

## Pipeline (4 steps)
1. **Define** — What AI does, success metrics, cost estimate
2. **Design** — Prompt engineering + model selection + agent pattern
3. **Build** — API wrapper + retry/fallback + cost monitoring + logging
4. **Evaluate** — Quality sampling (10-20 outputs) + latency + cost/query

## ANTIGRAVITY Model Routing
```
Free/Local first:
  Gemma 3 (Ollama) → code, simple analysis
  Gemini CLI       → complex tasks, design
  say -v Linh      → Vietnamese TTS

Pay-per-use (OpenRouter) when needed:
  Claude Sonnet  → reasoning, Vietnamese content
  GPT-4o         → multimodal
  Gemini Pro     → long context
```

## Model Selection Rule
`Cost < $0.01/query` → local | `Quality critical` → paid | `Both` → smart routing

## Prompt Template
```
Role: [Specific expert]
Context: [Domain + constraints]
Task: [Clear instruction]
Format: [Output structure]
Constraints: [What NOT to do]
```

## Agent Patterns
Simple: User → [Prompt+Tools] → LLM → Response
Chain: User → A1 → A2 → A3 → Response
Router: User → Router → [Specialist 1..N] → Merge

## Key Rules
1. Local/free model FIRST — only escalate when needed
2. Always define system prompt — never raw user input to LLM
3. Add retry + fallback on all API calls
4. Monitor token usage — implement cost guards
5. Sample and verify outputs — LLMs hallucinate

## Anti-Patterns
❌ Always expensive models | ❌ No system prompt | ❌ Giant prompts | ❌ No evaluation

## Integrates With
`openclaw` | `hyperframes` | `skill-fullstack-dev`
