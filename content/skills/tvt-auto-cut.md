---
id: tvt-auto-cut
title: "Automated Word-Level Silence Cut & Footage Trimmer"
description: "Automated Word-Level Silence Cut & Footage Trimmer — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: operations
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Auto Cut", "Silence Removal", "Word-Level EDL", "Whisper ASR", "Workflow Automation"]
inputs:
  - name: raw_footage_path
    type: string
    description: "Đường dẫn file video hoặc âm thanh thô cần cắt gọn"
    required: true
audit_gates: ["Zero Word-Clipping Gate", "Natural Breathing Interval Gate", "Deterministic Cut Consistency"]
created_at: "2026-11-03"
---
# SKILL: tvt-auto-cut

> Đóng gói từ `retention_video_skills_pack/01_SKILL_tvt-auto-cut.md` (spec upstream 15 bước) theo SOP-04.
> Tài liệu này mô tả **đúng script đang chạy** trong `skills/tvt-auto-cut/scripts/`. Khi spec upstream và code lệch nhau, **code thắng** — mọi số trong đây đều trích từ mã nguồn hoặc từ `retention_video_skills_pack/config/media_dna.json`.
> Nguyên tắc **Zero Hallucination** (CLAUDE.md §1.4): không bịa số, không bịa tên tệp, không bịa câu lệnh.

---

## 1. DÙNG KHI NÀO

| | |
|:--|:--|
| **Dùng cho** | Footage thô có giọng nói thật: talking-head, podcast, webinar, khóa học. Cần một pipeline duy nhất: bóc transcript → chấm điểm beat → **người dùng duyệt đề xuất cắt** → cắt khoảng lặng → master âm thanh → trộn BGM → xuất kép 9:16 + 16:9 |
| **Ngôn ngữ** | Tiếng Việt (mặc định `--lang vi`), có thể `en` / `auto` |
| **Khung hình** | `master.mp4` scale theo chiều cao `--height` (mặc định 1920), chiều ngang giữ tỉ lệ nguồn — **không crop 9:16 tự động** (`master.py:79`). Đo thật: nguồn 1920×1080 → output **3414×1920**. Bản đúng tỉ lệ sinh ra khi thêm `--aspects` (xem Bước 6) |
| **Không dùng khi** | Chỉ cần dựng lớp phủ/overlay lên video đã có → `skills/social-cta-overlay/`, `skills/screen-review-explainer/`, `skills/toilatung-talkinghead/` |
| | Video quảng cáo dịch vụ TVT Agency → `skills/tvt-service-promo/` (SOP-06) |
| | Chỉ cần hook 0–3 s + kinetic caption trên video đã dựng → `retention_video_skills_pack/02_SKILL_tvt-hook-caption.md` |
| | Dựng từ số 0 theo phong cách editorial/Vox (không dùng footage thô) → `retention_video_skills_pack/03_SKILL_tvt-magazine-type.md` |
| | Chỉ có voiceover, cần storyboard 2D motion, không cần footage → `retention_video_skills_pack/04_SKILL_tvt-voice-motion.md` |
| | Kênh faceless kể chuyện vẽ tay → `retention_video_skills_pack/05_SKILL_tvt-stickman.md` |

**Ranh giới "full pipeline" và "overlay only"**

| | `tvt-auto-cut` (đây) | Overlay only |
|:--|:--|:--|
| Đầu vào | Video thô **chưa cắt**, chưa có transcript | Video **đã cắt**, đã có file master |
| Việc làm | Dò lỗi nguồn → bóc từng từ → chấm điểm beat → **duyệt đề xuất cắt** → cắt khoảng lặng → master âm → trộn BGM → xuất 9:16 + 16:9 | Chỉ thêm lớp phủ, caption, CTA, nhạc |
| Đầu ra | `master.mp4` + `master_vo.wav` + `trim_map.json` (+ `master_mix.wav`, `master_9x16.mp4`, `master_16x9.mp4`) | Một file video cuối |
| Khi nào dùng | "Edit video này giúp tôi nha" + cần chuẩn hóa nội dung giọng nói | "Phụ đề đè lên video này" / "thêm CTA vào clip đã dựng" |

