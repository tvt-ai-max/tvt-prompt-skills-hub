---
name: devops
mini: true
token_estimate: 360
full_file: SKILL-DEVOPS.md
---
# DevOps [MINI]
> Dùng cho local models. Load full file nếu context đủ lớn.

## Triggers
"deploy", "PM2", "server setup", "CI/CD", "service down", "auto-start", "triển khai"

## Pipeline (4 steps)
1. **Assess** — What service, what port, what stack
2. **Config** — ecosystem.config.js → env vars → dependencies
3. **Deploy** — `pm2 start ecosystem.config.js` → `pm2 save`
4. **Monitor** — `pm2 status` + `pm2 logs` + health check

## Critical PM2 Commands
```bash
pm2 start ecosystem.config.js
pm2 restart <name>
pm2 logs <name> --lines 100
pm2 monit
pm2 save                    # MUST do after every change
pm2 startup                 # auto-start on reboot
```

## ANTIGRAVITY Services Map
```
PM2 managed:
├── openclaw (port 3000)
├── evolve-heartbeat (port 3001)
└── [add new services here]
```

## Troubleshooting Quick Ref
- Service not starting → `pm2 logs` → check error
- Port in use → `lsof -i :<port>` → kill or change port
- Dies after reboot → `pm2 save && pm2 startup`
- High memory → set `max_memory_restart: '500M'`
- Slow → check blocking ops in logs

## Key Rules
1. NEVER `npm run dev` in production
2. ALWAYS `pm2 save` after any change
3. NEVER hardcode env vars — use .env
4. Set `max_memory_restart` on all services
5. Check `pm2 status` before and after deploy

## Anti-Patterns
❌ npm run dev in prod | ❌ No pm2 save | ❌ Hardcoded secrets | ❌ No log rotation

## Integrates With
`openclaw` | `hyperframes` | `skill-fullstack-dev` | `mac-mini`
