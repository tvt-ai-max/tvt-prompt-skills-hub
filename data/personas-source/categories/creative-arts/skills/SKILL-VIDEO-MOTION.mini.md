---
name: video-motion
mini: true
token_estimate: 420
full_file: SKILL-VIDEO-MOTION.md
---
# Video & Motion Graphics [MINI]

> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"làm video ngắn", "sản xuất video", "video marketing", "thiết kế chuyển động", "motion graphics", "video-hyperframes", "8-bit-orbit-video-template", "after-hours-editorial-template", "emilkowalski-motion", "gsap-scrolltrigger", "gsap-timeline", "slack-gif-creator", "gif-sticker-maker"

## Pipeline (4 steps)
1. **Script & Story** — Phác thảo 6-10 frame, thời lượng mỗi frame ≤ 3s. Hook -> Arguments -> CTA.
2. **Design & Comp** — Code HTML/CSS/GSAP. Chọn retro pixel hoặc luxury dark haute couture.
3. **Render & Export** — Biên dịch hyperframes thành MP4 bằng Remotion; tạo GIF hoặc sticker MiniMax.
4. **Motion Polish** — Tinh chỉnh động tác mượt mà theo quy tắc Emil Kowalski.

## Core Integration Guidelines

### 1. video-hyperframes
- N phân cảnh `<section class="frame">` kích thước `1920x1080` hoặc `1080x1920`.
- Thêm tag ẩn `<!-- frame:N duration:3000 transition:fade -->` cuối mỗi frame.
- Xuất kèm comment JSON `<!-- HYPERFRAMES_META: ... -->` chứa danh sách các frame ở cuối file.

### 2. Templates
- **8-bit-orbit**: Phong cách game retro, pixel art, timeline động deterministic.
- **after-hours**: Phong cách高定 Haute Couture, tối giản sang trọng, Serif + Sans-serif, dark bg + neon magenta, grain effect.

### 3. GSAP & ScrollTrigger
- Ưu tiên dùng `timeline` với `defaults` và position parameters.
- Đăng ký plugin. Không dùng chung `scrub` và `toggleActions`. Dùng `clamp()`.
- Fake horizontal scroll: Bắt buộc dùng `ease: "none"` trên tween ngang.
- Luôn `.kill()` ScrollTrigger khi unmount.

### 4. GIF & Sticker Maker
- **slack-gif**: Ảnh động nhẹ < 1MB cho Slack.
- **gif-sticker**: MiniMax API chuyển ảnh thành sticker Funko Pop / Pop Mart động.

### 5. Polish (Emil Kowalski)
- Phản hồi UI nhanh: 140-220ms.
- Chỉ animate `transform` và `opacity`. KHÔNG animate layout properties (`width`/`height`/`top`/`left`).
- Thêm CSS media query `@media (prefers-reduced-motion: reduce)`.
- Không lạm dụng custom cursor, hạt hiệu ứng bay lung tung.

## Anti-Patterns
❌ Animate layout properties | ❌ Màu sắc cơ bản thuần túy | ❌ Looptimeline vô tận | ❌ Dwell time > 3s | ❌ Không dọn dẹp (cleanup) gsap instances
