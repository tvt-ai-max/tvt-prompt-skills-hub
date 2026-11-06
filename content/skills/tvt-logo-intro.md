---
id: tvt-logo-intro
title: "Brand Logo Intro & 5-Second Bumper Generator"
description: "Brand Logo Intro & 5-Second Bumper Generator — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["Video", "Logo Intro", "Bumper", "Brand Identity", "Motion Identity", "Sound Design"]
inputs:
  - name: brand_logo_svg
    type: string
    description: "Đường dẫn file logo dạng vector SVG"
    required: true
  - name: brand_slogan
    type: string
    description: "Khẩu hiệu thương hiệu hiển thị kèm logo"
    required: false
audit_gates: ["5-Second Duration Hard Gate", "Audio SFX Peak ≤ -1.0 dBFS Gate", "Smooth Easing Curve Gate"]
created_at: "2026-11-03"
---
# SKILL: TVT LOGO INTRO — "TĂNG TRƯỞNG" (Growth Build)

> Intro logo 5s cho TVT Agency, chuẩn Brand DNA: nền trắng, logo chính thức **không vẽ lại / không đổi màu**.
> Dùng làm bumper mở đầu video Fanpage/YouTube/Reels, hoặc đăng riêng.

## Dùng khi nào

- ✅ Dùng khi cần intro logo TVT Agency 5 giây làm bumper mở đầu video Fanpage, YouTube hoặc Reels — nền trắng, logo chính thức, xuất cả 16:9 và 9:16.
- ⛔ Không dùng khi cần cả video giới thiệu dịch vụ (→ tvt-service-promo) hoặc lớp phủ Đăng ký/Theo dõi (→ social-cta-overlay).

## 1. Ý tưởng
Logo TVT kể chuyện "khung hệ thống + tăng trưởng": khung chữ L navy được **vẽ** ra, ba cột cam **mọc lên**
như biểu đồ, biểu tượng thu về vị trí, chữ TVT AGENCY trồi lên theo từng ký tự, tagline hiện theo từ,
vệt sáng lướt qua logo, domain `tvtagency.com` chốt cuối.

| Mốc | Hình | SFX |
|:--|:--|:--|
| 0.0s | 2 chấm cam bật ở 2 điểm đầu khung | — |
| 0.3–1.1s | 2 "ngòi bút" vẽ khung L đối xứng (trái: dưới→lên→phải · phải: trên→xuống→trái) | whoosh (đỉnh 0.6s) |
| 0.9–1.8s | 3 cột cam mọc từ chân, nảy nhẹ | pop ×3 |
| 1.5s | biểu tượng hoàn chỉnh, nhún nhẹ | boomph |
| 1.75–2.45s | biểu tượng (phóng 1.32×, giữa khung) thu về đúng vị trí trong logo | — |
| 2.2–2.9s | TVT AGENCY trồi lên từng chữ | whoosh (đỉnh 2.4s) |
| 2.78–3.7s | Digital · Marketing · Solution hiện theo từ | — |
| 3.4–4.25s | vệt sáng lướt trên logo | ting |
| 3.6s → 5.0s | domain + giữ logo | — |

## 2. Quy tắc brand (đã cài)
- Lớp hình = **pixel gốc** của `sources/branding/tvt/logo-stacked.png` (tách bằng `slice_logo.py`, script tự kiểm ghép lại khít 100%).
- Từ `settle` (≈3.56s) engine hiện thẳng file logo gốc → khung giữ **trùng từng pixel** logo chính thức (đã đo: lệch 0/255).
- Nền trắng (studio trắng, mép #F1F4F9) · cam chỉ ở chấm · domain chữ navy #003189 · 1 logo/khung · không nền tối/neon/người.
- Tham khảo xu hướng Envato "intro logo" (studio trắng, vệt sáng, lộ hình phẳng) — **chỉ học phong cách**, không dùng asset/footage/font/nhạc của template.

## 3. Lệnh
```bash
python3 skills/tvt-logo-intro/scripts/slice_logo.py                 # 1 lần / khi logo gốc đổi
python3 skills/tvt-logo-intro/scripts/build.py [intro.json]          # → templates/tvt_logo_intro_{16x9,9x16}/
python3 templates/hyperframes/render.py templates/tvt_logo_intro_16x9 # QA + MP4 (chạy tuần tự từng tỉ lệ)
python3 templates/hyperframes/render.py templates/tvt_logo_intro_9x16
```
Xem thử: `http://localhost:4173/templates/tvt_logo_intro_16x9/index.html` (preview server `hyperframes-preview`), `window.seek(t)`, `?ref=1` = logo gốc suốt video để đối chiếu.

## 4. Tuỳ biến (`intro.json`)
- `timeline`: mọi mốc (giây). `settle` tự tính = lúc lớp cuối yên vị.
- `domain`: chuỗi dưới logo, để `""` nếu không cần.
- `sfx[]`: `align: "peak"` → đỉnh âm trùng mốc `t` (whoosh/boomph), `"start"` → âm bắt đầu tại `t`. Mức hiện tại cho bản đứng riêng ≈ -16 LUFS, đỉnh -2.2 dBFS.
- Ghép làm bumper trước video dịch vụ: nối MP4 bằng ffmpeg concat (cùng fps/kích thước).

## 5. Đầu ra đã duyệt kỹ thuật
`sources/renders/tvt_logo_intro_16x9_1920x1080.mp4` · `tvt_logo_intro_9x16_1080x1920.mp4` — 5.0s, 60fps, H.264 + AAC, 0 lỗi giải mã, QA safe margin PASS 8/8 mốc mỗi tỉ lệ.

## Tham Số Đầu Vào Của Kỹ Năng
- **brand_logo_svg** (Đường dẫn file logo dạng vector SVG): `{{brand_logo_svg}}`
- **brand_slogan** (Khẩu hiệu thương hiệu hiển thị kèm logo): `{{brand_slogan}}`

