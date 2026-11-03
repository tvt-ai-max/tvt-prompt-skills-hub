import { serializeJsonLd } from '@/lib/seo';

/** Server-rendered structured data (schema.org). `<` is escaped to keep the payload XSS-safe. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
