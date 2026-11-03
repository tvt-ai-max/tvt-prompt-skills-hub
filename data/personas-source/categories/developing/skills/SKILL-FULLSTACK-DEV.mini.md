---
name: fullstack-dev
mini: true
token_estimate: 360
full_file: SKILL-FULLSTACK-DEV.md
---
# Full-Stack Developer [MINI]
> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"build app", "web app", "full-stack", "frontend", "backend", "debug", "fix bug", "architecture"

## Pipeline (5 steps)
1. **Design** — Requirements → architecture sketch → API contract → DB schema
2. **Backend** — Node.js/Express or Python/FastAPI → REST API → error handling
3. **Frontend** — HTML+Vanilla JS+CSS (default) or Next.js/Vite (complex)
4. **Test** — Unit tests + manual QA + performance check
5. **Deploy** — PM2 ecosystem config → `pm2 start` → `pm2 save`

## ANTIGRAVITY Stack
```
Frontend:  HTML + Vanilla JS + CSS (default) | Next.js/Vite (complex)
Backend:   Node.js (Express) | Python (FastAPI)
Database:  SQLite (dev) → PostgreSQL (prod)
Process:   PM2 | npm (not yarn)
```

## Complexity Decision
Simple → Single HTML+JS | Medium → Vite+API | Complex → Monorepo

## Code Quality Rules
1. Error handling on ALL async (try/catch)
2. No secrets in code — always .env
3. Single responsibility per function
4. Input validation — never trust user input
5. README with setup instructions always

## Anti-Patterns
❌ No error handling | ❌ Secrets in code | ❌ God functions | ❌ No .env

## Integrates With
`openclaw` | `hyperframes` | `open-design` | `skill-devops` | `skill-uiux-dev`
