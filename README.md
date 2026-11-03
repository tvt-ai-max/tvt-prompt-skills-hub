<div align="center">

# 🌌 TVT Intelligence Hub

### Awesome Prompts, Agent Skills (`SKILL.md`) & Boost meta-prompts, with a fill-in-the-variables workbench

**Pick a prompt, fill in its `{{VARIABLES}}`, preview the result, and copy it in one click to ChatGPT · Claude · Cursor, or export it as `SKILL.md`.**

[![CI](https://github.com/tvt-ai-max/tvt-prompt-skills-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/tvt-ai-max/tvt-prompt-skills-hub/actions/workflows/ci.yml)
[![GitHub stars](https://img.shields.io/github/stars/tvt-ai-max/tvt-prompt-skills-hub?style=flat&logo=github&color=f59e0b)](https://github.com/tvt-ai-max/tvt-prompt-skills-hub/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-10b981.svg?style=flat)](CONTRIBUTING.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](LICENSE)
<br/>
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-149ECA?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

[**🌐 Live hub**](https://hub.toilatung.com) · [**📚 Directory index**](#-curated-directory-index) · [**🚀 Deploy**](#-deploy-in-one-click) · [**🤝 Contribute**](CONTRIBUTING.md) · [**📖 Build in Public**](https://hub.toilatung.com/build-in-public)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftvt-ai-max%2Ftvt-prompt-skills-hub&project-name=tvt-intelligence-hub&env=NEXT_PUBLIC_SITE_URL&envDescription=Public%20URL%20used%20for%20canonical%20links%2C%20sitemap%20and%20OpenGraph)

</div>

---

## Why this repo?

Most prompt libraries, such as `prompts.chat`, are static text you edit by hand. TVT Intelligence Hub organizes AI capabilities into **3 tiers** and makes every one of them interactive:

```
TIER 3 · BOOSTS   meta-prompts & slash commands: CoT · ToT · Red-team · System 1 vs 2
      ▲  upgrade with deeper reasoning
TIER 2 · SKILLS   SKILL.md agent SOPs: inputs → tools → steps → quality gates
      ▲  standardize into a repeatable flow
TIER 1 · PROMPTS  micro-prompts with {{VARIABLE}} forms: fill → preview → copy
```

Most content is written in Vietnamese for B2B agencies, solopreneurs (OCP), video production and AI-agent builders. Every item is a plain file in [`content/`](content), so contributing means opening a pull request.

## ✨ Features

| | |
|---|---|
| 🧩 **Interactive Variable Workbench** | Each `{{VARIABLE}}` gets its own input (text / textarea / select), pre-filled with an example. The live preview highlights filled values and flags empty ones. **Reset to examples**, **Clear all**, and **Direct link** (a URL that opens the form already filled in). |
| 📋 **Multi-target export** | **ChatGPT / Claude** (clean Markdown) · **Cursor / Windsurf** (`.cursorrules`) · **`SKILL.md`** for Claude Code / OpenClaw / Hermes · **Direct link** with the variable values in the URL. |
| ⭐ **Favorites (pin to top)** | Star any card to pin it to the top of the grid and show it under the **Favorites** filter. Stored in `localStorage` and synced across tabs. |
| 🔎 **Search & filters** | `Cmd/Ctrl+K` fuzzy command palette · tier, persona and category filters · **tag cloud** · filter by **agent tool / stack** (FFmpeg, ElevenLabs, Whisper, HyperFrames, n8n, Playwright…). |
| 🌓 **Dark / Light / System** | Dark Cyber Navy (`#0A0F1E`) by default and a light "Clean Editorial" theme with AAA text contrast. An inline boot script applies the theme before first paint, so there is no flash. **`Shift + D`** toggles the theme. |
| 🚀 **SEO + GEO / AEO** | Per-page JSON-LD (`TechArticle` + `HowTo` + `FAQPage` + `BreadcrumbList`; `WebSite` + `SearchAction`, `SoftwareApplication`, `Organization`), canonical URLs, generated OpenGraph images with Vietnamese diacritics, `sitemap.xml`, a `robots.txt` that allows Google, Bing, GPTBot, ClaudeBot, PerplexityBot and others, and [`/llms.txt`](https://hub.toilatung.com/llms.txt) for AI search engines. |
| 📢 **Sharing & contributing** | One-click sharing to X / LinkedIn / Facebook with a generated caption, copy link with a toast, the native share sheet on mobile, and a **Contribute** dialog that links to the GitHub issue forms. |
| ⚡ **Fast and static** | Every page is prerendered. Cards ship as lightweight summaries, and full templates load on demand (prefetched on hover), which cut home-page HTML by about 5× compared with v1. |
| 🛡 **Validation on every build** | `npm run validate` checks the schema, variable consistency, unique IDs and a minimum catalog size, and scans for leaked secrets. It runs before every build and in CI. |

## 📚 Curated Directory Index

Each item links to its interactive page on the live hub (📄 = source file). This section is generated by `npm run readme`, and CI fails when it is out of date.

<!-- DIRECTORY-INDEX:START — generated by `npm run readme`, do not edit by hand -->

**96 tài sản** · 32 Prompts · 57 Skills · 7 Boosts

| Tầng | Chuyên khoa | Số lượng |
|---|---|---:|
| ✨ Prompts | [Copywriting](#prompt-copywriting) | 7 |
| ✨ Prompts | [SEO / GEO](#prompt-seo) | 6 |
| ✨ Prompts | [Coding & Dev](#prompt-coding) | 5 |
| ✨ Prompts | [Marketing & Growth](#prompt-marketing) | 5 |
| ✨ Prompts | [System Design & AI](#prompt-system-design) | 5 |
| ✨ Prompts | [Operations & SOP](#prompt-operations) | 4 |
| 🤖 Skills | [Video & Motion](#skill-video) | 22 |
| 🤖 Skills | [Operations & SOP](#skill-operations) | 9 |
| 🤖 Skills | [Marketing & Growth](#skill-marketing) | 5 |
| 🤖 Skills | [Paid Ads](#skill-ads) | 4 |
| 🤖 Skills | [System Design & AI](#skill-system-design) | 4 |
| 🤖 Skills | [Copywriting](#skill-copywriting) | 3 |
| 🤖 Skills | [SEO / GEO](#skill-seo) | 3 |
| 🤖 Skills | [Brand Strategy](#skill-branding) | 2 |
| 🤖 Skills | [DevOps & VPS](#skill-devops) | 2 |
| 🤖 Skills | [Sales & Enablement](#skill-sales) | 2 |
| 🤖 Skills | [Coding & Dev](#skill-coding) | 1 |
| 🧠 Boosts | [Business Strategy](#boost-strategy) | 4 |
| 🧠 Boosts | [Finance & Accounting](#boost-finance) | 1 |
| 🧠 Boosts | [Marketing & Growth](#boost-marketing) | 1 |
| 🧠 Boosts | [System Design & AI](#boost-system-design) | 1 |

### ✨ Prompts (32)

<a id="prompt-copywriting"></a>

#### Copywriting (7)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [B2B Case Study Storyteller](https://hub.toilatung.com/items/case-study-storyteller) | Biến dữ liệu dự án thành case study thuyết phục: bối cảnh, thách thức, giải pháp, kết quả định lượng và trích… | [📄](content/prompts/copywriting/case-study-storyteller.json) |
| [B2B Cold Email Sequence (4 Touchpoints)](https://hub.toilatung.com/items/b2b-cold-email-sequence) | Chuỗi 4 email outbound cá nhân hóa, không spam, tập trung vào insight và một lời kêu gọi duy nhất mỗi email. | [📄](content/prompts/b2b-agency/b2b-cold-email-sequence.json) |
| [Carousel Series Hook & Slide Writer](https://hub.toilatung.com/items/facebook-carousel-hook-writer) | Viết carousel 8 slide cho Facebook/Instagram/LinkedIn: hook slide, nội dung từng slide, prompt hình minh họa… | [📄](content/prompts/copywriting/facebook-carousel-hook-writer.json) |
| [Landing Page Copy (PAS + Proof Stack)](https://hub.toilatung.com/items/landing-page-pas-copy) | Viết toàn bộ copy landing page theo khung Problem–Agitate–Solve kết hợp Proof Stack, FAQ xử lý phản đối và CT… | [📄](content/prompts/copywriting/landing-page-pas-copy.json) |
| [LinkedIn / Facebook Thought Leadership Post](https://hub.toilatung.com/items/linkedin-thought-leadership-post) | Bài đăng chia sẻ góc nhìn cá nhân theo cấu trúc Hook – Nghịch lý – Bài học – Câu hỏi mở, giọng thực chiến, kh… | [📄](content/prompts/copywriting/linkedin-thought-leadership-post.json) |
| [Quiet Authority Newsletter Writer](https://hub.toilatung.com/items/email-newsletter-quiet-authority) | Viết bản tin email hàng tuần: 1 ý tưởng lớn, 1 framework áp dụng được, 1 tài nguyên — giọng điềm tĩnh, giàu i… | [📄](content/prompts/copywriting/email-newsletter-quiet-authority.json) |
| [Sales Objection Handling Playbook](https://hub.toilatung.com/items/sales-objection-handler) | Bộ kịch bản xử lý 8 lời từ chối phổ biến theo khung Acknowledge – Clarify – Reframe – Confirm. | [📄](content/prompts/copywriting/sales-objection-handler.json) |

<a id="prompt-seo"></a>

#### SEO / GEO (6)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [B2B Thought Leadership & SEO/GEO Article Generator](https://hub.toilatung.com/items/b2b-seo-geo-article) | Viết bài phân tích chuyên sâu cho B2B chuẩn SEO và Generative Engine Optimization (GEO), văn phong Quiet Auth… | [📄](content/prompts/b2b-agency/b2b-seo-geo-article.json) |
| [Content Decay Refresh Planner](https://hub.toilatung.com/items/seo-content-refresh-audit) | Chẩn đoán bài viết bị tụt hạng và lập kế hoạch cập nhật: khoảng trống nội dung, intent shift, E-E-A-T và tín… | [📄](content/prompts/seo/seo-content-refresh-audit.json) |
| [GEO FAQ + JSON-LD Schema Generator](https://hub.toilatung.com/items/geo-faq-schema-generator) | Tạo bộ FAQ trả lời trực diện (Answer-first) tối ưu cho AI search kèm JSON-LD FAQPage hợp lệ. | [📄](content/prompts/seo/geo-faq-schema-generator.json) |
| [Local SEO & Google Business Profile Optimizer](https://hub.toilatung.com/items/local-seo-gbp-optimizer) | Tối ưu hồ sơ Google Business Profile: danh mục, mô tả, dịch vụ, bài đăng hàng tuần và mẫu phản hồi review. | [📄](content/prompts/seo/local-seo-gbp-optimizer.json) |
| [SEO Keyword Cluster & Topic Map](https://hub.toilatung.com/items/seo-keyword-cluster-map) | Gom nhóm từ khóa theo search intent, dựng topic cluster pillar–cluster và kế hoạch internal link 2 chiều. | [📄](content/prompts/seo/seo-keyword-cluster-map.json) |
| [SEO Meta Title & Description Optimizer](https://hub.toilatung.com/items/seo-meta-title-description) | Viết 5 cặp meta title/description tối ưu CTR, đúng giới hạn ký tự và chứa từ khóa tự nhiên. | [📄](content/prompts/seo/seo-meta-title-description.json) |

<a id="prompt-coding"></a>

#### Coding & Dev (5)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Clean Architecture Refactor Assistant](https://hub.toilatung.com/items/code-refactor-clean-architecture) | Refactor đoạn code theo Clean Architecture/SOLID, giữ nguyên hành vi, kèm giải thích từng thay đổi và rủi ro. | [📄](content/prompts/coding/code-refactor-clean-architecture.json) |
| [Security-Focused Code Review](https://hub.toilatung.com/items/code-review-security-checklist) | Review code theo OWASP Top 10: injection, auth, secret leakage, SSRF, XSS — xếp hạng mức độ và đưa bản vá. | [📄](content/prompts/coding/code-review-security-checklist.json) |
| [SQL Query Performance Optimizer](https://hub.toilatung.com/items/sql-query-optimizer) | Phân tích câu SQL chậm, đọc EXPLAIN, đề xuất index, viết lại query và ước lượng cải thiện. | [📄](content/prompts/coding/sql-query-optimizer.json) |
| [TypeScript Strict Mode Migration Plan](https://hub.toilatung.com/items/typescript-strict-migration) | Lập kế hoạch và sửa code để bật strict mode TypeScript từng bước, loại bỏ any, giữ build xanh. | [📄](content/prompts/coding/typescript-strict-migration.json) |
| [Unit Test Suite Generator](https://hub.toilatung.com/items/unit-test-generator) | Sinh bộ unit test đầy đủ: happy path, edge case, error case, theo framework bạn chọn và chuẩn AAA. | [📄](content/prompts/coding/unit-test-generator.json) |

<a id="prompt-marketing"></a>

#### Marketing & Growth (5)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [B2B Ideal Customer Profile (ICP) Builder](https://hub.toilatung.com/items/b2b-ideal-customer-profile) | Dựng chân dung khách hàng lý tưởng B2B gồm firmographics, trigger mua hàng, buying committee và tiêu chí loại… | [📄](content/prompts/b2b-agency/b2b-ideal-customer-profile.json) |
| [B2B Webinar Funnel Planner](https://hub.toilatung.com/items/webinar-funnel-planner) | Lên kế hoạch phễu webinar B2B trọn gói: chủ đề, outline 45 phút, chuỗi email mời, kịch bản chuyển đổi và KPI. | [📄](content/prompts/b2b-agency/webinar-funnel-planner.json) |
| [Competitor Positioning Matrix & White Space Finder](https://hub.toilatung.com/items/competitor-positioning-matrix) | Phân tích đối thủ theo 2 trục định vị, tìm khoảng trống thị trường và đề xuất tuyên bố định vị khác biệt. | [📄](content/prompts/b2b-agency/competitor-positioning-matrix.json) |
| [Meta Ads Creative Angle Matrix](https://hub.toilatung.com/items/meta-ads-creative-angles) | Sinh ma trận 9 góc sáng tạo quảng cáo Meta theo mức độ nhận thức khách hàng, kèm hook, primary text và brief… | [📄](content/prompts/b2b-agency/meta-ads-creative-angles.json) |
| [Value Proposition Canvas Generator](https://hub.toilatung.com/items/b2b-value-proposition-canvas) | Lập Value Proposition Canvas: Jobs, Pains, Gains ánh xạ với Pain Relievers và Gain Creators cho một phân khúc. | [📄](content/prompts/b2b-agency/b2b-value-proposition-canvas.json) |

<a id="prompt-system-design"></a>

#### System Design & AI (5)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Dual-Engine System 1 vs System 2 Task Dispatcher](https://hub.toilatung.com/items/system1-system2-router) | Phân tầng tác vụ thông minh: Tách phản xạ nhanh (System 1) và suy luận logic sâu (System 2) nhằm tối ưu chi p… | [📄](content/prompts/ocp-architect/system1-system2-router.json) |
| [LLM Token Cost & Model Routing Estimator](https://hub.toilatung.com/items/llm-token-cost-estimator) | Ước tính chi phí token theo tháng cho một tính năng AI, so sánh phương án định tuyến model và đề xuất tối ưu. | [📄](content/prompts/ocp-architect/llm-token-cost-estimator.json) |
| [Multi-Agent DAG & JSON Handoff Designer](https://hub.toilatung.com/items/multi-agent-dag-handoff) | Thiết kế workflow đa agent dạng DAG với hợp đồng JSON giữa các node, retry policy và human-in-the-loop checkp… | [📄](content/prompts/ocp-architect/multi-agent-dag-handoff.json) |
| [RAG Pipeline Architect](https://hub.toilatung.com/items/rag-pipeline-architect) | Thiết kế pipeline Retrieval-Augmented Generation: ingest, chunking, embedding, hybrid search, rerank, đánh gi… | [📄](content/prompts/ocp-architect/rag-pipeline-architect.json) |
| [REST / OpenAPI Contract Designer](https://hub.toilatung.com/items/api-contract-designer) | Thiết kế API contract chuẩn OpenAPI 3.1: resource, endpoint, schema, mã lỗi, phân trang, versioning và idempo… | [📄](content/prompts/ocp-architect/api-contract-designer.json) |

<a id="prompt-operations"></a>

#### Operations & SOP (4)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Agency Client Weekly Report Writer](https://hub.toilatung.com/items/client-weekly-report) | Chuyển số liệu thô thành báo cáo tuần cho khách hàng: tóm tắt điều hành, insight, hành động tuần tới — không… | [📄](content/prompts/b2b-agency/client-weekly-report.json) |
| [AI-Native Job Description & Scorecard](https://hub.toilatung.com/items/hiring-ai-native-jd) | Viết JD cho vị trí làm việc cùng AI: outcome 90 ngày, năng lực cốt lõi, bài test thực tế và scorecard phỏng v… | [📄](content/prompts/operations/hiring-ai-native-jd.json) |
| [Chaos-to-SOP Converter](https://hub.toilatung.com/items/sop-from-chaos) | Biến mô tả quy trình lộn xộn (voice note, chat) thành SOP chuẩn: mục tiêu, vai trò, các bước, checklist, KPI. | [📄](content/prompts/operations/sop-from-chaos.json) |
| [Meeting Transcript to Decisions & Action Items](https://hub.toilatung.com/items/meeting-to-action-items) | Tóm tắt biên bản họp thành quyết định, việc cần làm (ai – gì – hạn), rủi ro và câu hỏi còn mở. | [📄](content/prompts/operations/meeting-to-action-items.json) |

### 🤖 Skills (57)

<a id="skill-video"></a>

#### Video & Motion (22)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [AI Model Benchmark & Data Audit Video Reveal (16:9)](https://hub.toilatung.com/items/ai-model-audit-reveal) | AI Model Benchmark & Data Audit Video Reveal (16:9) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyp… | [📄](content/skills/ai-model-audit-reveal.md) |
| [Automated Motion Graphic B-Roll Generator](https://hub.toilatung.com/items/motion-broll) | Automated Motion Graphic B-Roll Generator — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes /… | [📄](content/skills/motion-broll.md) |
| [Automated Word-Level Silence Cut & Footage Trimmer](https://hub.toilatung.com/items/tvt-auto-cut) | Automated Word-Level Silence Cut & Footage Trimmer — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hype… | [📄](content/skills/tvt-auto-cut.md) |
| [B2B Service Showcase Video Production Assembly Line](https://hub.toilatung.com/items/tvt-service-promo) | B2B Service Showcase Video Production Assembly Line — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyp… | [📄](content/skills/tvt-service-promo.md) |
| [Brand Logo Intro & 5-Second Bumper Generator](https://hub.toilatung.com/items/tvt-logo-intro) | Brand Logo Intro & 5-Second Bumper Generator — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframe… | [📄](content/skills/tvt-logo-intro.md) |
| [Cinematic Mobile Vlog & Handwriting Title Pipeline](https://hub.toilatung.com/items/tvt-vlog-talkinghead) | Cinematic Mobile Vlog & Handwriting Title Pipeline — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hype… | [📄](content/skills/tvt-vlog-talkinghead.md) |
| [Corporate Geometric B2B Promo Video Pipeline](https://hub.toilatung.com/items/corporate-geometric-promo) | Corporate Geometric B2B Promo Video Pipeline — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframe… | [📄](content/skills/corporate-geometric-promo.md) |
| [Dark Card Architecture Short Video Kit (9:16)](https://hub.toilatung.com/items/tvt-short-card-kit) | Dark Card Architecture Short Video Kit (9:16) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperfram… | [📄](content/skills/tvt-short-card-kit.md) |
| [Dynamic 3-Second Viral Hook & Caption Retention Engine](https://hub.toilatung.com/items/tvt-hook-caption) | Dynamic 3-Second Viral Hook & Caption Retention Engine — Quy trình tự động hóa sản xuất video bằng mã nguồn (… | [📄](content/skills/tvt-hook-caption.md) |
| [Dynamic Social CTA & Subscribe Alpha Overlay Engine](https://hub.toilatung.com/items/social-cta-overlay) | Dynamic Social CTA & Subscribe Alpha Overlay Engine — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyp… | [📄](content/skills/social-cta-overlay.md) |
| [Faceless 2D Motion Graphics from Voiceover (9:16)](https://hub.toilatung.com/items/tvt-voice-motion) | Faceless 2D Motion Graphics from Voiceover (9:16) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyper… | [📄](content/skills/tvt-voice-motion.md) |
| [Founder Talking Head & DSH Stage Review Pipeline (16:9)](https://hub.toilatung.com/items/toilatung-talkinghead) | Founder Talking Head & DSH Stage Review Pipeline (16:9) — Quy trình tự động hóa sản xuất video bằng mã nguồn… | [📄](content/skills/toilatung-talkinghead.md) |
| [Hand-Drawn Whiteboard Stickman Storyteller Animation](https://hub.toilatung.com/items/tvt-stickman) | Hand-Drawn Whiteboard Stickman Storyteller Animation — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hy… | [📄](content/skills/tvt-stickman.md) |
| [High-End Editorial Magazine Typography Video Engine](https://hub.toilatung.com/items/tvt-magazine-type) | High-End Editorial Magazine Typography Video Engine — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyp… | [📄](content/skills/tvt-magazine-type.md) |
| [Kinetic Mascot Reel & Audio Alignment Engine](https://hub.toilatung.com/items/toilatung-kinetic-reel) | Kinetic Mascot Reel & Audio Alignment Engine — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframe… | [📄](content/skills/toilatung-kinetic-reel.md) |
| [Local Video Object & Presenter Background Separation](https://hub.toilatung.com/items/object-separation) | Local Video Object & Presenter Background Separation — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hy… | [📄](content/skills/object-separation.md) |
| [Master Motion Graphics Explainer (Long-form 16:9)](https://hub.toilatung.com/items/tvt-master-motion-explainer) | Master Motion Graphics Explainer (Long-form 16:9) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyper… | [📄](content/skills/tvt-master-motion-explainer.md) |
| [Motion Showreel Standard & Animation Directives](https://hub.toilatung.com/items/motion-showreel-standard) | Motion Showreel Standard & Animation Directives — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperfr… | [📄](content/skills/motion-showreel-standard.md) |
| [Neural Voice Clone & Cadence Checker SOP](https://hub.toilatung.com/items/clone-voice-tung) | Neural Voice Clone & Cadence Checker SOP — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframes /… | [📄](content/skills/clone-voice-tung.md) |
| [Screen Recording to 9:16 Viral Explainer Pipeline](https://hub.toilatung.com/items/screen-review-explainer) | Screen Recording to 9:16 Viral Explainer Pipeline — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyper… | [📄](content/skills/screen-review-explainer.md) |
| [Split-Screen Talking Head & UI Morphing Card (9:16)](https://hub.toilatung.com/items/tvt-split-talkinghead-lipsync) | Split-Screen Talking Head & UI Morphing Card (9:16) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyp… | [📄](content/skills/tvt-split-talkinghead-lipsync.md) |
| [White Card B2B Agency Short Video Kit (9:16)](https://hub.toilatung.com/items/tvt-short-white-card) | White Card B2B Agency Short Video Kit (9:16) — Quy trình tự động hóa sản xuất video bằng mã nguồn (Hyperframe… | [📄](content/skills/tvt-short-white-card.md) |

<a id="skill-operations"></a>

#### Operations & SOP (9)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Agency Client Onboarding SOP](https://hub.toilatung.com/items/client-onboarding-sop) | Quy trình onboarding khách hàng mới trong 7 ngày: kickoff, thu thập quyền truy cập an toàn, audit ban đầu, kế… | [📄](content/skills/client-onboarding-sop.md) |
| [AI Video Scene & Prompt Engineering Pipeline](https://hub.toilatung.com/items/ai-video-prompt-pipeline) | AI Video Scene & Prompt Engineering Pipeline — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/ai-video-prompt-pipeline.md) |
| [Digital Asset & UI/UX Design Art Director](https://hub.toilatung.com/items/digital-asset-design-art-director) | Digital Asset & UI/UX Design Art Director — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/digital-asset-design-art-director.md) |
| [E-Commerce Market Opportunity & Competitor Analyzer](https://hub.toilatung.com/items/ecommerce-opportunity-researcher) | E-Commerce Market Opportunity & Competitor Analyzer — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/ecommerce-opportunity-researcher.md) |
| [E-Commerce Product Viability & Scoring Evaluator](https://hub.toilatung.com/items/ecommerce-product-viability-evaluator) | E-Commerce Product Viability & Scoring Evaluator — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/ecommerce-product-viability-evaluator.md) |
| [Facebook Fanpage Two-Step Scheduled Publisher](https://hub.toilatung.com/items/facebook-page-two-step-publisher) | Facebook Fanpage Two-Step Scheduled Publisher — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/facebook-page-two-step-publisher.md) |
| [Second Brain & Markdown Knowledge Vault Manager](https://hub.toilatung.com/items/second-brain-knowledge-vault-manager) | Second Brain & Markdown Knowledge Vault Manager — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/second-brain-knowledge-vault-manager.md) |
| [Viral Short-Form Video Production Calendar](https://hub.toilatung.com/items/viral-short-video-content-calendar) | Viral Short-Form Video Production Calendar — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/viral-short-video-content-calendar.md) |
| [Zalo OA Multi-Channel Messaging & Media Dispatcher](https://hub.toilatung.com/items/zalo-oa-multi-channel-messaging-dispatcher) | Zalo OA Multi-Channel Messaging & Media Dispatcher — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/zalo-oa-multi-channel-messaging-dispatcher.md) |

<a id="skill-marketing"></a>

#### Marketing & Growth (5)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [AARRR Pirate Metrics & Growth Funnel Diagnostician](https://hub.toilatung.com/items/aarrr-growth-funnel-diagnostician) | AARRR Pirate Metrics & Growth Funnel Diagnostician — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/aarrr-growth-funnel-diagnostician.md) |
| [Customer Persona & Buyer Journey Deep Profiler](https://hub.toilatung.com/items/customer-persona-deep-profiler) | Customer Persona & Buyer Journey Deep Profiler — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/customer-persona-deep-profiler.md) |
| [Full-Funnel Digital Marketing & Growth Architect](https://hub.toilatung.com/items/full-funnel-digital-marketing-architect) | Full-Funnel Digital Marketing & Growth Architect — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/full-funnel-digital-marketing-architect.md) |
| [Multi-Step Sales Funnel Blueprint Architect](https://hub.toilatung.com/items/multi-step-sales-funnel-architect) | Multi-Step Sales Funnel Blueprint Architect — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/multi-step-sales-funnel-architect.md) |
| [Omnichannel Social Media 30-Day Matrix Calendar](https://hub.toilatung.com/items/omnichannel-social-media-calendar) | Omnichannel Social Media 30-Day Matrix Calendar — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/omnichannel-social-media-calendar.md) |

<a id="skill-ads"></a>

#### Paid Ads (4)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Meta Ads 2-Step Campaign Scheduler](https://hub.toilatung.com/items/meta-ads-two-step-scheduler) | Quy trình 2 bước an toàn khi agent lên lịch chiến dịch Meta Ads: Bước 1 tạo bản nháp PAUSED và preview, Bước… | [📄](content/skills/meta-ads-two-step-scheduler.md) |
| [Meta Ads Account Health Auditor & Safe Converter](https://hub.toilatung.com/items/meta-ads-health-auditor-safe-converter) | Meta Ads Account Health Auditor & Safe Converter — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/meta-ads-health-auditor-safe-converter.md) |
| [Meta Ads Scaling & Budget Governance Controller](https://hub.toilatung.com/items/meta-ads-scaling-and-budget-controller) | Meta Ads Scaling & Budget Governance Controller — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/meta-ads-scaling-and-budget-controller.md) |
| [Weekly Ads Performance Analyst](https://hub.toilatung.com/items/weekly-ads-performance-report) | SOP phân tích hiệu suất quảng cáo hàng tuần đa nền tảng: chuẩn hóa số liệu, phát hiện bất thường, chẩn đoán n… | [📄](content/skills/weekly-ads-performance-report.md) |

<a id="skill-system-design"></a>

#### System Design & AI (4)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Anti-Secret Leakage & Redaction Gate](https://hub.toilatung.com/items/secret-leak-redaction-gate) | Quality gate bắt buộc trước khi agent xuất bản, commit hoặc gửi nội dung: quét và che API key, token, mật khẩ… | [📄](content/skills/secret-leak-redaction-gate.md) |
| [Autonomous Multi-Agent Workflow Orchestrator](https://hub.toilatung.com/items/autonomous-multi-agent-workflow-orchestrator) | Autonomous Multi-Agent Workflow Orchestrator — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/autonomous-multi-agent-workflow-orchestrator.md) |
| [Human-in-the-Loop Telegram Approval Security Gate](https://hub.toilatung.com/items/human-in-the-loop-telegram-approval-gate) | Human-in-the-Loop Telegram Approval Security Gate — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/human-in-the-loop-telegram-approval-gate.md) |
| [OCP Automation Blueprint Designer](https://hub.toilatung.com/items/ocp-automation-blueprint) | SOP biến một quy trình thủ công thành blueprint tự động hóa cho One-Person Company: map quy trình, phân tầng… | [📄](content/skills/ocp-automation-blueprint.md) |

<a id="skill-copywriting"></a>

#### Copywriting (3)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [High-Conversion Persuasive Copywriting Master](https://hub.toilatung.com/items/high-conversion-copywriting-pro) | High-Conversion Persuasive Copywriting Master — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/high-conversion-copywriting-pro.md) |
| [Multi-Channel Paid Ad Copy Generator](https://hub.toilatung.com/items/multi-channel-ad-copy-generator) | Multi-Channel Paid Ad Copy Generator — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/multi-channel-ad-copy-generator.md) |
| [Persona-to-Copy Alignment & Objection Matrix](https://hub.toilatung.com/items/persona-to-copy-alignment-matrix) | Persona-to-Copy Alignment & Objection Matrix — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/persona-to-copy-alignment-matrix.md) |

<a id="skill-seo"></a>

#### SEO / GEO (3)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [7-Point Content Quality Audit](https://hub.toilatung.com/items/seven-point-content-audit) | SOP kiểm toán 7 điểm trước khi xuất bản bất kỳ nội dung nào: intent, cấu trúc, E-E-A-T, giọng văn, visual, SE… | [📄](content/skills/seven-point-content-audit.md) |
| [B2B SEO & GEO Content Quality Auditor](https://hub.toilatung.com/items/seo-geo-audit-expert) | SOP tự động kiểm toán bài viết chuẩn 7-Point Audit, kiểm tra Visual Anchoring và tối ưu hóa Generative Engine… | [📄](content/skills/seo-geo-audit-expert.md) |
| [SEO/GEO Answer-First Content Writer](https://hub.toilatung.com/items/seo-geo-content-writer) | SOP viết bài long-form chuẩn SEO + GEO: nghiên cứu SERP, dàn ý Answer-first, viết, chèn internal link, tự kiể… | [📄](content/skills/seo-geo-content-writer.md) |

<a id="skill-branding"></a>

#### Brand Strategy (2)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Brand Voice & Visual Identity Guidelines Builder](https://hub.toilatung.com/items/brand-voice-identity-system) | Brand Voice & Visual Identity Guidelines Builder — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/brand-voice-identity-system.md) |
| [Strategic Brand Positioning & GTM Framework](https://hub.toilatung.com/items/strategic-brand-positioning-framework) | Strategic Brand Positioning & GTM Framework — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/strategic-brand-positioning-framework.md) |

<a id="skill-devops"></a>

#### DevOps & VPS (2)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [HestiaCP VPS Security & Health Audit](https://hub.toilatung.com/items/hestiacp-vps-security-audit) | SOP kiểm toán bảo mật và sức khỏe VPS chạy HestiaCP: cập nhật, SSH, firewall, Fail2ban, SSL, backup, tài nguy… | [📄](content/skills/hestiacp-vps-security-audit.md) |
| [WordPress Site Health & Performance Audit](https://hub.toilatung.com/items/wordpress-site-health-audit) | SOP kiểm tra WordPress: core/plugin/theme, bảo mật, Core Web Vitals, SEO kỹ thuật và backup, xuất báo cáo ưu… | [📄](content/skills/wordpress-site-health-audit.md) |

<a id="skill-sales"></a>

#### Sales & Enablement (2)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [B2B Sales Enablement & Objection Handling Playbook](https://hub.toilatung.com/items/b2b-sales-enablement-playbook) | B2B Sales Enablement & Objection Handling Playbook — Quy trình vận hành tự chủ chuẩn SOP cho AI Agent. | [📄](content/skills/b2b-sales-enablement-playbook.md) |
| [Lead Qualification Agent (BANT+)](https://hub.toilatung.com/items/lead-qualification-bant-agent) | SOP cho agent chấm điểm và phân loại lead inbound theo BANT+ (Budget, Authority, Need, Timeline, Fit), định t… | [📄](content/skills/lead-qualification-bant-agent.md) |

<a id="skill-coding"></a>

#### Coding & Dev (1)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Autonomous Code Review Agent SOP](https://hub.toilatung.com/items/code-review-agent-sop) | SOP cho agent review Pull Request: hiểu mục đích, kiểm tra correctness, bảo mật, test, hiệu năng — comment có… | [📄](content/skills/code-review-agent-sop.md) |

### 🧠 Boosts (7)

<a id="boost-strategy"></a>

#### Business Strategy (4)

| Boost | Lệnh | Mô tả | Nguồn |
|---|---|---|---|
| [CEO Decision Memo (Options & Trade-offs)](https://hub.toilatung.com/items/ceo-decision-memo) | `/boost DECISION_MEMO` | Chuyển một quyết định khó thành memo 1 trang kiểu Amazon: bối cảnh, phương án, đánh đổi, khuyến nghị và tiêu… | [📄](content/boosts/ceo-decision-memo.json) |
| [First-Principles Decomposer](https://hub.toilatung.com/items/first-principles-decomposer) | `/boost FIRST_PRINCIPLES` | Bóc tách vấn đề về các chân lý nền tảng, loại bỏ lối mòn tư duy theo thói quen, rồi tái cấu trúc giải pháp từ… | [📄](content/boosts/first-principles-decomposer.json) |
| [System 1 vs System 2 Cognitive Classifier](https://hub.toilatung.com/items/system1-system2-classifier) | `/boost SYSTEM_SPLIT` | Buộc model tự phân loại câu hỏi trước khi trả lời: phản xạ nhanh (System 1) hay suy luận sâu (System 2), rồi… | [📄](content/boosts/system1-system2-classifier.json) |
| [Tree-of-Thought Strategy Explorer](https://hub.toilatung.com/items/tree-of-thought-strategist) | `/boost TREE_OF_THOUGHT` | Mở rộng nhiều nhánh giải pháp song song, tự chấm điểm, cắt tỉa nhánh yếu và đào sâu nhánh mạnh trước khi chốt… | [📄](content/boosts/tree-of-thought-strategist.json) |

<a id="boost-finance"></a>

#### Finance & Accounting (1)

| Boost | Lệnh | Mô tả | Nguồn |
|---|---|---|---|
| [Unit Economics Auditor](https://hub.toilatung.com/items/unit-economics-auditor) | `/boost UNIT_ECONOMICS` | Kiểm toán kinh tế đơn vị của mô hình kinh doanh hoặc tính năng AI: CAC, LTV, gross margin, payback, chi phí t… | [📄](content/boosts/unit-economics-auditor.json) |

<a id="boost-marketing"></a>

#### Marketing & Growth (1)

| Boost | Lệnh | Mô tả | Nguồn |
|---|---|---|---|
| [Pre-Mortem Campaign Red-Team](https://hub.toilatung.com/items/pre-mortem-red-team) | `/boost PRE_MORTEM` | Giả định chiến dịch/dự án đã thất bại sau 90 ngày, truy ngược nguyên nhân, chấm rủi ro và thiết kế biện pháp… | [📄](content/boosts/pre-mortem-red-team.json) |

<a id="boost-system-design"></a>

#### System Design & AI (1)

| Boost | Lệnh | Mô tả | Nguồn |
|---|---|---|---|
| [Red-Team Architecture & Adversarial Stress Tester](https://hub.toilatung.com/items/ocp-redteam-architect) | `/boost RED_TEAM_ARCHITECT` | Kích hoạt chế độ phản biện gắt gao (Devil's Advocate) để tìm ra các lỗi sụp đổ tiềm ẩn trong kiến trúc phần m… | [📄](content/boosts/ocp-redteam-architect.json) |

<!-- DIRECTORY-INDEX:END -->

## 🛠️ Quickstart

Requires **Node.js ≥ 20.9**.

```bash
git clone https://github.com/tvt-ai-max/tvt-prompt-skills-hub.git
cd tvt-prompt-skills-hub
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run validate` | Validate every file in `content/` |
| `npm test` | Unit tests: variable engine, exporters, schema, theme, favorites, filters, SEO builders, README index |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Validate, then production build (all pages prerendered) |
| `npm run build:static` | Fully static export to `./out` for any static host (Nginx, HestiaCP, S3…) |
| `npm run readme` | Regenerate the directory index above |

Set **`NEXT_PUBLIC_SITE_URL`** to your public URL. It is used for canonical links, `sitemap.xml`, JSON-LD and OpenGraph, and defaults to `https://hub.toilatung.com`.

## 🚀 Deploy in one click

| Target | How |
|---|---|
| **Vercel** | Click the **Deploy with Vercel** button above and set `NEXT_PUBLIC_SITE_URL`. |
| **Docker** | `docker build --build-arg NEXT_PUBLIC_SITE_URL=https://your.domain -t tvt-hub . && docker run -p 3000:3000 tvt-hub` (standalone Next.js server, non-root user). |
| **Static hosting / VPS** | `NEXT_PUBLIC_SITE_URL=https://your.domain npm run build:static`, then serve `./out` with any web server. |
| **Node.js** | `npm run build && npm start` |

## 🏷️ GitHub topics

To improve discoverability, add these topics under **Settings → About → Topics**:

`awesome-prompts` · `prompt-engineering` · `agent-skills` · `system-prompts` · `ai-agents` · `claude-code` · `cursorrules` · `chatgpt-prompts` · `nextjs16` · `tailwindcss-v4` · `build-in-public` · `seo-geo` · `vietnamese`

## 📁 Project structure

```
app/                       Next.js App Router
  page.tsx, prompts|skills|boosts/, items/[id]/   catalog & item pages (+ opengraph-image)
  build-in-public/         project story
  data/items/[id]/         static JSON per item (loaded on demand)
  sitemap.ts, robots.ts, llms.txt/                crawl infrastructure
components/                Navbar, ThemeToggle, FilterBar, ItemCard, VariableWorkbench, CommandPalette, ShareBar…
content/                   prompts/**/*.json · skills/*.md (YAML frontmatter + SOP) · boosts/*.json
lib/                       variables, exporters, schema, loader, facets, filter, favorites, theme, seo, og, readme
scripts/                   validate-data.ts · generate-readme-index.ts
types/hub.ts               single source of truth for every schema
.github/                   CI workflow, issue forms (prompt / skill / boost / bug), PR template
```

## 🤝 Contributing

New prompts, skills and boosts are welcome. Use the [issue forms](https://github.com/tvt-ai-max/tvt-prompt-skills-hub/issues/new/choose), or read **[CONTRIBUTING.md](CONTRIBUTING.md)** and open a pull request. The validator catches undeclared variables, duplicate IDs and leaked secrets before review.

## 📖 Docs

[Product Overview (POD)](docs/POD.md) · [Technical Spec (SPEC)](docs/SPEC.md) · [Roadmap](docs/ROADMAP_TASKS.md) · [Benchmark vs prompts.chat / Anthropic Prompt Library / Cursor Directory](docs/BENCHMARK.md)

---

<div align="center">

Built in public with **Claude Code Cloud** + **Antigravity** by **[TVT Agency](https://tvtagency.com)** & **[toilatung.com](https://toilatung.com)** · [MIT License](LICENSE)

If this repo saves you time, please ⭐ **star it** so more builders can find it.

</div>
