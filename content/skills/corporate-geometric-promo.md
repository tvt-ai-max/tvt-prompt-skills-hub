---
id: corporate-geometric-promo
title: "Corporate Geometric B2B Promo Video Pipeline"
description: "Corporate Geometric B2B Promo Video Pipeline — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["Video", "B2B Promo", "Corporate Geometric", "Motion Graphics", "Royal Blue", "Service Launch"]
inputs:
  - name: campaign_title
    type: string
    description: "Tên chiến dịch hoặc dịch vụ ra mắt"
    required: true
  - name: key_pillars
    type: textarea
    description: "3 - 4 trụ cột thông điệp chính"
    required: true
audit_gates: ["Brand Palette Compliance Gate", "Typography Stagger Motion Gate", "Broadcast Standard -14 LUFS"]
created_at: "2026-11-03"
---
# SKILL: Corporate_Geometric_Promo

> Đóng gói từ dự án `toilatung.com` (27/09/2026) theo SOP-04. Phong cách lấy cảm hứng từ template Envato "Corporate Strategy Promo" nhưng dựng lại hoàn toàn bằng HTML/CSS, không dùng tài nguyên của template.
> Kiểm chứng: build lại nội dung toilatung bằng skill → khác biệt pixel **0.00%** so với video đã giao (trừ 0.3% ở 1 khung do mốc tự động chính xác hơn mốc nhập tay).

---

## Dùng khi nào

- ✅ Dùng khi cần video intro/giới thiệu thương hiệu, dịch vụ, founder cho TikTok/Reels/YouTube/Facebook/website.

## 1. MỤC TIÊU VÀ BỐI CẢNH

| | |
|:--|:--|
| **Dùng cho** | Intro thương hiệu, giới thiệu dịch vụ/founder, teaser sản phẩm, CTA về website |
| **Thời lượng** | 12–30s voice (4 cảnh) + giữ CTA ~1.15s |
| **Tỉ lệ** | `16x9` 1920×1080 (YouTube, Facebook, web) · `9x16` 1080×1920 (TikTok, Reels, Shorts) — sinh cùng lúc |
| **Nhịp** | 4 hồi cố định: **Hook → System → Tiers (value stack) → CTA** |
| **Không dùng khi** | Cần footage/b-roll video thật, > 4 cảnh, hoặc tông tối "Quiet Authority" (dùng `motion-showreel-standard`) |

### Pipeline 1 lệnh mỗi bước

```bash
# 1. Căn giọng (voice ElevenLabs/thu âm + script chuẩn) → alignment.json
python3 templates/hyperframes/align.py sources/raw_audio/<vo>.mp3 <script.txt> sources/transcripts/<name>_alignment.json

# 2. Viết video.json (copy examples/toilatung.video.json), rồi sinh project 16:9 + 9:16
python3 skills/corporate-geometric-promo/scripts/build.py <video.json>

# 3. QA tự động (safe margin + chữ tràn khung) — xem ảnh trong sources/renders/qa/<project>/
python3 templates/hyperframes/render.py templates/<project>_16x9 --qa

# 4. Render MP4 (tự chạy QA trước, FAIL thì không render)
python3 templates/hyperframes/render.py templates/<project>_16x9
```

**Không sửa tay `templates/<project>_*/index.html`** — sửa `video.json` rồi build lại.

---

## 2. HỆ THỐNG DESIGN TOKENS

### Màu (`kit/style.css`)
| Token | Giá trị | Dùng cho |
|:--|:--|:--|
| `--navy` | `#04245e` | Tấm wipe, chữ trên nút mint |
| `--blue-800` → `--blue-600` | `#0540a8` → `#0a52cc` | Gradient nền. **Không bao giờ sáng hơn `#0a52cc` ở vùng có chữ** |
| `--mint` | `#2ef0b0` | Nhãn, gạch chân, từ nhấn, khối trang trí, nút CTA |
| `--ink` / `--ink-soft` | `#0b1f44` / `#3b4a66` | Chữ trong thẻ trắng |

Tương phản đo pixel trên render thật: trắng/nền ≥ 7:1 · mint/nền ≥ 4.8:1 · navy/mint ≈ 10:1 · chữ trong thẻ trắng ≥ 6.5:1.

### Typography — `Be Vietnam Pro` (dấu tiếng Việt chuẩn, có nét 200)
| Vai trò | 16:9 | 9:16 |
|:--|:--|:--|
| Headline hook (`xl`, 800) | 50px | 52px |
| Headline system (`lg`) / tiers (`md`) | 32 / 30px | 31 / 30px |
| Chữ khổng lồ (`big-word`, **200**, line-height **1.3**) | 88px | 72px |
| Domain CTA (900) | 56px | 50px |
| Nhãn `kicker` (800, tracking .16em) | 11px | 11px |

