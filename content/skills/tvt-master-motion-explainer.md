---
id: tvt-master-motion-explainer
title: "Master Motion Graphics Explainer (Long-form 16:9)"
description: "Master Motion Graphics Explainer (Long-form 16:9) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Long-Form Explainer", "16:9 Motion Graphics", "Educational Video", "Architecture Diagram", "B2B Tech"]
inputs:
  - name: course_or_topic_title
    type: string
    description: "Tên chủ đề hoặc bài giảng dài 3 - 20 phút"
    required: true
  - name: full_audio_script
    type: textarea
    description: "Toàn văn kịch bản lời đọc đã bóc mốc thời gian"
    required: true
audit_gates: ["Scene Storyboard Validation Gate", "Deterministic Frame Buffer Gate", "Broadcast Standard Audio Mix"]
created_at: "2026-11-03"
---
# tvt-master-motion-explainer

Quy trình đã chạy thật trên dự án **AI 3 Lớp Giải Phóng OCP** (13:17 · 5 Act · 19.142 frame · 2 giọng nam/nữ), đã qua QA và đăng YouTube @toilatungAI. Mọi script đọc chung `project.json` của dự án.

## Dùng khi nào

- ✅ Dùng khi có voice + transcript ASR và cần video explainer dài cho kênh Tôi Là Tùng / TVT; không dùng cho Shorts 9:16 hay video quay mặt người.

## Khi nào dùng

| Dùng | Không dùng |
|---|---|
| Có sẵn voice dài (m4a/mp3/wav) + transcript ASR theo câu | Video dọc 9:16 (→ `toilatung-kinetic-reel`, `tvt-voice-motion`) |
| Explainer / podcast tranh luận / bài giảng 16:9, 3–20+ phút | Video quay mặt người (→ `toilatung_talkinghead`) |
| Cần đồ họa chuyển động theo từng câu, không có số liệu bịa | Quảng cáo dịch vụ TVT (→ `tvt-service-promo`, SOP-06) |

## Nguyên tắc bất biến

1. **Zero hallucination.** Chỉ đưa lên đồ họa con số/tên riêng **có trong lời thoại**. Chỗ không chắc (ASR sai) → không dùng làm đồ họa, ghi `note` trong `story/actN.json`. Thiếu số → thanh so sánh tương đối, ghi rõ "so sánh tương đối". Lời thoại nêu 3/8 tiêu chí → chỉ vẽ 3, dòng còn lại "…và các tiêu chí còn lại".
2. **Duyệt trước, render sau.** Plan (ý tưởng + bảng dựng) → duyệt → Act 1 → duyệt → từng Act tiếp → master. Không gọi Higgsfield/dịch vụ tốn credit khi chưa được cho phép rõ ràng: `assets.py cost` báo số credit → người dùng đồng ý → mới `gen --yes`.
3. **Render cục bộ, tuần tự.** Không bao giờ chạy 2 render song song, không render trên VPS. Báo khi render chạy nền.
4. **Chữ đọc được trên điện thoại:** headline ≥56px, thân ≥24px, cân dòng (`text-wrap: balance`, không còn dòng 1 chữ), tương phản ≥4.5:1, safe margin 10%.
5. **Thương hiệu** đặt bằng `tokens` trong `project.json`. Mặc định kênh toilatung explainer: **nền đen, chữ chỉ trắng + vàng `#FFC20E`**; đỏ/xanh lá chỉ là tín hiệu không phải chữ (viền, thanh). Không ghi đè palette brand khác.

## Cấu trúc dự án

```
<project>/
  project.json            # voice, bgm, sfx_dir, chars_dir, acts [[start,end],…], tokens, speakers, subscribe
  story/shots_asr.json    # đầu vào ASR {"shots":[{"start","end","line"}]}
  story/actN.json         # câu đã sửa chính tả + speaker F/M + note chỗ chưa chắc
  src/actN/               # phần RIÊNG của Act: meta.json · scenes.css · scenes.html · timeline.js
  cues/actN.json          # SFX [[t_rel, "file.wav", gain_db], …]
  assets/chars/char_<pose>.png   # vd char_female_present.png → #c-fpresent, char_male_think.png → #c-mthink
  build/                  # actN.html đã ghép + assets (do script sinh, không sửa tay)
  renders/                # actN.mp4, contact sheet, master
```

