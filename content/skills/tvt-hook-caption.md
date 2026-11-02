---
id: tvt-hook-caption
title: "Dynamic 3-Second Viral Hook & Caption Retention Engine"
description: "Dynamic 3-Second Viral Hook & Caption Retention Engine — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: marketing
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Hook Generation", "Karaoke Caption", "Retention Engine", "TikTok", "Shorts"]
inputs:
  - name: video_topic
    type: string
    description: "Chủ đề video hoặc vấn đề cốt lõi cần giải quyết"
    required: true
  - name: core_promise
    type: string
    description: "Giá trị hoặc bài học người xem nhận được"
    required: true
audit_gates: ["3-Second Hook Retention Gate", "3-Word Caption Chunking Gate", "Yellow Contrast Highlight Gate"]
created_at: "2026-11-03"
---
# SKILL: tvt-hook-caption

> Đóng gói từ `retention_video_skills_pack/02_SKILL_tvt-hook-caption.md`.
> Tài liệu này mô tả **đúng những gì đang chạy được** trong `skills/tvt-hook-caption/scripts/`.
> Khi đặc tả ghi nhiều hơn code làm, **code thắng** — mọi giới hạn đã biết nằm ở mục 7.
> Nguyên tắc **Zero Hallucination** (`CLAUDE.md` §1.4): không bịa số, không bịa tên tệp, không bịa câu lệnh.

---

## 1. DÙNG KHI NÀO

| | |
|:--|:--|
| **Dùng cho** | Video **đã cắt sẵn** (đã qua `tvt-auto-cut`) nhưng người xem lướt mất, hoặc chữ trên màn hình chưa dễ đọc trên điện thoại |
| **Video vào** | Project có `work/words_edited.json` (bóc băng từng từ) hoặc `transcript/words.json` |
| **Video ra** | `work/hook_caption_timeline.json` — timeline caption dùng để dựng, kèm báo cáo QC |
| **Không dùng khi** | Cần cắt footage thô → `tvt-auto-cut` · Cần sub kiểu tạp chí serif → `tvt-magazine-type` · Cần hoạt hình từ lời nói → `tvt-voice-motion` · Cần truyện người que → `tvt-stickman` |

**Ranh giới với `tvt-auto-cut`**

| | `tvt-auto-cut` | `tvt-hook-caption` (đây) |
|:--|:--|:--|
| Video vào | Footage **thô**, chưa cắt | Video **đã cắt** |
| Việc làm | Bóc băng · chấm beat · cắt khoảng lặng (có cổng duyệt) · master âm thanh | Chọn hook · dựng caption theo từ · QC timeline |
| Lệnh gọi | `/tvt-auto-cut` | `/tvt-hook-caption` |

---

## 2. ĐẦU VÀO & ĐẦU RA

| Loại | Đường dẫn | Bắt buộc |
|:--|:--|:--|
| Transcript từng từ | `<project>/work/words_edited.json` (hoặc `transcript/words.json`) | Có |
| Bảng tham số | `retention_video_skills_pack/config/media_dna.json` | Có (đọc, không ghi) |
| Lược đồ timeline | `retention_video_skills_pack/schemas/tvt-hook-caption_schema.json` | Có |

| Tệp sinh ra | Nội dung |
|:--|:--|
| `<project>/work/hook_caption_timeline.json` | Timeline caption: `hook_variants` · `selected_hook` · `caption_track` · `rehooks` |
| `<project>/work/hook_caption_report.json` | Báo cáo QC: số caption, sai lệch mốc (ms), nhóm luật PASS/FAIL |

---

## 3. QUY TRÌNH THỰC THI

```bash
python3 skills/tvt-hook-caption/scripts/hook_caption.py <project> [--hook "<câu hook>"] [--words PATH]
```

Bước trong script, theo đúng thứ tự:

1. **Nạp transcript** từ `words_edited.json` (hoặc `transcript/words.json`).
2. **Sinh 5 biến thể hook** theo 5 công thức tâm lý học (nghịch lý · kết quả định lượng · khoảng trống tò mò · cảnh báo · trước-sau), chấm điểm 5 tiêu chí 0–10.
   - Mỗi biến thể được **chấm điểm bằng luật** (Specificity · Tension · Open Loop · Visual Potential · Clarity) — điểm do máy tính, không phải cảm tính.
   - Nếu truyền `--hook`, biến thể đó được chèn thành ứng viên thứ 6 và chấm cùng cách.
