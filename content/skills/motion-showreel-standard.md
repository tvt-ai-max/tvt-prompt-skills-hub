---
id: motion-showreel-standard
title: "Motion Showreel Standard & Animation Directives"
description: "Motion Showreel Standard & Animation Directives — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Showreel", "Design Standards", "Animation Timing", "Easing Curves", "Production Directives"]
inputs:
  - name: project_showcase_list
    type: textarea
    description: "Danh sách các dự án và phân cảnh cần đưa vào showreel"
    required: true
audit_gates: ["Motion Easing Standard Gate", "Audio Ducking Sidechain Gate", "Resolution Deterministic Gate"]
created_at: "2026-11-03"
---
# SKILL: Motion_Showreel_Standard

## Dùng khi nào

- ✅ Dùng khi cần showreel/kinetic text tông tối Liquid Glass cho video đồ họa chuyển động.
- ⛔ Không dùng cho video dịch vụ TVT nền trắng (→ tvt-service-promo), vlog (→ tvt-vlog-talkinghead) hoặc b-roll một khối morph (→ motion-broll).

## 1. MỤC TIÊU VÀ BỐI CẢNH ÁP DỤNG
- **Định dạng:** Video ngắn (Short-form video: 15-60s) hoặc Video giới thiệu sản phẩm/tổng quan (Showreel/Product Teaser).
- **Tỉ lệ khung hình (Aspect Ratios):**
  - Dọc `9:16` (1080x1920) tối ưu cho TikTok, Instagram Reels, YouTube Shorts.
  - Ngang `16:9` (1920x1080) cho YouTube, Landing Page hero background.
- **Nhịp độ (Pacing):** Nhanh, năng động, đồng bộ hóa cao với nhạc nền, nhịp phát âm và hiệu ứng âm thanh (SFX).

---

## 2. HỆ THỐNG DESIGN TOKENS (DESIGN SYSTEM)

### Typography
- **Font chính:** Sans-serif hình học hiện đại (`Inter`, `Plus Jakarta Sans`, hoặc `Cabinet Grotesk`).
- **Trọng số:** Bold (700) đến Black (900) cho Headline/Tiêu đề; Medium (500) cho Phụ đề.
- **Tracking / Letter-spacing:** `-0.02em` đến `-0.04em` cho tiêu đề lớn nhằm tạo cảm giác chắc chắn, cao cấp.

### Color Palette & Liquid Glass Tokens
- `--bg-canvas`: `#0a0b10` (Nền tối sâu, tăng tương phản).
- `--primary-accent`: `#6366f1` (Tím điện toán / Electric Indigo).
- `--secondary-accent`: `#06b6d4` (Cyan neon).
- `--text-primary`: `#ffffff` (Trắng tuyệt đối).
- `--text-secondary`: `rgba(255, 255, 255, 0.7)`.
- `--glass-background`: `rgba(255, 255, 255, 0.08)`.
- `--glass-border`: `1px solid rgba(255, 255, 255, 0.15)`.
- `--glass-blur`: `blur(20px) saturate(180%)`.
- `--glass-shadow`: `0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)`.

### Container & Layout Tokens
- **Border Radius:** `20px` - `28px` cho các thẻ container nổi.
- **Safe Margin:** Cách mép khung hình tối thiểu 10% theo mọi hướng (Top 10%, Bottom 15% cho giao diện mạng xã hội).

---

## 3. LOGIC XỬ LÝ DỮ LIỆU ĐẦU VÀO (INPUT PIPELINE)

1. **Input Assets:**
   - Danh sách tài nguyên hình ảnh / video thô hoặc URL website thương hiệu.
   - File âm thanh giọng đọc (Voiceover) + file nhạc nền (BGM).
   - Tệp transcript có word-level timestamps (xuất từ Whisper).

2. **Trích xuất & Tối ưu:**
   - Tự động tải favicon, logo vector định dạng SVG trong suốt.
   - Chụp màn hình các khối nội dung nổi bật (bằng headless browser).
   - Trích xuất bảng màu chủ đạo (Primary & Accent colors) từ logo/website bằng ColorThief hoặc k-means.

---

## 4. CHIẾN LƯỢC TẠO HOẠT CẢNH (ANIMATION STRATEGY)

### 4.1. B-roll & Card Entry
- **Hiệu ứng:** Trượt từ dưới lên (Slide-up) kết hợp Fade-in.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Spring-like decelerating ease).
- **Thời lượng:** `0.45s`.

### 4.2. Text Highlight Kinetic Typography
- **Cơ chế:** Đổi màu từng từ hoặc cụm 2-3 từ (`background-clip: text` kèm highlight gradient) chính xác tại mili-giây được phát âm trong audio transcript.
- **Micro-scale:** Chữ active phóng to nhẹ `scale(1.05)` trong `0.1s`.

### 4.3. Liquid Glass Overlay & Depth
- Luôn đặt một lớp nền kính mờ (`backdrop-filter`) phía dưới các đoạn chữ để tách bạch nội dung khỏi video/ảnh nền chuyển động, bảo toàn độ tương phản WCAG AAA.

### 4.4. Transitions & Camera Zoom
- **Beat Sync:** Đổi cảnh (scene switch) hoặc phóng to nhẹ (camera punch-in `scale: 1.0 -> 1.08`) đúng vào nhịp bass hoặc mốc thời gian bắt đầu câu mới.

---

## 5. CHECKLIST KIỂM THỬ THỊ GIÁC (VISUAL QA CHECKLIST)

Trước khi kích hoạt render xuất file video cuối cùng:
- [ ] Chữ không bị tràn ra ngoài vùng an toàn (Safe Margin 10-15%).
- [ ] Tỷ lệ tương phản chữ so với nền tối thiểu 4.5:1 (chuẩn WCAG AA).
- [ ] Thẻ Liquid Glass có đổ bóng rõ và viền sáng nhẹ ở cạnh trên (`inset 0 1px 0 rgba(255,255,255,0.2)`).
- [ ] Hoạt cảnh chuyển từ dừng mượt mà, không bị khựng (jank) hoặc giật khung hình.

## Tham Số Đầu Vào Của Kỹ Năng
- **project_showcase_list** (Danh sách các dự án và phân cảnh cần đưa vào showreel): `{{project_showcase_list}}`

