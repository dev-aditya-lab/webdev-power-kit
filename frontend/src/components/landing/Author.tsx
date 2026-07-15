"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Package } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Author() {
  return (
    <section className="author-section-v2">
      <div className="author-section-bg-glow" />
      <div className="author-inner">
        <Reveal>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <Heart size={14} style={{ color: "#f43f5e" }} />
            Meet the Creator
          </div>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Built with passion by
            <br />
            <span className="text-gradient">Aditya Kumar Gupta</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            className="author-card-v2"
            whileHover={{ borderColor: "rgba(59,158,255,0.45)", y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="author-card-left">
              <motion.div
                className="author-avatar-wrap"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/webdev logo 1x1.png"
                  alt="Aditya Kumar Gupta"
                  width={90}
                  height={90}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                {/* Online indicator */}
                <div className="author-online-dot" />
              </motion.div>
            </div>

            <div className="author-card-right">
              <h3 className="author-name-v2">Aditya Kumar Gupta</h3>
              <p className="author-handle-v2">
                <code>@dev-aditya-lab</code>
              </p>
              <p className="author-bio-v2">
                Computer Science Engineer &amp; passionate Web Developer.
                Creator of{" "}
                <strong style={{ color: "var(--text-1)" }}>webdev-power-kit</strong>{" "}
                and other open-source tools. Building developer tools that are
                clean, typed, and production-ready — so you can ship faster.
              </p>
              <div className="author-links-v2">
                {[
                  { href: "https://devaditya.dev", icon: Globe, label: "devaditya.dev" },
                  { href: "https://github.com/dev-aditya-lab", icon: GithubIcon, label: "GitHub" },
                  { href: "https://www.npmjs.com/package/webdev-power-kit", icon: Package, label: "npm" },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="author-link-v2"
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <link.icon size={15} />
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
