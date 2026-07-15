"use client";

import { renderSection } from "@/components/docs/DocSections";

/** Thin client wrapper — calls renderSection() which returns JSX from client components */
export function DocSectionClient({ slug }: { slug: string }) {
  return <>{renderSection(slug)}</>;
}
