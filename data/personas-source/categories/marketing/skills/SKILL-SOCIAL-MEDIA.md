---
name: social-media
category: marketing
persona-source: Social Media Manager
description: |
  AI Agent Skill for social media management across platforms.
  Creates platform-optimized content, engagement strategies, and posting schedules.
  Use when asked to manage, plan, or create social media content.
---

# 📱 Social Media Skill

> Multi-platform social media content creation and management.
> Input: Topic or campaign brief. Output: Platform-optimized posts + schedule.

## Trigger Phrases

Activate this skill when the user says:
- "Tạo post cho...", "Social media post..."
- "Facebook/Instagram/TikTok/LinkedIn content..."
- "Social calendar", "Lịch đăng bài..."
- "Engagement strategy", "Chiến lược social..."
- "Hashtag strategy", "Caption cho..."
- "Social media campaign..."

## Pipeline Overview

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│1.PLATFORM│ →  │2.CONTENT │ →  │3.OPTIMIZE│ →  │4.SCHEDULE│
│ Strategy │    │ Create   │    │ Per-plat │    │ Publish  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## Step 1: Platform Strategy

### Platform Selection Matrix

| Platform | Audience | Best Content | Post Length | Hashtags |
|:---|:---|:---|:---|:---:|
| **Facebook** | 25-55, đa dạng | Stories, Video, Groups | 80-100 chars | 1-3 |
| **Instagram** | 18-34, visual | Reels, Stories, Carousel | 125-150 chars | 20-30 |
| **TikTok** | 16-30, Gen Z | Short video, Trends | 80-100 chars | 3-5 |
| **LinkedIn** | 25-55, B2B | Articles, Thought leadership | 150-300 chars | 3-5 |
| **X (Twitter)** | 18-45, news | Threads, Hot takes | 240 chars max | 1-2 |
| **YouTube** | 18-45, edu | Long-form, Shorts | Title 60 chars | 5-10 tags |

### Optimal Posting Times (Vietnam)

| Platform | Mon-Fri | Weekend | Peak |
|:---|:---|:---|:---|
| Facebook | 11-13h, 19-21h | 10-12h | Thứ 4 19h |
| Instagram | 11-13h, 17-19h | 10-11h | Thứ 3 11h |
| TikTok | 12h, 19h, 21h | 10h, 15h | Thứ 5 19h |
| LinkedIn | 8-10h, 12h | N/A | Thứ 3 9h |
| X | 8-10h, 12h, 18h | 10h | Thứ 2 9h |

---

## Step 2: Content Creation

### Post Formula: AIDA for Social

```
A — Attention: Hook line (đầu caption, 1 câu gây chú ý)
I — Interest: Vấn đề/câu chuyện (2-3 câu)
D — Desire: Giải pháp/lợi ích (2-3 câu)  
A — Action: CTA rõ ràng (1 câu)
```

### Content Formats by Platform

#### Facebook Post Template
```
[🎯 Hook — câu gây chú ý]

[2-3 câu mô tả vấn đề/insight]

[Giải pháp hoặc value]

👉 [CTA — comment, share, click link]

#hashtag1 #hashtag2
```

#### Instagram Caption Template
```
[Hook line — emoji + bold statement] ✨

[Story/value in 3-5 short paragraphs]

💡 Save this post for later!

.
.
.
#hashtag1 #hashtag2 ... #hashtag30
```

#### LinkedIn Post Template
```
[Bold opening statement — controversial or insightful]

[3-5 short paragraphs with line breaks]

Here's what I learned:

→ Point 1
→ Point 2  
→ Point 3

[Question to drive engagement]

#hashtag1 #hashtag2 #hashtag3
```

#### TikTok/Reels Script Template
```
HOOK (0-3s): [Gây sốc, câu hỏi, hoặc visual striking]
BODY (3-12s): [Nội dung chính, 2-3 points]
CTA (12-15s): [Follow, Like, Comment prompt]

Audio: [Trending sound / Original]
Text overlay: [Key message]
```

### Hashtag Strategy

```
Mix ratio cho mỗi post:
- 30% High volume (>1M posts): Brand awareness
- 40% Medium volume (100K-1M): Reach balance
- 30% Niche (10K-100K): Targeted engagement

Research: Dùng hashtag suggestions trên platform
Track: Note lại hashtags nào perform tốt nhất
```

---

## Step 3: Platform Optimization

### Image/Video Specs

| Platform | Image | Video | Story/Reel |
|:---|:---|:---|:---|
| Facebook | 1200×630 | 1280×720 | 1080×1920 |
| Instagram | 1080×1080 | 1080×1080 | 1080×1920 |
| TikTok | — | 1080×1920 | 1080×1920 |
| LinkedIn | 1200×627 | 1920×1080 | — |
| X | 1600×900 | 1280×720 | — |

### Engagement Boosters

1. **Ask questions** — Kết thúc mỗi post bằng câu hỏi
2. **Respond within 1h** — Reply comment nhanh = boost algorithm
3. **Cross-promote** — Share across platforms (adapted)
4. **User-generated content** — Repost, tag, feature followers
5. **Carousel/Thread** — Multi-slide = higher save rate

---

## Step 4: Schedule & Publish

### Weekly Content Calendar

```markdown
| Day | Platform | Type | Topic | Time | Status |
|:----|:---------|:-----|:------|:-----|:-------|
| Mon | FB + IG  | Post | [Topic] | 11:00 | [ ] |
| Tue | LinkedIn | Article | [Topic] | 09:00 | [ ] |
| Wed | TikTok | Reel | [Topic] | 19:00 | [ ] |
| Thu | FB + IG | Carousel | [Topic] | 17:00 | [ ] |
| Fri | X | Thread | [Topic] | 12:00 | [ ] |
| Sat | IG | Story | [Topic] | 10:00 | [ ] |
| Sun | TikTok | Reel | [Topic] | 15:00 | [ ] |
```

---

## Anti-Patterns (TUYỆT ĐỐI KHÔNG)

1. ❌ Same post across all platforms — adapt per platform
2. ❌ Over-hashtagging on Facebook/LinkedIn — max 3-5
3. ❌ Posting without hook — first 3 seconds quyết định
4. ❌ Ignoring comments — engagement = algorithm boost
5. ❌ Only promotional content — follow 80/20 rule (80% value, 20% promo)
6. ❌ Landscape video for TikTok/Reels — always 9:16

---

## Integration Points

| System | Integration |
|:---|:---|
| **SKILL-CONTENT-STRATEGY** | Content plan → social calendar |
| **SKILL-COPYWRITING** | Caption writing |
| **SKILL-VIDEO-MARKETING** | Video content → social distribution |
| **SKILL-UGC-CREATOR** | UGC content for social |
| **Hyperframes** | Generate video assets |
| **Telegram** | Auto-notify new posts |
