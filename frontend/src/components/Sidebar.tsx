"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { NAV_GROUPS } from "@/lib/nav";

function DynamicIcon({ name, size = 14, className = "" }: { name: string; size?: number; className?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

interface SidebarProps {
  /** The current doc slug, e.g. "clipboard" — used to highlight the active item */
  activeSlug: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ activeSlug, isOpen, onClose }: SidebarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredGroups = NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidebar-overlay on"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`sidebar${isOpen ? " open" : ""}`}>
        {/* Top */}
        <div className="sidebar-top">
          {/* Logo → home */}
          <Link href="/" className="sidebar-logo-link" onClick={onClose}>
            <Image
              src="/webdev logo long.png"
              alt="WebDev Power Kit"
              width={200}
              height={40}
              className="sidebar-logo-long"
              priority
            />
          </Link>

          {/* Search */}
          <div className="sidebar-search">
            <Search className="sidebar-search-icon" />
            <input
              type="text"
              placeholder="Search docs…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {filteredGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <div className="nav-group-label">
                <DynamicIcon name={group.iconName} size={12} className="nav-group-label-icon" />
                {group.label}
              </div>
              {group.items.map((item) => (
                <motion.div key={item.id} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={`/docs/${item.slug}`}
                    className={`nav-item${activeSlug === item.slug ? " active" : ""}`}
                    onClick={onClose}
                    prefetch
                  >
                    <DynamicIcon name={item.iconName} size={14} className="nav-item-icon" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div style={{ marginBottom: "0.4rem" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              fontSize: "0.7rem", color: "var(--text-3)",
              background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)",
              borderRadius: "99px", padding: "0.15rem 0.6rem"
            }}>
              v2.2.0
            </span>
          </div>
          <div className="sidebar-footer-links">
            <a href="https://github.com/dev-aditya-lab/webdev-power-kit" target="_blank" rel="noopener">GitHub</a>
            <span className="sidebar-footer-sep">·</span>
            <a href="https://www.npmjs.com/package/webdev-power-kit" target="_blank" rel="noopener">npm</a>
            <span className="sidebar-footer-sep">·</span>
            <a href="https://devaditya.dev" target="_blank" rel="noopener">Author</a>
            <span className="sidebar-footer-sep">·</span>
            <span style={{ color: "var(--text-3)", fontSize: "0.73rem" }}>MIT</span>
          </div>
        </div>
      </aside>
    </>
  );
}
