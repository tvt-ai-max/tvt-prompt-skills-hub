import type { Metadata } from 'next';
import { TierPage } from '@/components/TierPage';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Danh sách Skills trong TVT Intelligence Hub.',
};

export default function SkillsPage() {
  return <TierPage tier="skill" />;
}
