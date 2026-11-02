---
id: ai-model-audit-reveal
title: "AI Model Benchmark & Data Audit Video Reveal (16:9)"
description: "AI Model Benchmark & Data Audit Video Reveal (16:9) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes / Code-driven Video Engine)."
category: operations
tier: skill
persona: toilatung
author: "Tôi Là Tùng"
tags: ["Video Production", "16:9", "AI Benchmark", "Data Audit", "Motion Graphics", "Quiet Authority"]
inputs:
  - name: benchmark_data
    type: textarea
    description: "Số liệu kiểm toán thực tế và bảng xếp hạng model AI"
    required: true
  - name: voice_script
    type: textarea
    description: "Kịch bản lời bình đã duyệt mốc nhịp"
    required: true
audit_gates: ["Zero Hallucination Numbers Gate", "Color Contrast AA Gate", "Safe Zone 10% Margin Gate"]
created_at: "2026-11-03"
---
# SKILL: ai-model-audit-reveal

> Tái dùng ngôn ngữ thiết kế của `toilatung-talkinghead` (sân khấu tối Quiet Authority 16:9) cho loại video **dẫn số liệu thực chiến**. Sinh từ video "TÌM #1 OPENROUTER — Space Bunny Alpha vs GLM 5.3 Flash".

---

## 1. DÙNG KHI NÀO

| | |
|:--|:--|
| **Dùng cho** | Video 16:9 nói về một kết quả đo được (xếp hạng, số liệu chạy thật, so sánh model/tool) rồi chốt triết lý |
| **Khác gì `toilatung-talkinghead`** | Không có cửa sổ kế hoạch/use-case; thay bằng bảng xếp hạng, quầng số đếm, thẻ hành động và hai cột so sánh |
| **Tỉ lệ** | `16x9` 1920×1080 (canvas 960×540 CSS @2x) |
| **Không dùng khi** | Video dịch vụ TVT (`tvt-service-promo`), promo 4 cảnh (`corporate-geometric-promo`) |

## 2. PIPELINE

```bash
# 1. Căn giọng (SOP-01) — voice là chuẩn gốc, script phải là ĐÚNG lời đã đọc
python3 templates/hyperframes/align.py <voice.mp3> <script.txt> <alignment.json>

# 2. Sửa video.json (cue theo CỤM LỜI, không hardcode giây) rồi build
python3 skills/ai-model-audit-reveal/scripts/build.py STORYBOARD/toilatung/<tên>.video.json

# 3. QA 2 lớp
python3 templates/hyperframes/render.py templates/<project>_16x9 --qa      # safe margin 10%
python3 skills/ai-model-audit-reveal/scripts/qa_geometry.py templates/<project>_16x9

# 4. Render MP4 (KHÔNG chạy 2 render cùng lúc)
python3 templates/hyperframes/render.py templates/<project>_16x9
```

**Không sửa tay `templates/<project>_16x9/`** — sửa `video.json` rồi build lại.

## 3. NGUYÊN TẮC CỦA SKILL NÀY

| # | Nguyên tắc | Vì sao |
|:--|:--|:--|
| 1 | **Cue bằng cụm lời, không gõ giây** | `SceneClock.at("37 trên 37")` tra trong alignment. Đổi voice → chỉ rebuild, không dò lại timeline |
| 2 | **`voice` của cảnh phải khớp 100% alignment** | `promo_core.split_scenes` dừng build nếu lệch — bắt được lỗi gõ sai ngay (đã bắt "nẩm" vs "nằm") |
| 3 | **Chỉ hiện số đã được xác nhận** | Bảng xếp hạng chỉ gắn số cho #1; các hàng dưới để trống số, chỉ so bậc — không bịa số liệu |
| 4 | **Chừa biên cho cử động vào** | Khối trượt ngang phải đứng lùi vào trong safe margin, không đặt sát mép (đã sửa cột compare) |
| 5 | **Counter phải bọc `<span data-count-digits>`** | Xem §5 |

## 4. 6 LOẠI CẢNH

| `type` | Nội dung | Trường chính |
|:--|:--|:--|
| `hook` | Chân dung cutout + quầng số đếm + bảng xếp hạng 3 hàng | `headline[]`, `counter`, `rows[]`, `spoken` |
| `audit` | Cửa sổ DSH nền sáng + số đếm + 3 dòng phát hiện + chip PASS | `window`, `sec_label`, `counter`, `findings[]`, `pass_chip` |
| `refactor` | Dải 3 số liệu + 3 thẻ hành động phòng vệ | `stats[]`, `actions[]` |
| `compare` | Hai cột đối chiếu model + nút VS | `cols[]` (`role`, `items[].kind` = `yes`/`no`) |
| `thesis` | Chip bị gạch + hai từ khoá Liquid Glass | `strikes[]`, `words[]` |
| `outro` | Chân dung + domain + 2 dòng chốt | `kicker`, `domain`, `rows[]`, `micro` |

## 5. BẪI ĐÃ CÀI — ĐỪNG HỒI QUY

