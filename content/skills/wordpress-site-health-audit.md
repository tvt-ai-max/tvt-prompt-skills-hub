---
id: wordpress-site-health-audit
title: "WordPress Site Health & Performance Audit"
description: "SOP kiểm tra WordPress: core/plugin/theme, bảo mật, Core Web Vitals, SEO kỹ thuật và backup, xuất báo cáo ưu tiên."
category: devops
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["WordPress", "Performance", "Core Web Vitals", "Security", "Audit"]
inputs:
  - name: site_url
    type: string
    description: "URL website"
    required: true
  - name: hosting_info
    type: string
    description: "Loại hosting / VPS"
    required: false
  - name: business_goal
    type: string
    description: "Mục tiêu kinh doanh chính của website"
    required: true
tools:
  - "pagespeed_insights_api"
  - "wp_cli (read-only)"
  - "http_header_checker"
  - "broken_link_checker"
audit_gates:
  - "Staging-First: mọi thay đổi thử trên staging"
  - "Backup Verified trước khi cập nhật plugin"
  - "Core Web Vitals đạt ngưỡng \"Good\" sau tối ưu"
created_at: "2026-11-02"
---
# WORDPRESS SITE HEALTH AUDIT — {{site_url}}

Mục tiêu kinh doanh: {{business_goal}}
Hosting: {{hosting_info}}

## Bước 1 — Inventory
- `wp core version`, `wp plugin list --update=available`, `wp theme list`
- Đánh dấu plugin không còn được cập nhật > 12 tháng hoặc trùng chức năng.

## Bước 2 — Bảo mật
- Header bảo mật (HSTS, X-Frame-Options, CSP), `xmlrpc.php`, trang đăng nhập, user admin mặc định.
- Quyền file `wp-config.php`, debug mode trên production.

## Bước 3 — Hiệu năng
- PageSpeed (mobile & desktop): LCP, INP, CLS, TTFB.
- Cache (page/object), CDN, định dạng ảnh WebP/AVIF, lazy load, font loading.

## Bước 4 — SEO kỹ thuật
- robots.txt, sitemap, canonical, noindex nhầm, redirect chain, 404, schema.

## Bước 5 — Backup & Khôi phục
- Tần suất, nơi lưu, lần test khôi phục gần nhất.

## Báo cáo
Ma trận ưu tiên Tác động × Công sức. Top 5 việc làm ngay, kèm ước tính cải thiện và rủi ro.
