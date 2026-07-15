"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Copy, Check, Terminal } from "lucide-react";
import gsap from "gsap";
import { fetchGitHubProfile } from "@/lib/github";

// ── GitHub icon ─────────────────────────────
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ── Rotating word ───────────────────────────
const ROTATING_WORDS = ["Simplified.", "Supercharged.", "Unified.", "Effortless."];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="hero-rotating-word-wrap">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="hero-h1-accent"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{ display: "inline-block" }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Install command ─────────────────────────
function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm install webdev-power-kit");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* silent */ }
  };

  return (
    <motion.button
      className="hero-install-cmd"
      onClick={handleCopy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.5 }}
    >
      <span className="hero-install-terminal"><Terminal size={13} /></span>
      <span className="hero-install-prompt">$</span>
      <span className="hero-install-pkg">npm install</span>
      <span className="hero-install-name">webdev-power-kit</span>
      <motion.span
        className="hero-install-copy"
        animate={copied ? { scale: [1, 1.35, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </motion.span>
    </motion.button>
  );
}

// ── Stat counter (GSAP count-up) ─────────────
function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.6,
      delay: 1.2,
      ease: "power2.out",
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
    });
  }, [value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ── Hero SVG bracket decoration ──────────────
function BracketSvg() {
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const paths = [path1Ref.current, path2Ref.current].filter(Boolean) as SVGPathElement[];
    paths.forEach((p, i) => {
      const len = p.getTotalLength();
      gsap.fromTo(p,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 1.2, delay: 0.3 + i * 0.2, ease: "power2.inOut" }
      );
    });
  }, []);

  return (
    <svg
      className="hero-bracket-svg"
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left bracket < */}
      <path
        ref={path1Ref}
        d="M 60 10 L 10 70 L 60 130"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right bracket > */}
      <path
        ref={path2Ref}
        d="M 60 10 L 110 70 L 60 130"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
    </svg>
  );
}

// ── Hero Background lines (GSAP) ─────────────
function HeroBgLines() {
  const linesRef = useRef<SVGGElement>(null);
  useEffect(() => {
    if (!linesRef.current) return;
    gsap.to(linesRef.current.children, {
      y: -30,
      opacity: 0.04,
      stagger: 0.4,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <svg className="hero-bg-lines" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1440 900">
      <g ref={linesRef} stroke="currentColor" strokeWidth="1" opacity="0.06">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1="0" y1={60 + i * 60} x2="1440" y2={60 + i * 60} />
        ))}
      </g>
    </svg>
  );
}

// ── Hero content ─────────────────────────────
interface HeroProps {
  onNavigate: (id: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [ghFollowers, setGhFollowers] = useState<number | null>(null);
  const [ghRepos, setGhRepos] = useState<number | null>(null);

  // GSAP reveal on mount
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.from(contentRef.current.children, {
      opacity: 0,
      y: 32,
      stagger: 0.08,
      duration: 0.7,
      delay: 0.1,
      ease: "power3.out",
    });
  }, []);

  // GitHub stats
  useEffect(() => {
    fetchGitHubProfile().then((profile) => {
      if (profile) {
        setGhFollowers(profile.followers);
        setGhRepos(profile.public_repos);
      }
    });
  }, []);

  const STATS = [
    { v: "15+", l: "APIs", isNumber: false },
    { v: "0", l: "Dependencies", isNumber: false },
    { v: "100%", l: "TypeScript", isNumber: false },
    {
      v: ghFollowers !== null ? ghFollowers : null,
      l: "GitHub Followers",
      isNumber: true,
      fallback: "—",
    },
  ];

  return (
    <section className="hero-bw">
      {/* Background */}
      <div className="hero-bw-bg" aria-hidden="true">
        <HeroBgLines />
        {/* Noise grain */}
        <div className="hero-noise" />
        {/* Subtle radial spotlight */}
        <div className="hero-spotlight" />
        {/* Dot grid */}
        <svg className="hero-dot-grid" aria-hidden="true">
          <defs>
            <pattern id="hero-dots-bw" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.07" />
            </pattern>
            <radialGradient id="hero-dot-fade" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="hero-dot-mask-bw">
              <rect width="100%" height="100%" fill="url(#hero-dot-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots-bw)" mask="url(#hero-dot-mask-bw)" />
        </svg>
      </div>

      {/* Content */}
      <div ref={contentRef} className="hero-bw-inner">
        {/* Badge */}
        <div className="hero-bw-badge">
          <span className="hero-badge-pulse" />
          <span>v2.2.0 · Open Source · TypeScript-first</span>
        </div>

        {/* SVG bracket decoration */}
        <div className="hero-bracket-wrap">
          <BracketSvg />
        </div>

        {/* Headline */}
        <h1 className="hero-bw-h1">
          Browser APIs,
          <br />
          <RotatingWord />
        </h1>

        {/* Subline */}
        <p className="hero-bw-sub">
          The ultimate TypeScript toolkit for modern web developers.
          <br />
          Clipboard, battery, geolocation, notifications &amp; more —
          <br />
          <strong>zero dependencies</strong>, fully typed, one import away.
        </p>

        {/* Install command */}
        <InstallCommand />

        {/* CTA buttons */}
        <motion.div
          className="hero-bw-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5 }}
        >
          <button className="btn-bw-primary" onClick={() => onNavigate("introduction")}>
            Get Started <ArrowRight size={16} />
          </button>
          <a
            className="btn-bw-outline"
            href="https://github.com/dev-aditya-lab/webdev-power-kit"
            target="_blank"
            rel="noopener"
          >
            <GithubIcon size={16} />
            Star on GitHub
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="hero-bw-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.6 }}
        >
          {STATS.map((s) => (
            <div key={s.l} className="hero-bw-stat">
              <span className="hero-bw-stat-val">
                {s.isNumber && s.v !== null ? (
                  <StatCounter value={s.v as number} />
                ) : (
                  (s as { v: string | number | null; fallback?: string; isNumber: boolean }).isNumber
                    ? ((s as { fallback?: string }).fallback ?? "—")
                    : String(s.v)
                )}
              </span>
              <span className="hero-bw-stat-label">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="hero-scroll-mouse"
        >
          <div className="hero-scroll-dot" />
        </motion.div>
      </motion.div>
    </section>
  );
}
