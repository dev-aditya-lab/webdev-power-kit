"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink, Star } from "lucide-react";
import { ALL_NAV_ITEMS } from "@/lib/nav";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface NavbarProps {
  activeId: string | null;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function Navbar({ activeId, onToggleSidebar, sidebarOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const activeItem = ALL_NAV_ITEMS.find((i) => i.id === activeId);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar${scrolled ? " navbar-scrolled" : ""}`}
      style={{
        // Increase blur and shadow when scrolled
        background: scrolled
          ? "rgba(9,9,14,0.88)"
          : "rgba(9,9,14,0.72)",
        backdropFilter: scrolled ? "blur(32px) saturate(1.4)" : "blur(16px)",
        WebkitBackdropFilter: scrolled ? "blur(32px) saturate(1.4)" : "blur(16px)",
        boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)" : "0 1px 0 rgba(255,255,255,0.05)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div className="navbar-left">
        {/* Mobile sidebar toggle */}
        <motion.button
          className="navbar-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Breadcrumb / current section */}
        <AnimatePresence mode="wait">
          {activeItem ? (
            <motion.nav
              key="breadcrumb"
              className="navbar-breadcrumb"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <span className="navbar-bc-root">Docs</span>
              <span className="navbar-bc-sep">/</span>
              <span className="navbar-bc-current">{activeItem.label}</span>
            </motion.nav>
          ) : (
            <motion.span
              key="brand"
              className="navbar-brand-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              webdev-power-kit
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="navbar-right">
        <motion.a
          href="https://github.com/dev-aditya-lab/webdev-power-kit"
          target="_blank"
          rel="noopener"
          className="btn btn-ghost btn-sm navbar-github-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <GithubIcon size={15} />
          <span>GitHub</span>
        </motion.a>

        <motion.a
          href="https://www.npmjs.com/package/webdev-power-kit"
          target="_blank"
          rel="noopener"
          className="btn btn-brand btn-sm"
          whileHover={{ scale: 1.04, boxShadow: "0 4px 20px rgba(59,158,255,0.3)" }}
          whileTap={{ scale: 0.96 }}
        >
          npm
          <ExternalLink size={11} />
        </motion.a>
      </div>
    </header>
  );
}
