"use client";

import { useState, useEffect, useRef } from "react";
import {
  Flame,
  ArrowRight,
  Star,
  TrendingUp,
  Bell,
  RefreshCw,
  Clipboard,
  FileText,
  Search,
  Check,
  MessageSquare,
  Mail,
  Calendar,
  User,
  AlertTriangle,
  Pencil,
  Database,
  Code,
  ShieldCheck,
  HardDrive,
  BarChart,
  Settings,
  MoreVertical,
  Clock3,
  PlayCircle,
  CheckCircle2,
  BatteryMedium,
  MousePointerClick,
  Monitor,
} from "lucide-react";
import gsap from "gsap";

/* ── Types ─────────────────────────────────────── */
type FlowTab = "clipboard" | "battery" | "notifications" | "network" | "storage" | "idle";

interface FlowDetail {
  text: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor?: string;
}

interface FlowNodeData {
  title: string;
  time: string;
  desc: string;
  details?: (string | FlowDetail)[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  extra?: React.ReactNode;
  modelChip?: string;
}

interface FlowData {
  input: FlowNodeData;
  action: FlowNodeData;
  output: FlowNodeData;
}

/* ── Diagram content (high fidelity WebDev Power Kit workflows) ── */
const DIAGRAMS: Record<FlowTab, FlowData> = {
  clipboard: {
    input: {
      title: "Trigger Event",
      time: "0.0 sec",
      desc: "User clicks 'Copy Link' button on a webpage.",
      icon: MousePointerClick,
    },
    action: {
      title: "copyToClipboard()",
      time: "0.05 sec",
      desc: "Executes Async Clipboard API write with fallback support.",
      details: [
        { text: "Fallback to execCommand if unsupported", icon: Code, iconColor: "#2563eb" },
        { text: "Handles permission prompt states", icon: ShieldCheck, iconColor: "#16a34a" },
      ],
      icon: CpuIcon,
      modelChip: "Browser Engine",
    },
    output: {
      title: "Clipboard Sync",
      time: "0.08 sec",
      desc: "Successfully copied to native clipboard.",
      details: [
        { text: "Trigger local success toast", icon: Check, iconColor: "#16a34a" },
        { text: "Allow user paste action", icon: Clipboard, iconColor: "#2563eb" },
      ],
      icon: CheckCircle2,
    },
  },
  battery: {
    input: {
      title: "State Shift",
      time: "0.0 sec",
      desc: "Device unplugged (discharging state detected).",
      icon: BatteryMedium,
    },
    action: {
      title: "getBatteryInfo()",
      time: "0.12 sec",
      desc: "Queries Battery Manager API and hooks listeners.",
      details: [
        { text: "Tracks dischargingTime remaining", icon: Clock3, iconColor: "#ea580c" },
        { text: "Listens to levelchange events", icon: RefreshCw, iconColor: "#2563eb" },
      ],
      icon: CpuIcon,
      modelChip: "Battery API",
    },
    output: {
      title: "Status Broadcasted",
      time: "0.15 sec",
      desc: "App adjusts background sync and heavy assets.",
      details: [
        { text: "Low power mode enabled", icon: AlertTriangle, iconColor: "#ea580c" },
        { text: "Updated UI level display", icon: Check, iconColor: "#16a34a" },
      ],
      icon: CheckCircle2,
    },
  },
  notifications: {
    input: {
      title: "Alert Ingestion",
      time: "0.0 sec",
      desc: "New notification triggered by app state change.",
      icon: Bell,
    },
    action: {
      title: "showNotification()",
      time: "0.22 sec",
      desc: "Validates permissions and sends push payload.",
      details: [
        { text: "Requests permission if default", icon: ShieldCheck, iconColor: "#16a34a" },
        { text: "Configures action buttons & badge", icon: Settings, iconColor: "#2563eb" },
      ],
      icon: CpuIcon,
      modelChip: "Push Manager",
    },
    output: {
      title: "Alert Displayed",
      time: "0.25 sec",
      desc: "Native system notification shown to the user.",
      details: [
        { text: "Notification shown in OS drawer", icon: Bell, iconColor: "#ea580c" },
        { text: "OnClick callbacks bound", icon: Check, iconColor: "#16a34a" },
      ],
      icon: CheckCircle2,
    },
  },
  network: {
    input: {
      title: "Connectivity Shift",
      time: "0.0 sec",
      desc: "User connection drops (offline status detected).",
      icon: PlayCircle,
    },
    action: {
      title: "onNetworkChange()",
      time: "0.18 sec",
      desc: "Observes network speed and offline status changes.",
      details: [
        { text: "Starts heartbeat health check", icon: RefreshCw, iconColor: "#2563eb" },
        { text: "Verifies gateway routing status", icon: Monitor, iconColor: "#ea580c" },
      ],
      icon: CpuIcon,
      modelChip: "Network Info",
    },
    output: {
      title: "UI Fallback Safe",
      time: "0.22 sec",
      desc: "App switches to offline recovery mode layout.",
      details: [
        { text: "Displays offline alert banner", icon: AlertTriangle, iconColor: "#ea580c" },
        { text: "Queues API calls in IndexedDB", icon: Database, iconColor: "#16a34a" },
      ],
      icon: CheckCircle2,
    },
  },
  storage: {
    input: {
      title: "Write Triggered",
      time: "0.0 sec",
      desc: "Application triggers user preference changes.",
      icon: Database,
    },
    action: {
      title: "setItem<UserPrefs>()",
      time: "0.02 sec",
      desc: "Serializes and writes preferences to localStorage.",
      details: [
        { text: "Runs strict generic validation", icon: Code, iconColor: "#2563eb" },
        { text: "Automatic JSON serialization", icon: Database, iconColor: "#16a34a" },
      ],
      icon: CpuIcon,
      modelChip: "LocalStore Sync",
    },
    output: {
      title: "LocalStorage Synced",
      time: "0.03 sec",
      desc: "Browser storage synced across active frames.",
      details: [
        { text: "Dispatches storage sync event", icon: RefreshCw, iconColor: "#2563eb" },
        { text: "Locks theme state values", icon: Check, iconColor: "#16a34a" },
      ],
      icon: CheckCircle2,
    },
  },
  idle: {
    input: {
      title: "Inactivity Shift",
      time: "0.0 sec",
      desc: "User stops interacting with mouse, key, or scroll.",
      icon: Clock3,
    },
    action: {
      title: "onIdle(30000, logout)",
      time: "30.0 sec",
      desc: "Sets up activity listeners and debounces timers.",
      details: [
        { text: "Hooks keydown & pointer events", icon: Code, iconColor: "#2563eb" },
        { text: "Auto-debounces active triggers", icon: Clock3, iconColor: "#ea580c" },
      ],
      icon: CpuIcon,
      modelChip: "Idle Tracker",
    },
    output: {
      title: "Session Reset",
      time: "30.1 sec",
      desc: "Secures application state and destroys cookie tokens.",
      details: [
        { text: "Clears sensitive memory cache", icon: Database, iconColor: "#16a34a" },
        { text: "Redirects to secure login screen", icon: Check, iconColor: "#2563eb" },
      ],
      icon: CheckCircle2,
    },
  },
};

const TAB_LABELS: Record<FlowTab, { label: string; icon: React.ComponentType<{ size?: number }> }> = {
  clipboard: { label: "Clipboard Sync", icon: Clipboard },
  battery: { label: "Battery Monitor", icon: BatteryMedium },
  notifications: { label: "Notification Push", icon: Bell },
  network: { label: "Network Observer", icon: RefreshCw },
  storage: { label: "Storage State", icon: Database },
  idle: { label: "Auto-Logout", icon: Clock3 },
};

/* Wrapper icon for Custom actions to replace generic Cpu */
function CpuIcon({ size = 16, className }: { size?: number; className?: string }) {
  return <Settings size={size} className={className} />;
}

/* ── Flow node (Input / Action / Output card) ──── */
function FlowNode({
  role,
  data,
}: {
  role: "input" | "action" | "output";
  data: FlowNodeData;
}) {
  const tag = {
    input: { label: "Input", icon: PlayCircle, cls: "hs-tag--blue" },
    action: { label: "Action", icon: CpuIcon, cls: "hs-tag--orange" },
    output: { label: "Output", icon: CheckCircle2, cls: "hs-tag--green" },
  }[role];
  const TagIcon = tag.icon;
  const Icon = data.icon;

  return (
    <div className={`hs-node hs-node--${role}`}>
      <div className={`hs-tag ${tag.cls}`}>
        <TagIcon size={13} />
        <span>{tag.label}</span>
      </div>

      <div className="hs-card">
        <div className="hs-card-head">
          <span className="hs-card-icon">
            <Icon size={16} />
          </span>
          <h3 className="hs-card-title">{data.title}</h3>
          <MoreVertical size={15} className="hs-card-kebab" />
        </div>

        <p className="hs-card-desc">{data.desc}</p>

        {data.details && (
          <ul className="hs-subcard">
            {data.details.map((d, i) => {
              const isObj = typeof d === "object";
              const text = isObj ? (d as FlowDetail).text : (d as string);
              const DetailIcon = isObj ? (d as FlowDetail).icon : null;
              const iconColor = isObj ? (d as FlowDetail).iconColor : undefined;

              return (
                <li key={i}>
                  {DetailIcon ? (
                    <span className="hs-subcard-icon" style={{ color: iconColor }}>
                      <DetailIcon size={13} />
                    </span>
                  ) : (
                    <span className="hs-subdot" />
                  )}
                  {text}
                </li>
              );
            })}
          </ul>
        )}

        {data.extra}

        <div className="hs-card-foot">
          {data.modelChip && (
            <span className="hs-chip-model">
              <Settings size={11} />
              {data.modelChip}
            </span>
          )}
          <span className="hs-chip">
            <Clock3 size={12} />
            {data.time}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Connector with animated dash + travelling pulse ── */
function Connector() {
  return (
    <div className="hs-connector" aria-hidden="true">
      <svg viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
        <path
          className="hs-flow-path"
          d="M 0 10 L 93 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <polygon points="92,6.5 99,10 92,13.5" fill="currentColor" />
        <circle className="hs-flow-pulse" r="2.6" cy="10" cx="0" fill="currentColor" />
      </svg>
    </div>
  );
}

interface HeroProps {
  onNavigate: (id: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [activeTab, setActiveTab] = useState<FlowTab>("clipboard");
  const topRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  /* Detect prefers-reduced-motion once */
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* ── Act 1 · Entrance: copy cascades in ──────── */
  useEffect(() => {
    const el = topRef.current;
    if (!el || reduced.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hs-reveal", {
        opacity: 0,
        y: 26,
        filter: "blur(6px)",
        stagger: 0.09,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "filter",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* ── Act 2 · Diagram: build, draw, breathe ───── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (reduced.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Nodes assemble left → right
      tl.fromTo(
        ".hs-node",
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.14, duration: 0.55 }
      );

      // Connectors draw themselves
      canvas.querySelectorAll<SVGPathElement>(".hs-flow-path").forEach((path, i) => {
        const len = path.getTotalLength();
        tl.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" },
          0.35 + i * 0.18
        );
        // After the draw, settle into an endless dash crawl
        tl.set(path, { strokeDasharray: "5 5" });
        tl.to(
          path,
          { strokeDashoffset: -20, duration: 1.4, ease: "none", repeat: -1 },
          ">"
        );
      });

      // A data pulse travels along each connector, forever
      canvas.querySelectorAll<SVGCircleElement>(".hs-flow-pulse").forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { attr: { cx: 0 }, opacity: 0 },
          {
            attr: { cx: 96 },
            opacity: 1,
            duration: 1.6,
            delay: 1 + i * 0.8,
            repeat: -1,
            repeatDelay: 1.2,
            ease: "power1.inOut",
          }
        );
      });

      // Ambient float — the canvas feels alive, barely
      gsap.to(".hs-node", {
        y: "-=5",
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.5, from: "center" },
      });
    }, canvas);

