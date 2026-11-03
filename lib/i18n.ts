import vi from '@/locales/vi.json';
import en from '@/locales/en.json';

/** Type-safe bilingual dictionary (vi = source of truth for keys; en must mirror it — see tests). */

export const LOCALES = ['vi', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'vi';
export const LOCALE_STORAGE_KEY = 'tvt-locale';
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export type Messages = typeof vi;
type Leaves<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string ? `${P}${K}` : Leaves<T[K], `${P}${K}.`>;
}[keyof T & string];
export type MessageKey = Leaves<Messages>;

export const DICTIONARIES: Record<Locale, Messages> = { vi, en: en as Messages };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Looks up a dotted key and interpolates {placeholders}. Falls back to vi, then to the key itself. */
export function translate(locale: Locale, key: MessageKey | string, vars?: Record<string, string | number>): string {
  const lookup = (dict: Messages) =>
    key.split('.').reduce<unknown>((node, part) => (node && typeof node === 'object' ? (node as Record<string, unknown>)[part] : undefined), dict);
  let text = lookup(DICTIONARIES[locale]);
  if (typeof text !== 'string') text = lookup(DICTIONARIES[DEFAULT_LOCALE]);
  if (typeof text !== 'string') return key;
  return vars ? (text as string).replace(/\{(\w+)\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m)) : (text as string);
}

/** Flattens a nested dictionary to dotted keys (used by the parity test). */
export function flattenKeys(node: unknown, prefix = ''): string[] {
  if (typeof node === 'string') return [prefix];
  if (!node || typeof node !== 'object') return [];
  return Object.entries(node as Record<string, unknown>).flatMap(([k, v]) => flattenKeys(v, prefix ? `${prefix}.${k}` : k));
}

export const BOT_UA = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|lighthouse|headlesschrome\/[^ ]*\s+\(compatible|perplexity|gptbot|claude|google-inspectiontool/i;

export interface LocaleSignals {
  query?: string | null;
  stored?: string | null;
  cookie?: string | null;
  languages?: readonly string[];
  userAgent?: string;
}

/** Priority: ?lang= → saved choice (localStorage, cookie) → browser language (humans only) → vi. */
export function resolveLocale(s: LocaleSignals): Locale {
  if (isLocale(s.query)) return s.query;
  if (isLocale(s.stored)) return s.stored;
  if (isLocale(s.cookie)) return s.cookie;
  if (s.userAgent && BOT_UA.test(s.userAgent)) return DEFAULT_LOCALE;
  const first = s.languages?.find(Boolean)?.toLowerCase() ?? '';
  if (!first) return DEFAULT_LOCALE;
  return first.startsWith('vi') ? 'vi' : 'en';
}

/**
 * Runs in <head> before first paint. Resolves the locale, sets <html lang data-locale>, and for
 * non-default locales hides the page until React has swapped the strings (no flash of the wrong
 * language). A 3s safety timer always reveals the page if scripts fail.
 */
export const LOCALE_BOOT_SCRIPT = `(function(){try{var d=document.documentElement,L=["vi","en"],ok=function(v){return L.indexOf(v)>-1};var q=null;try{q=new URLSearchParams(location.search).get("lang")}catch(e){}var s=null;try{s=localStorage.getItem(${JSON.stringify(
  LOCALE_STORAGE_KEY,
)})}catch(e){}var m=document.cookie.match(/(?:^|; )${LOCALE_COOKIE}=([^;]*)/),c=m?decodeURIComponent(m[1]):null;var ua=navigator.userAgent||"";var l=ok(q)?q:ok(s)?s:ok(c)?c:(${BOT_UA.toString()}).test(ua)?"vi":((navigator.languages&&navigator.languages[0])||navigator.language||"vi").toLowerCase().indexOf("vi")===0?"vi":"en";d.lang=l;d.setAttribute("data-locale",l);if(l!=="vi"){d.setAttribute("data-i18n-pending","");setTimeout(function(){d.removeAttribute("data-i18n-pending")},3000)}}catch(e){}})();`;
