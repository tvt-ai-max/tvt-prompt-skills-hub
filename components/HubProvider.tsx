'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { HubItem } from '@/types/hub';
import { CommandPalette } from '@/components/CommandPalette';
import { VariableModal } from '@/components/VariableModal';

interface HubContextValue {
  items: HubItem[];
  openItem: (id: string) => void;
  openPalette: () => void;
}

const HubContext = createContext<HubContextValue | null>(null);

export function useHub(): HubContextValue {
  const ctx = useContext(HubContext);
  if (!ctx) throw new Error('useHub must be used inside <HubProvider>');
  return ctx;
}

export function HubProvider({ items, children }: { items: HubItem[]; children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const openItem = useCallback((id: string) => {
    setPaletteOpen(false);
    setActiveId(id);
  }, []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);

  // Global Cmd+K / Ctrl+K shortcut (and "/" when not typing).
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = !!target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      } else if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeItem = useMemo(() => items.find((i) => i.id === activeId) ?? null, [items, activeId]);
  const value = useMemo(() => ({ items, openItem, openPalette }), [items, openItem, openPalette]);

  return (
    <HubContext.Provider value={value}>
      {children}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} items={items} onSelect={openItem} />
      <VariableModal item={activeItem} onClose={() => setActiveId(null)} />
    </HubContext.Provider>
  );
}
