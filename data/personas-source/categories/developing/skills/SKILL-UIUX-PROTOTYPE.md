---
name: uiux-prototype
category: developing
persona-source: UI/UX Developer
description: |
  Kỹ năng Thiết kế & Tạo Mockup Giao diện (Prototypes & UI/UX) giúp dựng nhanh giao diện web/mobile.
  Bao gồm saas-landing, dashboard quản trị, mobile app (khung iPhone 15 Pro/Pixel) và tích hợp thư viện shadcn-ui/wpds.
---

# 🎨 Thiết kế & Tạo Mockup Giao diện (Prototypes & UI/UX)

> Dựng nhanh mockup giao diện thực tế và bàn giao mã frontend sạch cho lập trình viên.
> Input: Ý tưởng sản phẩm, yêu cầu chức năng. Output: Mã HTML/CSS tĩnh, cấu trúc component, responsive layouts.

## Trigger Phrases

Activate this skill when the user says:
- "web-prototype", "saas-landing", "landing page mockup"
- "dashboard UI", "admin portal", "kpi dashboard"
- "mobile-app mockup", "mobile-onboarding", "iphone mockup"
- "shadcn-ui design", "wpds component"
- "phác thảo giao diện", "landing page saas", "thiết kế onboarding"

## Pipeline Overview

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ 1. WIREFRAME     │ →  │ 2. COMPONENT DEVS│ →  │ 3. RESPONSIVE    │ →  │ 4. INTEGRATION   │
│ Define layouts   │    │ SaaS/Admin/Mobile│    │ iPhone/Web Grid  │    │ Shadcn-UI mapping│
└──────────────────┘    └──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## Step 1: Wireframe & Structure

Xác định bố cục và lưới (Grid) trước khi viết mã:
1. **Lưới CSS (CSS Grid/Flexbox)**: Sử dụng hệ lưới 12 cột cho Web và flex-column cho Mobile.
2. **Hệ màu & Typography**: Áp dụng triệt để hệ mã màu tối (ANTIGRAVITY default: `#0a0a0a` làm nền chính) kèm 1-2 accent màu tươi sáng (ví dụ: Indigo `#6366f1` hoặc Emerald `#10b981`).

---

## Step 2: Component Development

Triển khai giao diện tùy theo mục tiêu:

### 1. SaaS Landing Page (`saas-landing`)
Bắt buộc có đầy đủ các khối sau:
- **Hero Section**: Tiêu đề lớn ấn tượng, dòng giới thiệu ngắn, nút Call-To-Action (CTA) nổi bật và hình ảnh mockup sản phẩm.
- **Features Grid**: Lưới 3 hoặc 4 cột hiển thị tính năng đi kèm biểu tượng SVG.
- **Pricing Card**: Bảng giá dịch vụ (Thử nghiệm miễn phí, Gói chuyên nghiệp với viền sáng highlight, Gói doanh nghiệp).
- **CTA cuối trang**: Nút kêu gọi hành động lớn thu hút sự chú ý.

### 2. Admin Dashboard (`dashboard`)
- **Sidebar**: Điều hướng bên trái dạng tối giản, thu gọn được trên thiết bị di động.
- **KPI Wall**: Các thẻ chỉ số quan trọng (Doanh thu, Người dùng mới, Tỷ lệ chuyển đổi) hiển thị chữ số lớn và thẻ xu hướng tăng/giảm.
- **Biểu đồ tĩnh/động**: Vùng vẽ biểu đồ sử dụng CSS Grid hoặc Canvas.

### 3. Mobile App & Onboarding (`mobile-app`)
- Giao diện phải nằm gọn trong khung mô phỏng di động:
  - Khung iPhone 15 Pro: `width: 393px; height: 852px; border: 12px solid #222; border-radius: 40px; position: relative; overflow: hidden;`
- **Splash Screen / Onboarding**: Thiết lập tối thiểu 3 bước giới thiệu với chấm định vị trang ở dưới đáy và nút "Tiếp tục / Bắt đầu".

---

## Step 3: Library Mapping (Shadcn UI & WPDS)

Đảm bảo mã HTML/CSS hoặc component React có cấu trúc lớp (class) tương thích cao với TailwindCSS của thư viện Shadcn UI:
- Sử dụng các lớp tiện ích chuẩn như `rounded-lg`, `border`, `bg-background`, `text-foreground`, `shadow-sm`.
- Cấu trúc DOM lồng nhau tương ứng với các Primitive của Radix UI (ví dụ: `Dialog`, `Popover`, `Tabs`).

---

## Anti-Patterns (TUYỆT ĐỐI KHÔNG)

1. ❌ Dựng landing page thiếu nút Call To Action (CTA) rõ ràng.
2. ❌ Thiết kế app di động tràn ra ngoài màn hình mà không nằm trong khung iPhone/Android mô phỏng.
3. ❌ Viết CSS inline lộn xộn, không gom nhóm các biến Token CSS vào `:root`.
4. ❌ Không xử lý trạng thái hover / active của các nút và thẻ component.

---

## Integration Points

| System | How to integrate |
|:---|:---|
| **open-design** | Đồng bộ assets, ảnh mô phỏng và style token tại `/Users/mrtony/Projects/open-design/`. |
| **SKILL-FULLSTACK-DEV** | Bàn giao mã HTML/CSS/Tailwind thô của giao diện sang lập trình viên để gắn API thật. |
| **agent-browser** | Chạy kiểm tra lỗi hiển thị (visual QA) bằng headless Chrome sau khi code xong. |

---

## Examples

### Example 1: Mockup SaaS Landing Page tối giản tương thích Shadcn UI

**Input**: Tạo landing page cho sản phẩm "Lexi AI Assistant".

**Output**:
```html
<div class="min-h-screen bg-black text-white font-sans">
  <!-- Header -->
  <header class="border-b border-zinc-800 py-4 px-6 flex justify-between items-center">
    <span class="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Lexi AI</span>
    <button class="bg-indigo-600 hover:bg-indigo-500 text-sm px-4 py-2 rounded-md transition-all">Launch App</button>
  </header>
  
  <!-- Hero Section -->
  <section class="max-w-4xl mx-auto text-center py-20 px-4">
    <span class="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Introducing Lexi v2.0</span>
    <h1 class="text-5xl md:text-6xl font-extrabold mt-4 mb-6 leading-tight">Supercharge your content pipeline with AI Agents</h1>
    <p class="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">Lexi automates drafting, SEO, and social distribution, allowing solo founders to execute like a team of 10.</p>
    <div class="flex justify-center gap-4">
      <button class="bg-indigo-600 hover:bg-indigo-500 font-medium px-6 py-3 rounded-md transition-all shadow-lg shadow-indigo-500/20">Start Free Trial</button>
      <button class="border border-zinc-700 hover:bg-zinc-900 font-medium px-6 py-3 rounded-md transition-all">Book Demo</button>
    </div>
  </section>
</div>
```
