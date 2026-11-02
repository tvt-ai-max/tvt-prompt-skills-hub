import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ListChecks, Terminal, Wrench } from 'lucide-react';
import { getAllItems, getItemById } from '@/lib/content';
import { PersonaBadge, TIER_STYLES, TierBadge } from '@/components/Badges';
import { VariableWorkbench } from '@/components/VariableWorkbench';
import { ItemCard } from '@/components/ItemCard';
import { categoryLabel, TIER_META } from '@/lib/labels';
import { itemCategory } from '@/lib/search';

export const dynamicParams = false;

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllItems().map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: ItemPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    keywords: item.tags,
    openGraph: { title: item.title, description: item.description, type: 'article' },
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) notFound();

  const category = itemCategory(item);
  const related = getAllItems()
    .filter((other) => other.id !== item.id)
    .map((other) => ({
      other,
      score:
        (itemCategory(other) === category ? 3 : 0) +
        (other.persona === item.persona ? 1 : 0) +
        other.tags.filter((t) => item.tags.includes(t)).length * 2,
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.other);

  return (
    <article className="pt-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-faint">
        <Link href="/" className="hover:text-ink">
          Hub
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link href={`/${item.tier}s`} className="hover:text-ink">
          {TIER_META[item.tier].plural}
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="truncate text-muted">{item.title}</span>
      </nav>

      <header className="mb-8 max-w-4xl space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <TierBadge tier={item.tier} />
          <PersonaBadge persona={item.persona} />
          <span className="text-xs text-faint">{categoryLabel(category)}</span>
          {item.author && <span className="text-xs text-faint">· {item.author}</span>}
          <span className="text-xs text-faint">· {item.createdAt}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{item.title}</h1>
        <p className="text-base leading-relaxed text-muted">{item.description}</p>
        {item.tier === 'boost' && (
          <code className="inline-flex items-center gap-2 rounded-lg border border-neon-violet/30 bg-neon-violet/10 px-3 py-1.5 font-mono text-sm text-violet-200">
            <Terminal className="size-4" aria-hidden />
            {item.slashCommand}
            <span className="text-violet-300/60">· {item.reasoningType}</span>
          </code>
        )}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-xs text-faint">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {item.tier === 'skill' && (
        <div className="mb-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface/70 p-4">
            <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Inputs</h2>
            <ul className="space-y-2 text-sm">
              {item.inputs.map((input) => (
                <li key={input.name}>
                  <code className="font-mono text-xs text-cyan-300">{input.name}</code>
                  <span className="text-xs text-faint">
                    {' '}
                    · {input.type}
                    {input.required ? ' · bắt buộc' : ''}
                  </span>
                  <p className="text-muted">{input.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-surface/70 p-4">
            <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              <Wrench className="size-3.5" aria-hidden /> Tools
            </h2>
            {item.tools?.length ? (
              <ul className="space-y-1.5 text-sm text-muted">
                {item.tools.map((tool) => (
                  <li key={tool} className="font-mono text-xs">
                    {tool}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-faint">Không yêu cầu tool đặc biệt.</p>
            )}
          </div>
          <div className="rounded-2xl border border-neon-emerald/25 bg-neon-emerald/5 p-4">
            <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-emerald-300 uppercase">
              <ListChecks className="size-3.5" aria-hidden /> Quality gates
            </h2>
            <ul className="space-y-1.5 text-sm text-muted">
              {item.auditGates.map((gate) => (
                <li key={gate} className="flex gap-2">
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${TIER_STYLES.skill.dot}`} />
                  {gate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <section aria-label="Interactive Variable Replacer" className="rounded-3xl border border-line bg-surface/50 p-4 sm:p-6">
        <VariableWorkbench item={item} />
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-14">
          <h2 id="related-title" className="mb-4 text-xl font-bold tracking-tight">
            Liên quan
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <li key={other.id}>
                <ItemCard item={other} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
