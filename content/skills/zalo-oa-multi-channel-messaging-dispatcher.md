---
id: zalo-oa-multi-channel-messaging-dispatcher
title: "Zalo OA Multi-Channel Messaging & Media Dispatcher"
description: "Zalo OA Multi-Channel Messaging & Media Dispatcher — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent."
category: operations
tier: skill
persona: tvt-agency
author: "TVT Agency"
tags: ["Zalo OA", "Multi-Media Dispatch", "Customer Care", "Automation", "Notification"]
inputs:
  - name: message_text
    type: textarea
    description: "Nội dung thông báo hoặc kịch bản chăm sóc khách hàng"
    required: true
  - name: recipient_target
    type: string
    description: "Đối tượng nhận tin (Danh sách SĐT, User ID Zalo OA hoặc Group ID)"
    required: true
  - name: attached_media_urls
    type: string
    description: "Danh sách đường dẫn ảnh hoặc tài liệu đính kèm"
    required: false
audit_gates: ["Rate Limiter Protection Gate", "Recipient Privacy Gate", "Template Policy Compliance Gate"]
tools: ["read_file", "write_file"]
created_at: "2026-11-03"
---
# zalo-multi-send

Send multiple attachments in one Zalo message via `scripts/send.mjs`.

## Usage

```bash
node <skill-dir>/scripts/send.mjs \
  --to <userId_or_groupId> \
  --files "<path_or_url_1>,<path_or_url_2>,..." \
  [--caption "optional text"] \
  [--group] \
  [--profile default]
```

## Parameters

| Flag | Required | Description |
|---|---|---|
| `--to` | ✅ | Zalo user ID or group ID (numeric string) |
| `--files` | ✅ | Comma-separated local paths or https:// URLs |
| `--caption` | ❌ | Text message to send alongside the files |
| `--group` | ❌ | Add this flag if `--to` is a group ID |
| `--profile` | ❌ | Credential profile name (default: `"default"`) |

## Examples

```bash
# Send 2 local screenshots to a user
node scripts/send.mjs \
  --to 3484584962870495768 \
  --files "/home/tuan/Pictures/Screenshots/shot1.png,/home/tuan/Pictures/Screenshots/shot2.png"

# Send images from URLs with a caption
node scripts/send.mjs \
  --to 3484584962870495768 \
  --files "https://files.catbox.moe/abc.png,https://files.catbox.moe/def.png" \
  --caption "Đây nhé!"

# Send to a group
node scripts/send.mjs \
  --to 1234567890 \
  --group \
  --files "photo1.jpg,photo2.jpg"
```

## Notes

- Credentials are read from `~/.Hệ thống AI Agent.json` (managed by Hệ thống AI Agent, no re-auth needed)
- ZCA_PATH is hardcoded to the Hệ thống AI Agent zca-js. If Hệ thống AI Agent is updated/reinstalled, the path may need updating in `scripts/send.mjs`
- Local files must be readable by the current user
- Zalo may have undocumented limits on number of attachments per message (tested up to ~10 without issues)
- Exit 0 = success, exit 1 = error

## Tham Số Đầu Vào Của Kỹ Năng
- **message_text** (Nội dung thông báo hoặc kịch bản chăm sóc khách hàng): `{{message_text}}`
- **recipient_target** (Đối tượng nhận tin (Danh sách SĐT, User ID Zalo OA hoặc Group ID)): `{{recipient_target}}`
- **attached_media_urls** (Danh sách đường dẫn ảnh hoặc tài liệu đính kèm): `{{attached_media_urls}}`

