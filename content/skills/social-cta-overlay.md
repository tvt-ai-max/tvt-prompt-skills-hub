---
id: social-cta-overlay
title: "Dynamic Social CTA & Subscribe Alpha Overlay Engine"
description: "Dynamic Social CTA & Subscribe Alpha Overlay Engine — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["Video", "CTA Overlay", "Subscribe Animation", "ProRes 4444", "Alpha Channel", "Conversion"]
inputs:
  - name: channel_name
    type: string
    description: "Tên kênh hoặc tài khoản mạng xã hội"
    required: true
  - name: cta_type
    type: string
    description: "Loại hành động kêu gọi (Đăng ký kênh, Follow, Bình luận nhận quà)"
    required: true
audit_gates: ["Transparent Alpha Integrity Gate", "Timing Cadence Gate", "Platform Native Icon Gate"]
created_at: "2026-11-03"
---
# SKILL: SOCIAL CTA OVERLAY — Đăng ký / Theo dõi (nền trong suốt)

> Lớp phủ kêu gọi Đăng ký/Theo dõi, kéo thả vào Premiere/Final Cut. Phong cách học từ Envato "Subscribe Social Media"
> (thẻ trắng phẳng, con trỏ bấm, đổi trạng thái nút) — dựng lại bằng HTML/CSS, không dùng asset của template.

## Dùng khi nào

- ✅ Dùng khi cần lớp phủ Đăng ký hoặc Theo dõi lên video đã dựng xong — nền trong suốt ProRes 4444, kéo thả được vào Premiere/Final Cut.
- ⛔ KHÔNG dùng khi cần dựng lại cả video.

## 1. Pack & mẫu
| Pack | File | Mẫu | Nội dung |
|:--|:--|:--|:--|
| Tùng — cá nhân (toilatung.com) | `packs/toilatung.json` | `yt_subscribe` (A1, 4.5s) | Thẻ ảnh chân dung + @toilatungAI → con trỏ bấm "Đăng ký" → "Đã đăng ký" → bấm chuông, chuông rung |
| | | `channels` (A3, 6s) | Lower third "Theo dõi Tùng tại": FB @tungsocson · YT @toilatungAI · toilatung.com |
| TVT Agency (Fanpage) | `packs/tvt.json` | `fb_follow` (B1, 4.5s) | Biểu tượng logo gốc + fb.com/tvtagencymkt + dòng giá trị → "Theo dõi" (nút cam duy nhất) → "✓ Đang theo dõi" |

**Ba lớp thương hiệu không trộn:** pack Tùng dùng royal blue + mint, font Be Vietnam Pro, ảnh thật. Pack TVT dùng navy/cam, Montserrat + Roboto, logo chính thức, không hình người.

## 2. Luật
- **Không bịa số** người theo dõi hay lượt like. Chỉ thêm khi founder chốt số thật và ngày chốt.
- **Icon nền tảng:** `sources/branding/social/` (Simple Icons CC0, xem SOURCE.md). Không đổi màu, không vẽ lại. Không dùng các gói PSD "subscribe" trong kho Envato/Freepik (logo vẽ lại, không có license).
- **Nhãn khớp nút thật của nền tảng:** YouTube "Đăng ký" → "Đã đăng ký". Facebook "Theo dõi" → "Đang theo dõi".
- **Pack TVT không chèn vào video quảng cáo dịch vụ** (SOP-06): video đó đã có đúng 1 CTA. Chỉ dùng cho nội dung thường của Fanpage.
- **Thẻ trắng đặc, không dùng kính mờ:** file alpha không có gì phía sau để blur, nền đặc mới đọc được trên mọi footage.
- **Đồng bộ lời đọc:** đặt lớp phủ sao cho cú bấm (1.55s tính từ đầu clip) trùng lúc lời đọc nói "đăng ký"/"theo dõi". Lấy mốc từ alignment Whisper, lệch tối đa ±100ms.

## 3. Lệnh
```bash
python3 skills/social-cta-overlay/scripts/build.py skills/social-cta-overlay/packs/toilatung.json [yt_subscribe channels]
python3 skills/social-cta-overlay/scripts/build.py skills/social-cta-overlay/packs/tvt.json
python3 templates/hyperframes/render.py templates/social_<pack>_<id>_16x9   # rồi _9x16 — tuần tự, không song song
```
Đầu ra (`sources/renders/`):
- `social_<pack>_<id>_<tỉ lệ>.mov`: ProRes 4444 có alpha + PCM, file để dựng (~100–140MB mỗi clip).
- `…_preview.mp4`: bản ghép trên nền mẫu để duyệt nhanh.

Xem thử trình duyệt: `templates/social_…/index.html?preview=1` · `window.seek(t)`.

## 4. Tuỳ biến
- Chữ, handle, nút, màu, SFX nằm trong `packs/*.json`. Thêm mẫu mới bằng cách thêm phần tử vào `overlays` (type `card` | `lowerthird`).
- Cỡ tổng thể dùng `--k` trong `kit/overlay.css` (16:9 = 1.2, 9:16 = 1.2). build.py nhân mọi kích thước px của thành phần với `--k`.
- Vị trí:
  - 16:9: góc dưới trái vùng an toàn.
  - 9:16: lệch trái, khoảng 56–58% chiều cao, né cột nút phải và caption đáy của Reels/TikTok.
- SFX: `align: "peak"` để đỉnh whoosh trùng mốc `t`. Mức hiện tại -19 đến -24 LUFS, nằm dưới giọng khi trộn vào video.

## 5. Kiểm định
- QA safe margin chặn render khi tràn. Lần đầu bắt được 2 lỗi 9:16: thanh A3 tràn 6px, thẻ B1 nảy tràn 19px.
- Kênh alpha: nền 0, thẻ 255.
- 0 lỗi giải mã.

## Tham Số Đầu Vào Của Kỹ Năng
- **channel_name** (Tên kênh hoặc tài khoản mạng xã hội): `{{channel_name}}`
- **cta_type** (Loại hành động kêu gọi (Đăng ký kênh, Follow, Bình luận nhận quà)): `{{cta_type}}`

