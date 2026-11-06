import { GA_MEASUREMENT_ID } from './site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

export function trackCopy(itemId: string, title?: string, tier?: string) {
  trackEvent('copy_prompt', {
    item_id: itemId,
    item_name: title,
    item_tier: tier,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackDownload(filename: string, tier?: string) {
  trackEvent('download_asset', {
    file_name: filename,
    item_tier: tier,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackStackAdd(itemId: string, title?: string) {
  trackEvent('stack_add', {
    item_id: itemId,
    item_name: title,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackStackExport(format: string, count: number) {
  trackEvent('stack_export', {
    export_format: format,
    item_count: count,
    send_to: GA_MEASUREMENT_ID,
  });
}
