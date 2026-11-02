import type { Metadata } from 'next';
import { TierPage } from '@/components/TierPage';

export const metadata: Metadata = {
  title: 'Boosts',
  description: 'Danh sách Boosts trong TVT Intelligence Hub.',
};

export default function BoostsPage() {
  return <TierPage tier="boost" />;
}
