---
id: tvt-vlog-talkinghead
title: "Cinematic Mobile Vlog & Handwriting Title Pipeline"
description: "Cinematic Mobile Vlog & Handwriting Title Pipeline — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: operations
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Vlog Editing", "Mobile Footage", "Handwriting Typography", "Color Grading LUT", "B-Roll Sync"]
inputs:
  - name: footage_folder_path
    type: string
    description: "Thư mục chứa các clip và ảnh điện thoại quay thật"
    required: true
  - name: vlog_title
    type: string
    description: "Tiêu đề vlog và danh sách nhân vật xuất hiện"
    required: true
audit_gates: ["Style Lock Agreement Gate", "Preview Sign-off Before Render", "LUT 65% Uniform Color Gate"]
created_at: "2026-11-03"
---
# tvt-vlog-talkinghead

> Đóng gói từ vlog "Sáng thứ Bảy với Tý Kute" (31/10/2026, 144s). **Đọc `reference/lessons.md` trước** — Style Lock (mục A) phải hỏi MỘT LẦN trước khi dựng.
> Hạ tầng dùng lại: `skills/toilatung-kinetic-reel` (engine, scenes `heart_tag`/`title_stack`/`hearts_burst`, brand `tyk.json`). Không sửa engine trong skill này.

## 1. Dùng khi nào
Footage dọc quay điện thoại có người nói trực diện + cảnh quay phụ + ảnh; muốn video có hồn (chữ viết tay, tim, màu đồng bộ) và hạn chế vòng phản hồi.

## 2. Lệnh (từ gốc repo)
```bash
V=skills/tvt-vlog-talkinghead/scripts
python3 $V/asset_find.py script --type font --vi --sheet /tmp/fonts.png        # 1. tìm font/LUT/SFX trong kho trước
python3 $V/vlog_build.py <project.json> check      # 2. kiểm file · mốc · độ dài ước tính · phông
python3 $V/vlog_build.py <project.json> prep       # 3. clip có lời: cắt lặng + whisper + sửa chính tả + caption
python3 $V/vlog_build.py <project.json> parts      # 4. sinh từng phần + LUT
python3 $V/vlog_build.py <project.json> preview    # 5. khung xem nhanh → CHỜ NGƯỜI DÙNG DUYỆT
python3 $V/vlog_build.py <project.json> render     # 6. render tuần tự → nối → limiter → QC → contact sheet (≈ 27 phút cho 144s, chạy nền — xem lessons B12)
```
`project.json`: sao chép `templates/project.example.json` (chính là vlog Tý Kute, `check` ra đúng 144.0s). Trường: `source_dir`, `brand`, `lut{file,strength}`, `alias` (file bị đổi tên), `spell_fixes`, `asr_prompt`, `parts[]`.
- `kind:"broll"`: `segs[]` = `{file,ss,d,beat?}` hoặc `{photo,d}` (Ken Burns); `beat.at` = giây trong đoạn.
- `kind:"head"`: `clip`, `ranges[[giây nguồn a,b]]` (cắt ở ranh giới câu), `beats[]` với `src` = giây NGUỒN, `zone:"top|chest"`.
- Beat `k`: `hand` (chữ viết tay hồng) · `stack` (3 dòng) · `heart_tag` (tên + tim) · `hearts` (tim bay).

## 3. Quy cách thiết kế đã chốt
Cụm 3 dòng: dòng 1 viết tay vàng `#FFC20E` · dòng 2 Montserrat ExtraBold trắng `#ffffff` · dòng 3 Roboto trong viên tối; **chỉ bóng đen mờ, không viền**; đặt vùng trống xa mặt; phụ đề Roboto ở y=1500, từ đang nói đổi hồng. Font viết tay: SVN-Sign Painter House Script (không phải Monttee — VIP trả phí). Màu: LUT chung @65% lên hình gốc, đồ hoạ không bị nhuộm. Tên/biệt danh luôn viết bằng font viết tay + tim SVG.

## 4. Luật cứng
- Hỏi Style Lock trước; không dựng khi chưa có: tỉ lệ+độ dài, cách viết tên riêng, font, LUT, đoạn/người loại trừ.
- Không bịa lời/nhãn: câu ASR không chắc → loại khỏi caption; địa danh chỉ gắn khi người dùng xác nhận.
- `check` phải ✅ (độ dài < 179s) trước `parts`; preview được duyệt trước `render`.
- Render tuần tự, chạy nền, kiểm `ps`. Không đăng/gửi video khi chưa có chỉ thị.
- Ghi `LOG/QA_AUDIT_LOG.md`; nói rõ phần chưa kiểm (nghe mix bằng tai, nhạc/SFX tổng hợp).

## 5. Asset: tra kho trước, web/Higgsfield sau
`MEMORY/ASSET_LIBRARY.md` (thứ tự tra cứu + bộ chọn sẵn) và `MEMORY/asset_catalog.jsonl` (3.065 asset: font · LUT · âm thanh · video). Đường ngắn theo vai trò: `<kho>/TVT_Library/{fonts,luts,sfx,music,overlays}/_recommended`. Cập nhật chỉ mục: `python3 $V/asset_index.py`. Không có trong kho mới được tìm web hoặc tạo bằng Higgsfield — ghi lý do.

## 6. Giới hạn đã biết
- Nhạc/SFX vẫn là loại tổng hợp của engine; chưa nối thư viện `Sound SFX - Edit` vào mix (ý tưởng tiếp theo: `sfx_extra` trỏ file WAV từ `asset_find.py whoosh --type audio`).
- Độ khớp địa danh/tên người phải do người dùng xác nhận.
- `zones.py` không dùng được cho selfie cận mặt — dùng vùng cố định ở mục 2.
- Chỉ macOS (Vision, sips, ffmpeg-full); cần ổ SSD BIG gắn để tra cứu LUT/font.

## Tham Số Đầu Vào Của Kỹ Năng
- **footage_folder_path** (Thư mục chứa các clip và ảnh điện thoại quay thật): `{{footage_folder_path}}`
- **vlog_title** (Tiêu đề vlog và danh sách nhân vật xuất hiện): `{{vlog_title}}`

