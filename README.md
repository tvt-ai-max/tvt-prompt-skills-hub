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

Most prompt libraries, such as `prompts.chat`, are static text you edit by hand. TVT Intelligence Hub organizes AI capabilities into **4 sections** and makes every one of them interactive:

```
WORKFLOWS  multi-step DAG pipelines: each step's output pipes into the next → copy / n8n / Python
    ▲  chain specialists into a production line
BOTS       16 AI Workforce personas with deep system prompts and HANDOFF blocks
    ▲  give each job to the right specialist
SKILLS     SKILL.md agent SOPs: inputs → tools → steps → quality gates
    ▲  standardize into a repeatable flow
PROMPTS    micro-prompts with {{VARIABLE}} forms (+ the Deep Reasoning meta-prompts)
```

Most content is written in Vietnamese for B2B agencies, solopreneurs (OCP), video production and AI-agent builders. Every item is a plain file in [`content/`](content), so contributing means opening a pull request.

## ✨ Features

| | |
|---|---|
| 🔀 **Workflows Studio (DAG)** | A visual node canvas with glowing data edges (including jumps across steps). A **live piping simulator**: enter the inputs once and every step's prompt fills in instantly. Paste a step's real output and it flows into every downstream step. One-click **Copy All Sequential Prompts**, **Export n8n Workflow JSON** (Basic LLM Chain + model node per step, no keys inside) and **Export Python CLI Script** (Anthropic SDK, `--dry-run`, piping between steps). |
| 🤖 **Bots: 16 AI Workforce personas** | Lexi, Scout, Quill, Reel, Pixel, Shield, Bolt, Echo, Metric, North, Ally, Arrow, Buzz, Craft, Crown and Pulse. Each has a role, process, output format, safety boundaries and a HANDOFF block to the next bot. Filter by department, **copy the system prompt in one click**, or download it as a subagent `.md`. |
| 🧩 **Interactive Variable Workbench** | Each `{{VARIABLE}}` gets its own input (text / textarea / select), pre-filled with an example. The live preview highlights filled values and flags empty ones. **Reset to examples**, **Clear all**, and **Direct link** (a URL that opens the form already filled in). |
| 📋 **Multi-target export** | **ChatGPT / Claude** (clean Markdown) · **Cursor / Windsurf** (`.cursorrules`) · **`SKILL.md`** for Claude Code / OpenClaw / Hermes · **Direct link** with the variable values in the URL. |
| ⭐ **Favorites (pin to top)** | Star any card to pin it to the top of the grid and show it under the **Favorites** filter. Stored in `localStorage` and synced across tabs. |
| 🔎 **Search & filters** | `Cmd/Ctrl+K` fuzzy command palette across prompts, skills, bots and workflows · section, persona and category filters (incl. **Deep Reasoning**) · **tag cloud** · filter by **agent tool / stack** (FFmpeg, ElevenLabs, Whisper, HyperFrames, n8n, Playwright…). |
| 🌓 **Dark / Light / System** | Dark Cyber Navy (`#0A0F1E`) by default and a light "Clean Editorial" theme with AAA text contrast. An inline boot script applies the theme before first paint, so there is no flash. **`Shift + D`** toggles the theme. |
| 🚀 **SEO + GEO / AEO** | Per-page JSON-LD (`TechArticle` + `HowTo` + `FAQPage` + `BreadcrumbList`; `WebSite` + `SearchAction`, `SoftwareApplication`, `Organization`), canonical URLs, generated OpenGraph images with Vietnamese diacritics, `sitemap.xml`, a `robots.txt` that allows Google, Bing, GPTBot, ClaudeBot, PerplexityBot and others, and [`/llms.txt`](https://hub.toilatung.com/llms.txt) for AI search engines. |
| 📢 **Sharing & contributing** | One-click sharing to X / LinkedIn / Facebook with a generated caption, copy link with a toast, the native share sheet on mobile, and a **Contribute** dialog that links to the GitHub issue forms. |
| ⚡ **Fast and static** | Every page is prerendered. Cards ship as lightweight summaries, and full templates load on demand (prefetched on hover), which cut home-page HTML by about 5× compared with v1. |
| 🛡 **Validation on every build** | `npm run validate` checks the schema, variable consistency, unique IDs and a minimum catalog size, and scans for leaked secrets. It runs before every build and in CI. |

## 📚 Curated Directory Index

Each item links to its interactive page on the live hub (📄 = source file). This section is generated by `npm run readme`, and CI fails when it is out of date.

<!-- DIRECTORY-INDEX:START — generated by `npm run readme`, do not edit by hand -->

**224 tài sản** · 139 Prompts · 57 Skills · 7 Deep Reasoning · 5 Workflows · 16 Bots

| Tầng | Chuyên khoa | Số lượng |
|---|---|---:|
| ✨ Prompts | [Video & Motion](#prompt-video) | 34 |
| ✨ Prompts | [Operations & SOP](#prompt-operations) | 24 |
| ✨ Prompts | [System Design & AI](#prompt-system-design) | 24 |
| ✨ Prompts | [Copywriting](#prompt-copywriting) | 23 |
| ✨ Prompts | [Brand Strategy](#prompt-branding) | 16 |
| ✨ Prompts | [SEO / GEO](#prompt-seo) | 6 |
| ✨ Prompts | [Coding & Dev](#prompt-coding) | 5 |
| ✨ Prompts | [Marketing & Growth](#prompt-marketing) | 5 |
| ✨ Prompts | [Paid Ads](#prompt-ads) | 2 |
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
| 🧠 Deep Reasoning | [Deep Reasoning](#boost-deep-reasoning) | 7 |
| 🔀 Workflows | [Tất cả workflows](#workflows) | 5 |
| 🤖 Bots | [AI Workforce](#bots) | 16 |

### ✨ Prompts (139)

<a id="prompt-video"></a>

#### Video & Motion (34)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Glass Skin Portrait](https://hub.toilatung.com/items/tlt-glass-skin-portrait) | Tạo ảnh chân dung ảo siêu thực để làm khuôn mặt chuẩn. | [📄](content/prompts/toilatung-video/tlt-glass-skin-portrait.json) |
| [Google AI Studio Multimodal Video Analyzer](https://hub.toilatung.com/items/tlt-google-ai-studio-multimodal-video-analyzer) | System Instruction dành cho Google AI Studio giúp phân tích video dài và tự động xuất dữ liệu cấu trúc dưới d… | [📄](content/prompts/toilatung-video/tlt-google-ai-studio-multimodal-video-analyzer.json) |
| [Google Flow Cinematic Movie & Audio Sync](https://hub.toilatung.com/items/tlt-google-flow-cinematic-movie-audio-sync) | Prompt tạo video 8 giây chuyên nghiệp trên Google Flow/Veo có camera chuyển động phức tạp và âm thanh đồng bộ. | [📄](content/prompts/toilatung-video/tlt-google-flow-cinematic-movie-audio-sync.json) |
| [Multi-Panel Storyboard Comic Sheet](https://hub.toilatung.com/items/tlt-multi-panel-storyboard-comic-sheet) | Tạo một trang storyboard 6 khung hình nối tiếp nhau giữ nguyên nhân vật và phong cách vẽ. | [📄](content/prompts/toilatung-video/tlt-multi-panel-storyboard-comic-sheet.json) |
| [Nano Banana Ultra Photorealistic Portrait](https://hub.toilatung.com/items/tlt-nano-banana-ultra-photorealistic-portrait) | Sử dụng Scene Director Method tạo ảnh chân dung siêu thực, giữ độ chi tiết da và mắt cực tốt. | [📄](content/prompts/toilatung-video/tlt-nano-banana-ultra-photorealistic-portrait.json) |
| [Prompt phân đoạn nhỏ 3-5 giây](https://hub.toilatung.com/items/tlt-prompt-phan-doan-nho-3-5-giay) | Phân tích video YouTube thành từng đoạn siêu chi tiết để remake. | [📄](content/prompts/toilatung-video/tlt-prompt-phan-doan-nho-3-5-giay.json) |
| [Prompt Phân Tích & Remake Video Xu Hướng](https://hub.toilatung.com/items/tlt-prompt-phan-tich-remake-video-xu-huong) | Phân tích cấu trúc, nhịp điệu và nội dung của một video đang lên xu hướng để viết lại kịch bản remake phù hợp… | [📄](content/prompts/toilatung-video/tlt-prompt-phan-tich-remake-video-xu-huong.json) |
| [Prompt phân tích kịch bản video](https://hub.toilatung.com/items/tlt-prompt-phan-tich-kich-ban-video) | Phân tích và viết lại kịch bản video chuyên nghiệp. | [📄](content/prompts/toilatung-video/tlt-prompt-phan-tich-kich-ban-video.json) |
| [Prompt tách 1 cảnh trong ảnh 3×3](https://hub.toilatung.com/items/tlt-prompt-tach-1-canh-trong-anh-3-3) | Tách riêng từng ảnh từ bộ 3×3 đã tạo. | [📄](content/prompts/toilatung-video/tlt-prompt-tach-1-canh-trong-anh-3-3.json) |
| [Prompt tạo ảnh chụp nhiều góc máy (3×3)](https://hub.toilatung.com/items/tlt-prompt-tao-anh-chup-nhieu-goc-may-3-3) | Tạo 9 ảnh cùng lúc về 9 góc chụp khác nhau của cùng một nhân vật trong cùng bối cảnh. | [📄](content/prompts/toilatung-video/tlt-prompt-tao-anh-chup-nhieu-goc-may-3-3.json) |
| [Prompt tạo cảnh biến hình khi mặc giáp](https://hub.toilatung.com/items/tlt-prompt-tao-canh-bien-hinh-khi-mac-giap) | Tạo video cảnh các bộ phận áo giáp ghép vào cơ thể siêu mượt. | [📄](content/prompts/toilatung-video/tlt-prompt-tao-canh-bien-hinh-khi-mac-giap.json) |
| [Prompt tạo cảnh liên hoàn tách biệt](https://hub.toilatung.com/items/tlt-prompt-tao-canh-lien-hoan-tach-biet) | Tạo toàn bộ chuỗi cảnh đồng nhất chỉ trong 1 prompt. | [📄](content/prompts/toilatung-video/tlt-prompt-tao-canh-lien-hoan-tach-biet.json) |
| [Prompt tạo character chuyên nghiệp](https://hub.toilatung.com/items/tlt-prompt-tao-character-chuyen-nghiep) | Tạo full character bible (tính cách + ngoại hình + trang phục + reference). | [📄](content/prompts/toilatung-video/tlt-prompt-tao-character-chuyen-nghiep.json) |
| [Prompt tạo character nhiều góc cạnh](https://hub.toilatung.com/items/tlt-prompt-tao-character-nhieu-goc-canh) | Tạo ảnh tham chiếu nhân vật với nhiều góc cạnh khác nhau, đủ 360°. | [📄](content/prompts/toilatung-video/tlt-prompt-tao-character-nhieu-goc-canh.json) |
| [Prompt tạo storyboard phim hoạt hình – P.1](https://hub.toilatung.com/items/tlt-prompt-tao-storyboard-phim-hoat-hinh-p-1) | Xây dựng cốt truyện phim hoạt hình hoàn chỉnh. | [📄](content/prompts/toilatung-video/tlt-prompt-tao-storyboard-phim-hoat-hinh-p-1.json) |
| [Prompt tạo storyboard phim hoạt hình – P.2](https://hub.toilatung.com/items/tlt-prompt-tao-storyboard-phim-hoat-hinh-p-2) | Tạo mô tả chi tiết các nhân vật trong phim. | [📄](content/prompts/toilatung-video/tlt-prompt-tao-storyboard-phim-hoat-hinh-p-2.json) |
| [Prompt tạo storyboard phim hoạt hình – P.3](https://hub.toilatung.com/items/tlt-prompt-tao-storyboard-phim-hoat-hinh-p-3) | Tạo prompt chi tiết từng phân cảnh cho Veo. | [📄](content/prompts/toilatung-video/tlt-prompt-tao-storyboard-phim-hoat-hinh-p-3.json) |
| [Prompt tạo video game chiến đấu 2,5D](https://hub.toilatung.com/items/tlt-prompt-tao-video-game-chien-dau-2-5d) | Tạo video đối kháng kiểu game cổ điển cực chất. | [📄](content/prompts/toilatung-video/tlt-prompt-tao-video-game-chien-dau-2-5d.json) |
| [Prompt tạo video Timelapse Xây Dựng](https://hub.toilatung.com/items/tlt-prompt-tao-video-timelapse-xay-dung) | Tạo video timelapse công trình tua nhanh (đang cực hot 2026). | [📄](content/prompts/toilatung-video/tlt-prompt-tao-video-timelapse-xay-dung.json) |
| [Prompt training chatbot tạo kịch bản](https://hub.toilatung.com/items/tlt-prompt-training-chatbot-tao-kich-ban) | Training chatbot viết kịch bản phim chuyên nghiệp. | [📄](content/prompts/toilatung-video/tlt-prompt-training-chatbot-tao-kich-ban.json) |
| [Prompt training chatbot tạo video từ ảnh](https://hub.toilatung.com/items/tlt-prompt-training-chatbot-tao-video-tu-anh) | Training chatbot cá nhân tạo video từ ảnh có sẵn. | [📄](content/prompts/toilatung-video/tlt-prompt-training-chatbot-tao-video-tu-anh.json) |
| [Reference Sheet 8 Panels](https://hub.toilatung.com/items/tlt-reference-sheet-8-panels) | Tạo bảng tham chiếu 8 góc nhất quán cho Nano Banana. | [📄](content/prompts/toilatung-video/tlt-reference-sheet-8-panels.json) |
| [Storyboard Analysis Prompt](https://hub.toilatung.com/items/tlt-storyboard-analysis-prompt) | Phân tích kịch bản thành các khung hình storyboard. | [📄](content/prompts/toilatung-video/tlt-storyboard-analysis-prompt.json) |
| [Storyboard Crop Prompt](https://hub.toilatung.com/items/tlt-storyboard-crop-prompt) | Cắt và zoom vào các chi tiết trong storyboard. | [📄](content/prompts/toilatung-video/tlt-storyboard-crop-prompt.json) |
| [Storyboard QA Prompt](https://hub.toilatung.com/items/tlt-storyboard-qa-prompt) | Kiểm tra tính nhất quán và chất lượng bộ storyboard. | [📄](content/prompts/toilatung-video/tlt-storyboard-qa-prompt.json) |
| [Storyboard Split Prompt](https://hub.toilatung.com/items/tlt-storyboard-split-prompt) | Tách một ảnh chứa nhiều frame thành các ảnh riêng lẻ. | [📄](content/prompts/toilatung-video/tlt-storyboard-split-prompt.json) |
| [Storyboard Upscale Prompt](https://hub.toilatung.com/items/tlt-storyboard-upscale-prompt) | Tăng độ phân giải cho ảnh storyboard bị mờ. | [📄](content/prompts/toilatung-video/tlt-storyboard-upscale-prompt.json) |
| [Studio Backstage (3 Nhân Vật)](https://hub.toilatung.com/items/tlt-studio-backstage-3-nhan-vat) | Mô phỏng hậu trường với 2 models, 1 nhiếp ảnh gia và âm thanh dialogue. | [📄](content/prompts/toilatung-video/tlt-studio-backstage-3-nhan-vat.json) |
| [Tách Trang Phục (Ghost Mannequin)](https://hub.toilatung.com/items/tlt-tach-trang-phuc-ghost-mannequin) | Tách quần áo sang nền trắng để thay đồ cho Model. | [📄](content/prompts/toilatung-video/tlt-tach-trang-phuc-ghost-mannequin.json) |
| [Tạo 10 Hook mở đầu Video TikTok / Reels](https://hub.toilatung.com/items/tlt-tao-10-hook-mo-dau-video-tiktok-reels) | Viết 10 câu hook đầu tiên đủ mạnh để giữ người xem ở lại trong 3 giây. | [📄](content/prompts/toilatung-video/tlt-tao-10-hook-mo-dau-video-tiktok-reels.json) |
| [Tạo kịch bản phim ngắn từ 1 prompt](https://hub.toilatung.com/items/tlt-tao-kich-ban-phim-ngan-tu-1-prompt) | Tạo toàn bộ kịch bản + mô tả cảnh quay đồng nhất chỉ trong 1 prompt. | [📄](content/prompts/toilatung-video/tlt-tao-kich-ban-phim-ngan-tu-1-prompt.json) |
| [Tạo nhiều phân cảnh trong 1 hình](https://hub.toilatung.com/items/tlt-tao-nhieu-phan-canh-trong-1-hinh) | Tạo 8–12 phân cảnh bằng 1 prompt duy nhất. | [📄](content/prompts/toilatung-video/tlt-tao-nhieu-phan-canh-trong-1-hinh.json) |
| [Urban Streetwalk (1 Nhân Vật)](https://hub.toilatung.com/items/tlt-urban-streetwalk-1-nhan-vat) | Quay phim thời trang 8 giây với tracking camera và audio đồng bộ. | [📄](content/prompts/toilatung-video/tlt-urban-streetwalk-1-nhan-vat.json) |
| [Virtual Influencer Character Sheet (360°)](https://hub.toilatung.com/items/tlt-virtual-influencer-character-sheet-360) | Tạo bảng tham chiếu nhân vật 3 góc quay (trước, nghiêng, sau) để làm tư liệu tạo ảnh nhất quán. | [📄](content/prompts/toilatung-video/tlt-virtual-influencer-character-sheet-360.json) |

<a id="prompt-operations"></a>

#### Operations & SOP (24)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [15-Minute Premium Sales Script](https://hub.toilatung.com/items/tlt-15-minute-premium-sales-script) | Xây dựng kịch bản chốt sale 15 phút qua điện thoại/Zoom theo quy trình Khám phá, Đóng khung và Xử lý từ chối… | [📄](content/prompts/toilatung-operations/tlt-15-minute-premium-sales-script.json) |
| [7-Day Offer Validation Sprint](https://hub.toilatung.com/items/tlt-7-day-offer-validation-sprint) | Kế hoạch 7 ngày kiểm chứng nhu cầu thị trường đối với một Premium Offer trước khi bắt tay vào xây dựng. | [📄](content/prompts/toilatung-operations/tlt-7-day-offer-validation-sprint.json) |
| [Agency Client Weekly Report Writer](https://hub.toilatung.com/items/client-weekly-report) | Chuyển số liệu thô thành báo cáo tuần cho khách hàng: tóm tắt điều hành, insight, hành động tuần tới — không… | [📄](content/prompts/b2b-agency/client-weekly-report.json) |
| [AI-Native Job Description & Scorecard](https://hub.toilatung.com/items/hiring-ai-native-jd) | Viết JD cho vị trí làm việc cùng AI: outcome 90 ngày, năng lực cốt lõi, bài test thực tế và scorecard phỏng v… | [📄](content/prompts/operations/hiring-ai-native-jd.json) |
| [Chaos-to-SOP Converter](https://hub.toilatung.com/items/sop-from-chaos) | Biến mô tả quy trình lộn xộn (voice note, chat) thành SOP chuẩn: mục tiêu, vai trò, các bước, checklist, KPI. | [📄](content/prompts/operations/sop-from-chaos.json) |
| [Competitive Moat Builder](https://hub.toilatung.com/items/tlt-competitive-moat-builder) | Thiết lập và diễn đạt 3 loại hào kỹ nghệ (Knowledge, Network, Commitment) để bảo vệ sản phẩm trước sự sao ché… | [📄](content/prompts/toilatung-operations/tlt-competitive-moat-builder.json) |
| [Competitor Offer Decoder](https://hub.toilatung.com/items/tlt-competitor-offer-decoder) | Giải mã và tìm lỗ hổng trong offer của đối thủ để thiết kế offer vượt trội. | [📄](content/prompts/toilatung-operations/tlt-competitor-offer-decoder.json) |
| [Famous Person Data Sheet](https://hub.toilatung.com/items/tlt-famous-person-data-sheet) | Chuẩn bị dữ liệu nhân vật trước khi tạo ảnh. | [📄](content/prompts/toilatung-operations/tlt-famous-person-data-sheet.json) |
| [Good-Better-Best Pricing Architecture](https://hub.toilatung.com/items/tlt-good-better-best-pricing-architecture) | Thiết kế bảng giá 3 tầng (Starter, Growth, Scale) tối ưu hóa doanh thu bằng decoy effect. | [📄](content/prompts/toilatung-operations/tlt-good-better-best-pricing-architecture.json) |
| [Grand Slam Offer Stack Builder](https://hub.toilatung.com/items/tlt-grand-slam-offer-stack-builder) | Thiết kế bộ Offer Stack không thể chối từ dựa trên framework Grand Slam Offer của Alex Hormozi. | [📄](content/prompts/toilatung-operations/tlt-grand-slam-offer-stack-builder.json) |
| [Guarantee & Risk Reversal Designer](https://hub.toilatung.com/items/tlt-guarantee-risk-reversal-designer) | Thiết kế 3 loại hình bảo hành cực mạnh (Conditional, Service-based, Unconditional Bribe) để triệt tiêu nỗi sợ… | [📄](content/prompts/toilatung-operations/tlt-guarantee-risk-reversal-designer.json) |
| [Meeting Transcript to Decisions & Action Items](https://hub.toilatung.com/items/meeting-to-action-items) | Tóm tắt biên bản họp thành quyết định, việc cần làm (ai – gì – hạn), rủi ro và câu hỏi còn mở. | [📄](content/prompts/operations/meeting-to-action-items.json) |
| [Phân Tích Đối Thủ Cạnh Tranh 360°](https://hub.toilatung.com/items/tlt-phan-tich-doi-thu-canh-tranh-360) | Framework toàn diện phân tích đối thủ: Positioning, giá, kênh, điểm yếu và cơ hội phản công. | [📄](content/prompts/toilatung-operations/tlt-phan-tich-doi-thu-canh-tranh-360.json) |
| [Positioning Gap Finder](https://hub.toilatung.com/items/tlt-positioning-gap-finder) | Xác định khoảng trống định vị giữa tự cảm nhận và thị trường thực tế, vẽ ma trận so sánh đối thủ. | [📄](content/prompts/toilatung-operations/tlt-positioning-gap-finder.json) |
| [Prompt Kiến Trúc CRM & Tự Động Hóa Lead](https://hub.toilatung.com/items/tlt-prompt-kien-truc-crm-tu-dong-hoa-lead) | Thiết kế sơ đồ luồng dữ liệu và kịch bản tự động hóa quản lý khách hàng tiềm năng từ quảng cáo đến chốt deal. | [📄](content/prompts/toilatung-operations/tlt-prompt-kien-truc-crm-tu-dong-hoa-lead.json) |
| [Prompt Tạo Ảnh Cho Từng Phân Cảnh](https://hub.toilatung.com/items/tlt-prompt-tao-anh-cho-tung-phan-canh) | Mô tả từng phân cảnh theo phong cách truyện để tạo ảnh minh họa. | [📄](content/prompts/toilatung-operations/tlt-prompt-tao-anh-cho-tung-phan-canh.json) |
| [Prompt Thiết Kế Quy Trình Tuyển Dụng AI Agent](https://hub.toilatung.com/items/tlt-prompt-thiet-ke-quy-trinh-tuyen-dung-ai-agent) | Thiết kế hệ thống AI Agent hỗ trợ sàng lọc CV, lên lịch phỏng vấn và gửi phản hồi tự động cho ứng viên. | [📄](content/prompts/toilatung-operations/tlt-prompt-thiet-ke-quy-trinh-tuyen-dung-ai-agent.json) |
| [Tạo SOP — Quy Trình Làm Việc Chuẩn Từ Mô Tả](https://hub.toilatung.com/items/tlt-tao-sop-quy-trinh-lam-viec-chuan-tu-mo-ta) | Biến mô tả công việc mơ hồ thành tài liệu SOP chi tiết, có thể giao cho nhân viên thực hiện ngay. | [📄](content/prompts/toilatung-operations/tlt-tao-sop-quy-trinh-lam-viec-chuan-tu-mo-ta.json) |
| [The 'Value Flip' Before & After Card](https://hub.toilatung.com/items/tlt-the-value-flip-before-after-card) | Biến sản phẩm/dịch vụ giá rẻ thành gói Premium Package thông qua định vị Before/After Card trực quan. | [📄](content/prompts/toilatung-operations/tlt-the-value-flip-before-after-card.json) |
| [Tóm Tắt Meeting → Action Items trong 30 Giây](https://hub.toilatung.com/items/tlt-tom-tat-meeting-action-items-trong-30-giay) | Biến ghi chú meeting lộn xộn thành bản tóm tắt sạch + danh sách việc cần làm có deadline. | [📄](content/prompts/toilatung-operations/tlt-tom-tat-meeting-action-items-trong-30-giay.json) |
| [Upsell & Expansion Path Designer](https://hub.toilatung.com/items/tlt-upsell-expansion-path-designer) | Thiết kế 3 Trigger points và giới hạn sử dụng (Usage limits) để thúc đẩy khách nâng cấp lên gói Pro. | [📄](content/prompts/toilatung-operations/tlt-upsell-expansion-path-designer.json) |
| [Value Gap Finder](https://hub.toilatung.com/items/tlt-value-gap-finder) | Phân tích khoảng trống giá trị và ROI thực tế để chứng minh sản phẩm đang bị định giá quá thấp. | [📄](content/prompts/toilatung-operations/tlt-value-gap-finder.json) |
| [Viết Proposal / Báo Giá Dịch Vụ Thuyết Phục](https://hub.toilatung.com/items/tlt-viet-proposal-bao-gia-dich-vu-thuyet-phuc) | Tạo đề xuất dịch vụ chuyên nghiệp theo cấu trúc mà khách hàng khó từ chối. | [📄](content/prompts/toilatung-operations/tlt-viet-proposal-bao-gia-dich-vu-thuyet-phuc.json) |
| [Xử Lý 5 Phản Đối Phổ Biến Nhất (Objection Handling)](https://hub.toilatung.com/items/tlt-xu-ly-5-phan-doi-pho-bien-nhat-objection-handling) | Tạo script phản hồi chuyên nghiệp cho 5 lời từ chối phổ biến nhất của khách hàng. | [📄](content/prompts/toilatung-operations/tlt-xu-ly-5-phan-doi-pho-bien-nhat-objection-handling.json) |

<a id="prompt-system-design"></a>

#### System Design & AI (24)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Dual-Engine System 1 vs System 2 Task Dispatcher](https://hub.toilatung.com/items/system1-system2-router) | Phân tầng tác vụ thông minh: Tách phản xạ nhanh (System 1) và suy luận logic sâu (System 2) nhằm tối ưu chi p… | [📄](content/prompts/ocp-architect/system1-system2-router.json) |
| [Few-Shot Context Builder](https://hub.toilatung.com/items/tlt-few-shot-context-builder) | Prompt tự động tạo các ví dụ Input-Output mẫu (Few-Shot examples) để đưa vào AI Studio giúp Gemini hiểu rõ cá… | [📄](content/prompts/toilatung-system-design/tlt-few-shot-context-builder.json) |
| [Gemini Advanced Developer System Instruction](https://hub.toilatung.com/items/tlt-gemini-advanced-developer-system-instruction) | System Instruction biến Gemini thành một Coding Partner cao cấp trong AI Studio, tận dụng tối đa context wind… | [📄](content/prompts/toilatung-system-design/tlt-gemini-advanced-developer-system-instruction.json) |
| [Google AI Studio JSON Schema Generator](https://hub.toilatung.com/items/tlt-google-ai-studio-json-schema-generator) | Prompt giúp thiết lập cấu trúc JSON Schema chuẩn cho tính năng Structured Output của Gemini API. | [📄](content/prompts/toilatung-system-design/tlt-google-ai-studio-json-schema-generator.json) |
| [LLM Token Cost & Model Routing Estimator](https://hub.toilatung.com/items/llm-token-cost-estimator) | Ước tính chi phí token theo tháng cho một tính năng AI, so sánh phương án định tuyến model và đề xuất tối ưu. | [📄](content/prompts/ocp-architect/llm-token-cost-estimator.json) |
| [Master Prompt Trợ Lý Hoạch Định Chiến Lược Doanh Nghiệp](https://hub.toilatung.com/items/tlt-master-prompt-tro-ly-hoach-dinh-chien-luoc-doanh-nghiep) | Thiết lập trợ lý AI đóng vai trò nhà hoạch định chiến lược kinh doanh và tối ưu hóa mô hình vận hành. | [📄](content/prompts/toilatung-system-design/tlt-master-prompt-tro-ly-hoach-dinh-chien-luoc-doanh-nghiep.json) |
| [Master Prompt Trợ Lý Viết Bài B2B Chuyên Sâu](https://hub.toilatung.com/items/tlt-master-prompt-tro-ly-viet-bai-b2b-chuyen-sau) | Thiết lập hệ thống AI đóng vai trò Copywriter chuyên sâu về B2B, viết bài phân tích thị trường chất lượng cao. | [📄](content/prompts/toilatung-system-design/tlt-master-prompt-tro-ly-viet-bai-b2b-chuyen-sau.json) |
| [Multi-Agent DAG & JSON Handoff Designer](https://hub.toilatung.com/items/multi-agent-dag-handoff) | Thiết kế workflow đa agent dạng DAG với hợp đồng JSON giữa các node, retry policy và human-in-the-loop checkp… | [📄](content/prompts/ocp-architect/multi-agent-dag-handoff.json) |
| [Offer Clarity Audit](https://hub.toilatung.com/items/tlt-offer-clarity-audit) | Phân tích trang định giá (Pricing page) để chỉ ra các điểm gây nhầm lẫn làm giảm tỷ lệ chốt sale. | [📄](content/prompts/toilatung-system-design/tlt-offer-clarity-audit.json) |
| [Premium Signal Audit](https://hub.toilatung.com/items/tlt-premium-signal-audit) | Đánh giá 10 vi tín hiệu (micro-signals) cao cấp trên Website, LinkedIn và quy trình Onboarding để tăng độ uy… | [📄](content/prompts/toilatung-system-design/tlt-premium-signal-audit.json) |
| [Pricing Leak Detector](https://hub.toilatung.com/items/tlt-pricing-leak-detector) | Chẩn đoán các lỗ rò rỉ chuyển đổi trên trang giá dựa trên các chỉ số phễu thực tế. | [📄](content/prompts/toilatung-system-design/tlt-pricing-leak-detector.json) |
| [Prompt Bản Vẽ Sáng Chế Cổ Điển (Patent Drawing)](https://hub.toilatung.com/items/tlt-prompt-ban-ve-sang-che-co-dien-patent-drawing) | Tạo hình vẽ thiết kế sáng chế phong cách vẽ nét đen trắng (line art) trên nền giấy cổ điển. | [📄](content/prompts/toilatung-system-design/tlt-prompt-ban-ve-sang-che-co-dien-patent-drawing.json) |
| [Prompt Đánh Giá Bố Cục Hình Ảnh AI](https://hub.toilatung.com/items/tlt-prompt-danh-gia-bo-cuc-hinh-anh-ai) | Phân tích bố cục, ánh sáng và tính thẩm mỹ của ảnh AI tạo ra để đưa ra các đề xuất điều chỉnh cụ thể. | [📄](content/prompts/toilatung-system-design/tlt-prompt-danh-gia-bo-cuc-hinh-anh-ai.json) |
| [Prompt sửa lỗi chữ tiếng Việt](https://hub.toilatung.com/items/tlt-prompt-sua-loi-chu-tieng-viet) | Dùng khi AI tạo sai hoặc lỗi font chữ tiếng Việt. | [📄](content/prompts/toilatung-system-design/tlt-prompt-sua-loi-chu-tieng-viet.json) |
| [Prompt Tạo Ảnh Cắt Lớp Sản Phẩm (Cross-section)](https://hub.toilatung.com/items/tlt-prompt-tao-anh-cat-lop-san-pham-cross-section) | Tạo ảnh chụp cắt lớp sản phẩm công nghệ để hiển thị các chi tiết cơ học và bo mạch bên trong. | [📄](content/prompts/toilatung-system-design/tlt-prompt-tao-anh-cat-lop-san-pham-cross-section.json) |
| [Prompt tạo ảnh exploded-view](https://hub.toilatung.com/items/tlt-prompt-tao-anh-exploded-view) | Tạo ảnh tháo rời chi tiết linh kiện công nghệ cao cấp. | [📄](content/prompts/toilatung-system-design/tlt-prompt-tao-anh-exploded-view.json) |
| [Prompt Tạo Bản Vẽ Kỹ Thuật 3D Architecture](https://hub.toilatung.com/items/tlt-prompt-tao-ban-ve-ky-thuat-3d-architecture) | Tạo bản vẽ kỹ thuật kiến trúc 3D với phong cách blueprint sắc nét, chuyên nghiệp. | [📄](content/prompts/toilatung-system-design/tlt-prompt-tao-ban-ve-ky-thuat-3d-architecture.json) |
| [Prompt Tối Ưu Lệnh Prompt Kém](https://hub.toilatung.com/items/tlt-prompt-toi-uu-lenh-prompt-kem) | Chuyển đổi một câu prompt thô, mơ hồ thành một câu prompt chuẩn hóa cấu trúc để AI hiểu và phản hồi chính xác. | [📄](content/prompts/toilatung-system-design/tlt-prompt-toi-uu-lenh-prompt-kem.json) |
| [Prompt Training Chatbot Hỗ Trợ Khách Hàng](https://hub.toilatung.com/items/tlt-prompt-training-chatbot-ho-tro-khach-hang) | Huấn luyện chatbot hỗ trợ kỹ thuật và chăm sóc khách hàng tự động dựa trên tài liệu sản phẩm. | [📄](content/prompts/toilatung-system-design/tlt-prompt-training-chatbot-ho-tro-khach-hang.json) |
| [Prompt Training Chatbot Sales B2B](https://hub.toilatung.com/items/tlt-prompt-training-chatbot-sales-b2b) | Huấn luyện chatbot đóng vai trò chuyên viên tư vấn bán hàng B2B, xử lý từ chối và thiết lập cuộc hẹn. | [📄](content/prompts/toilatung-system-design/tlt-prompt-training-chatbot-sales-b2b.json) |
| [RAG Pipeline Architect](https://hub.toilatung.com/items/rag-pipeline-architect) | Thiết kế pipeline Retrieval-Augmented Generation: ingest, chunking, embedding, hybrid search, rerank, đánh gi… | [📄](content/prompts/ocp-architect/rag-pipeline-architect.json) |
| [REST / OpenAPI Contract Designer](https://hub.toilatung.com/items/api-contract-designer) | Thiết kế API contract chuẩn OpenAPI 3.1: resource, endpoint, schema, mã lỗi, phân trang, versioning và idempo… | [📄](content/prompts/ocp-architect/api-contract-designer.json) |
| [The Launch Readiness Checklist](https://hub.toilatung.com/items/tlt-the-launch-readiness-checklist) | Danh sách kiểm tra 12 điểm tử huyệt trước khi tung sản phẩm ra thị trường, đóng vai trò như một COO khó tính. | [📄](content/prompts/toilatung-system-design/tlt-the-launch-readiness-checklist.json) |
| [Visual Intent Checklist](https://hub.toilatung.com/items/tlt-visual-intent-checklist) | Xác định mục tiêu hình ảnh trước khi viết prompt. | [📄](content/prompts/toilatung-system-design/tlt-visual-intent-checklist.json) |

<a id="prompt-copywriting"></a>

#### Copywriting (23)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [About Page Copy Generator](https://hub.toilatung.com/items/tlt-about-page-copy-generator) | Soạn thảo toàn bộ trang About Page theo cấu trúc 5 phần giúp xây dựng uy tín câu chuyện sáng lập và chuyển đổ… | [📄](content/prompts/toilatung-copywriting/tlt-about-page-copy-generator.json) |
| [Ad Copy Facebook/Google — A/B Testing 3 Biến Thể](https://hub.toilatung.com/items/tlt-ad-copy-facebook-google-a-b-testing-3-bien-the) | Tạo 3 mẫu quảng cáo khác nhau (Hook/Body/CTA) để test và tìm winner. | [📄](content/prompts/toilatung-copywriting/tlt-ad-copy-facebook-google-a-b-testing-3-bien-the.json) |
| [Authority Narrative Builder](https://hub.toilatung.com/items/tlt-authority-narrative-builder) | Xây dựng câu chuyện thương hiệu/nhà sáng lập để thiết lập uy tín vị thế cao (Quiet Authority) thông qua Credi… | [📄](content/prompts/toilatung-copywriting/tlt-authority-narrative-builder.json) |
| [B2B Case Study Storyteller](https://hub.toilatung.com/items/case-study-storyteller) | Biến dữ liệu dự án thành case study thuyết phục: bối cảnh, thách thức, giải pháp, kết quả định lượng và trích… | [📄](content/prompts/copywriting/case-study-storyteller.json) |
| [B2B Cold Email Sequence (4 Touchpoints)](https://hub.toilatung.com/items/b2b-cold-email-sequence) | Chuỗi 4 email outbound cá nhân hóa, không spam, tập trung vào insight và một lời kêu gọi duy nhất mỗi email. | [📄](content/prompts/b2b-agency/b2b-cold-email-sequence.json) |
| [Caption 5 Phong Cách cho 1 Bài Đăng](https://hub.toilatung.com/items/tlt-caption-5-phong-cach-cho-1-bai-dang) | Biến 1 ý tưởng thành 5 caption khác nhau: chuyên sâu, hài hước, cảm xúc, bán hàng, kể chuyện. | [📄](content/prompts/toilatung-copywriting/tlt-caption-5-phong-cach-cho-1-bai-dang.json) |
| [Carousel Series Hook & Slide Writer](https://hub.toilatung.com/items/facebook-carousel-hook-writer) | Viết carousel 8 slide cho Facebook/Instagram/LinkedIn: hook slide, nội dung từng slide, prompt hình minh họa… | [📄](content/prompts/copywriting/facebook-carousel-hook-writer.json) |
| [Chuỗi 3 Email Nurture Khách Hàng Tiềm Năng](https://hub.toilatung.com/items/tlt-chuoi-3-email-nurture-khach-hang-tiem-nang) | Viết trọn bộ 3 email chăm sóc lead theo công thức biến người lạ thành khách hàng. | [📄](content/prompts/toilatung-copywriting/tlt-chuoi-3-email-nurture-khach-hang-tiem-nang.json) |
| [ICP Pain Mapper](https://hub.toilatung.com/items/tlt-icp-pain-mapper) | Lập bản đồ 3 lớp nỗi đau (Bề mặt, Tài chính, Cảm xúc) của ICP để tối ưu hóa offer. | [📄](content/prompts/toilatung-copywriting/tlt-icp-pain-mapper.json) |
| [In-App Upsell Trigger Writer](https://hub.toilatung.com/items/tlt-in-app-upsell-trigger-writer) | Viết 3 mẫu thông báo in-app tinh tế nhằm upsell người dùng khi họ chạm mốc giới hạn tính năng của gói Free. | [📄](content/prompts/toilatung-copywriting/tlt-in-app-upsell-trigger-writer.json) |
| [Landing Page Copy (PAS + Proof Stack)](https://hub.toilatung.com/items/landing-page-pas-copy) | Viết toàn bộ copy landing page theo khung Problem–Agitate–Solve kết hợp Proof Stack, FAQ xử lý phản đối và CT… | [📄](content/prompts/copywriting/landing-page-pas-copy.json) |
| [LinkedIn / Facebook Thought Leadership Post](https://hub.toilatung.com/items/linkedin-thought-leadership-post) | Bài đăng chia sẻ góc nhìn cá nhân theo cấu trúc Hook – Nghịch lý – Bài học – Câu hỏi mở, giọng thực chiến, kh… | [📄](content/prompts/copywriting/linkedin-thought-leadership-post.json) |
| [LinkedIn Bio Optimizer](https://hub.toilatung.com/items/tlt-linkedin-bio-optimizer) | Tối ưu hóa Bio LinkedIn gồm Headline (dưới 220 ký tự) và mục About (dưới 150 từ) theo 3 mục tiêu cụ thể. | [📄](content/prompts/toilatung-copywriting/tlt-linkedin-bio-optimizer.json) |
| [Pitch Deck Content & Narrative Planner](https://hub.toilatung.com/items/tlt-pitch-deck-content-narrative-planner) | Lên kịch bản nội dung chi tiết cho từng slide trong một bộ slide thuyết trình hoặc gọi vốn. | [📄](content/prompts/toilatung-copywriting/tlt-pitch-deck-content-narrative-planner.json) |
| [Pitch Script Designer (30s & 2min)](https://hub.toilatung.com/items/tlt-pitch-script-designer-30s-2min) | Soạn thảo kịch bản thuyết trình nhanh (elevator pitch) ở 2 định dạng: 30 giây và 2 phút phục vụ networking. | [📄](content/prompts/toilatung-copywriting/tlt-pitch-script-designer-30s-2min.json) |
| [Premium Reframe Strategy](https://hub.toilatung.com/items/tlt-premium-reframe-strategy) | Tái cấu trúc khung nhận thức (framing) của khách hàng để chuyển dịch sản phẩm từ commodity rẻ tiền sang premi… | [📄](content/prompts/toilatung-copywriting/tlt-premium-reframe-strategy.json) |
| [Pricing Page Copy Generator](https://hub.toilatung.com/items/tlt-pricing-page-copy-generator) | Soạn thảo toàn bộ nội dung trang bảng giá gồm Headline, so sánh giá trị và bộ 5 câu FAQ xử lý từ chối. | [📄](content/prompts/toilatung-copywriting/tlt-pricing-page-copy-generator.json) |
| [Prompt Viết Copy Landing Page Theo PAS](https://hub.toilatung.com/items/tlt-prompt-viet-copy-landing-page-theo-pas) | Biên soạn nội dung Landing Page bán hàng thuyết phục dựa trên mô hình PAS (Problem - Agitate - Solve) cho phâ… | [📄](content/prompts/toilatung-copywriting/tlt-prompt-viet-copy-landing-page-theo-pas.json) |
| [Quiet Authority Newsletter Writer](https://hub.toilatung.com/items/email-newsletter-quiet-authority) | Viết bản tin email hàng tuần: 1 ý tưởng lớn, 1 framework áp dụng được, 1 tài nguyên — giọng điềm tĩnh, giàu i… | [📄](content/prompts/copywriting/email-newsletter-quiet-authority.json) |
| [Sales Objection Handling Playbook](https://hub.toilatung.com/items/sales-objection-handler) | Bộ kịch bản xử lý 8 lời từ chối phổ biến theo khung Acknowledge – Clarify – Reframe – Confirm. | [📄](content/prompts/copywriting/sales-objection-handler.json) |
| [Signature Content Angle Finder](https://hub.toilatung.com/items/tlt-signature-content-angle-finder) | Tìm kiếm 3 góc nội dung độc quyền từ brand positioning vượt qua 3 bài test độ độc bản và đề xuất tiêu đề bài… | [📄](content/prompts/toilatung-copywriting/tlt-signature-content-angle-finder.json) |
| [Social Media Carousel Copywriter](https://hub.toilatung.com/items/tlt-social-media-carousel-copywriter) | Soạn kịch bản và dàn ý 8 slide Carousel thu hút người đọc trên LinkedIn & Facebook. | [📄](content/prompts/toilatung-copywriting/tlt-social-media-carousel-copywriter.json) |
| [Value Proposition Rewriter](https://hub.toilatung.com/items/tlt-value-proposition-rewriter) | Chuyển đổi thông điệp tính năng cũ thành 5 câu Value Proposition định hướng kết quả sâu sắc. | [📄](content/prompts/toilatung-copywriting/tlt-value-proposition-rewriter.json) |

<a id="prompt-branding"></a>

#### Brand Strategy (16)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [6-Layer Text to Image Prompt](https://hub.toilatung.com/items/tlt-6-layer-text-to-image-prompt) | Cấu trúc prompt 6 lớp giúp kiểm soát tối đa kết quả. | [📄](content/prompts/toilatung-branding/tlt-6-layer-text-to-image-prompt.json) |
| [A3 Print-ready Poster Prompt](https://hub.toilatung.com/items/tlt-a3-print-ready-poster-prompt) | Tối ưu hóa poster để in ấn khổ lớn (A3/A2). | [📄](content/prompts/toilatung-branding/tlt-a3-print-ready-poster-prompt.json) |
| [Banner Workflow 16:9 Dual Neon Light (Electric Cyan & Magenta)](https://hub.toilatung.com/items/tlt-banner-workflow-16-9-dual-neon-light-electric-cyan-magenta) | Tạo poster infographic 16:9 phong cách Dual Neon Light phát sáng rực rỡ (Cyan #00F0FF & Magenta #FF007F) nổi… | [📄](content/prompts/toilatung-branding/tlt-banner-workflow-16-9-dual-neon-light-electric-cyan-magenta.json) |
| [Banner Workflow 16:9 với Avatar AI Orchestrator](https://hub.toilatung.com/items/tlt-banner-workflow-16-9-voi-avatar-ai-orchestrator) | Tạo poster infographic workflow 16:9 viền Neon Dark Navy (#003189) tích hợp Avatar AI Orchestrator làm hạt nh… | [📄](content/prompts/toilatung-branding/tlt-banner-workflow-16-9-voi-avatar-ai-orchestrator.json) |
| [Batch 20 Famous Posters Prompt](https://hub.toilatung.com/items/tlt-batch-20-famous-posters-prompt) | Quy trình tạo hàng loạt 20 poster theo nhóm. | [📄](content/prompts/toilatung-branding/tlt-batch-20-famous-posters-prompt.json) |
| [Bento Grid Infographic Layout](https://hub.toilatung.com/items/tlt-bento-grid-infographic-layout) | Tạo bố cục Bento Grid hiện đại để trình bày thông tin, dữ liệu công nghệ. | [📄](content/prompts/toilatung-branding/tlt-bento-grid-infographic-layout.json) |
| [Brand Clarity Audit](https://hub.toilatung.com/items/tlt-brand-clarity-audit) | Đánh giá tính rõ ràng của định vị thương hiệu trên homepage và đề xuất cách sửa đổi nhanh trong 3 giây đầu ti… | [📄](content/prompts/toilatung-branding/tlt-brand-clarity-audit.json) |
| [Brand Differentiation One-Pager](https://hub.toilatung.com/items/tlt-brand-differentiation-one-pager) | Thiết kế nội dung tài liệu một trang (One-Pager) tóm tắt định vị, hào cạnh tranh và kết quả để gửi đối tác. | [📄](content/prompts/toilatung-branding/tlt-brand-differentiation-one-pager.json) |
| [Brand DNA Extractor](https://hub.toilatung.com/items/tlt-brand-dna-extractor) | Đào sâu vào cốt lõi thương hiệu để xây dựng bản đồ nhận diện 3 lớp (Bề mặt, Cốt lõi, Chiều sâu) và điểm căng… | [📄](content/prompts/toilatung-branding/tlt-brand-dna-extractor.json) |
| [Brand Voice Designer](https://hub.toilatung.com/items/tlt-brand-voice-designer) | Thiết kế bộ hướng dẫn giọng điệu thương hiệu (Brand Voice) với quy tắc dùng/cấm dùng từ và 5 ví dụ Trước/Sau… | [📄](content/prompts/toilatung-branding/tlt-brand-voice-designer.json) |
| [Editorial Biography Poster Master](https://hub.toilatung.com/items/tlt-editorial-biography-poster-master) | Prompt toàn năng tạo poster tiểu sử nhân vật. | [📄](content/prompts/toilatung-branding/tlt-editorial-biography-poster-master.json) |
| [Messaging Architecture Builder](https://hub.toilatung.com/items/tlt-messaging-architecture-builder) | Xây dựng kiến trúc thông điệp 3 tầng (Brand, Product, Feature) nhất quán trên mọi điểm chạm. | [📄](content/prompts/toilatung-branding/tlt-messaging-architecture-builder.json) |
| [Pitch Deck Slide Design Vibe](https://hub.toilatung.com/items/tlt-pitch-deck-slide-design-vibe) | Thiết kế visual layout cho một slide thuyết trình hoặc pitch deck theo phong cách hiện đại. | [📄](content/prompts/toilatung-branding/tlt-pitch-deck-slide-design-vibe.json) |
| [Poster A4: Quy Trình 11 Bước Khóa Nhân Vật AI Nhất Quán (Founder Tùng)](https://hub.toilatung.com/items/tlt-poster-a4-quy-trinh-11-buoc-khoa-nhan-vat-ai-nhat-quan-founder-tung) | Tạo infographic dọc A4 trực quan hóa 11 bước chống trôi danh tính (Anti-Identity Drift) với Case Study Founde… | [📄](content/prompts/toilatung-branding/tlt-poster-a4-quy-trinh-11-buoc-khoa-nhan-vat-ai-nhat-quan-founder-tung.json) |
| [Prompt rút gọn chữ trên ảnh](https://hub.toilatung.com/items/tlt-prompt-rut-gon-chu-tren-anh) | Làm cho poster thoáng hơn bằng cách rút gọn text. | [📄](content/prompts/toilatung-branding/tlt-prompt-rut-gon-chu-tren-anh.json) |
| [Visual Communication Poster Prompt](https://hub.toilatung.com/items/tlt-visual-communication-poster-prompt) | Tạo poster truyền thông có thông điệp rõ ràng. | [📄](content/prompts/toilatung-branding/tlt-visual-communication-poster-prompt.json) |

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

<a id="prompt-ads"></a>

#### Paid Ads (2)

| Tên | Mô tả | Nguồn |
|---|---|---|
| [Positioning Statement Forge](https://hub.toilatung.com/items/tlt-positioning-statement-forge) | Đúc kết tuyên ngôn định vị độc bản theo framework Geoffrey Moore kèm 3 biến thể ngắn cho Bio, Website và Ads. | [📄](content/prompts/toilatung-ads/tlt-positioning-statement-forge.json) |
| [Viết Bài Blog Chuẩn SEO từ 1 Từ Khóa](https://hub.toilatung.com/items/tlt-viet-bai-blog-chuan-seo-tu-1-tu-khoa) | Tạo outline + draft bài blog đầy đủ: tiêu đề, meta, heading H2/H3, internal link placeholder. | [📄](content/prompts/toilatung-ads/tlt-viet-bai-blog-chuan-seo-tu-1-tu-khoa.json) |

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

### 🧠 Deep Reasoning (7)

<a id="boost-deep-reasoning"></a>

#### Deep Reasoning (7)

| Boost | Lệnh | Mô tả | Nguồn |
|---|---|---|---|
| [CEO Decision Memo (Options & Trade-offs)](https://hub.toilatung.com/items/ceo-decision-memo) | `/boost DECISION_MEMO` | Chuyển một quyết định khó thành memo 1 trang kiểu Amazon: bối cảnh, phương án, đánh đổi, khuyến nghị và tiêu… | [📄](content/boosts/ceo-decision-memo.json) |
| [First-Principles Decomposer](https://hub.toilatung.com/items/first-principles-decomposer) | `/boost FIRST_PRINCIPLES` | Bóc tách vấn đề về các chân lý nền tảng, loại bỏ lối mòn tư duy theo thói quen, rồi tái cấu trúc giải pháp từ… | [📄](content/boosts/first-principles-decomposer.json) |
| [Pre-Mortem Campaign Red-Team](https://hub.toilatung.com/items/pre-mortem-red-team) | `/boost PRE_MORTEM` | Giả định chiến dịch/dự án đã thất bại sau 90 ngày, truy ngược nguyên nhân, chấm rủi ro và thiết kế biện pháp… | [📄](content/boosts/pre-mortem-red-team.json) |
| [Red-Team Architecture & Adversarial Stress Tester](https://hub.toilatung.com/items/ocp-redteam-architect) | `/boost RED_TEAM_ARCHITECT` | Kích hoạt chế độ phản biện gắt gao (Devil's Advocate) để tìm ra các lỗi sụp đổ tiềm ẩn trong kiến trúc phần m… | [📄](content/boosts/ocp-redteam-architect.json) |
| [System 1 vs System 2 Cognitive Classifier](https://hub.toilatung.com/items/system1-system2-classifier) | `/boost SYSTEM_SPLIT` | Buộc model tự phân loại câu hỏi trước khi trả lời: phản xạ nhanh (System 1) hay suy luận sâu (System 2), rồi… | [📄](content/boosts/system1-system2-classifier.json) |
| [Tree-of-Thought Strategy Explorer](https://hub.toilatung.com/items/tree-of-thought-strategist) | `/boost TREE_OF_THOUGHT` | Mở rộng nhiều nhánh giải pháp song song, tự chấm điểm, cắt tỉa nhánh yếu và đào sâu nhánh mạnh trước khi chốt… | [📄](content/boosts/tree-of-thought-strategist.json) |
| [Unit Economics Auditor](https://hub.toilatung.com/items/unit-economics-auditor) | `/boost UNIT_ECONOMICS` | Kiểm toán kinh tế đơn vị của mô hình kinh doanh hoặc tính năng AI: CAC, LTV, gross margin, payback, chi phí t… | [📄](content/boosts/unit-economics-auditor.json) |

<a id="workflows"></a>

### 🔀 Workflows (5)

| Workflow | Bước | Độ khó | Mô tả | Nguồn |
|---|---:|---|---|---|
| [B2B Campaign Launcher — từ nghiên cứu đến bài đăng chờ duyệt](https://hub.toilatung.com/workflows/b2b-campaign-launcher) | 5 | Advanced | Dây chuyền 5 bước ra mắt chiến dịch marketing B2B: nghiên cứu thị trường → viết copy → prompt hình 16:9 → cổn… | [📄](content/workflows/wf-b2b-campaign-launcher.json) |
| [OCP Decision Stress Test — thẩm định quyết định kinh doanh 4 tầng](https://hub.toilatung.com/workflows/ocp-decision-stress-test) | 4 | Enterprise OCP | Khung thẩm định quyết định cho One-Person Company: lọc nhanh System 1 → suy luận sâu Tree-of-Thought → phản b… | [📄](content/workflows/wf-ocp-decision-stress-test.json) |
| [SEO/GEO Long-form Dominator — bài 2.500 từ được AI trích dẫn](https://hub.toilatung.com/workflows/seo-geo-longform-dominator) | 4 | Advanced | Dây chuyền bài viết chuyên sâu chuẩn SEO + GEO/AIO: cụm ngữ nghĩa & dàn ý → sơ đồ visual anchor → toàn văn qu… | [📄](content/workflows/wf-seo-geo-longform-dominator.json) |
| [VPS Onboarding Automation — HestiaCP, Mail Server & Uptime Monitor](https://hub.toilatung.com/workflows/vps-onboarding-automation) | 5 | Enterprise OCP | Quy trình tiếp nhận khách hàng hosting và kích hoạt hạ tầng: hồ sơ tiếp nhận → kịch bản HestiaCP (web + SSL)… | [📄](content/workflows/wf-vps-onboarding-automation.json) |
| [YouTube Shorts Factory — nhà máy video ngắn 9:16](https://hub.toilatung.com/workflows/youtube-shorts-factory) | 5 | Enterprise OCP | Từ một chủ đề đến composition Remotion sẵn render: ý tưởng → kịch bản 4 hồi → script giọng đọc ElevenLabs → s… | [📄](content/workflows/wf-youtube-shorts-factory.json) |

<a id="bots"></a>

### 🤖 Bots — AI Workforce (16)

| Bot | Vai trò | Phòng ban | Nguồn |
|---|---|---|---|
| 🤝 [Ally](https://hub.toilatung.com/bots/ally) | Lead Qualification & Customer Success CRM | CRM/Automation | [📄](content/bots/ally.json) |
| 🏹 [Arrow](https://hub.toilatung.com/bots/arrow) | Outreach & Cold Email Multi-tenant Funnel | CRM/Automation | [📄](content/bots/arrow.json) |
| ⚡ [Bolt](https://hub.toilatung.com/bots/bolt) | Automation Engineer & n8n / Webhook Orchestrator | CRM/Automation | [📄](content/bots/bolt.json) |
| 📣 [Buzz](https://hub.toilatung.com/bots/buzz) | Social Media & Meta Graph API Planner | Marketing/SEO | [📄](content/bots/buzz.json) |
| 🧩 [Craft](https://hub.toilatung.com/bots/craft) | UI/UX & Visual Asset Designer | Content/Video | [📄](content/bots/craft.json) |
| 👑 [Crown](https://hub.toilatung.com/bots/crown) | Brand Strategy & DNA Consistency Guardian | Marketing/SEO | [📄](content/bots/crown.json) |
| 🎙️ [Echo](https://hub.toilatung.com/bots/echo) | Voice & Audio Specialist (ElevenLabs & SSML) | Content/Video | [📄](content/bots/echo.json) |
| 🧭 [Lexi](https://hub.toilatung.com/bots/lexi) | Senior AI Operations Manager | Command | [📄](content/bots/lexi.json) |
| 📊 [Metric](https://hub.toilatung.com/bots/metric) | GA4 & Google Search Console Live Analytics | Marketing/SEO | [📄](content/bots/metric.json) |
| 🗺️ [North](https://hub.toilatung.com/bots/north) | SEO / GEO Long-Form Architect | Marketing/SEO | [📄](content/bots/north.json) |
| 🎨 [Pixel](https://hub.toilatung.com/bots/pixel) | Graphic, 16:9 Thumbnail & Infographic Designer | Content/Video | [📄](content/bots/pixel.json) |
| 💓 [Pulse](https://hub.toilatung.com/bots/pulse) | Health Monitor & VPS / DB Integrity Watchdog | CRM/Automation | [📄](content/bots/pulse.json) |
| 🪶 [Quill](https://hub.toilatung.com/bots/quill) | Conversion Copywriter & Blog Master | Content/Video | [📄](content/bots/quill.json) |
| 🎬 [Reel](https://hub.toilatung.com/bots/reel) | Dark Neon Shorts & Motion Director | Content/Video | [📄](content/bots/reel.json) |
| 🔭 [Scout](https://hub.toilatung.com/bots/scout) | Deep Research & Competitor Spy | Marketing/SEO | [📄](content/bots/scout.json) |
| 🛡️ [Shield](https://hub.toilatung.com/bots/shield) | Security, Prompt Injection Firewall & RLS Audit | CRM/Automation | [📄](content/bots/shield.json) |

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
| `npm test` | Unit tests: variable engine, exporters, schema, theme, favorites, filters, SEO builders, README index, workflow validator & piping, n8n / Python exports, bot loader |
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

`awesome-prompts` · `prompt-engineering` · `agent-skills` · `ai-workflows` · `n8n` · `system-prompts` · `ai-agents` · `claude-code` · `cursorrules` · `chatgpt-prompts` · `nextjs16` · `tailwindcss-v4` · `build-in-public` · `seo-geo` · `vietnamese`

## 📁 Project structure

```
app/                       Next.js App Router
  page.tsx, prompts|skills/, items/[id]/   catalog & item pages (+ opengraph-image)
  bots/, bots/[id]/        AI Workforce personas (+ opengraph-image)
  workflows/, workflows/[slug]/   Workflow Studio (+ opengraph-image)
  build-in-public/         project story
  data/items/[id]/         static JSON per item (loaded on demand)
  sitemap.ts, robots.ts, llms.txt/                crawl infrastructure
components/                Navbar, ThemeToggle, FilterBar, ItemCard, VariableWorkbench, CommandPalette, ShareBar…
content/                   prompts/**/*.json · skills/*.md · boosts/*.json (Deep Reasoning) · workflows/*.json · bots/*.json
lib/                       variables, exporters, schema, loader, workflow engine, facets, filter, favorites, theme, seo, og, readme
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
