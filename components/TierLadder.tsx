import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SECTIONS } from '@/components/Badges';
import { T } from '@/components/I18nProvider';

export function TierLadder() {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <h2 className="sr-only">
        <T k="ladder.aria" />
      </h2>
      {SECTIONS.map(({ key, href, Icon, text }, i) => (
        <Link
          key={key}
          href={href}
          className="focus-ring relative rounded-2xl border border-line bg-gradient-to-b from-surface/70 to-transparent p-5 transition hover:border-line-strong"
        >
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-wide uppercase ${text}`}>
            <Icon className="size-4" aria-hidden /> <T k={`ladder.${key}Tier`} />
          </div>
          <h3 className="mt-2 font-semibold text-ink">
            <T k={`ladder.${key}Title`} />
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            <T k={`ladder.${key}Body`} />
          </p>
          {i < SECTIONS.length - 1 && (
            <ChevronRight className="absolute top-1/2 -right-3 hidden size-5 -translate-y-1/2 text-faint xl:block" aria-hidden />
          )}
        </Link>
      ))}
    </section>
  );
}
