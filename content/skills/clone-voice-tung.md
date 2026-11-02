---
id: clone-voice-tung
title: "Neural Voice Clone & Cadence Checker SOP"
description: "Neural Voice Clone & Cadence Checker SOP — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: operations
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Voiceover", "Voice Clone", "ElevenLabs", "Audio Cadence", "Speech Timing"]
inputs:
  - name: raw_script
    type: textarea
    description: "Bản thảo kịch bản lời đọc"
    required: true
  - name: target_cadence
    type: string
    description: "Ngân sách nhịp đọc (3.0 - 3.3 từ/giây)"
    required: false
audit_gates: ["Cadence Budget Check (≤ 14 words/sentence)", "Loudnorm -14 LUFS Gate", "Human Auditory Sign-off Gate"]
created_at: "2026-11-03"
---
# clone-voice-tung

> Đóng gói từ phiên clone giọng 31/10/2026 (3 bản v1/v2/v3, thử 5 câu khó, thử phiên âm). Đọc `reference/evaluation.md` nếu cần biết vì sao chọn như vậy.

## ⚠️ QUY TẮC SỐ 1 — HỎI TÙNG CHỌN TRƯỚC KHI DÙNG
Mỗi lần được gọi, **dừng và hỏi Tùng một lượt** (dùng AskUserQuestion) trước khi tạo bất kỳ giọng đọc nào hoặc tiêu credit:
1. **Làm gì?** Tạo lời bình · Thử giọng · Clone lại giọng từ mẫu mới.
2. **Bản giọng:** v3 `193369` (mặc định, đã chốt) · v2 `193359` · v1 `193358` (xem `voices.json`).
3. **Model:** nháp `eleven_turbo_v2_5` (~1,7 credit/s) · bản cuối `eleven_v4` (~2,9 credit/s, đã chốt cho bản cuối).
4. **Kịch bản đã duyệt chưa?** (Chưa duyệt → không tạo giọng.) Nội dung phải là lời Tùng đồng ý nói, không bịa phát ngôn/số liệu.
5. **Credit:** chạy `account_balance`, đưa **báo giá** (giây × credit/giây) và chờ đồng ý nếu > 100 credit.
6. **Dạng video:** không lộ mặt (khuyên dùng) · lai (hook + kêu gọi do Tùng nói thật, phần thân giọng clone) · mặt Tùng nói trên hình → **KHÔNG** dùng giọng clone (lệch khẩu hình), chỉ để vá vài câu.
Không tự chọn thay Tùng, không tự chạy `eleven_v4` cả video khi chưa có đồng ý.

## 1. Dùng khi nào
| | |
|---|---|
| **Đầu vào** | Kịch bản tiếng Việt đã duyệt (+ tên riêng/thuật ngữ) |
| **Đầu ra** | File giọng (mp3) theo đoạn → đưa vào dây chuyền căn từng từ (`templates/hyperframes/align.py`) rồi `tvt-voice-motion` (9:16) / `tvt-master-motion-explainer` (16:9) |
| **Không dùng** | Mặt Tùng mở miệng trên hình · kịch bản chưa duyệt · nội dung của người khác · tin tức không có nguồn |

## 2. Quy trình
```bash
V=skills/clone-voice-tung/scripts
python3 $V/apply_glossary.py <kich_ban.txt> --model eleven_v4     # thay phiên âm + chia đoạn + báo giá
```
1. Hỏi Tùng (mục trên) → 2. `apply_glossary.py` (xem từ cảnh báo chưa có trong glossary; từ lạ → thử đoạn ngắn trước) → 3. **Nháp** bằng turbo nếu kịch bản dài → 4. Tùng duyệt → 5. **Bản cuối** `eleven_v4` từng đoạn `part_NN.txt` bằng `audio_tts` (voiceId 193369, `source="mine"`, similarityBoost 0.8) → 6. Tải mp3 về `sources/<dự án>/` (URL ký tạm, hết hạn) → 7. Căn từng từ (`align.py`) → 8. **Tùng nghe lại** trước khi dựng/đăng.
Tham số mặc định: `voiceId=193369, source=mine, model=eleven_v4, similarityBoost=0.8` (stability 0.5 chỉ áp cho turbo).

## 3. Bảng phiên âm (`glossary.json`)
Thay **lời đọc**, giữ nguyên **phụ đề**: ChatGPT→`Chát-Gi-Pi-Ti` · Gemini→`Giem-mi-nai` · DeepSeek→`Đíp-Sích` (Tùng chọn) · Claude Opus viết nguyên. Từ mới: thử đoạn ngắn (~15–20 credit), Tùng nghe chọn, rồi ghi vào `glossary.json` với `status: verified`. **Bóc băng (whisper) KHÔNG đủ để kết luận cách đọc từ tiếng Anh** — phải nghe bằng tai.

## 4. Chi phí (đo 31/10/2026, ±20%)
`eleven_turbo_v2_5` ≈ 1,7 credit/s · `eleven_v4` ≈ 2,9 credit/s (≈2,5 từ/s). Video 150 s: turbo ≈ 250, v4 ≈ 440. Clone mới ≈ 20 credit. Credit còn lại sau phiên: ≈ 208.

## 5. Clone lại giọng (khi Tùng muốn mẫu mới)
1. **Hỏi Tùng** chọn mẫu: khuyên thu 2–3 phút phòng yên tĩnh, một mình Tùng, nói tự nhiên; hoặc dùng clip có sẵn.
2. `python3 skills/clone-voice-tung/scripts/prep_voice_sample.py <file…> --out <mau.wav>` (mono 44,1 kHz, hạ −4 dB, báo SNR; cảnh báo < 60 s / SNR < 20 dB).
3. **Xin Tùng xác nhận gửi mẫu lên dịch vụ** (đây là gửi giọng ra ngoài) → `creations_request_upload` (audio/wav) → PUT file lên URL ký → `creations_finalize_upload` → `audio_voice_clone` (language vi, `removeBackgroundNoise=false`) → đợi `audio_voices_list scope=mine` thấy giọng → thử 1 câu → Tùng nghe, chọn → ghi vào `voices.json`.

## 6. Luật cứng
- Chỉ giọng của Tùng, chỉ nội dung Tùng duyệt. Không gửi mẫu giọng đi khi chưa có xác nhận.
- Video công khai dùng giọng AI: cân nhắc ghi chú theo quy định nền tảng (chưa kiểm chi tiết từng nền tảng).
- Không báo "giống/đạt" khi chưa có Tùng nghe; nêu rõ phần Em chỉ kiểm bằng bóc băng.
- Không lưu khoá/URL ký trong repo; mẫu giọng ở `sources/voice_clone/` (ngoài git).

## 7. Giới hạn đã biết
- Chất lượng giới hạn bởi mẫu (micro điện thoại, phòng có vang); PVC (thu phòng thu) sẽ tốt hơn.
- Từ tiếng Anh/tên riêng mới có thể đọc sai; DeepSeek, ChatGPT cần phiên âm.
- Credit tài khoản Magnific thấp; phụ thuộc connector còn hoạt động.
- Chưa có công cụ căn khẩu hình (lip-sync) — không dùng cho cảnh mặt Tùng nói.
- "VietNam DangTungDuy" trong thư viện ElevenLabs là giọng của người khác, **không phải** giọng Tùng.

## Tham Số Đầu Vào Của Kỹ Năng
- **raw_script** (Bản thảo kịch bản lời đọc): `{{raw_script}}`
- **target_cadence** (Ngân sách nhịp đọc (3.0 - 3.3 từ/giây)): `{{target_cadence}}`

