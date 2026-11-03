import { getAllItems, getItemById } from '@/lib/content';

/** Static JSON for one item — fetched on demand by the variable drawer & quick copy. */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllItems().map((item) => ({ id: item.id }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) return Response.json({ error: 'not_found' }, { status: 404 });
  return Response.json(item, { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400' } });
}
