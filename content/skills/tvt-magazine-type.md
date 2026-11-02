---
id: tvt-magazine-type
title: "High-End Editorial Magazine Typography Video Engine"
description: "High-End Editorial Magazine Typography Video Engine — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: marketing
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Editorial Magazine", "Typography Video", "Luxury Brand", "Serif Motion", "Corporate Explainer"]
inputs:
  - name: article_title
    type: string
    description: "Tiêu đề bài viết phong cách tạp chí"
    required: true
  - name: key_quotes
    type: textarea
    description: "Trích dẫn ấn tượng và số liệu chuyên gia"
    required: true
audit_gates: ["Editorial Typographic Hierarchy Gate", "Grid Alignment Gate", "Pacing & Whitespace Gate"]
created_at: "2026-11-03"
---
# SKILL: tvt-magazine-type

> Skill 03 của bộ retention video. Đặc tả yêu cầu: `retention_video_skills_pack/03_SKILL_tvt-magazine-type.md`.
> Lõi dùng chung: `templates/hyperframes/` (`promo_core.py` · `promo_engine.js` · `render.py`) + `retention_video_skills_pack/tools/engine_core.py`.
> Trạng thái: engine chạy thật, đã render demo 29,6 s trong repo (`examples/out/editorial_premium_demo.mp4`).

---

## 1. DÙNG KHI NÀO

| | |
|:--|:--|
| **Dùng cho** | Video diễn giải 16:9 phong cách editorial — luận điểm, số liệu, trích dẫn, định nghĩa. Nền sáng, chữ serif, nhiều khoảng thở |
| **Tỉ lệ** | `16x9` — canvas CSS 960×540 @ scale 2 = khung chính **1920×1080** |
| **Thời lượng** | Theo `timeline[]` trong JSON (mỗi cảnh 4–6 s là hợp lý) |
| **Không dùng khi** | Cần video 9:16 dọc (dùng `tvt-voice-motion` hoặc `tvt-stickman`); cần lời đọc tự động tạo video (skill này **không** có TTS — cần `--voice`); cần b-roll quay thật (engine chỉ nhận ảnh bạn tự đặt) |

---

## 2. PIPELINE

```bash
# 1. Soạn JSON theo schema (LLM hoặc tay) — BẮT BUỘC đúng schema
#    retention_video_skills_pack/schemas/tvt-magazine-type_schema.json
#    Mẫu chạy được: skills/tvt-magazine-type/examples/tvt-magazine-type.json

# 2. Dựng project (HTML/CSS/JS + render_config.json) — build kiểm schema trước,
#    rồi đo hình học thật trong chromium
python3 skills/tvt-magazine-type/scripts/build.py \
        skills/tvt-magazine-type/examples/tvt-magazine-type.json \
        --face-boxes skills/tvt-magazine-type/examples/face_boxes.json

# 3. Kiểm nội dung (schema + luật riêng skill 03) — exit 0 PASS, 2 FAIL
#    --report là BẮT BUỘC: không có nó thì các quy tắc phụ thuộc kết quả dựng
#    (diện tích accent, né mặt, ẩn caption) sẽ KHÔNG được kiểm
python3 skills/tvt-magazine-type/scripts/qa_content.py \
        skills/tvt-magazine-type/examples/tvt-magazine-type.json \
        --report skills/tvt-magazine-type/out/tvt-magazine-type/qa_content.json

# 4. QA hình học: safe margin + tràn chữ + khung hình trống (chặn trước khi render)
python3 skills/tvt-magazine-type/scripts/render.py skills/tvt-magazine-type/out/tvt-magazine-type --qa

# 5. Render MP4 (tự chạy lại QA trước)
python3 skills/tvt-magazine-type/scripts/render.py skills/tvt-magazine-type/out/tvt-magazine-type

# 6. Tự kiểm từ file sạch (build -> qa -> render -> ffprobe)
bash skills/tvt-magazine-type/scripts/selftest.sh

# 7. Tái tạo lại video demo trong repo
bash skills/tvt-magazine-type/scripts/make_demo.sh

# 8. Test lõi dùng chung (chuẩn âm thanh, schema, SFX, khung trống) — 38 test
python3 retention_video_skills_pack/tools/test_engine_core.py
```

**Không sửa tay `skills/tvt-magazine-type/out/<project>/`** — sửa JSON rồi build lại.

### Tuỳ chọn

