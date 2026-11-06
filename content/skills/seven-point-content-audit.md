---
id: seven-point-content-audit
title: "7-Point Content Quality Audit"
description: "SOP kiểm toán 7 điểm trước khi xuất bản bất kỳ nội dung nào: intent, cấu trúc, E-E-A-T, giọng văn, visual, SEO kỹ thuật, CTA."
category: seo
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["7-Point Audit", "Quality Gate", "Content", "SEO", "Editorial"]
inputs:
  - name: draft_content
    type: markdown
    description: "Bản nháp cần kiểm toán"
    required: true
  - name: primary_keyword
    type: string
    description: "Từ khóa chính"
    required: true
  - name: target_reader
    type: string
    description: "Chân dung người đọc mục tiêu"
    required: false
tools:
  - "read_file"
  - "web_search (đối chiếu SERP)"
  - "readability_checker"
audit_gates:
  - "7-Point Quality Audit ≥ 85/100"
  - "Zero Hallucination: mọi số liệu có nguồn"
  - "Anti-AI Cliché Gate"
created_at: "2026-11-02"
---
# 7-POINT CONTENT QUALITY AUDIT

> Mục tiêu: không bài viết nào được xuất bản nếu chưa đạt ≥ 85/100 điểm.

## Bước 1 — Search Intent Match (15 điểm)
- Đối chiếu bài với top 5 SERP cho từ khóa **{{primary_keyword}}**: định dạng (hướng dẫn, danh sách, so sánh) có khớp không?
- Câu hỏi chính được trả lời trong 100 từ đầu tiên chưa?

## Bước 2 — Cấu Trúc & Khả Năng Quét (15 điểm)
- H1 duy nhất, H2/H3 logic, không nhảy cấp.
- Đoạn văn ≤ 4 câu; có mục lục nếu > 1.500 từ.

## Bước 3 — E-E-A-T (15 điểm)
- Có trải nghiệm thực tế, ví dụ cụ thể, tên tác giả và nguồn trích dẫn uy tín.
- Đánh dấu mọi số liệu không có nguồn → **FAIL Zero Hallucination**.

## Bước 4 — Giọng Văn & Anti-AI Cliché (15 điểm)
- Phù hợp người đọc: {{target_reader}}.
- Loại bỏ cụm sáo rỗng ("Trong bối cảnh...", "Kỷ nguyên số", "Hãy cùng khám phá").

## Bước 5 — Visual Anchoring (10 điểm)
- ≥ 1 ảnh bìa 16:9 + ≥ 2 sơ đồ/bảng minh họa, có alt text mô tả.

## Bước 6 — SEO Kỹ Thuật On-page (15 điểm)
- Title 50–60 ký tự, meta description 140–155 ký tự, slug ngắn.
- ≥ 3 internal link, ≥ 1 external link uy tín, schema phù hợp.

## Bước 7 — Chuyển Đổi & CTA (15 điểm)
- CTA rõ ràng phù hợp giai đoạn phễu, không quá 2 CTA chính.

## Đầu ra
Bảng điểm 7 hạng mục + tổng điểm + danh sách sửa đổi xếp theo tác động. Kết luận **PASS** (≥ 85) hoặc **FAIL**.

---
Nội dung cần kiểm toán:

{{draft_content}}
