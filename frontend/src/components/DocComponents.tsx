"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Lightbulb, Info } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

export interface ParamRow {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  defaultValue?: string;
}

export interface BrowserItem {
  name: string;
  status: "yes" | "no" | "partial";
}

interface CalloutProps {
  type: "info" | "warn" | "tip" | "note";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const map = {
    info: { icon: Info, cls: "callout-info" },
    warn: { icon: AlertCircle, cls: "callout-warn" },
    tip: { icon: Lightbulb, cls: "callout-tip" },
    note: { icon: CheckCircle2, cls: "callout-note" },
  };
  const { icon: Icon, cls } = map[type];
  return (
    <div className={`callout ${cls}`}>
      <Icon size={16} className="callout-icon" />
      <div className="callout-body">
        {title && <strong>{title}</strong>}
        {children}
      </div>
    </div>
  );
}

interface ParamTableProps { rows: ParamRow[] }

export function ParamTable({ rows }: ParamTableProps) {
  return (
    <div className="param-table-wrap">
      <table className="param-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>
                <span className="param-name">{r.name}</span>
                {r.required !== false
                  ? <span className="badge-req">required</span>
                  : <span className="badge-opt">optional</span>}
              </td>
              <td><span className="param-type">{r.type}</span></td>
              <td>
                {r.description}
                {r.defaultValue && (
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-3)", marginTop: "0.15rem" }}>
                    Default: <code style={{ fontFamily: "var(--font-mono)", color: "var(--brand-light)", fontSize: "0.78rem" }}>{r.defaultValue}</code>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface BrowserSupportProps { items: BrowserItem[] }

export function BrowserSupport({ items }: BrowserSupportProps) {
  const icons: Record<string, string> = {
    Chrome: "🌐", Firefox: "🦊", Safari: "🧭", Edge: "🔵", Mobile: "📱",
  };
  const checkIcons = {
    yes: <CheckCircle2 size={13} color="#22c55e" />,
    no: <AlertCircle size={13} color="#ef4444" />,
    partial: <AlertCircle size={13} color="#f59e0b" />,
  };
  return (
    <div className="browser-grid">
      {items.map((b) => (
        <span key={b.name} className={`browser-pill ${b.status}`}>
          <span>{icons[b.name] ?? "🌐"}</span>
          <span className="browser-pill-check">{checkIcons[b.status]}</span>
          {b.name}
        </span>
      ))}
    </div>
  );
}

// Fade-in on scroll wrapper
interface RevealProps { children: React.ReactNode; delay?: number }

export function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Tabbed code example (JS + TS)
interface TabbedCodeProps {
  examples: Array<{ lang: string; label: string; code: string }>;
}

export function TabbedCode({ examples }: TabbedCodeProps) {
  const [active, setActive] = useState(examples[0]?.label ?? "");

  const current = examples.find((e) => e.label === active) ?? examples[0];

  return (
    <div>
      <div className="tab-bar">
        {examples.map((e) => (
          <button
            key={e.label}
            className={`tab-btn${active === e.label ? " active" : ""}`}
            onClick={() => setActive(e.label)}
          >
            {e.label}
          </button>
        ))}
      </div>
      {current && <CodeBlock code={current.code} lang={current.lang} />}
    </div>
  );
}