| Tuỳ chọn | Tác dụng |
|:--|:--|
| `--voice <file>` | Ghép giọng đọc vào MP4. File được **chuẩn hoá tự động** về chuẩn pack (−14 LUFS ±0,5 · TP ≤ −1 dBTP) trước khi trộn; bản xuất cuối được kiểm lại và **FAIL (exit 2)** nếu lệch chuẩn |
| `--alignment <file>` | `alignment.json` sinh bởi `templates/hyperframes/align.py` — dùng làm nguồn mốc thời gian thay cho ước lượng |
| `--fps` (mặc định 30) | 30 fps là đủ cho đồ họa tĩnh kiểu editorial; 60 fps nặng gấp đôi |
| `--caption-hide-ratio` (mặc định 0.5) | Ngưỡng ẩn sub, tính trên diện tích safe box |

---

## 3. SCHEMA — trường JSON -> hiệu ứng hình

| Trường | Hiệu ứng |
|:--|:--|
| `brand.accent_color` | Màu accent duy nhất → `--accent` (rule, số liệu). Nếu tương phản < 4.5:1 với nền thì **không** dùng cho chữ |
| `brand.name` | Nhãn thương hiệu góc trên phải |
| `brand.tone` | Không ảnh hưởng hình — giữ để đúng schema |
| `grid.columns` | Số cột lưới (mặc định 12) |
| `grid.text_span` | Khoảng span cho phép của khối chữ (mặc định `[6, 8]`) |
| `grid.margin_percent` | Không dùng trực tiếp — safe box lấy từ `media_dna.json` |
| `typography.headline_font` | `Playfair Display` (đã vendor trong `kit/fonts/`) |
| `typography.headline_size_px` | Cỡ headline theo **px khung chính 1920×1080**; engine chia cho `scale` (96 → 48 px CSS) |
| `typography.body_size_px` | Cỡ caption theo px khung chính (38 → 19 px CSS) |
| `typography.max_accent_area_percent` | Trần 10%; engine đo tổng diện tích hộp accent thật và ghi vào `qa_content.json` |
| `face_avoidance.enabled` | Bật/tắt né mặt |
| `face_avoidance.min_distance_px` | Khoảng cách tối thiểu tới hộp mặt (px khung chính) |
| `face_avoidance.protected_features` | Ghi nhận, engine không tách vùng mắt/miệng riêng (xem GIỚI HẠN) |
| `timeline[].content_type` | `claim` / `data` / `quote` / `definition` / `transition` → nhãn kicker; `data` thì số trong headline tô màu accent |
| `timeline[].text` | Được tách tất định thành **headline** (serif lớn) + **caption** (serif nhỏ) — xem mục 4 |
| `timeline[].layout.column_start/column_end` | Cột đặt khối chữ. `12 − (end − start + 1)` phải nằm trong `[4, 6]` |
| `timeline[].layout.vertical_position` | `top` / `middle` / `bottom` → canh dọc khối chữ |
| `timeline[].animation.type` | `fade` (8–12 frame) hoặc `slide` (12–24 px). Cấm bounce/shake |
| `timeline[].broll_prompt` | **Văn bản mô tả**, không phải ảnh — dùng làm nhãn placeholder |
| `timeline[].sfx` | `none` / `soft_riser` / `single_impact` — tổng hợp bằng ffmpeg |

### Cách tách headline / caption (tất định, không đoán)

1. Có dòng mới → dòng đầu là headline, phần còn lại là caption.
2. Có ranh giới mệnh đề (`. ! ? … ,` hoặc ` — `) sau ≥ 12 ký tự → phần trước là headline.
3. Quá 6 từ → cắt giữa theo từ.
4. Còn lại → toàn bộ là headline, caption rỗng.

---

## 4. BA QUY TẮC HÌNH ẢNH CỦA SKILL NÀY

| Quy tắc | Nguồn | Cách engine thực hiện |
|:--|:--|:--|
| **Caption serif** | Yêu cầu track | Cả headline lẫn caption dùng `Playfair Display` đã vendor (`kit/fonts/`). Font hệ thống chỉ là fallback — không dùng lúc render |
| **Tìm & né khuôn mặt** | `03_SKILL…:18-22` | Engine **không** tự dò mặt (máy này không có `cv2`). Engine **tiêu thụ** `face_boxes.json`; nếu thiếu → `status: "no-data"`, **không** kết luận PASS. Thứ tự né: (1) đổi cột sang vùng trống, (2) đổi vị trí dọc, (3) giảm cỡ chữ theo bậc 96→88→80 px khung chính, (4) ẩn caption, (5) cuối cùng mới ghi `overflow-fallback` |
| **Ẩn sub khi màn nhiều chữ** | **Quy tắc MỚI do track này định nghĩa** — KHÔNG có trong `03_SKILL_tvt-magazine-type.md` hay tài liệu pack nào | `text_area_ratio` = tổng diện tích hộp chữ của cảnh ÷ diện tích safe box, đo thật trong chromium. `ratio ≥ 0.5` → caption của cảnh đó bị đặt `data-caption="off"`. Tỷ lệ được tính trên **bộ chữ đầy đủ** (trước khi áp dụng quy tắc ẩn) |

