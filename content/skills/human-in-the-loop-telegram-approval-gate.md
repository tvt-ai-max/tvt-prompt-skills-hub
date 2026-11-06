---
id: human-in-the-loop-telegram-approval-gate
title: "Human-in-the-Loop Telegram Approval Security Gate"
description: "Human-in-the-Loop Telegram Approval Security Gate — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent."
category: system-design
tier: skill
persona: toilatung
author: "Lexi Intelligence Hub"
tags: ["Human-in-the-Loop", "Security Gate", "Telegram Bot", "Risk Governance", "Fail-Closed"]
inputs:
  - name: action_type
    type: string
    description: "Hành động rủi ro cần phê duyệt (Chuyển tiền, Tăng ngân sách Ads, Đăng bài, Xóa CSDL)"
    required: true
  - name: action_payload
    type: textarea
    description: "Chi tiết nội dung và tham số của hành động chờ duyệt"
    required: true
  - name: approver_role
    type: string
    description: "Vai trò người có thẩm quyền phê duyệt (Founder, Tech Lead, Marketing Lead)"
    required: true
audit_gates: ["HMAC-SHA256 Token Signature Gate", "Fail-Closed Enforcement Gate", "Audit Log Trail Gate"]
tools: ["read_file", "write_file"]
created_at: "2026-11-03"
---
# 🚦 TELEGRAM HUMAN-IN-THE-LOOP GATEWAY (CHỐNG RỦI RO VẬN HÀNH)

> **Khẩu hiệu:** *"Tự động hóa không có kiểm soát là tự động tạo ra thảm họa."*  
> Mọi AI Agent khi thực thi hành động nhạy cảm hoặc tác động đến tài chính/thương hiệu BẮT BUỘC phải đi qua Cổng Duyệt này.

---

## 1. MA TRẬN 3 TẦNG RỦI RO (3-TIER RISK GOVERNANCE)

| Phân Tầng | Mức Độ | Hành Động Tiêu Biểu | Cơ Chế Phê Duyệt |
| :---: | :---: | :--- | :--- |
| 🟢 **GREEN (Tự hành)** | Thấp | Nghiên cứu thị trường, cào dữ liệu công khai, đọc tài liệu, phân tích chỉ số GA4/Ads, sinh nháp content. | **Tự động 100%**, không cần hỏi ý kiến con người. |
| 🟡 **YELLOW (Cảnh báo)** | Vừa | Ghi bản nháp vào WordPress, lưu ý tưởng vào Notion/Second Brain, chạy test kịch bản giả lập. | **Tự động kèm Log Audit**, ghi nhận nhật ký để hậu kiểm. |
| 🔴 **RED (Bắt buộc duyệt)** | Cao | Tăng/giảm ngân sách Meta/Google Ads, xuất bản bài viết lên Fanpage/Website, gửi tin Zalo/Email hàng loạt, xóa/sửa DB. | **CHẶN ĐỨNG (Fail-Closed)**. Tạo thẻ duyệt gửi Telegram Lãnh đạo kèm 2 nút: `[✅ DUYỆT]` & `[❌ TỪ CHỐI]`. |

---

## 2. CẤU TRÚC KỸ THUẬT CỦA CỔNG DUYỆT

```
telegram-human-gate/
├── SKILL.md                 ← Tài liệu quy chuẩn vận hành
├── scripts/
│   ├── guard.py             ← Thư viện HumanGate cốt lõi (HMAC + SQLite + Telegram Bot)
│   └── test_gate.py         ← Kịch bản kiểm thử giả lập quy trình duyệt
└── data/
    └── gate_memory.db       ← CSDL SQLite lưu trữ trạng thái phê duyệt (id, token, status, timestamp)
```

---

## 3. CÁCH CÁC AI AGENT TÍCH HỢP CỔNG DUYỆT

Mọi script hoặc agent muốn thực hiện hành động Đỏ chỉ cần bọc trong hàm `guarded`:

```python
import sys
sys.path.append("/path/to/telegram-human-gate/scripts")
from guard import HumanGate

gate = HumanGate()

# Kiểm tra và xin duyệt trước khi đăng bài Facebook
res = gate.guarded(
    action="facebook_publish_post",
    summary="Đăng bài chiến dịch ra mắt Khóa học AI Tự Hành lên Fanpage TVT Agency",
    target={"page_id": "103773377736980", "message": "Nội dung bài viết..."}
)

if res["status"] == "approved":
    print("✅ Lãnh đạo đã duyệt! Tiến hành gọi API đăng bài...")
    # execute_real_action()
else:
    print(f"🛑 Hành động bị hoãn hoặc từ chối: {res.get('message')}")
```

---

## 4. QUY TẮC AN TOÀN BẤT BIẾN
1. **Fail-Closed:** Nếu không kết nối được Telegram hoặc token hết hạn (mặc định 60 phút) $
ightarrow$ Tự động coi là **TỪ CHỐI**.
2. **HMAC-SHA256:** Mỗi yêu cầu duyệt được ký bằng một token bảo mật duy nhất, ngăn chặn việc giả mạo tín hiệu duyệt qua callback.
3. **Audit Trail:** Mọi yêu cầu dù được duyệt hay bị từ chối đều lưu lại lịch sử trong SQLite `gate_memory.db` để đối soát.

## Tham Số Đầu Vào Của Kỹ Năng
- **action_type** (Hành động rủi ro cần phê duyệt (Chuyển tiền, Tăng ngân sách Ads, Đăng bài, Xóa CSDL)): `{{action_type}}`
- **action_payload** (Chi tiết nội dung và tham số của hành động chờ duyệt): `{{action_payload}}`
- **approver_role** (Vai trò người có thẩm quyền phê duyệt (Founder, Tech Lead, Marketing Lead)): `{{approver_role}}`

