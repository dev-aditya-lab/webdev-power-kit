"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import Image from "next/image";
import {
  Clipboard, BatteryMedium, Bell, Moon, MapPin, Wifi, Monitor, Database,
  Eye, Timer, Vibrate, ShieldAlert, KeyRound, Hourglass, SlidersHorizontal,
  ArrowRight, Copy, Check, ExternalLink, Globe, Code2, Zap,
  Package, Shield, Layers, ChevronDown, Heart, Sparkles, type LucideIcon,
  Terminal, MousePointerClick,
} from "lucide-react";
import { CodeBlock } from "./CodeBlock";

// Custom GitHub SVG icon (lucide removed brand icons)
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════ */

// ── Scroll Reveal wrapper ─────────────────────
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Animated counter ──────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.floor(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, target, {
        duration: 2,
        ease: [0.4, 0, 0.2, 1],
      });
      return controls.stop;
    }
  }, [isInView, motionVal, target]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ── SVG </> path draw animation ───────────────
function CodeBracketSVG() {
  return (
    <motion.div
      className="hero-bracket-wrap"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <svg
        width="100"
        height="80"
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-bracket-svg"
      >
        {/* Left bracket < */}
        <motion.path
          d="M35 12 L8 40 L35 68"
          stroke="url(#bracketGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        {/* Right bracket > */}
        <motion.path
          d="M65 12 L92 40 L65 68"
          stroke="url(#bracketGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease: "easeInOut" }}
        />
        {/* Slash / */}
        <motion.path
          d="M58 8 L42 72"
          stroke="#6ab8ff"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 0.9, delay: 0.65, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="bracketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B9EFF" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      {/* Glow ring behind SVG */}
      <motion.div
        className="hero-bracket-glow"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  );
}

