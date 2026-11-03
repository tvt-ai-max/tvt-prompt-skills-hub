import Link from 'next/link';
import { SearchTrigger } from '@/components/Navbar';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-28 text-center">
      <p className="font-mono text-sm text-neon-cyan">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Không tìm thấy trang</h1>
      <p className="text-muted">Mục bạn tìm có thể đã được đổi tên. Thử tìm kiếm trong kho.</p>
      <SearchTrigger className="flex h-10 w-full" />
      <Link href="/" className="text-sm text-muted hover:text-ink">
        ← Về trang chủ
      </Link>
    </div>
  );
}
