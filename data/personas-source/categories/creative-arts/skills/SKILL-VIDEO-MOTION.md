---
name: video-motion
category: creative-arts
persona-source: Animator
description: |
  Kỹ năng sản xuất Video & Motion Graphics (Animation & Video) hỗ trợ tự động hóa sản xuất video ngắn/marketing.
  Tích hợp các công cụ của Open Design bao gồm video-hyperframes, 8-bit-orbit-video-template,
  after-hours-editorial-template, emilkowalski-motion, gsap-scrolltrigger, gsap-timeline, slack-gif-creator và gif-sticker-maker.
---

# 🎞️ Video & Motion Graphics (Animation & Video)

> Tự động hóa sản xuất video ngắn, thiết kế chuyển động và tạo gif sticker tiếp thị.
> Input: Kịch bản/Ý tưởng video, hình ảnh. Output: Video MP4 (Hyperframes), ảnh động GIF, sticker MiniMax, mã chuyển động GSAP.

## Trigger Phrases

Activate this skill when the user says:
- "làm video ngắn", "sản xuất video", "video marketing"
- "thiết kế chuyển động", "motion graphics", "hiệu ứng chuyển động"
- "video-hyperframes", "remotion video", "html to video"
- "8-bit-orbit-video-template", "pixel retro video"
- "after-hours-editorial-template", "luxury fashion video"
- "emilkowalski-motion", "micro-interactions", "motion polish"
- "gsap-scrolltrigger", "gsap-timeline", "scroll animation"
- "slack-gif-creator", "gif-sticker-maker", "pop mart sticker"

## Pipeline Overview

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│1. SCRIPT & STORY │ →  │2. DESIGN & COMP  │ →  │3. RENDER & EXPORT│ →  │4. MOTION POLISH  │
│  Drafting frames │    │HTML/CSS/GSAP Code│    │Remotion/MiniMax  │    │ Emil Kowalski Rules│
└──────────────────┘    └──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## Step 1: Script & Storyboard

Thiết lập kịch bản phân cảnh (Storyboarding) theo cấu trúc Hyperframes:
1. **Dwell Time**: Mỗi phân cảnh (scene/frame) không được vượt quá 3 giây để giữ chân người xem.
2. **Story Structure**:
   - **Phân cảnh 1 (Hook)**: Trình bày dữ liệu bất ngờ, câu hỏi nghịch lý, hoặc visual cực kỳ ấn tượng để thu hút sự chú ý.
   - **Phân cảnh 2 đến N-1 (Argument)**: Chứng minh luận điểm bằng văn bản cỡ lớn (font size khổng lồ, max 1 câu/phân cảnh).
   - **Phân cảnh cuối (Conclusion & CTA)**: Kết luận ngắn gọn và lời kêu gọi hành động rõ ràng.

---

## Step 2: Design & Composition (HTML + CSS + GSAP)

Triển khai giao diện và chuyển động bằng cách lựa chọn phong cách thiết kế và viết code:

### 1. Core Engine: video-hyperframes
- Xuất ra N phần tử `<section class="frame">` liên tục, mỗi frame có kích thước cố định (mặc định: `1920x1080` cho 16:9, hoặc `1080x1920` cho 9:16).
- Thêm tag metadata ẩn ở cuối mỗi frame: `<!-- frame:N duration:3000 transition:fade -->` để Remotion / Hyperframes CLI có thể đọc được.
- Đính kèm mã tự động chuyển frame (autoplays): Cứ mỗi 3 giây chuyển sang frame tiếp theo, hỗ trợ phím mũi tên và có tiến trình (progress bar) hiển thị.
- Xuất kèm metadata JSON ở cuối file:
  ```html
  <!-- HYPERFRAMES_META: {
    "frames": [
      {"id": 1, "duration": 3000, "transition": "fade", "sceneSummary": "Hook"},
      {"id": 2, "duration": 3000, "transition": "slide-left", "sceneSummary": "Body 1"}
    ]
  } -->
  ```

