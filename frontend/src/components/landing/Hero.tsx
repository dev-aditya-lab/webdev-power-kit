"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Terminal,
  Star,
} from "lucide-react";
import { MeteorShower } from "@/components/ui/MeteorShower";
import { ShinyButton } from "@/components/ui/ShinyButton";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// Rotating word in headline
const ROTATING_WORDS = ["Simplified.", "Supercharged.", "Unified.", "Effortless."];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="hero-rotating-word-wrap">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="hero-h1-accent"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ display: "inline-block" }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Animated install command
function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm install webdev-power-kit");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* silent */
    }
  };

  return (
    <motion.button
      className="hero-install-cmd"
      onClick={handleCopy}
      whileHover={{ scale: 1.02, borderColor: "rgba(59,158,255,0.5)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <span className="hero-install-terminal">
        <Terminal size={13} />
      </span>
      <span className="hero-install-prompt">$</span>
      <span className="hero-install-pkg">npm install</span>
      <span className="hero-install-name">webdev-power-kit</span>
      <motion.span
        className="hero-install-copy"
        animate={copied ? { scale: [1, 1.4, 1], color: "#22c55e" } : {}}
        transition={{ duration: 0.3 }}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </motion.span>
    </motion.button>
  );
}

// Animated floating badges
const FLOAT_BADGES = [
  { label: "TypeScript", color: "#3B82F6", delay: 0.3, x: "-60%", y: "-40%" },
  { label: "Zero Deps", color: "#22c55e", delay: 0.5, x: "60%", y: "-55%" },
  { label: "15+ APIs", color: "#a855f7", delay: 0.7, x: "-70%", y: "40%" },
  { label: "MIT License", color: "#f97316", delay: 0.9, x: "65%", y: "35%" },
];

interface HeroProps {
  onNavigate: (id: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="hero-v2">
      {/* ── Background layers ── */}
      <div className="hero-v2-bg">
        {/* Subtle mesh gradient */}
        <div className="hero-mesh-gradient" />
        {/* Animated dot grid */}
        <svg className="hero-dot-grid" aria-hidden="true">
          <defs>
            <pattern
              id="hero-dots"
              x="0"
              y="0"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
            </pattern>
            <radialGradient id="hero-dot-mask" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="hero-dot-mask-m">
              <rect width="100%" height="100%" fill="url(#hero-dot-mask)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#hero-dots)"
            mask="url(#hero-dot-mask-m)"
          />
        </svg>
        {/* Radial glow blobs */}
        <div className="hero-glow-blob hero-glow-blue" />
        <div className="hero-glow-blob hero-glow-purple" />
        <div className="hero-glow-blob hero-glow-teal" />
        {/* Meteors */}
        <MeteorShower count={18} />
      </div>

      {/* ── Content ── */}
      <div className="hero-v2-inner">
        {/* Badge */}
        <motion.div
          className="hero-v2-badge"
          initial={{ opacity: 0, y: -8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.span
            className="hero-badge-dot"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Sparkles size={12} />
          <span>v2.2.0 · Open Source · TypeScript-first</span>
          <span className="hero-badge-sep">|</span>
          <Star size={11} />
          <span>Star us on GitHub</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero-v2-h1"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          Browser APIs,
          <br />
          <RotatingWord />
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="hero-v2-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          The ultimate TypeScript toolkit for modern web developers.
          <br />
          Clipboard, battery, geolocation, notifications &amp; more —
          <br />
          <strong style={{ color: "var(--text-1)" }}>zero dependencies</strong>, fully typed, one import away.
        </motion.p>

        {/* Install command */}
        <InstallCommand />

        {/* CTA buttons */}
        <motion.div
          className="hero-v2-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <ShinyButton onClick={() => onNavigate("introduction")} variant="brand">
            Get Started <ArrowRight size={16} />
          </ShinyButton>
          <ShinyButton
            href="https://github.com/dev-aditya-lab/webdev-power-kit"
            variant="outline"
          >
            <GithubIcon size={16} />
            Star on GitHub
          </ShinyButton>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="hero-v2-quick-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {[
            { v: "15+", l: "APIs" },
            { v: "0", l: "Dependencies" },
            { v: "100%", l: "TypeScript" },
            { v: "MIT", l: "License" },
          ].map((s) => (
            <div key={s.l} className="hero-quick-stat">
              <span className="hero-quick-val">{s.v}</span>
              <span className="hero-quick-label">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="hero-v2-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="hero-scroll-mouse"
        >
          <div className="hero-scroll-dot" />
        </motion.div>
      </motion.div>
    </section>
  );
}
