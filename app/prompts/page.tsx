import type { Metadata } from 'next';
import { TierPage } from '@/components/TierPage';

export const metadata: Metadata = {
  title: 'Prompts',
  description: 'Danh sách Prompts trong TVT Intelligence Hub.',
};

export default function PromptsPage() {
  return <TierPage tier="prompt" />;
}
