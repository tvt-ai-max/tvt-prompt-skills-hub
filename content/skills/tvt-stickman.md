---
id: tvt-stickman
title: "Hand-Drawn Whiteboard Stickman Storyteller Animation"
description: "Hand-Drawn Whiteboard Stickman Storyteller Animation — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Stickman", "Whiteboard Animation", "Storytelling", "5 Expressions", "Pure Code Animation"]
inputs:
  - name: story_beats_json
    type: textarea
    description: "Dữ liệu kịch bản 5 hồi hook -> setup -> conflict -> escalation -> payoff"
    required: true
audit_gates: ["Schema Content QA Check", "Geometry Safe Margin Check", "Zero Blank Frame Gate"]
created_at: "2026-11-03"
---
# SKILL: tvt-stickman

> Skill 05 của bộ retention video. Đặc tả yêu cầu: `retention_video_skills_pack/05_SKILL_tvt-stickman.md`.
> Lõi dùng chung: `templates/hyperframes/` (`promo_engine.js` · `render.py`) + `retention_video_skills_pack/tools/engine_core.py`.
> Trạng thái: engine chạy thật, đã render demo 31,8 s trong repo (`examples/out/stickman_story_demo.mp4`).

---

## 1. DÙNG KHI NÀO

| | |
|:--|:--|
| **Dùng cho** | Video kể chuyện faceless (kênh YouTube/TikTok), case study kinh doanh, triết học ứng dụng — cần phong cách bảng trắng vẽ tay |
| **Tỉ lệ** | `16x9` — canvas CSS 960×540 @ scale 2 = khung chính **1920×1080** |
| **Thời lượng** | 5 beat × 2–4 scene × 2–5 s = 20–60 s |
| **Không dùng khi** | Cần dữ liệu/số liệu (dùng `tvt-magazine-type`); cần 9:16 dọc (dùng `tvt-voice-motion`); cần diễn giải thật lên khung |

---

## 2. PIPELINE

```bash
# 1. Soạn JSON theo schema — retention_video_skills_pack/schemas/tvt-stickman_schema.json
#    Mẫu chạy được: skills/tvt-stickman/examples/tvt-stickman.json

# 2. Dựng project (HTML/CSS/JS + render_config.json) — build kiểm schema trước
python3 skills/tvt-stickman/scripts/build.py \
        skills/tvt-stickman/examples/tvt-stickman.json

# 3. Kiểm nội dung (schema + luật riêng skill 05) — exit 0 PASS, 2 FAIL
#    --report là BẮT BUỘC: không có nó thì các quy tắc phụ thuộc kết quả dựng
#    (số <svg>, camera thuần theo --t, beat được dùng accent) sẽ KHÔNG được kiểm
python3 skills/tvt-stickman/scripts/qa_content.py \
        skills/tvt-stickman/examples/tvt-stickman.json \
        --report skills/tvt-stickman/out/tvt-stickman/qa_content.json

# 4. QA hình học: safe margin + tràn chữ + khung hình trống
python3 skills/tvt-stickman/scripts/render.py skills/tvt-stickman/out/tvt-stickman --qa

# 5. Render MP4
python3 skills/tvt-stickman/scripts/render.py skills/tvt-stickman/out/tvt-stickman

# 6. Tự kiểm từ file sạch
bash skills/tvt-stickman/scripts/selftest.sh

# 7. Tái tạo lại video demo trong repo
bash skills/tvt-stickman/scripts/make_demo.sh

# 8. Test lõi dùng chung (chuẩn âm thanh, schema, SFX, khung trống) — 38 test
python3 retention_video_skills_pack/tools/test_engine_core.py
```

**Không sửa tay `skills/tvt-stickman/out/<project>/`** — sửa JSON rồi build lại.

### Tuỳ chọn

| Tuỳ chọn | Tác dụng |
|:--|:--|
| `--voice <file>` | Ghép giọng đọc vào MP4. File được **chuẩn hoá tự động** về chuẩn pack (−14 LUFS ±0,5 · TP ≤ −1 dBTP) trước khi trộn; bản xuất cuối được kiểm lại và **FAIL (exit 2)** nếu lệch chuẩn |
| `--fps` (mặc định 30) | Tần số khung hình |
| `--scale` (mặc định 2) | Hệ số phóng khung 1920×1080 (canvas CSS = 960×540) |
| `--tail` (mặc định 0.8) | Giây đệm cuối video |

---

## 3. SCHEMA — trường JSON -> hiệu ứng hình

