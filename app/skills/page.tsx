import type { Metadata } from 'next';
import { TierPage } from '@/components/TierPage';
import { localeAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Danh sách Skills trong LexiHub — điền biến, xem trước và copy 1 chạm cho ChatGPT, Claude, Cursor, SKILL.md.',
  alternates: localeAlternates('/skills'),
};

export default function SkillsPage() {
  return <TierPage tier="skill" />;
}
