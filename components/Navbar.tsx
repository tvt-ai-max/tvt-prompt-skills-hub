'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GitPullRequest, Menu, Rocket, Search, Star, X } from 'lucide-react';
import { useHub } from '@/components/HubProvider';
import { GithubMark, SECTIONS } from '@/components/Badges';
import { useDialog } from '@/components/useDialog';
import { REPO_URL } from '@/lib/site';
import { ThemeSegmented, ThemeToggle } from '@/components/ThemeToggle';


/** `className` must include display + height utilities (e.g. `flex h-12`, `hidden h-10 lg:inline-flex`). */
export function SearchTrigger({ className = 'inline-flex h-10' }: { className?: string }) {
  const { openPalette } = useHub();
  const [mac, setMac] = useState(true);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);
  return (
    <button
      type="button"
      onClick={openPalette}
      className={`focus-ring group shrink-0 items-center gap-2 rounded-lg border border-line bg-surface/80 px-3 text-sm text-muted transition hover:border-neon-cyan/40 hover:text-ink ${className}`}
      aria-label="Mở command palette tìm kiếm"
    >
      <Search className="size-4 shrink-0 text-neon-cyan" aria-hidden />
      <span className="min-w-0 flex-1 truncate text-left whitespace-nowrap">Tìm kiếm…</span>
      <span className="hidden shrink-0 items-center gap-0.5 sm:inline-flex">
        <kbd className="kbd">{mac ? '⌘' : 'Ctrl'}</kbd>
        <kbd className="kbd">K</kbd>
      </span>
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { openPalette, openContribute } = useHub();
  const [drawer, setDrawer] = useState(false);
  const drawerRef = useDialog(drawer, () => setDrawer(false));

  useEffect(() => setDrawer(false), [pathname]);

  return (
    <header className="glass sticky top-0 z-40 border-b border-line">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6" aria-label="Điều hướng chính">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2.5 rounded-lg whitespace-nowrap">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line-strong bg-gradient-to-br from-neon-cyan/25 via-neon-emerald/15 to-neon-violet/25 font-mono text-sm font-bold text-ink">
            T
          </span>
          <span className="leading-tight">
            <span className="text-gradient block text-sm font-bold tracking-tight sm:text-base">TVT Intelligence Hub</span>
            <span className="hidden text-[11px] text-faint xl:block">Prompt · Skill · Bot · Workflow</span>
          </span>
        </Link>

        <ul className="hidden shrink-0 items-center gap-0.5 lg:flex xl:ml-2">
          {SECTIONS.map((link) => {
            const Icon = link.Icon;
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`focus-ring inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium whitespace-nowrap transition ${
                    active ? 'bg-overlay/[0.06] text-ink' : 'text-muted hover:bg-overlay/[0.04] hover:text-ink'
                  }`}
                >
                  <Icon className={`size-4 ${link.text}`} aria-hidden />
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="hidden xl:block">
            <Link
              href="/build-in-public"
              title="Build in Public"
              aria-current={pathname === '/build-in-public' ? 'page' : undefined}
              className={`focus-ring inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium whitespace-nowrap transition ${
                pathname === '/build-in-public' ? 'bg-overlay/[0.06] text-ink' : 'text-muted hover:bg-overlay/[0.04] hover:text-ink'
              }`}
            >
              <Rocket className="size-4 text-amber-500" aria-hidden />
              <span className="hidden 2xl:inline">Build in Public</span>
              <span className="2xl:hidden">Story</span>
            </Link>
          </li>
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <SearchTrigger className="hidden h-10 w-52 xl:inline-flex" />
          <button
            type="button"
            onClick={openPalette}
            aria-label="Tìm kiếm"
            className="focus-ring grid size-10 shrink-0 place-items-center rounded-lg border border-line text-muted transition hover:text-ink xl:hidden"
          >
            <Search className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={openContribute}
            aria-label="Đóng góp"
            title="Đóng góp Prompt / Skill / Boost"
            className="focus-ring hidden h-10 shrink-0 items-center gap-2 rounded-lg border border-neon-emerald/40 bg-neon-emerald/10 px-3 text-sm font-medium whitespace-nowrap text-emerald-200 transition hover:bg-neon-emerald/20 lg:inline-flex"
          >
            <GitPullRequest className="size-4" aria-hidden />
            <span className="hidden xl:inline">Đóng góp</span>
          </button>
          <ThemeToggle />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Star trên GitHub"
            className="focus-ring hidden h-10 shrink-0 items-center gap-2 rounded-lg border border-line px-3 text-sm whitespace-nowrap text-muted transition hover:border-line-strong hover:text-ink sm:inline-flex"
          >
            <GithubMark className="size-4" />
            <Star className="size-3.5 text-neon-amber" aria-hidden />
            <span className="hidden 2xl:inline">Star</span>
          </a>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Mở menu"
            aria-expanded={drawer}
            className="focus-ring grid size-10 shrink-0 place-items-center rounded-lg border border-line text-muted transition hover:text-ink lg:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </nav>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <div className="absolute inset-0 animate-fade-in bg-scrim backdrop-blur-sm" onClick={() => setDrawer(false)} aria-hidden />
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
            <Link href="/" className="focus-ring rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-overlay/5">
              Trang chủ
            </Link>
            {SECTIONS.map((link) => {
              const Icon = link.Icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-overlay/5"
                >
                  <Icon className={`size-4 ${link.text}`} aria-hidden />
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/build-in-public"
              className="focus-ring inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-overlay/5"
            >
              <Rocket className="size-4 text-amber-500" aria-hidden />
              Build in Public
            </Link>
            <button
              type="button"
              onClick={() => {
                setDrawer(false);
                openContribute();
              }}
              className="focus-ring inline-flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-medium text-ink hover:bg-overlay/5"
            >
              <GitPullRequest className="size-4 text-emerald-300" aria-hidden />
              Đóng góp tài nguyên
            </button>
            <div className="mt-auto space-y-2">
              <p className="px-1 text-xs font-semibold tracking-wide text-faint uppercase">Giao diện · Shift + D</p>
              <ThemeSegmented />
            </div>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-line px-3 py-3 text-sm text-muted"
            >
              <GithubMark className="size-4" /> GitHub repository
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
