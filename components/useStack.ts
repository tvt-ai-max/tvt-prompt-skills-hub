'use client';

import { useCallback, useSyncExternalStore } from 'react';
import {
  STACK_EVENT,
  STACK_KEY,
  SIDEBAR_EVENT,
  SIDEBAR_COLLAPSE_KEY,
  readStack,
  writeStack,
  toggleStackItem,
  readSidebarCollapsed,
  writeSidebarCollapsed,
} from '@/lib/stack';

const EMPTY_STACK: string[] = [];
let stackSnapshot: string[] | null = null;

function getStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function read(): string[] {
  if (stackSnapshot === null) stackSnapshot = readStack(getStorage());
  return stackSnapshot;
}

function subscribe(onChange: () => void) {
  const handler = (event: Event) => {
    if (event instanceof StorageEvent && event.key !== STACK_KEY) return;
    stackSnapshot = null;
    onChange();
  };
  window.addEventListener('storage', handler);
  window.addEventListener(STACK_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(STACK_EVENT, handler);
  };
}

/** Synchronized stack state for "My Stack / My Components" builder. */
export function useStack() {
  const stack = useSyncExternalStore(subscribe, read, () => EMPTY_STACK);

  const toggle = useCallback((id: string) => {
    const next = toggleStackItem(read(), id);
    writeStack(getStorage(), next);
    stackSnapshot = next;
    window.dispatchEvent(new Event(STACK_EVENT));
    return next.includes(id);
  }, []);

  const clear = useCallback(() => {
    writeStack(getStorage(), []);
    stackSnapshot = [];
    window.dispatchEvent(new Event(STACK_EVENT));
  }, []);

  return {
    stack,
    toggle,
    clear,
    isInStack: (id: string) => stack.includes(id),
    stackCount: stack.length,
  };
}

let sidebarSnapshot: boolean | null = null;

function readSidebar(): boolean {
  if (sidebarSnapshot === null) sidebarSnapshot = readSidebarCollapsed(getStorage());
  return sidebarSnapshot;
}

function subscribeSidebar(onChange: () => void) {
  const handler = (event: Event) => {
    if (event instanceof StorageEvent && event.key !== SIDEBAR_COLLAPSE_KEY) return;
    sidebarSnapshot = null;
    onChange();
  };
  window.addEventListener('storage', handler);
  window.addEventListener(SIDEBAR_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(SIDEBAR_EVENT, handler);
  };
}

/** Synchronized sidebar collapsed state across tabs and components. */
export function useSidebar() {
  const collapsed = useSyncExternalStore(subscribeSidebar, readSidebar, () => false);

  const toggle = useCallback(() => {
    const next = !readSidebar();
    writeSidebarCollapsed(getStorage(), next);
    sidebarSnapshot = next;
    window.dispatchEvent(new Event(SIDEBAR_EVENT));
    return next;
  }, []);

  return { collapsed, toggle };
}
