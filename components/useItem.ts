'use client';

import { useEffect, useState } from 'react';
import type { HubItem } from '@/types/hub';

/** In-memory cache shared by the drawer, quick copy and hover prefetch. */
const cache = new Map<string, Promise<HubItem>>();

export function fetchItem(id: string): Promise<HubItem> {
  let pending = cache.get(id);
  if (!pending) {
    pending = fetch(`/data/items/${encodeURIComponent(id)}`).then((res) => {
      if (!res.ok) throw new Error(`Không tải được "${id}" (${res.status})`);
      return res.json() as Promise<HubItem>;
    });
    pending.catch(() => cache.delete(id));
    cache.set(id, pending);
  }
  return pending;
}

export function prefetchItem(id: string) {
  void fetchItem(id).catch(() => undefined);
}

export function useItem(id: string | null) {
  const [state, setState] = useState<{ id: string; item?: HubItem; error?: string } | null>(null);
  useEffect(() => {
    if (!id) return;
    let alive = true;
    fetchItem(id).then(
      (item) => alive && setState({ id, item }),
      (error: Error) => alive && setState({ id, error: error.message }),
    );
    return () => {
      alive = false;
    };
  }, [id]);
  const current = state && state.id === id ? state : null;
  return { item: current?.item ?? null, error: current?.error ?? null, loading: !!id && !current };
}
