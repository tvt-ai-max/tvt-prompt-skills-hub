import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { HubProvider } from '@/components/HubProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SkipLink } from '@/components/SkipLink';
import { getAllSummaries, getAllWorkflows, getCoreBots } from '@/lib/content';
import type { NavEntry } from '@/types/hub';
import { THEME_BOOT_SCRIPT } from '@/lib/theme';
import { LOCALE_BOOT_SCRIPT } from '@/lib/i18n';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin', 'vietnamese'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${SITE_TAGLINE}`, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: [
    'LexiHub',
    'TVT Intelligence Hub',
    'AI agent control center',
    'prompt library',
    'agent skills',
    'SKILL.md',
    'AI workflow studio',
    'custom personas for chatgpt',
    'cursorrules',
    'MCP server',
    'Claude Code',
    'Windsurf',
    'OpenClaw',
    'Hermes AI',
    'B2B automation',
    'solopreneur OCP',
    'TVT Agency',
    'toilatung.com',
  ],
  authors: [{ name: 'TVT Agency', url: 'https://tvtagency.com' }, { name: 'toilatung.com', url: 'https://toilatung.com' }],
  creator: 'Nguyễn Thanh Tùng & TVT Agency',
  publisher: 'TVT Agency',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'vi_VN',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
  const entries: NavEntry[] = [
    ...getAllWorkflows().map((wf) => ({
      kind: 'workflow' as const,
      id: wf.id,
      title: wf.title,
      subtitle: `${wf.difficulty} · ${wf.steps.length} × ${wf.steps.map((s) => s.agentRole.split(' (')[0]).filter((v, i, a) => a.indexOf(v) === i).join(', ')}`,
      description: wf.summary,
      tags: wf.tags,
      href: `/workflows/${wf.slug}`,
    })),
    ...getCoreBots().map((bot) => ({
      kind: 'bot' as const,
      id: bot.id,
      title: `${bot.name} — ${bot.role}`,
      subtitle: bot.role,
      description: bot.description,
      tags: bot.tags,
      href: `/bots/${bot.id}`,
      glyph: bot.avatar,
    })),
  ];
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
        {/* Zero-FOUC i18n: resolve vi / en (?lang= → saved choice → browser language) before paint. */}
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-dvh font-sans">
        <HubProvider items={items} entries={entries}>
          <SkipLink />
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
