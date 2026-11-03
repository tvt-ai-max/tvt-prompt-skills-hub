---
name: presentation-decks
category: business
persona-source: Project Manager
description: |
  Kỹ năng soạn thảo tài liệu, slide thuyết trình dự án B2B hoặc đào tạo.
  Tích hợp các mẫu thiết kế Guizang Editorial (phong cách tạp chí), Swiss International (16 cột, tối giản Thụy Sĩ)
  và tự động biên dịch HTML sang tệp .pptx hoặc .pdf có thể tải xuống.
---

# 📊 Slide Thuyết trình (Decks & Presentations)

> Thiết kế slide trình diễn dự án đẳng cấp cao bằng HTML/CSS và xuất tệp PPTX/PDF.
> Input: Nội dung thuyết trình, số liệu. Output: Bản trình chiếu HTML, tệp .pptx, tệp .pdf.

## Trigger Phrases

Activate this skill when the user says:
- "guizang-ppt", "guizang-editorial-deck", "magazine-web-ppt"
- "deck-swiss-international", "swiss slide", "tối giản Thụy Sĩ"
- "pptx-generator", "html to pptx", "xuất file pdf slide"
- "lập slide thuyết trình", "slide pitching", "thiết kế slide B2B"

## Pipeline Overview

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│1. STYLE SELECTION│ →  │2. LAYOUT MAPPING │ →  │3. PRESENTATION JS│ →  │4. COMPILATION    │
│ Guizang vs Swiss │    │ Choose 10/22 rows│    │Keyboard nav + hash│    │Export PDF/PPTX   │
└──────────────────┘    └──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## Step 1: Style Selection (Guizang vs Swiss)

Chọn 1 trong 2 trường phái thiết kế và bộ màu tương ứng (Tuyệt đối không pha trộn màu và style):

### 1. Phong cách Tạp chí Nghệ thuật (Guizang Editorial)
Nhấn mạnh vào tính tự sự, chia sẻ quan điểm, mang lại cảm giác đọc báo giấy sang trọng.
- **Bảng màu (Chọn 1)**:
  - 🖋 **Classic Monocle**: ink `#0a0a0b`, paper `#f1efea`, paper-tint `#e8e5de`.
  - 🌊 **Indigo Porcelain**: ink `#0a1f3d`, paper `#f1f3f5`, paper-tint `#e4e8ec`.
  - 🌿 **Forest Ink**: ink `#1a2e1f`, paper `#f5f1e8`, paper-tint `#ece7da`.
  - 🍂 **Kraft Paper**: ink `#2a1e13`, paper `#eedfc7`, paper-tint `#e0d0b6`.
  - 🌙 **Dune**: ink `#1f1a14`, paper `#f0e6d2`, paper-tint `#e3d7bf`.
- **Typography**: Dùng font Serif (`Playfair Display` / `Noto Serif SC`) cho tiêu đề lớn, font Sans-serif (`Inter` / `Noto Sans SC`) cho nội dung.

### 2. Phong cách Tối giản Thụy Sĩ (Swiss International)
Cực kỳ lạnh lùng, lý tính, học thuật, chính xác. Không sử dụng bóng đổ, độ mờ, gradient hay hoa văn.
- **Bảng màu (Chọn 1)**:
  - 🔵 **Klein Blue (IKB)**: accent `#002FA7`, paper `#fafaf8`, ink `#0a0a0a`.
  - 🟡 **Lemon Yellow**: accent `#FFD500`, paper `#f7f5ee`, ink `#0a0a0a` (văn bản dùng màu đen).
  - 🟢 **Neon Green**: accent `#C5E803`, paper `#f7f5ee`, ink `#0a0a0a` (văn bản dùng màu đen).
  - 🟠 **Safety Orange**: accent `#FF6B35`, paper `#f7f5ee`, ink `#0a0a0a` (chữ màu trắng bold).
- **Typography**: Chỉ dùng Sans-serif (`Inter Tight` / `Inter` / `Noto Sans SC`) và monospace (`JetBrains Mono` cho số liệu).

---

## Step 2: Layout Mapping

Sử dụng các bố cục chuẩn để phân chia nội dung:

### Layouts Guizang (10 kiểu)
- **L01 Hero Cover**: Tiêu đề trung tâm cực lớn + mô tả ngắn + thông tin tác giả/ngày tháng dưới đáy.
- **L02 Act Divider**: Phân chia chương, cỡ chữ 8.5-10vw, có thể đảo ngược màu nền/màu chữ.
- **L03 Big Numbers Grid**: Lưới 3x2 gồm nhãn, số liệu khổng lồ và diễn giải.
- **L04 Quote + Image**: Căn lề trái, bên phải là ảnh tỷ lệ 16:10.
- **L06 Pipeline / Flow**: Các bước đi ngang kèm mô tả.
- **L08 Big Quote**: Trích dẫn cực lớn kèm bản dịch tiếng Anh nhỏ phía dưới.

