"use client";

import { useState, useEffect, useRef } from "react";
import {
  Flame,
  ArrowRight,
  DollarSign,
  Star,
  StarHalf,
  TrendingUp,
  Headphones,
  Bell,
  RefreshCw,
  Clipboard,
  FileText,
  Search,
  Building,
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
  Key,
  ListCollapse,
  Globe,
  Loader2,
  Cpu,
  Settings,
  MoreVertical,
  Clock3,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";

/* ── Types ─────────────────────────────────────── */
type FlowTab = "lead" | "meeting" | "follow" | "sync" | "reporting" | "drafting";

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

/* ── Diagram content (high fidelity AI Agent workflows) ── */
const DIAGRAMS: Record<FlowTab, FlowData> = {
  lead: {
    input: {
      title: "New Lead Webhook",
      time: "0.0 sec",
      desc: "Triggers automatically on user submission form.",
      icon: TrendingUp,
    },
    action: {
      title: "Lead Enrichment",
      time: "4.2 sec",
      desc: "Analyze lead profiles against target company parameters.",
      details: [
        { text: "Clearbit API lookup", icon: Search, iconColor: "#2563eb" },
        { text: "HubSpot data matching", icon: Building, iconColor: "#ea580c" },
      ],
      extra: (
        <div className="hs-loader-pill">
          <span>CRM validation...</span>
          <Loader2 size={13} className="hs-loader-spinner" />
        </div>
      ),
      icon: Cpu,
      modelChip: "GPT-4-1 Mini",
    },
    output: {
      title: "Enriched Record",
      time: "0.8 sec",
      desc: "Profile updated and assigned to representative.",
      details: [
        { text: "Salesforce updated", icon: Check, iconColor: "#16a34a" },
        { text: "Slack alert dispatched", icon: MessageSquare, iconColor: "#36c5f0" },
      ],
      icon: CheckCircle2,
    },
  },
  meeting: {
    input: {
      title: "Calendar Check",
      time: "0.0 sec",
      desc: "Detects upcoming meetings 15 minutes prior.",
      icon: Calendar,
    },
    action: {
      title: "Briefing Research",
      time: "12 sec",
      desc: "Retrieves context for all meeting attendees.",
      details: [
        { text: "LinkedIn profile lookup", icon: User, iconColor: "#0077b5" },
        { text: "Gmail thread history digest", icon: Mail, iconColor: "#ea4335" },
      ],
      extra: (
        <div className="hs-loader-pill">
          <span>Generating briefing note...</span>
          <Loader2 size={13} className="hs-loader-spinner" />
        </div>
      ),
      icon: Cpu,
      modelChip: "Claude 3.5 Sonnet",
    },
    output: {
      title: "Brief Prepared",
      time: "1.5 sec",
      desc: "Talking points compiled and uploaded.",
      details: [
        { text: "Notion brief uploaded", icon: FileText, iconColor: "#111" },
        { text: "Email summary dispatched", icon: Mail, iconColor: "#ea4335" },
      ],
      icon: CheckCircle2,
    },
  },
  follow: {
    input: {
      title: "Email Ingestion",
      time: "0.0 sec",
      desc: "Listens for customer support and sales emails.",
      icon: Mail,
    },
    action: {
      title: "Intent Classifier",
      time: "2.1 sec",
      desc: "Categorizes email intent and sentiment scores.",
      details: [
        { text: "Urgency evaluation", icon: AlertTriangle, iconColor: "#ea580c" },
        { text: "Draft reply generation", icon: Pencil, iconColor: "#2563eb" },
      ],
      icon: Cpu,
      modelChip: "GPT-4-1 Mini",
    },
    output: {
      title: "Auto-Draft Ready",
      time: "0.4 sec",
      desc: "Pre-written response queued for review.",
      details: [
        { text: "Gmail draft saved", icon: Mail, iconColor: "#ea4335" },
        { text: "Assigned alert in Slack", icon: MessageSquare, iconColor: "#36c5f0" },
      ],
      icon: CheckCircle2,
    },
  },
  sync: {
    input: {
      title: "Database Trigger",
      time: "0.0 sec",
      desc: "Detects new record insertions in PostgreSQL.",
      icon: Database,
    },
    action: {
      title: "Schema Transformer",
      time: "0.9 sec",
      desc: "Validates, maps, and normalizes columns.",
      details: [
        { text: "Type validation checks", icon: Code, iconColor: "#2563eb" },
        { text: "PII scrubbing & hash key", icon: ShieldCheck, iconColor: "#16a34a" },
      ],
      extra: (
        <div className="hs-loader-pill">
          <span>Encrypting payload...</span>
          <Loader2 size={13} className="hs-loader-spinner" />
        </div>
      ),
      icon: Cpu,
      modelChip: "Llama 3.1 70B",
    },
    output: {
      title: "Databases Synced",
      time: "0.2 sec",
      desc: "Target warehouses successfully updated.",
      details: [
        { text: "RDS PostgreSQL upsert", icon: HardDrive, iconColor: "#2563eb" },
        { text: "BigQuery sync ingestion", icon: BarChart, iconColor: "#ea4335" },
      ],
      icon: CheckCircle2,
    },
  },
  reporting: {
    input: {
      title: "Scheduled Trigger",
      time: "0.0 sec",
      desc: "The agent activates the report workflow.",
      icon: Clock3,
    },
    action: {
      title: "Data Aggregation",
      time: "18 sec",
      desc: "Collecting metrics and compiling report fields.",
      details: [
        { text: "Collecting metrics", icon: FileText, iconColor: "#16a34a" },
        { text: "Analyzing data", icon: TrendingUp, iconColor: "#2563eb" },
      ],
      extra: (
        <div className="hs-loader-pill">
          <span>Insight generation...</span>
          <Loader2 size={13} className="hs-loader-spinner" />
        </div>
      ),
      icon: Cpu,
      modelChip: "GPT-4-1 Mini",
    },
    output: {
      title: "Report Formatted",
      time: "1.1 sec",
      desc: "Automated weekly or monthly performance reports.",
      details: [
        { text: "Report posted", icon: Mail, iconColor: "#ea4335" },
        { text: "Report posted", icon: MessageSquare, iconColor: "#36c5f0" },
      ],
      icon: CheckCircle2,
    },
  },
  drafting: {
    input: {
      title: "Topic Submission",
      time: "0.0 sec",
      desc: "Slack command triggers article draft request.",
      icon: MessageSquare,
    },
    action: {
      title: "SEO & Copy Writing",
      time: "24 sec",
      desc: "Researches context and drafts content structure.",
      details: [
        { text: "Keyword analysis", icon: Key, iconColor: "#ea580c" },
        { text: "Outline structure draft", icon: ListCollapse, iconColor: "#2563eb" },
      ],
      extra: (
        <div className="hs-loader-pill">
          <span>Drafting 800-word post...</span>
          <Loader2 size={13} className="hs-loader-spinner" />
        </div>
      ),
      icon: Cpu,
      modelChip: "Claude 3.5 Sonnet",
    },
    output: {
      title: "Ready to Publish",
      time: "1.8 sec",
      desc: "CMS draft and corresponding social copy ready.",
      details: [
        { text: "Ghost CMS draft saved", icon: Globe, iconColor: "#ea580c" },
        { text: "X/Twitter posts drafted", icon: MessageSquare, iconColor: "#111" },
      ],
      icon: CheckCircle2,
    },
  },
};

const TAB_LABELS: Record<FlowTab, { label: string; icon: React.ComponentType<{ size?: number }> }> = {
  lead: { label: "Lead Qualifier", icon: TrendingUp },
  meeting: { label: "Meeting Prep", icon: Headphones },
  follow: { label: "Follow-ups", icon: Bell },
  sync: { label: "Data Sync", icon: RefreshCw },
  reporting: { label: "Reporting", icon: Clipboard },
  drafting: { label: "Content Drafting", icon: FileText },
};

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
    action: { label: "Action", icon: Cpu, cls: "hs-tag--orange" },
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
  const [activeTab, setActiveTab] = useState<FlowTab>("reporting");
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
          <span className="hs-badge-text">Introducing AI Agent</span>
        </div>

        <h1 className="hs-h1 hs-reveal">
          Work with AI agent
          <br />
          that handles your daily operations
        </h1>

        <p className="hs-sub hs-reveal">
          Automate routine tasks, connect your tools, and let your AI agent coordinate
          workflows so you can focus on strategy, not busywork.
        </p>

        <div className="hs-actions hs-reveal">
          <button className="hs-btn-primary" onClick={() => onNavigate("introduction")}>
            Get Started
            <ArrowRight size={15} />
          </button>
          <button className="hs-btn-outline" onClick={() => onNavigate("pricing")}>
            <DollarSign size={15} />
            View Pricing
          </button>
        </div>

        <div className="hs-proof hs-reveal">
          <div className="hs-avatars">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar 1" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar 2" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar 3" />
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar 4" />
          </div>
          <span className="hs-proof-text">
            <strong>12K+</strong> Users
          </span>
          <span className="hs-proof-divider" />
          <span className="hs-proof-rating">
            <span className="hs-stars">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <StarHalf size={14} fill="currentColor" />
            </span>
            <strong>4.5</strong> Ratings
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
