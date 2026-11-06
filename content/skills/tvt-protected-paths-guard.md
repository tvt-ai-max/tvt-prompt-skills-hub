---
id: tvt-protected-paths-guard
title: "Filesystem Armor & Zero-Tampering Gate — Áo Giáp Bảo Vệ File Nhạy Cảm"
description: "Cơ chế khóa cứng các tệp tin cấu hình then chốt (.env, Database SQLite, Private Keys, CI/CD, .git) chặn hoàn toàn quyền can thiệp, ghi đè hoặc chỉnh sửa ngoài ý muốn của AI Agent."
category: devops
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["Filesystem Armor", "Protected Paths", "Zero Tampering", "Security Gate", "Claude Code", "Cursor", "Antigravity"]
inputs:
  - name: root_dir
    type: text
    description: "Thư mục gốc của repository"
    required: true
  - name: custom_protected_globs
    type: text
    description: "Bổ sung các file hoặc folder đặc thù cần khóa bất biến"
    required: false
tools:
  - "tool.call interceptor"
  - "read_file"
  - "write_file"
audit_gates:
  - "Fail-Closed Gate (Bất kỳ lỗi kiểm tra nào đều từ chối thao tác ghi)"
  - "Immutable Environment Gate (.env luôn là Read-Only)"
  - "Lock Scope Integrity Gate"
created_at: "2026-11-06"
---
# FILESYSTEM ARMOR & ZERO-TAMPERING GATE SOP

> **Nguyên lý cốt lõi:** *"AI Agent có quyền đọc mã nguồn để hiểu ngữ cảnh dự án, nhưng TUYỆT ĐỐI KHÔNG có quyền tự ý ghi đè hoặc xóa các tệp tin cấu hình cốt lõi của hệ thống."*

---

## Bước 1 — Khai báo Vùng Thư mục & Danh sách Bảo vệ
- Thư mục gốc kiểm toán: `{{root_dir}}`
- Các mẫu tệp tin khóa bổ sung: `{{custom_protected_globs}}`

## Bước 2 — Danh mục Tệp tin Bị Khóa Bất biến (Protected Globs)
Khi AI Agent gọi các thao tác `Edit`, `Write`, `NotebookEdit` hoặc `rm`, bộ lọc lập tức đánh chặn nếu đường dẫn khớp danh mục sau:

1. **Tệp Môi trường & Bí mật:**
   - `.env`, `.env.local`, `.env.production`, `.env.staging`
2. **Chứng chỉ & Khóa Bảo mật:**
   - `*.pem`, `*.key`, `*.crt`, `id_rsa`, `id_ed25519`, `credentials.json`
3. **Cơ sở Dữ liệu Cục bộ:**
   - `*.sqlite`, `*.db`, `crm.db`, `lexi-control.db`
4. **Hệ thống Quản lý Phiên bản & Khóa Gói:**
   - `.git/**`, `package-lock.json`, `pnpm-lock.yaml`, `bun.lockb`
5. **Đường ống CI/CD:**
   - `.github/workflows/**`, `deploy.sh`

## Bước 3 — Luồng Đánh chặn 2 Lớp (Dual-Tier Interceptor)

```
[AI AGENT: Yêu cầu ghi/sửa File]
               │
               ▼
[BƯỚC 1: Whitelist Check] ──(Khớp file cho phép?)──> ✅ Cho phép ghi
               │ (Không nằm trong Whitelist)
               ▼
[BƯỚC 2: Protected Match] ──(Trùng file cấm?)──> 🛑 DENY LẬP TỨC
                                                 Thông báo: "Thao tác bị hủy: File thuộc vùng bảo vệ nghiêm ngặt!"
```

### Triển khai Logic Kiểm tra:
```typescript
const DEFAULT_PROTECTED_PATTERNS = [
  /(^|\/)\.env(\..+)?$/,
  /(^|\/)id_rsa(\.pub)?$/,
  /(^|\/).*\.(pem|key|crt)$/,
  /(^|\/).*\.(db|sqlite)$/,
  /(^|\/)\.git\//,
  /(^|\/)\.github\/workflows\//
];

export function isPathProtected(filePath: string): boolean {
  return DEFAULT_PROTECTED_PATTERNS.some((pattern) => pattern.test(filePath));
}
```

## Bước 4 — Quy tắc Vàng Fail-Closed
Nếu quá trình kiểm tra đường dẫn gặp lỗi ngoại lệ hoặc vượt quá thời gian chờ (timeout), hành vi ghi file BẮT BUỘC bị từ chối ngay lập tức, không bao giờ để lọt tệp tin chưa được thẩm định.

---
*(Bản quyền ý tưởng tham khảo từ cộng đồng Open-Source Claude Code Components theo giấy phép MIT; được chuẩn hóa và bổ sung quy chuẩn CSDL SQLite bởi TVT Intelligence).*
