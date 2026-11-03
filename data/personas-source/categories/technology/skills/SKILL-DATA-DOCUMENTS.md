---
name: data-documents
category: technology
persona-source: Data Scientist
description: |
  Kỹ năng Trực quan hóa dữ liệu & Tài liệu (Data & Documents) giúp vẽ biểu đồ phức tạp và sinh báo cáo tự động.
  Tích hợp d3-visualization, thiết kế đồ họa kiểu New York Times (NYT style) và tự động tạo file .docx hoặc .pdf qua MiniMax PDF.
---

# 📈 Trực quan hóa dữ liệu & Tài liệu (Data & Documents)

> Vẽ biểu đồ dữ liệu động tương tác và xuất bản báo cáo dự án chuẩn in ấn.
> Input: Tập dữ liệu (CSV/JSON), yêu cầu báo cáo. Output: Biểu đồ D3.js, file tài liệu Word (.docx), file PDF báo cáo.

## Trigger Phrases

Activate this skill when the user says:
- "d3-visualization", "d3 chart", "d3.js map"
- "frame-data-chart-nyt", "NYT style chart", "biểu đồ phong cách báo chí"
- "minimax-pdf", "export docx report", "tạo file word tự động"
- "trực quan hóa dữ liệu", "vẽ biểu đồ tương tác", "xuất báo cáo dự án"

## Pipeline Overview

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│1. DATA CLEANING  │ →  │2. VISUALIZATION  │ →  │3. ANNOTATION     │ →  │4. EXPORT DOC/PDF │
│ Parse JSON/CSV   │    │ D3.js / NYT Grid │    │ Labels & Legends │    │DocxGen / MiniMax │
└──────────────────┘    └──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## Step 1: Data Cleaning & Parsing

Chuẩn bị nguồn dữ liệu trước khi vẽ:
1. **Xử lý null/undefined**: Đảm bảo không có dữ liệu trống gây lỗi treo script D3.
2. **Định dạng thời gian/tiền tệ**: Định dạng chuẩn hóa (ví dụ: `d3.timeParse` hoặc `Intl.NumberFormat`).

---

## Step 2: Visualization Development

Triển khai biểu đồ và báo cáo theo yêu cầu:

### 1. D3.js Interactive Charts (`d3-visualization`)
- **Tương tác**: Hỗ trợ phóng to (zoomable), di chuột hiện tooltip (hover card), vẽ đồ thị lực liên kết (force-directed graph), bản đồ nhiệt (heatmap), hoặc biểu đồ phân cấp (treemap).
- **Quy trình chuẩn**:
  - Định nghĩa vùng vẽ SVG kèm margin hợp lý: `const margin = {top: 20, right: 30, bottom: 40, left: 50};`
  - Tạo các trục chia (Scales) như `d3.scaleLinear`, `d3.scaleBand` và render trục tọa độ (Axes).
  - Ràng buộc dữ liệu (Data Binding) và vẽ các phần tử đồ họa đại diện.

### 2. Biểu đồ phong cách New York Times (`frame-data-chart-nyt`)
- **Đặc trưng thiết kế**:
  - Sử dụng màu nền nhã nhặn (thường là màu kem sáng hoặc xám nhạt).
  - Đường chia trục nhạt màu (hairline), không hiển thị khung viền bao ngoài biểu đồ.
  - Phông chữ Sans-serif gọn gàng (`Inter` / `Franklin Gothic`), căn lề tiêu đề và chú thích sang bên trái.
  - Sử dụng các màu nhấn nhã nhặn (tuyệt đối không dùng màu gốc nguyên bản 100%).

### 3. Sinh báo cáo tự động (Microsoft Word .docx)
- Sử dụng các thư viện sinh tài liệu Word (như `docx` trong NodeJS).
- Cấu trúc file rõ ràng: Heading 1, Heading 2, Paragraph, Bullet points, và chèn bảng biểu số liệu (Tables) căn biên chính xác.

### 4. Xuất PDF cao cấp (MiniMax PDF API)
- Gửi yêu cầu chuyển đổi mã HTML của báo cáo sang PDF qua API MiniMax.
- Thiết lập CSS `@page` kiểm soát lề in, số trang dưới chân trang (Page footers) và ngắt dòng thông minh để tránh cắt đôi chữ ở rìa trang.

---

## Anti-Patterns (TUYỆT ĐỐI KHÔNG)

1. ❌ Vẽ biểu đồ D3 không có chú giải (legend) hoặc không ghi rõ đơn vị đo lường ở hai trục tọa độ.
2. ❌ Để biểu đồ D3 bị tràn kích thước (overflow) ngoài khung bao của phần tử cha trên thiết bị di động.
3. ❌ Viết code D3 không dọn dẹp (cleanup) các phần tử SVG cũ khi dữ liệu thay đổi, dẫn đến trùng lặp hình vẽ.
4. ❌ Xuất báo cáo PDF bị ngắt trang giữa chừng làm cắt đôi hình ảnh hoặc bảng dữ liệu quan trọng.

---

## Integration Points

| System | How to integrate |
|:---|:---|
| **open-design** | Lưu và xem trước hình ảnh/biểu đồ được xuất ra trong thư mục `/Users/mrtony/Projects/open-design/`. |
| **skill-data-science** | Nhận dữ liệu đã qua phân tích và KPI từ Data Scientist để trực quan hóa lên báo cáo. |

---

## Examples

### Example 1: Code khởi tạo SVG D3.js chuẩn chống tràn giao diện

**Input**: Tạo biểu đồ cột D3.js.

**Output**:
```javascript
// Thiết lập kích thước đáp ứng (responsive width)
const container = d3.select("#chart-container");
const width = container.node().getBoundingClientRect().width;
const height = 400;
const margin = {top: 40, right: 20, bottom: 50, left: 60};

const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("style", "max-width: 100%; height: auto;");

const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Logic vẽ Scale và Axis...
```