---

## 5. THƯ VIỆN TOKEN

| Token CSS | Nguồn | Giá trị |
|:--|:--|:--|
| `--safe-top/bottom/left/right` | `media_dna.json` → `frame_16x9.safe_px` (54/108/96/96 px khung chính) | 27/54/48/48 px CSS |
| `--paper` | `03_SKILL…:53` | `#F9F9F6` (nền ngà) |
| `--ink` | `03_SKILL…:54` | `#111111` |
| `--ink-soft` | dùng cho chữ phụ | `#6B6B66` (5,4:1 trên nền ngà) |
| `--accent` | `brand.accent_color` (ghi đè qua `tokens.css`) | `#B08D57` trong ví dụ |
| `--accent-text` | tính tự động: accent nếu ≥ 4,5:1, nếu không thì `--ink` | |
| `--serif` | `kit/fonts/PlayfairDisplay-*.woff2` | Playfair Display 400–700 |
| `--sans` | `retention_video_skills_pack/assets/fonts/BeVietnamPro-Black.ttf` | Be Vietnam Pro |
| `--ease` | `03_SKILL…:35-38` | chỉ fade/slide, không bounce |

---

## 6. GIỚI HẠN ĐÃ BIẾT

| # | Giới hạn | Bằng chứng / hệ quả |
|:-:|:--|:--|
| L1 | **Không tự phát hiện khuôn mặt.** Máy đo không có `cv2` nên `retention_video_skills_pack/tools/crop_plan.py:57` dừng ngay. Engine chỉ đọc `face_boxes.json` | Khi thiếu file này, `qa_content.json` ghi `face_avoidance.status = "no-data"` và `qa_content.py` in cảnh báo, **không** coi là PASS |
| L2 | **Chưa tách vùng mắt/miệng.** `face_avoidance.protected_features` được ghi nhận nhưng engine chỉ né **hộp mặt** chứ không né riêng mắt/miệng | Chữ không được đặt lên mặt; chưa chứng minh được không đè lên mắt/miệng |
| L3 | **Mốc thời gian là ước lượng khi không có `--alignment`.** Dùng `promo_core.draft_alignment` (4,6 âm tiết/giây) | `qa_content.json` ghi `timing_source`. **Không** có ground-truth để chứng minh lệch ≤ 80 ms (`docs/OVERNIGHT_BRIEF.md:60`) |
| L4 | **B-roll là placeholder hoặc ảnh của bạn.** Không có ảnh AI, không có ảnh stock | Engine không tạo ảnh. Chất lượng hình ảnh phụ thuộc tài liệu bạn đặt vào `assets/broll/` |
| L5 | **SFX là âm tổng hợp bằng ffmpeg**, không phải thư viện âm thanh | `soft_riser` = chirp 200→1200 Hz/600 ms; `single_impact` = sine 90 Hz + 45 Hz/250 ms. Ghi nhãn rõ trong báo cáo |
| L6 | **Demo không có voice** → track âm thanh là im lặng + SFX. Đo được `-30,7 LUFS` (không đạt chuẩn `-14 LUFS`) | Chuẩn `-14 LUFS ±0,5` chỉ áp dụng khi có `--voice`; `*.qc.json` ghi `voice_present: false` |
| L7 | **Chỉ xuất 16:9.** Không tự sinh bản 9:16 | `render_master.py` của pack cứng 1080×1920, nên skill này dùng riêng `templates/hyperframes/render.py` |
| L8 | **Quy tắc "ẩn sub khi màn nhiều chữ" là quy tắc mới** do track này định nghĩa, không phải yêu cầu có sẵn của pack | Ngưỡng 0,5 có thể chỉnh bằng `--caption-hide-ratio` |
| L9 | **Chưa thử Windows / Linux.** Môi trường đo: macOS + Chromium 1248 + ffmpeg 9.0.2 + Python 3.14.7 | `docs/OVERNIGHT_BRIEF.md:61` cũng ghi chưa có test Windows/Linux |
| L10 | **Thời gian render 3,2 phút cho 29,6 s @ 30 fps** trên máy đo (đo lại 22/10/2026, `time` khi chạy `render.py`) | Trang thật nặng hơn trang tối giản (đo trước đó: 49,9 ms/frame). Số này KHÔNG áp dụng cho máy khác |
| L11 | **Chuẩn âm thanh chỉ kiểm được trên bản CÓ `--voice`.** Bản demo không có voice nên không đạt `-14 LUFS` và cũng **không** được kết luận là đạt | `render.py` đo lại bằng `rvlib.measure_loudness()` rồi mới kết luận; `*.qc.json` ghi `voice_present` + `loudness_check` |
| L12 | **Hiệu chỉnh âm thanh dùng gain đơn giản (không nén động)** nên giữ nguyên tỉ lệ voice/SFX, nhưng nếu voice quá ngắn so với video thì phần im lặng cuối vẫn được tính vào thời lượng | Đo thật: voice 10 s + video 31,8 s → vẫn ra `-14,0 LUFS` nhờ cổng EBU R128 loại khoảng lặng, nhưng người xem sẽ nghe phần lặng đó |