---

## 2. ĐẦU VÀO & ĐẦU RA

### Đầu vào

| Loại | Đường dẫn / nội dung | Bắt buộc |
|:--|:--|:--|
| Video nguồn | `<project>/raw/*` (`.mp4 .mov .m4v .mkv .avi .webm`) hoặc truyền `--video <đường dẫn>` (`probe.py:145-149`) | Có |
| Audio 48 kHz | Tự tách ra `<project>/audio/source_48k.wav` (`probe.py:175`) | Tự sinh |
| `pack.json` | `<project>/pack.json` — khai báo `clips[]` (`clip_id`, `source_start`, `source_end`) và `export.loudness_lufs` (`master.py:46-47`, `master.py:177-180`) | Có, cho bước master |
| Model Whisper | `ggml-medium.bin` / `ggml-small.bin` — tìm theo thứ tự `transcribe.py:29-33` | Có, cho bước bóc băng |
| Toolchain | `ffmpeg`, `ffprobe`, `whisper-cli`, `python3` + `numpy` (`setup.sh:39-64`) | Có |
| File BGM | Đường dẫn nhạc nền (mp3/wav/m4a) — chỉ khi dùng `--bgm` | Không |

### Đầu ra — đúng những gì script ghi ra

| Tệp | Sinh bởi | Nội dung |
|:--|:--|:--|
| `<project>/probe.json` | `probe.py:208` | Metadata nguồn (fps, khung, rotation, codec) + `issues[]` chẩn đoán + đường dẫn audio đã tách |
| `<project>/audio/source_48k.wav` | `probe.py:175` | Audio PCM s16le, stereo, 48 kHz. **Ghi đè file cũ** ở mỗi lần chạy (ffmpeg `-y`) — chỉ né ghi đè khi bật `--no-audio-extract` |
| `<project>/transcript/words.json` | `transcribe.py:242` | `meta` + `words[]` (`word`, `start`, `end`, `conf`) + `segments[]` + `text` |
| `<project>/transcript/transcript.txt` | `transcribe.py:243` | Toàn văn lời nói |
| `<project>/transcript/beats.json` | `beats.py:250` | Beat đã gắn nhãn + 5 tiêu chí chấm điểm (bản lọc sơ, agent chọn) |
| `<project>/clips/<clip_id>/cut_proposal.json` | `review.py:367` (lệnh `plan`) | **Đề xuất cắt** kèm lý do, ngữ cảnh, mức tin cậy — dừng, chờ duyệt |
| `<project>/clips/<clip_id>/cut_decision.json` | `review.py:421` (lệnh `approve`) | Quyết định accept/reject của người duyệt + hash đề xuất |
| `<project>/clips/<clip_id>/master.mp4` | `master.py:73` | Hình đã cắt. `libx264`, CRF 18, `veryfast`, `yuv420p`, âm PCM s16le trong container MP4 (`master.py:85-87`) |
| `<project>/clips/<clip_id>/master_vo.wav` | `master.py:110` | Voice đã master: giảm nhiễu → de-esser → EQ → nén → limiter → `loudnorm` 2 lượt |
| `<project>/clips/<clip_id>/master_mix.wav` | `master.py:263-264` | Voice + BGM đã sidechain duck (chỉ khi `--bgm`) |
| `<project>/clips/<clip_id>/mix_report.json` | `master.py:265` | Số đo thật của bước trộn: gain voice/BGM, khoảng cách duck, loudness file xuất |
| `<project>/clips/<clip_id>/master_9x16.mp4` | `master.py:141` | Bản dọc **1080×1920** (chỉ khi `--aspects`) |
| `<project>/clips/<clip_id>/master_16x9.mp4` | `master.py:141` | Bản ngang **1920×1080** (chỉ khi `--aspects`) |
| `<project>/clips/<clip_id>/trim_map.json` | `master.py:254` | Bản đồ nguồn ↔ bản cắt (`segments[]` + `duration`) — **bắt buộc** để remap caption |
| `<project>/clips/<clip_id>/master_meta.json` | `master.py:281` | `kept_intervals`, `duration`, `loudness` đo được, `target_lufs`, `cut_mode`, `mix`, `exports` |
| `<project>/clips/master_report.json` | `master.py:296` | Tổng hợp mỗi clip: `clip_id`, `duration`, `loudness`, `exports`, `mix_status` |
| `skills/tvt-auto-cut/reference/output-schema.md` | — | **Cấu trúc JSON đầu ra** (master_meta, trim_map, mix_report, cut_proposal, cut_decision) — file mà `master.py:179` trỏ tới |

