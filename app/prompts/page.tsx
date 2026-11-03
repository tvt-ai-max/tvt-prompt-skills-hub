import type { Metadata } from 'next';
import { TierPage } from '@/components/TierPage';

export const metadata: Metadata = {
  title: 'Prompts',
  description: 'Danh sách Prompts trong TVT Intelligence Hub — điền biến, xem trước và copy 1 chạm cho ChatGPT, Claude, Cursor, SKILL.md.',
  alternates: { canonical: '/prompts' },
};

export default function PromptsPage() {
  return <TierPage tier="prompt" />;
}
