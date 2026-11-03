---
name: uiux-dev
category: developing
persona-source: UI/UX Developer
description: |
  AI Agent Skill for UI/UX design and frontend implementation.
  Creates beautiful, premium interfaces following modern design principles.
  Integrates with Open Design for AI-powered design generation.
---

# 🎨 UI/UX Developer Skill

> Premium interface design and frontend implementation.
> Input: Design requirement. Output: Polished, responsive UI.

## Trigger Phrases

- "Design UI cho...", "UI/UX for..."
- "Landing page design...", "Dashboard UI..."
- "Design system...", "Component library..."
- "Responsive layout...", "Mobile design..."
- "Redesign...", "Cải thiện UX..."

## Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│1.RESEARCH│ →  │2.DESIGN  │ →  │3.BUILD   │ →  │4.TEST    │
│ UX Audit │    │ Mockup   │    │ Code     │    │ Usability│
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## Design Principles (ANTIGRAVITY Standard)

### Visual Excellence Rules

1. **Rich Aesthetics**: Vibrant colors, dark modes, glassmorphism, animations
2. **No Generic Colors**: Use curated HSL palettes, not plain red/blue/green
3. **Modern Typography**: Inter, Roboto, Outfit from Google Fonts
4. **Smooth Gradients**: Subtle gradient backgrounds and elements
5. **Micro-animations**: Hover effects, transitions, interactive elements
6. **Premium Feel**: State-of-the-art, not minimum viable

### Design Tokens Template

```css
:root {
  /* Colors */
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-card: rgba(255, 255, 255, 0.05);
  --fg-primary: #ffffff;
  --fg-secondary: #a0a0a0;
  --accent: #6366f1;
  --accent-hover: #818cf8;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'Outfit', sans-serif;
  --fs-xs: 0.75rem;
  --fs-sm: 0.875rem;
  --fs-base: 1rem;
  --fs-lg: 1.25rem;
  --fs-xl: 1.5rem;
  --fs-2xl: 2rem;
  --fs-3xl: 3rem;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  
  /* Effects */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.4);
  --glass: backdrop-filter: blur(16px);
  --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Component Patterns

```
Cards:      Glass background + subtle border + shadow
Buttons:    Gradient or solid + hover scale/glow
Inputs:     Dark bg + subtle border + focus glow
Navigation: Fixed/sticky + glass bg + blur
Modals:     Centered + overlay + scale-in animation
```

## Responsive Breakpoints

| Device | Width | Layout |
|:---|:---|:---|
| Mobile | <640px | Stack, full-width |
| Tablet | 640-1024px | 2-column |
| Desktop | 1024-1440px | 3-column, sidebar |
| Wide | >1440px | Max-width container |

## Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] Semantic HTML (nav, main, section, article)
- [ ] ARIA labels where needed
- [ ] Touch targets ≥ 44px

## Anti-Patterns

1. ❌ Browser default fonts — always use Google Fonts
2. ❌ Generic colors — use curated palette
3. ❌ No hover states — every interactive element needs feedback
4. ❌ Fixed width layouts — responsive first
5. ❌ No loading states — skeleton screens or spinners

## Integration

| System | Integration |
|:---|:---|
| **Open Design** | AI-powered mockup generation |
| **SKILL-FULLSTACK-DEV** | Design → code implementation |
| **Hyperframes** | Video UI compositions |