### KHÔNG do skill này sinh ra

`contact sheet`, file `.ass` phụ đề, `timeline.json` schema master, b-roll và SFX **không** được bất kỳ script nào trong `skills/tvt-auto-cut/scripts/` tạo ra. Chúng thuộc bộ tool của pack:

```bash
python3 "$ROOT/retention_video_skills_pack/tools/make_ass.py"  <words.json> -o <out.ass> --crop <crop_plan.json>
python3 "$ROOT/retention_video_skills_pack/tools/contact_sheet.py" <video> --crop <crop_plan.json> --ass <out.ass> -o exports/contact_sheet.jpg
python3 "$ROOT/retention_video_skills_pack/tools/render_master.py" <video> --crop <crop_plan.json> --ass <out.ass> --bgm <bgm.mp3> -o exports/master_9x16.mp4
```

---

## 3. QUY TRÌNH THỰC THI

> Quy ước đường dẫn: dùng **đường dẫn tuyệt đối** (CLAUDE.md §1.6). Các script tự resolve `project` theo gốc repo khi đường dẫn không tuyệt đối (`common.py:17`, `common.py:49-51`) — nhưng truyền tuyệt đối để tránh nhầm dự án.

```bash
ROOT="/Volumes/SSD BIG/Project/DICH VU KH 2026/TVT AGENCY/Antigravity/06_TOOLS/VIBE CODING/hyperframes-student-kit"
PROJ="$ROOT/shortform/ten-du-an"
```

### Bước 0 — Kiểm tra môi trường và dựng cây thư mục

```bash
bash "$ROOT/skills/tvt-auto-cut/scripts/setup.sh" ten-du-an --dir shortform
```

- Tạo `$ROOT/shortform/ten-du-an/{raw,audio,transcript,clips,assets,exports}` (`setup.sh:26-27`, `setup.sh:89-92`).
- Kiểm: `ffmpeg`, `ffprobe`, `whisper-cli` (bắt buộc), `python3` + `numpy` (bắt buộc), `playwright` (cảnh báo), model whisper (cảnh báo), `swift` cho nhận dạng mặt (cảnh báo).
- Mã thoát: `0` = đủ; `1` = thiếu thành phần bắt buộc; `2` = thiếu tham số `<project>`.
- Copy video gốc vào `$PROJ/raw/`.

### Bước 1 — Probe: đọc nguồn và chẩn đoán

```bash
python3 "$ROOT/skills/tvt-auto-cut/scripts/probe.py" "$PROJ" --video "$PROJ/raw/input.mp4"
```

- Cờ: `--video <đường dẫn>` (mặc định lấy file video đầu tiên trong `raw/`), `--no-audio-extract`.
- Ghi `probe.json` + `audio/source_48k.wav`.
- **Đọc `issues[]` trong `probe.json` trước khi đi tiếp**: không có stream hình, không có stream âm, tỉ lệ lạ, khung hình đen/đứng tại mốc nào (`probe.py:161-187`). Không phớt lời các cảnh báo này.

### Bước 2 — Bóc băng word-level

```bash
python3 "$ROOT/skills/tvt-auto-cut/scripts/transcribe.py" "$PROJ" \
    --lang vi \
    --model "$HOME/Library/Application Support/com.keyflow.app/models/ggml-medium.bin"
```