Lõi chung (bục 3D, nhân vật thở, phụ đề, hình khối biến hình, helper) nằm ở `core/core.html` — **không chép tay vào từng Act**; `compose.py` ghép lõi + `src/actN`.

## Quy trình (S = `skills/tvt-master-motion-explainer/scripts`)

```bash
# 0. Khởi tạo: chia Act ≤5 phút tại ranh giới câu (hoặc --acts 0,101.23,...)
python3 $S/new_project.py <proj> --voice raw/voice.m4a --shots story/shots_asr.json --title "..."

# 1. Người nói theo cao độ (gợi ý) → xác nhận bằng nội dung → sửa chính tả từng câu, ghi note chỗ chưa chắc
python3 $S/speakers.py <proj> 1            # xem bảng
python3 $S/speakers.py <proj> 1 --write    # điền speaker còn "?"

# 2. Plan: một ẩn dụ trung tâm + bảng set-piece theo câu thoại (xem reference/patterns.md)
#    + đề xuất NHÂN VẬT RIÊNG cho video (vai, ngoại hình, đạo cụ, 6–9 tư thế theo nội dung) + danh sách icon → DUYỆT

# 2b. Nhân vật + icon riêng (Higgsfield, tốn credit — chỉ sau khi được đồng ý mức credit)
python3 $S/assets.py <proj> init           # assets/brief.json: style, characters f/m (design + poses), icons
python3 $S/assets.py <proj> cost           # miễn phí: "2 sheet, 14 pose, 20 icon → ~X credit" → hỏi người dùng
python3 $S/assets.py <proj> gen --yes      # sheet → pose theo sheet → tách nền cục bộ → assets/chars, assets/icons

# 3. Viết src/actN (scenes.html/css + timeline.js + meta.json cast, cues/actN.json) rồi kiểm tra nhanh
python3 $S/compose.py <proj> 1 && python3 $S/mix_act.py <proj> 1
python3 $S/check.py <proj> 1 --at 1.6,8,13,...   # lint + contact sheet; sửa đến khi sạch

# 4. Render (chạy nền, tuần tự) + QA từng Act → gửi video + contact sheet → DUYỆT từng Act
python3 $S/render.py <proj> 1

# 5. Master: nối Act, soundtrack mix 1 lượt theo mốc video thật, Subscribe góc trên phải, QA + ảnh seam
python3 $S/master.py <proj>
python3 $S/qa.py <proj>/renders/<id>-master.mp4 --every 15 --sheet out.jpg
```

Sau mỗi bước render: ghi `LOG/QA_AUDIT_LOG.md` (file, frame, độ dài vs mục tiêu, black/freeze, loudness, chỗ chưa chắc).

## Viết một Act (`src/actN`)

