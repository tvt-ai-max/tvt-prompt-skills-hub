---
id: client-onboarding-sop
title: "Agency Client Onboarding SOP"
description: "Quy trình onboarding khách hàng mới trong 7 ngày: kickoff, thu thập quyền truy cập an toàn, audit ban đầu, kế hoạch 30-60-90."
category: operations
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["Onboarding", "Client Success", "Agency", "SOP"]
inputs:
  - name: client_name
    type: string
    description: "Tên khách hàng"
    required: true
  - name: services
    type: text
    description: "Dịch vụ đã ký"
    required: true
  - name: contract_start
    type: date
    description: "Ngày bắt đầu hợp đồng"
    required: true
tools:
  - "crm.create_project"
  - "password_manager.share_vault (không gửi mật khẩu qua chat)"
  - "calendar.schedule"
  - "docs.create_from_template"
audit_gates:
  - "Access Security Gate: quyền truy cập chỉ qua password manager / phân quyền người dùng"
  - "Kickoff Recap gửi trong 24h"
  - "Kế hoạch 30-60-90 được khách hàng xác nhận"
created_at: "2026-11-02"
---
# CLIENT ONBOARDING — {{client_name}}

Dịch vụ: {{services}}
Ngày bắt đầu: {{contract_start}}

## Ngày 0 — Chuẩn bị nội bộ
- Tạo project trên CRM, gán Account Lead + Specialist.
- Tạo thư mục tài liệu từ template, checklist truy cập.

## Ngày 1 — Kickoff Meeting (60 phút)
- Mục tiêu kinh doanh 90 ngày, KPI chính, người ra quyết định, kênh liên lạc, SLA phản hồi.
- Gửi Kickoff Recap trong 24h.

## Ngày 1–3 — Thu thập quyền truy cập
- Yêu cầu khách **thêm tài khoản agency làm người dùng** (Business Manager, GA4, GSC, hosting) thay vì gửi mật khẩu.
- Nếu bắt buộc dùng mật khẩu: chỉ qua password manager. **Không** nhận qua Zalo/email.

## Ngày 3–5 — Audit ban đầu
- Chạy các skill audit phù hợp dịch vụ (website, ads, SEO).
- Ghi nhận baseline số liệu.

## Ngày 6–7 — Kế hoạch 30-60-90
- Trình bày kết quả audit, quick wins, lộ trình và chỉ số kỳ vọng. Lấy xác nhận bằng văn bản.