3. **Chọn hook** = biến thể điểm cao nhất. Ghi kèm `selected_hook` + điểm từng tiêu chí.
4. **Dựng caption** theo mốc từng từ: gom **1–4 từ** mỗi cụm, `words_per_group` đọc từ `media_dna.json`.
5. **Né vùng mặt**: cụm caption nào lọt vào vùng khuôn mặt thì dời lên `caption_center_y` (700–950 px @1080×1920).
6. **Ghi timeline** ra `work/hook_caption_timeline.json`, đúng lược đồ.
7. **QC**: chạy `retention_video_skills_pack/tools/qc_timeline.py` — kiểm 8 nhóm luật trên timeline. FAIL thì **dừng**, in lý do, **không** báo PASS.
8. **Báo cáo** `work/hook_caption_report.json` với số đo thật.

---

## 4. QUY TẮC CẮT

- Caption **1–4 từ/cụm** — không dùng câu dài trên màn hình.
- Sai lệch mốc caption vs âm thanh: **mục tiêu ≤ 80 ms**. Đo thật từ `words_edited.json`; nếu transcript chỉ có mốc từng từ thì báo sai lệch thực đo, không làm tròn về 0.
- Vùng an toàn 9:16: `safe_px.top` 120 px · `safe_px.bottom` 280 px · `caption_center_y` 700–950 px · `face_clearance_px` ≥ 80 px.
- Vùng chết dưới 280 px **không** đặt caption.
- Màu caption lấy từ `media_dna.json` (bảng màu RGB ↔ ASS BGR); `highlight_color` phải nằm trong palette — ngoài palette thì QC FAIL.

---

## 5. CHUẨN ÂM THANH & AN TOÀN

- Nguồn sự thật duy nhất: `retention_video_skills_pack/config/media_dna.json`.
- Script này **không** chạm vào âm thanh: nó chỉ làm timeline. Việc master giọng thuộc `tvt-auto-cut` (`--bgm` + sidechain duck).
- Cột `voice` của timeline lấy từ cùng nguồn: −14.0 LUFS · true peak ≤ −1.0 dBTP · 48 kHz.

---

## 6. KIỂM THỬ & XÁC NHẬN

```bash
python3 -m unittest discover -s skills/tvt-hook-caption/tests -p "test_*.py" -v
```

| Phép kiểm | Kỳ vọng |
|:--|:--|
| Script chạy trên project thật | Exit 0, ra đủ 2 file |
| Caption 1–4 từ/cụm | Mọi cụm nằm trong khoảng |
| Cụm caption không lọt vùng mặt | 0 cụm vi phạm |
| Sai lệch mốc | Báo số thực đo, không báo 0 giả |
| QC timeline | 8 nhóm luật PASS |

---

## 7. GIỚI HẠN ĐÃ BIẾT

1. **5 biến thể hook được CHẤM ĐIỂM bằng luật, nhưng câu chữ vẫn do LLM soạn.** Máy không tự viết câu hook hay.
2. **Chưa có engine hook/re-hook tự động.** `rehooks` trong timeline là điểm neo cho người dựng đặt tay; không có bộ sinh re-hook theo quy tắc 5–15 s.
3. **Chưa tự render.** Script này ra timeline, không ra video. Việc dựng thuộc pipeline của pack (`run_pipeline.sh stage2`).
4. **Chưa có SFX.** `sfx[]` trong timeline là chỗ để trỏ, không có bộ âm thanh kèm sẵn.
5. **Sai lệch mốc ≤ 80 ms chưa có ground-truth** để đối chiếu — script đo được nhưng chưa có tập chuẩn để kết luận "đạt".
6. **Chưa thử trên Windows / Linux.** Chỉ kiểm cú pháp và chạy trên macOS.
7. **Cần `words_edited.json`** — nếu chỉ có video thô thì phải chạy `tvt-auto-cut` trước.

---

## 8. VÍ DỤ GỌI LỆNH

Người dùng gõ thẳng, không nói tên skill:

1. *"Video này cắt xong rồi nhưng người xem lướt mất. Giúp tôi thêm hook 3 giây đầu và chữ dễ đọc hơn."*
2. *"Cho tôi 5 câu mở đầu khác nhau cho đoạn này, điểm từng câu đi."*
3. *"Chữ trên màn hình đang đè lên mặt tôi. Sửa lại."*

## Tham Số Đầu Vào Của Kỹ Năng
- **video_topic** (Chủ đề video hoặc vấn đề cốt lõi cần giải quyết): `{{video_topic}}`
- **core_promise** (Giá trị hoặc bài học người xem nhận được): `{{core_promise}}`

