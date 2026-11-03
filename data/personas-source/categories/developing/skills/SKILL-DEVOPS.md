---
name: devops
category: developing
persona-source: DevOps Engineer
description: |
  AI Agent Skill for DevOps operations — CI/CD, monitoring, and infrastructure.
  Manages PM2 processes, server configs, and deployment pipelines.
  Optimized for ANTIGRAVITY Mac Mini local infrastructure.
---

# ⚙️ DevOps Skill

> Infrastructure, deployment, and operations management.
> Input: Service/deployment need. Output: Configured and running system.

## Trigger Phrases

- "Deploy...", "Triển khai..."
- "PM2...", "Process manager..."
- "Server setup...", "Cấu hình server..."
- "CI/CD...", "Monitoring..."
- "Service down...", "Debug production..."
- "Auto-start...", "Startup script..."

## Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│1.ASSESS  │ →  │2.CONFIG  │ →  │3.DEPLOY  │ →  │4.MONITOR │
│ Infra    │    │ Setup    │    │ Launch   │    │ Health   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## ANTIGRAVITY Infrastructure Map

```
Mac Mini (Local)
├── PM2 Managed Services
│   ├── OpenClaw Gateway (port 3000)
│   ├── Evolve-Heartbeat (port 3001)
│   └── [Other services]
├── Tools
│   ├── Hyperframes (npx, on-demand)
│   ├── Open Design (daemon + web)
│   └── Gemini CLI
└── Storage
    └── /Volumes/SSD/ANTIGRAVITY/
```

## PM2 Operations

```bash
# Service management
pm2 start app.js --name "service-name"
pm2 restart service-name
pm2 stop service-name
pm2 delete service-name

# Monitoring
pm2 status
pm2 logs service-name --lines 50
pm2 monit

# Persistence (auto-start on reboot)
pm2 save
pm2 startup  # generates startup script

# Ecosystem file
pm2 start ecosystem.config.js
```

### Ecosystem Config Template

```javascript
module.exports = {
  apps: [{
    name: 'service-name',
    script: './index.js',
    cwd: '/path/to/project',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

## Deployment Checklist

- [ ] Environment variables set (.env)
- [ ] Dependencies installed (npm ci)
- [ ] Build completed (npm run build)
- [ ] PM2 ecosystem configured
- [ ] Process started and healthy
- [ ] Logs check (pm2 logs)
- [ ] pm2 save (persist across reboots)
- [ ] Health endpoint verified

## Troubleshooting Playbook

| Symptom | Check | Fix |
|:---|:---|:---|
| Service not starting | `pm2 logs` | Check error, fix deps |
| Port already in use | `lsof -i :<port>` | Kill process or change port |
| High memory | `pm2 monit` | Set max_memory_restart |
| Service dies after reboot | `pm2 save && pm2 startup` | Setup persistence |
| Slow response | `pm2 monit` + logs | Check for blocking ops |

## Anti-Patterns

1. ❌ Running production with `npm run dev`
2. ❌ No pm2 save after changes
3. ❌ Hardcoded env vars in code
4. ❌ No log rotation — logs fill disk
5. ❌ Running as root — use user permissions

## Integration

| System | Integration |
|:---|:---|
| **OpenClaw** | Gateway service management |
| **Hyperframes** | On-demand rendering |
| **SKILL-FULLSTACK-DEV** | Code → deploy pipeline |
| **PM2** | Process management |
| **Mac Mini** | Local infrastructure |
