"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavItem } from "@/lib/nav";

interface DocPrevNextProps {
  prev: NavItem | null;
  next: NavItem | null;
}

export function DocPrevNext({ prev, next }: DocPrevNextProps) {
  if (!prev && !next) return null;

  return (
    <nav className="doc-prev-next">
      <div className="doc-prev-next-inner">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="doc-pn-btn doc-pn-prev">
            <ChevronLeft size={16} />
            <div>
              <span className="doc-pn-label">Previous</span>
              <span className="doc-pn-title">{prev.label}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={`/docs/${next.slug}`} className="doc-pn-btn doc-pn-next">
            <div>
              <span className="doc-pn-label">Next</span>
              <span className="doc-pn-title">{next.label}</span>
            </div>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
