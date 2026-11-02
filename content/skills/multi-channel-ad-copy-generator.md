---
id: multi-channel-ad-copy-generator
title: "Multi-Channel Paid Ad Copy Generator"
description: "Multi-Channel Paid Ad Copy Generator — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent."
category: copywriting
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Ad Copy", "Paid Ads", "Facebook Ads", "Google Ads", "LinkedIn Ads", "Copywriting"]
inputs:
  - name: offer_brief
    type: textarea
    description: "Bản tóm tắt sản phẩm/dịch vụ, đối tượng mục tiêu, USP và ưu đãi chính"
    required: true
  - name: ad_platform
    type: string
    description: "Nền tảng quảng cáo (Facebook, Google Search, LinkedIn)"
    required: true
  - name: target_audience
    type: string
    description: "Chân dung khách hàng mục tiêu"
    required: false
audit_gates: ["10-Point Ad Quality Gate", "Anti-Secret Redaction Gate", "Platform Policy Compliance Gate"]
tools: ["web_search", "read_file"]
created_at: "2026-11-03"
---
<!-- Vá 2026-09 (audit AI-TU-HANH): file gốc không có frontmatter YAML nào ở
     đầu file (dòng "---" đầu tiên nằm ở giữa nội dung, dùng làm dấu phân cách
     markdown, không phải khối YAML) — Claude Code chỉ đọc name/description từ
     đúng khối frontmatter ở đầu file nên skill này trước đây không tự kích
     hoạt được. Nội dung bên dưới giữ nguyên không đổi. -->

# Skill: Ad Copy Generator

**Version:** 1.0.0  
**Category:** Marketing / Advertising  
**Author:** max_0x1  
**License:** MIT-0  

---

## Overview

Generate high-converting ad copy for Google Ads, Facebook/Instagram Ads, LinkedIn Ads, and retargeting campaigns. Stop paying $75–$300/ad to copywriters or $49/month for bloated AI tools. One prompt, four platforms, done.

---

## What This Skill Does

Takes your product/service details and generates:

1. **Google Search Ads** — 3 headlines (30 chars), 2 descriptions (90 chars), 5 RSA headline variants, 3 ad extensions (sitelinks, callouts, structured snippets)
2. **Facebook/Instagram Ads** — Primary text (125 chars hook), body copy (3 variants: story, problem/solution, social proof), headline + CTA button recommendation
3. **LinkedIn Ads** — Sponsored content (intro text + headline + description), Lead Gen Form copy, InMail subject line + body
4. **Retargeting Copy** — Abandoned cart, past visitor win-back, upsell/cross-sell (3 angle variants each: urgency, social proof, objection removal)

---

## Prompts

| File | What It Generates |
|------|------------------|
| `prompts/google-ads.md` | RSA headlines, descriptions, ad extensions |
| `prompts/facebook-instagram.md` | FB/IG ad copy — 3 variant styles |
| `prompts/linkedin-ads.md` | Sponsored content + InMail + Lead Gen Form |
| `prompts/retargeting.md` | Retargeting sequences — 3 angles per stage |

---

## Inputs Required

- **Product/Service name:** What you're selling
- **Core benefit:** The #1 thing it does for the customer
- **Target audience:** Who you're targeting (demographics, job title, pain point)
- **Price/offer:** What the offer is (free trial, $X off, limited time, etc.)
- **Tone:** Professional / Conversational / Urgent / Aspirational
- **Platform budget tier:** Awareness / Consideration / Conversion

---

## Example Output Summary

**Product:** SaaS project management tool for remote teams  
**Benefit:** Cut project delays by 40%  
**Audience:** Operations managers, 50–500 person companies  

Google Headline 1: "Manage Remote Teams Smarter"  
Facebook Hook: "If your team misses deadlines, the tool isn't the problem — the system is."  
LinkedIn Intro: "Operations managers: what if you could cut project delays by 40% without adding headcount?"  
Retargeting (urgency): "You looked at [Product] last week. Your competitors already signed up."  

---

## Pricing

- **Free tier:** Google Ads prompt only
- **Paid tier:** $29 one-time — all 4 platforms
- **DFY tier:** $79/campaign — Max runs it for you (custom research + full ad set)

---

## Who This Is For

- SaaS founders running their first paid campaigns
- E-commerce stores scaling Facebook/Instagram spend
- B2B companies testing LinkedIn lead gen
- Agencies that need fast copy turnaround for multiple clients
- Freelancers who sell marketing services but hate writing ads

---

## Why It Beats the Alternatives

| Option | Cost | Time | Quality |
|--------|------|------|---------|
| Human copywriter | $75–$300/ad | 2–5 days | High |
| Copy.ai / Jasper | $49–$82/month | 20 min | Medium |
| ChatGPT (generic) | Your time | 45 min | Low-Medium |
| **This skill** | **$29 once** | **5 min** | **High** |

---

## Notes

- All prompts tested against real campaign briefs
- Google Ads prompts follow RSA best practices (character limits enforced)
- Facebook copy follows Meta's primary text guidelines
- LinkedIn copy follows sponsored content specs
- Retargeting sequences designed around buyer psychology (Cialdini principles)

## Tham Số Đầu Vào Của Kỹ Năng
- **offer_brief** (Bản tóm tắt sản phẩm/dịch vụ, đối tượng mục tiêu, USP và ưu đãi chính): `{{offer_brief}}`
- **ad_platform** (Nền tảng quảng cáo (Facebook, Google Search, LinkedIn)): `{{ad_platform}}`
- **target_audience** (Chân dung khách hàng mục tiêu): `{{target_audience}}`

