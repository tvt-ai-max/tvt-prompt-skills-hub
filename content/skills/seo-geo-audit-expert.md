---
id: seo-geo-audit-expert
title: B2B SEO & GEO Content Quality Auditor
description: SOP tự động kiểm toán bài viết chuẩn 7-Point Audit, kiểm tra Visual Anchoring và tối ưu hóa Generative Engine Optimization.
category: seo
tier: skill
persona: tvt-agency
tags: ["SEO", "GEO", "Audit", "Quality Gate", "Content"]
inputs:
  - name: draft_content
    type: string
    description: Nội dung bản nháp bài viết cần kiểm toán
    required: true
  - name: primary_keyword
    type: string
    description: Từ khóa chính hoặc chủ đề thực thể
    required: true
audit_gates:
  - 7-Point Quality Audit
  - Visual Anchoring Gate (Tối thiểu 1 cover 16:9 + 2 sơ đồ in-content)
  - Anti-AI Cliché Gate (Xóa 100% từ ngữ sáo rỗng và gạch đầu dòng máy móc)
  - Zero Side-Effect & Redaction Gate
---

# SƠ ĐỒ THỰC THI KIỂM TOÁN (SOP):

## Bước 1: Quét Cấu Trúc Thực Thể & GEO (Generative Engine Optimization)
- Kiểm tra tính mạch lạc của các thẻ H2, H3.
- Bài viết có trả lời trực diện câu hỏi trọng tâm trong 100 từ đầu tiên để các mô hình tìm kiếm AI (Perplexity, SearchGPT, Gemini) dễ trích xuất hay không?

## Bước 2: Visual Anchoring Gate
- Xác nhận bài viết có ít nhất 1 ảnh bìa 16:9 WebP và 2-3 sơ đồ quy trình / infographic so sánh dưới các mục H2.
- Tuyệt đối từ chối bài viết chỉ có "rừng chữ" (text-only wall).

## Bước 3: Anti-AI Cliché & Giọng Văn Thật
- Xóa bỏ các mẫu mở đầu giải trình bất lực ("Tôi hiểu rằng...", "Dưới đây là...").
- Kiểm tra xưng hô nhất quán, chuyển ngữ mượt mà.

## Bước 4: Chấm Điểm & Xuất Báo Cáo
- Chấm điểm trên thang 100:
  - ≥ 85 điểm: PASS — Đủ điều kiện xuất bản lên CMS/WordPress.
  - < 85 điểm: FAIL — Kèm danh sách các vị trí cần sửa đổi cụ thể.