- `scenes.html`: các khối `<div class="sc" id="...">` (mỗi set-piece 1 khối), `<div id="motif"></div>` đặt đúng tầng z mong muốn.
- `timeline.js`: thời gian **tương đối trong Act**. Mẫu chuẩn: `sceneIn → head/kinetic → pop/roll/draw/morph → sceneOut`. Thư viện helper và công thức set-piece: **`reference/patterns.md`**.
- Nhân vật: mỗi video nên có bộ riêng (2b); bộ mẫu dùng chung chỉ là phương án dự phòng. Tư thế đặt theo nội dung (vd cầm hoá đơn, ôm đầu lo lắng, chỉ vào biểu đồ) chứ không chỉ present/think.
- `meta.json`: `cast` = ai đứng trên bục theo đoạn `[["#c-fpresent",0,11.6,"f"],…,[…,"DUR","m"]]`; bỏ câu chen <2.5s để nhân vật không nhấp nháy; tư thế khớp ngữ cảnh (laptop khi nói kỹ thuật, think khi hoài nghi, like/wave khi chào).
- **Bục đổi bên** (`project.json` → `"stage": {"side": "auto", "min_gap": 30, "mirror": true}`, mặc định của dự án mới): bục trượt + nhảy giữa góc trái dưới ↔ góc phải dưới tại một `sceneIn(...)` cách lần đổi trước ≥ `min_gap` giây; nội dung (motif, `.sc`, phụ đề) trượt −400px, nhân vật lật gương để luôn nhìn vào nội dung. Toạ độ cảnh **vẫn viết cho bố cục bục trái** (vùng x 560–1760); `compose.py` in `bục L →R@34.35 …` và nối bên từ Act 1 nên seam luôn khớp. Muốn tự chọn: `meta.json` `"side": [[t, "R"], [t2, "L"]]`. Không tween `x` trực tiếp lên `.sc`, `#motif`, `#karaoke` (đã dành cho đổi bên) — tween phần tử con. Ảnh nhân vật có chữ/logo sẽ bị lật khi `mirror: true`.
- **Icon sinh theo nội dung:** `{{icon:invoice}}` hoặc `{{icon:invoice big}}` trong `scenes.html` → SVG nội tuyến `class="ic"`, màu theo `color` (mặc định vàng accent), cỡ theo `font-size`.
- Act 2+ **tiếp nối** Act trước: `place(...)` hình khối về đúng đội hình cuối Act trước; người nói đầu tiên đứng sẵn ở frame 0 (lõi tự xử lý).
- Ví dụ thật đã render: `examples/ocp-act3/` (14 set-piece, 200s).

## Lỗi đã gặp — đọc trước khi viết

Xem **`reference/lessons.md`** (GSAP `repeat:-1`, `from(opacity:0)` trên phần tử CSS opacity 0, `fromTo` lặp thiếu `immediateRender:false`, phụ đề bằng ticker, vòng bục nghiêng, ffmpeg 9 bỏ `-filter_complex_script`, xem trước bằng data-URL, lệch âm khi ghép Act, nhân vật mất ở seam…).

## Đầu ra bàn giao

- `renders/<id>-master.mp4` 1920×1080 24fps H.264 + AAC, QA: 0 black ≥1s, 0 freeze ≥2s, peak ≤ −0.5 dB.
- Contact sheet từng Act + ảnh seam + 4 ảnh tại mốc Subscribe.
- `story/actN.json` có note từng chỗ phụ đề chưa chắc để người duyệt nghe lại.
- Gói đăng (khi được yêu cầu): làm theo mục **Gói đăng** bên dưới → `YOUTUBE_SEO.md`.

## Gói đăng (`YOUTUBE_SEO.md`)

Chỉ làm khi được yêu cầu. Thứ tự cố định: **nghiên cứu từ khoá → viết tiêu đề → mô tả/thẻ → thumbnail → caption mạng xã hội.**

**Bước 0 — Nghiên cứu từ khoá bằng VidIQ (trước khi viết tiêu đề).** Tool VidIQ MCP đã nối sẵn; mỗi lượt gọi tốn **5 credit**, gói hiện có 150 credit tự làm mới theo chu kỳ. Quy tắc credit giống Higgsfield: gọi `vidiq_balance` (miễn phí) trước, báo người dùng mức dự kiến, không chạy ngoài mức đó.

| # | Việc | Tool | Lượt |
|---|---|---|---|
| 1 | Chọn 3–5 từ khoá gốc **từ lời thoại** (chủ đề chính, thuật ngữ người xem sẽ gõ, một cụm nỗi đau). Không lấy từ khoá nằm ngoài nội dung video | — | 0 |
| 2 | Lượng tìm kiếm + độ cạnh tranh + từ khoá liên quan, thử cả bản có dấu và không dấu | `vidiq_keyword_research` (`research`; thêm `country: VN` nếu muốn số trong nước) | 3–5 |
| 3 | Top video cùng chủ đề: tiêu đề, độ dài, kênh nào đang đứng đầu → chọn góc khác, không trùng | `vidiq_youtube_search` (`type: ["video"]`, `regionCode: VN`) | 1–2 |
| 4 | Chấm điểm 3 tiêu đề ứng viên, chọn điểm cao nhất mà vẫn đúng nội dung | `vidiq_score_title` (`type: long`) | 3 |

