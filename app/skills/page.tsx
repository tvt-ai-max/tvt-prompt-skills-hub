import type { Metadata } from 'next';
import { TierPage } from '@/components/TierPage';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Danh sách Skills trong TVT Intelligence Hub — điền biến, xem trước và copy 1 chạm cho ChatGPT, Claude, Cursor, SKILL.md.',
  alternates: { canonical: '/skills' },
};

export default function SkillsPage() {
  return <TierPage tier="skill" />;
}
