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
