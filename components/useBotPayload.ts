'use client';

import type { BotPayload } from '@/types/hub';

const cache = new Map<string, Promise<BotPayload>>();

export function fetchBot(id: string): Promise<BotPayload> {
  let pending = cache.get(id);
  if (!pending) {
    pending = fetch(`/data/bots/${encodeURIComponent(id)}`).then((res) => {
      if (!res.ok) throw new Error(`bot ${id}: ${res.status}`);
      return res.json() as Promise<BotPayload>;
    });
    pending.catch(() => cache.delete(id));
    cache.set(id, pending);
  }
  return pending;
}

export function prefetchBot(id: string) {
  void fetchBot(id).catch(() => undefined);
}
