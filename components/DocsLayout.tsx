import Link from 'next/link';
import type { ReactNode } from 'react';
import { BookOpen, Plug, Server } from 'lucide-react';

const LINKS = [
  { href: '/docs/api', label: 'API & MCP', Icon: Plug },
  { href: '/docs/self-hosting', label: 'Self-hosting', Icon: Server },
  { href: '/guide', label: 'Prompt Guide 2026', Icon: BookOpen },
];

/** Shared shell for documentation pages: sticky side nav on desktop, chips on mobile. */
export function DocsLayout({ current, children }: { current: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 pt-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <nav aria-label="Docs" className="lg:sticky lg:top-24 lg:h-fit">
        <ul className="scrollbar-thin -mx-1 flex gap-1 overflow-x-auto px-1 lg:flex-col">
          {LINKS.map(({ href, label, Icon }) => {
            const active = href === current;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`focus-ring inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition ${
                    active ? 'bg-overlay/[0.06] text-ink' : 'text-muted hover:bg-overlay/[0.04] hover:text-ink'
                  }`}
                >
                  <Icon className="size-4 text-neon-cyan" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <article className="prose-docs min-w-0 max-w-3xl">{children}</article>
    </div>
  );
}
