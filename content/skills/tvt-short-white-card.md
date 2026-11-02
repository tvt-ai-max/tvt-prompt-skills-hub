---
id: tvt-short-white-card
title: "White Card B2B Agency Short Video Kit (9:16)"
description: "White Card B2B Agency Short Video Kit (9:16) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["White Card", "B2B Short", "Navy & Orange", "Clean UI", "Brand Consistency"]
inputs:
  - name: b2b_short_script
    type: textarea
    description: "Kịch bản ngắn 45 - 60 giây"
    required: true
  - name: step_list
    type: textarea
    description: "3 bước hành động cụ thể cho khách hàng B2B"
    required: true
audit_gates: ["White Background Contrast Gate", "Safe Zone 9:16 Margin Check", "Brand Guidelines Compliance"]
created_at: "2026-11-03"
---
# SKILL: tvt-short-white-card

Đóng gói từ `STORYBOARD/content_plan_2026-11/engine` (đã dựng TVT-01..07 v1). Kiểm khi đóng gói (TVT-01): beats JSON và `data.js` sinh bằng skill **trùng byte** với bản gốc; mp4 dựng bằng skill cùng độ dài/khung (34,13 s, 1024 khung), QC đạt (black 0, freeze 0, silence 0, −14,0 LUFS, peak −1,1 dBFS); 4 khung so với bản đã dựng sai khác trung bình < 0,3/255 (nén JPEG).

## 1. Dùng khi nào

| | |
|:--|:--|
| **Đầu vào** | `audio/<ID>.mp3` + `audio/<ID>.align.json` (mốc từng từ) + `txt/<ID>.txt` (lời đọc) + `beats/<ID>.json` |
| **Đầu ra** | `out/<ID>.mp4` 1080×1920 (trang 540×960 @2x), 30 fps, H.264 CRF 16 + AAC, loudnorm −14 LUFS |
| **Thương hiệu** | nền `#FFFFFF`, chữ `#1A1A1A`, navy `#003189`, cam `#FA8A1A` (chỉ gạch chân/trạng thái/CTA), xanh `#16A34A`, đỏ `#DC2626` |
| **Không dùng khi** | Xem `description`. Ý tưởng **giới thiệu dịch vụ TVT** (Brand Kit, Landing Page, SEO/GEO, Retainer…) phải đi theo `tvt-service-promo` / SOP-06 |

## 2. Chuẩn bị

1. `pip install playwright` + Chrome hệ thống (render dùng `channel="chrome"`; Chromium đi kèm thiếu), `ffmpeg`.
2. Giọng: **hỏi Tùng chọn** (skill `clone-voice-tung`). Tuần 1 dùng ElevenLabs web Free, **chưa có giấy phép thương mại** → nháp.
3. `align.json` tối thiểu `{"words":[{"word","start","end"}]}`: sinh bằng `templates/hyperframes/align.py <mp3> <script.txt> <align.json>` (SOP-01).
4. `txt/<ID>.txt`: mỗi câu kết thúc `. ? !`; **tổng số từ phải bằng số từ trong align.json** (build dừng nếu lệch).
5. Thư mục dự án ngoài skill, ví dụ `sources/<dự-án>/`.

## 3. Lệnh (từ gốc repo)

```bash
# 1) Khai báo nhịp: chép ví dụ, sửa rồi chạy (ghi <dự-án>/beats/<ID>.json)
cp skills/tvt-short-white-card/templates/beats_example.py <dự-án>/beats_<id>.py
python3 <dự-án>/beats_<id>.py <dự-án>

# 2) Sinh build/<ID>/ (không render), chụp thử vài khung
python3 skills/tvt-short-white-card/scripts/build_video.py <dự-án> <ID> --prep
python3 skills/tvt-short-white-card/scripts/build_video.py <dự-án> <ID> --shots 2,9,20,30

# 3) Kiểm neo nhịp theo lời (báo phần tử lệch > 0,25 s / ngoài nhịp / hẹn giờ mặc định)
python3 skills/tvt-short-white-card/scripts/audit_timing.py <dự-án> <ID>

# 4) Dựng đủ: mix + render + mux + QC → <dự-án>/out/<ID>.mp4
python3 skills/tvt-short-white-card/scripts/build_video.py <dự-án> <ID>
```
Spec chạy được từ trong repo; ngoài repo đặt `BEATS_LIB=<repo>/skills/tvt-short-white-card/scripts`. Render **tuần tự**, chạy nền, kiểm `ps` trước; nhiều ID thì truyền liên tiếp (chạy lần lượt).

