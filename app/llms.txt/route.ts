import { getAllBots, getAllItems, getAllWorkflows } from '@/lib/content';
import { buildLlmsTxt } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(getAllItems(), SITE_URL, { workflows: getAllWorkflows(), bots: getAllBots() }), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
