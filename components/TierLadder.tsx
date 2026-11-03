import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SECTIONS } from '@/components/Badges';

const STEPS = {
  prompts: { tier: 'Tầng 1 · Prompts', title: 'Điền biến, copy trong 15 giây', body: 'Mỗi {{VARIABLE}} tự sinh ô nhập, live preview tô sáng phần đã điền. Gồm cả nhóm Deep Reasoning.' },
  skills: { tier: 'Tầng 2 · Skills', title: 'Chuẩn hoá thành quy trình', body: 'SOP cho AI Agent: inputs, tools, các bước và quality gate — xuất SKILL.md 1 chạm.' },
  bots: { tier: 'Tầng 3 · Bots', title: 'Giao việc cho đúng chuyên gia', body: '16 agent trong AI Workforce, mỗi agent một system prompt sâu và ranh giới an toàn rõ ràng.' },
  workflows: { tier: 'Tầng 4 · Workflows', title: 'Nối thành dây chuyền tự động', body: 'Đồ thị nhiều bước: đầu ra bước trước tự chảy vào bước sau, xuất n8n hoặc Python CLI.' },
} as const;

export function TierLadder() {
  return (
    <section aria-label="Mô hình 4 tầng" className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {SECTIONS.map(({ key, href, Icon, text }, i) => {
        const step = STEPS[key];
        return (
          <Link
            key={key}
            href={href}
            className="focus-ring relative rounded-2xl border border-line bg-gradient-to-b from-surface/70 to-transparent p-5 transition hover:border-line-strong"
          >
            <div className={`flex items-center gap-2 text-xs font-semibold tracking-wide uppercase ${text}`}>
              <Icon className="size-4" aria-hidden /> {step.tier}
            </div>
            <h3 className="mt-2 font-semibold text-ink">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            {i < SECTIONS.length - 1 && (
              <ChevronRight className="absolute top-1/2 -right-3 hidden size-5 -translate-y-1/2 text-faint xl:block" aria-hidden />
            )}
          </Link>
        );
      })}
    </section>
  );
}
