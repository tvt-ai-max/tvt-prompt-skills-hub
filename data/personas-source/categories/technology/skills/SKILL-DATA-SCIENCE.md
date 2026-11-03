---
name: data-science
category: technology
persona-source: Data Scientist
description: |
  AI Agent Skill for data analysis, visualization, and insights extraction.
  Handles data exploration, statistical analysis, and reporting.
---

# 📊 Data Science Skill

> Data analysis, visualization, and actionable insights.
> Input: Data or question. Output: Analysis + visualizations + recommendations.

## Trigger Phrases

- "Phân tích data...", "Analyze data..."
- "Dashboard...", "Visualization..."
- "Metrics report...", "KPI analysis..."
- "Data insight...", "Trend analysis..."
- "Statistical analysis...", "A/B test results..."

## Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│1.COLLECT │ →  │2.ANALYZE │ →  │3.VISUALZE│ →  │4.INSIGHT │
│ Data     │    │ Explore  │    │ Chart    │    │ Recommend│
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## Analysis Framework

### Quick EDA (Exploratory Data Analysis)

```python
# Standard EDA checklist
1. Shape: rows × columns
2. Data types: numeric, categorical, datetime
3. Missing values: count + percentage
4. Distributions: mean, median, std, min, max
5. Correlations: key variable relationships
6. Outliers: IQR method or z-score
7. Trends: time-series patterns
```

### Statistical Tests Cheat Sheet

| Question | Test | When to use |
|:---|:---|:---|
| A vs B difference? | t-test | 2 groups, normal dist |
| Multiple groups? | ANOVA | 3+ groups |
| Relationship? | Correlation | 2 continuous variables |
| Categorical association? | Chi-square | 2 categorical variables |
| A/B test significance? | Z-test | Large samples |

### Reporting Template

```markdown
## 📊 Data Analysis Report — [Topic]

### Executive Summary
[1-2 sentences: key finding + recommendation]

### Key Metrics
| Metric | Value | Trend | Status |
|:-------|:------|:------|:-------|
| [KPI 1] | X | ↑ +X% | 🟢 |

### Findings
1. **Finding 1**: [Data point] → [Implication]
2. **Finding 2**: [Data point] → [Implication]

### Recommendations
1. [Action] — Expected impact: [X%]
2. [Action] — Expected impact: [X%]

### Next Steps
- [ ] Action item 1
- [ ] Action item 2
```

## Tools

| Tool | Use case |
|:---|:---|
| Python (pandas/numpy) | Data manipulation |
| matplotlib/seaborn | Static visualization |
| Google Sheets | Quick analysis |
| CLI tools (awk/jq) | Data extraction |

## Anti-Patterns

1. ❌ Conclusions without data — always show evidence
2. ❌ Misleading visualizations — honest axes, scales
3. ❌ Correlation = causation — be explicit
4. ❌ Too many metrics — focus on 3-5 KPIs
5. ❌ No actionable recommendations — insights must lead to action

## Integration

| System | Integration |
|:---|:---|
| **SKILL-GROWTH-HACKING** | Experiment analysis |
| **SKILL-SEO-OPTIMIZER** | SEO performance data |
| **SKILL-SOCIAL-MEDIA** | Social analytics |
| **OpenClaw** | Usage analytics |
