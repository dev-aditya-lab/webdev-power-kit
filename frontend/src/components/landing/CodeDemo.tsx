"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ArrowRight, Circle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BorderBeam } from "@/components/ui/BorderBeam";

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

// Syntax highlight tokens (simple keyword coloring)
function highlightCode(code: string, lang: string) {
  const keywords = ["import", "from", "const", "let", "await", "async", "if", "return", "export", "function", "interface", "class"];
  const types = ["string", "number", "boolean", "null", "undefined", "User"];
  const strings = /('.*?'|".*?"|`.*?`)/g;
  const comments = /(\/\/.*)/g;

  // Escape HTML
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Highlight strings
  escaped = escaped.replace(strings, '<span style="color:#22c55e">$1</span>');
  // Highlight comments
  escaped = escaped.replace(comments, '<span style="color:#4a5568">$1</span>');
  // Highlight keywords
  keywords.forEach(kw => {
    escaped = escaped.replace(
      new RegExp(`\\b(${kw})\\b`, "g"),
      '<span style="color:#6ab8ff">$1</span>'
    );
  });
  // Highlight types
  types.forEach(t => {
    escaped = escaped.replace(
      new RegExp(`\\b(${t})\\b`, "g"),
      '<span style="color:#a855f7">$1</span>'
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
    <section className="code-demo-section">
      <div className="code-demo-inner">
        <div className="code-demo-grid">
          {/* Left: copy */}
          <div className="code-demo-copy">
            <Reveal>
              <div className="section-eyebrow">
                <Code2 size={14} />
                See it in Action
              </div>
              <h2 className="section-title">
                Clean code,
                <br />
                <span className="text-gradient">every time.</span>
              </h2>
              <p className="section-sub">
                One import. One function call. Fully typed. Works in JavaScript,
                TypeScript, and React out of the box.
              </p>
              <motion.button
                className="btn btn-brand"
                onClick={() => onNavigate("quick-start")}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(59,158,255,0.35)" }}
                whileTap={{ scale: 0.97 }}
                style={{ marginTop: "1.75rem" }}
              >
                View Quick Start <ArrowRight size={16} />
              </motion.button>
            </Reveal>
          </div>

          {/* Right: code window */}
          <Reveal delay={0.15}>
            <BorderBeam colorFrom="#3B9EFF" colorTo="#a855f7" duration={4} borderWidth={1.5}>
              <div className="code-window">
                {/* Title bar */}
                <div className="code-window-bar">
                  <div className="code-window-dots">
                    <span style={{ background: "#ff5f57" }} />
                    <span style={{ background: "#ffbd2e" }} />
                    <span style={{ background: "#28c840" }} />
                  </div>
                  {/* Tab buttons */}
                  <div className="code-window-tabs">
                    {TABS.map((tab, i) => (
                      <button
                        key={tab.label}
                        className={`code-window-tab${activeTab === i ? " active" : ""}`}
                        onClick={() => setActiveTab(i)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="code-window-lang">.{TABS[activeTab].lang}</div>
                </div>

                {/* Code content */}
                <div className="code-window-body">
                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={activeTab}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="code-window-pre"
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(TABS[activeTab].code, TABS[activeTab].lang),
                      }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </BorderBeam>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
