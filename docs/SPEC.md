# SPEC: Technical Architecture & Data Schemas

---

## 1. System Architecture Overview

```
[GitOps Markdown / JSON Content Layer]
  ├── content/prompts/*.json
  ├── content/skills/*.md
  └── content/boosts/*.json
           │
           ▼
[Content Parsing & Indexing Engine (Server-side / Build-time)]
           │
           ▼
[Client State & Interactive Variable Engine]
  ├── Regex Parser: /\{\{([a-zA-Z0-9_]+)\}\}/g
  ├── Dynamic Form Generator
  └── Live Preview Renderer
           │
           ▼
[Export & Multi-Target Copy Service]
  ├── Copy for ChatGPT / Claude
  ├── Copy for Cursor Rules (.cursorrules)
  └── Export as Agent Skill (SKILL.md)
```

---

## 2. Data Schemas (TypeScript Interfaces)

### 2.1. Prompt Item Schema
```typescript
export interface PromptVariable {
  key: string;            // e.g. "TARGET_AUDIENCE"
  label: string;          // e.g. "Đối Tượng Khách Hàng"
  defaultValue?: string;  // e.g. "Chủ doanh nghiệp SME"
  placeholder?: string;
  type?: 'text' | 'textarea' | 'select';
  options?: string[];
}

export interface PromptItem {
  id: string;             // slug format: "b2b-seo-geo-writer"
  title: string;
  description: string;
  category: 'marketing' | 'seo' | 'copywriting' | 'coding' | 'system-design' | 'operations';
  tier: 'prompt';
  persona: 'tvt-agency' | 'toilatung' | 'general';
  tags: string[];
  author: string;
  variables: PromptVariable[];
  template: string;       // raw string containing {{VARIABLE}}
  createdAt: string;
}
```

### 2.2. Skill Item Schema
```typescript
export interface SkillItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: 'skill';
  persona: 'tvt-agency' | 'toilatung' | 'general';
  tags: string[];
  inputs: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
  auditGates: string[];   // e.g. ["7-Point Quality Audit", "Anti-Secret Redaction"]
  sopMarkdown: string;    // Full markdown content of the SOP
  createdAt: string;
}
```

### 2.3. Boost Item Schema
```typescript
export interface BoostItem {
  id: string;
  title: string;
  description: string;
  slashCommand: string;   // e.g. "/boost OCP_ARCHITECT"
  tier: 'boost';
  persona: 'tvt-agency' | 'toilatung';
  reasoningType: 'chain-of-thought' | 'tree-of-thought' | 'red-team' | 'system1-vs-2';
  template: string;
  createdAt: string;
}
```

---

## 3. UI/UX Specifications
- **Design Tokens:**
  - Background: `#0A0F1E` (Dark Navy Space)
  - Surface Card: `#131B2E` with subtle border `rgba(255, 255, 255, 0.08)`
  - Accent Cyan: `#06B6D4`
  - Accent Emerald: `#10B981`
  - Accent Violet: `#8B5CF6`
  - Text Primary: `#F8FAFC`, Secondary: `#94A3B8`
- **Key Components:**
  1. `Navbar`: Logo with gradient text, Search trigger (`Cmd+K`), GitHub star counter, Theme toggle.
  2. `FilterBar`: Segmented control for Tiers (All / Prompts / Skills / Boosts), Dropdowns for Persona & Category.
  3. `ItemCard`: Hover glow effect, badge for Tier & Persona, 1-click quick copy button.
  4. `VariableModal`: Drawer or dialog showing the template, dynamic input fields for all `{{vars}}`, live markdown preview, and copy actions.
  5. `CommandPalette`: Fast fuzzy search modal with keyboard navigation.

---

## 4. Performance & Deployment
- Zero server database latency via build-time static generation (`generateStaticParams`).
- Edge-ready deployment on Vercel or VPS HestiaCP/Node.js.

---

## 5. V3 Schemas (see `types/hub.ts` for the source of truth)

### 5.1 Workflow (`content/workflows/*.json`)
```typescript
interface WorkflowInput { key: string; label: string; source: 'user_input' | 'previous_step'; fromStepId?: string; defaultValue?: string; type?: 'text' | 'textarea' | 'select'; options?: string[] }
interface WorkflowStep { stepNumber: number; id: string; title: string; agentRole: string; botId?: string; targetModel: string; inputs: WorkflowInput[]; promptTemplate: string; outputFormat: 'markdown' | 'json' | 'image_prompt' | 'code'; qualityGate: string }
interface WorkflowItem { id: string; slug: string; title: string; summary: string; category: string; difficulty: 'Beginner' | 'Advanced' | 'Enterprise OCP'; estimatedTime: string; estimatedCost: string; persona: Persona; tags: string[]; author: string; createdAt: string; steps: WorkflowStep[] }
```
Edges are `previous_step` inputs and may only point to earlier steps, so every workflow is a DAG by construction.

### 5.2 Bot (`content/bots/*.json`)
```typescript
interface BotItem { id: string; name: string; role: string; department: 'command' | 'content-video' | 'marketing-seo' | 'crm-automation'; avatar: string; description: string; systemPrompt: string; recommendedModels: string[]; tools: string[]; tags: string[]; author: string; createdAt: string }
```

---

## 6. V4 additions
- `BotItem.tier?: 'core' | 'specialist'`, `specialty?` (one of 10 fields), `customInstructions?: { know, respond }`.
- **MCP server** — `POST /api/mcp`, JSON-RPC 2.0 over Streamable HTTP (stateless). Methods: `initialize`, `ping`, `tools/list`, `tools/call`; tools: `tvt_search(query, tier?, limit?)`, `tvt_get_prompt(id)`, `tvt_get_skill(id)`, `tvt_get_bot(id)`, `tvt_list_workflows(id?)`. Results use `{ content: [{ type: "text", text }] }` (+ `structuredContent`); unknown ids return `isError: true`.
- **i18n** — `locales/{vi,en}.json`, `MessageKey` type derived from `vi.json`, `useTranslation()` / `<T k />`, locale order `?lang=` → localStorage/`NEXT_LOCALE` cookie → browser language (crawlers stay on `vi`).
