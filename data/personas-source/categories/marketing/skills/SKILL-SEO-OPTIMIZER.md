---
name: seo-optimizer
category: marketing
persona-source: SEO Expert
description: |
  AI Agent Skill for SEO auditing, keyword research, and on-page optimization.
  Analyzes websites, suggests improvements, and creates SEO-optimized content briefs.
  Use when asked to optimize content for search engines or audit a website.
---

# 🔍 SEO Optimizer Skill

> Complete SEO analysis, audit, and optimization pipeline.
> Input: URL or content topic. Output: SEO audit report + optimization plan.

## Trigger Phrases

Activate this skill when the user says:
- "SEO audit...", "Audit SEO trang...", "Phân tích SEO..."
- "Keyword research for...", "Nghiên cứu từ khóa..."
- "Tối ưu SEO cho...", "Optimize for search..."
- "On-page SEO", "Off-page SEO", "Technical SEO"
- "Rank for keyword...", "Tăng traffic organic..."
- "Schema markup", "Meta tags", "SERP analysis"

## Pipeline Overview

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 1. AUDIT │ →  │2.KEYWORD │ →  │ 3. ON-   │ →  │ 4. OFF-  │ →  │5.MONITOR │
│ Technical│    │ Research │    │ PAGE     │    │ PAGE     │    │ Track    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## Step 1: Technical SEO Audit

### Quick Audit Checklist

- [ ] **Site Speed**: Page load < 3s (check via PageSpeed Insights)
- [ ] **Mobile Responsive**: Passes Google Mobile-Friendly Test
- [ ] **SSL Certificate**: HTTPS enabled
- [ ] **Sitemap**: `sitemap.xml` exists and submitted to GSC
- [ ] **Robots.txt**: Properly configured
- [ ] **Canonical URLs**: No duplicate content issues
- [ ] **404 Errors**: Check broken links
- [ ] **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Structured Data**: Schema markup implemented
- [ ] **Indexation**: Check `site:domain.com` in Google

### Audit Report Format

```markdown
## 🔍 SEO Audit Report — [Domain]

### Score: [X/100]

| Area | Score | Status | Priority |
|:-----|:-----:|:------:|:--------:|
| Technical | X/25 | 🟢/🟡/🔴 | High/Med/Low |
| On-Page | X/25 | 🟢/🟡/🔴 | High/Med/Low |
| Content | X/25 | 🟢/🟡/🔴 | High/Med/Low |
| Off-Page | X/25 | 🟢/🟡/🔴 | High/Med/Low |

### Critical Issues (Fix First)
1. [Issue + Impact + Fix]

### Warnings
1. [Issue + Impact + Fix]

### Opportunities
1. [Opportunity + Expected Impact]
```

---

## Step 2: Keyword Research

### Research Framework

```
1. Seed Keywords (5-10)
   └── Brainstorm from business goals

2. Expand with tools
   └── Google Suggest, People Also Ask, Related Searches
   └── Ahrefs / SEMrush / Ubersuggest (if available)

3. Categorize
   └── Informational (how to, what is, guide)
   └── Commercial (best, review, comparison)
   └── Transactional (buy, price, discount)
   └── Navigational (brand, login, contact)

4. Prioritize
   └── Search Volume × Relevance ÷ Difficulty
```

### Keyword Mapping Template

| Keyword | Volume | Difficulty | Intent | Target Page | Priority |
|:---|:---:|:---:|:---|:---|:---:|
| [keyword] | [X] | [X] | Info/Comm/Trans | [URL or new page] | ⭐ |

### Long-tail Keyword Formula

```
[Primary Keyword] + [Modifier]

Modifiers:
- Year: "best AI tools 2026"
- Location: "SEO services Ho Chi Minh"
- Comparison: "X vs Y"
- How-to: "how to [action] with [tool]"
- List: "top 10 [category]"
- For: "[topic] for beginners/business/students"
```

---

## Step 3: On-Page SEO Optimization

### Page-Level Checklist

