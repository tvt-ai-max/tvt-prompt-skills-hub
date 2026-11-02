---
id: tvt-short-card-kit
title: "Dark Card Architecture Short Video Kit (9:16)"
description: "Dark Card Architecture Short Video Kit (9:16) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: operations
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Shorts 9:16", "Dark Card", "Be Vietnam Pro", "SVG Diagram", "Zero Hallucination"]
inputs:
  - name: voice_audio_path
    type: string
    description: "Đường dẫn file audio lời đọc và alignment.json"
    required: true
  - name: card_beats
    type: textarea
    description: "Danh sách các tiêu đề thẻ và nội dung hiển thị qua từng nhịp"
    required: true
audit_gates: ["Safe Check (Reels/Shorts 0 violation)", "Zero Blank Frame > 1.0s Gate", "Loudnorm -14 LUFS"]
created_at: "2026-11-03"
---
# SKILL: tvt-short-card-kit

Đóng gói từ `STORYBOARD/content_plan_2026-11/component_kit` (bản thẻ tối đã dựng TLT-01..04, 06, 07). Mã `render_card.py` cho kết quả **trùng từng điểm ảnh** với mã gốc `dark_card_demo.py` (so 3 khung của TLT-03).

## 1. Dùng khi nào

| | |
|:--|:--|
| **Đầu vào** | `<mã>.mp3` (giọng đọc) + `<mã>.align.json` (mốc từng từ) + spec Python |
| **Đầu ra** | `out/dark_<mã>.mp4` 720×1280, 30 fps, AAC; `_debug.mp4` có lớp vùng an toàn |
| **Thương hiệu** | Tôi Là Tùng: nền `#0A0A0A`, chữ trắng, nhấn vàng `#FFC20E`, font Be Vietnam Pro Black |
| **Độ dài** | 30–40 s (lời đọc) + đuôi 2,6 s cho avatar CTA |
| **Không dùng khi** | Xem `description`. Nền trắng navy/cam của TVT: **chưa đóng gói**, còn ở `STORYBOARD/content_plan_2026-11/engine/` (7 video TVT-01..07 v1) |

## 2. Chuẩn bị

1. Cài: `pip install cairosvg pillow numpy` và `ffmpeg` (đã dùng ở máy Tùng).
2. Giọng + mốc từ. `align.json` tối thiểu: `{"duration": giây, "words": [{"word": "...", "start": s, "end": s}]}`. Sinh bằng `templates/hyperframes/align.py <voice.mp3> <script.txt> <align.json>` (SOP-01).
3. **Hỏi Tùng chọn giọng trước** (skill `clone-voice-tung`). Tuần 1 dùng ElevenLabs web gói Free, **chưa có giấy phép thương mại** → coi là bản nháp; kiểm trước khi đăng.
4. Tạo thư mục dự án (ngoài skill, ví dụ `sources/<dự-án>/`) chứa mp3 + align.json.

## 3. Lệnh (từ gốc repo)

```bash
# 1) Chép spec mẫu vào thư mục dự án, sửa mã / đoạn / beats / từ khóa
cp skills/tvt-short-card-kit/templates/spec_example.py <dự-án>/spec_<mã>.py

# 2) Sinh scene JSON (đọc <dự-án>/<MÃ>.mp3 + <MÃ>.align.json, ghi scene_<mã>.json)
cd <dự-án> && python3 spec_<mã>.py

# 3) Kiểm vùng an toàn (không render, ~vài giây): phải "vi phạm: 0"
python3 <repo>/skills/tvt-short-card-kit/scripts/render_card.py scene_<mã>.json --safe-check

# 4) Khung xem thử có nhãn vùng an toàn (tùy chọn), rồi bản thật
python3 <repo>/skills/tvt-short-card-kit/scripts/render_card.py scene_<mã>.json --debug
python3 <repo>/skills/tvt-short-card-kit/scripts/render_card.py scene_<mã>.json
```
Spec chạy được từ trong repo; ngoài repo đặt `KIT_SCRIPTS=<repo>/skills/tvt-short-card-kit/scripts`. Tuỳ chọn: `-o <file.mp4>` đổi nơi xuất.
Render **tuần tự**, chạy nền, kiểm `ps` trước.

## 4. Viết spec