### Layout & vùng an toàn
- Canvas CSS 960×540 / 540×960, render `device_scale_factor: 2`.
- Safe: **16:9** 10% mọi cạnh (x 96–864, y 54–486) · **9:16** trên 10%, dưới 15%, hai bên 10% (x 54–486, y 96–816).
- Tọa độ từng loại cảnh nằm trong `scripts/build.py` → `LAYOUT` (đã qua QA). Đổi bố cục = sửa `LAYOUT`, không sửa HTML sinh ra.

---

## 3. LOGIC XỬ LÝ DỮ LIỆU ĐẦU VÀO

### 3.1 Đầu vào bắt buộc
1. **Voiceover** (mp3/wav) + **script chuẩn** đúng từng chữ đã đọc. `align.py` từ chối nếu Whisper khớp < 90% script.
2. **Ảnh chân dung/sản phẩm** lưu **trong repo** (`sources/branding/`) — không link URL ngoài (website sập = render hỏng).
3. `video.json` theo schema dưới.

### 3.2 Schema `video.json`
```jsonc
{
  "project": "ten_du_an",                    // → templates/ten_du_an_16x9/, _9x16/
  "brand": { "name": "TÊN THƯƠNG HIỆU", "url": "domain.com", "portrait": "sources/branding/x.webp", "portrait_alt": "..." },
  "voice": { "audio": "sources/raw_audio/x.mp3", "alignment": "sources/transcripts/x_alignment.json" },
  "aspects": ["16x9", "9x16"],
  "hold_end": 1.15,                          // giữ CTA sau lời cuối (s)
  "scenes": [ /* đúng 4 cảnh: hook, system, tiers, cta — theo thứ tự lời đọc */ ]
}
```
- **`voice` của mỗi cảnh** = đúng đoạn lời đọc trong cảnh đó. Ghép 4 đoạn phải ra toàn bộ alignment (build báo lỗi nếu lệch).
- **`cue`**: cụm từ được đọc trong cảnh (`"tự động"`) → phần tử xuất hiện đúng lúc đọc; hoặc số giây tính từ đầu cảnh (`0.3`).
- **Headline có đọc**: `|` tách token highlight theo giọng · ` / ` xuống dòng · ` // ` chỉ xuống dòng ở 9:16 · tiền tố `*` = màu mint · `~` = gạch ngang.
- **Ranh giới cảnh tự tính**: 0.4s trước câu đầu của cảnh mới, không sớm hơn lời cuối cảnh trước + 0.2s.

### 3.3 Danh mục cảnh & giới hạn nội dung

| `type` | Trường | Giới hạn để không tràn khung |
|:--|:--|:--|
| `hook` | `kicker`, `headline` (có đọc), `big` | Headline ≤ 3 dòng × ~16 ký tự |
| `system` | `kicker` (+cue), `headline` (có đọc), `chips` ≤ 3, `flow.nodes` 3–4, `big` | Dòng headline ≤ ~22 ký tự · node ≤ 26 ký tự · chip ≤ 16 |
| `tiers` | `kicker`, `title` (không đọc), đúng **3** `tiers` {tag, title, desc, price, cue}, `big` | title ≤ 24 · desc ≤ 50 · price ≤ 10 ký tự |
| `cta` | `kicker`, `lead`, `domain` {text, cue}, `button`, `micro`, `big` | domain ≤ 16 ký tự |
| mọi cảnh | `big` {text, cue} | ≤ 10 ký tự (chữ khổng lồ) |

Vượt giới hạn → QA tự động báo FAIL; rút gọn chữ trước khi nghĩ tới đổi cỡ font.

---

## 4. CHIẾN LƯỢC TẠO HOẠT CẢNH

**Nguyên tắc: mọi chuyển động là hàm của `t`.** Engine chung `templates/hyperframes/promo_engine.js` đặt biến CSS `--p` (0→1, easeOutExpo, 0.6s) cho mọi phần tử `[data-in]`; CSS dùng `--p` cho opacity/translate/scale/clip. Không có animation phụ thuộc đồng hồ thật → `window.seek(t)` luôn cho cùng một khung hình.

| Hiệu ứng | Cơ chế | Thời lượng |
|:--|:--|:--|
| Vào cảnh (`rise`, `pop`, `grow`) | `--p`: trượt 24px + fade / scale .9→1 / scaleX | 0.6s easeOutExpo |
| Ảnh ghép 3 mảnh | clip-path + trượt ngược chiều ±70px, stagger 0.1s, **ghép liền không khe** | 0.6s |
| Chữ khổng lồ | tách từng ký tự, stagger 0.045s, trượt 40px | 0.5s/ký tự |
| Highlight theo giọng (`.w`) | `.active`/`.done` theo `data-start/end` từ alignment; từ chưa đọc opacity .38 | transition 0.18s |
| Wipe chuyển cảnh | tấm navy + mép mint/trắng quét trái→phải, phủ kín đúng ranh giới cảnh | ±0.32s easeInOutCubic |
| Trang trí trôi (`float`) | `translate: sin(t·1.3rad)·6px` | liên tục |

