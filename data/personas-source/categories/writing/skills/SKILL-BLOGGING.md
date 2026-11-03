---
name: blogging
category: writing
persona-source: Blogger
description: |
  AI Agent Skill for blog content creation optimized for xoamuai.io.vn.
  Creates SEO-optimized articles, formats for WordPress, and tracks performance.
---

# 📝 Blogging Skill

> SEO-optimized blog creation for WordPress publishing.
> Input: Topic or keyword. Output: Ready-to-publish blog post.

## Trigger Phrases

- "Viết blog về...", "Blog post about..."
- "Bài viết cho xoamuai...", "Article for..."
- "WordPress post...", "Publish article..."

## Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│1.RESEARCH│ →  │ 2. WRITE │ →  │ 3. SEO   │ →  │4.PUBLISH │
│ Keyword  │    │ Draft    │    │ Optimize │    │ WordPress│
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

## Blog Post Structure

```markdown
# [H1 — Keyword + Benefit] (50-60 chars)

[Meta description — 155 chars max]

[Opening hook — 100 words, keyword in first paragraph]

## [H2 — Section with keyword variation]
[200-300 words + supporting media]

### [H3 — Sub-point]
[Detail + examples]

## [H2 — FAQ Section]
### [Long-tail keyword question]?
[Direct answer — 50-100 words]

## [Conclusion + CTA]
[Summary + next action]
```

## Quality Checklist

- [ ] 1500+ words for competitive keywords
- [ ] Keyword in H1, first paragraph, and 1-2 H2s
- [ ] 3-5 internal links to related posts
- [ ] 1-2 external authority links
- [ ] Images with alt text
- [ ] Meta title and description set
- [ ] Categories and tags assigned
- [ ] Mobile preview checked

## Anti-Patterns

1. ❌ Thin content (<500 words)
2. ❌ Keyword stuffing — natural density 1-2%
3. ❌ No internal links — always link related content
4. ❌ Publishing without SEO review → use SKILL-SEO-OPTIMIZER

## Integration

| System | Integration |
|:---|:---|
| **WordPress** | xoamuai.io.vn publishing |
| **SKILL-SEO-OPTIMIZER** | Pre-publish SEO audit |
| **SKILL-CONTENT-STRATEGY** | Content calendar → blog topics |
| **SKILL-COPYWRITING** | Headline and CTA writing |
| **OpenClaw** | Topic research automation |
