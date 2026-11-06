# ROADMAP & EXECUTION TASKS FOR CLAUDE CODE CLOUD

Claude Code: Please execute the milestones below sequentially. After completing each item, mark it with `[x]` and ensure all unit tests/build checks pass before moving to the next.

---

## 🎯 MILESTONE 1: Architecture, Data Schemas & Initial Datasets
- [x] Research and benchmark against `prompts.chat`, `Anthropic Prompt Library`, and `Cursor Directory` → [`docs/BENCHMARK.md`](BENCHMARK.md).
- [x] Finalize TypeScript types in `types/hub.ts`.
- [x] Create seed dataset in `content/`:
  - [x] 20+ Prompts in `content/prompts/` — **32 delivered** (covering B2B marketing, SEO, copywriting, code refactoring, system architecture).
  - [x] 10+ Skills in `content/skills/` — **12 delivered** (covering 7-Point Audit, Meta Ads 2-step scheduler, HestiaCP audit, SEO/GEO content writer).
  - [x] 5+ Boosts in `content/boosts/` — **7 delivered** (System 1/2 classifier, OCP Red-Team, Unit Economics auditor).
- [x] Write a script `scripts/validate-data.ts` to ensure all content items conform strictly to TypeScript interfaces and have valid variable schemas.

---

## ⚡ MILESTONE 2: Fullstack Next.js 16 Web Application Scaffolding
- [x] Initialize Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 in root.
- [x] Implement Dark Neon Design System with CSS variables and Tailwind classes.
- [x] Build core UI layout:
  - [x] Header / Navigation with responsive drawer.
  - [x] Hero Section with title, tagline, and quick stats (Total Prompts, Skills, Boosts).
  - [x] Filter Bar (Tier pills, Persona filter, Category dropdown).
  - [x] Grid of Item Cards with smooth hover effects and badge indicators.
- [x] Build Interactive Variable Replacer:
  - [x] Modal or expandable drawer displaying prompt with highlighted `{{variables}}`.
  - [x] Auto-generated input fields matching each variable.
  - [x] Real-time output preview updating as user types.
  - [x] 1-Click Multi-target copy:
    - [x] Copy for ChatGPT / Claude
    - [x] Copy for Cursor / System Prompt
    - [x] Export as SKILL.md
- [x] Build Command Palette (`Cmd+K` / `Ctrl+K`) for instant keyboard-driven search.

---

## 🛡️ MILESTONE 3: Quality Assurance & Build Verification
- [x] Run `npx tsc --noEmit` to verify 100% type safety.
- [x] Run `npm run build` and ensure zero errors or warnings during static generation.
- [x] Ensure mobile responsive layout works flawlessly down to 375px width.
- [x] Optimize images, icons, and bundle size.

---

## 📦 MILESTONE 4: Documentation, README & GitHub Release
- [x] Write comprehensive `README.md` with features, screenshots/mockup diagrams, quickstart instructions, and contribution guidelines.
- [x] Add LICENSE (MIT).
- [x] Commit all code with clean, professional commit messages.
- [x] Summarize achievements and deliver final report.

---

## 🌍 MILESTONE 5 (V2): SEO / GEO, Theme Engine & GitHub Virality
- [x] Theme engine Dark / Light / System — zero-FOUC inline boot script, `Shift + D`, animated toggle, WCAG AAA text contrast in light mode.
- [x] JSON-LD: `WebSite` + `SearchAction`, `SoftwareApplication`, `Organization` (home); `TechArticle` + `HowTo` + `FAQPage` + `BreadcrumbList` (items).
- [x] Canonical URLs, dynamic OpenGraph images (Vietnamese-capable fonts), `sitemap.xml`, `robots.txt` (search + AI bots), `/llms.txt`.
- [x] Answer-first summary + visible FAQ on every item page.
- [x] Favorites (pin to top, `localStorage`), tag cloud, agent-tool/stack filter, `?q=` / `?tag=` URL sync.
- [x] Workbench: Clear all, Direct link with variable params, toasts.
- [x] Social sharing (X, LinkedIn, Facebook, native share), Contribute dialog, GitHub issue forms + PR template.
- [x] `/build-in-public` story page.
- [x] Slim client payload: summaries + on-demand static JSON (`/data/items/[id]`).
- [x] README: badges, generated Curated Directory Index (`npm run readme`, CI-checked), Vercel button, Docker, static export, topics.
- [x] CI workflow: validate → README check → tests → tsc → build.

