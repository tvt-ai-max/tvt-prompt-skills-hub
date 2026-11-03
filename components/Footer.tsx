import Link from 'next/link';
import { GithubMark } from '@/components/Badges';
import { T } from '@/components/I18nProvider';
import { REPO_URL } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-faint lg:flex-row lg:items-center lg:justify-between sm:px-6">
        <p>
          <T k="footer.madeBy" />{' '}
          <a href="https://tvtagency.com" className="text-muted hover:text-ink" target="_blank" rel="noreferrer">
            TVT Agency
          </a>{' '}
          &amp;{' '}
          <a href="https://toilatung.com" className="text-muted hover:text-ink" target="_blank" rel="noreferrer">
            toilatung.com
          </a>
          . <T k="footer.license" />
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/docs/api" className="text-muted hover:text-ink">
            <T k="nav.docs" />
          </Link>
          <Link href="/docs/self-hosting" className="text-muted hover:text-ink">
            <T k="footer.selfHosting" />
          </Link>
          <Link href="/guide" className="text-muted hover:text-ink">
            <T k="nav.guide" />
          </Link>
          <Link href="/build-in-public" className="text-muted hover:text-ink">
            <T k="nav.buildInPublic" />
          </Link>
          <span className="hidden whitespace-nowrap sm:inline">
            <T k="footer.press" /> <kbd className="kbd">⌘</kbd> <kbd className="kbd">K</kbd> <T k="footer.toSearch" />
          </span>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
            <GithubMark className="size-4" /> <T k="footer.contribute" />
          </a>
        </div>
      </div>
    </footer>
  );
}
