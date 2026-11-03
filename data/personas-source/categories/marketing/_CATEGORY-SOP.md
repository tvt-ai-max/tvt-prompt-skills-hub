# _CATEGORY-SOP.md — Marketing

> Standard Operating Procedures cho tất cả marketing tasks.
> Tham chiếu nhanh các workflow thường dùng nhất.

---

## 🔄 SOP-MKT-01: Campaign Launch (Bất kỳ campaign nào)

**Thời gian**: 2-5 ngày

```
Ngày 1: Research & Brief
  → Xác định goal (awareness/traffic/leads/sales)
  → Target audience profile
  → Budget & timeline
  → Competitor landscape

Ngày 2-3: Create
  → Creative assets (copy + visual/video)
  → Landing page / destination setup
  → Tracking setup (UTM, pixels)

Ngày 4: Launch
  → A/B test setup (2 variants minimum)
  → Go live: tất cả channels

Ngày 5+: Optimize
  → Monitor daily: CTR, CPC, Conversion
  → Kill underperformers sau 48-72h
  → Scale winners
```

**Checkpoint**: ✅ Campaign live với tracking đầy đủ

---

## 🔄 SOP-MKT-02: Monthly Content Calendar

**Thời gian**: 2-3 giờ/tháng (đầu tháng)

```
Bước 1: Performance review (30 min)
  → Top content tháng trước
  → Underperformers → lessons learned
  → Traffic & engagement trends

Bước 2: Planning (1 hour)
  → Seasonal events tháng này
  → Content pillars rotation
  → Keyword opportunities
  → Collaborative/campaign hooks

Bước 3: Calendar fill (1 hour)
  → 4 weeks × 5 days = 20 blog + 20 social slots
  → Assign writer/owner
  → Set deadlines (draft → review → publish)

Bước 4: Brief & Assign
  → Create content briefs cho từng piece
  → Assign resources
```

**Output**: Filled Notion/Spreadsheet calendar với briefs

---

## 🔄 SOP-MKT-03: SEO Audit (Hàng quý)

```
Tuần 1: Technical audit
  → Core Web Vitals check
  → Broken links scan
  → Indexation issues

Tuần 2: Content audit  
  → Top pages performance
  → Thin content identification
  → Keyword cannibalization

Tuần 3: Backlink audit
  → New/lost links
  → Toxic link disavow
  → Competitor link gaps

Tuần 4: Action plan
  → Priority fixes
  → New content opportunities
  → Link building targets
```

---

## 🔄 SOP-MKT-04: Video Production (với Hyperframes)

```
1. Script (30 min)        → SKILL-VIDEO-MARKETING or SKILL-UGC-CREATOR
2. TTS Audio             → say -v Linh + ffmpeg
3. Build HTML+GSAP       → Hyperframes composition
4. Validate              → npx hyperframes lint + validate
5. Render                → npx hyperframes render → MP4
6. Distribute            → SKILL-SOCIAL-MEDIA
```

---

## ✅ Marketing Quality Gates

### Copy Checklist
- [ ] Headline ≤60 chars, keyword at start
- [ ] Single CTA per piece
- [ ] Benefits > Features (3:1 ratio)
- [ ] Social proof included
- [ ] Mobile-friendly format

### Campaign Checklist
- [ ] Tracking pixels fired?
- [ ] UTM parameters on all links?
- [ ] A/B test running?
- [ ] Budget caps set?
- [ ] Negative keywords added (PPC)?

### Content Publish Checklist
- [ ] SEO score ≥80%?
- [ ] Internal links ≥3?
- [ ] Images optimized + alt text?
- [ ] Meta title + description set?
- [ ] Social cards (OG tags) set?

---

## 📊 Marketing KPI Dashboard

| Channel | Primary KPI | Secondary KPI | Review Freq |
|:---|:---|:---|:---|
| Blog/SEO | Organic sessions | Keyword rankings | Monthly |
| Social | Engagement rate | Follower growth | Weekly |
| Video | View-through rate | Shares | Per video |
| Email | Open rate | Click rate | Per campaign |
| Paid | ROAS | CPC | Daily |
| Affiliate | Revenue | Conversion rate | Monthly |

---

## 📎 Tài liệu liên quan

- Skills: `skills/SKILL-*.md` (8 skills)
- [SOP-CONTENT-PIPELINE](../../sops/SOP-CONTENT-PIPELINE.md)
- [SOP-QUALITY-CHECKLIST](../../sops/SOP-QUALITY-CHECKLIST.md)
