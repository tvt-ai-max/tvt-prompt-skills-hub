---
id: hestiacp-vps-security-audit
title: "HestiaCP VPS Security & Health Audit"
description: "SOP kiểm toán bảo mật và sức khỏe VPS chạy HestiaCP: cập nhật, SSH, firewall, Fail2ban, SSL, backup, tài nguyên — chỉ đọc, không thay đổi khi chưa duyệt."
category: devops
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["HestiaCP", "VPS", "DevOps", "Security", "Linux"]
inputs:
  - name: server_alias
    type: string
    description: "Bí danh máy chủ (không dùng IP/mật khẩu thật trong prompt)"
    required: true
  - name: hosted_sites
    type: text
    description: "Danh sách website đang host"
    required: true
  - name: audit_scope
    type: string
    description: "Phạm vi: full / security / performance / backup"
    required: false
tools:
  - "ssh_exec (read-only commands)"
  - "v-list-* (HestiaCP CLI)"
  - "ssl_checker"
  - "report_writer"
audit_gates:
  - "Read-Only First: không chạy lệnh thay đổi hệ thống trong pha audit"
  - "Anti-Secret Redaction: ẩn mật khẩu, key, token trong báo cáo"
  - "Rollback Plan bắt buộc cho mọi khuyến nghị thay đổi"
created_at: "2026-11-02"
---
# HESTIACP VPS AUDIT — SERVER: {{server_alias}}

Phạm vi: {{audit_scope}}
Website đang host:
{{hosted_sites}}

## Bước 1 — Hệ điều hành & Cập nhật
- `cat /etc/os-release`, `uptime`, `apt list --upgradable`
- Phiên bản HestiaCP: `v-list-sys-info`; có bản cập nhật bảo mật chưa áp dụng không?

## Bước 2 — Truy cập & SSH
- `sshd -T | grep -E 'permitrootlogin|passwordauthentication|port'`
- Khuyến nghị: tắt đăng nhập root bằng mật khẩu, dùng SSH key, đổi port mặc định nếu phù hợp.
- Kiểm tra user có quyền sudo và các key trong `authorized_keys` (chỉ liệt kê fingerprint).

## Bước 3 — Firewall & Fail2ban
- `v-list-firewall`, `v-list-firewall-ban`, `fail2ban-client status`
- Đảm bảo chỉ mở cổng cần thiết (22/custom, 80, 443, 8083 giới hạn IP nếu được).

## Bước 4 — Web & SSL
- `v-list-web-domains <user>`: domain nào chưa bật SSL/Let's Encrypt, sắp hết hạn < 14 ngày?
- Phiên bản PHP của từng domain: cảnh báo bản hết hỗ trợ.

## Bước 5 — Backup
- `v-list-user-backups <user>`: bản backup gần nhất, có lưu off-site không?
- Đề xuất quy tắc 3-2-1 và test khôi phục định kỳ.

## Bước 6 — Tài nguyên & Hiệu năng
- `df -h`, `free -m`, `top -bn1 | head -20`, kích thước log lớn bất thường.

## Báo cáo đầu ra
Bảng phát hiện: Hạng mục – Hiện trạng – Mức rủi ro (Critical/High/Medium/Low) – Khuyến nghị – Lệnh thực thi đề xuất – Phương án rollback.
Mọi thay đổi chỉ thực hiện sau khi chủ hệ thống duyệt.