Preview có tiếng: mở `index.html` qua HTTP, **click** để phát (trình duyệt chặn autoplay có âm thanh). `?render=1` tắt autoplay cho headless.

---

## 5. CHECKLIST KIỂM THỬ THỊ GIÁC

`render.py --qa` tự kiểm hình học; các mục còn lại phải soát mắt trên ảnh QA 1080p:

- [ ] **Tự động:** mọi khối chữ, thẻ, chữ khổng lồ nằm trong safe margin; từ highlight không tràn thẻ chứa nó.
- [ ] **Tương phản đo trên pixel render thật**, tại đúng vị trí chữ — không suy từ mã màu (gradient đổi màu theo vị trí).
- [ ] Không có từ ghép bị ngắt giữa dòng ("tự động / hóa") → thêm ` / ` vào headline.
- [ ] Không có gạch nối bị ngắt dòng ("1- / Click") → build tự đổi `-` trong tier title thành gạch nối không ngắt.
- [ ] Ảnh ghép liền mạch, không vệt dọc ở chỗ nối.
- [ ] Trang trí mint không đè chữ (script không kiểm va chạm giữa các khối).
- [ ] Soát khung quanh mỗi ranh giới cảnh: wipe phủ kín, không lộ cảnh cũ.
- [ ] Sau render: `ffmpeg -v error -i out.mp4 -f null -` = **0 lỗi giải mã**.

### Bài học từ dự án gốc (lỗi đã gặp — đã xử lý trong kit, đừng hồi quy)
| Triệu chứng | Nguyên nhân | Đã xử lý |
|:--|:--|:--|
| QA "đạt" nhưng video thật tràn viền | `#viewport` bị flexbox co về bề rộng cửa sổ | `flex-shrink: 0`; QA chạy ở canvas thật @2x |
| Dấu nặng / chân chữ g, y lọt khỏi vùng an toàn | `line-height: 1` không bao descender | `line-height: 1.3` cho chữ khổng lồ |
| Vạch xanh chạy qua mặt nhân vật | khe `gap` giữa 3 mảnh ảnh | gap 0; build bắt bề rộng chia hết cho 3 |
| Nhãn mint 3.4:1 | gradient sáng tới `#1666ea` ở nửa phải | trần độ sáng `#0a52cc` |
| Highlight lệch giọng 0.3–0.4s | tin timestamp Whisper | `align.py` dùng biên năng lượng (±20ms) |
| MP4 hỏng hàng trăm lỗi | 2 lần render ghi cùng file | render ra file tạm theo PID rồi đổi tên nguyên tử — **vẫn không nên chạy 2 render cùng lúc** |
| Render quá hạn 30s | ảnh tải từ website đang sập | mọi asset nằm trong repo |
| `window.seek()` bị autoplay đè | vòng lặp play() gọi seek mỗi frame | `window.seek` luôn pause trước |

### Giới hạn hiện tại
- Chưa có nhạc nền/SFX (mix thủ công bằng ffmpeg, duck -18 dB dưới voice).
- Đúng 4 loại cảnh theo thứ tự cố định; cảnh mới = thêm hàm trong `scene_html()` + tọa độ trong `LAYOUT` cho cả 2 tỉ lệ.
- Font tải từ Google Fonts khi render (cần mạng).

---

## CẤU TRÚC SKILL
```
skills/corporate-geometric-promo/
├── SKILL.md                      # tài liệu này
├── scripts/build.py              # video.json → templates/<project>_16x9 / _9x16
├── kit/style.css                 # tokens + primitives, ghi đè 9:16 qua [data-aspect]
└── examples/toilatung.video.json # ví dụ đầy đủ = video toilatung đã giao
```
Lõi dùng chung (cùng skill `tvt-service-promo`): `templates/hyperframes/` → `align.py` (căn giọng), `promo_core.py` (cue/ranh giới cảnh/alignment nháp), `promo_engine.js` (timeline), `render.py` (QA + MP4).
`build.py --draft` (hoặc chưa có alignment) dựng bản nháp không tiếng để xem bố cục trước khi thu voice.

## Tham Số Đầu Vào Của Kỹ Năng
- **campaign_title** (Tên chiến dịch hoặc dịch vụ ra mắt): `{{campaign_title}}`
- **key_pillars** (3 - 4 trụ cột thông điệp chính): `{{key_pillars}}`

