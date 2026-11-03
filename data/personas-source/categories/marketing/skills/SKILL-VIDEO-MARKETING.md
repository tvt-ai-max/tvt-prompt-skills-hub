---
name: video-marketing
category: marketing
persona-source: Video Marketing Specialist
description: |
  AI Agent Skill for video content strategy and optimization.
  Plans video campaigns, optimizes for platforms, and tracks performance.
  Bridges with Hyperframes Video Factory for automated production.
---

# 🎥 Video Marketing Skill

> Video content strategy, optimization, and campaign management.
> Input: Video goal or brief. Output: Video strategy + script → delegate to Hyperframes.

## Trigger Phrases

- "Video strategy cho...", "Video campaign..."
- "YouTube strategy...", "Video SEO..."
- "Video content plan...", "Kế hoạch video..."
- "Optimize video for...", "Video analytics..."
- "Thumbnail strategy...", "Video funnel..."

## Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│1.STRATEGY│ →  │ 2. PLAN  │ →  │3.PRODUCE │ →  │4.OPTIMIZE│
│ Research │    │ Script   │    │ Render   │    │ Measure  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## Step 1: Video Strategy

### Platform-Video Matrix

| Platform | Duration | Aspect | Style | SEO Impact |
|:---|:---|:---|:---|:---|
| TikTok | 15-60s | 9:16 | Raw, trending | Low |
| Reels | 15-90s | 9:16 | Polished casual | Medium |
| Shorts | 15-60s | 9:16 | Educational | High (YouTube) |
| YouTube | 8-15min | 16:9 | In-depth | Very High |
| LinkedIn | 30s-5min | 16:9 | Professional | Medium |
| Facebook | 15s-3min | 1:1/16:9 | Engaging | Low |

### Video Types by Goal

| Goal | Video Type | Duration | CTA |
|:---|:---|:---|:---|
| Awareness | Hook/Viral | 15-30s | Follow/Share |
| Education | Tutorial | 3-10min | Subscribe |
| Consideration | Review/Demo | 2-5min | Learn more |
| Conversion | Testimonial | 30-60s | Buy/Sign up |
| Retention | Series/BTS | 5-15min | Notify |

---

## Step 2: Script Planning

### Video Script Table

| Time | Voice Script | Visual | Text Overlay | Animation |
|:---|:---|:---|:---|:---|
| 0-3s | "Hook line" | [Visual hook] | Key text | fadeUp |
| 3-8s | "Context" | [Supporting] | [Support text] | slideLeft |
| 8-20s | "Main content" | [Demo/proof] | [Key points] | scale |
| 20-25s | "Summary" | [Result] | [Conclusion] | — |
| 25-30s | "CTA" | [CTA visual] | [CTA text] | pulse |

→ **For production**: Delegate to `SKILL-VIDEO-FACTORY` (Hyperframes)

---

## Step 3: Production

### Self-Produce Checklist
- [ ] Script approved
- [ ] Audio recorded (TTS or voiceover)
- [ ] Visual assets prepared
- [ ] Composition built (Hyperframes HTML+GSAP)
- [ ] Validated (`npx hyperframes lint/validate`)
- [ ] Rendered to MP4

### Delegate to Hyperframes
```bash
# Trong Hyperframes project:
# 1. Build composition
# 2. Validate & render
npx hyperframes render <project-dir> --output output/videos/<name>.mp4
```

---

## Step 4: Optimization

### Video SEO (YouTube)

| Element | Best Practice |
|:---|:---|
| **Title** | Keyword + benefit, 60 chars max |
| **Description** | 250+ words, keywords in first 2 lines |
| **Tags** | 10-15 relevant tags |
| **Thumbnail** | High contrast, face, 3 words max |
| **Chapters** | Timestamps every 2-3 minutes |
| **End Screen** | Subscribe + next video |
| **Cards** | 2-3 relevant links |

### Performance Metrics

| Metric | Target | Why |
|:---|:---|:---|
| View-through rate | >50% | Content quality |
| Click-through rate | >5% | Thumbnail + title |
| Average view duration | >50% | Engagement |
| Likes/views | >4% | Content value |
| Comment rate | >1% | Community |

---

## Anti-Patterns

1. ❌ No hook in first 3 seconds
2. ❌ Same video for all platforms — adapt
3. ❌ Ignoring thumbnails — 50% of CTR
4. ❌ No captions — 85% watch muted
5. ❌ Landscape on short-form platforms

---

## Integration Points

| System | Integration |
|:---|:---|
| **Hyperframes** | Video production pipeline |
| **SKILL-VIDEO-FACTORY** | Automated rendering |
| **SKILL-UGC-CREATOR** | UGC-style video scripts |
| **SKILL-SOCIAL-MEDIA** | Distribution |
| **SKILL-SEO-OPTIMIZER** | YouTube SEO |