### Layouts Swiss (22 kiểu)
- **S01 Cover**: Màu nhấn (accent) phủ toàn màn hình kèm họa tiết chấm ASCII và chữ phản quang.
- **S02 Vertical Timeline**: Trục thời gian nét đứt chạy dọc với các chấm tròn mốc sự kiện.
- **S03 Statement**: Phát ngôn nổi bật cỡ chữ 9.6vw kèm khoảng trống lớn bên trái.
- **S05 Three Sub-cards**: Tiêu đề lớn bên trái, bên phải là 3 thẻ màu xám xếp chồng lên nhau.
- **S06 KPI Tower**: 4 cột thông số có chiều cao thay đổi biểu thị độ lớn của số liệu.
- **S08 Duo Compare**: Chia đôi màn hình so sánh Before và After.

---

## Step 3: Interactive Presentation

Mọi bản slide thiết kế bằng HTML/CSS bắt buộc tích hợp mã điều hướng bằng bàn phím và liên kết hash URL:
- Phím `ArrowRight` (hoặc `Space`) để sang slide tiếp theo.
- Phím `ArrowLeft` để lùi lại slide cũ.
- Tự động đồng bộ số trang lên thanh địa chỉ (ví dụ: `index.html#slide-3`).

---

## Step 4: HTML to PPTX/PDF Compilation

Biên dịch mã nguồn HTML/CSS sang file lưu trữ vật lý:
1. **pptx-generator**: Tích hợp thư viện sinh file PowerPoint từ cấu trúc slide HTML (ví dụ dùng `PptxGenJS`). Tự động ánh xạ thẻ `div`, `h1`, `p`, hình ảnh thành các slide object tương ứng.
2. **PDF Export**: Sử dụng các CSS print rule `@media print` thiết lập kích thước trang `size: A4 landscape` hoặc `size: 16in 9in`, tự động ngắt trang bằng `page-break-after: always`.

---

## Anti-Patterns (TUYỆT ĐỐI KHÔNG)

1. ❌ Dùng góc bo tròn (`border-radius`) hoặc bóng đổ (`box-shadow`) khi thiết kế theo phong cách Swiss.
2. ❌ Sử dụng các icon từ thư viện bên ngoài hoặc emoji màu mè trong slide Guizang.
3. ❌ Trộn lẫn font chữ có chân (Serif) và không chân (Sans-serif) làm mất tính nhất quán của phong cách.
4. ❌ Nhập sai tỷ lệ chiều cao cột hoặc biểu đồ so với số liệu thực tế đã cung cấp.

---

## Integration Points

| System | How to integrate |
|:---|:---|
| **open-design** | Lấy mẫu và xuất slide preview qua cổng web server cục bộ `/Users/mrtony/Projects/open-design/`. |
| **SKILL-PROJECT-MGMT** | Nhận nội dung kế hoạch dự án và phân tích để chuyển đổi thành slide thuyết trình. |

---

## Examples

### Example 1: Cấu trúc CSS Grid 16 cột phong cách Swiss International (Cover)

**Input**: Tạo slide bìa giới thiệu dự án AI Agent.

**Output**:
```html
<div class="w-[1920px] h-[1080px] bg-[#fafaf8] text-[#0a0a0a] font-sans relative overflow-hidden p-20 grid grid-cols-16 gap-0">
  <!-- Top line -->
  <div class="col-span-16 border-t border-[#0a0a0a] pt-4 flex justify-between text-xs tracking-wider uppercase">
    <span>Project: Lexi Autopilot</span>
    <span>№ 01 / 10</span>
  </div>
  
  <!-- Main Accent Block (Klein Blue) -->
  <div class="col-span-12 col-start-1 mt-20">
    <span class="text-xs uppercase tracking-wider text-[#002FA7] font-semibold">Initiative v1</span>
    <h1 class="text-[9.6vw] font-black leading-none uppercase mt-6 text-[#002FA7]">AGENT<br>ENGINE</h1>
  </div>
  
  <!-- Right metadata column -->
  <div class="col-span-4 col-start-13 mt-20 border-l border-zinc-200 pl-8 text-sm flex flex-col justify-between h-[500px]">
    <p class="text-zinc-600 leading-relaxed">A study on deploying 298 coordinated AI agents to execute local marketing and development workflows autonomously.</p>
    <div>
      <span class="block text-xs uppercase text-zinc-400">Date</span>
      <span class="font-mono">2026-06-10</span>
    </div>
  </div>
</div>
```
