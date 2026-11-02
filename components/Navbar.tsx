'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Search, Star, X } from 'lucide-react';
import { useHub } from '@/components/HubProvider';
import { GithubMark, TIER_ICONS, TIER_STYLES } from '@/components/Badges';
import { useDialog } from '@/components/useDialog';
import { REPO_URL } from '@/lib/site';

const LINKS = [
  { href: '/prompts', label: 'Prompts', tier: 'prompt' },
  { href: '/skills', label: 'Skills', tier: 'skill' },
  { href: '/boosts', label: 'Boosts', tier: 'boost' },
] as const;

/** `className` must include a display utility (e.g. `flex`, `hidden md:inline-flex`). */
export function SearchTrigger({ className = 'inline-flex' }: { className?: string }) {
  const { openPalette } = useHub();
  const [mac, setMac] = useState(true);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);
  return (
    <button
      type="button"
      onClick={openPalette}
      className={`focus-ring group h-10 items-center gap-2 rounded-lg border border-line bg-surface/80 px-3 text-sm text-muted transition hover:border-neon-cyan/40 hover:text-ink ${className}`}
      aria-label="Mở command palette tìm kiếm"
    >
      <Search className="size-4 text-neon-cyan" aria-hidden />
      <span className="flex-1 text-left">Tìm kiếm…</span>
      <span className="hidden items-center gap-0.5 sm:inline-flex">
        <kbd className="kbd">{mac ? '⌘' : 'Ctrl'}</kbd>
        <kbd className="kbd">K</kbd>
      </span>
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { openPalette } = useHub();
  const [drawer, setDrawer] = useState(false);
  const drawerRef = useDialog(drawer, () => setDrawer(false));

  useEffect(() => setDrawer(false), [pathname]);

  return (
    <header className="glass sticky top-0 z-40 border-b border-line">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6" aria-label="Điều hướng chính">
        <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-lg">
          <span className="grid size-9 place-items-center rounded-xl border border-line-strong bg-gradient-to-br from-neon-cyan/25 via-neon-emerald/15 to-neon-violet/25 font-mono text-sm font-bold text-ink">
            T
          </span>
          <span className="leading-tight">
            <span className="text-gradient block text-sm font-bold tracking-tight sm:text-base">TVT Intelligence Hub</span>
            <span className="hidden text-[11px] text-faint sm:block">Prompt · Skill · Boost</span>
          </span>
        </Link>

        <ul className="ml-4 hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const Icon = TIER_ICONS[link.tier];
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active ? 'bg-white/[0.06] text-ink' : 'text-muted hover:bg-white/[0.04] hover:text-ink'
                  }`}
                >
                  <Icon className={`size-4 ${TIER_STYLES[link.tier].text}`} aria-hidden />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <SearchTrigger className="hidden w-56 md:inline-flex" />
          <button
            type="button"
            onClick={openPalette}
            aria-label="Tìm kiếm"
            className="focus-ring grid size-10 place-items-center rounded-lg border border-line text-muted transition hover:text-ink md:hidden"
          >
            <Search className="size-4" aria-hidden />
          </button>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="focus-ring hidden h-10 items-center gap-2 rounded-lg border border-line px-3 text-sm text-muted transition hover:border-line-strong hover:text-ink sm:inline-flex"
          >
            <GithubMark className="size-4" />
            <Star className="size-3.5 text-neon-amber" aria-hidden />
            <span>Star</span>
          </a>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Mở menu"
            aria-expanded={drawer}
            className="focus-ring grid size-10 place-items-center rounded-lg border border-line text-muted transition hover:text-ink md:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </nav>

      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden" role="presentation">
          <div className="absolute inset-0 animate-fade-in bg-space-deep/80 backdrop-blur-sm" onClick={() => setDrawer(false)} aria-hidden />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-[82%] max-w-xs animate-slide-in flex-col gap-2 border-l border-line bg-space p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-gradient text-sm font-bold">TVT Intelligence Hub</span>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Đóng menu"
                className="focus-ring rounded-md p-2 text-muted hover:text-ink"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setDrawer(false);
                openPalette();
              }}
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted"
            >
              <Search className="size-4 text-neon-cyan" aria-hidden /> Tìm kiếm…
            </button>
            <Link href="/" className="focus-ring rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-white/5">
              Trang chủ
            </Link>
            {LINKS.map((link) => {
              const Icon = TIER_ICONS[link.tier];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-white/5"
                >
                  <Icon className={`size-4 ${TIER_STYLES[link.tier].text}`} aria-hidden />
                  {link.label}
                </Link>
              );
            })}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-auto inline-flex items-center gap-2 rounded-lg border border-line px-3 py-3 text-sm text-muted"
            >
              <GithubMark className="size-4" /> GitHub repository
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
