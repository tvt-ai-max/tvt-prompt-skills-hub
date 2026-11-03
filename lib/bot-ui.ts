import type { BotDepartment } from '@/types/hub';
import type { MessageKey } from '@/lib/i18n';

/** Shared (server + client) presentation constants for bots. Must not live in a 'use client' module. */
export const DEPT_KEYS: Record<BotDepartment, MessageKey> = {
  command: 'bots.deptCommand',
  'content-video': 'bots.deptContent',
  'marketing-seo': 'bots.deptMarketing',
  'crm-automation': 'bots.deptCrm',
};

export const DEPT_ACCENT: Record<BotDepartment, string> = {
  command: 'text-amber-500 border-neon-amber/35 bg-neon-amber/10',
  'content-video': 'text-cyan-300 border-neon-cyan/30 bg-neon-cyan/10',
  'marketing-seo': 'text-emerald-300 border-neon-emerald/30 bg-neon-emerald/10',
  'crm-automation': 'text-violet-300 border-neon-violet/35 bg-neon-violet/10',
};
