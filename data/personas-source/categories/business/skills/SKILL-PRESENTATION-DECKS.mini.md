---
name: presentation-decks
mini: true
token_estimate: 380
full_file: SKILL-PRESENTATION-DECKS.md
---
# Slide Thuyết trình [MINI]

> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"guizang-ppt", "guizang-editorial-deck", "magazine-web-ppt", "deck-swiss-international", "swiss slide", "tối giản Thụy Sĩ", "pptx-generator", "html to pptx", "xuất file pdf slide"

## Pipeline (4 steps)
1. **Style Selection** — Chọn Guizang (Artistic E-Ink Magazine, 5 bảng màu) hoặc Swiss (Lý tính 16 cột, 4 màu neon/sặc sỡ).
2. **Layout Mapping** — Chọn layout từ 10 layout Guizang (L01-L10) hoặc 22 layout Swiss (S01-S22).
3. **JS Presentation** — Code cơ chế lật trang bằng phím ←/→ và đồng bộ hash url `#slide-N`.
4. **Compilation** — Dùng PptxGenJS xuất `.pptx` hoặc dùng `@media print` xuất `.pdf`.

## Core Aesthetics

### Guizang (Magazine)
- Display: Serif, Body: Sans-serif.
- Nền giấy nhám (`#f1efea` / `#eedfc7`), màu chữ tối mực.
- Cấm: Gradient, bóng đổ, bo góc, SVG icon ngoài, emoji.

### Swiss (International)
- Chỉ Sans-serif + Monospace. Lưới 16 cột không gap.
- Bo góc = 0. Border 1px hairline. Màu đơn sắc sặc sỡ (IKB Blue, Lemon, Neon Green, Orange).
- Cấm: Bo góc, bóng đổ, gradient, nét vẽ tay.

## Anti-Patterns
❌ Trộn lẫn hai phong cách | ❌ Bo góc/bóng đổ trong style Swiss | ❌ Dùng emoji màu mè | ❌ Sai tỷ lệ số liệu đồ họa
