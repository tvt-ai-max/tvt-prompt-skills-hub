# 🌌 TVT Intelligence Hub
### The Ultimate Prompt, Skill & Boost Control Center

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

An open-source, interactive catalog for AI-native teams, solopreneurs (OCP) and agencies. It goes beyond static prompt libraries like `prompts.chat` with a 3-tier capability model, typed variable forms, live preview and one-click export to ChatGPT/Claude, Cursor and `SKILL.md`.

**Launch catalog:** 32 Prompts · 12 Skills · 7 Boosts. Content is mostly Vietnamese, written for B2B agency and OCP use cases.

---

## ⚡ The 3-Tier Architecture

```
TIER 3 · BOOSTS   meta-prompts & slash commands — CoT · ToT · Red-team · System 1 vs 2
      ▲  upgrade with deep reasoning
TIER 2 · SKILLS   SKILL.md agent SOPs — inputs → tools → steps → quality gates
      ▲  standardize into a repeatable flow
TIER 1 · PROMPTS  micro-prompts with {{VARIABLE}} forms — fill → preview → copy in < 15s
```

## 🚀 Features

| | |
|---|---|
| 🧩 **Interactive Variable Replacer** | Every `{{VARIABLE}}` becomes a typed input (text / textarea / select) pre-filled with a realistic default. The live preview highlights filled values in emerald and still-empty placeholders in amber. Click a highlight to jump to its field. |
| 📋 **1-Click Multi-Target Copy** | **ChatGPT / Claude** (clean prompt) · **Cursor / Windsurf** (`.cursorrules` block with role, instructions, operating rules) · **Export `SKILL.md`** (YAML frontmatter + body for Claude Code, OpenClaw, Hermes) as a download or to the clipboard. |
| ⌘ **Command Palette** | `Cmd+K` / `Ctrl+K` (or `/`) opens fuzzy search (Fuse.js) over titles, tags, categories and slash commands, with full keyboard navigation. |
| 🗂 **Filter bar** | Tier pills with live counts, persona and category dropdowns, and an inline quick filter. |
| 📄 **Static detail pages** | `/items/[id]` is prerendered for every item (SEO metadata, skill inputs/tools/gates, related items). |
| 🛡 **Content validation** | `scripts/validate-data.ts` checks every file against `types/hub.ts`: variable schema consistency, slugs, dates, unique IDs, minimum catalog size, and **secret-leak detection**. It runs automatically before every build. |
| 🌑 **Dark Neon UI** | `#0A0F1E` base with cyan / emerald / violet accents. Responsive down to 375px, keyboard accessible, and honors reduced motion. |

### UI map

```
┌ Navbar ─ logo · Prompts · Skills · Boosts · [⌘K Search] · ★ GitHub · ☰ (mobile drawer)
├ Hero ─ title · tagline · search · stats (32 / 12 / 7)
├ Tier ladder ─ Prompt → Skill → Boost
├ FilterBar ─ [All|Prompts|Skills|Boosts] [Persona ▾] [Category ▾] [quick filter]
└ Card grid ─ tier/persona badges · quick-copy · tags · "N variables / N gates"
      └─ click ─▶ Variable drawer: [form] │ [live preview · ChatGPT | Cursor | SKILL.md] → copy/export
```

---

## 🛠️ Quickstart

Requires **Node.js ≥ 20.9**.

```bash
git clone https://github.com/tvt-ai-max/tvt-prompt-skills-hub.git
cd tvt-prompt-skills-hub
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server (Turbopack) |
| `npm run validate` | Validate all content in `content/` |
| `npm test` | Unit tests: variable engine, exporters, schema, highlighter |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Validate content, then build a production bundle (fully static) |
| `npm start` | Serve the production build |

Optional: set `NEXT_PUBLIC_SITE_URL` for canonical/OG URLs (defaults to `https://hub.toilatung.com`).

---

## 📁 Project structure

```
app/                     Next.js App Router (/, /prompts, /skills, /boosts, /items/[id])
components/              UI: Navbar, Hero, FilterBar, ItemCard, VariableWorkbench, VariableModal, CommandPalette…
content/
  prompts/<group>/*.json Tier 1 — PromptItem
  skills/*.md            Tier 2 — SkillItem (YAML frontmatter + SOP markdown)
  boosts/*.json          Tier 3 — BoostItem
lib/
  variables.ts           {{VAR}} regex, parse/render, workbench model for every tier
  exporters.ts           ChatGPT/Claude · .cursorrules · SKILL.md builders
  schema.ts              runtime validation mirroring types/hub.ts (+ secret scan)
  loader.ts / content.ts filesystem loader (build-time) / server-only accessors
  search.ts              Fuse.js index
scripts/validate-data.ts content validator (runs on prebuild)
types/hub.ts             single source of truth for the schemas
docs/                    POD, SPEC, ROADMAP_TASKS, BENCHMARK
```

## 🤝 Contributing

New prompts, skills and boosts are welcome. Read **[CONTRIBUTING.md](CONTRIBUTING.md)** for the file formats and validation rules. In short: add a file under `content/`, run `npm run validate`, and open a PR.

## 📖 Documentation
- [Product Overview Document (POD)](docs/POD.md)
- [Technical Specification (SPEC)](docs/SPEC.md)
- [Roadmap & Task Checklist](docs/ROADMAP_TASKS.md)
- [Benchmark vs prompts.chat / Anthropic Prompt Library / Cursor Directory](docs/BENCHMARK.md)

---

Created with ❤️ by **[TVT Agency](https://tvtagency.com)** & **[toilatung.com](https://toilatung.com)** · [MIT License](LICENSE)
