'use client';

import { useState } from 'react';
import { Layers } from 'lucide-react';
import { useStack } from '@/components/useStack';
import { StackModal } from '@/components/StackModal';

export function StackNavButton() {
  const { stackCount } = useStack();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Mở Bộ Ghép Giải Pháp"
        title="Bộ Ghép Giải Pháp (My Stack)"
        className="focus-ring relative grid size-10 shrink-0 place-items-center rounded-lg border border-line text-muted transition hover:text-neon-cyan hover:border-neon-cyan/40"
      >
        <Layers className="size-4" />
        {stackCount > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-neon-cyan text-[10px] font-bold text-black">
            {stackCount}
          </span>
        )}
      </button>

      <StackModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