- Cờ: `--audio <đường dẫn>` (ghi đè audio lấy từ `probe.json`), `--model`, `--lang vi|en|auto`, `--prompt "<ngữ cảnh>"` (giúp Whisper bớt sai tên riêng), `--no-snap` (tắt bám năng lượng).
- Whisper thường báo từ bắt đầu sớm 0.25–0.4 s → script tự hiệu chỉnh theo bao năng lượng, lấy trung vị chênh lệch và giới hạn ±0.60 s (`transcribe.py:127-146`).
- Sai số tham chiếu ghi trong file: **±0.15 s** với lời nói liền mạch (`transcribe.py:235-236`).

### Bước 3 — Chấm điểm beat (bản lọc sơ)

```bash
python3 "$ROOT/skills/tvt-auto-cut/scripts/beats.py" "$PROJ" --max-pause 0.9 --min-score 0.0
```

- Cờ: `--max-pause` (mặc định 0.9 s — ngưỡng ngắt beat), `--min-score` (mặc định 0.0).
- Nhãn beat: `hook · insight · story · data · objection · payoff · CTA · filler` (`beats.py:24`).
- Trọng số điểm: thông tin 0.30 · cảm xúc 0.20 · cụ thể 0.20 · tranh luận 0.15 · đứng độc lập 0.15 (`beats.py:185-187`).
- **Đây là bản lọc sơ, không phải quyết định cuối** (`beats.py:10-11`). Agent đọc `beats.json`, chọn beat, tự viết hook và ghi lý do vào `pack.json`.

### Bước 4 — Viết `pack.json` (agent tự làm, không có script sinh sẵn)

```json
{
  "project": "ten-du-an",
  "brief": { "topic": "...", "platform": "reels", "language": "vi" },
  "export": { "loudness_lufs": -14, "fps": 30, "aspects": ["9:16", "16:9"] },
  "clips": [
    { "clip_id": "clip_01", "source_start": 25.47, "source_end": 40.38,
      "beat_type": "data", "hook": "...", "reason": "..." }
  ]
}
```

- `master.py` chỉ đọc: `clips[].clip_id`, `clips[].source_start`, `clips[].source_end`, `export.loudness_lufs` (mặc định −14 nếu thiếu, `master.py:46-47`).

### Bước 5 — Sinh đề xuất cắt và ĐỂ NGƯỜI DÙNG DUYỆT (cổng duyệt)

Mô hình hai lớp: lớp ① cắt tự động theo ngưỡng, lớp ② chuyên biệt **chỉ đề xuất** — *đề xuất → duyệt → mới render*.

```bash
# 5.1 — sinh đề xuất cắt (DỪNG, KHÔNG render)
python3 "$ROOT/skills/tvt-auto-cut/scripts/review.py" plan "$PROJ" --all

# 5.2 — đọc đề xuất (mỗi mục có lý do, ngữ cảnh lời nói, mức tin cậy)
python3 "$ROOT/skills/tvt-auto-cut/scripts/review.py" show "$PROJ/clips/clip_01/cut_proposal.json"

# 5.3 — ghi quyết định (accept / reject từng mục)
python3 "$ROOT/skills/tvt-auto-cut/scripts/review.py" approve "$PROJ/clips/clip_01/cut_proposal.json" \
    --accept c001,c003,c005 --reject c002 --by "Tên người duyệt"

# 5.4 — kiểm tra trạng thái duyệt
python3 "$ROOT/skills/tvt-auto-cut/scripts/review.py" status "$PROJ/clips/clip_01/cut_proposal.json"
```

- `plan` ghi `clips/<clip_id>/cut_proposal.json` rồi **dừng** — không sinh video (`review.py:367`).
- Mỗi đề xuất: `id`, `kind` (silence/filler), `action` (compress/drop), mốc nguồn, `keep_sec`, `reason`, `confidence`, `protected`, `evidence` (số đo thô), `context` (lời nói trước/sau/trong vùng).
- `approve` ghi `clips/<clip_id>/cut_decision.json` kèm `proposal_hash`; quyết định chỉ dùng được cho đúng đề xuất đó. Thiếu quyết định cho một mục → `master.py --apply` **dừng** (`review.py:325-339`).
- `reject` = giữ nguyên vùng đó (không cắt). `accept` = cắt như đề xuất. **Chấp nhận toàn bộ = hành vi cắt tự động như bản cũ** (đã kiểm chứng bằng byte-identical).

