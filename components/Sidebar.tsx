'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Star,
  ScrollText,
  Bot,
  Sparkles,
  Workflow,
  Brain,
  Plug,
  ShieldCheck,
  Flame,
  BookOpen,
  ExternalLink,
  Rocket,
} from 'lucide-react';
import { useStack, useSidebar } from '@/components/useStack';
import { useFavorites } from '@/components/useFavorites';
import { useTranslation } from '@/components/I18nProvider';
import { StackModal } from '@/components/StackModal';

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle: toggleCollapse } = useSidebar();
  const { stackCount } = useStack();
  const { favorites } = useFavorites();
  const { locale } = useTranslation();
  const [stackModalOpen, setStackModalOpen] = useState(false);

  const isVi = locale === 'vi';

  const workplaceLinks = [
    {
      id: 'stack',
      label: isVi ? 'Bộ Ghép Của Tôi' : 'My Stack',
      shortLabel: 'Stack',
      icon: Layers,
      count: stackCount,
      color: 'text-neon-cyan',
      badgeColor: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30',
      action: () => setStackModalOpen(true),
    },
    {
      id: 'favorites',
      label: isVi ? 'Đã Ghim Yêu Thích' : 'Favorites',
      shortLabel: isVi ? 'Ghim' : 'Favs',
      icon: Star,
      count: favorites.length,
      color: 'text-neon-amber',
      badgeColor: 'bg-neon-amber/20 text-neon-amber border-neon-amber/30',
      href: '/prompts?favorite=true',
    },
  ];

  const browseLinks = [
    {
      label: 'Skills',
      href: '/skills',
      icon: ScrollText,
      count: 60,
      color: 'text-emerald-400',
    },
    {
      label: isVi ? 'AI Bots & Chuyên Gia' : 'AI Bots & Agents',
      shortLabel: 'Bots',
      href: '/bots',
      icon: Bot,
      count: 317,
      color: 'text-violet-400',
    },
    {
      label: 'Prompts',
      href: '/prompts',
      icon: Sparkles,
      count: 139,
      color: 'text-cyan-400',
    },
    {
      label: isVi ? 'Chu Trình (Workflows)' : 'Workflows',
      shortLabel: 'Workflows',
      href: '/workflows',
      icon: Workflow,
      count: 5,
      color: 'text-amber-400',
    },
    {
      label: isVi ? 'Deep Reasoning' : 'Deep Reasoning',
      shortLabel: 'Reasoning',
      href: '/prompts?tier=boost',
      icon: Brain,
      count: 7,
      color: 'text-pink-400',
    },
    {
      label: 'MCP Servers',
      shortLabel: 'MCPs',
      href: '/skills?category=devops',
      icon: Plug,
      count: 15,
      color: 'text-sky-400',
    },
    {
      label: isVi ? 'Security Hooks' : 'Security Hooks',
      shortLabel: 'Hooks',
      href: '/skills?category=devops',
      icon: ShieldCheck,
      count: 5,
      color: 'text-red-400',
    },
  ];

  const resourceLinks = [
    {
      label: isVi ? 'Thịnh Hành (Trending)' : 'Trending',
      href: '/prompts',
      icon: Flame,
      color: 'text-orange-400',
    },
    {
      label: isVi ? 'Hướng Dẫn & API' : 'Guide & API',
      href: '/guide',
      icon: BookOpen,
      color: 'text-indigo-400',
    },
    {
      label: isVi ? 'Câu Chuyện Phát Triển' : 'Build in Public',
      href: '/build-in-public',
      icon: Rocket,
      color: 'text-amber-400',
    },
  ];

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col shrink-0 border-r border-line bg-space/70 backdrop-blur-md sticky top-16 h-[calc(100vh-4rem)] transition-all duration-300 z-30 ${
          collapsed ? 'w-18' : 'w-64'
        }`}
      >
        {/* Toggle Collapse Button Header */}
        <div className="flex items-center justify-between p-3 border-b border-line/60">
          {!collapsed && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-faint px-2">
              {isVi ? 'Không Gian Làm Việc' : 'Workspace'}
            </span>
          )}
          <button
            type="button"
            onClick={toggleCollapse}
            title={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
            className="p-1.5 rounded-lg border border-line bg-surface/60 text-muted hover:text-ink hover:border-line-strong transition ml-auto"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-5 scrollbar-thin">
          {/* Section: WORKPLACE */}
          <div>
            {!collapsed && (
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-faint px-2 mb-1.5">
                {isVi ? 'Bộ Ghép Cá Nhân' : 'My Workplace'}
              </h4>
            )}
            <ul className="space-y-1">
              {workplaceLinks.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <>
                    <Icon className={`size-4.5 shrink-0 ${item.color}`} />
                    {!collapsed && (
                      <span className="flex-1 truncate text-xs font-medium text-ink text-left">
                        {item.label}
                      </span>
                    )}
                    {item.count > 0 && (
                      <span
                        className={`inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold border ${item.badgeColor} ${
                          collapsed ? 'absolute top-1 right-1 text-[9px] size-4 p-0' : ''
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </>
                );

                if (item.action) {
                  return (
                    <li key={item.id} className="relative">
                      <button
                        type="button"
                        onClick={item.action}
                        title={item.label}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left hover:bg-overlay/[0.06] transition"
                      >
                        {inner}
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.id} className="relative">
                    <Link
                      href={item.href!}
                      title={item.label}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left hover:bg-overlay/[0.06] transition"
                    >
                      {inner}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section: BROWSE */}
          <div>
            {!collapsed && (
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-faint px-2 mb-1.5">
                {isVi ? 'Khám Phá Tài Nguyên' : 'Browse'}
              </h4>
            )}
            <ul className="space-y-0.5">
              {browseLinks.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      title={item.label}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition ${
                        active
                          ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                          : 'text-muted hover:text-ink hover:bg-overlay/[0.05]'
                      }`}
                    >
                      <Icon className={`size-4 shrink-0 ${item.color}`} />
                      {!collapsed && (
                        <span className="flex-1 truncate text-xs font-medium">
                          {item.label}
                        </span>
                      )}
                      {!collapsed && (
                        <span className="px-1.5 py-0.5 rounded-md bg-overlay/[0.06] text-[10px] font-mono text-faint">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section: RESOURCES */}
          <div>
            {!collapsed && (
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-faint px-2 mb-1.5">
                {isVi ? 'Tài Liệu & Hệ Sinh Thái' : 'Resources'}
              </h4>
            )}
            <ul className="space-y-0.5">
              {resourceLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      title={item.label}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-muted hover:text-ink hover:bg-overlay/[0.05] transition"
                    >
                      <Icon className={`size-4 shrink-0 ${item.color}`} />
                      {!collapsed && (
                        <span className="flex-1 truncate text-xs font-medium">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="https://tvtagency.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="TVT Agency B2B"
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-muted hover:text-ink hover:bg-overlay/[0.05] transition"
                >
                  <ExternalLink className="size-4 shrink-0 text-blue-400" />
                  {!collapsed && (
                    <span className="flex-1 truncate text-xs font-medium">
                      TVT Agency (B2B)
                    </span>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer info */}
        {!collapsed && (
          <div className="p-3 border-t border-line/60 bg-surface/30 text-[11px] text-faint text-center">
            <span>Powered by </span>
            <strong className="text-ink">TVT Intelligence</strong>
          </div>
        )}
      </aside>

      {/* Modal for My Stack */}
      <StackModal open={stackModalOpen} onClose={() => setStackModalOpen(false)} />
    </>
  );
}
