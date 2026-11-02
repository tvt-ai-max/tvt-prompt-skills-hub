---
id: aarrr-growth-funnel-diagnostician
title: "AARRR Pirate Metrics & Growth Funnel Diagnostician"
description: "AARRR Pirate Metrics & Growth Funnel Diagnostician — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent."
category: marketing
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Growth Funnel", "AARRR", "Retention", "Bottleneck Diagnosis", "Unit Economics"]
inputs:
  - name: funnel_stages_data
    type: textarea
    description: "Số liệu các tầng phễu hiện tại: Acquisition, Activation, Retention, Revenue, Referral"
    required: true
  - name: primary_bottleneck
    type: string
    description: "Điểm rơi chuyển đổi hoặc nút thắt nghi vấn"
    required: false
audit_gates: ["Data-Driven Attribution Gate", "Retention Cohort Analysis Gate", "Actionable Experiment Gate"]
tools: ["read_file", "web_search"]
created_at: "2026-11-03"
---
# Strategies: Growth Funnel (AARRR)

Guides growth using the AARRR framework (Pirate Metrics)—five stages of the customer lifecycle. Created by Dave McClure (500 Startups) to focus on actionable metrics over vanity metrics. Use this skill when diagnosing growth bottlenecks, prioritizing improvements, or aligning product, marketing, and customer success.

**When invoking**: On **first use**, if helpful, open with 1–2 sentences on what this skill covers and why it matters, then provide the main output. On **subsequent use** or when the user asks to skip, go directly to the main output.

## AARRR Framework

| Stage | Question | Key metrics |
|-------|----------|-------------|
| **Acquisition** | How do users discover you? | CAC, CPA, conversion by source |
| **Activation** | Do users reach "aha moment"? | Activation rate, time-to-first-value |
| **Retention** | Do users return? | D1/D7/D30 retention, churn |
| **Referral** | Do users recommend? | Referral rate, NPS, viral coefficient |
| **Revenue** | Do users pay? | Conversion rate, ARPU, LTV |

**Principle**: Define behavior-based events per stage; analyze by cohort. Quality over volume—channels bringing fewer but more activated users often outperform.

## Per-Stage Actions

| Stage | Actions | Related skills |
|-------|---------|----------------|
| **Acquisition** | SEO, paid ads, content, partnerships, directories, marketplaces | cold-start-strategy, seo-strategy, paid-ads-strategy, directory-submission, distribution-channels |
| **Activation** | Onboarding, use-case guidance, FAQ, case studies, free trials, trust signals | conversion-optimization, faq-page-generator, customer-stories-page-generator |
| **Retention** | Support, churn analysis, feedback, loyalty, dunning | retention-strategy, email-marketing |
| **Referral** | Referral program, affiliate, case study sharing | referral-program, affiliate-marketing |
| **Revenue** | Pricing, conversion optimization, CAC vs LTV analysis | pricing-strategy, conversion-optimization, paid-ads-strategy |

## Tactics by Stage

| Stage | Tactics |
|-------|---------|
| **Acquisition** | Google ads (keywords, display); organic SEO; social (LinkedIn, YouTube, X, blog); partnerships (NGOs, SMBs); directories, marketplaces |
| **Activation** | Use-case guidance; video + blog tutorials; FAQ; case studies; free trials/credits; new-feature promotion; email; trust signals (reviews, media) |
| **Retention** | Timely support; churn analysis; feedback collection; loyalty perks (credits, early access) |
| **Referral** | Referral credits; signup email with referral CTA; enterprise case sharing; affiliate program |
| **Revenue** | Conversion optimization; platform attribution; CAC vs LTV; post-campaign traffic analysis |

**Post-campaign**: Analyze traffic and conversion by channel; reallocate budget to top performers.

## Implementation

- **Events**: Define precise, behavior-based events for each stage
- **Cohorts**: Analyze by cohort, not aggregate; compare cohorts over time
- **Bottlenecks**: Identify stage with largest drop-off; prioritize there first
- **Cross-functional**: Product, marketing, customer success share common language

## Output Format

- **Stage** assessment (where are you strong/weak?)
- **Metrics** per stage (current, target)
- **Actions** prioritized by bottleneck
- **Related** skills for each stage

## Related Skills

- **cold-start-strategy**: Acquisition for 0→1; first users
- **retention-strategy**: Retention and churn prevention
- **conversion-optimization**: Activation, revenue conversion
- **referral-program**: Referral stage tactics
- **gtm-strategy**: Full GTM; growth-funnel is lifecycle view
- **integrated-marketing**: Channel mix across stages

## Tham Số Đầu Vào Của Kỹ Năng
- **funnel_stages_data** (Số liệu các tầng phễu hiện tại: Acquisition, Activation, Retention, Revenue, Referral): `{{funnel_stages_data}}`
- **primary_bottleneck** (Điểm rơi chuyển đổi hoặc nút thắt nghi vấn): `{{primary_bottleneck}}`

