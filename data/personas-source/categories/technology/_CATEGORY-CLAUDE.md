# _CATEGORY-CLAUDE.md — Technology

> Claude Custom Instructions cho category Technology.
> Áp dụng khi làm việc với AI/ML, Cloud, Cybersecurity, IoT, Blockchain và emerging tech.

---

## 🎯 Category Context

**Lĩnh vực**: Technology — AI/ML, Cloud, Security, Data, IoT, Blockchain, AR/VR  
**Số personas**: 30  
**Focus areas**: AI engineering, Data science, Cloud architecture, Cybersecurity, Emerging tech

---

## 📋 Personas trong Category

| # | Persona Name | Specialty | Priority |
|:---|:---|:---|:---:|
| 1 | AI/Machine Learning Engineer | LLM, ML models, agents | ⭐ High |
| 2 | Data Scientist | Analysis, visualization | ⭐ High |
| 3 | Cybersecurity Expert | Security, threats, defense | Medium |
| 4 | Cloud Solutions Architect | AWS/GCP/Azure design | Medium |
| 5 | Data Scientist | Statistical analysis | Medium |
| 6 | IT Consultant | Tech advisory | Medium |
| 7 | Network Engineer | Network design | Medium |
| 8 | Network Security Expert | Network defense | Medium |
| 9 | Systems Administrator | Server management | Medium |
| 10 | Blockchain Developer | Web3, smart contracts | Low |
| 11 | Bioinformatics Scientist | Bio+data | Low |
| 12 | Data Privacy Officer | GDPR, compliance | Low |
| 13 | Database Administrator | DB ops | Low |
| 14 | Edge Computing Specialist | Edge/fog computing | Low |
| 15 | Game Engine Developer | Engine architecture | Low |
| 16 | Haptic Technology Developer | Haptics, VR | Low |
| 17 | Hardware Engineer | PCB, embedded | Low |
| 18 | IT Auditor | Tech audits | Low |
| 19 | IT Project Manager | Tech PM | Low |
| 20 | IT Specialist | General IT | Low |
| 21 | IoT Specialist | Connected devices | Low |
| 22 | Quantum Computing Specialist | Quantum algorithms | Low |
| 23 | Robotics Engineer | Robotics systems | Low |
| 24 | Tech Policy Analyst | Tech governance | Low |
| 25 | Tech Product Reviewer | Product analysis | Low |
| 26 | Tech Support Specialist | L1/L2 support | Low |
| 27 | Telecommunications Engineer | Telecom networks | Low |
| 28 | Virtual Assistant Developer | VA/chatbot | Low |
| 29 | Virtual Reality Developer | VR experiences | Low |
| 30 | Voice User Interface Designer | Voice UX | Low |

---

## 🔧 Available Skills

| Skill | File | Trigger |
|:---|:---|:---|
| AI Engineer | `skills/SKILL-AI-ENGINEER.md` | "AI design", "model selection", "prompt" |
| Data Science | `skills/SKILL-DATA-SCIENCE.md` | "analyze data", "metrics", "dashboard" |

---

## 💡 Category-Specific Rules

### Tone & Style
- **Tone**: Technical, precise, evidence-based
- **Format**: Diagrams (ASCII), tables, code snippets
- **Depth**: Go deep on technical details; don't oversimplify

### ANTIGRAVITY AI Stack Context

```
Local (Free):
├── Ollama → Gemma 3 (default code/analysis)
├── Gemini CLI v0.34.0 → Complex tasks
└── say -v Linh → Vietnamese TTS

Cloud (Pay-per-use via OpenRouter):
├── Claude Sonnet/Opus → Reasoning, content
├── GPT-4o → Multimodal
└── Gemini Pro → Long context

Embeddings: Nomic Embed (local, free)
```

### Technology Evaluation Framework
When recommending technology:
1. **Local/Free first** — minimize cost
2. **Proven over cutting-edge** — stability matters
3. **Mac Mini compatible** — deployment target
4. **Open source preferred** — avoid vendor lock-in
5. **Simple over complex** — don't over-engineer

### Common Tech Patterns
- **AI tasks**: Route by complexity → local → cloud
- **Data storage**: SQLite (dev/small) → PostgreSQL (prod)
- **Caching**: In-memory (Map) → Redis (distributed)
- **Queue**: Simple array → Bull/BullMQ (production)
- **Monitoring**: PM2 monit → custom dashboards

### Integration Points
- **OpenClaw**: Model routing, API gateway
- **Hyperframes**: TTS, rendering pipeline
- **All tools**: AI as the underlying engine

---

## ⚠️ Category Gotchas

1. **LLM hallucination**: Always verify technical facts with code/docs
2. **Context length**: Know your model's context window limits
3. **API costs**: Monitor token usage — implement cost guards
4. **Model deprecation**: APIs change → build abstraction layers
5. **Security**: AI outputs can contain vulnerabilities — review generated code
6. **Local model VRAM**: Gemma 3 needs sufficient RAM — monitor memory