// ── Animated dot grid background ──────────────
function AnimatedGridBg() {
  return (
    <div className="hero-bg">
      <svg
        className="hero-grid-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="dot-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="16" cy="16" r="1" fill="rgba(59,158,255,0.18)" />
          </pattern>
          <radialGradient id="grid-fade" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-grid)"
          mask="url(#grid-mask)"
        />
      </svg>
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />
      {/* Floating orbs */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="hero-orb"
          style={{
            width: 6 + i * 5,
            height: 6 + i * 5,
            left: `${12 + i * 19}%`,
            top: `${18 + (i % 3) * 26}%`,
            background: `rgba(59, 158, 255, ${0.12 + i * 0.04})`,
          }}
          animate={{ y: [0, -22, 0], opacity: [0.25, 0.6, 0.25] }}
          transition={{
            duration: 3.5 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

// ── Install snippet with copy ─────────────────
function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm install webdev-power-kit");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* fallback silently */
    }
  };
  return (
    <motion.button
      className="hero-install-snippet"
      onClick={handleCopy}
      whileHover={{ scale: 1.03, borderColor: "rgba(59,158,255,0.4)" }}
      whileTap={{ scale: 0.97 }}
    >
      <span style={{ color: "var(--text-3)", userSelect: "none" }}>$</span>{" "}
      <span>npm install</span>{" "}
      <span style={{ color: "var(--brand-light)" }}>webdev-power-kit</span>
      <motion.span
        className="hero-install-copy"
        animate={copied ? { scale: [1, 1.3, 1], color: "#22c55e" } : {}}
        transition={{ duration: 0.3 }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </motion.span>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

const API_MODULES: {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  color: string;
  category: "browser" | "utils" | "perf";
}[] = [
  { id: "clipboard", label: "Clipboard", icon: Clipboard, desc: "Copy & read clipboard text", color: "#a855f7", category: "browser" },
  { id: "battery", label: "Battery", icon: BatteryMedium, desc: "Monitor battery level & charging", color: "#22c55e", category: "browser" },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Native browser notifications", color: "#f97316", category: "browser" },
  { id: "dark-mode", label: "Dark Mode", icon: Moon, desc: "Toggle dark / light theme", color: "#6366f1", category: "browser" },
  { id: "geolocation", label: "Geolocation", icon: MapPin, desc: "Get user GPS coordinates", color: "#ec4899", category: "browser" },
  { id: "network", label: "Network", icon: Wifi, desc: "Online status & speed test", color: "#14b8a6", category: "browser" },
  { id: "screen-info", label: "Screen Info", icon: Monitor, desc: "Dimensions, DPR & orientation", color: "#3b82f6", category: "browser" },
  { id: "storage", label: "Storage", icon: Database, desc: "Typed localStorage wrapper", color: "#8b5cf6", category: "browser" },
  { id: "tab-visibility", label: "Tab Visibility", icon: Eye, desc: "Detect tab focus changes", color: "#06b6d4", category: "browser" },
  { id: "idle-timer", label: "Idle Timer", icon: Timer, desc: "User inactivity detection", color: "#d946ef", category: "browser" },
  { id: "vibration", label: "Vibration", icon: Vibrate, desc: "Haptic feedback patterns", color: "#f43f5e", category: "browser" },
  { id: "prevent-close", label: "Prevent Close", icon: ShieldAlert, desc: "Block accidental tab close", color: "#eab308", category: "browser" },
  { id: "otp", label: "OTP Generator", icon: KeyRound, desc: "Cryptographic OTP strings", color: "#10b981", category: "utils" },
  { id: "debounce", label: "Debounce", icon: Hourglass, desc: "Debounce function calls", color: "#6366f1", category: "perf" },
  { id: "throttle", label: "Throttle", icon: SlidersHorizontal, desc: "Throttle function calls", color: "#f59e0b", category: "perf" },
];

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Package, title: "Zero Dependencies", desc: "No bloat. Pure browser APIs wrapped cleanly. Your bundle stays tiny and dependency-free." },
  { icon: Code2, title: "100% TypeScript", desc: "Full type safety with JSDoc comments. Perfect IDE autocompletion and IntelliSense out of the box." },
  { icon: Layers, title: "Modular Architecture", desc: "Import only what you need. Fully tree-shakeable design keeps your production bundle lean." },
  { icon: Globe, title: "Framework Agnostic", desc: "Works seamlessly with React, Vue, Svelte, Next.js, or plain vanilla JavaScript projects." },
  { icon: Shield, title: "Production Ready", desc: "Handles edge cases, unsupported APIs, and throws meaningful errors with graceful fallbacks." },
  { icon: Zap, title: "Clean API Design", desc: "One-liner functions that just work. No config files, no setup wizards, no boilerplate code." },
];

const STEPS = [
  {
    num: "01",
    title: "Install the package",
    desc: "Add webdev-power-kit to your project with npm, yarn, or pnpm.",
    code: "npm install webdev-power-kit",
    lang: "bash",
  },
  {
    num: "02",
    title: "Import what you need",
    desc: "Import only the utilities you need — everything is tree-shakeable.",
    code: `import { copyToClipboard, getBatteryLevel, generateOTP } from 'webdev-power-kit';`,
    lang: "typescript",
  },
  {
    num: "03",
    title: "Use in your app",
    desc: "Call the functions directly. They handle browser compatibility and errors for you.",
    code: `// Copy text to clipboard
await copyToClipboard('Hello, World!');

// Get battery percentage
const level = await getBatteryLevel();
console.log(\`Battery: \${level}%\`);

// Generate a secure 6-digit OTP
const otp = generateOTP(6);
console.log(\`Your OTP: \${otp}\`);`,
    lang: "typescript",
  },
];

const SHOWCASE_TABS = [
  {
    label: "JavaScript",
    lang: "javascript",
    code: `import { copyToClipboard, isOnline, vibrate } from 'webdev-power-kit';

// Copy text with one line
await copyToClipboard('Hello from WebDev Power Kit!');

// Check network status
if (isOnline()) {
  console.log('Connected to the internet');
}

// Trigger haptic feedback
vibrate([200, 100, 200]);`,
  },
  {
    label: "TypeScript",
    lang: "typescript",
    code: `import { 
  copyToClipboard, 
  getBatteryLevel, 
  getItem, 
  setItem 
} from 'webdev-power-kit';

interface User {
  name: string;
  theme: 'light' | 'dark';
}

// Fully typed localStorage
setItem<User>('user', { name: 'Aditya', theme: 'dark' });
const user = getItem<User>('user');
//    ^ User | null — TypeScript knows!

const level: number = await getBatteryLevel();`,
  },
  {
    label: "React",
    lang: "tsx",
    code: `"use client";
import { useState, useEffect } from 'react';
import { isOnline, onNetworkChange, vibrate } from 'webdev-power-kit';

export function NetworkStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(isOnline());
    onNetworkChange((status) => setOnline(status));
  }, []);

  return (
    <div onClick={() => vibrate(100)}>
      {online ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
}`,
  },
];

const CATEGORIES = [
  {
    label: "Browser APIs",
    count: 12,
    color: "#3B9EFF",
    desc: "Clipboard, battery, geolocation, network, storage, and more.",
    icon: Globe,
  },
  {
    label: "Utilities",
    count: 1,
    color: "#a855f7",
    desc: "Cryptographically secure OTP generation.",
    icon: KeyRound,
  },
  {
    label: "Performance",
    count: 2,
    color: "#22c55e",
    desc: "Debounce and throttle for smooth UIs.",
    icon: Zap,
  },
];

/* ═══════════════════════════════════════════════
   Main Landing Component
   ═══════════════════════════════════════════════ */

interface LandingProps {
  onNavigate: (id: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  const [showcaseTab, setShowcaseTab] = useState(0);

  return (
    <div className="landing">
      {/* ─── HERO ─────────────────────────────── */}
      <section className="hero">
        <AnimatedGridBg />

        <div className="hero-inner">
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Sparkles size={14} />
            v2.1.5 · Open Source npm Package
          </motion.div>

          {/* SVG Path Animation */}
          <CodeBracketSVG />

          {/* Headline */}
          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Browser APIs,
            <br />
            <span className="hero-h1-accent">Simplified.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            The ultimate TypeScript toolkit for modern web developers.
            Clipboard, battery, geolocation, notifications &amp; more — zero
            dependencies, fully typed.
          </motion.p>

          {/* Install snippet */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <InstallSnippet />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              className="btn btn-brand"
              onClick={() => onNavigate("introduction")}
              whileHover={{ scale: 1.04, boxShadow: "0 6px 30px rgba(59,158,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started <ArrowRight size={16} />
            </motion.button>
            <motion.a
              href="https://github.com/dev-aditya-lab/webdev-power-kit"
              target="_blank"
              rel="noopener"
              className="btn btn-outline"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <GithubIcon size={16} /> Star on GitHub
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS BAR ────────────────────────── */}
      <section className="stats-bar">
        {[
          { value: 15, suffix: "+", label: "APIs & Utilities" },
          { value: 0, suffix: "", label: "Dependencies", display: "0" },
          { value: 100, suffix: "%", label: "TypeScript" },
          { value: 0, suffix: "", label: "License", display: "MIT" },
        ].map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="stat-item">
              <span className="stat-value">
                {stat.display !== undefined ? (
                  stat.display
                ) : (
                  <Counter target={stat.value} suffix={stat.suffix} />
                )}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ─── API CATEGORIES ───────────────────── */}
      <section className="features-strip">
        <Reveal>
          <div className="section-eyebrow">
            <Terminal size={14} /> Explore the API
          </div>
          <h2 className="section-title">
            Everything you need,<br />nothing you don&apos;t.
          </h2>
          <p className="section-sub">
            Organized into three clean modules. Import only what your project
            needs — tree-shakeable by design.
          </p>
        </Reveal>

        {/* Category overview cards */}
        <div className="why-grid" style={{ marginTop: "2.5rem", marginBottom: "3rem" }}>
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 0.1}>
              <motion.div
                className="why-card"
                style={{ borderColor: `${cat.color}20` }}
                whileHover={{
                  y: -4,
                  borderColor: `${cat.color}40`,
                  boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${cat.color}15`,
                }}
              >
                <div
                  className="why-card-icon-wrap"
                  style={{ background: `${cat.color}15` }}
                >
                  <cat.icon size={22} color={cat.color} />
                </div>
                <div className="why-card-title">{cat.label}</div>
                <div className="why-card-desc">{cat.desc}</div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.75rem",
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-mono)",
                    padding: "0.12rem 0.5rem",
                    borderRadius: "99px",
                    background: `${cat.color}12`,
                    color: cat.color,
                    border: `1px solid ${cat.color}25`,
                  }}
                >
                  {cat.count} {cat.count === 1 ? "module" : "modules"}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Individual API module grid */}
        <div className="module-grid">
          {API_MODULES.map((mod, i) => (
            <Reveal key={mod.id} delay={i * 0.04}>
              <motion.div
                className="module-card"
                onClick={() => onNavigate(mod.id)}
                whileHover={{
                  y: -4,
                  borderColor: `${mod.color}45`,
                  boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${mod.color}10`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="module-card-icon"
                  style={{ background: `${mod.color}12`, borderColor: `${mod.color}25` }}
                >
                  <mod.icon size={20} color={mod.color} />
                </div>
                <div className="module-card-title">{mod.label}</div>
                <div className="module-card-desc">{mod.desc}</div>
                <ArrowRight size={15} className="module-card-arrow" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── WHY THIS KIT ─────────────────────── */}
      <section className="features-strip">
        <Reveal>
          <div className="section-eyebrow">
            <MousePointerClick size={14} /> Why WebDev Power Kit?
          </div>
          <h2 className="section-title">
            Build faster.<br />Ship cleaner.
          </h2>
          <p className="section-sub">
            Stop writing repetitive boilerplate for browser APIs. One import,
            one function call — done.
          </p>
        </Reveal>

        <div className="why-grid">
          {FEATURES.map((feat, i) => (
            <Reveal key={feat.title} delay={i * 0.08}>
              <motion.div
                className="why-card card-glow"
                whileHover={{ y: -3 }}
              >
                <div
                  className="why-card-icon-wrap"
                  style={{ background: "rgba(59,158,255,0.1)" }}
                >
                  <feat.icon size={22} color="var(--brand)" />
                </div>
                <div className="why-card-title">{feat.title}</div>
                <div className="why-card-desc">{feat.desc}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CODE SHOWCASE ────────────────────── */}
      <section className="code-showcase">
        <div className="code-showcase-grid">
          <div>
            <Reveal>
              <div className="section-eyebrow">
                <Code2 size={14} /> See it in Action
              </div>
              <h2 className="section-title" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
                Clean code,<br />every time.
              </h2>
              <p className="section-sub" style={{ marginBottom: "1.5rem" }}>
                One import. One function call. Fully typed. Works in JavaScript,
                TypeScript, and React out of the box.
              </p>
              <motion.button
                className="btn btn-brand"
                onClick={() => onNavigate("quick-start")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                View Quick Start <ArrowRight size={16} />
              </motion.button>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div>
              {/* Tab bar */}
              <div className="tab-bar">
                {SHOWCASE_TABS.map((tab, i) => (
                  <button
                    key={tab.label}
                    className={`tab-btn${showcaseTab === i ? " active" : ""}`}
                    onClick={() => setShowcaseTab(i)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <CodeBlock
                code={SHOWCASE_TABS[showcaseTab].code}
                lang={SHOWCASE_TABS[showcaseTab].lang}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── BEGINNER STEPS ───────────────────── */}
      <section className="steps-section">
        <Reveal>
          <div className="section-eyebrow" style={{ justifyContent: "center", textAlign: "center" }}>
            <Sparkles size={14} /> Getting Started
          </div>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Up and running in<br />under 60 seconds.
          </h2>
          <p className="section-sub" style={{ textAlign: "center", margin: "0 auto" }}>
            Three simple steps. No configuration files, no CLI tools, no build
            plugins required.
          </p>
        </Reveal>

        <div className="step-list">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.12}>
              <div className="step-item">
                <motion.div
                  className="step-number"
                  whileHover={{ scale: 1.1, borderColor: "var(--brand)" }}
                >
                  {step.num}
                </motion.div>
                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                  <CodeBlock code={step.code} lang={step.lang} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── AUTHOR SECTION ───────────────────── */}
      <section className="author-section">
        <div className="author-section-bg" />

        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>
              <Heart size={14} /> Meet the Creator
            </div>
            <h2 className="section-title">
              Built with passion by<br />
              <span style={{ color: "var(--brand)" }}>Aditya Kumar Gupta</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            className="author-card"
            whileHover={{ borderColor: "rgba(59,158,255,0.5)" }}
          >
            <motion.div
              className="author-avatar"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/webdev logo 1x1.png"
                alt="Aditya Kumar Gupta"
                width={80}
                height={80}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </motion.div>
            <div>
              <h3 className="author-name">Aditya Kumar Gupta</h3>
              <p className="author-handle">
                <code>@dev-aditya-lab</code>
              </p>
              <p className="author-bio">
                Computer Science Engineer &amp; passionate Web Developer.
                Creator of <strong style={{ color: "var(--text-1)" }}>webdev-power-kit</strong> and
                other open-source tools. Building developer tools that are
                clean, typed, and production-ready — so you can ship faster.
              </p>
              <div className="author-links">
                <motion.a
                  href="https://devaditya.dev"
                  target="_blank"
                  rel="noopener"
                  className="author-link"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Globe size={16} className="author-link-icon" />
                  devaditya.dev
                </motion.a>
                <motion.a
                  href="https://github.com/dev-aditya-lab"
                  target="_blank"
                  rel="noopener"
                  className="author-link"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <GithubIcon size={16} />
                  GitHub
                </motion.a>
                <motion.a
                  href="https://www.npmjs.com/package/webdev-power-kit"
                  target="_blank"
                  rel="noopener"
                  className="author-link"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Package size={16} className="author-link-icon" />
                  npm
                </motion.a>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </section>

      {/* ─── FOOTER ───────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <Image
            src="/webdev logo long.png"
            alt="WebDev Power Kit"
            width={140}
            height={28}
            className="footer-logo"
          />
          <p className="footer-text">
            © {new Date().getFullYear()} WebDev Power Kit · Built with{" "}
            <Heart size={12} style={{ display: "inline", verticalAlign: "-1px", color: "#f43f5e" }} />{" "}
            by{" "}
            <a
              href="https://devaditya.dev"
              target="_blank"
              rel="noopener"
              style={{ color: "var(--brand-light)", textDecoration: "none" }}
            >
              Aditya Kumar Gupta
            </a>
          </p>
          <div className="footer-links">
            <a href="https://github.com/dev-aditya-lab/webdev-power-kit" target="_blank" rel="noopener">
              GitHub
            </a>
            <a href="https://www.npmjs.com/package/webdev-power-kit" target="_blank" rel="noopener">
              npm
            </a>
            <a href="https://devaditya.dev" target="_blank" rel="noopener">
              Portfolio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
