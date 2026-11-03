import Link from 'next/link';
import { GithubMark } from '@/components/Badges';
import { REPO_URL } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Made with care by{' '}
          <a href="https://tvtagency.com" className="text-muted hover:text-ink" target="_blank" rel="noreferrer">
            TVT Agency
          </a>{' '}
          &amp;{' '}
          <a href="https://toilatung.com" className="text-muted hover:text-ink" target="_blank" rel="noreferrer">
            toilatung.com
          </a>
          . MIT License.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/build-in-public" className="text-muted hover:text-ink">
            Build in Public
          </Link>
          <span className="hidden sm:inline">
            Nhấn <kbd className="kbd">⌘</kbd> <kbd className="kbd">K</kbd> để tìm kiếm
          </span>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
            <GithubMark className="size-4" /> Đóng góp nội dung
          </a>
        </div>
      </div>
    </footer>
  );
}
