# _CATEGORY-CLAUDE.md — Developing

> Claude Custom Instructions cho category Developing.
> Áp dụng khi làm việc với software development, coding, và engineering tasks.

---

## 🎯 Category Context

**Lĩnh vực**: Software Development — Web, Mobile, API, DevOps, Security, AR/VR  
**Số personas**: 30  
**Focus areas**: Full-stack, Backend, Frontend, DevOps, Security, Game, AR/VR

---

## 📋 Personas trong Category

| # | Persona Name | Specialty | Priority |
|:---|:---|:---|:---:|
| 1 | Full Stack Developer | End-to-end web dev | ⭐ High |
| 2 | DevOps Engineer | CI/CD, infra, PM2 | ⭐ High |
| 3 | UI/UX Developer | Interface design+code | ⭐ High |
| 4 | Front-End Developer | React, Vue, HTML/CSS | Medium |
| 5 | Back-End Developer | Node, Python, APIs | Medium |
| 6 | API Developer | REST/GraphQL APIs | Medium |
| 7 | Mobile App Developer | iOS/Android | Medium |
| 8 | Security Developer | Auth, crypto, vulns | Medium |
| 9 | Quality Assurance Engineer | Testing, QA | Medium |
| 10 | DevOps Engineer | Infrastructure | Medium |
| 11 | Game Developer | Unity, game logic | Low |
| 12 | AR/VR Developer | Immersive experiences | Low |
| 13 | Algorithm Developer | DSA, optimization | Low |
| 14 | Cloud Developer | AWS, GCP, Azure | Low |
| 15 | CMS Developer | WordPress, Headless | Low |
| 16 | CRM Developer | Salesforce, HubSpot | Low |
| 17 | Database Developer | SQL, NoSQL schema | Low |
| 18 | E-commerce Developer | Shopify, WooCommerce | Low |
| 19 | Embedded Systems Developer | IoT, firmware | Low |
| 20 | ERP Developer | Enterprise systems | Low |
| 21 | Firmware Developer | Hardware software | Low |
| 22 | Framework Developer | OSS frameworks | Low |
| 23 | Graphics Software Developer | GPU, rendering | Low |
| 24 | Middleware Developer | Service integration | Low |
| 25 | Natural Language Processing Developer | NLP/NLU | Low |
| 26 | Open Source Developer | OSS contributions | Low |
| 27 | Platform Engineer | Platform engineering | Low |
| 28 | Scripting Developer | Automation scripts | Low |
| 29 | Tools and Utilities Developer | Dev tooling | Low |
| 30 | Web Applications Developer | Web apps | Low |

---

## 🔧 Available Skills

| Skill | File | Trigger |
|:---|:---|:---|
| Full-Stack Dev | `skills/SKILL-FULLSTACK-DEV.md` | "build app", "web app" |
| DevOps | `skills/SKILL-DEVOPS.md` | "deploy", "PM2", "server" |
| UI/UX Dev | `skills/SKILL-UIUX-DEV.md` | "design UI", "frontend" |

---

## 💡 Category-Specific Rules

### Tech Stack (ANTIGRAVITY Standard)

```
Frontend:  HTML + Vanilla JS + CSS (default) | Next.js/Vite (complex apps)
Backend:   Node.js (Express) | Python (FastAPI)
Database:  SQLite (simple) | PostgreSQL (production)
Runtime:   Node 20+ | Python 3.11+
Process:   PM2
Package:   npm (not yarn/pnpm unless specified)
Style:     Prettier + ESLint
```

### Code Quality Standards
- **No magic numbers** — use named constants
- **Error handling** — try/catch on all async, meaningful error messages
- **Environment vars** — never hardcode secrets
- **Single responsibility** — functions do one thing
- **Comments** — document WHY, not WHAT

### Development Workflow
1. Understand requirements → clarify ambiguity upfront
2. Design before coding → sketch architecture
3. Build incrementally → small, tested steps
4. Validate locally → before committing
5. Document → README + inline comments

### Integration Points
- **OpenClaw** (`/Volumes/SSD/openclaw-main/`) — AI Gateway
- **Hyperframes** (`/Volumes/SSD/ANTIGRAVITY/hyperframes-main/`) — Video tool
- **Open Design** (`/Volumes/SSD/ANTIGRAVITY/open-design-main/`) — Design tool
- **Mac Mini** — Local server, PM2-managed services
- **SSD**: `/Volumes/SSD/ANTIGRAVITY/` — Primary workspace

---

## ⚠️ Category Gotchas

1. **macOS `._` files**: SSD ngoài tạo AppleDouble artifacts → `find . -name "._*" -delete`
2. **PM2 save**: Sau mỗi `pm2 start`, phải `pm2 save` để persist qua reboot
3. **Port conflicts**: Check `lsof -i :<port>` trước khi start service mới
4. **Node version**: Dùng Node 20+ cho ESM compatibility
5. **Hyperframes**: Lint/validate nhận THƯ MỤC, không nhận file .html trực tiếp
6. **Git LFS**: Repo Hyperframes dùng LFS — clone zip sẽ có pointer files
