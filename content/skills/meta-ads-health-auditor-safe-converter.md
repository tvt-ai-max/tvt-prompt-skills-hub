---
id: meta-ads-health-auditor-safe-converter
title: "Meta Ads Account Health Auditor & Safe Converter"
description: "Meta Ads Account Health Auditor & Safe Converter — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent."
category: marketing
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Meta Ads Doctor", "Account Audit", "Statistical Anomaly", "ROAS Optimization", "Safety Lock"]
inputs:
  - name: audit_period
    type: string
    description: "Khung thời gian phân tích (7 ngày, 14 ngày, 30 ngày)"
    required: true
  - name: diagnostic_metrics
    type: textarea
    description: "Báo cáo số liệu chi tiêu, CPM, CTR, CPC, Frequency và CPA"
    required: true
audit_gates: ["Risk Classification Gate (Green/Yellow/Red)", "Least Privilege MCP Gate", "Budget Lockout Gate"]
tools: ["read_file", "web_search"]
created_at: "2026-11-03"
---
# 🩺 META ADS SAFE CONVERTER & ADS DOCTOR

Bộ kỹ năng tối ưu và chuyển đổi quảng cáo Meta Ads an toàn:

1. **[01-meta-ads-doctor](01-meta-ads-doctor/SKILL.md):** Chẩn đoán và cấp cứu chiến dịch quảng cáo, phân tích chỉ số CTR, CPM, CPA và tần suất (Frequency).
2. **[02-meta-ads-mcp-operational-guide](02-meta-ads-mcp-operational-guide/SKILL.md):** Cẩm nang quy chuẩn vận hành Meta Ads MCP Server cho Agent, hướng dẫn gọi tool an toàn có kiểm soát chi tiêu.

## Tham Số Đầu Vào Của Kỹ Năng
- **audit_period** (Khung thời gian phân tích (7 ngày, 14 ngày, 30 ngày)): `{{audit_period}}`
- **diagnostic_metrics** (Báo cáo số liệu chi tiêu, CPM, CTR, CPC, Frequency và CPA): `{{diagnostic_metrics}}`

