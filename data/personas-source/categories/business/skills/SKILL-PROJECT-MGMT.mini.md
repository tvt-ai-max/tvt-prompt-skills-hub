---
name: project-mgmt
mini: true
token_estimate: 300
full_file: SKILL-PROJECT-MGMT.md
---
# Project Management [MINI]
> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"project plan", "lập kế hoạch dự án", "timeline", "task breakdown", "sprint", "WBS", "milestones"

## Pipeline (4 steps)
1. **Scope** — Goal | Stakeholders | Timeline | Resources | Success criteria
2. **Plan** — WBS: Phases → Tasks → Subtasks | Estimate S/M/L | Dependencies
3. **Execute** — Track in task.md | Weekly status | Unblock blockers
4. **Review** — Performance vs plan | Lessons | Retrospective

## Project Charter (quick)
```
Goal: [1 sentence]
Timeline: [Start → End]
Success: [Measurable criteria]
Top 3 Risks: [Risk + mitigation]
```

## Weekly Status Template
```
🟢/🟡/🔴 [Traffic light]
✅ Done: [Tasks]
🔄 In Progress: [Tasks]
⛔ Blocked: [Task + reason + need]
Next week: [Top 3 priorities]
```

## Methodology (ANTIGRAVITY)
**Hybrid**: Weekly sprints (Scrum) + Kanban board + task.md tracking

## ICE for Priority
`(Impact + Confidence + Ease) / 3` → Higher score → do first

## Key Rules
1. Define scope before starting — prevent scope creep
2. Identify top 3 risks upfront with mitigation
3. Update task.md every session
4. Status review every week minimum
5. BLUF in all reports — summary first

## Anti-Patterns
❌ No scope definition | ❌ No risk assessment | ❌ Planning without tracking | ❌ No retrospective

## Integrates With
`task-md-pattern` | `all-projects` | `skill-data-science`
