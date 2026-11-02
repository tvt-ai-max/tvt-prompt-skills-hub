# Contributing to TVT Intelligence Hub

All content lives in `content/` as plain files — adding a prompt, skill or boost is a pull request, no database involved.

## 1. Pick the right tier
| Tier | When | Format | Location |
|---|---|---|---|
| **Prompt** | A single, copy-paste instruction with `{{VARIABLES}}` | JSON | `content/prompts/<group>/<id>.json` |
| **Skill** | A repeatable agent SOP with inputs, tools and quality gates | Markdown + YAML frontmatter | `content/skills/<id>.md` |
| **Boost** | A meta-prompt / slash command that changes *how* the model reasons | JSON | `content/boosts/<id>.json` |

The schema is defined in [`types/hub.ts`](types/hub.ts) and documented in [`docs/SPEC.md`](docs/SPEC.md).

## 2. Rules the validator enforces
- `id` is a kebab-case slug, unique across all tiers, and should match the file name.
- `createdAt` (`created_at` in skill frontmatter) is `YYYY-MM-DD`.
- **Prompts:** every `{{VAR}}` in `template` must be declared in `variables`, and every declared variable must be used. `select` variables need ≥ 2 `options`.
- **Skills:** `inputs[].name` matches `[a-zA-Z0-9_]+`; any `{{name}}` inside the SOP body must be one of the inputs; at least one audit gate.
- **Boosts:** `slashCommand` looks like `/boost UPPER_SNAKE`; `persona` is `tvt-agency` or `toilatung`; at least one `{{VARIABLE}}`.
- **No secrets.** Content that looks like an API key, token or private key fails validation.

## 3. Check locally
```bash
npm run validate   # schema + catalog checks
npm test           # unit tests for the variable engine & exporters
npx tsc --noEmit   # type safety
npm run build      # runs validate first, then the production build
```

## 4. Writing guidelines
- Open with a role, then numbered steps, then output constraints.
- Give every variable a realistic `defaultValue` so the live preview is useful immediately.
- Avoid AI clichés ("Trong bối cảnh…", "Kỷ nguyên số…") and never ask the model to invent numbers.
