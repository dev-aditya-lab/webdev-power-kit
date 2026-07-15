"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ArrowRight } from "lucide-react";

const TABS = [
  {
    label: "JavaScript",
    lang: "js",
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
    lang: "ts",
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
import { isOnline, onNetworkChange } from 'webdev-power-kit';

export function NetworkStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(isOnline());
    onNetworkChange((status) => setOnline(status));
  }, []);

  return (
    <div className={online ? 'online' : 'offline'}>
      {online ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
}`,
  },
];

// B&W syntax highlight — white/gray palette only
function highlightCode(code: string) {
  const keywords = ["import", "from", "const", "let", "await", "async", "if", "return", "export", "function", "interface", "class", "use"];
  const types = ["string", "number", "boolean", "null", "undefined", "User"];
  const strings = /('.*?'|".*?"|`.*?`)/g;
  const comments = /(\/\/.*)/g;

  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Strings → slightly dimmer
  escaped = escaped.replace(strings, '<span style="color:#aaaaaa">$1</span>');
  // Comments → very dim
  escaped = escaped.replace(comments, '<span style="color:#555555">$1</span>');
  // Keywords → white
  keywords.forEach((kw) => {
    escaped = escaped.replace(
      new RegExp(`\\b(${kw})\\b`, "g"),
      '<span style="color:#ffffff">$1</span>'
    );
  });
  // Types → light gray
  types.forEach((t) => {
    escaped = escaped.replace(
      new RegExp(`\\b(${t})\\b`, "g"),
      '<span style="color:#cccccc">$1</span>'
    );
  });
  return escaped;
}

interface CodeDemoProps {
  onNavigate: (id: string) => void;
}

export function CodeDemo({ onNavigate }: CodeDemoProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="code-demo-bw">
      <div className="code-demo-bw-inner">
        <div className="code-demo-bw-grid">
          {/* Left copy */}
          <div className="code-demo-bw-copy">
            <p className="section-eyebrow" style={{ justifyContent: "flex-start" }}>
              <Code2 size={13} />
              See it in Action
            </p>
            <h2 className="code-demo-bw-h2">
              Clean code,<br />
              <span className="hs-accent">every time.</span>
            </h2>
            <p className="code-demo-bw-sub">
              One import. One function call. Fully typed. Works in JavaScript,
              TypeScript, and React out of the box.
            </p>
            <button
              className="btn-bw-primary"
              onClick={() => onNavigate("quick-start")}
              style={{ marginTop: "1.75rem" }}
            >
              View Quick Start <ArrowRight size={16} />
            </button>
          </div>

          {/* Right: code window */}
          <div className="code-window-bw">
            {/* Title bar */}
            <div className="code-window-bw-bar">
              <div className="code-window-dots">
                <span style={{ background: "#333" }} />
                <span style={{ background: "#444" }} />
                <span style={{ background: "#555" }} />
              </div>
              {/* Tabs */}
              <div className="code-window-bw-tabs">
                {TABS.map((tab, i) => (
                  <button
                    key={tab.label}
                    className={`code-window-bw-tab${activeTab === i ? " active" : ""}`}
                    onClick={() => setActiveTab(i)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="code-window-bw-lang">.{TABS[activeTab].lang}</div>
            </div>

            {/* Code body */}
            <div className="code-window-bw-body">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="code-window-bw-pre"
                  dangerouslySetInnerHTML={{ __html: highlightCode(TABS[activeTab].code) }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
