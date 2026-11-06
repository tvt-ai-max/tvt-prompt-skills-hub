---
id: screen-review-explainer
title: "Screen Recording to 9:16 Viral Explainer Pipeline"
description: "Screen Recording to 9:16 Viral Explainer Pipeline — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["Video", "Screen Recording", "9:16 Explainer", "Tool Review", "Motion Graphic Overlay", "Social Media"]
inputs:
  - name: screen_footage_path
    type: string
    description: "File quay màn hình demo tool hoặc dashboard"
    required: true
  - name: headline_hook
    type: string
    description: "Tiêu đề giật tít Hook 3 giây đầu tiên"
    required: true
audit_gates: ["Safe Zone 9:16 Reels/Shorts Gate", "EDL Audio Sync Gate", "Text Legibility Contrast Gate"]
created_at: "2026-11-03"
---
# SKILL: screen-review-explainer

> Dành cho **footage quay màn hình có giọng nói thật** (demo tool, review app, audit số liệu) cần lên short 9:16 mà không muốn lồng tiếng lại.
> Sinh ra từ bản dựng `review-dsh-glm-5.3.MOV` → `templates/dsh_glm_review_9x16/`.

---

## 1. DÙNG KHI NÀO

| | |
|:--|:--|
| **Dùng cho** | Nguồn là **quay màn hình** (không talking-head), có giọng người thật, cần cắt gọn rồi phủ Big Headline + MG |
| **Khác `ai-model-audit-reveal`** | Skill kia dựng **từ số 0** trên sân khấu tối, không dùng footage. Skill này **tái sử dụng footage thật** làm lớp nền và chỉ phủ lớp MG lên |
| **Khác `toilatung-talkinghead`** | Kia là founder nói trực diện 16:9. Đây là screen recording 9:16 |
| **Tỉ lệ** | 9:16 · canvas 1080×1920 @ scale 1 |
| **Không dùng khi** | Có talking-head (dùng `toilatung-talkinghead`), video dịch vụ TVT (`tvt-service-promo`), promo 4 cảnh (`corporate-geometric-promo`) |

---

## 2. PIPELINE

```bash
# 0. Ghi kế hoạch: STORYBOARD/<brand>/<tên>.video.json  (edl + scenes + facts)

# 1. Cắt VO + dựng lớp broll theo CÙNG một EDL
python3 skills/screen-review-explainer/scripts/build_edit.py STORYBOARD/<brand>/<tên>.video.json

# 2. Căn từ trên VO đã cắt (SOP-01) — kiểm chứng mối nối không cắn chữ
python3 templates/hyperframes/align.py sources/audio/<p>/vo.wav sources/audio/<p>/vo_script.txt \
        STORYBOARD/<brand>/<tên>_alignment.json --accept-misses

# 3. video.json → templates/<project>/  (index.html + render_config.json + captions.vi.srt)
python3 skills/screen-review-explainer/scripts/build_template.py STORYBOARD/<brand>/<tên>.video.json

# 4. Duyệt mắt trước khi render (tuỳ chọn)
python3 skills/screen-review-explainer/scripts/preview.py templates/<project> "3,20,50,90,110"

# 5. QA vùng an toàn → render lớp MG (ProRes 4444 + alpha)
python3 templates/hyperframes/render.py templates/<project> --qa
python3 templates/hyperframes/render.py templates/<project>

# 6. Ghép 3 lớp + SFX
python3 skills/screen-review-explainer/scripts/composite.py STORYBOARD/<brand>/<tên>.video.json
```

**Không sửa tay `templates/<project>/`** — sửa `video.json` rồi build lại.

---

## 3. KIẾN TRÚC 3 LỚP — ĐIỂM CỐT LÕI

```
lớp 3  MG overlay    HTML/CSS → ProRes 4444 (alpha)     ← Big Headline, counter, chip, lower-third
lớp 2  broll         ffmpeg, cắt ĐÚNG edl của audio    ← nền blur + cửa sổ app sắc nét
lớp 1  audio         VO cắt từ nguồn + SFX (amix)      ← giọng thật, không lồng lại
```

**Vì sao không nhét `<video>` vào HTML:** `render.py` chụp từng frame bằng screenshot đồng bộ; seek video trong browser cần await nên dễ trôi frame. Tách broll ra ffmpeg thì mỗi frame vẫn deterministic, và broll/audio khớp nhau vì **dùng chung EDL**.

**Vì sao `broll` và `audio` phải chung EDL:** nếu broll lấy dải liền mạch còn audio cắt rời thì hình sẽ nói một đằng, lời một nẻo. Chung EDL ⇒ không bao giờ lệch.

---

## 4. SCHEMA `video.json`

| Khoá | Ý nghĩa |
|:--|:--|
| `edl[]` | `{id, in, out, text}` — `in/out` là giây **trên video nguồn**; `text` là lời đã hiệu chỉnh tay |
| `cuts_removed[]` | `{range, why}` — bắt buộc ghi, để người sau biết đã bỏ gì |
| `lead_in_seconds` / `tail_seconds` | đệm im lặng đầu/cuối; `build_edit` dịch mọi mốc cảnh theo lead-in |
| `broll.window_crop` | `{x,y,w,h}` vùng cửa sổ app cần giữ sắc nét |
| `broll.place_y` | đặt crop đó ở đâu trên canvas |
| `broll.bg_blur` / `bg_darken` | biến phần thừa của khung gốc thành nền mờ tối |
| `scenes[]` | `{id, type, start, end, chapter, headline[], ...}` — `start/end` trên **timeline đã cắt** (chưa cộng lead-in) |
| `facts` | số liệu đã đối chiếu — nguồn duy nhất cho mọi con số hiện lên hình |

