'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUp, CornerDownLeft, Search } from 'lucide-react';
import type { HubItemSummary, Tier } from '@/types/hub';
import { createSearchIndex, searchIds } from '@/lib/search';
import { prefetchItem } from '@/components/useItem';
import { categoryLabel, TIER_META } from '@/lib/labels';
import { TIER_ICONS, TIER_STYLES } from '@/components/Badges';
import { useDialog } from '@/components/useDialog';

interface Props {
  open: boolean;
  onClose: () => void;
  items: HubItemSummary[];
  onSelect: (id: string) => void;
}

type Row = { kind: 'item'; item: HubItemSummary } | { kind: 'nav'; tier: Tier; href: string };

const NAV_ROWS: Row[] = [
  { kind: 'nav', tier: 'prompt', href: '/prompts' },
  { kind: 'nav', tier: 'skill', href: '/skills' },
  { kind: 'nav', tier: 'boost', href: '/boosts' },
];

export function CommandPalette({ open, onClose, items, onSelect }: Props) {
  const router = useRouter();
  const panelRef = useDialog(open, onClose);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const index = useMemo(() => createSearchIndex(items), [items]);
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);

  const rows: Row[] = useMemo(() => {
    const ids = searchIds(index, items, query, query.trim() ? 12 : 8);
    const itemRows: Row[] = ids.flatMap((id) => {
      const item = byId.get(id);
      return item ? [{ kind: 'item' as const, item }] : [];
    });
    if (query.trim()) return itemRows;
    return [...NAV_ROWS, ...itemRows];
  }, [index, items, byId, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    const row = rows[active];
    if (open && row?.kind === 'item') prefetchItem(row.item.id);
  }, [open, rows, active]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const choose = (row: Row | undefined) => {
    if (!row) return;
    if (row.kind === 'item') onSelect(row.item.id);
    else {
      onClose();
      router.push(row.href);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => (rows.length ? (i + 1) % rows.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => (rows.length ? (i - 1 + rows.length) % rows.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      choose(rows[active]);
    }
  };

  const activeId = rows[active] ? `cmdk-row-${active}` : undefined;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" role="presentation">
      <div className="absolute inset-0 animate-fade-in bg-scrim backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette — tìm kiếm"
        className="glass relative w-full max-w-2xl animate-pop-in overflow-hidden rounded-2xl border border-line-strong shadow-2xl shadow-black/50 light:shadow-slate-900/15"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-5 shrink-0 text-neon-cyan" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Tìm prompt, skill, boost, tag, /slash…"
            className="h-14 w-full bg-transparent text-base text-ink placeholder:text-faint outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        <ul id="cmdk-list" ref={listRef} role="listbox" className="scrollbar-thin max-h-[55vh] overflow-y-auto p-2">
          {rows.length === 0 && (
            <li className="px-3 py-10 text-center text-sm text-muted">
              Không tìm thấy kết quả cho “{query}”. Thử từ khóa khác như <span className="text-ink">SEO</span>,{' '}
              <span className="text-ink">Meta Ads</span> hoặc <span className="text-ink">/boost</span>.
            </li>
          )}
          {rows.map((row, i) => {
            const selected = i === active;
            const base = `flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
              selected ? 'bg-overlay/[0.07]' : 'hover:bg-overlay/[0.04]'
            }`;
            if (row.kind === 'nav') {
              const Icon = TIER_ICONS[row.tier];
              return (
                <li
                  key={`nav-${row.tier}`}
                  id={`cmdk-row-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={selected}
                  className={base}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(row)}
                >
                  <Icon className={`size-4 ${TIER_STYLES[row.tier].text}`} aria-hidden />
                  <span className="flex-1 text-sm text-ink">Duyệt tất cả {TIER_META[row.tier].plural}</span>
                  <ArrowRight className="size-4 text-faint" aria-hidden />
                </li>
              );
            }
            const { item } = row;
            const Icon = TIER_ICONS[item.tier];
            return (
              <li
                key={item.id}
                id={`cmdk-row-${i}`}
                data-index={i}
                role="option"
                aria-selected={selected}
                className={base}
                onMouseMove={() => setActive(i)}
                onClick={() => choose(row)}
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface ${TIER_STYLES[item.tier].text}`}>
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{item.title}</span>
                  <span className="block truncate text-xs text-muted">
                    {item.slashCommand ? <span className="font-mono text-violet-300">{item.slashCommand} · </span> : null}
                    {categoryLabel(item.category)} · {item.tags.slice(0, 3).join(', ')}
                  </span>
                </span>
                {selected && <CornerDownLeft className="size-4 shrink-0 text-faint" aria-hidden />}
              </li>
            );
          })}
        </ul>

        <footer className="flex items-center justify-between gap-3 border-t border-line px-4 py-2 text-[11px] text-faint">
          <span className="flex items-center gap-1.5">
            <kbd className="kbd"><ArrowUp className="size-3" aria-hidden /></kbd>
            <kbd className="kbd"><ArrowDown className="size-3" aria-hidden /></kbd>
            di chuyển
            <kbd className="kbd ml-2"><CornerDownLeft className="size-3" aria-hidden /></kbd>
            mở
          </span>
          <span>{items.length} mục · fuzzy search</span>
        </footer>
      </div>
    </div>
  );
}
