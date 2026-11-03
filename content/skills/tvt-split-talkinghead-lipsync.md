---
id: tvt-split-talkinghead-lipsync
title: "Split-Screen Talking Head & UI Morphing Card (9:16)"
description: "Split-Screen Talking Head & UI Morphing Card (9:16) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Video", "Split Screen", "Talking Head", "Lipsync", "UI Morphing", "High Retention", "Shorts"]
inputs:
  - name: character_image_path
    type: string
    description: "Ảnh chân dung nhân vật nền trắng (1 - 3 cử chỉ)"
    required: true
  - name: voice_script_content
    type: textarea
    description: "Kịch bản đã chuẩn hóa ngân sách nhịp đọc"
    required: true
audit_gates: ["Arch Mask Geometry Gate", "Word-by-word Karaoke Sync", "Sequential Render Deterministic Gate"]
created_at: "2026-11-03"
---
# tvt-split-talkinghead-lipsync

> Đóng gói từ video "Mẹo chống sập web khi chạy ads bằng VPS" (31/10/2026), dự án `sources/meo-chong-sap-web/`; nâng cấp v1.1 sau khi Tùng duyệt v4.
> **Đọc trước:** `reference/lessons.md` (mục E = rút kinh nghiệm sâu) · `reference/voice-and-pace.md` (nhịp/giọng bình tĩnh, nội lực) · `reference/creative-playbook.md` (nâng tầm sáng tạo).

## 1. Dùng khi nào
| | |
|---|---|
| **Đầu vào** | Kịch bản đã Tùng duyệt (`voice_script.txt` có phiên âm + `script_display.txt` chữ hiển thị) · 1–3 ảnh nhân vật nền trắng (mỗi hồi một cử chỉ) · giọng clone Tùng |
| **Đầu ra** | `out/<tên>_9x16.mp4` 1080×1920 · 30 fps · H.264 + AAC · −15…−13 LUFS |
| **Brand** | Nền `#F1F5F9`, mực `#0F172A`, vàng chanh `#D6FA14` (chữ tối trên nền chanh), xanh `#22C55E`, đỏ `#EF4444`. Font Be Vietnam Pro |
| **Không dùng** | Footage quay thật → `tvt-auto-cut` · vlog → `tvt-vlog-talkinghead` · không lộ mặt → `clone-voice-tung` + `tvt-voice-motion` · video dịch vụ TVT → `tvt-service-promo` |

## 2. Preflight — bắt buộc trước khi tốn credit
0. **Viết kịch bản theo ngân sách nhịp** (3,0–3,3 từ/s, câu ≤ 14 từ, ≈ 150–165 từ/60 s) rồi chạy `scripts/pace_check.py <script_display.txt>` — sửa đến khi hết cảnh báo câu dài và ra báo giá.
1. **Style Lock** — hỏi Tùng một lượt theo `reference/lessons.md` mục A.
2. **Hỏi chọn giọng** theo `clone-voice-tung` (bản giọng `193369`, model nháp turbo / cuối `eleven_v4`, báo giá, kịch bản đã duyệt). Kiểm `account_balance` Magnific. **Test 2 câu × 2–3 cấu hình** (giọng bình tĩnh, nội lực — `voice-and-pace.md` mục 4–5, ~15–30 credit/cấu hình) và để Tùng NGHE chọn trước khi đọc cả bài.
3. **Xin xác nhận gửi ra ngoài**: ảnh mặt + file giọng lên Higgsfield; báo giá nhép miệng (~7 credit/giây ở 720p; 8 s ≈ 56 credit).
4. Tra kho asset (`MEMORY/ASSET_LIBRARY.md`, `asset_find.py`) cho SFX/font **trước** khi gen. Nhạc nền truyền cảm hứng kho chưa có → gen Sonilo (~3 credit/60 s), ghi `LOG/OPERATIONS.md`.

## 3. Lệnh (từ gốc repo; `<P>` = `sources/<dự án>`)
```bash
# 0. Chép kit vào dự án + font
mkdir -p <P>/build/fonts && cp skills/tvt-split-talkinghead-lipsync/kit/* <P>/build/
cp skills/toilatung-kinetic-reel/assets/fonts/BeVietnamPro-{Black,Medium}.ttf <P>/build/fonts/
# 1. Giọng (clone-voice-tung) → <P>/audio/voice.mp3. Chốt nhịp Ở NGUỒN (speed turbo / câu ngắn + pause cho v4); atempo 0,88 chỉ là chữa cháy: ffmpeg -i voice.mp3 -af atempo=0.88 voice_x088.mp3
python3 skills/tvt-split-talkinghead-lipsync/scripts/pace_check.py <P>/audio/script_display.txt --audio <P>/audio/voice.mp3
# 2. Căn từng từ (chữ hiển thị, không phải bản phiên âm)
python3 templates/hyperframes/align.py <P>/audio/voice.mp3 <P>/audio/script_display.txt <P>/audio/alignment.json --accept-misses
# 3. Mốc neo (từ thật) + cụm nhấn mạnh (<P>/audio/emph.txt, mỗi dòng một CỤM; mẫu templates/emph.example.txt) → build/data.js. ALIGN=... nếu dùng bản làm chậm
ALIGN=audio/alignment.json python3 <P>/build/make_data.py
# 4. Cắt giọng theo hồi (ở quãng lặng) → lipsync/audio/s1..s4.mp3, sửa lipsync_run.sh (ảnh, cử chỉ, giây), chạy NỀN & TUẦN TỰ
zsh skills/tvt-split-talkinghead-lipsync/scripts/lipsync_run.sh
# 5. Cắt đúng độ dài lời + nối → build/char.mp4 (sửa mảng D và hệ số làm chậm trong script)
zsh skills/tvt-split-talkinghead-lipsync/scripts/assemble_char.sh
# 6. Mix âm (voice + BGM duck + SFX theo mốc) → build/audio_mix.wav
python3 <P>/build/mix.py <P>/audio/voice.mp3 <P>/audio/bgm.m4a
# 7. Xem thử khung mốc, rồi render toàn bộ (tuần tự, kiểm ps trước)
python3 <P>/build/render.py --shots 3,10,20,40 --out <P>/build/shots
python3 <P>/build/render.py --video <P>/build/frames.mp4 --duration <giây>
ffmpeg -i <P>/build/frames.mp4 -i <P>/build/audio_mix.wav -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart <P>/out/<tên>_9x16.mp4
```
`kit/index.html` là mẫu 4 hồi: nội dung thẻ (L1–L4), chữ, mốc `ANCHORS` là của video mẫu — **đổi theo kịch bản mới**, không dùng nguyên.

