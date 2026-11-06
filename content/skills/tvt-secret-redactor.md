---
id: tvt-secret-redactor
title: "AI Secret Redaction & Token Firewall — Bức Tường Lửa Chống Rò Rỉ Bí Mật"
description: "Cơ chế tự động phát hiện, đánh chặn và làm mờ 100% API Key, Private Key, Database URL, SePay và Token nhạy cảm trước khi hiển thị lên Chat, Console Log hoặc nạp vào Context LLM."
category: devops
tier: skill
persona: tvt-agency
author: "TVT Intelligence Hub"
tags: ["Security", "Secret Redaction", "API Key Protection", "Zero Leakage", "Claude Code", "Antigravity", "OpenClaw"]
inputs:
  - name: project_path
    type: text
    description: "Đường dẫn thư mục dự án cần kích hoạt bảo vệ"
    required: true
  - name: extra_custom_patterns
    type: text
    description: "Các chuỗi tiền tố hoặc regex tùy chỉnh của dự án cần che giấu"
    required: false
tools:
  - "tool.call interceptor"
  - "read_file"
  - "bash"
audit_gates:
  - "Zero Raw Secret Exposure Gate (Cấm in Secret thô)"
  - "Fail-Closed Gate (Lỗi kiểm tra là từ chối xuất dữ liệu)"
  - "Context Injection Defense Gate"
created_at: "2026-11-06"
---
# AI SECRET REDACTION & TOKEN FIREWALL SOP

> **Nguyên lý cốt lõi:** *"Mọi dữ liệu trả về từ Tool, Database hay Shell trước khi nạp vào LLM Context hoặc in ra màn hình BẮT BUỘC phải đi qua bộ lọc bóc tách bí mật."*

---

## Bước 1 — Thiết lập Phạm vi Dự án & Cấu hình
- Thư mục dự án mục tiêu: `{{project_path}}`
- Tiền tố/Ký hiệu bí mật bổ sung: `{{extra_custom_patterns}}`

## Bước 2 — Ma trận Danh mục Tự động Nhận diện & Làm mờ
Bộ lọc tự động thay thế chuỗi nhạy cảm thành nhãn an toàn: `[REDACTED:<LOẠI_SECRET>]`

1. **AI Model Provider Keys:**
   - OpenAI, Claude, Google Gemini AI Studio (`AIzaSy...`).
2. **Kênh Thanh toán & Truyền thông B2B tại Việt Nam:**
   - Telegram Bot Token (`[0-9]{9,10}:[a-zA-Z0-9_-]{35}`).
   - Resend API Key (`re_...`), SePay Token, Zalo OA App Secret.
3. **Database Connection Strings:**
   - PostgreSQL, MySQL, MongoDB, Redis URI (`postgres://user:pass@host:5432/db`).
4. **Chứng chỉ & Khóa riêng tư:**
   - SSH Keys, RSA/ECDSA Private Key Blocks.
5. **Git Provider Access Tokens:**
   - GitHub PAT, GitLab Token, npm Token.

## Bước 3 — Tích hợp Hook Chặn Đa Nền tảng (Runtimes)

### 1. Dành cho Claude Code CLI (`.claude/hooks/redactor.ts`)
```typescript
import type { Register } from 'claude-code';

export const register: Register = (on) => {
  on("tool.call", async ($, event, next) => {
    const result = await next(event);
    return deepRedactSecrets(result);
  });
};
```

### 2. Dành cho Next.js / Express API Gateway Middleware
```typescript
export function sanitizeOutput(text: string): string {
  if (!text) return text;
  return text
    .replace(/\bAIzaSy[0-9A-Za-z_-]{33}\b/g, '[REDACTED:GEMINI_KEY]')
    .replace(/\b[0-9]{9,10}:[a-zA-Z0-9_-]{35}\b/g, '[REDACTED:TELEGRAM_TOKEN]')
    .replace(/\b(postgres|mysql|mongodb):\/\/[^:\s]+:[^@\s]+@/gi, '$1://[USER]:[REDACTED]@');
}
```

## Bước 4 — Kiểm thử Tính Toàn vẹn (Sanity Audit)
- Kiểm tra toàn bộ log output: Xác nhận không xuất hiện bất kỳ chuỗi nhạy cảm thô nào.
- Xác nhận các biến dự án được nạp đầy đủ từ: `{{project_path}}`.

---
*(Bản quyền ý tưởng tham khảo từ cộng đồng Open-Source Claude Code Components theo giấy phép MIT; được chuẩn hóa, mở rộng cho hệ thống thanh toán B2B & môi trường Việt Nam bởi TVT Intelligence).*