    return () => ctx.revert();
  }, [activeTab]);

  const activeData = DIAGRAMS[activeTab];

  return (
    <section className="hs">
      {/* ── Hero copy ─────────────────────────── */}
      <div ref={topRef} className="hs-top">
        <div className="hs-badge hs-reveal">
          <span className="hs-badge-new">
            <Flame size={12} />
            New
          </span>
          <span className="hs-badge-text">v2.2.0 Stable Release</span>
        </div>

        <h1 className="hs-h1 hs-reveal">
          Orchestrate Browser APIs
          <br />
          with zero-dependency wrappers.
        </h1>

        <p className="hs-sub hs-reveal">
          A lightweight toolkit of 15+ typed browser wrappers. Automate tab state
          checks, battery logs, and network fallbacks without writing custom event
          listeners.
        </p>

        <div className="hs-actions hs-reveal">
          <button className="hs-btn-primary" onClick={() => onNavigate("introduction")}>
            Get Started
            <ArrowRight size={15} />
          </button>
          <a
            className="hs-btn-outline"
            href="https://www.npmjs.com/package/webdev-power-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on npm
          </a>
        </div>

        <div className="hs-proof hs-reveal">
          <div className="hs-avatars">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar 1" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar 2" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar 3" />
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar 4" />
          </div>
          <span className="hs-proof-text">
            <strong>5K+</strong> Downloads
          </span>
          <span className="hs-proof-divider" />
          <span className="hs-proof-rating">
            <span className="hs-stars">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </span>
            <strong>v2.2.0</strong> Stable
          </span>
        </div>
      </div>

      {/* ── Full-bleed tab strip ──────────────── */}
      <div className="hs-tabbar" role="tablist" aria-label="Live examples">
        {(Object.keys(TAB_LABELS) as FlowTab[]).map((tab) => {
          const { label, icon: TabIcon } = TAB_LABELS[tab];
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={active}
              className={`hs-tab${active ? " is-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <TabIcon size={16} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Dotted flow canvas ────────────────── */}
      <div ref={canvasRef} className="hs-canvas">
        <div className="hs-flow" key={activeTab}>
          <FlowNode role="input" data={activeData.input} />
          <Connector />
          <FlowNode role="action" data={activeData.action} />
          <Connector />
          <FlowNode role="output" data={activeData.output} />
        </div>
      </div>
    </section>
  );
}