## 4. Quy cách thiết kế đã chốt
- Canvas CSS 540×960 @2x. Vùng UI x 55–485, y 96–472 (safe margin 10 %). Phụ đề y 486–550, 24 px, ≤ 25 ký tự/cụm, từ đang nói nền chanh chữ tối. Khung vòm nhân vật y 562–960, video 342×608, mặt nạ mờ cạnh 8 %.
- Thẻ biến hình một khối; đổi nội dung bằng mờ ≤ 0,15 s. **Khóa 1,0 s đầu**: không chèn đồ họa trước giây 1,0.
- Số hiển thị chỉ lấy từ lời đã duyệt; số minh họa gắn nhãn "minh họa"; không thêm số ngoài kịch bản.
- Âm: giọng nguyên, BGM −19 dB + sidechain, SFX −9…−20 dB, chuẩn hoá −14 LUFS / −1,5 dBTP.
- Năng lượng nằm ở hình, nội lực ở giọng: nhấn cụm từ (gạch nền chanh), nhân vật đẩy máy chậm 1,00→1,035 mỗi hồi, mỗi nhịp một chuyển động chính, mặt người ≥ 2 s giữa hai đồ họa (`creative-playbook.md`).

## 5. Luật cứng
- Không gọi giọng clone, không gửi ảnh/giọng ra ngoài khi chưa được hỏi và đồng ý (từng bước, từng lần).
- Giọng chỉ là lời Tùng đã duyệt; không báo "khớp miệng/giọng đạt" khi chưa có người nghe/xem.
- Render nhép miệng và render hình **tuần tự**, không song song; không báo xong khi chưa có file + QC.
- Không đăng/gửi khi chưa có chỉ thị rõ.

## 6. QC (ghi `LOG/QA_AUDIT_LOG.md`)
`blackdetect` 0 · `freezedetect` ≥ 1 s 0 · `silencedetect` ≥ 1 s 0 · −15…−13 LUFS · đỉnh ≤ −1,0 dBFS · không chữ ra ngoài vùng an toàn (xem khung mốc ở mỗi chuyển hồi) · mặt không bị cắt đầu ở đầu mỗi clip · ghi rõ phần CHƯA nghe/xem bằng người.

## 7. Giới hạn đã biết
- Nhép miệng gen theo ảnh tĩnh: khung hình có thể trôi trong clip dài (hồi 22 s: đầu lệch ~60 px so với cuối); đầu mỗi clip có thể ngậm miệng ~0,3 s.
- Giọng turbo nháp; `eleven_v4` ~2,5× credit và phải gen lại nhép miệng nếu đổi audio.
- Làm chậm bằng `atempo` + `setpts` (0,88×) không tốn credit nhưng giọng có thể nhão nhẹ; chưa nghe kiểm bằng tai.
- Hai hồi dùng chung một ảnh cho cú chuyển mượt nhưng cử chỉ ít đa dạng; chốt ≥ 4 ảnh cử chỉ ở Style Lock, tạo thêm thì xin phép.
- Giọng: **Tùng nghe A/B 2 câu (01/11/2026) và chọn B** = `eleven_v4`, voiceId 193369, `[low, steady voice]`, `...` + `[pause 0.6s]`, 1 từ HOA, stability 0,5 (~3,3 từ/s, 44 credit/10,6 s). Mới test 2 câu: chưa chạy cả bài, chưa thử với nhép miệng; speed/stability của turbo chưa có bằng chứng ngoài mẫu A.
- Mục "THỬ" của `creative-playbook.md` (con trỏ ảo, number_count, mask vòm, chữ sau người) chưa có trong kit.
- `kit/` chưa tổng quát hoá: đổi kịch bản = sửa `index.html` (L1–L4, `STEP`, mốc trong `make_data.py`).
- Chưa có dòng QC tự động cho độ khớp miệng; chỉ kiểm bằng mắt khung mốc.

Xem `reference/lessons.md` · `reference/voice-and-pace.md` · `reference/creative-playbook.md`.

## Tham Số Đầu Vào Của Kỹ Năng
- **character_image_path** (Ảnh chân dung nhân vật nền trắng (1 - 3 cử chỉ)): `{{character_image_path}}`
- **voice_script_content** (Kịch bản đã chuẩn hóa ngân sách nhịp đọc): `{{voice_script_content}}`

