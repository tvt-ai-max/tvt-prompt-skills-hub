'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { FAVORITES_EVENT, FAVORITES_KEY, readFavorites, toggleFavorite, writeFavorites } from '@/lib/favorites';

const EMPTY: string[] = [];
let snapshot: string[] | null = null;

function getStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function read(): string[] {
  if (snapshot === null) snapshot = readFavorites(getStorage());
  return snapshot;
}

function subscribe(onChange: () => void) {
  const handler = (event: Event) => {
    if (event instanceof StorageEvent && event.key !== FAVORITES_KEY) return;
    snapshot = null;
    onChange();
  };
  window.addEventListener('storage', handler);
  window.addEventListener(FAVORITES_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(FAVORITES_EVENT, handler);
  };
}

/** Favorites synced across components and browser tabs. Server snapshot is empty (no flash of wrong state on SSR). */
export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = useCallback((id: string) => {
    const next = toggleFavorite(read(), id);
    writeFavorites(getStorage(), next);
    snapshot = next;
    window.dispatchEvent(new Event(FAVORITES_EVENT));
    return next.includes(id);
  }, []);
  return { favorites, toggle, isFavorite: (id: string) => favorites.includes(id) };
}
