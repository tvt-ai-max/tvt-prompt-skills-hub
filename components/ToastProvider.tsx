'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';

type Toast = { id: number; message: string };
type ToastFn = (message: string) => void;

const ToastContext = createContext<ToastFn | null>(null);

export function useToast(): ToastFn {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const seq = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => clearTimeout(t));
  }, []);

  const toast = useCallback<ToastFn>((message) => {
    const id = ++seq.current;
    setToasts((list) => [...list.slice(-2), { id, message }]);
    timers.current.set(
      id,
      setTimeout(() => {
        setToasts((list) => list.filter((t) => t.id !== id));
        timers.current.delete(id);
      }, 2400),
    );
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex flex-col items-center gap-2 px-4 sm:right-6 sm:left-auto sm:items-end"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="glass flex animate-toast-in items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm text-ink shadow-xl shadow-black/20"
          >
            <CheckCircle2 className="size-4 shrink-0 text-neon-emerald" aria-hidden />
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
