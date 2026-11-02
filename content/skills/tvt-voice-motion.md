---
id: tvt-voice-motion
title: "Faceless 2D Motion Graphics from Voiceover (9:16)"
description: "Faceless 2D Motion Graphics from Voiceover (9:16) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Faceless Video", "2D Motion Graphics", "Voiceover Timing", "Retention Hooks", "Viral Shorts"]
inputs:
  - name: voiceover_audio_path
    type: string
    description: "File ghi âm giọng đọc chuẩn hóa"
    required: true
  - name: storyboard_spec
    type: textarea
    description: "Quy cách phân cảnh motion đồ họa từng câu"
    required: true
audit_gates: ["Safe Zone 9:16 Bounds Check", "Audio-Visual Sync Accuracy Gate", "Zero Hallucination Numbers"]
created_at: "2026-11-03"
---
# SKILL: tvt-voice-motion

> Skill 04 của bộ retention video. Đặc tả yêu cầu: `retention_video_skills_pack/04_SKILL_tvt-voice-motion.md`.
> Lõi dùng chung: `templates/hyperframes/` (`promo_core.py` · `promo_engine.js` · `render.py`) + `retention_video_skills_pack/tools/engine_core.py`.
> Trạng thái: engine chạy thật, đã render demo 26,8 s trong repo (`examples/out/voice_to_motion_demo.mp4`).

---

## 1. DÙNG KHI NÀO

| | |
|:--|:--|
| **Dùng cho** | Video podcast / voiceover / bài giảng / giải thích tài chính cần **đồ họa 2D dọc 9:16** đi kèm lời đọc |
| **Tỉ lệ** | `9x16` — canvas CSS 540×960 @ scale 2 = khung chính **1080×1920** |
| **Thời lượng** | 5 beat × 3–8 s = 15–40 s |
| **Không dùng khi** | Cần người thật trên khung (dùng `tvt-magazine-type` cho 16:9); cần phong cách vẽ tay kể chuyện (dùng `tvt-stickman`); cần b-roll quay thật — skill này chỉ nhận ảnh bạn tự đặt |

---

## 2. PIPELINE

```bash
# 1. Soạn JSON theo schema — retention_video_skills_pack/schemas/tvt-voice-motion_schema.json
#    Mẫu chạy được: skills/tvt-voice-motion/examples/tvt-voice-motion.json

# 2. Dựng project (HTML/CSS/JS + render_config.json) — build kiểm schema trước
python3 skills/tvt-voice-motion/scripts/build.py \
        skills/tvt-voice-motion/examples/tvt-voice-motion.json

# 3. Kiểm nội dung (schema + luật riêng skill 04) — exit 0 PASS, 2 FAIL
#    --report là BẮT BUỘC: không có nó thì các quy tắc phụ thuộc kết quả dựng
#    (số visual-hero mỗi beat, nguồn ảnh minh họa) sẽ KHÔNG được kiểm
python3 skills/tvt-voice-motion/scripts/qa_content.py \
        skills/tvt-voice-motion/examples/tvt-voice-motion.json \
        --report skills/tvt-voice-motion/out/tvt-voice-motion/qa_content.json

# 4. QA hình học: safe margin + tràn chữ + khung hình trống
python3 skills/tvt-voice-motion/scripts/render.py skills/tvt-voice-motion/out/tvt-voice-motion --qa

# 5. Render MP4
python3 skills/tvt-voice-motion/scripts/render.py skills/tvt-voice-motion/out/tvt-voice-motion

# 6. Tự kiểm từ file sạch
bash skills/tvt-voice-motion/scripts/selftest.sh

# 7. Tái tạo lại video demo trong repo
bash skills/tvt-voice-motion/scripts/make_demo.sh

# 8. Test lõi dùng chung (chuẩn âm thanh, schema, SFX, khung trống) — 38 test
python3 retention_video_skills_pack/tools/test_engine_core.py
```

**Không sửa tay `skills/tvt-voice-motion/out/<project>/`** — sửa JSON rồi build lại.

### Tuỳ chọn

| Tuỳ chọn | Tác dụng |
|:--|:--|
| `--voice <file>` | Ghép giọng đọc vào MP4. File được **chuẩn hoá tự động** về chuẩn pack (−14 LUFS ±0,5 · TP ≤ −1 dBTP) trước khi trộn; bản xuất cuối được kiểm lại và **FAIL (exit 2)** nếu lệch chuẩn |
| `--fps` (mặc định 30) | Tần số khung hình |

---

## 3. SCHEMA — trường JSON -> hiệu ứng hình

