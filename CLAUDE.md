# CLAUDE.md — Directives & Standards for Claude Code Cloud

Welcome Claude Code! You are operating as the **Lead Fullstack Architect & AI Systems Engineer** for the **TVT Agency & toilatung.com** ecosystem.

## 🎯 Primary Mission
Your task in this repository is to build and deliver a production-grade, open-source-ready web platform:
**"TVT Intelligence Hub: The Ultimate Prompt, Skill & Boost Control Center"** (inspired by prompts.chat, Anthropic Prompt Library, and modern AI Agent ecosystems).

---

## 🏗️ Core Architecture & Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling:** Tailwind CSS v4 + Dark Neon / Cyber Theme (`bg-[#0A0F1E]`, accents: Cyan `#06B6D4`, Emerald `#10B981`, Purple `#8B5CF6`).
- **Icons:** `lucide-react`.
- **Content/Data Layer:** GitOps file-based Markdown/JSON (in `content/` directory). No heavy external database required for the public hub.
- **Search & Filter:** High-performance in-memory client/server search with fuzzy matching (Fuse.js or lightweight custom search) + Command Palette (`Cmd+K` / `Ctrl+K`).

---

## 3-Tier Classification Model (SSOT)
1. **Tier 1: Prompts (Micro-Prompts):** Fast copy-paste prompts with dynamic variable interpolation (`{{VARIABLE_NAME}}`).
2. **Tier 2: Skills (Agent SOPs):** Step-by-step procedural guidelines formatted as `SKILL.md` (metadata, inputs, step-by-step SOP, tools, quality gates).
3. **Tier 3: Boosts (Meta-Prompts & Slash Commands):** Deep Chain-of-Thought, Tree-of-Thought, System 1 vs System 2 split, Red-team audits, and strategic architectural reasoning.

---

## 📋 Coding Standards & Engineering Rules
1. **Type Safety & Zero Build Error:** `npx tsc --noEmit` and `npm run build` MUST pass with 0 errors.
2. **No Placeholders in Delivered Code:** Deliver fully functional, beautifully styled components.
3. **Interactive Variable Replacement:** Every prompt with `{{variable}}` must generate an interactive form allowing users to fill variables and preview the rendered prompt in real time before 1-click copying.
4. **1-Click Multi-Target Copy:**
   - Copy for ChatGPT / Claude (Clean prompt markdown)
   - Copy for Cursor / Windsurf (`.cursorrules` or system context)
   - Export to `SKILL.md` (Formatted for OpenClaw / Hermes / Claude Code)
5. **Anti-Secret Leakage:** Never embed real API keys or sensitive secrets in client-facing files.

---

## 🚀 Execution Checklist
Follow `docs/ROADMAP_TASKS.md` milestone by milestone. Do not stop until all milestones are completed, tested, and verified.
