"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clipboard, BatteryMedium, Bell, Moon, MapPin, Wifi,
  Monitor, Database, Eye, Timer, Vibrate, ShieldAlert,
  KeyRound, Hourglass, SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const API_CARDS: {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  snippet: string;
}[] = [
  {
    id: "clipboard", label: "Clipboard", icon: Clipboard,
    desc: "Read and write clipboard contents with one call.",
    snippet: "await copyToClipboard('Hello!')",
  },
  {
    id: "battery", label: "Battery", icon: BatteryMedium,
    desc: "Monitor device battery level and charging state.",
    snippet: "const level = await getBatteryLevel()",
  },
  {
    id: "notifications", label: "Notifications", icon: Bell,
    desc: "Trigger native browser push notifications instantly.",
    snippet: "sendNotification('Title', { body: 'msg' })",
  },
  {
    id: "dark-mode", label: "Dark Mode", icon: Moon,
    desc: "Detect and toggle the user's preferred colour scheme.",
    snippet: "const dark = isDarkMode()",
  },
  {
    id: "geolocation", label: "Geolocation", icon: MapPin,
    desc: "Get accurate GPS coordinates from the browser.",
    snippet: "const pos = await getGeolocation()",
  },
  {
    id: "network", label: "Network", icon: Wifi,
    desc: "Check online status and connection type in real-time.",
    snippet: "const online = isOnline()",
  },
  {
    id: "screen-info", label: "Screen Info", icon: Monitor,
    desc: "Read viewport dimensions and device pixel ratio.",
    snippet: "const { width, dpr } = getScreenInfo()",
  },
  {
    id: "storage", label: "Storage", icon: Database,
    desc: "Typed localStorage wrapper with JSON serialisation.",
    snippet: "setItem<User>('key', value)",
  },
  {
    id: "tab-visibility", label: "Tab Visibility", icon: Eye,
    desc: "Detect when the user switches or hides the tab.",
    snippet: "onVisibilityChange(cb)",
  },
  {
    id: "idle-timer", label: "Idle Timer", icon: Timer,
    desc: "Trigger callbacks after user inactivity.",
    snippet: "onIdle(30_000, () => logout())",
  },
  {
    id: "vibration", label: "Vibration", icon: Vibrate,
    desc: "Haptic feedback with custom vibration patterns.",
    snippet: "vibrate([200, 100, 200])",
  },
  {
    id: "prevent-close", label: "Prevent Close", icon: ShieldAlert,
    desc: "Block accidental tab or window closes.",
    snippet: "enablePreventClose()",
  },
  {
    id: "otp", label: "OTP Generator", icon: KeyRound,
    desc: "Generate cryptographically secure one-time passwords.",
    snippet: "const otp = generateOTP(6)",
  },
  {
    id: "debounce", label: "Debounce", icon: Hourglass,
    desc: "Debounce any function to limit call frequency.",
    snippet: "const fn = debounce(search, 300)",
  },
  {
    id: "throttle", label: "Throttle", icon: SlidersHorizontal,
    desc: "Throttle calls to a maximum rate per interval.",
    snippet: "const fn = throttle(scroll, 100)",
  },
];

interface HorizontalScrollProps {
  onNavigate: (id: string) => void;
}

export function HorizontalScroll({ onNavigate }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Amount to scroll: total track width minus viewport width
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        gsap.to(track, {
          x: () => getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 768px)", () => {
        // Reset x transformation on mobile devices so CSS takes over
        gsap.set(track, { x: 0 });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="horiz-scroll-section">
      {/* Section heading — pinned above the scroll track */}
      <div className="horiz-scroll-header">
        <p className="section-eyebrow" style={{ justifyContent: "flex-start" }}>
          <span className="hs-eyebrow-dot" />
          Drag or scroll to explore
        </p>
        <h2 className="horiz-scroll-h2">
          15 APIs.<br />
          <span className="hs-accent">One import.</span>
        </h2>
      </div>

      {/* Horizontal track */}
      <div className="horiz-scroll-overflow">
        <div ref={trackRef} className="horiz-scroll-track">
          {API_CARDS.map((card) => (
            <button
              key={card.id}
              className="hs-card"
              onClick={() => onNavigate(card.id)}
              aria-label={`Navigate to ${card.label}`}
            >
              <div className="hs-card-icon">
                <card.icon size={28} />
              </div>
              <h3 className="hs-card-title">{card.label}</h3>
              <p className="hs-card-desc">{card.desc}</p>
              <code className="hs-card-snippet">{card.snippet}</code>
              <span className="hs-card-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
