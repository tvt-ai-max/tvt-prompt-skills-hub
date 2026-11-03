import type { Metadata } from 'next';
import { TierPage } from '@/components/TierPage';

export const metadata: Metadata = {
  title: 'Boosts',
  description: 'Danh sách Boosts trong TVT Intelligence Hub — điền biến, xem trước và copy 1 chạm cho ChatGPT, Claude, Cursor, SKILL.md.',
  alternates: { canonical: '/boosts' },
};

export default function BoostsPage() {
  return <TierPage tier="boost" />;
}
