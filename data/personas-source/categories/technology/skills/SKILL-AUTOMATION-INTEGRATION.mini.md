---
name: automation-integration
mini: true
token_estimate: 380
full_file: SKILL-AUTOMATION-INTEGRATION.md
---
# Tự động hóa Trình duyệt & Figma [MINI]

> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"agent-browser", "remote debugging chrome", "headless chrome control", "take a screenshot", "figma-use", "figma-code-connect-components", "youtube-clipper", "competitive-ads-extractor", "tự động hóa trình duyệt"

## Pipeline (4 steps)
1. **CLI Check** — Đảm bảo `agent-browser` đã được cài đặt trong hệ thống.
2. **CDP Connect** — Kiểm tra và mở cổng Remote Debugging Chrome `9223` trước khi connect.
3. **Execution** — `agent-browser open/click/type/screenshot`, cào file Figma, tải/cắt video YouTube, cào quảng cáo đối thủ.
4. **Clean & Output** — Dọn dẹp session và tiến trình, trả về tóm tắt ngắn + đường dẫn ảnh chụp.

## Chrome Startup Command
```bash
open -na "Google Chrome" --args --remote-debugging-port=9223 --user-data-dir=/tmp/od-agent-browser-chrome --no-first-run --no-default-browser-check
```

## Anti-Patterns
❌ Chạy `open` trước khi `connect` | ❌ Viết script Puppeteer ngoài CLI chuẩn | ❌ Paste full HTML code cào được vào chat | ❌ Bỏ qua CAPTCHA/Bảo mật mà không được phép
