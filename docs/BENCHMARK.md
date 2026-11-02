# Benchmark: prompts.chat · Anthropic Prompt Library · Cursor Directory

Milestone 1 research note — what each reference product does well, where it stops, and what TVT Intelligence Hub adopts or does differently.

| Capability | prompts.chat (awesome-chatgpt-prompts) | Anthropic Prompt Library | Cursor Directory | **TVT Intelligence Hub** |
|---|---|---|---|---|
| Content model | Flat "Act as…" role prompts (CSV/JSON) | Curated prompts split into System / User messages | `.cursorrules` & MCP configs grouped by framework | **3 tiers**: Prompt → Skill (SOP) → Boost (meta-prompt) |
| Variables | Free-text placeholders, edited by hand | Placeholders in prose, edited by hand | None — rules are static | **Typed `{{VARIABLE}}` schema** (text / textarea / select, defaults) with an auto-generated form |
| Preview | Static text | Static text | Static text | **Live preview** with filled values highlighted and unfilled ones flagged |
| Copy targets | One clipboard copy | Copy / "open in console" | Copy rule file | **ChatGPT/Claude**, **Cursor/Windsurf `.cursorrules`**, **`SKILL.md` export** |
| Agent readiness | — | — | Partial (rules for coding agents) | Skills carry **inputs, tools, quality gates**; export straight to `SKILL.md` |
| Search | Text search | Category browse | Search + tags | **Fuzzy `Cmd/Ctrl+K` palette** across titles, tags, slash commands |
| Contribution | PR to a CSV | Closed (Anthropic-curated) | PR / submit form | **GitOps PR** to `content/`, gated by `npm run validate` |
| Localization | English-first | English | English | **Vietnamese-first**, B2B agency & OCP personas |

## Takeaways adopted
1. **From prompts.chat** — open, PR-driven catalog; zero-friction copy. We keep the file-per-item GitOps model but add schema validation so contributions can't break the build.
2. **From Anthropic Prompt Library** — clear role framing and structured instructions. Every prompt template opens with a role, then explicit numbered tasks and output constraints.
3. **From Cursor Directory** — prompts should land where developers work. Hence the `.cursorrules` exporter and `SKILL.md` export for Claude Code / OpenClaw / Hermes.

## Gaps we close
- **Manual find-and-replace** → interactive variable form + live preview (POD problem #1).
- **No agent semantics** → Skill tier with inputs/tools/audit gates (POD problem #2).
- **No reasoning separation** → Boost tier with explicit `reasoningType` (CoT, ToT, red-team, System 1 vs 2) (POD problem #3).
