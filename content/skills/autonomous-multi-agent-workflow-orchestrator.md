---
id: autonomous-multi-agent-workflow-orchestrator
title: "Autonomous Multi-Agent Workflow Orchestrator"
description: "Autonomous Multi-Agent Workflow Orchestrator — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent."
category: system-design
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Multi-Agent", "DAG Orchestration", "Handoff Contract", "AI Automation", "System Architecture"]
inputs:
  - name: master_goal
    type: textarea
    description: "Mục tiêu tổng thể của dự án cần phân rã đa Agent"
    required: true
  - name: active_workforce
    type: string
    description: "Danh sách các chuyên ban Agent tham gia (Research, Copy, Design, QA, Deploy)"
    required: true
audit_gates: ["JSON Schema Contract Gate", "Deterministic Execution Gate", "HITL Approval Gate"]
tools: ["read_file", "write_file"]
created_at: "2026-11-03"
---
# 🏭 MULTI-AGENT ORCHESTRATOR — DÂY CHUYỀN ĐA AGENT TỰ HÀNH

> **Nguyên lý:** *"Đầu ra của Agent trước là đầu vào của Agent sau — Không copy/paste thủ công giữa các khâu."*

---

## 1. DÒNG CHẢY DỮ LIỆU 6 CHẶNG (ASSEMBLY PIPELINE)

```
[1. BRIEF MỤC TIÊU] (Giám đốc / Khách hàng)
       │
       ▼
[2. CUSTOMER PERSONA] (customer-persona) ──> Sinh Insight, Pain points, Desires
       │
       ▼
[3. COPYWRITING PRO] (copywriting-pro) ──> Soạn Hook, Body, CTA, tự soát lỗi
       │
       ▼
[4. GRAPHIC DESIGNER] (graphic-designer) ──> Tạo Prompt thiết kế 4:5 / 16:9
       │
       ▼
[5. TELEGRAM HUMAN GATE] (telegram-human-gate) ──> 🛑 Chờ Lãnh đạo bấm duyệt
       │
       ▼ (Khi đã duyệt)
[6. AUTO PUBLISHER] (facebook-auto-publisher / zalo-multi-send) ──> Xuất bản tự động
```

---

## 2. QUY TRÌNH SỬ DỤNG

```bash
# Chạy toàn bộ dây chuyền từ 1 file Brief
python3 scripts/orchestrator.py --brief "Tuyển sinh Khóa học AI Tự Hành cho Chủ doanh nghiệp SME"

# Hoặc nạp từ file JSON handoff
python3 scripts/orchestrator.py --handoff-file workspace/campaign_01.json
```

## Tham Số Đầu Vào Của Kỹ Năng
- **master_goal** (Mục tiêu tổng thể của dự án cần phân rã đa Agent): `{{master_goal}}`
- **active_workforce** (Danh sách các chuyên ban Agent tham gia (Research, Copy, Design, QA, Deploy)): `{{active_workforce}}`