| Triệu chứng | Nguyên nhân & cách sửa |
|:--|:--|
| Counter mất đơn vị (`41.400.000` thay vì `41.400.000 LƯỢT GỌI`) | Engine gán `el.textContent` là **xoá sạch phần tử con**. Đã sửa `promo_engine.js`: counter ghi vào `<span data-count-digits>` nếu có, không có thì giữ hành vi cũ. **Luôn bọc span khi counter có `<em>`/hậu tố.** |
| QA báo tràn 6px ở số lớn | `line-height: 1` chặt hơn font metric. `.bignum` dùng `1.12`. |
| QA báo tràn 4px ở chữ bị gạch | `::after` vạch gạch `left:-4px; right:-4px` lọt ra ngoài khối. Dùng `padding: 0 6px` + `left:0; right:0`. |
| Cột `.cmp-col` lọt safe margin khi đang trượt vào | Cột đặt sát mép 96/864 cộng thêm `--from` 26px. Lùi vào: `left 124 + i*360`, `width 352`. |
| `qa_geometry` báo trùng cảnh-6 liên tục | Regex `data-start` bắt nhầm span `.w`. Phải neo theo `<section class="scene-layer"`. |
| Builder `KeyError: 'cue'` | Scene `thesis` có key `words` trùng khoá nội bộ. Khoá nội bộ dùng tiền tố `_`. |

## 6. CẤU TRÚC

```
skills/ai-model-audit-reveal/
├── SKILL.md
├── kit/
│   ├── style.css          # kế thừa kit toilatung-talkinghead + component mới
│   └── promo_engine.js    # bản sao engine dùng chung (copy sang motion.js)
└── scripts/
    ├── build.py           # video.json + alignment → templates/<project>_16x9
    └── qa_geometry.py     # QA lớp 2: overflow + chồng khối + ảnh + font
```

Lõi dùng chung (không sửa khi dùng skill này): `templates/hyperframes/align.py`, `promo_core.py`, `render.py`.

## 7. BẪY MỚI — CHỮ ĐỌC ≠ CHỮ HIỂN THỊ

Voice đọc URL là "toilatung dot com" (ElevenLabs cần tách từ để phát âm đúng), nhưng **không được để chuỗi đó lọt ra màn hình hay vào phụ đề** — thương hiệu phải viết `toilatung.com`.

| Nơi | Cách làm đúng |
|:--|:--|
| **Chữ trên màn hình** | `w_join(clock, "toilatung dot com", "toilatung.com")` — gộp cả cụm thành **một** đơn vị `.w` với `data-start`/`data-end` lấy từ từ đầu đến từ cuối (vẫn bám đúng lời), nhưng hiển thị chuỗi đúng |
| **Phụ đề `.srt`** | Khai `caption_display` trong `video.json`: `{"<cụm lời thật>": "<chữ hiển thị>"}`. Builder **dừng** nếu khoá không khớp cụm lời nào trong alignment |

**Không dùng `w_line()` cho URL/domain.** `w_line()` tách từng từ theo lời đọc, nên truyền cả câu vào sẽ biến khối domain thành 3 dòng câu thật (`Mình phân tích` / `sâu hơn trên` / `toilatung dot com`) — **vẫn PASS cả 2 lớp QA** vì `.w` có `white-space:nowrap` và khối cha có con nên không bị kiểm overflow. Đây là lỗi *nội dung*, QA hình học không bắt được; chỉ soát mắt mới thấy.

Mẹo soi nhanh khối chữ lớn trước khi render:
```bash
grep -o '<div class="domain[^>]*>.*</div>' templates/<project>_16x9/index.html
```
Một domain đúng = **một** thẻ `<span class="w">` duy nhất.

## 8. LƯI GI PHÂN BỔ KHOẢNG CÁCH — ĐO, KHÔNG CHỈ SOÁT MẮT

Cảnh `compare` từng có hai thẻ cách nhau **8px** trong khi nút `VS` 42px **đè lên 17px mỗi thẻ**. Cả 2 lớp QA vẫn PASS vì `.vs` nằm trong cặp `ALLOW`. Sửa tận gốc:

- Lưới mới: thẻ `left 96 + i*416`, `width 352` → **96..448** và **512..864**. Khe = **64px**, cân đối tuyệt đối trong safe margin (96 / 864), nút `VS` 42px nằm trọn trong khe (459..501), chừa 11px mỗi bên.
- **Cử động vào phải theo trục dọc.** Trước đây `.cmp-col` trượt ngang `--from: ±26px`; thẻ nằm sát mép safe nên lúc `p<1` lọt ra ngoài. Muốn dùng hết bề ngang thì phải chuyển sang trục dọc — hoặc lùi lưới vào trong và chấp nhận hẹp hơn.
- `ALLOW` trong `qa_geometry.py` đã rỗng: sau khi lưới đúng, **không cặp nào cần miễn trừ** nữa. Giữ `ALLOW` rỗng để QA bắt được lỗi tương lai.

