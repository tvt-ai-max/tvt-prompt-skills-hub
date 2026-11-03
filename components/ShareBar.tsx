'use client';

import { Link2, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { buildShareUrls, shareCaption } from '@/lib/share';
import { copyText } from '@/lib/clipboard';
import { useToast } from '@/components/ToastProvider';

function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
    </svg>
  );
}

const btn =
  'focus-ring inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-overlay/[0.02] px-3 text-sm text-muted transition hover:border-line-strong hover:text-ink';

/** One-tap social sharing with a hook caption + copy link (toast). Uses the native share sheet on mobile when available. */
export function ShareBar({ url, item }: { url: string; item: { title: string; description: string; tier: string } }) {
  const toast = useToast();
  const [canNativeShare, setCanNativeShare] = useState(false);
  useEffect(() => setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function'), []);

  const caption = shareCaption(item);
  const targets = buildShareUrls(url, caption);
  const open = (href: string) => window.open(href, '_blank', 'noopener,noreferrer,width=640,height=640');

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Chia sẻ">
      <button
        type="button"
        className={btn}
        onClick={async () => toast((await copyText(url)) ? 'Đã copy link!' : 'Không copy được — hãy copy thủ công')}
      >
        <Link2 className="size-4" aria-hidden /> Copy link
      </button>
      <button type="button" className={btn} onClick={() => open(targets.x)} aria-label="Chia sẻ lên X (Twitter)">
        <XMark className="size-3.5" /> <span className="hidden sm:inline">X</span>
      </button>
      <button type="button" className={btn} onClick={() => open(targets.linkedin)} aria-label="Chia sẻ lên LinkedIn">
        <LinkedInMark className="size-3.5" /> <span className="hidden sm:inline">LinkedIn</span>
      </button>
      <button type="button" className={btn} onClick={() => open(targets.facebook)} aria-label="Chia sẻ lên Facebook">
        <FacebookMark className="size-3.5" /> <span className="hidden sm:inline">Facebook</span>
      </button>
      {canNativeShare && (
        <button
          type="button"
          className={btn}
          aria-label="Chia sẻ qua ứng dụng khác"
          onClick={() => navigator.share({ title: item.title, text: caption, url }).catch(() => undefined)}
        >
          <Share2 className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