| Element | Rule | Example |
|:---|:---|:---|
| **Title Tag** | 50-60 chars, keyword at start | `[Keyword] — [Benefit] | [Brand]` |
| **Meta Description** | 150-160 chars, CTA included | `[Hook]. [Value]. [CTA]` |
| **H1** | 1 per page, contains primary keyword | `[Primary Keyword]: [Value Proposition]` |
| **H2-H6** | Use LSI keywords, logical hierarchy | Subheadings with related terms |
| **URL** | Short, keyword-rich, kebab-case | `/keyword-topic/` |
| **Images** | Alt text with keywords, WebP format | `alt="[descriptive keyword text]"` |
| **Internal Links** | 3-5 per 1000 words | Link to related pillar content |
| **External Links** | 1-2 authoritative sources | Link to research, stats |
| **Content Length** | 1500+ words for competitive keywords | Comprehensive, not padded |
| **Schema** | Article, FAQ, HowTo as appropriate | JSON-LD in `<head>` |

### Content SEO Template

```markdown
# [H1 — Primary Keyword + Hook] (50-60 chars)

[Opening paragraph — hook + primary keyword in first 100 words]

## [H2 — Secondary Keyword] {#section-1}

[Content — 200-300 words per section]

### [H3 — LSI Keyword]

[Supporting content with examples]

## [H2 — FAQ Section]

### [Question with long-tail keyword]?
[Answer — 50-100 words, direct]

## [H2 — Conclusion + CTA]

[Summary + clear call-to-action]
```

### Schema Markup Templates

```json
// Article Schema
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Title]",
  "author": { "@type": "Person", "name": "[Author]" },
  "datePublished": "[Date]",
  "description": "[Meta description]"
}

// FAQ Schema
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer]"
      }
    }
  ]
}
```

---

## Step 4: Off-Page SEO Strategy

### Link Building Playbook

| Strategy | Difficulty | Impact | Timeline |
|:---|:---:|:---:|:---|
| Guest posting | Medium | High | 2-4 weeks |
| Resource link building | Low | Medium | 1-2 weeks |
| Broken link building | Medium | Medium | 2-3 weeks |
| Digital PR | High | Very High | 4-8 weeks |
| Community engagement | Low | Low-Medium | Ongoing |
| Content partnerships | Medium | High | 2-4 weeks |

### Backlink Quality Checklist

- [ ] Domain Authority > 30
- [ ] Relevant niche/industry
- [ ] Real traffic (not PBN)
- [ ] DoFollow link
- [ ] Natural anchor text variation
- [ ] Content context is relevant

---

## Step 5: Monitoring & Reporting

### Monthly SEO Report

```markdown
## 📊 SEO Monthly Report — [Month Year]

### Rankings
| Keyword | Previous | Current | Change |
|:--------|:--------:|:-------:|:------:|
| [kw1]   | #X       | #X      | ↑/↓ X  |

### Traffic
- Organic sessions: [X] ([+/- %] vs last month)
- New users from organic: [X]
- Top landing pages: [List]

### Backlinks
- New backlinks: [X]
- Lost backlinks: [X]
- Domain Authority: [X]

### Actions for Next Month
1. [Action item]
2. [Action item]
```

### Tools Reference

| Tool | Purpose | Cost |
|:---|:---|:---|
| Google Search Console | Rankings, indexation | Free |
| Google Analytics | Traffic, behavior | Free |
| PageSpeed Insights | Core Web Vitals | Free |
| Ahrefs | Backlinks, keywords | Paid |
| Ubersuggest | Keyword research | Freemium |

---

## Anti-Patterns (TUYỆT ĐỐI KHÔNG)

1. ❌ Keyword stuffing — tự nhiên, density 1-2%
2. ❌ Duplicate content — luôn unique
3. ❌ Buying cheap backlinks — quality over quantity
4. ❌ Ignoring mobile SEO — mobile-first indexing
5. ❌ Thin content (<300 words) for competitive keywords
6. ❌ Neglecting internal linking — structure matters
7. ❌ Same anchor text cho mọi backlink — diversify

---

## Integration Points

| System | Integration |
|:---|:---|
| **WordPress** | On-page optimization cho xoamuai.io.vn |
| **SKILL-CONTENT-STRATEGY** | SEO keywords → content calendar |
| **SKILL-COPYWRITING** | SEO-optimized content briefs |
| **SKILL-BLOGGING** | Blog post optimization |
| **Google Search Console** | Performance monitoring |
