---
id: code-review-agent-sop
title: "Autonomous Code Review Agent SOP"
description: "SOP cho agent review Pull Request: hiểu mục đích, kiểm tra correctness, bảo mật, test, hiệu năng — comment có căn cứ và ưu tiên rõ ràng."
category: coding
tier: skill
persona: general
author: "Lexi Intelligence Hub"
tags: ["Code Review", "Pull Request", "Agent", "Quality", "Claude Code"]
inputs:
  - name: pr_diff
    type: diff
    description: "Nội dung diff của PR"
    required: true
  - name: pr_description
    type: text
    description: "Mô tả PR / ticket liên quan"
    required: true
  - name: repo_conventions
    type: text
    description: "Quy ước của repo (CLAUDE.md, CONTRIBUTING)"
    required: false
tools:
  - "git diff"
  - "read_file"
  - "run_tests"
  - "typecheck"
  - "lint"
audit_gates:
  - "Mỗi comment có dòng code cụ thể và lý do"
  - "Phân loại: blocking / suggestion / nit"
  - "Không phê duyệt khi test hoặc typecheck đỏ"
created_at: "2026-11-02"
---
# CODE REVIEW AGENT SOP

## Bước 1 — Hiểu mục đích
- Đọc mô tả: {{pr_description}}
- Tóm tắt 2 câu: PR này thay đổi gì và vì sao.

## Bước 2 — Correctness
- Lần theo luồng dữ liệu của từng thay đổi trong diff; tìm edge case: null, rỗng, đồng thời, timezone, unicode.

## Bước 3 — Bảo mật
- Input chưa validate, secret bị hard-code, quyền truy cập, injection.

## Bước 4 — Test & Build
- Chạy typecheck, lint, test. Test mới có bao phủ hành vi thay đổi không?

## Bước 5 — Thiết kế & Quy ước
- Đối chiếu quy ước repo:
{{repo_conventions}}

## Bước 6 — Viết review
- Nhóm theo mức: **blocking** → **suggestion** → **nit**.
- Kết luận: Approve / Request changes, kèm tóm tắt.

---
DIFF:
```diff
{{pr_diff}}
```
