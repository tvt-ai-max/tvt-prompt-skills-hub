# _CATEGORY-SOP.md — Technology

> SOPs cho technology tasks — AI, data, security, cloud, và emerging tech.

---

## 🔄 SOP-TECH-01: AI Feature Integration

```
Bước 1: Define (< 1h)
  → What AI can/cannot do for this feature
  → Model selection (local vs cloud, cost estimate)
  → Success metrics

Bước 2: Prompt Engineering
  → Draft system prompt
  → Add few-shot examples
  → Define output format
  → Add safety constraints

Bước 3: Integration
  → API wrapper with retry/fallback
  → Cost monitoring
  → Error handling (timeout, rate limit)
  → Logging for debugging

Bước 4: Evaluate
  → Quality sampling (10-20 outputs)
  → Latency benchmarking
  → Cost per query
  → Edge case testing

Bước 5: Deploy
  → Feature flag for gradual rollout
  → Monitor metrics post-launch
```

---

## 🔄 SOP-TECH-02: Data Analysis Request

```
1. Understand question (rephrase to confirm)
2. Identify data source
3. Clean + validate data
4. Exploratory analysis
5. Visualization (chart type → insight)
6. Interpret results → actionable recommendations
7. Report with executive summary first
```

---

## 🔄 SOP-TECH-03: Security Review

```
Checklist trước khi deploy bất kỳ feature nào:
- [ ] Input validation (no raw user input to DB/shell)
- [ ] Authentication required for sensitive routes
- [ ] No secrets in code/logs
- [ ] HTTPS only
- [ ] CORS configured correctly
- [ ] Rate limiting on public APIs
- [ ] Dependency audit (npm audit)
```

---

## 🔄 SOP-TECH-04: New AI Model Evaluation

```
1. Benchmark task: Define 10-20 representative inputs
2. Run all candidate models
3. Score: Quality + Speed + Cost per query
4. Check: Context length, rate limits, API stability
5. Decision matrix:
   - Cheap + fast → local/free tier
   - Quality critical → paid model
   - Both needed → smart routing
6. Document selection in CLAUDE.md or MEMORY.md
```

---

## 📊 Technology KPIs

| Metric | Target | Tool |
|:---|:---|:---|
| AI response quality | >90% acceptable | Manual sample |
| AI latency | <3s (simple) | Timer |
| Cost per 1K queries | <$0.10 | OpenRouter dashboard |
| System uptime | >99% | PM2 status |
| Security audit score | 0 critical issues | npm audit |

---

## 📎 Tài liệu liên quan

- [SKILL-AI-ENGINEER](skills/SKILL-AI-ENGINEER.md)
- [SKILL-DATA-SCIENCE](skills/SKILL-DATA-SCIENCE.md)
- OpenClaw Gateway docs (Tài liệu tại `/Users/mrtony/tvt-ai/openclaw/`)