---

## 7. CẤU TRÚC SKILL

```
skills/tvt-magazine-type/
├── SKILL.md                          # tài liệu này
├── scripts/
│   ├── build.py                      # JSON -> project (HTML/CSS/JS + render_config.json)
│   ├── render.py                     # wrapper của templates/hyperframes/render.py (out trong skills/tvt-magazine-type/out/)
│   ├── qa_content.py                 # schema + luật skill 03 -> JSON, exit 2 khi FAIL
│   ├── make_face_boxes.py            # crop_plan.json -> face_boxes.json
│   ├── make_demo.sh                  # tái tạo video demo từ file sạch
│   └── selftest.sh                   # build -> qa -> render -> ffprobe, exit 0/2
├── kit/
│   ├── style.css                     # token + bố cục editorial
│   ├── engine.js                     # bản sao promo_engine.js + phần mở rộng data-draw
│   └── fonts/                        # Playfair Display (OFL) + OFL.txt
├── assets/
│   ├── README.md                     # hướng dẫn đặt ảnh thật
│   └── broll/                        # đặt scene_01.jpg, scene_02.jpg, ...
├── examples/
│   ├── tvt-magazine-type.json        # input mẫu đúng schema
│   ├── face_boxes.json               # mẫu hộp khuôn mặt (để thấy né mặt chạy thật)
│   └── out/
│       ├── editorial_premium_demo.mp4    # video demo 29,6 s đã render
│       └── editorial_premium_demo.qc.json
└── out/                              # sinh ra khi chạy (không commit)
```

Lõi dùng chung (KHÔNG sửa): `templates/hyperframes/{promo_core.py, promo_engine.js, render.py}`,
`retention_video_skills_pack/tools/{rvlib.py, engine_core.py, qc_engine.py}`.

---

## 8. ĐỔI ẢNH MINH HỌA

Xem `assets/README.md`. Tóm tắt: đặt `assets/broll/scene_NN.jpg` (1920×1080 khuyến nghị),
`NN` = số thứ tự cảnh trong `timeline[]`. Thiếu ảnh → engine dựng khung placeholder có nhãn
`B-ROLL PLACEHOLDER`. Không có ảnh AI, không có ảnh stock.

---

## 9. VÍ DỤ

```bash
# video demo nằm trong repo
ffprobe skills/tvt-magazine-type/examples/out/editorial_premium_demo.mp4
# -> 1920x1080, h264, yuv420p, 30 fps, 29.6 s, có 1 stream aac

# tái tạo y hệt từ file sạch
bash skills/tvt-magazine-type/scripts/make_demo.sh
```

Trong ví dụ mẫu:
- cảnh 3 (`quote`) có khuôn mặt trong `face_boxes.json` → engine **tự dời khối chữ** từ cột 1–6
  sang cột 7–12 (báo cáo `layout[2].rule = "fit+face"`).
- cảnh 5 (`claim`, văn bản dày) có `text_area_ratio = 0,504 ≥ 0,5` → **caption bị ẩn**
  (`scenes_with_caption_hidden = 1`).
- cảnh 2 (`data`) tô màu accent cho số `64%`.

## Tham Số Đầu Vào Của Kỹ Năng
- **article_title** (Tiêu đề bài viết phong cách tạp chí): `{{article_title}}`
- **key_quotes** (Trích dẫn ấn tượng và số liệu chuyên gia): `{{key_quotes}}`

