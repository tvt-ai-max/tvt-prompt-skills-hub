import { Bot, Brain, ChevronRight, Sparkles } from 'lucide-react';

const STEPS = [
  {
    Icon: Sparkles,
    tier: 'Tier 1 · Prompts',
    title: 'Điền biến, copy trong 15 giây',
    body: 'Mỗi {{VARIABLE}} tự sinh một ô nhập. Live preview tô sáng phần bạn đã điền.',
    tone: 'text-cyan-300',
  },
  {
    Icon: Bot,
    tier: 'Tier 2 · Skills',
    title: 'Chuẩn hoá thành quy trình lặp lại',
    body: 'SOP cho AI Agent: inputs, tools, các bước và quality gate — xuất SKILL.md 1 chạm.',
    tone: 'text-emerald-300',
  },
  {
    Icon: Brain,
    tier: 'Tier 3 · Boosts',
    title: 'Nâng cấp bằng tư duy sâu',
    body: 'Slash command kích hoạt Chain/Tree-of-Thought, Red-team và phân tầng System 1 vs 2.',
    tone: 'text-violet-300',
  },
];

export function TierLadder() {
  return (
    <section aria-label="Mô hình 3 tầng" className="grid gap-3 md:grid-cols-3">
      {STEPS.map(({ Icon, tier, title, body, tone }, i) => (
        <div key={tier} className="relative rounded-2xl border border-line bg-gradient-to-b from-surface/70 to-transparent p-5">
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-wide uppercase ${tone}`}>
            <Icon className="size-4" aria-hidden /> {tier}
          </div>
          <h3 className="mt-2 font-semibold text-ink">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
          {i < STEPS.length - 1 && (
            <ChevronRight className="absolute top-1/2 -right-3 hidden size-5 -translate-y-1/2 text-faint md:block" aria-hidden />
          )}
        </div>
      ))}
    </section>
  );
}
