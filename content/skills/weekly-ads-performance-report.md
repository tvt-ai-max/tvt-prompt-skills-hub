---
id: weekly-ads-performance-report
title: "Weekly Ads Performance Analyst"
description: "SOP phân tích hiệu suất quảng cáo hàng tuần đa nền tảng: chuẩn hóa số liệu, phát hiện bất thường, chẩn đoán nguyên nhân, đề xuất hành động."
category: ads
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["Ads", "Reporting", "Analytics", "Meta Ads", "Google Ads"]
inputs:
  - name: metrics_export
    type: csv
    description: "Dữ liệu xuất từ nền tảng quảng cáo (CSV/bảng)"
    required: true
  - name: kpi_targets
    type: text
    description: "Mục tiêu KPI (CPA, ROAS...)"
    required: true
  - name: changes_log
    type: text
    description: "Thay đổi đã thực hiện trong tuần"
    required: false
tools:
  - "spreadsheet_parser"
  - "anomaly_detector"
  - "chart_generator"
audit_gates:
  - "Số liệu đối soát với nguồn gốc (không tự tính lại sai)"
  - "Mỗi insight có hành động đi kèm"
  - "Không đề xuất tăng ngân sách khi tracking chưa xác minh"
created_at: "2026-11-02"
---
# WEEKLY ADS PERFORMANCE ANALYSIS

## Bước 1 — Chuẩn hóa dữ liệu
- Đọc dữ liệu:
{{metrics_export}}
- Chuẩn hóa cột: spend, impressions, clicks, conversions, revenue; tính CTR, CPC, CPA, ROAS.

## Bước 2 — So sánh mục tiêu
- KPI mục tiêu: {{kpi_targets}}
- Trạng thái Xanh/Vàng/Đỏ cho từng campaign.

## Bước 3 — Phát hiện bất thường
- Biến động > 25% so với tuần trước; creative fatigue (frequency > 3, CTR giảm liên tục).

## Bước 4 — Chẩn đoán
- Đối chiếu nhật ký thay đổi: {{changes_log}}
- Phân biệt nguyên nhân: tracking, đấu giá, creative, landing page, mùa vụ.

## Bước 5 — Hành động
- Top 5 hành động: Scale / Giữ / Tối ưu / Tắt — kèm lý do và chỉ số kiểm chứng tuần sau.