Ngân sách một tập: khoảng **45–60 credit**; gói hiện tại (`vidiq_balance` báo `type: limited`, 150 credit/chu kỳ, không cộng dồn) đủ cho khoảng 3 tập mỗi chu kỳ. **Bản tiết kiệm (~30 credit):** 3 lượt `keyword_research` + 1 `youtube_search` + 2 `score_title`, bỏ `generate_titles`. Ưu tiên bản tiết kiệm khi số dư dưới 60. Muốn thêm gợi ý tiêu đề thì dùng `vidiq_generate_titles` (5 credit/lần), chỉ để lấy ý, không chép nguyên.

**Phương án B khi VidIQ không dùng được** (hết credit, tool lỗi/chưa nối, hoặc `vidiq_balance` báo không đủ): vẫn làm bước 0, bằng nguồn miễn phí, và ghi rõ trong bảng "nguồn: thủ công, không có số tìm kiếm":
1. Gợi ý tự điền của ô tìm kiếm YouTube (gõ từ khoá gốc + từng chữ cái) → các cụm người ta thật sự gõ.
2. YouTube Studio → Analytics → Nguồn lưu lượng → Tìm kiếm trên YouTube của **các video cũ của kênh** → từ khoá đã mang người xem về.
3. Google Trends (khu vực VN, YouTube Search) để so hai ba cụm với nhau (chỉ so sánh tương đối, không ra số tuyệt đối).
4. Tự đọc 10 kết quả đầu của tìm kiếm YouTube (trình duyệt trong app): tiêu đề, độ dài, lượt xem, tuổi video.
5. Chấm tiêu đề bằng checklist: từ khoá chính trong ~40 ký tự đầu, ≤80 ký tự, có một con số hoặc một xung đột có trong video, không gây hiểu sai.
Không bịa số tìm kiếm khi không có nguồn.

Ghi vào đầu `YOUTUBE_SEO.md` một bảng "Nghiên cứu từ khoá": từ khoá · lượng tìm kiếm · cạnh tranh · nguồn số · ghi chú. Chỗ VidIQ không trả số (từ khoá tiếng Việt ngách) thì ghi **"không có số liệu"**, không suy ra.

Luật cứng:
1. Tiêu đề phải đúng với những gì video nói. Từ khoá "hot" nhưng video không nói đến thì **không dùng**. Điểm VidIQ chỉ để chọn giữa các tiêu đề đúng, không để thêm ý.
2. Từ khoá chính nằm trong ~40 ký tự đầu của tiêu đề; tiêu đề ≤100 ký tự (mục tiêu 60–80); mô tả: từ khoá chính trong 2 dòng đầu.
3. Số liệu trong mô tả/caption chỉ lấy từ lời thoại (như phần Nguyên tắc bất biến).
4. Mô tả + mục lục (mốc từ `story/`, bắt đầu 00:00), thẻ dưới 500 ký tự, prompt thumbnail, caption Facebook / bình luận ghim / Zalo / TikTok: **mỗi nội dung đăng nằm trong một khối ```text riêng** để người dùng sao chép dán thẳng; ghi chú để ngoài khối. Mẫu thật: `sources/cam-bay-dich-vu-so-cho-sme/YOUTUBE_SEO.md`.
5. Lịch đăng và link video điền vào đầu file khi có; caption Facebook/Zalo dùng link thật.

`legacy/` giữ template cũ (ticker phụ đề, CSS animation vô hạn) chỉ để đối chiếu — **không dùng**.

## Tham Số Đầu Vào Của Kỹ Năng
- **course_or_topic_title** (Tên chủ đề hoặc bài giảng dài 3 - 20 phút): `{{course_or_topic_title}}`
- **full_audio_script** (Toàn văn kịch bản lời đọc đã bóc mốc thời gian): `{{full_audio_script}}`

