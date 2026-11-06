---
id: tvt-destructive-command-blocker
title: "Destructive Command Interceptor — Chốt Chặn Câu Lệnh Hủy Diệt Hệ Thống"
description: "Lớp bảo vệ chủ động chặn đứng các câu lệnh Shell có khả năng xóa sổ thư mục, format ổ đĩa, làm bay màu lịch sử Git hoặc hủy diệt CSDL Production."
category: devops
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["Terminal Security", "Command Blocker", "Destructive Bash Shield", "Claude Code", "Bash Safety", "DevOps"]
inputs:
  - name: terminal_scope
    type: text
    description: "Môi trường thực thi (Local Dev, Staging Server, VPS Production)"
    required: true
  - name: allow_force_override
    type: text
    description: "Chính sách khi gặp lệnh nguy hiểm (Never hoặc Require Approval)"
    required: true
tools:
  - "tool.call interceptor"
  - "bash"
audit_gates:
  - "Pre-Execution Bash Audit Gate"
  - "Zero Data-Loss Guarantee"
  - "Human-in-the-Loop Escalation Gate"
created_at: "2026-11-06"
---
# DESTRUCTIVE COMMAND INTERCEPTOR SOP

> **Nguyên lý cốt lõi:** *"Mọi câu lệnh Shell mang tính chất phá hủy không thể đảo ngược (Irreversible Destruction) BẮT BUỘC bị vô hiệu hóa trước khi chạm tới Terminal OS."*

---

## Bước 1 — Thiết lập Môi trường & Chính sách
- Phạm vi môi trường bảo vệ: `{{terminal_scope}}`
- Cơ chế ghi đè khẩn cấp: `{{allow_force_override}}`

## Bước 2 — Ma trận 8 Câu Lệnh Bị Chặn Tuyệt Đối (Blacklist)

Bất kỳ lệnh nào khớp các mẫu Regex sau sẽ bị chặn đứng trước khi thực thi với mã lỗi `EXECUTION_DENIED_BY_POLICY`:

1. **Xóa đệ quy thư mục gốc/hệ thống:**
   - `rm -rf /`, `rm -rf ~`, `rm -rf .`, `rm -rf $HOME`, `rm -rf *`
2. **Bỏ bảo vệ Root:**
   - `rm --no-preserve-root`
3. **Ghi đè lịch sử Git (Phá nát nhánh chính):**
   - `git push --force` (chỉ chấp nhận `--force-with-lease` khi có phê duyệt), `git reset --hard HEAD~*`
4. **Dọn dẹp Git mất dữ liệu chưa commit:**
   - `git clean -fd`, `git clean -fx`
5. **Hủy diệt bảng hoặc Database:**
   - `DROP TABLE`, `DROP DATABASE`, `TRUNCATE TABLE`, `DELETE FROM [table]` không có mệnh đề `WHERE`.
6. **Format phân vùng ổ đĩa:**
   - `mkfs.*`, `fdisk`, `parted`
7. **Ghi đè trực tiếp thiết bị lưu trữ:**
   - `dd of=/dev/sd*`, `dd of=/dev/nvme*`
8. **Cấp quyền toàn quyền nguy hiểm:**
   - `chmod -R 777 /`

## Bước 3 — Kiến trúc Chặn Trước Khi Chạy (Pre-Execution Interceptor)

```
[AI AGENT: Phát lệnh Bash]
             │
             ▼
[Regex Safety Inspector] ──(Khớp Blacklist?)──> 🛑 TỪ CHỐI NGAY LẬP TỨC
             │ (An toàn)                         Thông báo: "Lệnh bị chặn do nguy cơ gây mất dữ liệu!"
             ▼
[Thực thi bình thường trên Terminal]
```

### Triển khai Hook Type-Safe:
```typescript
import type { Register } from 'claude-code';

const DESTRUCTIVE_RULES = [
  { pattern: /\brm\s+.*(-r|-rf|--recursive)\s+["']?(\/|~|\$HOME|\.)["']?/i, reason: 'Xóa đệ quy thư mục gốc/chính' },
  { pattern: /\bgit\s+push\b(?!.*--force-with-lease).*--force\b/, reason: 'Force push không có lease' },
  { pattern: /\bgit\s+(reset\s+--hard|clean\s+-[a-zA-Z]*f)/, reason: 'Hủy diệt lịch sử Git hoặc uncommitted files' },
  { pattern: /\b(DROP|TRUNCATE)\s+(TABLE|DATABASE)\b/i, reason: 'Hủy diệt CSDL' }
];

export const register: Register = (on) => {
  on("tool.call", async ($, event, next) => {
    if (event.tool === "Bash") {
      const command = (event.input as { command?: string })?.command ?? "";
      for (const rule of DESTRUCTIVE_RULES) {
        if (rule.pattern.test(command)) {
          return { deny: true, reason: rule.reason };
        }
      }
    }
    return next(event);
  });
};
```

## Bước 4 — Quy tắc Phòng vệ Bất biến (Fail-Closed)
- Môi trường áp dụng: `{{terminal_scope}}`.
- Nếu bộ kiểm tra Regex gặp sự cố hoặc timeout, lệnh BẮT BUỘC bị coi là NGUY HIỂM và bị HỦY BỎ. Tuyệt đối không để lệnh lọt qua khi chưa kiểm tra xong.

---
*(Bản quyền ý tưởng tham khảo từ cộng đồng Open-Source Claude Code Components theo giấy phép MIT; được biên tập lại thành SOP An ninh Thiết bị đầu cuối chuẩn TVT Intelligence).*
