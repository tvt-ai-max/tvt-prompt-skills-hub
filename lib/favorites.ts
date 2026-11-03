/** Favorites ("Pin to top") persisted in localStorage — pure helpers + a tiny external store. */

export const FAVORITES_KEY = 'tvt-favorites';
export const FAVORITES_EVENT = 'tvt-favorites-change';
const MAX_FAVORITES = 500;

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

export function parseFavorites(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((v): v is string => typeof v === 'string' && v.length > 0))].slice(0, MAX_FAVORITES);
  } catch {
    return [];
  }
}

/** Newest favorite first. */
export function toggleFavorite(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [id, ...list].slice(0, MAX_FAVORITES);
}

export function readFavorites(storage: StorageLike | undefined): string[] {
  try {
    return parseFavorites(storage?.getItem(FAVORITES_KEY) ?? null);
  } catch {
    return [];
  }
}

export function writeFavorites(storage: StorageLike | undefined, list: string[]): boolean {
  try {
    storage?.setItem(FAVORITES_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

/** Stable sort that pins favorites to the top, preserving the incoming order otherwise. */
export function pinFavorites<T extends { id: string }>(items: T[], favorites: string[]): T[] {
  if (!favorites.length) return items;
  const set = new Set(favorites);
  return [...items.filter((i) => set.has(i.id)), ...items.filter((i) => !set.has(i.id))];
}
