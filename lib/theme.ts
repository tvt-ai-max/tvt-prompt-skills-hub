/** Theme engine primitives — pure, shared by the inline boot script, the provider and tests. */

export const THEME_PREFERENCES = ['dark', 'light', 'system'] as const;
export type ThemePreference = (typeof THEME_PREFERENCES)[number];
export type ResolvedTheme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'tvt-theme';
/** Brand default: Dark Cyber Navy. */
export const DEFAULT_PREFERENCE: ThemePreference = 'dark';

export const THEME_LABELS: Record<ThemePreference, string> = {
  dark: 'Tối',
  light: 'Sáng',
  system: 'Theo hệ thống',
};

export function parsePreference(value: unknown): ThemePreference {
  return typeof value === 'string' && (THEME_PREFERENCES as readonly string[]).includes(value)
    ? (value as ThemePreference)
    : DEFAULT_PREFERENCE;
}

export function resolveTheme(preference: ThemePreference, systemPrefersLight: boolean): ResolvedTheme {
  if (preference === 'system') return systemPrefersLight ? 'light' : 'dark';
  return preference;
}

/** Toggle button order: Dark → Light → System → Dark. */
export function nextPreference(preference: ThemePreference): ThemePreference {
  const i = THEME_PREFERENCES.indexOf(preference);
  return THEME_PREFERENCES[(i + 1) % THEME_PREFERENCES.length];
}

/** Shift+D: flip whatever is currently on screen to the opposite explicit theme. */
export function flipPreference(resolved: ResolvedTheme): ThemePreference {
  return resolved === 'dark' ? 'light' : 'dark';
}

/**
 * Runs synchronously in <head> before first paint (zero-FOUC). Must stay dependency-free ES5.
 * Sets data-theme (resolved), data-theme-pref (stored choice) and color-scheme on <html>.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var d=document.documentElement,k=${JSON.stringify(
  THEME_STORAGE_KEY,
)},p=null;try{p=localStorage.getItem(k)}catch(e){}if(p!=="dark"&&p!=="light"&&p!=="system")p=${JSON.stringify(
  DEFAULT_PREFERENCE,
)};var t=p==="system"?(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):p;d.setAttribute("data-theme",t);d.setAttribute("data-theme-pref",p);d.style.colorScheme=t}catch(e){}})();`;