| Trường | Hiệu ứng |
|:--|:--|
| `visual_system.style` | `flat_2d` / `line_art` / `isometric` / `duotone` — engine vẽ vector line-art, không dùng ảnh |
| `visual_system.palette` | 3–5 mã hex. `palette[0]` = mực, `palette[1]` = mực phụ, `palette[2]` = **accent** (dùng cho rail, số liệu, nhóm caption đang hiện) |
| `visual_system.stroke_width` | Độ dày nét (`"6px"`, `"thin"`, `"bold"`) — áp cho toàn bộ preset để hệ hình nhất quán |
| `visual_system.no_text_in_image` | Bắt buộc `true`. Engine **không** vẽ chữ nào vào trong ảnh minh họa |
| `storyboard[].beat` | Số thứ tự beat (1..5) — quyết định tên file ảnh `assets/scene_<beat>.png` |
| `storyboard[].start` / `end` | Mốc thời gian beat (bắt buộc 3–8 s) |
| `storyboard[].narration` | Lời đọc — engine bẻ thành **nhóm 1–4 từ** (media_dna `caption.words_per_group`) để làm caption |
| `storyboard[].concept.subject/action/metaphor/emotion` | 4 thành tố bắt buộc; `metaphor` quyết định **preset vector** nào được chọn |
| `storyboard[].concept.data` | Số liệu hoặc `null`. Chỉ dùng khi `animation = number_count` |
| `storyboard[].visual_prompt` | Mô tả văn bản — **không** được render thành ảnh |
| `storyboard[].on_screen_text` | Dòng chữ lớn (≤ 50 ký tự) |
| `storyboard[].animation` | `icon_pop` · `line_draw` · `number_count` · `scene_transition` |
| `storyboard[].sfx[]` | `{name, time, gain_db}` — `pop`/`whoosh`/`tick`, gain −18…−12 dBFS |
| `storyboard[].retention_role` | `hook` → `setup` → `mechanism` → `proof` → `payoff`, đúng thứ tự |

### Bốn animation

| Tên | Cơ chế | Nguồn |
|:--|:--|:--|
| `icon_pop` | Scale 0,84→1 + opacity theo `--p` (easeOutExpo của lõi) | `04_SKILL…:46` |
| `line_draw` | `stroke-dashoffset` theo `--p`, chuẩn hoá `pathLength=600` cho mọi shape nên nét chạy đều | `04_SKILL…:47` |
| `number_count` | `[data-count]` + `[data-count-digits]` của lõi đếm số từ 0 tới giá trị trong `concept.data` | `04_SKILL…:48` |
| `scene_transition` | Wipe tấm ở ranh giới beat (lõi `promo_engine.js`) | `04_SKILL…:49` |

---

## 4. THƯ VIỆN TOKEN

| Token CSS | Nguồn | Giá trị |
|:--|:--|:--|
| `--safe-top/bottom/left/right` | `media_dna.json` → `frame_9x16.safe_px` (120/280/60/120 px khung chính) | 60/140/30/60 px CSS |
| `--stage-bg` / `--stage-panel` | kit | `#0E1116` / `#161B23` |
| `--ink` / `--ink-mute` | kit | `#F2F5F8` (≈ 16:1) / `#9AA6B2` (≈ 7:1) trên nền sân khấu |
| `--accent` | `visual_system.palette[2]` | `#F2C14E` trong ví dụ |
| `--caption-size` / `--ost-size` | build tự chọn theo bậc 21/19/17/16 px để luôn nằm trong safe box | ghi trong `qa_content.json` |

---

## 5. GIỚI HẠN ĐÃ BIẾT

