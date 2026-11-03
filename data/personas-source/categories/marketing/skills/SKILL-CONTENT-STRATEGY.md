---
name: content-strategy
category: marketing
persona-source: Content Strategist
description: |
  AI Agent Skill for content strategy planning and execution.
  Creates content calendars, editorial plans, audience analysis,
  and content mapping aligned with business goals.
  Use when asked to plan, organize, or strategize content creation.
---

# 📝 Content Strategy Skill

> End-to-end content strategy planning and execution.
> Input: Business goal or topic area. Output: Complete content plan with calendar.

## Trigger Phrases

Activate this skill when the user says:
- "Lập kế hoạch nội dung...", "Content plan for..."
- "Content calendar", "Lịch nội dung", "Editorial calendar"
- "Content strategy for...", "Chiến lược nội dung..."
- "Pillar content", "Content mapping"
- "Blog strategy", "Kế hoạch blog"
- "Content audit", "Đánh giá nội dung"

## Pipeline Overview

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 1. AUDIT │ →  │ 2. PLAN  │ →  │ 3. MAP   │ →  │4.CALENDAR│ →  │5.MEASURE │
│ Research │    │ Strategy │    │ Content  │    │ Schedule │    │ KPIs     │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## Step 1: Audit & Discovery (< 2 min)

Ask these ONLY if user hasn't specified:

| Question | Default |
|:---|:---|
| **Mục tiêu kinh doanh** (traffic/leads/brand awareness)? | Traffic growth |
| **Nền tảng** (Blog/Social/YouTube/All)? | Blog (WordPress) |
| **Target audience** (B2B/B2C/community)? | B2C Vietnamese |
| **Timeframe** (1 tháng / 1 quý / 6 tháng)? | 1 tháng (4 tuần) |
| **Existing content** (có sẵn / bắt đầu mới)? | Bắt đầu mới |
| **Tone of voice** (casual/professional/thought leader)? | Professional-casual |

### Audience Persona Quick-Build

```
Nếu chưa có audience persona, tạo nhanh:
- Tên: [Avatar name]
- Tuổi: [Range]
- Pain points: [Top 3]
- Content consumption: [Platforms + format]
- Decision triggers: [What makes them act]
```

---

## Step 2: Strategy Development

### Content Pillars (3-5 pillars)

Define core topic clusters:

```
Pillar 1: [Topic] — Vị trí: Awareness
  └── Sub-topics: [3-5 ideas]

Pillar 2: [Topic] — Vị trí: Consideration
  └── Sub-topics: [3-5 ideas]

Pillar 3: [Topic] — Vị trí: Decision
  └── Sub-topics: [3-5 ideas]
```

### Content Mix Formula

| Content Type | % of Total | Mục đích | Format |
|:---|:---:|:---|:---|
| **Educational** | 40% | Build trust | How-to, Guide, Tutorial |
| **Entertaining** | 20% | Engagement | Stories, Trends, Memes |
| **Inspirational** | 15% | Brand affinity | Case studies, Success stories |
| **Promotional** | 15% | Conversion | Product, CTA, Launch |
| **Community** | 10% | Retention | Q&A, UGC, Polls |

### Keyword Strategy

```
1. Xác định 5-10 primary keywords (high volume)
2. Mở rộng 20-30 long-tail keywords
3. Map keywords → content pillars
4. Prioritize: Search volume × Relevance × Competition
```

---

## Step 3: Content Mapping

### Content Funnel Map

```
TOFU (Top of Funnel) — Awareness
├── Blog posts (SEO-optimized)
├── Social media posts
├── Infographics
└── Short videos (Reels/Shorts)

MOFU (Middle of Funnel) — Consideration
├── In-depth guides
├── Comparison posts
├── Webinar/Live content
└── Email sequences

BOFU (Bottom of Funnel) — Decision
├── Case studies
├── Product demos
├── Testimonials/Reviews
└── Free trials/Samples
```

### Content Repurposing Chain

