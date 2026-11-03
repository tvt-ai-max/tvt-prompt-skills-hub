---
name: automation-integration
category: technology
persona-source: AI/Machine Learning Engineer
description: |
  Kỹ năng Tự động hóa Trình duyệt & Figma (Automation & Integration) giúp cào dữ liệu và kết nối figma component.
  Tích hợp agent-browser, screenshot, figma-use, youtube-clipper và competitive-ads-extractor.
---

# 🤖 Tự động hóa Trình duyệt & Figma (Automation & Integration)

> Điều khiển Chrome tự động, phân tích file Figma, cào quảng cáo đối thủ và cắt ghép video YouTube.
> Input: Target URL, Figma File ID, YouTube URL. Output: Dữ liệu cào, screenshot, figma component map, clip video.

## Trigger Phrases

Activate this skill when the user says:
- "agent-browser", "remote debugging chrome", "headless chrome control"
- "take a screenshot", "chụp ảnh màn hình chrome", "chụp tab hiện tại"
- "figma-use", "figma-code-connect-components", "kết nối figma component"
- "youtube-clipper", "competitive-ads-extractor", "quét quảng cáo đối thủ"
- "tự động hóa trình duyệt", "click nút chrome", "cào dữ liệu figma"

## Pipeline Overview

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│1. CLI VALIDATION │ →  │2. CDP CONNECTION │ →  │3. EXECUTION      │ →  │4. COMPILATION    │
│ Check tool exist │    │ Port 9223 Startup│    │ Click/Scrape/Clip│    │ Return evidence  │
└──────────────────┘    └──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## Step 1: CLI Validation

Trước khi chạy bất kỳ tác vụ tự động hóa nào, bắt buộc kiểm tra sự tồn tại của công cụ trong hệ thống:
```bash
command -v agent-browser
```
Nếu thiếu, yêu cầu người dùng cài đặt:
```bash
npm i -g agent-browser
agent-browser install
```

---

## Step 2: Chrome CDP Remote Debugging Connection

Trình duyệt tự động hóa `agent-browser` phải kết nối tới một endpoint Chrome Debugging Protocol (CDP) đang hoạt động.
- **Quy trình kết nối bắt buộc**:
  1. Kiểm tra xem Chrome Remote Debugging đã mở chưa (mặc định cổng `9223`):
     ```bash
     curl -fsS http://127.0.0.1:9223/json/version | grep webSocketDebuggerUrl
     ```
  2. Nếu cổng chưa mở, khởi động Chrome với cấu hình remote-debugging:
     ```bash
     open -na "Google Chrome" --args \
       --remote-debugging-port=9223 \
       --user-data-dir=/tmp/od-agent-browser-chrome \
       --no-first-run \
       --no-default-browser-check
     ```
  3. Đợi tối đa 10 giây (vòng lặp sleep 0.5s) cho cổng sẵn sàng, sau đó kết nối:
     ```bash
     agent-browser connect http://127.0.0.1:9223
     ```

---

## Step 3: Tác vụ Thực thi

### 1. Tự động hóa trình duyệt & Chụp ảnh màn hình (`agent-browser` & `screenshot`)
- Mở trang web: `agent-browser open <url>`
- Lấy tiêu đề và url để xác nhận trạng thái: `agent-browser get title`, `agent-browser get url`
- Chụp ảnh màn hình toàn trang hoặc thẻ cụ thể: `agent-browser screenshot /tmp/screenshot.png`
- Nhập liệu và click: `agent-browser type <selector> "<text>"`, `agent-browser click <selector>`
- **An toàn**: Tuyệt đối không tự ý vượt CAPTCHA, điền thông tin nhạy cảm (mật khẩu, thanh toán) khi chưa có sự xác nhận của người dùng.

### 2. Figma Integration & Code Connect (`figma-use` & `figma-code-connect-components`)
- Đọc cấu trúc cây Node của file thiết kế Figma thông qua Figma REST API sử dụng Token.
- Trích xuất thông tin màu sắc, typography, khoảng cách để đồng bộ với mã CSS/Tailwind frontend thực tế.
- Khớp (mapping) các component Figma (như Button, Card, Input) với file component tương ứng trong mã nguồn để đảm bảo tính đồng bộ SSOT.

### 3. Scrape Quảng cáo & Cắt Video (`youtube-clipper` & `competitive-ads-extractor`)
- Tải và cắt video YouTube dựa trên mốc thời gian bắt đầu và kết thúc (start/end timestamp).
- Quét thông tin quảng cáo của đối thủ cạnh tranh trên các nền tảng mạng xã hội để cung cấp dữ liệu đầu vào cho quy trình cải tiến chất lượng nội dung (Improvement Loop).

---

## Anti-Patterns (TUYỆT ĐỐI KHÔNG)

1. ❌ Khởi chạy `agent-browser open` trước khi thực hiện lệnh kết nối `agent-browser connect`.
2. ❌ Tự viết script Puppeteer/Playwright tùy biến ngoài CLI `agent-browser` chuẩn đã được thiết lập.
3. ❌ Paste toàn bộ mã HTML thô cào được từ trang web vào khung chat (chỉ tóm tắt selector và dữ liệu chính).
4. ❌ Bỏ qua việc dọn dẹp các tiến trình Chrome chạy ngầm hoặc file rác `/tmp` sau khi hoàn thành.

---

## Integration Points

| System | How to integrate |
|:---|:---|
| **open-design** | Thực thi Dogfooding và chạy Visual QA kiểm thử các bản dựng UI của Open Design. |
| **SKILL-GROWTH-HACKING** | Cung cấp thông tin quảng cáo đối thủ đã cào được để tối ưu hóa chiến lược tăng trưởng. |

---

## Examples

### Example 1: Kịch bản cào tiêu đề trang và chụp ảnh màn hình giao diện cục bộ

**Input**: Chụp ảnh màn hình trang Open Design preview tại cổng 17573.

**Output**:
```bash
# 1. Khởi động Chrome Debugging
open -na "Google Chrome" --args --remote-debugging-port=9223 --user-data-dir=/tmp/od-agent-browser-chrome --no-first-run --no-default-browser-check

# 2. Kết nối và chụp ảnh
agent-browser connect http://127.0.0.1:9223
agent-browser open http://127.0.0.1:17573/
agent-browser get title
agent-browser screenshot /tmp/open-design-preview.png
```