| # | Giới hạn | Bằng chứng / hệ quả |
|:-:|:--|:--|
| L1 | **Visual hero là vector code, không phải ảnh AI.** Không có ảnh stock, không có ảnh AI | Ảnh chỉ tới từ `assets/scene_<beat>.png` do bạn đặt; thiếu thì dùng preset vector có nhãn `ILLUSTRATION: VECTOR PLACEHOLDER` |
| L2 | **Chỉ 10 preset vector.** Không khớp `metaphor` nào thì dùng `abstract` | `kit/vectors.py` — bảng preset nằm trong `assets/README.md` |
| L3 | **Mốc thời gian nhóm caption là ước lượng** theo âm tiết (`promo_core.draft_alignment`, 4,6 âm tiết/giây) | `qa_content.json` ghi `caption_timing`. Không có ground-truth để chứng minh lệch ≤ 80 ms (`docs/OVERNIGHT_BRIEF.md:60`) |
| L4 | **Không tự tạo voice.** `--voice` chỉ ghép file có sẵn (đã tự chuẩn hoá về −14 LUFS) | Không có TTS trong repo |
| L5 | **SFX là âm tổng hợp bằng ffmpeg** (xem `assets/sfx/README.md`) | Không phải thư viện âm thanh |
| L6 | **Demo không có voice** → track âm thanh là im lặng + SFX, đo được `-30,5 LUFS` | Chuẩn `-14 LUFS ±0,5` chỉ áp dụng khi có `--voice`; `*.qc.json` ghi `voice_present: false` |
| L7 | **Không tự sinh bản 16:9.** Chỉ xuất 9:16 | `render_master.py` của pack cứng 1080×1920, nên skill này dùng riêng `templates/hyperframes/render.py` |
| L8 | **`no_text_in_image` chỉ được kiểm ở mức input** (`true` bắt buộc) | Không có OCR để chứng minh ảnh của bạn không chứa chữ |
| L9 | **Chưa thử Windows / Linux.** Môi trường đo: macOS + Chromium 1248 + ffmpeg 9.0.2 + Python 3.14.7 | `docs/OVERNIGHT_BRIEF.md:61` |
| L10 | **Render 0,8 phút (50 giây) cho 26,8 s @ 30 fps** trên máy đo (đo lại 22/10/2026) | Trang thật nặng hơn trang tối giản (49,9 ms/frame). Số này KHÔNG áp dụng cho máy khác |
| L11 | **Chuẩn âm thanh chỉ kiểm được trên bản CÓ `--voice`.** Bản demo không có voice nên không đạt `-14 LUFS` và cũng **không** được kết luận là đạt | `render.py` đo lại bằng `rvlib.measure_loudness()` rồi mới kết luận; `*.qc.json` ghi `voice_present` + `loudness_check` |
| L12 | **Hiệu chỉnh âm thanh dùng gain đơn giản (không nén động)** nên giữ nguyên tỉ lệ voice/SFX; voice quá ngắn so với video thì phần lặng cuối vẫn còn trong tệp | Đo thật: voice 10 s + video 31,8 s → `-14,0 LUFS` nhờ cổng EBU R128 loại khoảng lặng, nhưng người xem nghe rõ phần lặng |

---

## 6. CẤU TRÚC SKILL

```
skills/tvt-voice-motion/
├── SKILL.md                          # tài liệu này
├── scripts/
│   ├── build.py                      # JSON -> project
│   ├── render.py                     # wrapper của templates/hyperframes/render.py
│   ├── qa_content.py                 # schema + luật skill 04 -> JSON, exit 2 khi FAIL
│   ├── make_demo.sh                  # tái tạo video demo từ file sạch
│   └── selftest.sh                   # build -> qa -> render -> ffprobe, exit 0/2
├── kit/
│   ├── style.css                     # token + bố cục 9:16
│   ├── engine.js                     # bản sao promo_engine.js + mở rộng line_draw + selfCheck
│   └── vectors.py                    # thư viện SVG dựng bằng code (10 preset)
├── assets/
│   ├── README.md                     # hướng dẫn đặt ảnh thật + bảng preset
│   └── sfx/README.md                 # công thức SFX tổng hợp
├── examples/
│   ├── tvt-voice-motion.json          # input mẫu đúng schema
│   └── out/
│       ├── voice_to_motion_demo.mp4  # video demo 26,8 s đã render
│       └── voice_to_motion_demo.qc.json
└── out/                              # sinh ra khi chạy (không commit)
```

---

## 7. ĐỔI ẢNH MINH HỌA

Xem `assets/README.md`. Tóm tắt: đặt `assets/scene_<beat>.png` (1080×1920 khuyến nghị),
`<beat>` = số thứ tự beat trong `storyboard[]`. Thiếu ảnh → engine dùng vector preset khớp
`concept.metaphor` và gắn nhãn placeholder.

---

## 8. VÍ DỤ

```bash
ffprobe skills/tvt-voice-motion/examples/out/voice_to_motion_demo.mp4
# -> 1080x1920, h264, yuv420p, 30 fps, 26.8 s, có 1 stream aac

bash skills/tvt-voice-motion/scripts/make_demo.sh   # tái tạo y hệt
```

Trong ví dụ mẫu, cả 5 beat khớp **đúng 5 ẩn dụ trong từ điển** của `04_SKILL…:24-29`:
`leaking_pipe` → `conveyor` → `balance_cliff` → `growth_peak` → `boxers`
(ghi trong `qa_content.json` → `scenes[].preset`).

## Tham Số Đầu Vào Của Kỹ Năng
- **voiceover_audio_path** (File ghi âm giọng đọc chuẩn hóa): `{{voiceover_audio_path}}`
- **storyboard_spec** (Quy cách phân cảnh motion đồ họa từng câu): `{{storyboard_spec}}`

