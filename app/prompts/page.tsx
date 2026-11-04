import type { Metadata } from 'next';
import { TierPage } from '@/components/TierPage';
import { localeAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Prompts',
  description: 'Danh sách Prompts trong LexiHub — điền biến, xem trước và copy 1 chạm cho ChatGPT, Claude, Cursor, SKILL.md.',
  alternates: localeAlternates('/prompts'),
};

export default function PromptsPage() {
  return <TierPage tier="prompt" />;
}
