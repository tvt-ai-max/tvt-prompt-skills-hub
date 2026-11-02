---
id: tvt-service-promo
title: "B2B Service Showcase Video Production Assembly Line"
description: "B2B Service Showcase Video Production Assembly Line — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: video
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Service Promo", "B2B Video", "Agency Delivery", "White Card Clean", "Conversion Video"]
inputs:
  - name: service_name
    type: string
    description: "Tên gói dịch vụ cần quảng bá (SEO, Web Design, Hosting, AI Agent)"
    required: true
  - name: target_client_pain
    type: textarea
    description: "Nỗi đau lớn nhất của khách hàng B2B cần tháo gỡ"
    required: true
audit_gates: ["Brand Identity Navy & Orange Gate", "4-Scene Progression Gate", "Zero Helpless Disclaimer Gate"]
created_at: "2026-11-03"
---
# SKILL: TVT_Service_Promo

> Đóng gói 27/09/2026 theo SOP-04. Phong cách tham khảo template Envato "Design Studio & Website Presentation" (xấp website xòe, số liệu + lưới website 3D, quy trình từng bước, màn kết logo) — dựng lại bằng HTML/CSS, **không dùng tài nguyên template**, đổi hoàn toàn sang nhận diện TVT nền trắng.
> Dùng chung lõi với `corporate-geometric-promo`: `templates/hyperframes/{align.py, promo_core.py, promo_engine.js, render.py}`.

---

## Dùng khi nào

- ✅ Dùng cho mọi video quảng cáo/giới thiệu dịch vụ TVT Agency.
- ⛔ Không dùng cho video cá nhân của Tùng (→ toilatung-kinetic-reel / tvt-vlog-talkinghead) hay explainer dài (→ tvt-master-motion-explainer).

## 1. MỤC TIÊU VÀ BỐI CẢNH

| | |
|:--|:--|
| **Dùng cho** | Quảng cáo / giới thiệu từng dịch vụ TVT Agency — danh mục ở `catalog/services.json` (17 dịch vụ, 4 nhóm) |
| **Thời lượng** | 15–35s voice, 4–7 cảnh, cảnh cuối luôn là CTA |
| **Tỉ lệ** | `16x9` 1920×1080 (YouTube, Facebook, web) · `9x16` 1080×1920 (Reels, TikTok, Shorts) |
| **Mạch nội dung** | Pain → Sai hệ → Nhìn lại → Giải pháp hệ → CTA (Brand DNA) |
| **Không dùng cho** | Kênh Tùng cá nhân / Toilatung / Lexi (brand khác) |

### Dây chuyền — theo **SOP-06** (`SOP/SOP-06-TVT-SERVICE-VIDEO.md`)

```bash
T="python3 skills/tvt-service-promo/scripts/tvt_video.py"
$T list                          # 17 dịch vụ + cảnh báo brand từng dịch vụ
$T new <slug>                    # chụp trang dịch vụ (desktop/tablet/phone) + sinh STORYBOARD/tvt/<slug>.video.json
                                 #   → soát ảnh chụp, điền mọi TODO (khung catalog/service.skeleton.json)
$T build <slug>                  # dựng NHÁP khi chưa có voice → $T qa <slug> → soát bảng review
$T script <slug>                 # kiểm brand + xuất lời voice (đếm âm tiết, cảnh báo hook dài)
$T voice <slug> <ElevenLabs.mp3> # chuẩn hoá -16 LUFS + căn giọng từng từ
$T build <slug>                  # bản chính (số liệu phải verified) → $T qa <slug>
$T render <slug>                 # MP4 16:9 + 9:16 + .vi.srt, tự kiểm lỗi giải mã/LUFS/đỉnh
$T status <slug>                 # tiến độ
```
Các script con (`build.py`, `brand_check.py`, `capture.py`, `mockup.py`, `templates/hyperframes/align.py|render.py`) vẫn chạy riêng được khi cần.

**Cổng brand + cổng giấy phép chạy trước mọi lần build.** FAIL → không dựng. Bản nháp (chưa voice / số liệu chưa duyệt / tài sản chưa có giấy phép) tự gắn nhãn đỏ "BẢN NHÁP · <lý do>" ở lề dưới — không thể vô tình đăng.

---

## 2. HỆ THỐNG DESIGN TOKENS (`brand.json`, `kit/style.css`)

