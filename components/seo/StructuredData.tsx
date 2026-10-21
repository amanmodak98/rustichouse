/**
 * Render one or more JSON-LD payloads as a server-only
 * <script type="application/ld+json"> tag. Pure RSC, zero JS shipped.
 */
import { safeJsonLd } from '@/lib/structured-data';

export function StructuredData({ data }: { data: object | object[] }) {
  const json = safeJsonLd(data);
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD requires raw injection
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}