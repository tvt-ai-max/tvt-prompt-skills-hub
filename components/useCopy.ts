'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { copyText } from '@/lib/clipboard';

/** Tracks which copy action last succeeded so buttons can show a ✓ state. */
export function useCopy(resetMs = 1800) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = useCallback(
    async (id: string, text: string) => {
      const ok = await copyText(text);
      if (!ok) return false;
      setCopied(id);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), resetMs);
      return true;
    },
    [resetMs],
  );

  return { copied, copy };
}