### Bước 6 — Cắt + master âm thanh (+ trộn BGM, xuất bản kép)

```bash
# 6.1 — bình thường (không cổng duyệt): cắt tự động theo ngưỡng, y hệt bản cũ
python3 "$ROOT/skills/tvt-auto-cut/scripts/master.py" "$PROJ" --all --noise -40 --height 1920

# 6.2 — có cổng duyệt: chỉ cắt theo quyết định đã duyệt
python3 "$ROOT/skills/tvt-auto-cut/scripts/master.py" "$PROJ" --apply "$PROJ/clips/clip_01/cut_decision.json"

# 6.3 — xuất kép 9:16 + 16:9 trong một lần chạy (+ trộn BGM nếu có)
python3 "$ROOT/skills/tvt-auto-cut/scripts/master.py" "$PROJ" --all \
    --aspects 9:16,16:9 --reframe face --bgm "$PROJ/assets/bgm.mp3"
```

- Cờ gốc: `--clip <clip_id>`, `--all`, `--noise <dB>` (mặc định −40), `--height <px>` (mặc định 1920) (`master.py:161-165`).
- Cờ mới: `--apply <cut_decision.json>` (`master.py:166`), `--aspects 9:16,16:9` (`master.py:167`), `--bgm <file>` (`master.py:168`), `--reframe auto|face|anchor_top|center` (`master.py:169-170`).
- Bỏ cả `--clip` lẫu `--all` → xử lý **mọi** clip trong `pack.json`. Nếu `--clip` không khớp `clip_id` nào (hoặc `pack.json` không có clip) thì dừng với thông báo "Không có clip nào khớp" (`master.py:198-202`).
- Nguồn hình lấy từ `probe.json` (`source`), fps lấy từ `probe.json` (`fps`, fallback 30 — `master.py:184-187`).
- Đọc `transcript/words.json` (để xóa filler) và `transcript/beats.json` (để bảo vệ khe thở trước beat `payoff`/`objection` — `master.py:192-196`, `master.py:229`).
- `--apply` **bắt buộc** có quyết định hợp lệ: hash đề xuất lệch → dừng (`master.py:231-239`).

### Bước 7 — Bàn giao (ngoài phạm vi script của skill này)

1. Remap caption bằng `trim_map.json` (`TrimMap.to_out()` trong `common.py:131-140`; từ nằm ngoài vùng giữ trả `None` → cờ `kept: false`).
2. Sinh `.ass` bằng `retention_video_skills_pack/tools/make_ass.py`, dựng contact sheet bằng `retention_video_skills_pack/tools/contact_sheet.py`, render bằng `retention_video_skills_pack/tools/render_master.py` của pack.
3. QC theo mục 6.

---

## 4. QUY TẮC CẮT

Nguồn: `skills/tvt-auto-cut/scripts/review.py` (engine cắt + cổng duyệt; `master.py` gọi vào đó). Số liệu dưới đây là giá trị hằng trong mã.