### 2. Mẫu Pixel Retro: 8-bit-orbit-video-template
- Sử dụng khi cần phong cách hoài cổ retro 8-bit, trò chơi điện tử cổ điển.
- Thiết kế dạng pixelated, màu sắc rực rỡ mang tính tương phản cao.
- Timeline động cơ học chính xác (deterministic timeline) - không dùng loops vô hạn hoặc random không seed.

### 3. Mẫu Haute Couture: after-hours-editorial-template
- Sử dụng cho video sang trọng, tạp chí thời trang cao cấp, cinematic intro.
- Layout tối giản kết hợp Typography Serif cao cấp (Outfit làm heading, Inter làm body).
- Tông màu tối baseline (`#0a0a0a`), điểm nhấn neon nhẹ (ví dụ Magenta) kèm hiệu ứng nhiễu phim (cinematic grain) và vignette.

### 4. GSAP Timeline & ScrollTrigger Rules
- **gsap.timeline**: Luôn gom nhóm chuyển động vào timeline thay vì dùng delay rời rạc. Tận dụng `defaults` (ví dụ `duration: 0.5, ease: "power2.out"`) và position parameter (`"<"`, `">"`, `"+=0.2"`) để đồng bộ.
- **ScrollTrigger**:
  - Đăng ký plugin: `gsap.registerPlugin(ScrollTrigger)`.
  - Luôn dùng `scrub` hoặc `toggleActions`, tuyệt đối không dùng cả hai trên cùng một trigger.
  - Sử dụng `clamp()` (v3.12+) để giữ mốc cuộn trang an toàn: `start: "clamp(top bottom)"`.
  - Với "fake" horizontal scroll: bắt buộc dùng `ease: "none"` trên tween dịch chuyển ngang để khớp tỷ lệ cuộn dọc 1:1.
  - Dọn dẹp: Thực hiện `.kill()` trên các ScrollTrigger khi unmount components.

---

## Step 3: Render & Export

### 1. Biên dịch Hyperframes thành MP4
- Chạy lệnh CLI để kiểm tra cấu trúc thư mục trước:
  ```bash
  npx hyperframes lint <directory-path>
  ```
- Thực hiện biên dịch thành file MP4 hoàn chỉnh:
  ```bash
  npx hyperframes render <directory-path> --output output/videos/<video-name>.mp4
  ```

### 2. Slack GIF Creator
- Tối ưu hóa ảnh động GIF cho ứng dụng Slack.
- Giới hạn dung lượng nhẹ (< 1MB) và độ phân giải phù hợp để tránh lỗi tự động thu nhỏ của Slack.

### 3. GIF Sticker Maker (MiniMax API)
- Chuyển đổi ảnh chân dung thành sticker động dạng Funko Pop / Pop Mart thông qua MiniMax API.
- Cú pháp tích hợp API gửi yêu cầu và render sticker có nền trong suốt (transparent background).

---

## Step 4: Motion Polish (Emil Kowalski's Restrained Motion)

Áp dụng quy tắc tinh chỉnh chuyển động của Emil Kowalski để giao diện mượt mà và tự nhiên:
1. **Độ trễ tối thiểu (Restrained Duration)**: Phản hồi UI/Micro-interactions nên nằm trong khoảng `140-220ms`. Đừng bắt người dùng đợi chuyển động kết thúc để đọc thông tin.
2. **Thuộc tính an toàn**: Chỉ animate `transform` (scale, translate, rotate) và `opacity`. Tránh animate các thuộc tính layout (`top`, `left`, `width`, `height`) gây reflow nặng.
3. **Reduced Motion**: Bắt buộc cung cấp fallback CSS `@media (prefers-reduced-motion: reduce)` để tắt hoặc giảm thiểu chuyển động đối với người dùng nhạy cảm.
4. **Không lạm dụng**: Không dùng custom cursor, không có hiệu ứng tuyết rơi/hạt nhiễu bay lung tung gây mất tập trung khỏi nội dung chính.

---

## Anti-Patterns (TUYỆT ĐỐI KHÔNG)