### Màu — nền trắng chủ đạo (Design System 5.5 · White W41)
| Token | Hex | Luật |
|:--|:--|:--|
| Nền / panel / viền | `#FFFFFF` / `#F5F7FA` / `#E2E8F0` | ~80–90% diện tích là trắng |
| Navy | `#003189` | Mọi headline, số liệu, đường nối — 11.7:1 trên trắng |
| Chữ / chữ phụ / trạng thái cũ | `#1A1A1A` / `#475569` / `#556277` | Trạng thái cũ 5.7:1 trên panel — `#64748B` chỉ 4.43:1, không dùng |
| Cam | `#FA8A1A` | **Chỉ** gạch chân marker, chấm/đường trạng thái, **một** nút CTA. **Không bao giờ là màu chữ trên trắng (2.4:1)** |
| Chữ trên cam | `#161615` | 7.5:1 |
| Cấm | `#00F0FF`, `#67E8F9`, nền tối, glow | Quyết định founder 11/09/2026 |

### Logo (một logo chính thức mỗi khung)
- Cảnh 1…n-1: watermark `sources/branding/tvt/logo-horizontal.png` góc trái trên (cao 24px CSS) + `tvtagency.com` góc phải.
- Cảnh CTA: `sources/branding/tvt/logo-stacked.png` (file chính thức "tvt logo big.png") top-center, watermark ẩn.
- Giữ nguyên màu/tỉ lệ file gốc, không hộp trắng. **Không** dùng `logo tvt agency.png` / `tvt agency footer.png` (chữ trắng mất trên nền trắng).

### Typography
Montserrat 700–800 (headline, số liệu) + Roboto 400–700 (thân, nhãn) — founder chốt 11/09/2026. Đổi bằng khối `"fonts"` trong video.json nếu cần (Work Sans cho đồng bộ ảnh Fanpage W41).

### Vùng an toàn
16:9: 10% mọi cạnh, nội dung từ y=96 (chừa hàng logo). 9:16: trên 10%, dưới 15%, hai bên 10%, nội dung từ y=150.

---

## 3. LOGIC XỬ LÝ DỮ LIỆU ĐẦU VÀO

### 3.1 `video.json`
```jsonc
{
  "project": "tvt_<slug>",                     // → templates/tvt_<slug>_16x9/, _9x16/
  "service": "Tên dịch vụ", "service_url": "https://tvtagency.com/...",
  "voice": { "audio": "sources/raw_audio/<project>_vo.mp3", "alignment": "sources/transcripts/<project>_alignment.json" },
  "aspects": ["16x9", "9x16"],
  "mockups": {                                 // tuỳ chọn — ghép ảnh chụp vào mockup thiết bị thật (mục 3.4)
    "responsive": { "template": "sources/branding/tvt/mockups/multi-devices-top-left",
                    "screens": { "desktop": "…1440x900.png", "laptop": "…", "tablet": "…820x1180@2.png", "phone": "…390x844@3.png" } }
  },
  "music": { "file": "sources/audio/licensed/<bài>.mp3", "gain_db": -14, "duck": true },   // tuỳ chọn (mục 3.4)
  "sfx":   { "open": "sources/audio/sfx/open-boomph.wav",           "open_gain_db": -10,   // nhấn khung 0
             "transition": "sources/audio/sfx/transition-woosh.wav", "transition_gain_db": -6,
             "pop": "sources/audio/sfx/pop-blip.wav",               "pop_gain_db": -10,    // ý chính hiện ra
             "cta": "sources/audio/sfx/cta-ping.wav",               "cta_gain_db": -8 },   // tuỳ chọn
  "offer": "Audit website miễn phí",           // nhãn ưu đãi góc phải từ cảnh 2 (nên khớp nút CTA)
  "hold_end": 2.5,                             // giữ màn CTA sau lời cuối (giây)
  "facts": [                                   // MỌI con số trên màn hình phải có ở đây
    { "value": "14–21", "claim": "ngày bàn giao", "spoken": ["mười bốn", "hai mươi mốt"],
      "source": "URL/mục trang", "verified": false }   // true chỉ khi anh xác nhận là số thật
  ],
  "scenes": [ /* 4–7 cảnh, cảnh cuối = cta */ ]
}
```
- `voice` mỗi cảnh = đúng đoạn lời đọc trong cảnh; ghép lại = toàn bộ voice.
- `cue` = cụm từ được đọc (phần tử hiện đúng lúc đọc) hoặc số giây từ đầu cảnh.
- **Headline**: `|` tách token · ` / ` xuống dòng · ` // ` chỉ xuống dòng ở 9:16 · `*` đầu token = gạch chân cam. Headline "có đọc" thì từng token sáng theo giọng và phải có trong voice cảnh.

