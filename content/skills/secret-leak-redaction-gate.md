---
id: secret-leak-redaction-gate
title: "Anti-Secret Leakage & Redaction Gate"
description: "Quality gate bắt buộc trước khi agent xuất bản, commit hoặc gửi nội dung: quét và che API key, token, mật khẩu, PII."
category: system-design
tier: skill
persona: general
author: "TVT Intelligence Hub"
tags: ["Security", "Redaction", "Secrets", "Quality Gate", "Compliance"]
inputs:
  - name: content_to_scan
    type: text
    description: "Nội dung / diff cần quét"
    required: true
  - name: destination
    type: string
    description: "Đích đến (git, blog, chat khách hàng...)"
    required: true
tools:
  - "regex_secret_scanner"
  - "gitleaks"
  - "pii_detector"
audit_gates:
  - "Zero Secret: không có pattern secret nào lọt qua"
  - "PII được che theo chuẩn"
  - "Nếu phát hiện secret thật đã commit → yêu cầu rotate ngay"
created_at: "2026-11-02"
---
# ANTI-SECRET LEAKAGE GATE

Đích đến: **{{destination}}**

## Bước 1 — Quét pattern
- API keys: `sk-`, `sk-ant-`, `AKIA`, `AIza`, `ghp_`, `xox[bp]-`
- Private keys: `-----BEGIN ... PRIVATE KEY-----`
- Chuỗi kết nối DB, `.env` dán nhầm, JWT, webhook URL có token.

## Bước 2 — Quét PII
- Số điện thoại, email cá nhân, CCCD, số tài khoản ngân hàng, địa chỉ nhà.

## Bước 3 — Che (Redact)
- Thay bằng placeholder: `[REDACTED_API_KEY]`, `[REDACTED_PHONE]`. Giữ 4 ký tự cuối nếu cần đối soát.

## Bước 4 — Quyết định
- **PASS**: không còn secret/PII → cho phép gửi.
- **BLOCK**: còn secret → dừng, báo cáo vị trí, yêu cầu rotate nếu secret đã từng bị lộ.

## Bước 5 — Báo cáo
Bảng: Loại – Vị trí – Hành động – Trạng thái.

---
NỘI DUNG CẦN QUÉT:

{{content_to_scan}}
