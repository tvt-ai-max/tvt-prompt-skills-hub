---
id: customer-persona-deep-profiler
title: "Customer Persona & Buyer Journey Deep Profiler"
description: "Quy trình nghiên cứu chân dung khách hàng mục tiêu (ICP), phân tích hành trình mua và giải mã Jobs-to-be-Done (JTBD) thực chiến."
category: marketing
tier: skill
persona: general
author: "Lexi Intelligence Hub"
tags: ["Customer Persona", "ICP", "Buyer Journey", "Jobs-to-be-Done", "Audience Research"]
inputs:
  - name: target_product
    type: string
    description: "Sản phẩm hoặc dịch vụ cung cấp"
    required: true
  - name: target_industry
    type: string
    description: "Ngành nghề hoặc thị trường ngách mục tiêu"
    required: true
  - name: known_data
    type: textarea
    description: "Dữ liệu khách hàng thực tế đã thu thập được (nếu có)"
    required: false
audit_gates: ["Evidence-Based Research Gate", "JTBD Framework Validation Gate", "Anti-Assumption Gate"]
tools: ["web_search", "read_file"]
created_at: "2026-11-06"
---
# CUSTOMER PERSONA & BUYER JOURNEY DEEP PROFILER

> **Nguyên lý cốt lõi:** *"Chân dung khách hàng dựa trên phỏng đoán là viễn tưởng. Mọi insight BẮT BUỘC phải dựa trên dữ liệu hành vi, nỗi đau có thể đo lường và động lực mua hàng thực tế."*

---

## Bước 1 — Thiết lập Dự án & Dữ liệu Đầu vào
- Sản phẩm/Dịch vụ: `{{target_product}}`
- Ngành hàng mục tiêu: `{{target_industry}}`
- Dữ liệu đã có: `{{known_data}}`

---

## Bước 2 — Khung Chân Dung Khách Hàng Chuẩn (Persona Profile)

```
┌────────────────────────────────────────────────────────┐
│  HỌ TÊN ĐẠI DIỆN & VAI TRÒ CHỨC DANH                    │
│  "Câu trích dẫn đúc kết nỗi đau lớn nhất của họ"       │
├────────────────────────────┬───────────────────────────┤
│  1. NHÂN KHẨU HỌC          │  2. TÂM LÝ HỌC (PSYCHO)   │
│  • Độ tuổi, Giới tính      │  • Giá trị cốt lõi        │
│  • Thu nhập, Học vấn       │  • Tính cách, Phong cách  │
│  • Vị trí địa lý           │  • Mối quan tâm, Sở thích │
├────────────────────────────┼───────────────────────────┤
│  3. MỤC TIÊU CỐT LÕI       │  4. ĐIỂM ĐAU CỤ THỂ       │
│  • Chỉ số KPI cần đạt      │  • Nỗi sợ mất mát         │
│  • Kỳ vọng thăng tiến      │  • Rào cản định lượng     │
├────────────────────────────┼───────────────────────────┤
│  5. KÊNH TIẾP NHẬN         │  6. ĐIỂM CHẠM MUA HÀNG    │
│  • Mạng xã hội chính       │  • Sự kiện kích hoạt      │
│  • Cộng đồng tham gia      │  • Tiêu chí ra quyết định │
└────────────────────────────┴───────────────────────────┘
```

---

## Bước 3 — Định lượng Điểm Đau (Quantified Pain Points)

Tuyệt đối tránh mô tả chung chung. Mọi điểm đau phải được cụ thể hóa bằng con số:

* ❌ *Mô tả mơ hồ:* "Khó khăn trong việc làm báo cáo."
* ✅ *Định lượng chuẩn:* "Tốn 12–15 giờ mỗi tuần chỉ để tổng hợp số liệu thủ công từ 4 nguồn khác nhau cho ban giám đốc."

* ❌ *Mô tả mơ hồ:* "Chi phí quảng cáo cao."
* ✅ *Định lượng chuẩn:* "Chi phí CPA tăng 45% trong 2 quý gần nhất nhưng tỷ lệ chốt sales từ MQL sang SQL chỉ đạt 8%."

---

## Bước 4 — Giải mã Khung Jobs-to-be-Done (JTBD)

Phân tích 3 tầng nhu cầu cốt lõi thúc đẩy hành vi:

1. **Nhiệm vụ Chức năng (Functional Job):**  
   Nhiệm vụ kỹ thuật họ cần hoàn thành (ví dụ: *Tự động hóa xuất báo cáo doanh thu đa kênh trước 8:00 sáng thứ Hai*).
2. **Nhiệm vụ Cảm xúc (Emotional Job):**  
   Cảm giác họ muốn có được (ví dụ: *Tự tin, giảm căng thẳng khi trình bày chiến lược trước hội đồng quản trị*).
3. **Nhiệm vụ Xã hội (Social Job):**  
   Cách họ muốn đồng nghiệp và cấp trên nhìn nhận (ví dụ: *Được công nhận là nhà quản lý tiên phong ứng dụng AI hiệu quả*).

---

## Bước 5 — Xác định Chân Dung Loại Trừ (Anti-Persona)

Xác định rõ đối tượng mà sản phẩm **KHÔNG PHỤC VỤ** để tránh lãng phí ngân sách tiếp thị:

```
ANTI-PERSONA: "Doanh nghiệp Truyền thống Siêu Lớn"
- Đặc điểm: Quy trình phê duyệt qua 6 cấp, chu kỳ mua hàng 18 tháng, đòi hỏi tùy biến on-premise phức tạp.
- Lý do loại trừ: Sản phẩm của chúng tôi tối ưu cho SME/Solopreneur với quy trình tự động hóa linh hoạt, triển khai dưới 48 giờ.
```

---

## Bước 6 — Gợi ý Prompt Tạo Ảnh Chân Dung Đại Diện (Avatar Prompt)

Sử dụng prompt đa phương thức sau để tạo ảnh minh họa avatar chuyên nghiệp trên Midjourney hoặc Flux:

```text
Professional headshot photograph of a 35-year-old Asian professional, modern business casual attire, warm confident expression, subtle natural office lighting, 85mm portrait lens, sharp focus, neutral aesthetic background, hyper-realistic --ar 1:1
```

---

## BẢNG KIỂM SOÁT CHẤT LƯỢNG (AUDIT GATES)
- [ ] **Evidence-Based Research Gate:** Nỗi đau và động lực có dựa trên dữ liệu khách hàng thực tế từ `{{known_data}}` hoặc thị trường `{{target_industry}}`.
- [ ] **JTBD Framework Validation Gate:** Đã phân định rõ ràng 3 tầng nhiệm vụ: Functional, Emotional, Social.
- [ ] **Anti-Assumption Gate:** Không suy đoán cảm tính; mọi rào cản mua hàng đều có phương án xử lý (objection handling).

---
*(Bản quyền chuẩn hóa bởi Lexi Intelligence Hub — Dành riêng cho hệ thống AI Agent & Chiến lược Go-To-Market).*
