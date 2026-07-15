"use client";

import Link from "next/link";
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
              { label: "Introduction", slug: "introduction" },
              { label: "Installation", slug: "installation" },
              { label: "Quick Start", slug: "quick-start" },
              { label: "TypeScript", slug: "typescript" },
            ].map((l) => (
              <Link key={l.slug} href={`/docs/${l.slug}`} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="footer-link-col">
            <div className="footer-col-label">APIs</div>
            {[
              { label: "Clipboard", slug: "clipboard" },
              { label: "Battery", slug: "battery" },
              { label: "Geolocation", slug: "geolocation" },
              { label: "Network", slug: "network" },
            ].map((l) => (
              <Link key={l.slug} href={`/docs/${l.slug}`} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="footer-link-col">
            <div className="footer-col-label">Resources</div>
            {[
              { label: "GitHub", href: "https://github.com/dev-aditya-lab/webdev-power-kit" },
              { label: "npm", href: "https://www.npmjs.com/package/webdev-power-kit" },
              { label: "Portfolio", href: "https://devaditya.dev" },
              { label: "Changelog", href: "/docs/changelog" },
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
