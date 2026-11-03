import type { Metadata } from 'next';
import { Workflow } from 'lucide-react';
import { getAllWorkflows } from '@/lib/content';
import { getBotGlyphs } from '@/lib/bots';
import { WorkflowCard } from '@/components/WorkflowCard';

export const metadata: Metadata = {
  title: 'Workflows — AI Production Pipelines',
  description:
    'Dây chuyền AI nhiều bước dạng DAG: mỗi bước có agent phụ trách, model khuyến nghị, quality gate và biến tự động nối từ bước trước. Copy chuỗi prompt, xuất n8n JSON hoặc Python CLI.',
  alternates: { canonical: '/workflows' },
};

export default function WorkflowsPage() {
  const workflows = getAllWorkflows();
  const bots = getBotGlyphs();
  const steps = workflows.reduce((n, wf) => n + wf.steps.length, 0);
  return (
    <div className="pt-10">
      <header className="mb-8 max-w-3xl">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-amber-500 uppercase">
          <Workflow className="size-4" aria-hidden />
          AI Production Pipelines
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {workflows.length} Workflows · {steps} bước
        </h1>
        <p className="mt-3 text-muted">
          Mỗi workflow là một đồ thị: đầu ra của bước trước tự động trở thành đầu vào của bước sau. Nhập thông tin một lần, xem toàn bộ
          chuỗi prompt được nối biến theo thời gian thực, rồi xuất sang Claude Projects, n8n hoặc script Python.
        </p>
      </header>
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {workflows.map((wf) => (
          <li key={wf.id}>
            <WorkflowCard wf={wf} bots={bots} />
          </li>
        ))}
      </ul>
    </div>
  );
}
