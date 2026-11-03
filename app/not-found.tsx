import Link from 'next/link';
import { SearchTrigger } from '@/components/Navbar';
import { T } from '@/components/I18nProvider';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-28 text-center">
      <p className="font-mono text-sm text-neon-cyan">404</p>
      <h1 className="text-3xl font-bold tracking-tight">
        <T k="notFound.title" />
      </h1>
      <p className="text-muted">
        <T k="notFound.lead" />
      </p>
      <SearchTrigger className="flex h-10 w-full" />
      <Link href="/" className="text-sm text-muted hover:text-ink">
        <T k="notFound.back" />
      </Link>
    </div>
  );
}
