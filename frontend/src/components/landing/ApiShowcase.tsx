"use client";

import { motion } from "framer-motion";
import {
  Clipboard, BatteryMedium, Bell, Moon, MapPin, Wifi,
  Monitor, Database, Eye, Timer, Vibrate, ShieldAlert,
  KeyRound, Hourglass, SlidersHorizontal, ArrowRight,
  Globe, Code2, Zap, Package, Shield, Layers,
  type LucideIcon,
} from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { MarqueeScroll } from "@/components/ui/MarqueeScroll";

const API_MODULES: {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  color: string;
}[] = [
  { id: "clipboard", label: "Clipboard", icon: Clipboard, desc: "Copy & read clipboard", color: "#a855f7" },
  { id: "battery", label: "Battery", icon: BatteryMedium, desc: "Monitor battery level", color: "#22c55e" },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Native browser alerts", color: "#f97316" },
  { id: "dark-mode", label: "Dark Mode", icon: Moon, desc: "Toggle light/dark theme", color: "#6366f1" },
  { id: "geolocation", label: "Geolocation", icon: MapPin, desc: "GPS coordinates", color: "#ec4899" },
  { id: "network", label: "Network", icon: Wifi, desc: "Online status & speed", color: "#14b8a6" },
  { id: "screen-info", label: "Screen Info", icon: Monitor, desc: "Dimensions & DPR", color: "#3b82f6" },
  { id: "storage", label: "Storage", icon: Database, desc: "Typed localStorage", color: "#8b5cf6" },
  { id: "tab-visibility", label: "Tab Visibility", icon: Eye, desc: "Detect tab focus", color: "#06b6d4" },
  { id: "idle-timer", label: "Idle Timer", icon: Timer, desc: "User inactivity", color: "#d946ef" },
  { id: "vibration", label: "Vibration", icon: Vibrate, desc: "Haptic patterns", color: "#f43f5e" },
  { id: "prevent-close", label: "Prevent Close", icon: ShieldAlert, desc: "Block tab close", color: "#eab308" },
  { id: "otp", label: "OTP Generator", icon: KeyRound, desc: "Cryptographic OTPs", color: "#10b981" },
  { id: "debounce", label: "Debounce", icon: Hourglass, desc: "Debounce calls", color: "#6366f1" },
  { id: "throttle", label: "Throttle", icon: SlidersHorizontal, desc: "Throttle calls", color: "#f59e0b" },
];

const FEATURES: { icon: LucideIcon; title: string; desc: string; color: string }[] = [
  { icon: Package, title: "Zero Dependencies", desc: "No bloat. Pure browser APIs wrapped cleanly. Your bundle stays tiny.", color: "#3B9EFF" },
  { icon: Code2, title: "100% TypeScript", desc: "Full type safety with JSDoc. Perfect IDE autocompletion and IntelliSense.", color: "#a855f7" },
  { icon: Layers, title: "Modular Architecture", desc: "Import only what you need. Fully tree-shakeable for lean production builds.", color: "#22c55e" },
  { icon: Globe, title: "Framework Agnostic", desc: "Works seamlessly with React, Vue, Svelte, Next.js, or vanilla JS.", color: "#f97316" },
  { icon: Shield, title: "Production Ready", desc: "Handles edge cases, unsupported APIs, and throws meaningful errors.", color: "#ec4899" },
  { icon: Zap, title: "Clean API Design", desc: "One-liner functions that just work. No config, no wizards, no boilerplate.", color: "#14b8a6" },
];

// Marquee chip for API names
function ApiChip({ mod, onNavigate }: { mod: typeof API_MODULES[0]; onNavigate: (id: string) => void }) {
  return (
    <motion.button
      onClick={() => onNavigate(mod.id)}
      className="api-marquee-chip"
      style={{ "--chip-color": mod.color } as React.CSSProperties}
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="api-chip-icon-wrap">
        <mod.icon size={14} style={{ color: mod.color }} />
      </span>
      <span>{mod.label}</span>
    </motion.button>
  );
}

interface ApiShowcaseProps {
  onNavigate: (id: string) => void;
}

export function ApiShowcase({ onNavigate }: ApiShowcaseProps) {
  return (
    <section className="api-showcase-section">
      <div className="api-showcase-inner">
        <Reveal>
          <div className="section-eyebrow">
            <Globe size={14} />
            Explore the API
          </div>
          <h2 className="section-title">
            Everything you need,
            <br />
            <span className="text-gradient">nothing you don&apos;t.</span>
          </h2>
          <p className="section-sub">
            15+ browser APIs organized into three clean modules.
            Import only what your project needs — tree-shakeable by design.
          </p>
        </Reveal>

        {/* Marquee of API chips */}
        <div className="api-marquee-wrap">
          <MarqueeScroll speed={35} direction="left">
            {API_MODULES.map((mod) => (
              <ApiChip key={mod.id} mod={mod} onNavigate={onNavigate} />
            ))}
          </MarqueeScroll>
          <div style={{ marginTop: "1.25rem" }}>
            <MarqueeScroll speed={45} direction="right">
              {[...API_MODULES].reverse().map((mod) => (
                <ApiChip key={mod.id} mod={mod} onNavigate={onNavigate} />
              ))}
            </MarqueeScroll>
          </div>
        </div>

        {/* Feature cards with glow */}
        <div className="features-grid">
          {FEATURES.map((feat, i) => (
            <Reveal key={feat.title} delay={i * 0.07}>
              <GlowCard
                glowColor={feat.color.replace("#", "").match(/.{2}/g)!.map(x => parseInt(x, 16)).join(",")}
                className="feature-glow-card"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "1.75rem",
                  height: "100%",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                <motion.div
                  className="feature-card-inner"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="feature-icon-wrap"
                    style={{
                      background: `${feat.color}15`,
                      border: `1px solid ${feat.color}25`,
                    }}
                  >
                    <feat.icon size={22} style={{ color: feat.color }} />
                  </div>
                  <h3 className="feature-card-title">{feat.title}</h3>
                  <p className="feature-card-desc">{feat.desc}</p>
                </motion.div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
