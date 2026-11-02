---
id: facebook-page-two-step-publisher
title: "Facebook Fanpage Two-Step Scheduled Publisher"
description: "Facebook Fanpage Two-Step Scheduled Publisher — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent."
category: operations
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Facebook Graph API", "Auto Publish", "Two-Step Feed", "Scheduled Post", "Social Media"]
inputs:
  - name: post_message
    type: textarea
    description: "Toàn văn nội dung bài đăng kèm hashtag"
    required: true
  - name: media_path
    type: string
    description: "Đường dẫn file ảnh 16:9 hoặc Carousel"
    required: false
  - name: schedule_timestamp
    type: string
    description: "Thời gian đặt lịch Unix Timestamp hoặc đăng ngay"
    required: false
audit_gates: ["2-Step Graph API Compliance Gate", "Anti-Secret Redaction Gate", "Human Approval Checkpoint"]
tools: ["read_file", "write_file"]
created_at: "2026-11-03"
---
# Facebook Page Manager

Skill đăng và quản lý nội dung Facebook Page qua **Graph API v19.0** bằng Python.

## Setup nhanh

### 1. Cài dependencies
```bash
pip install requests
```

### 2. Lấy Access Token
Xem hướng dẫn chi tiết: `references/get-token.md`

**Tóm tắt nhanh:**
- Vào [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- Tạo token với permissions: `pages_manage_posts`, `pages_read_engagement`, `pages_manage_engagement`, `publish_video`
- Gọi `GET /me/accounts` để lấy **Page Access Token** và **Page ID**

### 3. Tạo config
Tạo file `scripts/fb_config.json`:
```json
{
  "access_token": "EAAxxxxxxxxxxxxxxx",
  "page_id": "123456789012345"
}
```
> ⚠️ Thêm vào `.gitignore`, không commit file này!

---

## Script chính: `scripts/fb_post.py`

### Đăng text
```bash
python fb_post.py text --message "Nội dung bài viết"
```

### Đăng ảnh
```bash
python fb_post.py photo --message "Caption" --images anh1.jpg
```

### Carousel (nhiều ảnh)
```bash
python fb_post.py photo --message "Caption" --images a.jpg b.jpg c.jpg
```

### Video
```bash
python fb_post.py video --message "Caption" --video clip.mp4
```

### Reels
```bash
python fb_post.py video --message "Caption" --video clip.mp4 --reel
```

### Story ảnh
```bash
python fb_post.py story --type photo --media story.jpg
```

### Story video
```bash
python fb_post.py story --type video --media story.mp4
```

---

## Hẹn giờ đăng bài

Thêm `--schedule "YYYY-MM-DD HH:MM"` vào bất kỳ lệnh text/photo/video:

```bash
python fb_post.py text --message "Bài sáng thứ Hai" --schedule "2024-12-25 08:00"
python fb_post.py photo --message "Caption" --images anh.jpg --schedule "2024-12-25 10:00"
python fb_post.py video --message "Video mới" --video clip.mp4 --schedule "2024-12-25 20:00"
```

> ⏰ Thời gian phải sau hiện tại ít nhất **10 phút** và không quá **6 tháng**.
> Story **không hỗ trợ** hẹn giờ.

---

## Quản lý lịch đăng

### Xem danh sách bài hẹn giờ
```bash
python fb_post.py list-scheduled
```

### Xóa bài
```bash
python fb_post.py delete --post-id 123456789_987654321
```

### Đổi giờ đăng
```bash
python fb_post.py reschedule --post-id 123456789_987654321 --schedule "2024-12-26 09:00"
```

---

## Quản lý Comment

> **Permission cần thêm:** `pages_manage_engagement`

### Comment vào bài viết
```bash
python fb_post.py comment --post-id 123456789_987654321 --message "Nội dung comment"
```

### Reply vào comment
```bash
python fb_post.py reply --comment-id COMMENT_ID --message "Nội dung reply"
```

### Xem danh sách comment của bài viết
```bash
python fb_post.py list-comments --post-id 123456789_987654321
```

### Xóa comment
```bash
python fb_post.py delete-comment --comment-id COMMENT_ID
```

---

## References

- `references/get-token.md` — Hướng dẫn lấy Access Token từng bước
- `references/api-reference.md` — Chi tiết endpoints, format, giới hạn

## Lưu ý quan trọng

- **Page phải ở trạng thái Published** (không phải Unpublished/Restricted)
- **Video** upload có thể mất vài phút xử lý sau khi upload xong
- **Carousel** tối đa 10 ảnh theo giới hạn Facebook
- **Reels** phải từ 3-90 giây
- **Comment/Reply** cần permission `pages_manage_engagement`
- Nếu gặp lỗi permission, xem `references/get-token.md` phần Troubleshooting

## Tham Số Đầu Vào Của Kỹ Năng
- **post_message** (Toàn văn nội dung bài đăng kèm hashtag): `{{post_message}}`
- **media_path** (Đường dẫn file ảnh 16:9 hoặc Carousel): `{{media_path}}`
- **schedule_timestamp** (Thời gian đặt lịch Unix Timestamp hoặc đăng ngay): `{{schedule_timestamp}}`

