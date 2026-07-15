"use client";

import { useEffect, useRef } from "react";
import {
  Clipboard, BatteryMedium, Bell, Moon, MapPin, Wifi,
  Monitor, Database, Eye, Timer, Vibrate, ShieldAlert,
  KeyRound, Hourglass, SlidersHorizontal,
  Globe, Code2, Zap, Package, Shield, Layers,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MarqueeScroll } from "@/components/ui/MarqueeScroll";

gsap.registerPlugin(ScrollTrigger);

const API_MODULES: {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}[] = [
  { id: "clipboard", label: "Clipboard", icon: Clipboard, desc: "Copy & read clipboard" },
  { id: "battery", label: "Battery", icon: BatteryMedium, desc: "Monitor battery level" },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Native browser alerts" },
  { id: "dark-mode", label: "Dark Mode", icon: Moon, desc: "Toggle light/dark theme" },
  { id: "geolocation", label: "Geolocation", icon: MapPin, desc: "GPS coordinates" },
  { id: "network", label: "Network", icon: Wifi, desc: "Online status & speed" },
  { id: "screen-info", label: "Screen Info", icon: Monitor, desc: "Dimensions & DPR" },
  { id: "storage", label: "Storage", icon: Database, desc: "Typed localStorage" },
  { id: "tab-visibility", label: "Tab Visibility", icon: Eye, desc: "Detect tab focus" },
  { id: "idle-timer", label: "Idle Timer", icon: Timer, desc: "User inactivity" },
  { id: "vibration", label: "Vibration", icon: Vibrate, desc: "Haptic patterns" },
  { id: "prevent-close", label: "Prevent Close", icon: ShieldAlert, desc: "Block tab close" },
  { id: "otp", label: "OTP Generator", icon: KeyRound, desc: "Cryptographic OTPs" },
  { id: "debounce", label: "Debounce", icon: Hourglass, desc: "Debounce calls" },
  { id: "throttle", label: "Throttle", icon: SlidersHorizontal, desc: "Throttle calls" },
];

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Package, title: "Zero Dependencies", desc: "No bloat. Pure browser APIs wrapped cleanly. Your bundle stays tiny." },
  { icon: Code2, title: "100% TypeScript", desc: "Full type safety with JSDoc. Perfect IDE autocompletion and IntelliSense." },
  { icon: Layers, title: "Modular Architecture", desc: "Import only what you need. Fully tree-shakeable for lean production builds." },
  { icon: Globe, title: "Framework Agnostic", desc: "Works seamlessly with React, Vue, Svelte, Next.js, or vanilla JS." },
  { icon: Shield, title: "Production Ready", desc: "Handles edge cases, unsupported APIs, and throws meaningful errors." },
  { icon: Zap, title: "Clean API Design", desc: "One-liner functions that just work. No config, no wizards, no boilerplate." },
];

function ApiChip({ mod, onNavigate }: { mod: typeof API_MODULES[0]; onNavigate: (id: string) => void }) {
  return (
    <button
      onClick={() => onNavigate(mod.id)}
      className="api-chip-bw"
      aria-label={`Go to ${mod.label}`}
    >
      <mod.icon size={13} />
      <span>{mod.label}</span>
    </button>
  );
}

interface ApiShowcaseProps {
  onNavigate: (id: string) => void;
}

export function ApiShowcase({ onNavigate }: ApiShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const children = Array.from(grid.children);
    // Set initial state
    gsap.set(children, { opacity: 0, y: 36 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power3.out",
            });
            observer.unobserve(grid);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="api-showcase-bw">
      <div className="api-showcase-bw-inner">
        {/* Heading */}
        <div className="api-showcase-heading">
          <p className="section-eyebrow" style={{ justifyContent: "flex-start" }}>
            <Globe size={13} />
            Explore the API
          </p>
          <h2 className="api-showcase-h2">
            Everything you need,<br />
            <span className="hs-accent">nothing you don&apos;t.</span>
          </h2>
          <p className="api-showcase-sub">
            15+ browser APIs organized into clean modules.
            Import only what your project needs — tree-shakeable by design.
          </p>
        </div>

        {/* B&W marquee chips */}
        <div className="api-marquee-bw-wrap">
          <MarqueeScroll speed={35} direction="left">
            {API_MODULES.map((mod) => (
              <ApiChip key={mod.id} mod={mod} onNavigate={onNavigate} />
            ))}
          </MarqueeScroll>
          <div style={{ marginTop: "1rem" }}>
            <MarqueeScroll speed={45} direction="right">
              {[...API_MODULES].reverse().map((mod) => (
                <ApiChip key={mod.id} mod={mod} onNavigate={onNavigate} />
              ))}
            </MarqueeScroll>
          </div>
        </div>

        {/* Feature cards */}
        <div ref={gridRef} className="features-bw-grid">
          {FEATURES.map((feat) => (
            <div key={feat.title} className="feature-bw-card">
              <div className="feature-bw-icon">
                <feat.icon size={20} />
              </div>
              <h3 className="feature-bw-title">{feat.title}</h3>
              <p className="feature-bw-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
