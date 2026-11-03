# _CATEGORY-SOP.md — Developing

> Standard Operating Procedures cho software development tasks.
> Tham chiếu nhanh các workflow phổ biến nhất.

---

## 🔄 SOP-DEV-01: New Feature Development

**Thời gian**: 1 ngày - 2 tuần (tùy scope)

```
Bước 1: Understand (< 30 min)
  → Clarify requirements
  → Identify affected systems
  → Estimate complexity (S/M/L/XL)

Bước 2: Design (30 min - 2h)
  → Sketch architecture
  → API contract design
  → DB schema changes
  → Security considerations

Bước 3: Build (bulk of time)
  → Incremental commits (không "big bang")
  → Unit tests alongside code
  → Error handling from the start

Bước 4: Validate
  → Run tests
  → Manual QA
  → Performance check

Bước 5: Deploy
  → Use SKILL-DEVOPS pipeline
  → Monitor logs post-deploy
  → Rollback plan ready
```

---

## 🔄 SOP-DEV-02: Bug Fix

```
1. Reproduce: Confirm bug is reproducible locally
2. Isolate: Find exact failing code
3. Root cause: WHY does it fail (không chỉ WHERE)
4. Fix: Minimal change, không add features
5. Test: Add regression test cho bug này
6. Verify: Test fix in same environment as bug
7. Document: Add comment explaining what/why
```

---

## 🔄 SOP-DEV-03: Code Review Checklist

### Trước khi submit PR
- [ ] Chạy `npm test` / `pytest` — tất cả pass?
- [ ] `npm run lint` — không lỗi
- [ ] Không có console.log/print còn sót
- [ ] Không secrets/keys trong code
- [ ] `.env.example` updated nếu thêm env vars
- [ ] README updated nếu thay đổi setup
- [ ] Commit messages có nghĩa

### Khi review code người khác
- [ ] Logic đúng với requirements?
- [ ] Edge cases được handle?
- [ ] Error handling đầy đủ?
- [ ] Naming rõ ràng và consistent?
- [ ] Không có security issues?
- [ ] Performance implications?

---

## 🔄 SOP-DEV-04: New Project Setup (ANTIGRAVITY Stack)

```bash
# 1. Init project
mkdir project-name && cd project-name
npm init -y

# 2. Setup linting
npm i -D eslint prettier
echo '{"semi": false, "singleQuote": true}' > .prettierrc

# 3. Environment
touch .env .env.example .gitignore
echo ".env\nnode_modules/" >> .gitignore

# 4. PM2 config
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{ name: 'project-name', script: './index.js', env: { NODE_ENV: 'production' } }]
}
EOF

# 5. Start & persist
pm2 start ecosystem.config.js
pm2 save
```

---

## 🔄 SOP-DEV-05: Debugging Production Issue

```
1. Check PM2 logs: pm2 logs <service> --lines 100
2. Check system: pm2 monit
3. Check disk: df -h
4. Check memory: free -h (Linux) / vm_stat (Mac)
5. Check ports: lsof -i :<port>
6. Reproduce locally with same env vars
7. Fix → test → deploy → monitor
```

---

## 📊 Dev KPIs

| Metric | Target | Tool |
|:---|:---|:---|
| Test coverage | >70% | Jest/pytest |
| Build time | <2 min | CI timer |
| Deploy frequency | ≥1×/week | PM2 logs |
| Mean time to recovery | <1h | Monitoring |
| Bug rate | <5% of PRs revert | Git history |

---

## 📎 Tài liệu liên quan

- Skills: `skills/SKILL-*.md` (3 skills)
- Hyperframes CLAUDE.md (Xem chi tiết tại `/Volumes/SSD/ANTIGRAVITY/hyperframes-main/output/CLAUDE.md`)
- OpenClaw docs (Tài liệu chi tiết tại `/Users/mrtony/tvt-ai/openclaw/`)
