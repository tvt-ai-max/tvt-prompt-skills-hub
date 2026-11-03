---
name: project-mgmt
category: business
persona-source: Project Manager
description: |
  AI Agent Skill for project planning, tracking, and coordination.
  Creates project plans, manages timelines, and tracks deliverables.
---

# 📋 Project Management Skill

> Project planning, tracking, and cross-team coordination.
> Input: Project scope. Output: Plan + timeline + tracking system.

## Trigger Phrases

- "Lập kế hoạch dự án...", "Project plan...", "Timeline cho..."
- "Task breakdown...", "Sprint planning...", "Project status..."

## Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│1.SCOPE   │ →  │2.PLAN    │ →  │3.EXECUTE │ →  │4.REVIEW  │
│ Define   │    │ Break    │    │ Track    │    │ Report   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

## Project Charter Template

```markdown
## Project: [Name]
- **Goal**: [1 sentence]
- **Timeline**: [Start → End]
- **Success Criteria**: [Measurable]
- **Risks**: [Top 3 with mitigation]
```

## Task Breakdown (WBS)

```markdown
### Phase 1: [Name] (Week 1-2)
- [ ] Task 1.1 — Owner: [Name] — Due: [Date]
- [ ] Task 1.2

### Milestones
- 🏁 M1: [Milestone] — [Date]
```

## Status Report

```markdown
### Traffic Light: 🟢/🟡/🔴
- ✅ Completed: [Tasks]
- 🔄 In Progress: [Tasks]  
- ⛔ Blocked: [Tasks + reason]
```

## Anti-Patterns

1. ❌ No clear scope → scope creep
2. ❌ No risk assessment → surprises
3. ❌ Too granular planning → wasted effort

## Integration

| System | Integration |
|:---|:---|
| **All Projects** | Cross-project coordination |
| **Task.md** | Antigravity task tracking pattern |
