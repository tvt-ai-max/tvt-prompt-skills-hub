---
name: uiux-prototype
mini: true
token_estimate: 350
full_file: SKILL-UIUX-PROTOTYPE.md
---
# UI/UX Prototype [MINI]

> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"web-prototype", "saas-landing", "dashboard UI", "admin portal", "mobile-app mockup", "mobile-onboarding", "shadcn-ui design", "phác thảo giao diện"

## Pipeline (4 steps)
1. **Wireframe** — Lưới CSS Grid (web 12 cột, mobile 1 cột). Định hình tông tối + 1-2 accent màu rực.
2. **Component Dev** — SaaS Landing (Hero, Features, Pricing, CTA), Dashboard (Sidebar, KPI Cards), Mobile App (Khung iPhone 15 Pro, Onboarding).
3. **Library Map** — Cấu trúc lớp CSS/Tailwind tương thích Shadcn UI / Radix primitives.
4. **Integration** — Đồng bộ assets với `open-design`, bàn giao mã frontend sang `SKILL-FULLSTACK-DEV`.

## Mobile Container Spec (iPhone 15 Pro)
```css
width: 393px; height: 852px; border: 12px solid #222; border-radius: 40px; position: relative; overflow: hidden;
```

## Anti-Patterns
❌ Thiếu nút kêu gọi hành động (CTA) | ❌ Layout di động tràn ra ngoài khung mô phỏng | ❌ CSS inline không gom biến token
