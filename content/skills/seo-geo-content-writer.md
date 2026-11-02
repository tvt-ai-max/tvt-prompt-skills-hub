---
id: seo-geo-content-writer
title: "SEO/GEO Answer-First Content Writer"
description: "SOP viết bài long-form chuẩn SEO + GEO: nghiên cứu SERP, dàn ý Answer-first, viết, chèn internal link, tự kiểm toán trước khi bàn giao."
category: seo
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["SEO", "GEO", "Content Writing", "Topic Cluster", "Answer-first"]
inputs:
  - name: primary_keyword
    type: string
    description: "Từ khóa chính"
    required: true
  - name: cluster_context
    type: text
    description: "Pillar/cluster liên quan và các bài nội bộ có thể link"
    required: true
  - name: brand_voice
    type: string
    description: "Giọng thương hiệu"
    required: false
  - name: word_count
    type: number
    description: "Độ dài mục tiêu (từ)"
    required: false
tools:
  - "web_search"
  - "serp_analyzer"
  - "internal_link_index"
  - "seven-point-content-audit (skill)"
audit_gates:
  - "Answer-first trong 100 từ đầu"
  - "Internal link 2 chiều với pillar"
  - "Chạy 7-Point Content Quality Audit ≥ 85 trước khi bàn giao"
created_at: "2026-11-02"
---
# SEO/GEO CONTENT WRITER SOP

## Bước 1 — Nghiên cứu
- Phân tích top 10 SERP cho **{{primary_keyword}}**: intent, định dạng, độ dài, câu hỏi PAA.
- Ghi lại 3 khoảng trống nội dung đối thủ bỏ sót.

## Bước 2 — Dàn ý Answer-first
- H1 chứa từ khóa, đoạn mở đầu trả lời trực tiếp câu hỏi chính (≤ 60 từ) — đoạn này là "đoạn trích GEO".
- H2 theo hành trình người đọc: Cái gì → Tại sao → Làm thế nào → So sánh → Sai lầm → FAQ.
- Mỗi H2 bắt đầu bằng 1 câu tóm tắt có thể trích dẫn độc lập.

## Bước 3 — Viết
- Độ dài mục tiêu: {{word_count}} từ. Giọng: {{brand_voice}}.
- Mỗi luận điểm có ví dụ, số liệu (kèm nguồn) hoặc trải nghiệm thực tế.
- Thêm bảng so sánh hoặc checklist ít nhất 1 lần.

## Bước 4 — Liên kết
- Ngữ cảnh cluster:
{{cluster_context}}
- Link lên pillar + 2 cluster liên quan; ghi chú để pillar link ngược về bài này.

## Bước 5 — FAQ & Schema
- 4–6 câu hỏi PAA, trả lời ≤ 80 từ; đề xuất JSON-LD FAQPage.

## Bước 6 — Tự kiểm toán
- Chạy skill `seven-point-content-audit`. Chỉ bàn giao khi đạt ≥ 85 điểm.
- CTA 3 cấp: đọc thêm (bài liên quan) → tải tài nguyên → liên hệ tư vấn.