| Hằng | Giá trị | Vị trí | Ý nghĩa |
|:--|:--|:--|:--|
| `GAP_KEEP` | 0.5 s | `review.py:40` | Khoảng lặng ≤ 0.5 s → **giữ nguyên** (micro-pause trước punchline được bảo vệ) |
| `GAP_MID` | 0.35 s | `review.py:40` | Khoảng lặng 0.5–1.2 s → **nén còn 0.35 s** |
| `GAP_LONG` | 0.25 s | `review.py:40` | Khoảng lặng 1.2–2.5 s → **nén còn 0.25 s** |
| `GAP_DROP` | 0.0 s | `review.py:40` | Khoảng lặng ≥ 2.5 s → **bỏ hẳn** |
| `PAD_IN` | 0.15 s | `review.py:41` | Đệm **trước** mỗi đoạn giữ (áp cho mép trong, không áp mép đầu clip) |
| `PAD_OUT` | 0.20 s | `review.py:41` | Đệm **sau** mỗi đoạn giữ (áp cho mép trong, không áp mép cuối clip) |
| `FILLER_GUARD` | 0.10 s | `review.py:42` | Filler chỉ bị xóa khi có ≥ 0.10 s im lặng **hai bên** |
| `FILLER_MAX` | 0.7 s | `review.py:43` | Filler dài hơn 0.7 s **không** bị xóa (tránh cắt nhầm từ thật) |
| `SILENCE_MIN` | 0.15 s | `review.py:44` | Khoảng lặng ngắn hơn 0.15 s không tính |
| `PROTECT_PAD` | 0.25 s | `review.py:45` | Bán kính cửa sổ bảo vệ quanh beat `payoff`/`objection` |
| `PROTECT_KEEP` | 0.6 s | `review.py:46` | Khe thở tối thiểu khi được bảo vệ |
| `MIN_KEEP` | 0.12 s | `review.py:47` | Đoạn giữ ngắn hơn 0.12 s bị loại khỏi danh sách. *(Hằng cũ `MIN_GAP = 0.18` đã bị gỡ — xem §7 giới hạn 13)* |
| `FILLER_TOKENS` | `ừm, ừ, à, ơ, umi, ehm, ah, um, hmm, ờ, ờ ờ` | `review.py:37` | Từ đệm bị xóa (kèm regex `FILLER_RE` ở `review.py:38`) |
| Ngưỡng im lặng | `--noise` mặc định **−40 dB** | `master.py:164` | Dưới ngưỡng này mới tính là khoảng lặng |

**Bảo vệ khe thở (breath preservation)** — `review.py:135-139`

- Điều kiện: khoảng lặng nằm **liền trước hoặc sau** beat được bảo vệ trong cửa sổ ±0.25 s.
- Beat được bảo vệ: `beat_type` ∈ {`payoff`, `objection`} (`master.py:229`).
- Nếu mục tiêu nén < 0.6 s → **nâng lên 0.6 s** (không cắt sát vào punchline).

**Mức tin cậy của đề xuất** — không phải số tùy ý, tính từ bằng chứng đo được:

- Khoảng lặng: `confidence = purity × min(gap/2.5, 1) × (1 − speech_overlap_ratio)` (`review.py:143`), với `purity` = tỉ lệ khung 20 ms dưới ngưỡng im lặng (`review.py:55-63`), `speech_overlap_ratio` = tỉ lệ bị từ transcript phủ lên vùng (`review.py:77-87`).
- Filler: `confidence = guard_purity × conf(Whisper)` (`review.py:184`); nếu transcript không có trường `conf` thì chỉ dùng `guard_purity`.

**Lượng tử khung hình** — `master.py:60-67`: mọi đoạn được làm tròn về lưới `1/fps` trước khi ghép, đoạn dưới 1 khung bị loại, đảm bảo các đoạn ghép không trôi.

**Khác biệt với tài liệu (code là chuẩn chạy)**

| Nguồn | Quy tắc |
|:--|:--|
| `SOP/SOP-02-ROUGH-CUT-EDL.md` §2 | Giữ nguyên 0.3–0.7 s · > 1.2 s → 0.35 s · > 2.5 s → bỏ · đệm mép 0.06/0.12 s |
| `review.py` (đang chạy) | Giữ nguyên ≤ 0.5 s · 0.5–1.2 → 0.35 · 1.2–2.5 → 0.25 · ≥ 2.5 → bỏ · đệm mép 0.15/0.20 s |
| `config/media_dna.json` (`retention.dead_air_sec` = 0.4) | Dùng bởi tool của pack, không dùng bởi `review.py` |

Khi có xung đột: **code chạy được là chuẩn**; nếu muốn đổi, sửa hằng trong `review.py` và cập nhật cả SOP.

---

## 5. CHUẨN ÂM THANH & AN TOÀN

> **Nguồn sự thật duy nhất: `retention_video_skills_pack/config/media_dna.json`** (JSON thắng bản đọc `MEDIA_DNA_BRAND_GUIDE.md`; in bảng số: `python3 retention_video_skills_pack/tools/brand_dna.py`).

