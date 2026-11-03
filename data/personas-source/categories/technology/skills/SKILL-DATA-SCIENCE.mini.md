---
name: data-science
mini: true
token_estimate: 320
full_file: SKILL-DATA-SCIENCE.md
---
# Data Science [MINI]
> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"phân tích data", "dashboard", "metrics", "KPI", "visualization", "trend", "A/B test results"

## Pipeline (4 steps)
1. **Collect** — Identify data source + validate quality
2. **Analyze** — EDA: shape | types | nulls | distributions | correlations | outliers
3. **Visualize** — Chart type → insight (bar=compare, line=trend, scatter=correlation)
4. **Insight** — BLUF: finding + implication + recommendation + next step

## Quick EDA Checklist
```
1. Shape (rows × cols)
2. Data types (numeric/categorical/datetime)
3. Missing values (count + %)
4. Distribution (mean, median, std, min, max)
5. Outliers (IQR or z-score)
6. Correlations (key relationships)
```

## Statistical Tests Cheat Sheet
2 groups → t-test | 3+ groups → ANOVA | Relationship → Correlation | Categories → Chi-square | A/B → Z-test

## Report Format
```markdown
## Executive Summary: [1-2 sentences: finding + recommendation]
## Key Metrics: [Table]
## Findings: [Numbered list: data → implication]
## Recommendations: [Ranked actions + expected impact]
```

## Key Rules
1. BLUF (Bottom Line Up Front) — summary first
2. Show evidence for every conclusion
3. Distinguish correlation vs causation explicitly
4. Focus on 3-5 KPIs max — not all metrics
5. Every insight must lead to actionable recommendation

## Anti-Patterns
❌ Conclusions without data | ❌ Correlation = causation | ❌ Too many metrics | ❌ No actions

## Integrates With
`skill-growth-hacking` | `skill-seo-optimizer` | `openclaw`
