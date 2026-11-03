# Contributing to TVT Intelligence Hub

All content lives in `content/` as plain files — adding a prompt, skill or boost is a pull request, no database involved.

Not ready to open a PR? Use an [issue form](https://github.com/tvt-ai-max/tvt-prompt-skills-hub/issues/new/choose) (Prompt / Skill / Boost) and a maintainer will turn it into a file.

## 1. Pick the right tier
| Tier | When | Format | Location |
|---|---|---|---|
| **Prompt** | A single, copy-paste instruction with `{{VARIABLES}}` | JSON | `content/prompts/<group>/<id>.json` |
| **Skill** | A repeatable agent SOP with inputs, tools and quality gates | Markdown + YAML frontmatter | `content/skills/<id>.md` |
| **Deep Reasoning** (boost) | A meta-prompt / slash command that changes *how* the model reasons — listed under Prompts | JSON | `content/boosts/<id>.json` |
| **Workflow** | A multi-step pipeline whose steps pipe outputs forward | JSON | `content/workflows/<id>.json` |
| **Bot** (core) | A TVT AI Workforce persona (system prompt) | JSON | `content/bots/<id>.json` |
| **Bot** (specialist) | Generated from `data/personas-source/categories/<field>/personas/*.md` — edit the Markdown, then run `npm run personas:import` | JSON | `content/bots/specialists/<field>/<id>.json` |

The schema is defined in [`types/hub.ts`](types/hub.ts) and documented in [`docs/SPEC.md`](docs/SPEC.md).

## 2. Rules the validator enforces
- `id` is a kebab-case slug, unique across all tiers, and should match the file name.
- `createdAt` (`created_at` in skill frontmatter) is `YYYY-MM-DD`.
- **Prompts:** every `{{VAR}}` in `template` must be declared in `variables`, and every declared variable must be used. `select` variables need ≥ 2 `options`.
- **Skills:** list agent tools/stack in `tools:` (e.g. `ffmpeg`, `web_search`, `read_file`) so they appear in the hub's tool filter. `inputs[].name` matches `[a-zA-Z0-9_]+`; any `{{name}}` inside the SOP body must be one of the inputs; at least one audit gate.
- **Boosts:** `slashCommand` looks like `/boost UPPER_SNAKE`; `persona` is `tvt-agency` or `toilatung`; at least one `{{VARIABLE}}`.
- **Workflows:** `stepNumber` is 1, 2, 3… in order; every `{{KEY}}` in a step's `promptTemplate` is declared in that step's `inputs` (and vice versa); a `previous_step` input must point (`fromStepId`) to an **earlier** step — this keeps the graph acyclic; every step except the last must feed a later step; a `user_input` key keeps the same label everywhere; `botId` (optional) must match a file in `content/bots/`.
- **Bots:** `department` is one of `command`, `content-video`, `marketing-seo`, `crm-automation`; `avatar` is a single emoji; `systemPrompt` is at least 400 characters; `recommendedModels` and `tools` are non-empty.
- **UI strings** live in `locales/vi.json` and `locales/en.json`; every key must exist in both (a unit test enforces parity and identical `{placeholders}`).
- **No secrets.** Content that looks like an API key, token or private key fails validation.

## 3. Check locally
```bash
npm run validate   # schema + catalog checks
npm run readme     # regenerate the README directory index (CI checks it)
npm test           # unit tests for the variable engine & exporters
npx tsc --noEmit   # type safety
npm run build      # runs validate first, then the production build
```

## 4. Writing guidelines
- Open with a role, then numbered steps, then output constraints.
- Give every variable a realistic `defaultValue` so the live preview is useful immediately.
- Avoid AI clichés ("Trong bối cảnh…", "Kỷ nguyên số…") and never ask the model to invent numbers.