Đích loudness −14 LUFS, true peak ≤ −1.0 dBTP, duck BGM ≥ 12 dB dưới giọng, vùng an toàn 120 px trên / 280 px dưới, cách mặt ≥ 80 px; xuất kép 9:16 + 16:9.
**Chi tiết đầy đủ (bảng thông số, vùng an toàn, chiến lược reframe): [`reference/audio-and-frame-standards.md`](reference/audio-and-frame-standards.md).**

---

## 6. KIỂM THỬ & XÁC NHẬN

QC PASS **không** thay thế việc xem bằng mắt và nghe bằng tai. Phải DỪNG khi: loudness lệch > 0.5 LU, true peak > −1.0, duck < 12 dB, mất âm đầu/đuôi từ, đoạn cắt dính lời, caption lệch > 80 ms, vượt vùng an toàn, cổng duyệt chưa hợp lệ, hoặc `mix_report.json` ≠ PASS.
Chạy test của skill: `python3 -m unittest discover -s skills/tvt-auto-cut/tests` (74 test, ~70 s).
**Chi tiết (kiểm bằng số, quy tắc QC, bảng FAIL đầy đủ): [`reference/qa-and-validation.md`](reference/qa-and-validation.md).**

---

## 7. GIỚI HẠN ĐÃ BIẾT

Nguồn: `retention_video_skills_pack/AUDIT_REPORT_2026-10-21.md` §1–§3, §6, đối chiếu với mã nguồn của skill này.

| # | Giới hạn | Bằng chứng |
|:-:|:--|:--|
| 1 | **Renderer chưa render b-roll hay SFX.** Timeline ghi kèm `visual.prompt` và `sfx[]` nhưng không có đường dựng chúng | Audit §2 (trụ cột 1): "renderer chỉ thực thi zoom + caption (chưa render b-roll/SFX)"; §6 xếp "Render b-roll/SFX từ timeline" vào việc chưa làm |
| 2 | **Không có stage khử nhiễu / de-esser / de-reverb có kiểm chứng.** `master.py` có `afftdn` + `deesser` trong chain (`master.py:104-105`) nhưng **không có de-reverb** và **không đo trước/sau** | Audit §2 (trụ cột 2) ghi "Chưa có khử ồn/de-esser/de-reverb" cho đường render của pack; §6: "khử nhiễu / de-esser (`afftdn`, `deesser`) có đo trước/sau" là việc chưa làm. Không được phát biểu là đã khử nhiễu đạt chuẩn |
| 3 | **Chuyển cảnh không được phát hiện mềm.** Chuyển cảnh dạng morph bố cục không bị scene-detect bắt, chỉ lộ khi xem contact sheet | Audit §2 (trụ cột 3) |
| 4 | **Độ khớp caption ≤ 80 ms CHƯA được đo.** Chưa có tập ground-truth để đối chiếu mốc Whisper | Audit §2 (trụ cột 4): "Độ khớp ≤80 ms **chưa đo được** (không có ground-truth)"; §6 đề xuất đo bằng tập gõ tay ≈ 30 câu |
| 5 | **Cả pack tự chấm 73/100** — "dùng được, còn giới hạn đã nêu (chưa đủ để gọi PRODUCTION-READY)" | Audit §1, bảng "Trước / Sau". Không được mô tả pack này là production-ready |
| 6 | **Skill này không sinh contact sheet, `.ass`, `timeline.json`, b-roll, SFX.** Chỉ sinh `master.mp4`, `master_vo.wav`, `trim_map.json`, `master_meta.json`, `master_report.json` (+ `master_mix.wav`, `master_9x16.mp4`, `master_16x9.mp4`, `mix_report.json`, `cut_proposal.json`, `cut_decision.json` khi bật cờ tương ứng) | Đối chiếu mã nguồn `skills/tvt-auto-cut/scripts/` (4 script Python cũ + `review.py`, `reframe.py`, `mix.py` + 1 shell) |
| 7 | **Reframe 16:9 mới chỉ dùng MỘT tọa độ mặt cho cả clip** (trung vị các khung lấy mẫu) — không bám từng khung, không có shot detection. Clip có chuyển cảnh cắt mặt sẽ lệch | `reframe.py:152-180` (trung vị trên 12 mẫu) |
| 8 | **Dò mặt phụ thuộc môi trường**: `auto` thử OpenCV Haar (`cv2`) trước, **không có thì dùng macOS Vision** (cần `swift` + `tools/face_box.swift`); không có detector nào thì rơi về vị trí tĩnh và **không** dò được vùng mặt. `--reframe face` dùng cùng chuỗi dò nhưng bắt buộc phải ra kết quả, không thì lệnh dừng | `reframe.py:102-149`, `reframe.py:165-169`, `reframe.py:183-203` |
| 9 | **Chưa thử trên Linux/Ubuntu** (chỉ kiểm cú pháp) và workflow n8n chưa import-test trên n8n thật | Audit §2 (trụ cột 5b, 5a) |
| 10 | **Cổng duyệt chỉ quyết định CẮT, không duyệt nội dung.** Bản thu được giữ nguyên; skill không tự sửa ngữ nghĩa, không chèn số liệu ngoài transcript | `review.py:108-114` (chỉ sinh đề xuất), `review.py:214-227` (`reject` = giữ nguyên vùng) |
| 11 | **Đệm mép 0.15/0.20 s chồng lên vùng vừa nén** → thời lượng sau cắt có thể **dài hơn** cửa sổ nguồn (đo thật: 60 s nguồn → 61.53 s sau cắt), và ngưỡng "nén còn 0.35 s" không đạt đúng 0.35 s. Chưa sửa vì sẽ đổi hành vi bản cũ | `review.py:41` (PAD_IN/PAD_OUT) + `review.py:229-253` (đệm sau khi ghép) — cần một quyết định riêng |
| 12 | **Loudness 2 lượt không luôn chạm −14 LUFS** khi nội dung có độ trải rộng lớn (đo thật trên footage thật: −15.2 LUFS, lệch 1.2 dB). `linear=true` bị giới hạn bởi true peak | `master.py:111-117` + `common.py:229-247` |
| 13 | **Hằng `MIN_GAP = 0.18` đã bị gỡ khỏi engine cắt** (P0, 22/10/2026). Nó là **hằng chết** — khai báo nhưng không được tham chiếu ở đâu cả, nên không ảnh hưởng output. Hằng đang chạy cho ngưỡng "đoạn giữ tối thiểu" là `MIN_KEEP = 0.12` (`review.py:47`). Lưu ý: `templates/hyperframes/align.py` còn một hằng trùng tên `MIN_GAP = 0.18` nhưng mang nghĩa **ngưỡng tách cụm lời** ở bước căn thời gian — **không** phải ngưỡng cắt khoảng lặng | `review.py:40-47` (bảng hằng) · grep `skills/tvt-auto-cut/` = **0 kết quả** |

