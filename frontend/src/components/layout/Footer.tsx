"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer-v2">
      {/* Top gradient border */}
      <div className="footer-gradient-border" />

      <div className="footer-inner-v2">
        <div className="footer-brand">
          <Image
            src="/webdev logo long.png"
            alt="WebDev Power Kit"
            width={140}
            height={28}
            className="footer-logo"
          />
          <p className="footer-tagline">
            The ultimate TypeScript browser API toolkit.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-link-col">
            <div className="footer-col-label">Documentation</div>
            {[
              { label: "Introduction", id: "introduction" },
              { label: "Installation", id: "installation" },
              { label: "Quick Start", id: "quick-start" },
              { label: "TypeScript", id: "typescript" },
            ].map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="footer-link"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="footer-link-col">
            <div className="footer-col-label">APIs</div>
            {[
              { label: "Clipboard", id: "clipboard" },
              { label: "Battery", id: "battery" },
              { label: "Geolocation", id: "geolocation" },
              { label: "Network", id: "network" },
            ].map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="footer-link"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="footer-link-col">
            <div className="footer-col-label">Resources</div>
            {[
              { label: "GitHub", href: "https://github.com/dev-aditya-lab/webdev-power-kit" },
              { label: "npm", href: "https://www.npmjs.com/package/webdev-power-kit" },
              { label: "Portfolio", href: "https://devaditya.dev" },
              { label: "Changelog", href: "#changelog" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener" : undefined}
                className="footer-link"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} WebDev Power Kit · MIT License
        </span>
        <span className="footer-bottom-heart">
          Built with{" "}
          <Heart
            size={12}
            style={{ display: "inline", verticalAlign: "-1px", color: "#f43f5e" }}
          />{" "}
          by{" "}
          <a
            href="https://devaditya.dev"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--brand-light)", textDecoration: "none" }}
          >
            Aditya Kumar Gupta
          </a>
        </span>
      </div>
    </footer>
  );
}