### 3.2 Sáu loại cảnh

| `type` | Trường | Khi dùng (template gốc) |
|:--|:--|:--|
| `hook` | `kicker`, `headline` (có đọc), **một trong hai**: `shots` 3–5 ảnh (xấp website xòe) hoặc `media: "mockup:<id>"` (ảnh thiết bị thật, zoom chậm) | Mở bằng nỗi đau |
| `compare` | `old` {title, items[]}, `new` {headline (có đọc), shot?, items[{text, cue}]} | "Sai hệ → giải pháp hệ": cũ xám gạch vs TVT navy tick cam |
| `pipeline` | `kicker`, `headline` (có đọc), `nodes` 3–5 [{text, cue, icon?}] | Hệ vận hành: thẻ nối nhau, đường lấp cam theo lời |
| `showcase` | `kicker`, `stats` 1–3 [{value, label, cue}], `headline` (có đọc), `shots` 6–9, `shot_label` | Bằng chứng: số đếm + lưới website nghiêng 3D (cảnh "14/350/20") |
| `steps` | `kicker`, `title` (không đọc), `stat` {value, label, cue}, `steps` 3–5 [{text, cue, icon?}], `chip`? | Quy trình N bước + mốc thời gian |
| `cta` | `headline` (không đọc), `button` {text, cue}, `url` {text, cue} | Màn kết: logo chính thức + 1 nút cam |

Giá trị `stats` dạng số nguyên (`500+`, `15`, `100%`) tự đếm từ 0; dạng khoảng (`14–21`) hiện tĩnh.

### 3.3 Tư liệu hình (`shots`)
Ảnh 1440×900 từ `capture.py`. **Soát bằng mắt từng ảnh trước khi dùng** — brand_check không đọc được chữ trong ảnh:
- Không chữ "SME" (ngoại lệ duy nhất: slogan chính thức "Branding thực chiến cho SME"), không số liệu chưa xác minh đọc được, không ảnh người/nhân vật AI.
- `shot_label` phải trung thực: site TVT dựng → ghi rõ; template kit → "Mẫu giao diện", **không** gọi là dự án khách hàng.

### 3.4 Tài sản bên thứ ba (kho `TVT_Assets - FreePick - Evanto`) — luôn kèm giấy phép
**Luật:** mọi thư mục tài sản video dùng (icon, mockup, nhạc, SFX) phải có file `LICENSE*` nằm cạnh. Thiếu → bản giao FAIL, `--allow-unverified` chỉ cho bản nháp có nhãn. Chỉ **copy** từ kho, không di chuyển file gốc (quy ước `GEMINI.md` của kho).

| Tài sản | Trạng thái (28/09/2026) | Cách dùng |
|:--|:--|:--|
| **Icon** `sources/branding/tvt/icons/*.png` (14 icon navy duotone: website, lien-he, crm, theo-sat, khao-sat, wireframe, dung-giao-dien, seo, ban-giao, van-ban, quy-trinh, email, thu-muc, y-tuong) | ✅ Dùng theo **xác nhận chủ sở hữu** 28/09/2026 (`LICENSE_OWNER_ATTESTATION.md`) — gói Freepik mất file license khi giải nén | `"icon": "crm"` trong node/step. Thêm icon: xem `icons/SOURCE.md` (rasterize EPS → tách → tô navy) |
| **Mockup** `sources/branding/tvt/mockups/multi-devices-top-left/` (bàn trắng, 4 thiết bị) | ✅ License Freepik premium | Khai báo `mockups` + `media: "mockup:<id>"`. Mockup PSD khác: `extract_psd_mockup.py` (1 lần, cần venv psd-tools) → `mockup.py` ghép khi build |
| **Nhạc nền** | ❌ Kho chỉ có 3 bài tải từ YouTube, không license → **không dùng cho ads**. Founder chọn bỏ nhạc (28/09) | Khi cần: Meta Sound Collection (cấp phép FB/IG) hoặc Envato kèm License → `sources/audio/licensed/` + file LICENSE |
| **SFX** `sources/audio/sfx/` | ✅ Dùng theo **xác nhận chủ sở hữu** 28/09/2026 — `open-boomph.wav` (Impact 12 boomph: 0.39s, trầm ~1 kHz) · `transition-woosh.wav` (Woosh 09: 0.88s, đỉnh giữa, ~450 Hz) · `pop-blip.wav` (Click_Beep 05: 0.29s, ~2 kHz) · `cta-ping.wav` (Ping 05: 1s, ~2.2 kHz có cao độ) | Chọn bằng phân tích âm học: whoosh có đỉnh ở giữa + âm trầm; pop ngắn, không chói (>5 kHz) và không vượt 0 dBFS |

