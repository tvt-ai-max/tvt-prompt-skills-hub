---
id: toilatung-talkinghead
title: "Founder Talking Head & DSH Stage Review Pipeline (16:9)"
description: "Founder Talking Head & DSH Stage Review Pipeline (16:9) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Talking Head", "Founder Video", "16:9", "Quiet Authority", "DSH Panel", "Loom Bubble"]
inputs:
  - name: talkinghead_topic
    type: string
    description: "Chủ đề bài chia sẻ kiến trúc hoặc tư duy AI"
    required: true
  - name: app_demo_screenshots
    type: textarea
    description: "Danh sách ảnh chụp màn hình ứng dụng minh họa"
    required: true
audit_gates: ["Face Geometry Center Gate", "Liquid Glass Blur Quality Gate", "Two-Tier QA Check"]
created_at: "2026-11-03"
---
# SKILL: toilatung-talkinghead

> Đóng gói từ video "XÂY AI AGENT CHO SMEs: BẮT ĐẦU TỪ CÁCH GIAO VIỆC" (29/09/2026) theo SOP-04.
> Tái dùng lõi chung `templates/hyperframes/` (align.py · promo_core.py · promo_engine.js · render.py).

---

## 1. DÙNG KHI NÀO

| | |
|:--|:--|
| **Dùng cho** | Video cá nhân/founder nói trực diện, kèm minh họa "màn hình app" (DSH, dashboard, tool), kết bằng domain kênh |
| **Thời lượng** | Theo voice (khung 5–7 câu, 35–45s) |
| **Tỉ lệ** | `16x9` 1920×1080 (khung 16:9) — 9:16 chưa dựng, cần thêm LAYOUT nếu dùng |
| **Không dùng khi** | Video quảng cáo dịch vụ TVT (dùng `tvt-service-promo`, SOP-06) hoặc promo 4 cảnh xanh royal (dùng `corporate-geometric-promo`) |

## 2. PIPELINE 4 LỆNH

```bash
# 1. Voice ElevenLabs (VietNam DangTungDuy 2 PVC, model v3, _sp91_s96_sb63_v3)
#    chuẩn hoá -16 LUFS → sources/raw_audio/<tên>_vo.mp3
ffmpeg -i <voice.mp3> -af "loudnorm=I=-16:TP=-1.5:LRA=11" -ar 44100 -ac 1 -b:a 192k sources/raw_audio/<tên>_vo.mp3

# 2. Căn giọng (script phải là ĐÚNG lời đã đọc — voice là chuẩn gốc)
python3 templates/hyperframes/align.py sources/raw_audio/<tên>_vo.mp3 \
        sources/transcripts/<tên>_vo_script.txt sources/transcripts/<tên>_alignment.json

# 3. Viết STORYBOARD/toilatung/<tên>.video.json rồi build (16:9) + QA 2 lớp
python3 skills/toilatung-talkinghead/scripts/build.py STORYBOARD/toilatung/<tên>.video.json
python3 templates/hyperframes/render.py templates/<tên>_16x9 --qa
python3 skills/toilatung-talkinghead/scripts/qa_geometry.py templates/<tên>_16x9

# 4. Render MP4 (tự chạy QA trước; KHÔNG chạy 2 render cùng lúc)
python3 templates/hyperframes/render.py templates/<tên>_16x9
```

**Không sửa tay `templates/<project>_16x9/`** — sửa `video.json` rồi build lại.

## 3. NGÔN NGỮ THIẾT KẾ