1. ❌ Animating layout properties (`width`, `height`, `top`, `left`) — Gây giật lag do render lại layout (reflow). Luôn ưu tiên dùng `transform`.
2. ❌ Sử dụng màu cơ bản thuần túy (generic colors like `#ff0000`, `#0000ff`) — Luôn dùng hệ màu HSL/Hex tinh chỉnh từ ANTIGRAVITY.
3. ❌ Tạo timeline hoạt họa lặp vô tận (infinite loops) không thể điều khiển hoặc dừng lại được trong Remotion.
4. ❌ Cho phép thời gian dừng cảnh (dwell time) vượt quá 3 giây mà không có chuyển động chuyển tiếp (transition).
5. ❌ Quên dọn dẹp (cleanup) các timeline hoặc ScrollTrigger dẫn đến rò rỉ bộ nhớ (memory leaks).

---

## Integration Points

| System | How to integrate |
|:---|:---|
| **video-hyperframes** | Biên dịch mã nguồn HTML/CSS/GSAP của web thành các frame video tĩnh để Remotion xuất file MP4. |
| **open-design** | Lấy tài nguyên thiết kế từ thư viện tại `/Users/mrtony/Projects/open-design/` làm template mẫu. |
| **SKILL-UIUX-DEV** | Nhận thiết kế từ UI/UX Developer để hiện thực hóa thành các hoạt ảnh giao diện chuyển động mượt mà. |
| **SKILL-VIDEO-MARKETING** | Nhận kịch bản và định hướng marketing để cấu trúc hóa thành mã nguồn Hyperframes. |

---

## Examples

### Example 1: Tạo Hyperframes Video ngắn phong cách Haute Couture

**Input**: Kịch bản 3 phân cảnh giới thiệu sản phẩm thời trang.

**Output**:
```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>Haute Couture Intro</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <style>
    :root {
      --bg: #0a0a0a;
      --accent: #ff007f;
      --text: #ffffff;
      --text-muted: #a0a0a0;
      --font-serif: 'Playfair Display', serif;
    }
    body {
      margin: 0; background: var(--bg); color: var(--text); overflow: hidden;
    }
    .frame {
      width: 1920px; height: 1080px; position: absolute; top: 0; left: 0;
      display: flex; flex-direction: column; justify-content: center;
      align-items: center; opacity: 0; visibility: hidden;
    }
    .frame.active {
      opacity: 1; visibility: visible;
    }
    h1 {
      font-family: var(--font-serif); font-size: 7rem; margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <section class="frame active" id="f1">
    <h1>THỜI TRANG ĐÊM</h1>
    <p>BST "After Hours" Haute Couture</p>
    <!-- frame:1 duration:3000 transition:fade -->
  </section>
  <section class="frame" id="f2">
    <h1>SẮC ĐỎ NỔI LOẠN</h1>
    <p>Chất liệu cao cấp từ Milan</p>
    <!-- frame:2 duration:3000 transition:slide -->
  </section>
  <section class="frame" id="f3">
    <h1>ĐẶT HÀNG NGAY</h1>
    <p>Trải nghiệm phong cách đẳng cấp tại website</p>
    <!-- frame:3 duration:3000 transition:fade -->
  </section>

  <script>
    const frames = gsap.utils.toArray('.frame');
    let current = 0;
    
    function nextFrame() {
      const next = (current + 1) % frames.length;
      gsap.timeline()
        .to(frames[current], { opacity: 0, duration: 0.5, onComplete: () => {
          frames[current].classList.remove('active');
        }})
        .set(frames[next], { className: 'frame active', opacity: 0 })
        .to(frames[next], { opacity: 1, duration: 0.5, onComplete: () => {
          current = next;
        }});
    }
    setInterval(nextFrame, 3000);
  </script>
</body>
</html>
<!-- HYPERFRAMES_META: {
  "frames": [
    {"id": 1, "duration": 3000, "transition": "fade", "sceneSummary": "Intro BST After Hours"},
    {"id": 2, "duration": 3000, "transition": "slide", "sceneSummary": "Milan Material Showcase"},
    {"id": 3, "duration": 3000, "transition": "fade", "sceneSummary": "CTA Order Page"}
  ]
} -->
```
