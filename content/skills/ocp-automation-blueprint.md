---
id: ocp-automation-blueprint
title: "OCP Automation Blueprint Designer"
description: "SOP biến một quy trình thủ công thành blueprint tự động hóa cho One-Person Company: map quy trình, phân tầng System 1/2, chọn công cụ, tính ROI."
category: system-design
tier: skill
persona: toilatung
author: "Lexi Intelligence Hub"
tags: ["OCP", "Automation", "n8n", "ROI", "System Design"]
inputs:
  - name: manual_process
    type: text
    description: "Mô tả quy trình thủ công hiện tại"
    required: true
  - name: hours_per_week
    type: number
    description: "Số giờ/tuần đang tốn"
    required: true
  - name: stack
    type: text
    description: "Công cụ đang dùng"
    required: false
tools:
  - "process_mapper"
  - "n8n_workflow_builder"
  - "cost_calculator"
audit_gates:
  - "ROI dương trong ≤ 3 tháng"
  - "Có điểm human-in-the-loop cho quyết định ảnh hưởng tiền/khách hàng"
  - "Có cơ chế cảnh báo khi workflow lỗi"
created_at: "2026-11-02"
---
# OCP AUTOMATION BLUEPRINT

## Bước 1 — Map quy trình hiện tại
{{manual_process}}
- Vẽ các bước, người làm, công cụ, thời gian; đánh dấu bước lặp lại và bước cần phán đoán.

## Bước 2 — Phân tầng System 1 / System 2
- System 1 (rule, regex, model nhẹ): bước lặp, định dạng, phân loại đơn giản.
- System 2 (model mạnh + người): phán đoán, đàm phán, ngoại lệ.

## Bước 3 — Chọn công cụ
- Ưu tiên tận dụng stack hiện có: {{stack}}
- Thiết kế workflow (trigger → xử lý → kiểm tra → hành động → log).

## Bước 4 — Tính ROI
- Thời gian tiết kiệm = {{hours_per_week}} giờ/tuần × tỉ lệ tự động hóa.
- Chi phí: công cụ + token + giờ bảo trì ước tính/tháng.
- ROI và thời gian hoàn vốn.

## Bước 5 — Triển khai an toàn
- Chạy song song (shadow mode) 1–2 tuần, so sánh kết quả với thủ công.
- Cảnh báo lỗi qua Telegram/Slack, tài liệu runbook 1 trang.