**Ảnh chụp cho mockup:** `capture.py … --viewport 390x844 --scale 3` (điện thoại), `--viewport 820x1180 --scale 2` (tablet). Chọn trang **không lộ số liệu chưa duyệt** — cả 4 màn hình có thể dùng cùng một trang ("một website, mọi thiết bị").

**Trộn âm (render.py):** nhạc được chuẩn hoá -14 LUFS rồi hạ `gain_db` (mặc định -14 → nền ~-28 LUFS, thấp hơn giọng 12 dB), tự hạ thêm khi có giọng (sidechain, ~-37 LUFS dưới giọng), fade vào/ra, limiter; bản trộn ~-15.5 LUFS. SFX tự đặt theo nội dung: `open` ở khung 0 · `transition` đo đỉnh tự động để **đỉnh whoosh trùng ranh giới cảnh** · `pop` khi **ý chính** hiện (từ gạch cam `*`, số liệu bắt đầu đếm, nhãn cam kết) và khi tick/nút/bước hiện, gộp pop <0.25s và nhường chỗ 0.3s quanh CTA · `cta` khi nút CTA hiện. Mức mặc định (founder duyệt 28/09/2026 — "cần to hơn để tạo điểm nhấn"): open -10 · whoosh -6 · pop -10 · cta -8 dB → bản trộn ~-15.2 LUFS, đỉnh ≤ -1 dBFS (limiter).

---

## 4. CHIẾN LƯỢC TẠO HOẠT CẢNH

Engine chung `promo_engine.js`: mọi chuyển động là hàm của `t` (`--p` 0→1 easeOutExpo) → `window.seek(t)` luôn cho cùng khung hình.

| Hiệu ứng | Cơ chế |
|:--|:--|
| Xấp website xòe | thẻ thứ `--d` trượt `--d × --spread` (16:9: 20%, 9:16: 13%) + xoay `--d × 6°`, thẻ giữa vào trước |
| Chữ theo giọng | token mờ .28 → rõ khi đọc; token `*` được "kẻ marker" cam chạy ngang (.45s) |
| Số đếm | `[data-count]` đếm 0 → giá trị trong 1.2s từ lúc đọc tới số |
| Đường nối pipeline/steps | vạch xám → lấp cam (scaleX/Y) 0.35s trước khi nút kế tiếp hiện; chấm số chuyển trắng → cam |
| Lưới 3D | `rotateX 38° rotateZ -18°`, trôi chậm theo `t`, viền mờ bằng mask |
| Chuyển cảnh | tấm trắng quét trái→phải, mép dẫn navy 12px + vạch cam 4px, phủ kín đúng ranh giới |

---

## 5. CHECKLIST KIỂM THỬ THỊ GIÁC & BRAND

### 5.1 Hook & chuyển đổi (người xem Fanpage lướt nhanh, phần lớn tắt tiếng)
| Nguyên tắc | Skill xử lý thế nào |
|:--|:--|
| **Khung 0 phải có nội dung** (là ảnh preview trong feed, quyết định dừng lướt) | Cảnh `hook`: ảnh mockup/xấp website + kicker hiện sẵn từ khung 0, chỉ còn zoom/xoè chuyển động |
| **Nắm vấn đề trong 3s** | Voice cảnh hook ≤ 3.5s — build cảnh báo `[HOOK WARN]` nếu dài hơn. Mở bằng nỗi đau dạng câu hỏi (Pain → …) |
| **Đọc được khi tắt tiếng** | Chữ chưa đọc hiện 55% (không mờ hẳn), từ đang đọc lên 100%; mọi thông điệp chính nằm trên màn hình; xuất `*.vi.srt` kèm MP4 để tải lên Facebook |
| **Giá trị rõ trước giây 10** | Thứ tự cảnh gợi ý: hook (0–3s) → compare/giải pháp (3–9s) → hệ thống/bằng chứng → quy trình → CTA |
| **Ưu đãi hiện sớm, CTA cam chỉ 1** | `"offer": "…"` → nhãn viền navy góc phải từ cảnh 2 (không tô cam); nút cam duy nhất ở cảnh CTA |
| **Đủ thời gian hành động** | Giữ màn CTA 2.5s sau lời cuối (`hold_end`) |
| **Âm thanh tạo điểm nhấn, không lấn giọng** | Nhấn khung 0, whoosh đỉnh trùng chuyển cảnh, pop khi ý chính hiện, "ting" riêng cho CTA; limiter giữ đỉnh ≤ -1 dBFS |


