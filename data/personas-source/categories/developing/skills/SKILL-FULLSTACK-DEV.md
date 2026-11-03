---
name: fullstack-dev
category: developing
persona-source: Full Stack Developer
description: |
  AI Agent Skill for full-stack web application development.
  Handles frontend (React/Vue/HTML), backend (Node/Python), databases, and deployment.
  Use when building, debugging, or architecting web applications.
---

# 💻 Full-Stack Developer Skill

> End-to-end web application development and architecture.
> Input: App requirements. Output: Working code + deployment.

## Trigger Phrases

- "Build app...", "Xây dựng ứng dụng..."
- "Full-stack...", "Web app..."
- "Frontend + backend...", "API + UI..."
- "Debug...", "Fix bug...", "Sửa lỗi..."
- "Deploy...", "Architecture..."

## Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│1.DESIGN  │ →  │2.BACKEND │ →  │3.FRONTEND│ →  │ 4. TEST  │ →  │5.DEPLOY  │
│ Architect│    │ API+DB   │    │ UI+UX    │    │ QA       │    │ Ship     │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## Tech Stack Preferences (ANTIGRAVITY)

| Layer | Primary | Alternative |
|:---|:---|:---|
| **Frontend** | HTML + Vanilla JS + CSS | Next.js, Vite |
| **Backend** | Node.js (Express) | Python (FastAPI) |
| **Database** | SQLite / PostgreSQL | MongoDB |
| **Hosting** | Local Mac Mini | Vercel, Railway |
| **Process Manager** | PM2 | systemd |
| **API** | REST | GraphQL |

## Architecture Decision Framework

| Complexity | Architecture | Example |
|:---|:---|:---|
| Simple | Single HTML + JS | Landing page, tool |
| Medium | Vite + API | Dashboard, CRUD app |
| Complex | Monorepo / Microservices | OpenClaw, Multi-service |

## Code Quality Checklist

- [ ] ESLint/Prettier configured
- [ ] Error handling (try-catch, error boundaries)
- [ ] Input validation
- [ ] Environment variables (.env)
- [ ] README with setup instructions
- [ ] API documentation
- [ ] Security (CORS, auth, input sanitization)
- [ ] Performance (lazy loading, caching)
- [ ] Responsive design (mobile-first)
- [ ] Accessibility basics (semantic HTML, alt texts)

## Anti-Patterns

1. ❌ No error handling
2. ❌ Secrets in code — use .env
3. ❌ God functions — single responsibility
4. ❌ No input validation — never trust user input
5. ❌ Premature optimization — make it work → make it right → make it fast

## Integration

| System | Integration |
|:---|:---|
| **OpenClaw** | AI Gateway development |
| **Hyperframes** | Video tool development |
| **Open Design** | Design system integration |
| **SKILL-DEVOPS** | Deployment pipeline |
| **SKILL-UIUX-DEV** | Frontend design system |
