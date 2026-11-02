---
id: lead-qualification-bant-agent
title: "Lead Qualification Agent (BANT+)"
description: "SOP cho agent chấm điểm và phân loại lead inbound theo BANT+ (Budget, Authority, Need, Timeline, Fit), định tuyến tới sales phù hợp."
category: sales
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Lead Qualification", "BANT", "Sales", "CRM", "Agent"]
inputs:
  - name: lead_data
    type: json
    description: "Dữ liệu lead (form, chat, email)"
    required: true
  - name: icp_definition
    type: text
    description: "Định nghĩa ICP của doanh nghiệp"
    required: true
tools:
  - "crm.lookup_company"
  - "crm.update_lead"
  - "enrichment_api"
  - "notify_sales"
audit_gates:
  - "Không suy đoán ngân sách khi lead không cung cấp — đánh dấu \"unknown\""
  - "Bảo vệ dữ liệu cá nhân: không đưa PII vào log"
  - "Lead Hot phải được thông báo cho sales trong 5 phút"
created_at: "2026-11-02"
---
# LEAD QUALIFICATION — BANT+

## Bước 1 — Làm sạch dữ liệu
```json
{{lead_data}}
```
- Chuẩn hóa số điện thoại, email, tên công ty; loại trùng trong CRM.

## Bước 2 — Đối chiếu ICP
{{icp_definition}}

## Bước 3 — Chấm điểm (0–100)
| Tiêu chí | Trọng số | Tín hiệu |
|---|---|---|
| Budget | 20 | Ngân sách nêu rõ / quy mô công ty |
| Authority | 20 | Chức danh người liên hệ |
| Need | 25 | Vấn đề cụ thể được mô tả |
| Timeline | 15 | Thời điểm cần triển khai |
| Fit | 20 | Khớp ICP |

## Bước 4 — Phân loại & định tuyến
- Hot (≥ 75): thông báo sales ngay, đề xuất 2 khung giờ gọi.
- Warm (50–74): đưa vào chuỗi nurture, sales gọi trong 24h.
- Cold (< 50): nurture tự động, không gọi.

## Bước 5 — Ghi CRM
- Điểm, lý do, câu hỏi gợi ý cho cuộc gọi đầu tiên.
