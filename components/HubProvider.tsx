'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { HubItemSummary, NavEntry } from '@/types/hub';
import { CommandPalette } from '@/components/CommandPalette';
import { VariableModal } from '@/components/VariableModal';
import { ContributeModal } from '@/components/ContributeModal';
import { ToastProvider } from '@/components/ToastProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { I18nProvider } from '@/components/I18nProvider';

interface HubContextValue {
  items: HubItemSummary[];
  openItem: (id: string) => void;
  openPalette: () => void;
  openContribute: () => void;
}

const HubContext = createContext<HubContextValue | null>(null);

export function useHub(): HubContextValue {
  const ctx = useContext(HubContext);
  if (!ctx) throw new Error('useHub must be used inside <HubProvider>');
  return ctx;
}

function HubState({ items, entries, children }: { items: HubItemSummary[]; entries: NavEntry[]; children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [contributeOpen, setContributeOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const openItem = useCallback((id: string) => {
    setPaletteOpen(false);
    setActiveId(id);
  }, []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const openContribute = useCallback(() => setContributeOpen(true), []);

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

  const activeSummary = useMemo(() => items.find((i) => i.id === activeId) ?? null, [items, activeId]);
  const value = useMemo(() => ({ items, openItem, openPalette, openContribute }), [items, openItem, openPalette, openContribute]);

  return (
    <HubContext.Provider value={value}>
      {children}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} items={items} entries={entries} onSelect={openItem} />
      <VariableModal summary={activeSummary} onClose={() => setActiveId(null)} />
      <ContributeModal open={contributeOpen} onClose={() => setContributeOpen(false)} />
    </HubContext.Provider>
  );
}

export function HubProvider({ items, entries = [], children }: { items: HubItemSummary[]; entries?: NavEntry[]; children: ReactNode }) {
  return (
    <I18nProvider>
    <ToastProvider>
      <ThemeProvider>
        <HubState items={items} entries={entries}>
          {children}
        </HubState>
      </ThemeProvider>
    </ToastProvider>
    </I18nProvider>
  );
}