```
1 Blog Post (1500+ words)
  → 5-10 Social posts
  → 1 Email newsletter
  → 1 Short video script (→ delegate to SKILL-VIDEO-MARKETING)
  → 3-5 Quote graphics
  → 1 Thread (X/Twitter)
```

---

## Step 4: Editorial Calendar

### Monthly Calendar Template

```markdown
## Week 1: [Theme]
| Day | Platform | Content Type | Topic | Status |
|:----|:---------|:-------------|:------|:-------|
| Mon | Blog     | Article      | [Topic] | [ ] Draft |
| Tue | Social   | Post         | [Topic] | [ ] Scheduled |
| Wed | Email    | Newsletter   | [Topic] | [ ] Draft |
| Thu | Social   | Reel/Short   | [Topic] | [ ] Script |
| Fri | Blog     | Article      | [Topic] | [ ] Draft |

## Week 2: [Theme]
... (repeat pattern)
```

### Publishing Cadence (recommended)

| Platform | Frequency | Best Time (VN) |
|:---|:---|:---|
| Blog | 2-3x/tuần | Publish 8:00 AM |
| Facebook | 1x/ngày | 11:00-13:00, 19:00-21:00 |
| TikTok | 1-2x/ngày | 12:00, 19:00, 21:00 |
| Instagram | 1x/ngày | 11:00, 17:00 |
| Email | 1x/tuần | Thứ 3 or Thứ 5, 9:00 AM |
| YouTube | 1-2x/tuần | 14:00-16:00 |

---

## Step 5: KPIs & Measurement

### Core Metrics

| Metric | Formula | Target |
|:---|:---|:---|
| **Traffic Growth** | Monthly unique visitors | +20%/month |
| **Engagement Rate** | (Likes+Comments+Shares)/Reach × 100 | >3% |
| **Email Open Rate** | Opens/Delivered × 100 | >25% |
| **Conversion Rate** | Conversions/Visitors × 100 | >2% |
| **Content ROI** | (Revenue - Cost) / Cost × 100 | Positive |
| **Time on Page** | Avg session duration | >2 min |

### Monthly Review Template

```markdown
## Content Performance Review — [Month]

### 📊 Key Numbers
- Total posts published: X
- Total reach: X
- Top performing content: [Title]
- Worst performing: [Title]

### 📈 What Worked
1. [Insight]
2. [Insight]

### 📉 What Didn't
1. [Insight]

### 🎯 Next Month Focus
1. [Action]
2. [Action]
```

---

## Anti-Patterns (TUYỆT ĐỐI KHÔNG)

1. ❌ Tạo content không có keyword research — luôn research trước
2. ❌ Publish without SEO optimization — delegate sang SKILL-SEO-OPTIMIZER
3. ❌ Chỉ tạo promotional content — follow 40/20/15/15/10 mix
4. ❌ Bỏ qua repurposing — 1 content phải sinh ra 5+ formats
5. ❌ Không đo lường — mỗi content phải có KPI
6. ❌ Copy paste content giữa platforms — adapt cho từng nền tảng
7. ❌ Tạo calendar quá xa (>3 tháng chi tiết) — thị trường thay đổi nhanh

---

## Integration Points

| System | Integration |
|:---|:---|
| **WordPress** | Publish blog posts → xoamuai.io.vn |
| **SKILL-SEO-OPTIMIZER** | SEO audit trước khi publish |
| **SKILL-COPYWRITING** | Delegate writing tasks |
| **SKILL-SOCIAL-MEDIA** | Distribute across platforms |
| **SKILL-VIDEO-MARKETING** | Convert blog → video |
| **OpenClaw** | Auto-research trending topics |
| **Telegram** | Push notifications cho new content |

---

## Examples

### Example 1: Blog Content Plan cho SaaS

**Input**: "Tạo content plan 1 tháng cho blog AI tools"

**Output**: Complete plan with:
- 3 content pillars (AI Basics, Tool Reviews, Use Cases)
- 12 blog topics with keywords
- Editorial calendar 4 tuần
- KPI targets
- Repurposing roadmap