`type`: `card` (thẻ toàn màn hình, che hẳn broll) · `overlay` (chỉ phủ chữ, broll lộ ra).
`broll_mode`: `card` · `broll` · `pip`.

### Các trường nội dung

| Trường | Sinh ra |
|:--|:--|
| `chapter` | nhãn chặng (`.chip-chapter`); `tone: "alert"` → đỏ |
| `headline[]` | Big Headline từng dòng; `accent_word` bọc `<em>` gradient |
| `stats[]` | dải chip chỉ số (`{label, value, count}`) |
| `counters[]` | số đếm lớn (`{label, value, unit}`) — `value` nhận `"$0.75"`, `"18,1"`, `"93"` |
| `checklist[]` + `result[]` | danh sách tick dần; `beats` chỉnh nhịp |
| `punch` | câu chốt nền mint |
| `lower3` | phụ đề tóm ý cho cảnh overlay (đồng thời vào `captions.vi.srt`) |
| `sub` | dòng phụ dưới headline |

---

## 5. BẪY ĐÃ CÀI — ĐỪNG HỒI QUY

| Triệu chứng | Nguyên nhân & cách sửa |
|:--|:--|
| Headline **xuống hàng** làm tràn đáy vùng an toàn | Chữ 104px dài hơn 842px bề ngang. `build_template.fit_size()` co cỡ theo `len(line) × 0.70`; `.hl-line` phải có `white-space: nowrap`. Hệ số 0,70 là **đo thực tế** cho Plus Jakarta Sans 900 — đừng hạ xuống 0,61 (đã tràn 10px) |
| QA báo hộp `em` cao hơn hộp cha ~12px | `line-height` chặt hơn font metric. Dùng `1.14` + `padding` dọc cho `.hl` |
| QA báo tràn 5px mỗi bên **chỉ ở frame giữa animation** | Hiệu ứng **phóng to** khi vào. Đổi sang **thu nhỏ về đích**: `data-sc` **âm** (scale 0,95→1). Phần tử đã phủ hết bề ngang vùng an toàn thì **cấm** dùng `data-dx` |
| Phần tử đang bay vào bị QA bắt tràn | QA bỏ qua phần tử có `opacity === 0`, nhưng opacity lên nhanh hơn translate (easeOutExpo) → vẫn lọt. Cách chắc ăn: cho trượt **vào trong** (`data-dy` dương cho khối neo đáy) hoặc scale âm |
| Counter mất đơn vị | `motion.js` ghi vào `[data-count-digits]` nếu có; luôn bọc `<span data-count-digits>` khi số có `<em>` hậu tố |
| Brandbar/lower-third lọt mốc dưới | Vùng an toàn 9:16 chốt ở `y = 1632`. `.lower3` dùng `bottom: 356px`, `.brandbar` dùng `bottom: 300px` |
| Phụ đề sai chính tả thuật ngữ | **Không** lấy phụ đề từ transcript whisper. Whisper nghe sai gần hết tên riêng (`DeepSeek Harness` → "bếp xích Harnet"). Phụ đề sinh từ `headline/lower3` viết tay |
| Broll ngắn hơn VO vài trăm ms | `composite.py` đã `tpad=stop_mode=clone` rồi `trim` theo đúng `duration` |
| Nguồn có display matrix xoay | `ffmpeg` tự autorotate; **kiểm tra `ffprobe` trước** để biết khung thật là dọc hay ngang |

---

## 6. CẤU TRÚC

```
skills/screen-review-explainer/
├── SKILL.md
├── kit/
│   ├── style.css                  # sân khấu tối + Big Headline + counter/checklist/pip/outro
│   └── motion.js                  # engine deterministic: --p, data-count, .w, wipe, progress
└── scripts/
    ├── build_edit.py              # video.json → vo.wav + broll.mp4 + timeline.json + vo_script.txt
    ├── build_template.py          # video.json + timeline.json → templates/<project>/
    ├── preview.py                 # chụp vài mốc ra PNG (duyệt mắt, không cần render full)
    └── composite.py               # broll + overlay(alpha) + SFX → MP4 cuối
```

Lõi dùng chung (không sửa khi dùng skill này): `templates/hyperframes/render.py`, `align.py`, `promo_core.py`.

---

## 7. VÙNG AN TOÀN & GIỚI HẠN

- Vùng an toàn 9:16: `x [108, 950]`, `y [192, 1632]`. **Toàn bộ chữ của lớp overlay** phải nằm trong đây — đó là điều kiện QA tự động.
- **Lớp broll phủ tràn khung** (footage, không phải chữ). Ghi rõ để không hiểu nhầm là QA bỏ sót.
- Nhạc nền: `sources/audio/licensed/` hiện **trống** → pipeline chỉ trộn **SFX**. Muốn có nhạc phải bổ sung track được cấp phép trước.
- Chỉ xuất **9:16**. Bố cục headline-đè-footage không scale máy móc sang 16:9 được.

## Tham Số Đầu Vào Của Kỹ Năng
- **screen_footage_path** (File quay màn hình demo tool hoặc dashboard): `{{screen_footage_path}}`
- **headline_hook** (Tiêu đề giật tít Hook 3 giây đầu tiên): `{{headline_hook}}`