| Lớp | Chuẩn |
|:--|:--|
| Sân khấu | Nền tối `#0a0b10` + lưới chấm + vignette; orb indigo/cyan; Safe 10% mọi cạnh |
| Panel DSH | Cửa sổ app **nền sáng** `#fbfcfe` (đúng giao diện web thật — OCR ảnh chụp: YAVG 247), thanh tiêu đề macOS, badge xanh brand |
| Màu chữ | Trên nền tối: trắng/72%/55% + cyan `#22d3ee` (kicker ≥8:1) + indigo sáng `#818cf8`; trong panel: `#101828`/`#5b6472` |
| Xanh DeepSeek | `#4d6bfe` chỉ cho khối lớn (≥3:1); **chữ nhỏ trên nền sáng dùng `#3b5be8`** (≥5.3:1 — #4d6bfe chỉ đạt 4.2–4.3:1, FAIL AA) |
| Font | Plus Jakarta Sans (300–800, dấu tiếng Việt đủ) + IBM Plex Mono (400–600, có tiếng Việt) |
| Tùng trực diện | Ảnh `tung-portrait.png` (958×1277, đúng 3:4 — **tâm khuôn mặt ở 50% ngang / 39% dọc, đỉnh đầu 12.6%**) trong thẻ bo góc 24px, Ken Burns `scale = kb + t·0.0009` thuần theo `--t` |
| Tùng khi xen màn hình | Bubble Loom-style (avatar tròn `tung-avatar.png` 878×878 — mặt 48% căn giữa + FOUNDER + chấm live) bằng Liquid Glass `blur(20px) saturate(180%)` |
| Sync giọng | `.w` highlight theo cụm cue; phần tử xuất hiện theo `data-in="{clock.at(cue)}"` |
| Chuyển cảnh | Wipe tấm tối `#141a3a` + mép cyan 54px + vạch trắng 8px |

## 4. 5 LOẠI CẢNH (schema trong `STORYBOARD/toilatung/ai-agent-sme.video.json`)

| `type` | Nội dung | Trường chính |
|:--|:--|:--|
| `intro` | Thẻ chân dung trái + headline 2 dòng + dòng `.w` sync câu "bắt đầu từ…" | `headline` (list dòng), `spoken` (token+cue), `portrait`, `copy` |
| `spec` | Cửa sổ `agent_spec.md` + 3 dòng quy tắc hiện theo cue + chip PASS | `window`, `rules[]`, `pass_chip`, `bubble`, `shot` (ảnh chụp DSH thật) |
| `plan` | Bảng kế hoạch: VIỆC GẤP→CHẠY NGAY / VIỆC LINH HOẠT→THẤP ĐIỂM + dải lịch 24h + chip DEADLINE/TÀI NGUYÊN | `rows[]`, `schedule` (off1/off2 %), `foot[]` |
| `usecases` | 3 thẻ việc thật (nội dung/báo cáo/chăm sóc KH) + thanh "người duyệt" | `cards[]`, `approve`, `grid`, `approve_box` |
| `outro` | Chân dung phải + 3 dòng mục tiêu theo cue + domain gradient + micro | `rows[]`, `domain` (`.w` sync), `micro`, `portrait` |

Ranh giới cảnh tự tính từ alignment (0.4s trước câu đầu cảnh, ≥0.2s sau lời cuối cảnh trước) — như mọi skill promo.

## 5. QA 2 LỚP (bắt buộc trước render)

1. **`render.py --qa`** (chuẩn SOP-05): safe margin 10% + `.w` tràn thẻ, 10 keyframe.
2. **`qa_geometry.py`** (skill này): (a) chữ tràn khối lá (scrollWidth/Height), (b) va chạm cặp khối khai báo trong `PAIRS` (bỏ qua so-đối-chính-nó), (c) ảnh thật tải đủ + font loaded, (d) đo YAVG vùng ảnh chụp — phát hiện khối trống/thiếu ảnh.

> Phiên này vision model lỗi cấu hình ("Thinking level MINIMAL") nên **không soát mắt được** — 2 lớp script QA + đối chiếu hình học từ OPERATIONS log là bằng chứng thay thế; founder vẫn cần nghe bản cuối (SOP-06 §7.1).

## 6. BÀI HỌC ĐÃ CÀI (đừng hồi quy)

| Triệu chứng | Đã xử lý |
|:--|:--|
| Dữ liệu không đủ để soát mắt | `qa_geometry.py` đo overflow/overlap/luminance trên render thật |
| "SMEs" trong kịch bản gốc | Founder đọc thành "doanh nghiệp nhỏ" — **voice là chuẩn gốc**, script đối chiếu theo giọng đọc thật (116/122 từ = 95.1%) |
| "deadline" được đọc "thời hạn" | Hiển thị chip "DEADLINE" nhưng cue theo từ "thời hạn" |
| Badge/số thứ tự xanh DeepSeek 4.3:1 | Tách token `--ds-blue-ink: #3b5be8` cho chữ nhỏ |
| Chân dung bị lệch (crop tay) | `scripts/portrait_crop.py` neo hộp khuôn mặt **macOS Vision** → cắt 3:4 + 1:1 căn giữa, tự QC lệch tâm ≤1.2% và in số đo; thay `tung-bust.png` (536×560, y=40 — mặt ở 29% chiều cao) bằng `tung-portrait.png` (mặt 39%) |
| Ảnh chụp DSH thật 596×335 | Chỉ đặt trong khung nhỏ `object-position: top` (OCR xác nhận nội dung: chỉ wordmark) — không phóng to làm hero |

## 7. CẤU TRÚC SKILL

```
skills/toilatung-talkinghead/
├── SKILL.md                        # tài liệu này
├── scripts/build.py                # video.json → templates/<project>_16x9 (+ captions.vi.srt)
├── scripts/qa_geometry.py          # QA hình học lớp 2
├── scripts/portrait_crop.py        # ảnh gốc → thẻ 3:4 + avatar 1:1 căn giữa theo khuôn mặt (Vision)
└── kit/style.css                   # tokens tối + panel DSH sáng + Liquid Glass
```

Lõi dùng chung: `templates/hyperframes/` — `align.py`, `promo_core.py`, `promo_engine.js`, `render.py` (không sửa khi dùng skill này).

Công cụ dùng chung: `tools/face_box.swift` (phát hiện khuôn mặt bằng macOS Vision, tự biên dịch vào `.tmp_face/`).

### Đổi ảnh chân dung (quy trình)

```bash
python3 skills/toilatung-talkinghead/scripts/portrait_crop.py <ảnh gốc> \
    --card sources/branding/tung-portrait.png \
    --avatar sources/branding/avatars/tung-avatar.png     # in số đo + QC PASS/FAIL
python3 skills/toilatung-talkinghead/scripts/build.py STORYBOARD/toilatung/ai-agent-sme.video.json
python3 skills/toilatung-talkinghead/scripts/qa_geometry.py templates/ai_agent_sme_16x9
python3 templates/hyperframes/render.py templates/ai_agent_sme_16x9
```

Không cắt ảnh bằng tay: mọi khung cắt phải neo vào hộp khuôn mặt để tâm mặt nằm đúng giữa
(ngang 50%, dọc 39% với thẻ — đỉnh đầu ~12% để có khoảng thở).

## Tham Số Đầu Vào Của Kỹ Năng
- **talkinghead_topic** (Chủ đề bài chia sẻ kiến trúc hoặc tư duy AI): `{{talkinghead_topic}}`
- **app_demo_screenshots** (Danh sách ảnh chụp màn hình ứng dụng minh họa): `{{app_demo_screenshots}}`

