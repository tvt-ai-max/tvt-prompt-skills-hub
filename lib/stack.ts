/**
 * Stack state & helper functions for LexiHub "My Stack / My Components" builder.
 * Pure logic — safe to test and SSR.
 */

export const STACK_KEY = 'lexihub_stack_items';
export const STACK_EVENT = 'lexihub:stack';
export const SIDEBAR_COLLAPSE_KEY = 'lexihub_sidebar_collapsed';
export const SIDEBAR_EVENT = 'lexihub:sidebar';

export function readStack(storage?: Storage): string[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(STACK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string' && Boolean(id)) : [];
  } catch {
    return [];
  }
}

export function writeStack(storage: Storage | undefined, items: string[]): void {
  if (!storage) return;
  try {
    storage.setItem(STACK_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded or private mode
  }
}

export function toggleStackItem(current: string[], id: string): string[] {
  return current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
}

export function addToStack(current: string[], id: string): string[] {
  return current.includes(id) ? current : [...current, id];
}

export function removeFromStack(current: string[], id: string): string[] {
  return current.filter((x) => x !== id);
}

export function readSidebarCollapsed(storage?: Storage): boolean {
  if (!storage) return false;
  try {
    return storage.getItem(SIDEBAR_COLLAPSE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function writeSidebarCollapsed(storage: Storage | undefined, collapsed: boolean): void {
  if (!storage) return;
  try {
    storage.setItem(SIDEBAR_COLLAPSE_KEY, collapsed ? 'true' : 'false');
  } catch {
    // ignore
  }
}