| Trường | Hiệu ứng |
|:--|:--|
| `drama_structure` | Bắt buộc đúng `["hook","setup","conflict","escalation","payoff"]` |
| `visual_system.style` | `pencil_sketch_stickman` — nét chì trên bảng trắng |
| `visual_system.background` | `whiteboard` → nền trắng + lưới mờ vẽ bằng CSS (không phải ảnh) |
| `visual_system.ink_color` | Mực, mặc định `#000000` |
| `visual_system.accent_color` | Màu nhấn, mặc định `#FF3B30` — **chỉ** ở 3 beat căng thẳng |
| `visual_system.no_realistic_faces` | Bắt buộc `true`. Engine **từ chối** `false` |
| `scenes[].scene_id` | Số nguyên — quyết định tên file ảnh `assets/scene_<scene_id>.png` |
| `scenes[].start` / `end` | Mốc thời gian scene (bắt buộc 2–5 s) |
| `scenes[].beat` | `hook`/`setup`/`conflict`/`escalation`/`payoff` |
| `scenes[].narration` | Lời kể — không render lên hình (chỉ dùng để đối chiếu) |
| `scenes[].action` | Hành động của nhân vật — dùng làm `aria-label` cho SVG |
| `scenes[].camera` | `static` / `pan` / `zoom_in` / `zoom_out` → transform của `.camera-rig` |
| `scenes[].emotion` | `curious` / `tense` / `shocked` / `relieved` / `determined` → bộ biểu cảm que |
| `scenes[].visual_prompt` | Mô tả văn bản — in ra làm "ghi chú phác thảo", **không** render thành ảnh |
| `scenes[].caption[]` | `{text, start, end}` — bật/tắt từng dòng theo thời gian tuyệt đối |
| `scenes[].sfx[]` | `{name, time, gain_db}` — `pencil_scratch`/`whoosh`/`impact`/`riser` |
| `scenes[].retention_role` | Phải khớp `beat` |

### Năm hồi kịch tính

| Hồi | Nội dung | Yêu cầu |
|:--|:--|:--|
| `hook` | Sự kiện gây sốc ngay 3 giây đầu | ≥ 2 scene |
| `setup` | Giới thiệu nhân vật chính, bối cảnh | ≥ 2 scene |
| `conflict` | Chướng ngại bất ngờ / sai lầm chết người | ≥ 2 scene |
| `escalation` | Hậu quả dây chuyền, cú twist | ≥ 2 scene |
| `payoff` | Lời giải, sự thức tỉnh, vòng lặp đóng | ≥ 2 scene |

Tổng ≥ 10 scene (tiêu chí `05_SKILL…:28`).

---

## 4. BA CƠ CHẾ ĐỘNG

| Cơ chế | Cách làm | Tính tất định |
|:--|:--|:--|
| **line-draw** | `stroke-dashoffset = (1 − --p) × 1400` trên mọi nét của nhân vật | `--p` là hàm thuần của `t` (lõi `promo_engine.js`) |
| **Camera pan / zoom** | `.camera-rig` nhận `transform` tính trong `kit/engine.js` từ `u = (t − start) / (end − start)` | Hàm thuần của `t`: seek 2 lần cùng `t` → **cùng** giá trị `transform`. Build **đo thật** trên 8 scene và ghi vào `qa_content.json` → `camera_pure` |
| **speed-lines** | Nhóm nét ngang, `opacity = --p × 0.85`, chỉ ở emotion `tense` / `shocked` | `--p` là hàm thuần của `t` |

### Quy tắc accent (đã kiểm chứng bằng pixel)

Accent đỏ chỉ xuất hiện ở beat `conflict` / `escalation` / `payoff`
(`05_SKILL_tvt-stickman.md:36-37`). Engine **không** vẽ dấu nhấn accent ở `hook`/`setup`.
Đo thật trên 20 keyframe của demo: `red_px = 0` ở 8 keyframe đầu (hook + setup),
`red_px ≈ 1800–2500` ở 12 keyframe sau (conflict + escalation + payoff).

---

## 5. THƯ VIỆN TOKEN

| Token CSS | Nguồn | Giá trị |
|:--|:--|:--|
| `--safe-top/bottom/left/right` | `media_dna.json` → `frame_16x9.safe_px` (54/108/96/96 px khung chính) | 27/54/48/48 px CSS |
| `--board` | `05_SKILL…:31` | `#FFFFFF` + lưới mờ 32 px vẽ bằng CSS |
| `--ink` | `visual_system.ink_color` | `#000000` |
| `--accent` | `visual_system.accent_color` | `#FF3B30` |
| `--sans` | `retention_video_skills_pack/assets/fonts/BeVietnamPro-Black.ttf` | Be Vietnam Pro |

---

## 6. GIỚI HẠN ĐÃ BIẾT