**Tự động** (build + `render.py --qa`):
- [ ] `brand_check`: cụm từ cấm (Brand DNA §10 + hard-sell), từ "SME", headline hook/CTA mở bằng AI/tool, đúng 1 cảnh CTA ở cuối, nút CTA thuộc danh sách chuẩn, **mọi con số trên màn hình có trong `facts`**, số đọc trong voice được đối chiếu `spoken`, file logo tồn tại.
- [ ] `--final` (tự bật khi có voice): số liệu `verified: false` → FAIL. Xem trước nội bộ: `--allow-unverified` (gắn nhãn NHÁP).
- [ ] QA hình học: logo, chữ, thẻ, số, nút nằm trong safe margin; chữ không tràn thẻ.

**Soát mắt** trên ảnh `sources/renders/qa/<project>_<aspect>/`:
- [ ] Không phần tử đè chữ (script chưa kiểm va chạm giữa các khối) — đặc biệt cảnh `hook`.
- [ ] Một logo mỗi khung; cảnh CTA không có watermark.
- [ ] Cam chỉ ở gạch chân/chấm/1 nút; không chữ cam.
- [ ] Ảnh `shots` sạch theo mục 3.3.
- [ ] Sau render: `ffmpeg -v error -i out.mp4 -f null -` = 0 lỗi; không chạy 2 render cùng lúc.

### Bài học khi đóng gói (đã xử lý trong kit)
| Lỗi | Xử lý |
|:--|:--|
| Xấp thẻ xòe đè headline (16:9) và tràn khỏi khung (9:16) | Độ xòe `--spread` theo tỉ lệ khung; cột chữ `z-index` trên thẻ |
| Lưới 3D tràn safe 16px | Cột lưới `minmax(0, Nfr)` thay `%` (gap cộng dồn vượt 100%) |
| Nháp dài 39s thay vì ~31s | Tốc độ đọc trong câu đo lại 4.0 âm tiết/s (nghỉ cộng riêng) |
| Trang dịch vụ thật có "SME", "300%", số dịch vụ tự mâu thuẫn (10/16/17) | Cổng brand + `facts` bắt buộc; ghi cảnh báo trong `catalog/services.json` |

---

## CẤU TRÚC
```
skills/tvt-service-promo/
├── SKILL.md
├── brand.json                         # tokens, logo, fonts, cụm từ cấm, CTA chuẩn (có dẫn nguồn tài liệu brand)
├── catalog/services.json              # 17 dịch vụ + cảnh báo brand từng dịch vụ
├── scripts/tvt_video.py               # LỆNH ĐIỀU PHỐI SOP-06: list/new/script/voice/build/qa/render/status
├── catalog/service.skeleton.json      # khung video chuẩn cho dịch vụ mới (TODO + _note hướng dẫn)
├── scripts/brand_check.py             # cổng kiểm duyệt nội dung (TODO, cụm cấm, SME, AI-first, số liệu, CTA)
├── scripts/build.py                   # video.json → templates/<project>_16x9 / _9x16 (+ --script, --draft)
├── scripts/capture.py                 # chụp hero website làm tư liệu (--viewport cho điện thoại/tablet)
├── scripts/mockup.py                  # ghép ảnh chụp vào mockup thiết bị (phối cảnh + lớp ánh sáng)
├── scripts/extract_psd_mockup.py      # trích mockup PSD Freepik thành gói dùng lại (chạy 1 lần)
├── kit/style.css                      # theme trắng TVT, 16:9 mặc định + ghi đè 9:16
├── examples/thiet-ke-website.video.json      # v1 (xấp website xòe) — lưu trữ
└── examples/thiet-ke-website.v2.video.json   # v2 đã đăng — bản mẫu chuẩn (= STORYBOARD/tvt/thiet-ke-website.video.json)

Cấu hình từng dịch vụ: STORYBOARD/tvt/<slug>.video.json · ảnh chụp: sources/screens/tvt/ · voice: sources/raw_audio/
Tài sản: sources/branding/tvt/{icons,mockups} · sources/audio/sfx · output: sources/renders/ (+ qa/)
```

## Tham Số Đầu Vào Của Kỹ Năng
- **service_name** (Tên gói dịch vụ cần quảng bá (SEO, Web Design, Hosting, AI Agent)): `{{service_name}}`
- **target_client_pain** (Nỗi đau lớn nhất của khách hàng B2B cần tháo gỡ): `{{target_client_pain}}`

