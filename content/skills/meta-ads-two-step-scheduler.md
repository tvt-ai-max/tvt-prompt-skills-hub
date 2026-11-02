---
id: meta-ads-two-step-scheduler
title: "Meta Ads 2-Step Campaign Scheduler"
description: "Quy trình 2 bước an toàn khi agent lên lịch chiến dịch Meta Ads: Bước 1 tạo bản nháp PAUSED và preview, Bước 2 chỉ kích hoạt sau khi con người duyệt."
category: ads
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Meta Ads", "Facebook Ads", "Automation", "Human-in-the-loop", "Scheduling"]
inputs:
  - name: campaign_brief
    type: markdown
    description: "Brief chiến dịch: mục tiêu, sản phẩm, thông điệp"
    required: true
  - name: daily_budget
    type: number
    description: "Ngân sách ngày (VNĐ)"
    required: true
  - name: schedule_window
    type: string
    description: "Khung thời gian chạy (vd: 01/12–31/12, 8h–22h)"
    required: true
  - name: ad_account_alias
    type: string
    description: "Bí danh tài khoản quảng cáo (không dùng token thật)"
    required: true
tools:
  - "meta_marketing_api.create_campaign (status=PAUSED)"
  - "meta_marketing_api.get_preview"
  - "notify_human (Slack/Zalo)"
  - "meta_marketing_api.update_status"
audit_gates:
  - "Two-Step Commit: không bao giờ tạo campaign ở trạng thái ACTIVE"
  - "Budget Cap Gate: ngân sách ≤ hạn mức đã duyệt"
  - "Policy Pre-check: nội dung tuân thủ chính sách quảng cáo Meta"
  - "Anti-Secret Redaction: không log access token"
created_at: "2026-11-02"
---
# META ADS 2-STEP SCHEDULER

## Nguyên tắc vàng
Agent **không bao giờ** tự kích hoạt chi tiêu. Mọi chiến dịch đi qua 2 bước: DRAFT → HUMAN APPROVAL → ACTIVE.

## BƯỚC 1 — DRAFT & PREVIEW
1. Phân tích brief:
   {{campaign_brief}}
2. Đề xuất cấu trúc: 1 Campaign → 2–3 Ad Set (tệp khác nhau) → 2–3 Ad/Ad Set.
3. Kiểm tra **Budget Cap Gate**: ngân sách ngày {{daily_budget}} VNĐ không vượt hạn mức của tài khoản `{{ad_account_alias}}`.
4. Chạy **Policy Pre-check**: từ ngữ cấm (cam kết tuyệt đối, nhắm thuộc tính cá nhân, trước/sau nhạy cảm).
5. Tạo campaign với `status = PAUSED`, lịch chạy: {{schedule_window}}.
6. Lấy preview link cho từng ad và gửi yêu cầu duyệt tới con người kèm:
   - Bảng tóm tắt cấu trúc, ngân sách, lịch
   - Rủi ro đã phát hiện
   - Lệnh xác nhận: `APPROVE <campaign_id>` hoặc `REJECT <campaign_id> <lý do>`

## BƯỚC 2 — ACTIVATE (chỉ khi có APPROVE)
1. Xác minh người duyệt có quyền và campaign_id khớp.
2. Kiểm tra lại ngân sách (phòng trường hợp bị chỉnh sửa giữa chừng).
3. Cập nhật trạng thái sang ACTIVE, ghi log: thời gian, người duyệt, ngân sách.
4. Đặt lịch kiểm tra sau 24h: CPM, CTR, CPA so với ngưỡng.

## Xử lý lỗi
- API lỗi → retry 3 lần (backoff 2s/4s/8s), sau đó báo con người, **không** tạo bản trùng.
- Không nhận phản hồi duyệt sau 48h → giữ PAUSED, gửi nhắc 1 lần.
