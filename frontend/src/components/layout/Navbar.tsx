"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Menu, X } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Docs", href: "/docs", external: false },
  { label: "Contributions", href: "https://github.com/dev-aditya-lab/webdev-power-kit/blob/main/CONTRIBUTING.md", external: true },
  { label: "Request Feature", href: "https://github.com/dev-aditya-lab/webdev-power-kit/issues/new?labels=enhancement", external: true },
  { label: "Report Issue", href: "https://github.com/dev-aditya-lab/webdev-power-kit/issues/new?labels=bug", external: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`navbar landing-navbar${scrolled ? " navbar-scrolled" : ""}`}
        style={{
          left: 0,
          background: scrolled ? "var(--navbar-bg-scrolled)" : "var(--navbar-bg)",
          backdropFilter: scrolled ? "blur(32px) saturate(1.3)" : "blur(16px)",
          WebkitBackdropFilter: scrolled ? "blur(32px) saturate(1.3)" : "blur(16px)",
          boxShadow: scrolled
            ? "0 1px 0 var(--border), 0 8px 32px rgba(0,0,0,0.2)"
            : "0 1px 0 var(--border)",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Left: Logo */}
        <div className="navbar-left">
          <Link href="/" className="navbar-logo-link" onClick={closeMenu}>
            <Image
              src="/webdev logo long.png"
              alt="WebDev Power Kit"
              width={130}
              height={26}
              className="navbar-logo"
              priority
            />
          </Link>
        </div>

        {/* Center: Navigation links (Desktop) */}
        <nav className="navbar-links">
          {NAV_LINKS.map((link) => (
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-link-btn"
              >
                {link.label}
                <ExternalLink size={11} style={{ opacity: 0.6 }} />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="navbar-link-btn"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="navbar-right">
          <ThemeToggle />

          {/* GitHub Link (Desktop only shows text, Mobile shows icon) */}
          <motion.a
            href="https://github.com/dev-aditya-lab/webdev-power-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm navbar-github-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <GithubIcon size={15} />
            <span>GitHub</span>
          </motion.a>

          {/* npm Link (Desktop only) */}
          <motion.a
            href="https://www.npmjs.com/package/webdev-power-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-brand btn-sm navbar-npm-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ display: "inline-flex" }}
          >
            npm
            <ExternalLink size={11} />
          </motion.a>

          {/* Hamburger menu trigger (Mobile only) */}
          <button
            className="navbar-mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Menu Drawer */}
            <motion.div
              className="mobile-menu-drawer"
              initial={{ y: "-10px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-10px", opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <nav className="mobile-menu-links">
                {NAV_LINKS.map((link) => (
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-menu-link"
                      onClick={closeMenu}
                    >
                      {link.label}
                      <ExternalLink size={14} style={{ opacity: 0.6 }} />
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="mobile-menu-link"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </nav>

              <div className="mobile-menu-footer">
                <motion.a
                  href="https://github.com/dev-aditya-lab/webdev-power-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", flex: 1, justifyContent: "center" }}
                  onClick={closeMenu}
                >
                  <GithubIcon size={15} />
                  GitHub
                </motion.a>

                <motion.a
                  href="https://www.npmjs.com/package/webdev-power-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-brand btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", flex: 1, justifyContent: "center" }}
                  onClick={closeMenu}
                >
                  npm
                  <ExternalLink size={11} />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
