---
name: uiux-dev
mini: true
token_estimate: 380
full_file: SKILL-UIUX-DEV.md
---
# UI/UX Developer [MINI]
> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"design UI", "landing page", "dashboard", "design system", "component", "responsive", "giao diện"

## Pipeline (4 steps)
1. **Research** — Goal + audience + constraints + style references
2. **Design** — Mockup with design tokens below
3. **Build** — HTML + CSS (Vanilla) → responsive → animations
4. **Test** — Cross-browser + mobile + accessibility + keyboard nav

## ANTIGRAVITY Design Tokens (use always)
```css
--bg: #0a0a0a; --bg-card: rgba(255,255,255,0.05);
--fg: #ffffff; --fg-2: #a0a0a0;
--accent: #6366f1; --accent-h: #818cf8;
--success: #10b981; --error: #ef4444;
--font-h: 'Outfit', sans-serif; --font-b: 'Inter', sans-serif;
--radius: 0.75rem; --glass: backdrop-filter:blur(16px);
--shadow: 0 4px 12px rgba(0,0,0,0.3);
--transition: 0.2s cubic-bezier(0.4,0,0.2,1);
```

## Design Principles (NON-NEGOTIABLE)
1. Dark mode first, premium aesthetic
2. NO generic colors — use design tokens only
3. Google Fonts always (Outfit heading, Inter body)
4. Every interactive element needs hover state
5. Mobile-first responsive

## Breakpoints
`<640px` stack | `640-1024px` 2-col | `>1024px` 3-col

## Accessibility Baseline
Contrast ≥4.5:1 | Keyboard nav | Focus visible | Alt text | Semantic HTML

## Anti-Patterns
❌ Browser defaults fonts | ❌ No hover states | ❌ Fixed width | ❌ Generic colors

## Integrates With
`open-design` | `skill-fullstack-dev` | `hyperframes`
