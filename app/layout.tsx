import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { HubProvider } from '@/components/HubProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getAllSummaries } from '@/lib/content';
import { THEME_BOOT_SCRIPT } from '@/lib/theme';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin', 'vietnamese'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${SITE_TAGLINE}`, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: ['prompt library', 'agent skills', 'SKILL.md', 'cursorrules', 'meta prompt', 'B2B marketing', 'OCP', 'TVT Agency'],
  authors: [{ name: 'TVT Agency' }, { name: 'toilatung.com' }],
  openGraph: { type: 'website', siteName: SITE_NAME, title: SITE_NAME, description: SITE_DESCRIPTION, locale: 'vi_VN' },
  twitter: { card: 'summary_large_image', title: SITE_NAME, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0F1E' },
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const items = getAllSummaries();
  return (
    <html
      lang="vi"
      data-theme="dark"
      data-theme-pref="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Zero-FOUC: resolve Dark / Light / System before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-neon-cyan px-3 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Bỏ qua tới nội dung
        </a>
        <HubProvider items={items}>
          <Navbar />
          <main id="main" className="mx-auto max-w-7xl px-4 sm:px-6">
            {children}
          </main>
          <Footer />
        </HubProvider>
      </body>
    </html>
  );
}
