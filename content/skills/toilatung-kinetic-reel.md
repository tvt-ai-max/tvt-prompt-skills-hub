---
id: toilatung-kinetic-reel
title: "Kinetic Mascot Reel & Audio Alignment Engine"
description: "Kinetic Mascot Reel & Audio Alignment Engine — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: marketing
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Kinetic Typography", "Reels", "Mascot", "Audio Alignment", "AI Architecture"]
inputs:
  - name: script_content
    type: textarea
    description: "Nội dung kịch bản lời đọc 45 - 60 giây"
    required: true
  - name: audio_voice_path
    type: string
    description: "Đường dẫn file giọng đọc voiceover"
    required: true
audit_gates: ["Kinetic Typography Sync Gate", "Zero Text Overflow Gate", "Safe Zone Verification"]
created_at: "2026-11-03"
---
# toilatung-kinetic-reel

> Đóng gói từ video mẫu **"Claude Opus 5.5 — Tasking Hand"** (24/10/2026, 126s, 2 phần) — `reference/example_opus55/`.
> Engine kiểm chứng bằng cách dựng lại chính video mẫu từ `timeline.json` (xem §7).

**Ý tưởng cốt lõi:** khi người nói mô tả một thao tác, cho thao tác đó xảy ra thật trên màn hình đúng lúc đó. Đọc `reference/playbook.md` trước khi viết storyboard — chứa nguyên tắc dựng và mọi lỗi đã gặp.

## 1. Dùng khi nào

| | |
|---|---|
| **Đầu vào** | Clip dọc tự quay (iPhone .mov, thường HLG HDR, có xoay 90°), tuỳ chọn: GIF mascot, ảnh chụp màn hình làm bằng chứng, clip bổ sung |
| **Đầu ra** | `final.mp4` 1080×1920 30fps H.264/AAC, −14 LUFS · `qc/qc.md` · `timeline.json` sửa lại được |
| **Brand** | `brand/toilatung.json` (mặc định): royal `#0540a8` + mint `#2ef0b0`, ink `#0b1f44`, Be Vietnam Pro — theo `MEMORY/STYLE_GUIDE.md §5`. `brand/opus55.json` chỉ để dựng lại video mẫu hoặc khi brief yêu cầu đúng Montserrat/Roboto + tông indigo |
| **Không dùng** | Video dịch vụ TVT (SOP-06) · 16:9 founder + panel (`toilatung-talkinghead`) · B-roll một khối không có người (`motion-broll`) |

Tận dụng skill anh em thay vì làm lại: `tvt-hook-caption` (5 biến thể hook nếu Tùng muốn chọn), `object-separation` (SAM 2 khi Vision tách người không đủ — vd tay, vật thể).

## 2. Chuẩn bị (một lần mỗi máy)

```bash
python3 skills/toilatung-kinetic-reel/scripts/preflight.py <clip.mov> [clip2.mov]
```
Phải toàn ✅: ffmpeg-full (zscale/tonemap), whisper-cli + model medium, swift, node + Playwright (`motion/node_modules`) + Chrome, font thật (không phải HTML), frame mascot. Mascot khác: `scripts/mascot_frames.py <gif> <dir>` rồi `timeline.mascot.frames_dir`.

## 3. Quy trình 6 bước

`$S=skills/toilatung-kinetic-reel/scripts`, `$W` = thư mục làm việc của phần này (frame nặng — đặt cạnh nguồn, không đặt trong skill).

```bash
# 1. Rough cut: cắt lặng (giữ khoảng nghỉ có chủ đích), HDR→SDR, 30fps, xuất frame
python3 $S/rough.py <clip.mov> $W --protect 19.10-19.80     # giây NGUỒN

# 2. Lời thoại: whisper → sửa chính tả trong $W/phrases.json → phụ đề
python3 $S/words.py transcribe $W --prompt "Claude, Opus 5.5, font"
python3 $S/words.py captions $W
python3 $S/words.py env $W 18.9 21.0          # chốt cú chốt theo năng lượng âm thanh
python3 $S/words.py map $W 19.67 20.62        # giây nguồn → giây bản dựng

# 3. Vùng đặt đồ hoạ của CLIP NÀY
python3 $S/zones.py $W

# 4. Storyboard → $W/timeline.json  (CỔNG DUYỆT: trình bảng storyboard cho Tùng trước khi render cả bài)
python3 $S/build.py $W --preview 5.6,9.5,19.9,30,61.5,79.6   # xem khung chính → $W/preview_sheet.jpg

# 5. Render + âm thanh + QC  (không chạy hai render cùng lúc; báo rõ khi chạy nền)
python3 $S/build.py $W --all                  # → $W/final.mp4, $W/qc/qc.md

# 6. Ghép nhiều phần (nếu có clip bổ sung)
python3 $S/concat.py <out.mp4> $W1 $W2 && python3 $S/qc.py $W1 --video <out.mp4> --no-geom
```

