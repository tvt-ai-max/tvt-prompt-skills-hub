'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  flipPreference,
  parsePreference,
  resolveTheme,
  THEME_LABELS,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from '@/lib/theme';
import { useToast } from '@/components/ToastProvider';

interface ThemeContextValue {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

const LIGHT_QUERY = '(prefers-color-scheme: light)';

function applyTheme(preference: ThemePreference, resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', resolved);
  root.setAttribute('data-theme-pref', preference);
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  // Server renders the brand default; the inline boot script already painted the right theme,
  // so we sync React state from the DOM after mount (no visual change → no flash).
  const [preference, setPreferenceState] = useState<ThemePreference>('dark');
  const [systemLight, setSystemLight] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    setPreferenceState(parsePreference(document.documentElement.getAttribute('data-theme-pref')));
    const media = window.matchMedia(LIGHT_QUERY);
    setSystemLight(media.matches);
    const onChange = (event: MediaQueryListEvent) => setSystemLight(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const resolved = resolveTheme(preference, systemLight);

  useEffect(() => {
    // Until the stored preference is read, the DOM (set by the boot script) is the source of truth.
    if (ready) applyTheme(preference, resolved);
  }, [ready, preference, resolved]);

  const setPreference = useCallback(
    (next: ThemePreference) => {
      setPreferenceState(next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // storage unavailable (private mode) — theme still applies for this session
      }
      toast(`Giao diện: ${THEME_LABELS[next]}`);
    },
    [toast],
  );

  // Shift + D → flip to the opposite theme instantly.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!event.shiftKey || event.metaKey || event.ctrlKey || event.altKey || event.key.toLowerCase() !== 'd') return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return;
      event.preventDefault();
      setPreference(flipPreference(resolved));
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [resolved, setPreference]);

  const value = useMemo(() => ({ preference, resolved, setPreference }), [preference, resolved, setPreference]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