`build(mã, độ_dài_lời, tabs, nhãn, segs, beats, từ_khóa, cta='pill'|'site', avatar_start=…)`:
- **segs**: mỗi thẻ một tuple `(id, kind, start, end, marks, track, sfx)`; `W('cụm từ', n, off)` neo vào lần xuất hiện thứ *n* của cụm trong lời đọc (± `off` giây). `start` = từ mở đầu đoạn, `end` = từ mở đầu đoạn kế (nối liền, không để khung trống).
- **beats**: `{id: ('Headline *nhấn*', 'dòng thẻ 1', 'dòng thẻ 2', số_tab)}`; chữ giữa `*…*` thành màu vàng. Chữ lấy từ lời đọc, **không bịa số**.
- **kind** và khóa `marks` của từng loại:

| kind | marks | kind | marks |
|---|---|---|---|
| `person_orbit` | orbit, slip | `tally` | count |
| `phone_ring` | ring, call | `paper_cols` | draw, col |
| `file_stack` | new | `rank_bars` | pick |
| `flow_break` | leave, stop | `magnifier` | zoom |
| `funnel` | neck | `clock` | drain |
| `tool_cross` | x | `week_bars` | bars, gap |
| `doc_lines` | write | `checklist` | tick1…tick4, count |

  `cta_pill` và `avatar_cta` do `build()` tự thêm (`cta='pill'`: mời bình luận CHECKLIST; `cta='site'`: avatar + `toilatung.com`).
- `track`: từ nào làm sơ đồ nảy nhẹ khi được đọc. `sfx`: `ui`, `tick`, `ding`, `whoosh` (4 tệp trong `assets/sfx`).
- Caption: ≤ 3 từ/cụm, từ khóa trong `kw` thành ô vàng.

## 5. Luật cứng

- **Zero Hallucination**: biểu đồ chỉ là cột tương đối, gắn nhãn "minh họa"; không số liệu ngoài lời đọc đã duyệt.
- Một thành phần chính mỗi lúc; thành phần sau nối thành phần trước, không để khung trống > 1,0 s.
- Chữ nằm trong **hộp an toàn** (mặc định 65/270/192/672 px trên khung 1080×1920: hợp của Meta Reels và YouTube Shorts). Số này lấy từ bài hướng dẫn bên thứ ba, **không phải chuẩn chính thức**: vẫn xem thử trên điện thoại.
- Căn giữa theo `CX = W/2` với bề rộng chữ đối xứng; đừng đặt tay theo hộp an toàn lệch (từng gây lệch sang trái).
- Không đăng, không lên lịch khi Tùng chưa có chỉ thị. Mỗi video chỉ một lời kêu gọi.

## 6. Cổng chất lượng

1. `--safe-check`: 0 vi phạm.
2. Xem khung tại các mốc đổi thẻ, một khung `--debug`; nghe lại giọng bằng tai (chưa tự động kiểm).
3. QC máy: 0 khung đen, 0 đứng hình > 1 s, âm lượng ≈ −14 LUFS (ffmpeg `loudnorm` đo). Ghi `LOG/QA_AUDIT_LOG.md`.

## 7. Giới hạn đã biết

- Chỉ chủ đề thẻ tối Tôi Là Tùng; chưa có chủ đề TVT nền trắng. Avatar mặc định `assets/avatar/tung_cut.png` (đổi qua `"avatar"` trong scene JSON).
- Không có chọn nhịp tự động: mỗi video phải viết spec tay (8–10 thẻ).
- Video TLT đã dựng trước khi đóng gói: dựng lại bằng skill có thể lệch nhẹ ở chữ caption so với bản đã dựng (thấy ở TLT-03, chưa tìm nguyên nhân). Mã skill khớp mã `dark_card_demo.py` hiện tại.
- Chưa có phụ đề tiếng Anh, chưa gắn bộ chữ K1–K5.

Bài học và lỗi đã gặp: `reference/lessons.md`.

## Tham Số Đầu Vào Của Kỹ Năng
- **voice_audio_path** (Đường dẫn file audio lời đọc và alignment.json): `{{voice_audio_path}}`
- **card_beats** (Danh sách các tiêu đề thẻ và nội dung hiển thị qua từng nhịp): `{{card_beats}}`

