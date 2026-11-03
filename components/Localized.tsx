'use client';

import type { ReactNode } from 'react';
import { useTranslation } from '@/components/I18nProvider';

/** Long-form bilingual content: server-rendered in Vietnamese (SEO default), swapped for English visitors. */
export function Localized({ vi, en }: { vi: ReactNode; en: ReactNode }) {
  const { locale } = useTranslation();
  return <>{locale === 'en' ? en : vi}</>;
}
