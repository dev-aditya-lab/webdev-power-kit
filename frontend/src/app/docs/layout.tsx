"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { DocsNavbar } from "@/components/layout/DocsNavbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // e.g. /docs/clipboard → "clipboard"
  const activeSlug = pathname.replace(/^\/docs\/?/, "") || null;

  return (
    <div className="layout">
      <Sidebar
        activeSlug={activeSlug}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="page-content">
        <DocsNavbar
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          sidebarOpen={sidebarOpen}
        />
        <main className="docs-main">
          {children}
        </main>
      </div>
    </div>
  );
}
