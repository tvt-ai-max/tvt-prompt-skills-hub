---
name: data-documents
mini: true
token_estimate: 350
full_file: SKILL-DATA-DOCUMENTS.md
---
# Trực quan hóa dữ liệu & Tài liệu [MINI]

> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"d3-visualization", "d3 chart", "d3.js map", "frame-data-chart-nyt", "NYT style chart", "minimax-pdf", "export docx report", "trực quan hóa dữ liệu"

## Pipeline (4 steps)
1. **Data Clean** — Định dạng thời gian, tiền tệ, xử lý null/undefined để tránh lỗi D3 script.
2. **Visualization** — Vẽ biểu đồ D3 (cung cấp scale, axes, tooltip dynamic) hoặc biểu đồ NYT (không viền ngoài, hairline nhạt, font Sans-serif, title căn trái).
3. **Documents** — Tạo file Word (.docx) có Heading, Paragraphs, Tables.
4. **PDF Output** — Render HTML báo cáo thành PDF qua MiniMax API (căn lề in, số trang dưới chân, tránh ngắt đôi dòng chữ).

## CSS responsive SVG D3 template
```javascript
const width = container.node().getBoundingClientRect().width;
const svg = container.append("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("style", "max-width: 100%; height: auto;");
```

## Anti-Patterns
❌ Vẽ biểu đồ thiếu legend hoặc đơn vị trục | ❌ Biểu đồ bị tràn (overflow) | ❌ PDF ngắt trang làm cắt đôi ảnh/bảng dữ liệu
