import { notFound } from "next/navigation";
import { ALL_NAV_ITEMS } from "@/lib/nav";
import { DocPrevNext } from "@/components/docs/DocPrevNext";
import { DocSectionClient } from "@/components/docs/DocSectionClient";

// Generate a static page for every doc slug at build time
export function generateStaticParams() {
  return ALL_NAV_ITEMS.map((item) => ({ slug: item.slug }));
}

// Generate <title> and <meta> per page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = ALL_NAV_ITEMS.find((i) => i.slug === slug);
  if (!item) return {};
  return {
    title: `${item.label} · WebDev Power Kit`,
    description: `Documentation for the ${item.label} module of webdev-power-kit — zero-dependency TypeScript browser API toolkit.`,
  };
}

export default async function DocSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 404 for unknown slugs
  const isValid = ALL_NAV_ITEMS.some((i) => i.slug === slug);
  if (!isValid) notFound();

  // Compute prev / next for navigation
  const idx = ALL_NAV_ITEMS.findIndex((i) => i.slug === slug);
  const prev = idx > 0 ? ALL_NAV_ITEMS[idx - 1] : null;
  const next = idx < ALL_NAV_ITEMS.length - 1 ? ALL_NAV_ITEMS[idx + 1] : null;

  return (
    <div className="doc-page">
      {/* Client component renders the correct section */}
      <DocSectionClient slug={slug} />
      <DocPrevNext prev={prev} next={next} />
    </div>
  );
}