Quy trình kiểm khe (chạy trước khi render):
```bash
python3 - <<'PY'
from playwright.sync_api import sync_playwright; from pathlib import Path
p = Path("templates/<project>_16x9/index.html").resolve()
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width":960,"height":540})
    pg.goto(p.as_uri()+"?render=1", wait_until="networkidle"); pg.evaluate("window.seek(<giữa cảnh>)")
    r = pg.evaluate("""(s)=>[...document.querySelectorAll(s)].map(e=>{const b=e.getBoundingClientRect();
        return {l:+b.left.toFixed(1), r:+b.right.toFixed(1)};});""", "<selector>")
    print("khe ngang:", [round(r[i+1]['l']-r[i]['r'],1) for i in range(len(r)-1)])
    b.close()
PY
```
Chuẩn tham chiếu: khe giữa các thẻ cùng cỡ trong dự án là **14–16px**; hai thẻ lớn đặt cạnh nhau nên **≥48px**. Lệch nhiều so với phần còn lại của video là dấu hiệu lưới bị tính sai.

## 9. THÊM TỈ LỆ — `build.py <video.json> --aspect 9x16`

Một `video.json`, hai template. Mỗi cảnh khai **hai lưới toạ độ** ngay trong hàm dựng cảnh (`if a == "16x9": … else: …`).

```bash
python3 skills/ai-model-audit-reveal/scripts/build.py <video.json>                  # 960×540  @2x → 1920×1080
python3 skills/ai-model-audit-reveal/scripts/build.py <video.json> --aspect 9x16    # 540×960  @2x → 1080×1920
```

**Safe margin 9:16 khác ngang** (SOP-03): `inset: 10% 12% 15% 10%` ⇒ vùng nội dung **421×720** (không phải 10% đều). Vùng này đã khai trong CSS + hằng `SAFE["9x16"]`.

### Nguyên tắc bố trí khung dọc

| Vấn đề | Xử lý |
|:--|:--|
| Bề ngang chỉ 421px, flex ngang không đủ chỗ | Các nhóm `stat-row` / `act-grid` / `strike-row` chuyển `flex-direction:column` (helper `stat_row()`) |
| **Nhưng đừng chuyển tất cả** | `stat-row` vẫn **xếp ngang** — 3 ô số ~137px, số 26px + nhãn 9.5px vừa đủ. Xếp dọc làm khối cao 260px, đẩy cả cảnh refactor vượt khung |
| Brand chrome phải nằm trong safe | 16:9 đặt ở `top:56` (safe top 54). 9:16 phải đặt ở **`top:96`** (safe top 96), nên nội dung cảnh bắt đầu từ **y=145**, không phải 96 |
| Chiều cao khối phải **đo**, không ước lượng | `stat-row` dọc đo ra 260px (tôi tính 216 → chồng 32px). Khối chữ hook đo 187px (tính 182 → chồng 5px). Đo bằng `getBoundingClientRect` rồi mới đặt toạ độ kế tiếp |
| `.bubble` là `position: relative` | Đặt `left/top` chỉ có tác dụng **offset tương đối**, và cần `.side-col` (absolute) làm containing block. Ở 9:16 đã bỏ hẳn bubble — thẻ "TÙNG · FOUNDER" trên chân dung đã đủ nhận diện |

### Hai lỗi `box()` đã cài (đều do viết tay thẻ mở)

| Lỗi | Triệu chứng | Bài học |
|:--|:--|:--|
| `data-in` nhét **vào trong `style`** | Trình duyệt loại như CSS không hợp lệ ⇒ mất `data-in` ⇒ phần tử **không bao giờ chạy cử động vào** (`--p` unset ⇒ `opacity` về giá trị mặc định 1 ⇒ luôn hiện) | `box()` tách `data-*` ra thành **attribute HTML**; chỉ phần còn lại mới nối vào `style` |
| Quên `</div>` của `.bubble` | `.portrait-cut` thành **con** của bubble ⇒ mất containing block ⇒ lệch toạ độ đúng bằng `left/top` của bubble | `check_structure()` chặn: các khối đặt tuyệt đối ở cấp cảnh **không được lồng vào nhau** |

> Thêm nữa: `box()` phải **đã kèm dấu `>`**. Thiếu nó ⇒ trình duyệt nuốt phần còn lại vào thẻ chưa đóng ⇒ cây DOM dựng lại ⇒ `#viewport` bị flexbox đẩy lệch (thấy `left:-647px`) ⇒ **mọi toạ độ QA thành âm**. `check_structure()` kiểm `<body>` phải đúng 3 con `[div, audio, script]`.

### QA bắt được gì

- QA lớp 1: cột compare lọt safe margin khi đang trượt vào; brand chrome 9:16 nằm trên safe margin.
- QA lớp 2: `stat-row` ↔ `act-grid` chồng 32px; `.copy` ↔ `.lb-card` chồng 5px; `.portrait-cut` lệch 689px do bị nuốt.

**Cả 2 lớp đều PASS cho 16:9 và 9:16** (12/12 + 18/18 mỗi tỉ lệ).

## Tham Số Đầu Vào Của Kỹ Năng
- **benchmark_data** (Số liệu kiểm toán thực tế và bảng xếp hạng model AI): `{{benchmark_data}}`
- **voice_script** (Kịch bản lời bình đã duyệt mốc nhịp): `{{voice_script}}`

