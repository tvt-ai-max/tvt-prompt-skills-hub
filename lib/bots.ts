import 'server-only';
import type { BotGlyphs } from '@/components/WorkflowCanvas';
import { getAllBots } from '@/lib/content';

/** Minimal bot lookup (name + avatar) passed to client components. */
export function getBotGlyphs(): BotGlyphs {
  return Object.fromEntries(getAllBots().map((b) => [b.id, { name: b.name, avatar: b.avatar }]));
}