## 4. Viết storyboard → timeline.json

1. Đọc transcript, tìm: thông điệp chính, câu bất ngờ nhất, câu đùa, khoảng nghỉ tạo hồi hộp, chỗ người nói **mô tả thao tác** (ứng viên "tự chứng minh"), chỗ nói nhầm.
2. Trình bảng cho Tùng (Timecode · Lời · Mục đích · Hình · Chữ · Mascot · Âm thanh · Chuyển cảnh), có ghi Level 0–4. Một cảnh L4 duy nhất.
3. Chọn cảnh từ `reference/scenes.md`; mốc lấy bằng `words.py map`, cú chốt chốt lại bằng `words.py env` (whisper lệch).
4. Toạ độ: đồ hoạ lớp trước trong `zones.json → stage_top`; chữ "sau người" đặt sao cho đầu che phần dưới chữ.
5. Mascot: lộ trình `moves` đáp lên **đỉnh vật thể** đúng từ khoá; về `HOME` (góc phải trên ~[930,560]) khi nghỉ.
6. Không bịa số/trích dẫn. Số liệu chỉ từ lời nói hoặc ảnh người dùng đưa (`evidence_card`).

Mẫu đầy đủ: `reference/example_opus55/part1.timeline.json` (10 cảnh, 30 chặng mascot) và `part2.timeline.json` (hậu trường, thẻ bằng chứng).

## 5. Cấu trúc

```
engine/   stage.html · core.js · mascot.js · captions.js · boot.js · render.js
          scenes/ basic.js (hand_word, tag, note_circle, big_text, hero_stat, pill_pair)
                  reveal.js (feed_to_plate, number_behind, bg_wipe_behind)
                  pipeline.js (prompt_to_video) · type.js (font_specimen, text_style_stack) · evidence.js (evidence_card)
scripts/  preflight · rough · words · zones · cutout.swift · build · audio · qc · concat · mascot_frames · kr_common
brand/    toilatung.json (mặc định) · opus55.json (video mẫu)
assets/   fonts (Be Vietnam Pro, Montserrat — OFL; Roboto — Apache 2.0) · mascot/claude_code (36 frame + GIF gốc)
reference/ playbook.md · scenes.md · example_opus55/
```
Thêm cảnh mới: một hàm `SCENES.<type>=(p)=>({update(t){…return {bg,clip,needCut}}, sfx:[…], needs_cutout:[a,b]})` — **chỉ đọc t** (seek được từng frame), thêm dòng vào `scenes.md`.

## 6. QC bắt buộc trước khi báo xong (`qc.py`, đo trên file xuất)

0 khung đen · 0 đứng hình >1s · 0 lặng >1s · −15…−13 LUFS · đỉnh ≤ −1.0 dBFS · không đồ hoạ lớp trước đè vùng mặt (mẫu 0.5s).
Xem thêm `qc/contact.jpg` (1 khung/3s) và nghe lại mix — QC số đo không thay được tai. Ghi kết quả vào `LOG/QA_AUDIT_LOG.md`.
Không đăng/gửi video khi chưa có chỉ thị của Tùng.

## 7. Kiểm chứng engine (24/10/2026)

Dựng lại video mẫu từ `reference/example_opus55/*.timeline.json`, so từng khung với bản dựng tay gốc — kết quả ở `reference/example_opus55/VERIFY.md`.

## 8. Giới hạn đã biết
- Tách người: macOS Vision (chỉ macOS). Mép tóc/ghế có thể dính; tay chuyển động nhanh → dùng `object-separation` (SAM 2).
- "Viết tay" là mặt nạ lộ dần, không vẽ từng nét. Font viết tay SVN là font cài trong máy Tùng, không kèm trong repo.
- Lưới chữ trong `font_specimen` canh theo metric Roboto 230px; font khác lệch vài px.
- Nhạc tổng hợp chỉ là nhạc nền tối giản; muốn nhạc có license thì thay `music_bed.wav` rồi chạy lại `audio.py` phần mix.
- 9:16 duy nhất; nguồn ngang sẽ bị cắt giữa thành dọc trong `rough.py`.

## Tham Số Đầu Vào Của Kỹ Năng
- **script_content** (Nội dung kịch bản lời đọc 45 - 60 giây): `{{script_content}}`
- **audio_voice_path** (Đường dẫn file giọng đọc voiceover): `{{audio_voice_path}}`

