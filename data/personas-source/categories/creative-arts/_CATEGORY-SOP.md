# _CATEGORY-SOP.md — Creative Arts

> SOPs cho creative design và art production tasks.

---

## 🔄 SOP-ART-01: Design Brief

Trước khi bắt đầu bất kỳ design task nào:

```
1. Understand goal
   → What is this for? (web, print, social, video)
   → Who is the audience?
   → What emotion/feeling should it evoke?

2. Define constraints
   → Dimensions / aspect ratio
   → Color restrictions (brand colors)
   → Typography guidelines
   → File format requirements

3. Style direction
   → 3 reference examples (inspiration)
   → Keywords: "minimal", "bold", "playful", "corporate"
   → What to AVOID (equally important)

4. Output
   → Wireframe / sketch first
   → Then high-fidelity
```

---

## 🔄 SOP-ART-02: ANTIGRAVITY Design System

```css
/* Default ANTIGRAVITY Aesthetic */

Colors:
  Primary BG:   #0a0a0a (near black)
  Secondary BG: #111111
  Card BG:      rgba(255,255,255,0.05) — glassmorphism
  Accent:       #6366f1 (indigo) or #10b981 (emerald)
  Text:         #ffffff / #a0a0a0

Typography:
  Heading: Outfit Bold — 48-96px
  Body:    Inter Regular — 14-18px
  Code:    JetBrains Mono — 13px

Effects:
  Glass:    backdrop-filter: blur(16px)
  Glow:     box-shadow: 0 0 30px rgba(99,102,241,0.3)
  Gradient: linear-gradient(135deg, #6366f1, #8b5cf6)
  Border:   1px solid rgba(255,255,255,0.1)
```

---

## 🔄 SOP-ART-03: Visual Asset Production Checklist

- [ ] Dimensions correct for target platform?
- [ ] Brand colors used (not generic)?
- [ ] Typography from approved font list?
- [ ] Exported in correct format (WebP/PNG/SVG/PDF)?
- [ ] Mobile version considered?
- [ ] Dark/light mode versions if needed?
- [ ] Alt text description prepared?

---

## 🔄 SOP-ART-04: Open Design Integration

```bash
# Generate design with AI
# Via Open Design daemon + web interface

# 1. Start daemon (if not running)
# Refer to /Volumes/SSD/ANTIGRAVITY/open-design-main/

# 2. Submit design prompt
# Describe: style + dimensions + purpose + color palette

# 3. Review + iterate
# Download asset → use in project
```

---

## 📎 Tài liệu liên quan

- Open Design (Nguồn thư viện tại `/Volumes/SSD/ANTIGRAVITY/open-design-main/`)
- [SKILL-VIDEO-MOTION](skills/SKILL-VIDEO-MOTION.md)
- [SKILL-UIUX-DEV](../developing/skills/SKILL-UIUX-DEV.md)
- Hyperframes templates (Thư mục mẫu tại `/Volumes/SSD/ANTIGRAVITY/hyperframes-main/output/templates/`)
