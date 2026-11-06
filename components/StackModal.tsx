'use client';

import { useMemo } from 'react';
import { Layers, Trash2, Copy, Check, X, Terminal } from 'lucide-react';
import { useStack } from '@/components/useStack';
import { useHub } from '@/components/HubProvider';
import { useCopy } from '@/components/useCopy';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/components/I18nProvider';
import { TierBadge } from '@/components/Badges';

export function StackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { stack, toggle, clear, stackCount } = useStack();
  const { items, openItem } = useHub();
  const { copied, copy } = useCopy();
  const toast = useToast();
  const { locale } = useTranslation();

  const stackItems = useMemo(() => {
    return stack.map((id) => items.find((item) => item.id === id) || { id, title: id, tier: 'skill' as const, description: '' });
  }, [stack, items]);

  if (!open) return null;

  const generateCombinedCommand = () => {
    if (stack.length === 0) return '';
    return `# Cài đặt bộ stack giải pháp từ LexiHub (${stack.length} components)\n` +
      stackItems.map((item) => `# ${item.title} (${item.tier})\ncurl -sL https://lexihub.tech/data/items/${item.id}`).join('\n\n');
  };

  const handleCopyCommand = async () => {
    const cmd = generateCombinedCommand();
    const ok = await copy('stack-cmd', cmd);
    toast(ok ? (locale === 'vi' ? 'Đã copy lệnh cấu hình Stack!' : 'Copied Stack config!') : 'Failed to copy');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-2xl max-h-[85vh] rounded-2xl border border-line-strong bg-space shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface/40">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30">
              <Layers className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-ink">
                {locale === 'vi' ? 'Bộ Ghép Giải Pháp (My Stack)' : 'My Stack Builder'}
              </h2>
              <p className="text-xs text-muted">
                {locale === 'vi'
                  ? `${stackCount} thành phần đã được chọn vào giỏ công việc`
                  : `${stackCount} components selected in your active stack`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-overlay/[0.06] transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {stackItems.length === 0 ? (
            <div className="py-12 text-center">
              <Layers className="size-12 mx-auto text-faint opacity-40 mb-3" />
              <p className="text-sm font-medium text-ink">
                {locale === 'vi' ? 'Chưa có thành phần nào trong Stack' : 'Your Stack is currently empty'}
              </p>
              <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
                {locale === 'vi'
                  ? 'Bấm nút biểu tượng Stack trên bất kỳ thẻ Prompt, Skill hoặc Bot nào để gom thành bộ giải pháp của riêng bạn.'
                  : 'Click the Stack icon on any Prompt, Skill or Bot card to assemble your tailored solution package.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {stackItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-line bg-surface/50 hover:border-line-strong transition"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <TierBadge tier={item.tier} />
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          openItem(item.id);
                        }}
                        className="text-sm font-semibold text-ink hover:text-neon-cyan transition truncate text-left"
                      >
                        {item.title}
                      </button>
                    </div>
                    {item.description && (
                      <p className="text-xs text-muted line-clamp-1">{item.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      title="Gỡ khỏi stack"
                      className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick instructions / export */}
          {stackItems.length > 0 && (
            <div className="mt-6 p-4 rounded-xl border border-neon-cyan/20 bg-neon-cyan/[0.04]">
              <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan mb-2">
                <Terminal className="size-4" />
                <span>{locale === 'vi' ? 'Xuất Bundle Triển Khai' : 'Export Stack Bundle'}</span>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-3">
                {locale === 'vi'
                  ? 'Gom tất cả các kỹ năng và prompt trên thành cấu hình thống nhất cho Claude Code, Cursor hoặc AI Agent.'
                  : 'Combine these selected components into a unified configuration for Claude Code, Cursor or AI Agents.'}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCommand}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-neon-cyan/20 border border-neon-cyan/40 px-3 py-1.5 text-xs font-medium text-neon-cyan hover:bg-neon-cyan/30 transition"
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span>{copied ? (locale === 'vi' ? 'Đã sao chép' : 'Copied!') : (locale === 'vi' ? '1-Click Copy Cấu Hình' : '1-Click Copy Config')}</span>
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="focus-ring inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted hover:text-red-400 transition"
                >
                  <Trash2 className="size-3.5" />
                  <span>{locale === 'vi' ? 'Xóa toàn bộ' : 'Clear All'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-line bg-surface/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-overlay/[0.08] hover:bg-overlay/[0.12] text-ink transition"
          >
            {locale === 'vi' ? 'Đóng' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