---

## 🔀 MILESTONE 6 (V3): Workflows DAG Engine & 16 AI Workforce Bots
- [x] `WorkflowItem` / `WorkflowStep` / `WorkflowInput` and `BotItem` types; validators (sequential steps, backward-only edges = acyclic, declared ↔ used variables, every intermediate output consumed, consistent user-input labels, bot links resolve).
- [x] 5 workflows in `content/workflows/` (B2B Campaign Launcher, YouTube Shorts Factory, SEO/GEO Long-form Dominator, OCP Decision Stress Test, VPS Onboarding Automation).
- [x] 16 bots in `content/bots/` (Lexi, Scout, Quill, Reel, Pixel, Shield, Bolt, Echo, Metric, North, Ally, Arrow, Buzz, Craft, Crown, Pulse).
- [x] Workflow Studio: node canvas with data edges, live variable piping simulator, paste-real-output piping, Copy All Sequential Prompts, n8n JSON export, Python CLI export.
- [x] Bots catalog with department filter, 1-click Copy System Prompt, subagent `.md` download.
- [x] Navigation `Prompts | Skills | Bots | Workflows`; Boosts folded into Prompts as **Deep Reasoning** (`/boosts` → 308 redirect).
- [x] SEO: JSON-LD (HowTo for workflows, SoftwareApplication for bots), sitemap, llms.txt, OG images; README index includes Workflows & Bots.

---

## 👑 MILESTONE 7 (V4): The Grand Finale
- [x] 301 specialist personas imported from `data/personas-source/` (relative paths, `npm run personas:import`) → 317 bots; safe ≤ 31-char slugs (`risk-mgmt-specialist`), department mapping, ChatGPT custom instructions.
- [x] `/bots`: ⭐ TVT Core Workforce (16) / 🌐 Specialist Personas (301) tabs, 10-field filter, real-time search, Copy System Prompt + Copy Custom Instructions; on-demand `/data/bots/[id]`.
- [x] MCP-first API: `POST /api/mcp` (JSON-RPC 2.0, Streamable HTTP) with 5 tools; verified with the official MCP SDK client.
- [x] `/docs/api`, `/docs/self-hosting`, `/guide` (5 chapters, bilingual, copyable code).
- [x] Bilingual UI: type-safe `locales/vi.json` + `en.json`, switcher, cookie + localStorage, browser detection, `?lang=en`, hreflang, zero-FOUC.
- [x] Secret scanner hardened against in-word false positives (`risk-management-…`).

---

## 🚀 MILESTONE 8 (V5): Modern Agentic Workspace, Collapsible Sidebar & Stack Builder (AITMPL-Inspired)
- [ ] **Architecture & Layout Modernization:**
  - [ ] Collapsible left sidebar (`<<` toggle) with state persistence (`localStorage: 'lexihub_sidebar_collapsed'`).
  - [ ] Live count badges for every tier and category (`Skills [60]`, `Agents [317]`, `Prompts [139]`, `Workflows [5]`, `Deep Reasoning [7]`, `MCPs [15+]`).
  - [ ] Mobile-responsive drawer sync with seamless overlay.
- [ ] **"My Stack Builder" (Personalized Workspace & Bundle Exporter):**
  - [ ] State management for active stack (`useStack` hook with `localStorage` persistence).
  - [ ] Quick-action `+ Add to Stack` on every card and detail modal.
  - [ ] Stack Inspector drawer / page showing selected components, estimated token footprint, and combined capabilities.
  - [ ] 1-Click Multi-Bundle Export:
    - [ ] Combined `claude-code` CLI command.
    - [ ] Export bundled `.cursorrules` / `.agent` zip archive.
    - [ ] Sharable permalink with encoded stack state (`/stack?items=...`).
- [ ] **Dedicated MCPs & Security Hooks Catalog:**
  - [ ] Filter tab and dedicated explorer for Model Context Protocol servers (`Supabase`, `PostgreSQL`, `GitHub`, `Stripe`, `Cloudflare`, `Notion`).
  - [ ] Security hooks catalog (`secret-redactor`, `protected-paths`, `destructive-command-blocker`).
- [ ] **Ecosystem & Virality Modules:**
  - [ ] "Trending Now" algorithm ranking items by copy velocity and views.
  - [ ] B2B Solutions spotlight linking high-value workflows directly to TVT Agency enterprise services.

