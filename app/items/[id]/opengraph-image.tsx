import { getAllItems, getItemById } from '@/lib/content';
import { OG_SIZE, renderOgCard } from '@/lib/og';
import { categoryLabel } from '@/lib/labels';
import { itemCategory } from '@/lib/summary';

export const alt = 'TVT Intelligence Hub item preview';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllItems().map((item) => ({ id: item.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) return renderOgCard({ tier: 'hub', eyebrow: 'TVT Intelligence Hub', title: 'Không tìm thấy', description: '' });
  return renderOgCard({
    tier: item.tier,
    eyebrow: item.tier === 'boost' ? item.slashCommand : categoryLabel(itemCategory(item)),
    title: item.title,
    description: item.description,
    chips: item.tags,
  });
}