---

## 8. VÍ DỤ GỌI LỆNH

Người dùng gõ thẳng, không nói tên skill:

1. *"Edit video này giúp tôi nha — cắt hết khoảng lặng và mấy tiếng ừm ờ, bỏ câu chào, rồi xuất cho tôi bản dọc 9:16 để đăng TikTok."*

2. *"Dựng video talking-head từ file quay 20 phút này: bóc transcript tiếng Việt, chấm điểm từng beat để tôi chọn đoạn nào đáng giữ, sau đó cắt theo các beat đó và master lại âm thanh về -14 LUFS."*

3. *"Cho tôi một bản 9:16 và một bản 16:9 từ video này, giữ khe thở trước punchline, rồi xuất contact sheet để tôi duyệt mắt trước khi gửi khách."*

4. *"Cắt khoảng lặng cho file này, sau đó làm phụ đề word-by-word khớp giọng nói và kiểm tra xem có chữ nào lọt ra ngoài vùng an toàn không."*

5. *"Cắt video này nhưng đừng tự quyết — list ra các đoạn im lặng dài kèm lý do để tôi duyệt, tôi sẽ chọn cái nào bỏ cái nào giữ."*

## Tham Số Đầu Vào Của Kỹ Năng
- **raw_footage_path** (Đường dẫn file video hoặc âm thanh thô cần cắt gọn): `{{raw_footage_path}}`

