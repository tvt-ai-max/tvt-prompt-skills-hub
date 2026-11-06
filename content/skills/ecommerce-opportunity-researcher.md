---
id: ecommerce-opportunity-researcher
title: "E-Commerce Market Opportunity & Competitor Analyzer"
description: "E-Commerce Market Opportunity & Competitor Analyzer — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent."
category: operations
tier: skill
persona: tvt-agency
author: "Lexi Intelligence Hub"
tags: ["E-Commerce", "Market Research", "Amazon", "Competitor Analysis", "Product Viability"]
inputs:
  - name: product_category
    type: string
    description: "Ngành hàng hoặc từ khóa sản phẩm cần nghiên cứu"
    required: true
  - name: target_marketplace
    type: string
    description: "Thị trường mục tiêu (US, EU, VN)"
    required: true
  - name: target_price_range
    type: string
    description: "Khoảng giá bán kỳ vọng"
    required: false
audit_gates: ["Data Integrity Gate", "Unit Economics Margin Gate", "Competition Saturation Gate"]
tools: ["web_search", "read_file"]
created_at: "2026-11-03"
---
# 📦 AMAZON & ECOM PRODUCT RESEARCH (Công cụ Phân tích Dữ liệu Thị trường ENGINE)

Bộ kỹ năng này bao gồm 2 phân hệ nghiên cứu sản phẩm chuyên sâu:

1. **[01-amazon-product-opportunity-brief](01-amazon-product-opportunity-brief/SKILL.md):** Khung nghiên cứu cơ hội sản phẩm, dung lượng thị trường, định giá và rào cản gia nhập.
2. **[02-amazon-product-research-Công cụ Phân tích Dữ liệu Thị trường](02-amazon-product-research-Công cụ Phân tích Dữ liệu Thị trường/SKILL.md):** Phân tích dữ liệu sản phẩm Công cụ Phân tích Dữ liệu Thị trường, bóc tách BSR, biến động doanh số và đánh giá mức độ cạnh tranh.

## Tham Số Đầu Vào Của Kỹ Năng
- **product_category** (Ngành hàng hoặc từ khóa sản phẩm cần nghiên cứu): `{{product_category}}`
- **target_marketplace** (Thị trường mục tiêu (US, EU, VN)): `{{target_marketplace}}`
- **target_price_range** (Khoảng giá bán kỳ vọng): `{{target_price_range}}`