## 4. Khai báo nhịp (beats)

Mỗi nhịp một thẻ; `s` = số câu bắt đầu nhịp (1–), `at`/`subAt`/`footAt`… = số câu, `w` = từ neo trong câu. Hàm trợ giúp ở `scripts/beats_lib.py`:
- `st(s, kw, title, sub, subAt, icon, tone, h, fs, tag)` · `statement`: một ý lớn.
- `ls(...)` · `list`: danh sách có số/icon, từng dòng neo `at` hoặc `w`.
- `compare` (hai cột Không phải/Mà là), `chain`, `funnel`, `table`, `curve` (đường vẽ dần), `screen` (laptop + ghim chú thích).
- CTA: `cta_comment` (bình luận CHECKLIST), `cta_url`, `cta_btn` (nút "Nhận … miễn phí").
- Icon dùng trong nhịp đã dựng: alert check clock dollar edit file globe help layers link list message search target trending user users xc.
- `kw`: dòng chữ khóa (HTML `<b>`, `<u>`, `<s>`). `tone`: navy/red/green.

## 5. Luật cứng

- **Zero Hallucination**: số/ví dụ trong thẻ phải có trong lời đọc đã duyệt; thẻ minh họa ghi "ví dụ minh họa". Không dùng "TTFB dưới 250ms" khi chưa có số đo.
- **Khóa 1,0 s đầu**: build tự kẹp mọi phần tử ≥ 1,15 s; nhịp đầu ≥ 1,0 s.
- **Từ cấm TVT** (brand.json): không dùng chữ "SME" ngoài slogan chính thức, không "giảm giá/khuyến mãi", không mở headline bằng AI.
- Mỗi video một lời kêu gọi. Không đăng khi Tùng chưa có chỉ thị.
- "Audit Website miễn phí / chẩn đoán" chỉ nhắc đúng lời đọc; phạm vi do Tùng chốt.
- **Thẻ CTA dạng nút** in slogan chính thức (hằng `SLOGAN` trong `build_video.py`): "Branding thực chiến cho SME" / "AI là đòn bẩy tăng tốc – Chiến lược và hệ thống mới là lõi." — Tùng chốt 02/11/2026, đã ghi vào Brand DNA; `brand.json` có ngoại lệ cho đúng câu này, mọi chỗ khác vẫn cấm chữ "SME". Đổi tạm bằng `--slogan "dòng 1|dòng 2"`.

## 6. Cổng chất lượng

1. `audit_timing.py`: không còn cờ "NGOÀI NHỊP"; hạn chế "mặc định (không neo lời)".
2. QC máy (tự in sau khi dựng): black 0 · freeze 0 · silence 0 · −14 LUFS ± 1 · peak ≤ −1 dBFS.
3. Xem khung `--shots` tại mốc đổi nhịp; chữ nằm trong vùng an toàn Reels/Shorts (thử trên app thật; số vùng an toàn lấy từ bài bên thứ ba). Nghe lại giọng bằng tai (chưa tự động). Ghi `LOG/QA_AUDIT_LOG.md`.

## 7. Giới hạn đã biết

- Chỉ nền trắng TVT; chủ đề `tlt` trong script chỉ đổi chữ thương hiệu (bản thẻ sáng v1, không dùng nữa: Tùng đã chọn thẻ tối → `tvt-short-card-kit`).
- Nhạc nền `kit/assets/bgm.m4a` một bài, bắt đầu ở điểm lệch theo tên ID; SFX 7 tệp trong `kit/sfx` (kho nội bộ). Chưa nghe cân bằng bằng tai.
- Phải viết beats tay (5–6 nhịp/video); không tự sinh từ kịch bản.
- Bản TVT-01..07 v1 đã dựng với đúng slogan chính thức này; không cần dựng lại.

Bài học và lỗi đã gặp: `reference/lessons.md`.

## Tham Số Đầu Vào Của Kỹ Năng
- **b2b_short_script** (Kịch bản ngắn 45 - 60 giây): `{{b2b_short_script}}`
- **step_list** (3 bước hành động cụ thể cho khách hàng B2B): `{{step_list}}`