| # | Giới hạn | Bằng chứng / hệ quả |
|:-:|:--|:--|
| L1 | **Nhân vật chỉ có 5 biểu cảm que**, không có nhân vật phụ, không có đạo cụ vẽ tay | `kit/vectors.py` — thêm biểu cảm mới phải sửa file này |
| L2 | **Không vẽ mặt người thật** (đúng yêu cầu `no_realistic_faces`) | Ảnh minh họa bạn đặt được ghim như tấm ảnh, không thay nhân vật |
| L3 | **Mốc thời gian là `start`/`end` trong schema**, không tự căn theo voice | Muốn căn theo voice thì cần `alignment.json` (chưa nối trong engine này) |
| L4 | **Caption hiện/ẩn theo mốc tuyệt đối**, không có nhóm từ karaoke như skill 04 | `05_SKILL…:38` chỉ yêu cầu `caption[]` có `start`/`end` |
| L5 | **SFX là âm tổng hợp bằng ffmpeg** (xem `assets/sfx/README.md`) | Không phải thư viện âm thanh |
| L6 | **Demo không có voice** → track âm thanh là im lặng + SFX, đo được `-29,5 LUFS` | Chuẩn `-14 LUFS ±0,5` chỉ áp dụng khi có `--voice`; `*.qc.json` ghi `voice_present: false` |
| L7 | **Chỉ xuất 16:9.** Bản dọc cần bố cục riêng | `render_master.py` của pack cứng 1080×1920 |
| L8 | **Chưa thử Windows / Linux.** Môi trường đo: macOS + Chromium 1248 + ffmpeg 9.0.2 + Python 3.14.7 | `docs/OVERNIGHT_BRIEF.md:61` |
| L9 | **Render 1,1 phút (66 giây) cho 31,8 s @ 30 fps** trên máy đo (đo lại 22/10/2026) | Trang thật nặng hơn trang tối giản (49,9 ms/frame). Số này KHÔNG áp dụng cho máy khác |
| L10 | **Chuẩn âm thanh chỉ kiểm được trên bản CÓ `--voice`.** Bản demo không có voice nên không đạt `-14 LUFS` và cũng **không** được kết luận là đạt | `render.py` đo lại bằng `rvlib.measure_loudness()` rồi mới kết luận; `*.qc.json` ghi `voice_present` + `loudness_check` |
| L11 | **Hiệu chỉnh âm thanh dùng gain đơn giản (không nén động)** nên giữ nguyên tỉ lệ voice/SFX; voice quá ngắn so với video thì phần lặng cuối vẫn còn trong tệp | Đo thật: voice 10 s + video 31,8 s → `-14,0 LUFS` nhờ cổng EBU R128 loại khoảng lặng, nhưng người xem nghe rõ phần lặng |

---

## 7. CẤU TRÚC SKILL

```
skills/tvt-stickman/
├── SKILL.md                          # tài liệu này
├── scripts/
│   ├── build.py                      # JSON -> project
│   ├── render.py                     # wrapper của templates/hyperframes/render.py
│   ├── qa_content.py                 # schema + luật skill 05 -> JSON, exit 2 khi FAIL
│   ├── make_demo.sh                  # tái tạo video demo từ file sạch
│   └── selftest.sh                   # build -> qa -> render -> ffprobe, exit 0/2
├── kit/
│   ├── style.css                     # token + bố cục bảng trắng
│   ├── engine.js                     # bản sao promo_engine.js + camera + caption theo t
│   └── vectors.py                    # nhân vật que + speed-lines vẽ bằng code
├── assets/
│   ├── README.md                     # hướng dẫn đặt ảnh thật + bảng biểu cảm
│   └── sfx/README.md                 # công thức SFX tổng hợp
├── examples/
│   ├── tvt-stickman.json           # input mẫu đúng schema (10 scene, 5 hồi)
│   └── out/
│       ├── stickman_story_demo.mp4   # video demo 31,8 s đã render
│       └── stickman_story_demo.qc.json
└── out/                              # sinh ra khi chạy (không commit)
```

---

## 8. ĐỔI ẢNH MINH HỌA

Xem `assets/README.md`. Tóm tắt: đặt `assets/scene_<scene_id>.png` (1920×1080 khuyến nghị).
Ảnh được ghim như tấm ảnh nhỏ trên bảng; nhân vật que vẽ bằng code vẫn là chủ thể chính.

---

## 9. VÍ DỤ

```bash
ffprobe skills/tvt-stickman/examples/out/stickman_story_demo.mp4
# -> 1920x1080, h264, yuv420p, 30 fps, 31.8 s, có 1 stream aac

bash skills/tvt-stickman/scripts/make_demo.sh   # tái tạo y hệt
```

Trong ví dụ mẫu: 10 scene đủ 5 hồi (2 scene mỗi hồi), camera đổi qua `zoom_in` → `static` →
`pan` → `zoom_in` → `zoom_out`, và accent đỏ xuất hiện đúng từ scene 5 (`conflict`) trở đi.

## Tham Số Đầu Vào Của Kỹ Năng
- **story_beats_json** (Dữ liệu kịch bản 5 hồi hook -> setup -> conflict -> escalation -> payoff): `{{story_beats_json}}`

