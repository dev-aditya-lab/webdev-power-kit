"use client";

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  Data: Sidebar Navigation
// ─────────────────────────────────────────────
const NAV = [
  {
    section: "Getting Started",
    links: [
      { id: "introduction", label: "Introduction", icon: "🚀" },
      { id: "installation", label: "Installation", icon: "📦" },
      { id: "quick-start", label: "Quick Start", icon: "⚡" },
      { id: "typescript", label: "TypeScript Support", icon: "🔷" },
    ],
  },
  {
    section: "Browser APIs",
    links: [
      { id: "clipboard", label: "Clipboard", icon: "📋" },
      { id: "battery", label: "Battery", icon: "🔋" },
      { id: "notifications", label: "Notifications", icon: "🔔" },
      { id: "dark-mode", label: "Dark Mode", icon: "🌙" },
      { id: "geolocation", label: "Geolocation", icon: "📍" },
      { id: "network", label: "Network", icon: "🌐" },
      { id: "screen-info", label: "Screen Info", icon: "🖥️" },
      { id: "storage", label: "Storage", icon: "💾" },
      { id: "tab-visibility", label: "Tab Visibility", icon: "👁️" },
      { id: "idle-timer", label: "Idle Timer", icon: "⏱️" },
      { id: "vibration", label: "Vibration", icon: "📳" },
      { id: "prevent-close", label: "Prevent Close", icon: "🛡️" },
    ],
  },
  {
    section: "Utilities",
    links: [{ id: "otp", label: "OTP Generator", icon: "🔐" }],
  },
  {
    section: "Performance",
    links: [
      { id: "debounce", label: "Debounce", icon: "⏳" },
      { id: "throttle", label: "Throttle", icon: "🚦" },
    ],
  },
  {
    section: "More",
    links: [
      { id: "changelog", label: "Changelog", icon: "📝" },
      { id: "contributing", label: "Contributing", icon: "🤝" },
      { id: "faq", label: "FAQ", icon: "❓" },
    ],
  },
];

// ─────────────────────────────────────────────
//  Copy Button Component
// ─────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      className={`code-block-copy${copied ? " copied" : ""}`}
      onClick={copy}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

// ─────────────────────────────────────────────
//  Code Block Component
// ─────────────────────────────────────────────
function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <div className="code-block" style={{ margin: "1rem 0" }}>
      <div className="code-block-header">
        <span className="code-block-lang">{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} />
      </pre>
    </div>
  );
}

// Very light syntax highlighter (keyword, string, comment, type coloring)
function highlight(code: string, lang: string): string {
  if (lang === "bash" || lang === "sh") {
    return code
      .replace(/(&lt;|<)/g, "&lt;")
      .replace(/(&gt;|>)/g, "&gt;")
      .replace(/^(\$)\s/gm, '<span style="color:#64748b">$ </span>')
      .replace(/(npm|yarn|pnpm|npx)/g, '<span style="color:#a78bfa">$1</span>')
      .replace(/(install|add|i\b)/g, '<span style="color:#67e8f9">$1</span>');
  }
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const colors = {
    keyword: "#c792ea",
    string: "#c3e88d",
    comment: "#546e7a",
    type: "#82aaff",
    fn: "#82aaff",
    param: "#f07178",
    number: "#f78c6c",
    bool: "#ff9cac",
    operator: "#89ddff",
    punct: "#89ddff",
  };

  return escaped
    .replace(
      /\/\/.*/g,
      `<span style="color:${colors.comment};font-style:italic">$&</span>`
    )
    .replace(
      /(".*?"|'.*?'|`[^`]*`)/g,
      `<span style="color:${colors.string}">$1</span>`
    )
    .replace(
      /\b(import|export|from|const|let|var|function|return|async|await|new|if|else|throw|typeof|interface|type|extends|implements|void|null|undefined|default|class|this|true|false)\b/g,
      `<span style="color:${colors.keyword}">$1</span>`
    )
    .replace(
      /\b(Promise|string|number|boolean|any|object|Array|void|never)\b/g,
      `<span style="color:${colors.type}">$1</span>`
    )
    .replace(
      /\b(\d+)\b/g,
      `<span style="color:${colors.number}">$1</span>`
    );
}

// ─────────────────────────────────────────────
//  Callout Component
// ─────────────────────────────────────────────
function Callout({
  type,
  title,
  children,
}: {
  type: "info" | "warn" | "tip" | "note";
  title?: string;
  children: React.ReactNode;
}) {
  const icons = { info: "ℹ️", warn: "⚠️", tip: "💡", note: "📌" };
  return (
    <div className={`callout callout-${type}`}>
      <span className="callout-icon">{icons[type]}</span>
      <div className="callout-content">
        {title && <strong>{title}</strong>}
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  API Table Component
// ─────────────────────────────────────────────
function ApiTable({
  rows,
}: {
  rows: { param: string; type: string; required?: boolean; description: string; default?: string }[];
}) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
      <table className="api-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.param}>
              <td>
                {r.param}{" "}
                {r.required !== false ? (
                  <span className="required-badge">required</span>
                ) : (
                  <span className="optional-badge">optional</span>
                )}
              </td>
              <td>{r.type}</td>
              <td style={{ color: "var(--text-secondary)" }}>
                {r.description}
                {r.default && (
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                    Default: <span className="inline-code">{r.default}</span>
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

// ─────────────────────────────────────────────
//  Browser Support Component
// ─────────────────────────────────────────────
function BrowserSupport({ items }: { items: { browser: string; icon: string; supported: boolean | "partial" }[] }) {
  return (
    <div className="browser-support">
      {items.map((b) => (
        <div className="browser-item" key={b.browser}>
          <span style={{ fontSize: "1.4rem" }}>{b.icon}</span>
          <span className="browser-item-name">{b.browser}</span>
          <span className="browser-item-status">
            {b.supported === true ? "✅" : b.supported === "partial" ? "⚠️" : "❌"}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Section: Introduction
// ─────────────────────────────────────────────
function SectionIntroduction() {
  return (
    <section id="introduction">
      <h1>Introduction</h1>
      <p>
        <strong style={{ color: "var(--text-primary)" }}>WebDev Power Kit</strong> is a TypeScript-powered, modular toolkit
        that makes common browser tasks incredibly simple. Instead of wrestling with inconsistent browser APIs,
        verbose boilerplate, or missing error handling — you get clean, typed, one-liner utilities that just work.
      </p>
      <div className="feature-grid" style={{ marginTop: "2rem" }}>
        {[
          { icon: "🧩", color: "rgba(139,92,246,0.2)", title: "Modular Architecture", desc: "Import only what you need. Every feature lives in its own sub-path." },
          { icon: "🔷", color: "rgba(6,182,212,0.2)", title: "100% TypeScript", desc: "Full type safety with JSDoc comments for perfect IDE autocompletion." },
          { icon: "🌐", color: "rgba(16,185,129,0.2)", title: "Browser-first", desc: "Wraps native browser APIs with consistent error handling and graceful fallbacks." },
          { icon: "⚛️", color: "rgba(236,72,153,0.2)", title: "Framework Agnostic", desc: "Works with React, Vue, Svelte, Next.js, or plain vanilla JS." },
          { icon: "⚡", color: "rgba(245,158,11,0.2)", title: "Zero Dependencies", desc: "Tiny footprint. No external packages. Just pure browser APIs, wrapped nicely." },
          { icon: "🛡️", color: "rgba(139,92,246,0.2)", title: "Production Ready", desc: "Handles edge cases, unsupported APIs, and throws meaningful errors." },
        ].map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-card-icon" style={{ background: f.color }}>{f.icon}</div>
            <div className="feature-card-title">{f.title}</div>
            <div className="feature-card-desc">{f.desc}</div>
          </div>
        ))}
      </div>
      <h2>Module Overview</h2>
      <p>The package is organized into three top-level modules:</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
        {[
          { name: "browser/", desc: "12 browser API wrappers — clipboard, battery, geolocation, network, storage, and more.", badge: "12 modules", color: "var(--accent-purple)" },
          { name: "utils/", desc: "Utility helpers like cryptographically secure OTP generation.", badge: "1 module", color: "var(--accent-cyan)" },
          { name: "performance/", desc: "Performance utilities like debounce and throttle for smooth UIs.", badge: "2 modules", color: "var(--accent-green)" },
        ].map((m) => (
          <div key={m.name} className="card" style={{ borderColor: `${m.color}30` }}>
            <code style={{ fontFamily: "var(--font-mono)", color: m.color, fontSize: "0.9rem" }}>{m.name}</code>
            <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>{m.desc}</p>
            <span className="pill" style={{ marginTop: "0.75rem" }}>{m.badge}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Installation
// ─────────────────────────────────────────────
function SectionInstallation() {
  const [pm, setPm] = useState<"npm" | "yarn" | "pnpm">("npm");
  const cmds = {
    npm: "npm install webdev-power-kit",
    yarn: "yarn add webdev-power-kit",
    pnpm: "pnpm add webdev-power-kit",
  };
  return (
    <section id="installation">
      <h1>Installation</h1>
      <p>Install via your preferred package manager. Requires Node.js ≥ 14.</p>
      <div className="tab-list">
        {(["npm", "yarn", "pnpm"] as const).map((p) => (
          <button key={p} className={`tab-btn${pm === p ? " active" : ""}`} onClick={() => setPm(p)}>{p}</button>
        ))}
      </div>
      <CodeBlock lang="bash" code={cmds[pm]} />
      <h2>Via CDN (ES Module)</h2>
      <p>Use directly in HTML without a build step:</p>
      <CodeBlock
        lang="html"
        code={`<script type="module">
  import { copyToClipboard } from 'https://cdn.jsdelivr.net/npm/webdev-power-kit/+esm';
  copyToClipboard('Hello from CDN!');
</script>`}
      />
      <Callout type="info" title="ESM-only package">
        webdev-power-kit is a pure ES Module (<code className="inline-code">type: "module"</code>). It works
        natively with modern bundlers (Vite, Webpack 5, Rollup) and Next.js. For CJS environments you may need
        a transpilation step.
      </Callout>
      <h2>Requirements</h2>
      <ApiTable
        rows={[
          { param: "Node.js", type: "≥ 14.x", required: false, description: "For build tooling. The package itself runs in any modern browser." },
          { param: "TypeScript", type: "≥ 4.x", required: false, description: "Optional but recommended. Full .d.ts typings are included." },
          { param: "Browser", type: "Modern", required: false, description: "Chrome, Firefox, Safari, Edge (latest 2 versions recommended)." },
        ]}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Quick Start
// ─────────────────────────────────────────────
function SectionQuickStart() {
  return (
    <section id="quick-start">
      <h1>Quick Start</h1>
      <p>Get up and running in under 60 seconds.</p>
      <h2>1. Install</h2>
      <CodeBlock lang="bash" code="npm install webdev-power-kit" />
      <h2>2. Import & Use</h2>
      <CodeBlock
        lang="typescript"
        code={`import { copyToClipboard, getBatteryLevel, generateOTP } from 'webdev-power-kit';

// Copy text to clipboard
await copyToClipboard('Hello, World!');
console.log('Copied! ✅');

// Get battery percentage
const level = await getBatteryLevel();
console.log(\`Battery: \${level}%\`);

// Generate a 6-digit OTP
const otp = generateOTP(6);
console.log(\`Your OTP: \${otp}\`);`}
      />
      <h2>React Example</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useState } from 'react';
import { copyToClipboard, vibrate, isOnline } from 'webdev-power-kit';

export default function DemoPanel() {
  const [msg, setMsg] = useState('');

  const handleCopy = async () => {
    await copyToClipboard('Copied via webdev-power-kit!');
    setMsg('Copied to clipboard! 📋');
    vibrate([100, 50, 100]); // haptic feedback
  };

  return (
    <div>
      <p>Status: {isOnline() ? '🟢 Online' : '🔴 Offline'}</p>
      <button onClick={handleCopy}>Copy & Vibrate</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}`}
      />
      <h2>Next.js App Router</h2>
      <Callout type="warn" title="Client-side only">
        Browser APIs like clipboard, geolocation, and battery only work in the browser. Always use{" "}
        <code className="inline-code">&quot;use client&quot;</code> directive or wrap calls in{" "}
        <code className="inline-code">useEffect</code> in Next.js.
      </Callout>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect, useState } from 'react';
import { isOnline, onNetworkChange } from 'webdev-power-kit';

export default function NetworkBanner() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(isOnline());
    onNetworkChange((status) => setOnline(status));
  }, []);

  return online
    ? null
    : <div className="banner">⚠️ You are offline</div>;
}`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: TypeScript
// ─────────────────────────────────────────────
function SectionTypeScript() {
  return (
    <section id="typescript">
      <h1>TypeScript Support</h1>
      <p>
        webdev-power-kit is written in TypeScript and ships with full <code className="inline-code">.d.ts</code>{" "}
        declaration files. Zero configuration needed — just install and enjoy complete type safety.
      </p>
      <h2>Exported Interfaces</h2>
      <CodeBlock
        lang="typescript"
        code={`import type {
  Coordinates,      // from geolocation
  LocationOptions,  // from geolocation
  PingResult,       // from network/ping
  SpeedTestResult,  // from network/speed-test
  ScreenInfo,       // from screen-info
  OTPOptions,       // from utils/otp
} from 'webdev-power-kit';

// Example: fully typed callback
function handleLocation(coords: Coordinates) {
  console.log(coords.latitude, coords.longitude);
}

const watchId = watchLocation(handleLocation);`}
      />
      <h2>Generic Functions</h2>
      <p>Storage functions use generics so you get typed values back automatically:</p>
      <CodeBlock
        lang="typescript"
        code={`interface UserProfile {
  name: string;
  theme: 'light' | 'dark';
  score: number;
}

// Set typed value
setItem<UserProfile>('user', { name: 'Aditya', theme: 'dark', score: 42 });

// Get typed value — TypeScript knows the return type!
const user = getItem<UserProfile>('user');
//    ^ UserProfile | null
console.log(user?.name); // 'Aditya'`}
      />
      <h2>OTPOptions Type</h2>
      <CodeBlock
        lang="typescript"
        code={`import type { OTPOptions } from 'webdev-power-kit';

const opts: OTPOptions = {
  digits: true,
  upperCase: true,
  lowerCase: false,
  symbols: false,
};

const otp = generateOTP(8, opts); // string`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Clipboard
// ─────────────────────────────────────────────
function SectionClipboard() {
  return (
    <section id="clipboard">
      <h1>Clipboard</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-cyan">Async</span>
        <span className="badge badge-orange">HTTPS Required</span>
      </div>
      <p>
        Clean wrappers around the <code className="inline-code">navigator.clipboard</code> API for reading and
        writing text. Requires a secure context (HTTPS or localhost).
      </p>
      <h2>Functions</h2>

      <h3>copyToClipboard(text)</h3>
      <div className="fn-signature">copyToClipboard(text: string): Promise&lt;void&gt;</div>
      <p>Writes a string to the system clipboard. Returns a Promise that resolves when done.</p>
      <ApiTable
        rows={[
          { param: "text", type: "string", required: true, description: "The text content to copy to the clipboard." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { copyToClipboard } from 'webdev-power-kit';

// Basic usage
await copyToClipboard('Hello, World!');

// With error handling
try {
  await copyToClipboard('Some important text');
  console.log('✅ Copied successfully!');
} catch (err) {
  console.error('Failed to copy:', err);
  // DOMException: Clipboard write was blocked
}`}
      />

      <h3>readClipboard()</h3>
      <div className="fn-signature">readClipboard(): Promise&lt;string&gt;</div>
      <p>Reads the current text content from the clipboard. Returns a Promise resolving to the text.</p>
      <CodeBlock
        lang="typescript"
        code={`import { readClipboard } from 'webdev-power-kit';

const content = await readClipboard();
console.log('Clipboard contains:', content);`}
      />
      <Callout type="warn" title="Permission Required">
        readClipboard() will trigger a browser permission prompt on first use. The user must grant the
        &quot;Clipboard read&quot; permission.
      </Callout>
      <h2>React Hook Example</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useState } from 'react';
import { copyToClipboard } from 'webdev-power-kit';

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Clipboard access denied!');
    }
  };

  return (
    <button onClick={handleCopy}>
      {copied ? '✅ Copied!' : '📋 Copy'}
    </button>
  );
}`}
      />
      <h2>Browser Support</h2>
      <BrowserSupport
        items={[
          { browser: "Chrome", icon: "🌐", supported: true },
          { browser: "Firefox", icon: "🦊", supported: true },
          { browser: "Safari", icon: "🧭", supported: true },
          { browser: "Edge", icon: "🔵", supported: true },
          { browser: "Mobile", icon: "📱", supported: true },
        ]}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Battery
// ─────────────────────────────────────────────
function SectionBattery() {
  return (
    <section id="battery">
      <h1>Battery</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-cyan">Async</span>
        <span className="badge badge-pink">Limited Support</span>
      </div>
      <p>
        Access device battery information using the Battery Status API. Monitor charging state,
        battery level, and subscribe to battery change events.
      </p>
      <h2>Functions</h2>

      <h3>getBattery()</h3>
      <div className="fn-signature">getBattery(): Promise&lt;BatteryManager&gt;</div>
      <p>Returns the raw <code className="inline-code">BatteryManager</code> object. Throws if API is not supported.</p>

      <h3>getBatteryLevel()</h3>
      <div className="fn-signature">getBatteryLevel(): Promise&lt;number&gt;</div>
      <p>Returns the battery level as a percentage (0–100).</p>

      <h3>isBatteryCharging()</h3>
      <div className="fn-signature">isBatteryCharging(): Promise&lt;boolean&gt;</div>
      <p>Returns <code className="inline-code">true</code> if the device is currently charging.</p>

      <h3>onBatteryChange(callback)</h3>
      <div className="fn-signature">onBatteryChange(onChange: (battery: BatteryManager) =&gt; void): Promise&lt;void&gt;</div>
      <p>Subscribes to battery level and charging change events.</p>
      <ApiTable
        rows={[
          { param: "onChange", type: "(battery: BatteryManager) => void", required: true, description: "Callback that fires when battery level or charging state changes." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { getBatteryLevel, isBatteryCharging, onBatteryChange } from 'webdev-power-kit';

// Get current battery info
const level = await getBatteryLevel();
const charging = await isBatteryCharging();
console.log(\`Battery: \${level}% | Charging: \${charging}\`);

// Subscribe to changes
await onBatteryChange((battery) => {
  console.log('Battery updated:', {
    level: battery.level * 100,    // 0-100
    charging: battery.charging,    // boolean
    chargingTime: battery.chargingTime,   // seconds to full
    dischargingTime: battery.dischargingTime, // seconds remaining
  });
});`}
      />
      <h2>React Component</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect, useState } from 'react';
import { getBatteryLevel, isBatteryCharging, onBatteryChange } from 'webdev-power-kit';

export function BatteryWidget() {
  const [level, setLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        setLevel(await getBatteryLevel());
        setCharging(await isBatteryCharging());
        await onBatteryChange((bat) => {
          setLevel(bat.level * 100);
          setCharging(bat.charging);
        });
      } catch {
        console.log('Battery API not supported');
      }
    };
    init();
  }, []);

  if (level === null) return <p>Battery API not supported</p>;

  return (
    <div>
      <span>{charging ? '⚡ Charging' : '🔋'} {level.toFixed(0)}%</span>
      <div style={{ width: '100%', height: 8, background: '#333', borderRadius: 4 }}>
        <div style={{ width: \`\${level}%\`, height: '100%', background: charging ? '#10b981' : '#f59e0b', borderRadius: 4 }} />
      </div>
    </div>
  );
}`}
      />
      <Callout type="note" title="Browser Support Note">
        The Battery Status API is primarily supported in Chrome and Chromium-based browsers. Firefox
        removed it in v52 for privacy reasons. Safari and iOS do not support it.
      </Callout>
      <h2>Browser Support</h2>
      <BrowserSupport
        items={[
          { browser: "Chrome", icon: "🌐", supported: true },
          { browser: "Firefox", icon: "🦊", supported: false },
          { browser: "Safari", icon: "🧭", supported: false },
          { browser: "Edge", icon: "🔵", supported: true },
          { browser: "Mobile", icon: "📱", supported: "partial" },
        ]}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Notifications
// ─────────────────────────────────────────────
function SectionNotifications() {
  return (
    <section id="notifications">
      <h1>Notifications</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-cyan">Async</span>
        <span className="badge badge-orange">Permission Required</span>
      </div>
      <p>Send native browser desktop notifications to the user. Handles permission requests gracefully.</p>

      <h2>Functions</h2>

      <h3>requestNotificationPermission()</h3>
      <div className="fn-signature">requestNotificationPermission(): Promise&lt;&quot;granted&quot; | &quot;denied&quot; | &quot;default&quot;&gt;</div>
      <p>Shows the browser permission prompt. Returns the permission state after the user responds.</p>

      <h3>sendNotification(title, options?)</h3>
      <div className="fn-signature">sendNotification(title: string, options?: NotificationOptions): Promise&lt;void&gt;</div>
      <p>Creates and shows a notification. Throws if permission wasn&apos;t granted or API is not supported.</p>
      <ApiTable
        rows={[
          { param: "title", type: "string", required: true, description: "The notification title shown in bold." },
          { param: "options", type: "NotificationOptions", required: false, description: "Optional config: body, icon, badge, tag, silent, requireInteraction, etc." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { requestNotificationPermission, sendNotification } from 'webdev-power-kit';

// Step 1: Request permission (call on user gesture)
const permission = await requestNotificationPermission();

if (permission === 'granted') {
  // Step 2: Send notification
  await sendNotification('Hello! 👋', {
    body: 'webdev-power-kit makes this super easy.',
    icon: '/logo.png',
    badge: '/badge.png',
    tag: 'welcome-msg',     // replaces existing notification with same tag
    silent: false,
    requireInteraction: true, // stays until user clicks
  });
}

// Handle denied case
if (permission === 'denied') {
  console.log('User denied notifications');
}`}
      />
      <h2>Real-world Pattern</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { requestNotificationPermission, sendNotification } from 'webdev-power-kit';

// Notify after a long operation completes
async function runHeavyTask() {
  const perm = await requestNotificationPermission();
  
  // ... do the heavy work ...
  await someExpensiveOperation();

  if (perm === 'granted') {
    await sendNotification('Task Complete ✅', {
      body: 'Your export is ready to download.',
      icon: '/favicon.ico',
    });
  }
}`}
      />
      <h2>Browser Support</h2>
      <BrowserSupport
        items={[
          { browser: "Chrome", icon: "🌐", supported: true },
          { browser: "Firefox", icon: "🦊", supported: true },
          { browser: "Safari", icon: "🧭", supported: "partial" },
          { browser: "Edge", icon: "🔵", supported: true },
          { browser: "Mobile", icon: "📱", supported: "partial" },
        ]}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Dark Mode
// ─────────────────────────────────────────────
function SectionDarkMode() {
  return (
    <section id="dark-mode">
      <h1>Dark Mode</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-green">Synchronous</span>
      </div>
      <p>Detect and respond to the user&apos;s system dark mode preference using <code className="inline-code">prefers-color-scheme</code>.</p>

      <h2>Functions</h2>

      <h3>isDarkMode()</h3>
      <div className="fn-signature">isDarkMode(): boolean</div>
      <p>Returns <code className="inline-code">true</code> if the OS is set to dark mode.</p>

      <h3>toggleDarkMode(className?)</h3>
      <div className="fn-signature">toggleDarkMode(className?: string): void</div>
      <p>Toggles a CSS class on <code className="inline-code">&lt;html&gt;</code> element. Defaults to <code className="inline-code">&quot;dark&quot;</code>.</p>
      <ApiTable
        rows={[
          { param: "className", type: "string", required: false, description: "The CSS class to toggle on <html>.", default: '"dark"' },
        ]}
      />

      <h3>onThemeChange(callback)</h3>
      <div className="fn-signature">onThemeChange(callback: (isDark: boolean) =&gt; void): void</div>
      <p>Subscribes to OS-level theme changes. Fires whenever the user switches their system theme.</p>
      <ApiTable
        rows={[
          { param: "callback", type: "(isDark: boolean) => void", required: true, description: "Called with true if switching to dark, false if switching to light." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { isDarkMode, toggleDarkMode, onThemeChange } from 'webdev-power-kit';

// Check current preference
console.log('Dark mode?', isDarkMode()); // true or false

// Toggle dark class on <html>
toggleDarkMode();        // uses default 'dark' class
toggleDarkMode('night'); // uses custom class 'night'

// Listen for OS theme changes
onThemeChange((isDark) => {
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  console.log(\`Switched to \${isDark ? 'dark' : 'light'} mode\`);
});`}
      />
      <h2>React Theme Hook</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect, useState } from 'react';
import { isDarkMode, onThemeChange } from 'webdev-power-kit';

export function useSystemTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(isDarkMode());
    onThemeChange((isDark) => setDark(isDark));
  }, []);

  return dark;
}

// Usage:
export function ThemeAwareApp() {
  const isDark = useSystemTheme();
  return <div data-theme={isDark ? 'dark' : 'light'}>...</div>;
}`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Geolocation
// ─────────────────────────────────────────────
function SectionGeolocation() {
  return (
    <section id="geolocation">
      <h1>Geolocation</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-cyan">Async</span>
        <span className="badge badge-orange">Permission Required</span>
        <span className="badge badge-orange">HTTPS Required</span>
      </div>
      <p>Get and track the user&apos;s geographic position with a clean, promise-based API.</p>

      <h2>Types</h2>
      <CodeBlock
        lang="typescript"
        code={`interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;      // meters
  altitude?: number | null;
  heading?: number | null; // degrees from north
  speed?: number | null;   // m/s
  timestamp: number;       // Unix ms
}

interface LocationOptions {
  enableHighAccuracy?: boolean; // Use GPS if available
  timeout?: number;             // Max ms to wait
  maximumAge?: number;          // Max cached position age in ms
}`}
      />

      <h2>Functions</h2>

      <h3>getCurrentLocation(options?)</h3>
      <div className="fn-signature">getCurrentLocation(options?: LocationOptions): Promise&lt;Coordinates&gt;</div>
      <p>One-time fetch of the user&apos;s current location.</p>
      <ApiTable
        rows={[
          { param: "options.enableHighAccuracy", type: "boolean", required: false, description: "Use GPS for higher precision (uses more battery).", default: "false" },
          { param: "options.timeout", type: "number", required: false, description: "Maximum milliseconds to wait for a position.", default: "Infinity" },
          { param: "options.maximumAge", type: "number", required: false, description: "Accept a cached position up to this many ms old.", default: "0" },
        ]}
      />

      <h3>watchLocation(callback, errorCallback?, options?)</h3>
      <div className="fn-signature">watchLocation(callback, errorCallback?, options?): number</div>
      <p>Continuously tracks the user&apos;s location. Returns a watch ID.</p>
      <ApiTable
        rows={[
          { param: "callback", type: "(location: Coordinates) => void", required: true, description: "Fires every time the position updates." },
          { param: "errorCallback", type: "(error: GeolocationPositionError) => void", required: false, description: "Fires on error (permission denied, timeout, etc.)." },
          { param: "options", type: "LocationOptions", required: false, description: "Same options as getCurrentLocation." },
        ]}
      />

      <h3>clearLocationWatch(id)</h3>
      <div className="fn-signature">clearLocationWatch(id: number): void</div>
      <p>Stops a location watch. Always call this on component unmount to prevent memory leaks.</p>
      <ApiTable
        rows={[
          { param: "id", type: "number", required: true, description: "The watch ID returned by watchLocation()." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { getCurrentLocation, watchLocation, clearLocationWatch } from 'webdev-power-kit';

// One-time location
try {
  const coords = await getCurrentLocation({ enableHighAccuracy: true });
  console.log(\`Lat: \${coords.latitude}, Lng: \${coords.longitude}\`);
  console.log(\`Accuracy: ±\${coords.accuracy}m\`);
} catch (err) {
  // GeolocationPositionError: PERMISSION_DENIED | POSITION_UNAVAILABLE | TIMEOUT
  console.error('Location error:', err.message);
}

// Live tracking
const watchId = watchLocation(
  (coords) => console.log('Updated:', coords),
  (err)    => console.error('Error:', err.code),
  { enableHighAccuracy: true, maximumAge: 5000 }
);

// Stop tracking later
clearLocationWatch(watchId);`}
      />
      <h2>React Hook</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect, useState } from 'react';
import { getCurrentLocation, watchLocation, clearLocationWatch } from 'webdev-power-kit';
import type { Coordinates } from 'webdev-power-kit';

export function useGeolocation(watch = false) {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!watch) {
      getCurrentLocation()
        .then(setCoords)
        .catch((e) => setError(e.message));
      return;
    }

    const id = watchLocation(setCoords, (e) => setError(e.message));
    return () => clearLocationWatch(id);
  }, [watch]);

  return { coords, error };
}`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Network
// ─────────────────────────────────────────────
function SectionNetwork() {
  return (
    <section id="network">
      <h1>Network</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-cyan">Multiple Functions</span>
      </div>
      <p>Four powerful tools for network monitoring, connectivity testing, and speed measurement.</p>

      <h2>isOnline()</h2>
      <div className="fn-signature">isOnline(): boolean</div>
      <p>Returns the current browser online/offline state synchronously.</p>

      <h2>onNetworkChange(callback)</h2>
      <div className="fn-signature">onNetworkChange(callback: (online: boolean) =&gt; void): void</div>
      <p>Subscribes to online/offline status changes.</p>
      <ApiTable
        rows={[
          { param: "callback", type: "(online: boolean) => void", required: true, description: "Fires with true when going online, false when going offline." },
        ]}
      />

      <h2>getConnectionInfo()</h2>
      <div className="fn-signature">getConnectionInfo(): ConnectionInfo</div>
      <p>Returns detailed network connection info (type, speed, save-data mode). Falls back gracefully if not supported.</p>
      <CodeBlock
        lang="typescript"
        code={`interface ConnectionInfo {
  type?: string;          // 'wifi' | 'cellular' | 'ethernet' | 'none' etc.
  effectiveType?: string; // '4g' | '3g' | '2g' | 'slow-2g'
  downlink?: number;      // Mbps
  rtt?: number;           // Round-trip time in ms
  saveData?: boolean;     // User has data-saver enabled
  isSupported: boolean;
}`}
      />

      <h2>ping(url)</h2>
      <div className="fn-signature">ping(url: string): Promise&lt;PingResult&gt;</div>
      <p>Pings a URL using a HEAD request and measures response time.</p>
      <ApiTable
        rows={[
          { param: "url", type: "string", required: true, description: "A valid http(s) URL to ping. Must support HEAD requests and allow CORS." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`interface PingResult {
  success: boolean;
  status?: number;  // HTTP status code
  time?: number;    // milliseconds
  error?: string;
}`}
      />

      <h2>testNetworkSpeed(sizeInMB?)</h2>
      <div className="fn-signature">testNetworkSpeed(sizeInMB?: number): Promise&lt;SpeedTestResult&gt;</div>
      <p>Measures approximate download speed using a client-side Blob. No server required.</p>
      <ApiTable
        rows={[
          { param: "sizeInMB", type: "number", required: false, description: "Size of the test payload in megabytes.", default: "1" },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import {
  isOnline, onNetworkChange, getConnectionInfo,
  ping, testNetworkSpeed
} from 'webdev-power-kit';

// Basic online check
console.log('Online?', isOnline());

// Listen for changes
onNetworkChange((online) => {
  document.title = online ? '✅ App' : '🔴 App (Offline)';
});

// Connection info
const conn = getConnectionInfo();
if (conn.isSupported) {
  console.log('Type:', conn.effectiveType);   // '4g'
  console.log('Speed:', conn.downlink, 'Mbps'); // 12.5
  if (conn.saveData) console.log('Save-data mode active!');
}

// Ping a server
const result = await ping('https://api.example.com/health');
console.log(\`Ping: \${result.time}ms | Status: \${result.status}\`);

// Speed test
const speed = await testNetworkSpeed(2); // test with 2MB
console.log(\`Speed: \${speed.speedMbps} Mbps\`);`}
      />
      <h2>Offline-First Pattern</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect, useState } from 'react';
import { isOnline, onNetworkChange } from 'webdev-power-kit';

export function useNetworkStatus() {
  const [online, setOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    setOnline(isOnline());
    onNetworkChange((status) => {
      if (!status) setWasOffline(true);
      setOnline(status);
    });
  }, []);

  return { online, showReconnectBanner: online && wasOffline };
}`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Screen Info
// ─────────────────────────────────────────────
function SectionScreenInfo() {
  return (
    <section id="screen-info">
      <h1>Screen Info</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-green">Synchronous</span>
      </div>
      <p>Get detailed viewport and screen information. Listen for responsive layout changes.</p>

      <h2>Types</h2>
      <CodeBlock
        lang="typescript"
        code={`interface ScreenInfo {
  width: number;           // window.innerWidth (viewport)
  height: number;          // window.innerHeight (viewport)
  availWidth: number;      // screen.availWidth (physical, minus taskbar)
  availHeight: number;     // screen.availHeight
  devicePixelRatio: number; // 1 = regular, 2 = HiDPI/Retina
  orientation: string;     // 'landscape-primary' | 'portrait-primary' | 'unknown'
  isLandscape: boolean;    // width > height
}`}
      />

      <h2>getScreenInfo()</h2>
      <div className="fn-signature">getScreenInfo(): ScreenInfo</div>
      <p>Returns a snapshot of the current screen and viewport information.</p>

      <h2>onScreenResize(callback)</h2>
      <div className="fn-signature">onScreenResize(callback: (info: ScreenInfo) =&gt; void): void</div>
      <p>Subscribes to resize and orientation change events. Fires immediately with updated info.</p>
      <ApiTable
        rows={[
          { param: "callback", type: "(info: ScreenInfo) => void", required: true, description: "Fires on window resize or orientation change with updated ScreenInfo." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { getScreenInfo, onScreenResize } from 'webdev-power-kit';

// One-time snapshot
const screen = getScreenInfo();
console.log(\`Viewport: \${screen.width}x\${screen.height}\`);
console.log(\`Pixel ratio: \${screen.devicePixelRatio}\`); // 2 = Retina
console.log(\`Landscape: \${screen.isLandscape}\`);

// Reactive
onScreenResize((info) => {
  console.log(\`Resized to: \${info.width}x\${info.height}\`);
  if (info.isLandscape) {
    document.body.classList.add('landscape');
  } else {
    document.body.classList.remove('landscape');
  }
});`}
      />
      <h2>React Breakpoint Hook</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect, useState } from 'react';
import { getScreenInfo, onScreenResize } from 'webdev-power-kit';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const update = () => {
      const { width } = getScreenInfo();
      setBp(width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop');
    };
    update();
    onScreenResize(update);
  }, []);

  return bp;
}`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Storage
// ─────────────────────────────────────────────
function SectionStorage() {
  return (
    <section id="storage">
      <h1>Storage</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-green">Synchronous</span>
        <span className="badge badge-cyan">TypeScript Generics</span>
      </div>
      <p>
        A safe, typed wrapper around <code className="inline-code">localStorage</code> and{" "}
        <code className="inline-code">sessionStorage</code> with JSON serialization, error handling,
        and full TypeScript generics support.
      </p>

      <h2>Functions</h2>
      <ApiTable
        rows={[
          { param: "setItem<T>(key, value, type?)", type: "void", required: false, description: "Serialize and store any value under a key." },
          { param: "getItem<T>(key, type?)", type: "T | null", required: false, description: "Retrieve and deserialize a stored value. Returns null if missing." },
          { param: "removeItem(key, type?)", type: "void", required: false, description: "Delete a key from storage." },
          { param: "clearStorage(type?)", type: "void", required: false, description: "Wipe all keys from the specified storage." },
          { param: "hasItem(key, type?)", type: "boolean", required: false, description: "Check if a key exists in storage." },
          { param: "getAllKeys(type?)", type: "string[]", required: false, description: "Return all keys stored in the specified storage." },
        ]}
      />
      <p style={{ marginTop: "1rem" }}>
        The <code className="inline-code">type</code> parameter accepts <code className="inline-code">&quot;local&quot;</code>{" "}
        (default) or <code className="inline-code">&quot;session&quot;</code>.
      </p>
      <CodeBlock
        lang="typescript"
        code={`import { setItem, getItem, removeItem, clearStorage, hasItem, getAllKeys } from 'webdev-power-kit';

// Store any serializable value
setItem('name', 'Aditya');
setItem('score', 42);
setItem('settings', { theme: 'dark', lang: 'en' });
setItem('token', 'abc123', 'session'); // sessionStorage

// Retrieve with TypeScript generics
const name = getItem<string>('name');          // 'Aditya'
const score = getItem<number>('score');        // 42
const settings = getItem<{ theme: string }>('settings'); // { theme: 'dark', ... }

// Check existence
console.log(hasItem('name'));  // true
console.log(hasItem('ghost')); // false

// List all keys
console.log(getAllKeys()); // ['name', 'score', 'settings']

// Remove
removeItem('name');

// Clear all localStorage
clearStorage('local');
// Clear all sessionStorage
clearStorage('session');`}
      />
      <Callout type="tip" title="Incognito Mode Safe">
        The storage functions silently handle cases where storage is unavailable (e.g., disabled in
        private/incognito mode) instead of throwing — returning null or empty arrays gracefully.
      </Callout>
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Tab Visibility
// ─────────────────────────────────────────────
function SectionTabVisibility() {
  return (
    <section id="tab-visibility">
      <h1>Tab Visibility</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-green">Synchronous + Event</span>
      </div>
      <p>Detect whether the current browser tab is visible or hidden. Useful for pausing animations, polls, or background tasks.</p>

      <h2>isTabVisible()</h2>
      <div className="fn-signature">isTabVisible(): boolean</div>
      <p>Returns <code className="inline-code">true</code> if the tab is currently active and visible.</p>

      <h2>onTabVisibilityChange(callback)</h2>
      <div className="fn-signature">onTabVisibilityChange(callback: (isVisible: boolean) =&gt; void): void</div>
      <p>Subscribes to the <code className="inline-code">visibilitychange</code> document event.</p>
      <ApiTable
        rows={[
          { param: "callback", type: "(isVisible: boolean) => void", required: true, description: "Fires with true when tab becomes visible, false when hidden." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { isTabVisible, onTabVisibilityChange } from 'webdev-power-kit';

// Instant check
console.log('Visible now?', isTabVisible());

// Pause video when tab is hidden
const video = document.querySelector('video')!;
onTabVisibilityChange((visible) => {
  if (visible) {
    video.play();
  } else {
    video.pause();
  }
});`}
      />
      <h2>Pause API Polling When Hidden</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect, useRef } from 'react';
import { isTabVisible, onTabVisibilityChange } from 'webdev-power-kit';

export function usePausedPolling(callback: () => void, intervalMs: number) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(callback, intervalMs);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (isTabVisible()) start(); else stop();
    onTabVisibilityChange((visible) => visible ? start() : stop());
    return stop;
  }, []);
}`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Idle Timer
// ─────────────────────────────────────────────
function SectionIdleTimer() {
  return (
    <section id="idle-timer">
      <h1>Idle Timer</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-cyan">Event-based</span>
      </div>
      <p>Detect user inactivity. Monitors mouse, keyboard, touch, and scroll events to know when the user has gone idle.</p>

      <h2>startIdleTimer(timeout, callback)</h2>
      <div className="fn-signature">startIdleTimer(timeout: number, callback: () =&gt; void): void</div>
      <ApiTable
        rows={[
          { param: "timeout", type: "number", required: true, description: "Time in milliseconds before the user is considered idle." },
          { param: "callback", type: "() => void", required: true, description: "Function to call when the user becomes idle." },
        ]}
      />

      <h2>resetIdleTimer()</h2>
      <div className="fn-signature">resetIdleTimer(): void</div>
      <p>Manually resets the idle countdown without stopping the watcher.</p>

      <h2>stopIdleTimer()</h2>
      <div className="fn-signature">stopIdleTimer(): void</div>
      <p>Removes all event listeners and clears the timer. Always call on cleanup.</p>

      <p style={{ marginTop: "0.5rem" }}>Monitored events: <code className="inline-code">mousemove</code>, <code className="inline-code">keydown</code>, <code className="inline-code">mousedown</code>, <code className="inline-code">touchstart</code>, <code className="inline-code">scroll</code></p>
      <CodeBlock
        lang="typescript"
        code={`import { startIdleTimer, resetIdleTimer, stopIdleTimer } from 'webdev-power-kit';

// Start a 5-minute idle timer
startIdleTimer(5 * 60 * 1000, () => {
  console.log('User is idle! Locking screen...');
  window.location.href = '/lock';
});

// Manually reset (e.g., after an API call that confirms activity)
resetIdleTimer();

// Cleanup on logout
stopIdleTimer();`}
      />
      <h2>React — Auto-logout on Idle</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect } from 'react';
import { startIdleTimer, stopIdleTimer } from 'webdev-power-kit';

export function useIdleLogout(timeoutMs = 10 * 60 * 1000) {
  useEffect(() => {
    startIdleTimer(timeoutMs, () => {
      // Auto-logout after inactivity
      console.log('Session expired due to inactivity');
      window.location.href = '/logout';
    });

    return () => stopIdleTimer();
  }, [timeoutMs]);
}`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Vibration
// ─────────────────────────────────────────────
function SectionVibration() {
  return (
    <section id="vibration">
      <h1>Vibration</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-green">Synchronous</span>
        <span className="badge badge-pink">Mobile Mostly</span>
      </div>
      <p>Trigger haptic feedback on mobile devices. Provide tactile confirmation for important actions.</p>

      <h2>vibrate(pattern)</h2>
      <div className="fn-signature">vibrate(pattern: number | number[]): boolean</div>
      <p>Vibrates the device. Returns <code className="inline-code">true</code> on success, <code className="inline-code">false</code> if not supported.</p>
      <ApiTable
        rows={[
          { param: "pattern", type: "number | number[]", required: true, description: "Single ms duration, or alternating [vibrate, pause, vibrate, ...] pattern." },
        ]}
      />

      <h2>stopVibration()</h2>
      <div className="fn-signature">stopVibration(): void</div>
      <p>Immediately stops any ongoing vibration.</p>
      <CodeBlock
        lang="typescript"
        code={`import { vibrate, stopVibration } from 'webdev-power-kit';

// Simple 200ms buzz
vibrate(200);

// Pattern: vibrate 300ms, pause 100ms, vibrate 300ms (SOS-like)
vibrate([300, 100, 300, 100, 300]);

// Short double-tap
vibrate([50, 30, 50]);

// Stop any vibration
stopVibration();`}
      />
      <h2>Common Patterns</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem", margin: "1rem 0" }}>
        {[
          { name: "Success", code: "[100, 50, 100]", desc: "Double short buzz" },
          { name: "Error", code: "[300, 100, 300]", desc: "Heavy, pause, heavy" },
          { name: "Tap", code: "50", desc: "Single short tap" },
          { name: "Notification", code: "[200, 100, 200, 100, 200]", desc: "Triple buzz" },
        ].map((p) => (
          <div key={p.name} className="card" style={{ padding: "1rem" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{p.name}</div>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--accent-cyan-light)" }}>{p.code}</code>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Prevent Close
// ─────────────────────────────────────────────
function SectionPreventClose() {
  return (
    <section id="prevent-close">
      <h1>Prevent Close</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-purple">Browser API</span>
        <span className="badge badge-green">Synchronous</span>
      </div>
      <p>Warn users before they accidentally close or refresh the tab when they have unsaved changes.</p>

      <h2>enablePreventClose(message?)</h2>
      <div className="fn-signature">enablePreventClose(message?: string): void</div>
      <p>Attaches a <code className="inline-code">beforeunload</code> event to warn the user before closing/navigating away.</p>
      <ApiTable
        rows={[
          { param: "message", type: "string", required: false, description: 'Custom message for the dialog.', default: '"Are you sure you want to leave? Changes may not be saved."' },
        ]}
      />

      <h2>disablePreventClose()</h2>
      <div className="fn-signature">disablePreventClose(): void</div>
      <p>Removes the warning. Call this after the user saves their work.</p>
      <CodeBlock
        lang="typescript"
        code={`import { enablePreventClose, disablePreventClose } from 'webdev-power-kit';

// Enable when user starts editing
const input = document.querySelector('#editor')!;
input.addEventListener('input', () => {
  enablePreventClose('You have unsaved changes. Leave anyway?');
});

// Disable after save
async function handleSave() {
  await saveToServer();
  disablePreventClose(); // Safe to leave now
}`}
      />
      <Callout type="info" title="Browser Behavior">
        Modern browsers show a generic message regardless of the custom message you provide for security
        reasons. The user will still see a native dialog prompting them to confirm leaving.
      </Callout>
      <h2>React Form Guard</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect } from 'react';
import { enablePreventClose, disablePreventClose } from 'webdev-power-kit';

export function useUnsavedChangesGuard(isDirty: boolean) {
  useEffect(() => {
    if (isDirty) {
      enablePreventClose();
    } else {
      disablePreventClose();
    }
    return () => disablePreventClose();
  }, [isDirty]);
}

// Usage in a form:
export function EditForm() {
  const [isDirty, setIsDirty] = useState(false);
  useUnsavedChangesGuard(isDirty);

  return (
    <form onChange={() => setIsDirty(true)}
          onSubmit={() => setIsDirty(false)}>
      {/* ... */}
    </form>
  );
}`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: OTP
// ─────────────────────────────────────────────
function SectionOTP() {
  return (
    <section id="otp">
      <h1>OTP Generator</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-cyan">Utility</span>
        <span className="badge badge-green">Cryptographically Secure</span>
        <span className="badge badge-green">Synchronous</span>
      </div>
      <p>
        Generate cryptographically secure One-Time Passwords using <code className="inline-code">crypto.getRandomValues()</code>.
        Supports digits, letters, uppercase, and special symbols.
      </p>

      <h2>generateOTP(length, options?)</h2>
      <div className="fn-signature">generateOTP(length: number, options?: OTPOptions): string</div>
      <ApiTable
        rows={[
          { param: "length", type: "number", required: true, description: "The total length of the generated OTP." },
          { param: "options.digits", type: "boolean", required: false, description: "Include numeric characters 0–9.", default: "true" },
          { param: "options.lowerCase", type: "boolean", required: false, description: "Include lowercase letters a–z.", default: "false" },
          { param: "options.upperCase", type: "boolean", required: false, description: "Include uppercase letters A–Z.", default: "false" },
          { param: "options.symbols", type: "boolean", required: false, description: "Include symbols: !@#$%^&*()_+[]{}<>?", default: "false" },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { generateOTP } from 'webdev-power-kit';

// 6-digit numeric PIN (default)
const pin = generateOTP(6);
// → "847291"

// 8-character alphanumeric (mixed case)
const token = generateOTP(8, { digits: true, upperCase: true, lowerCase: true });
// → "aB3xKp7Q"

// 12-character strong password
const password = generateOTP(12, {
  digits: true,
  upperCase: true,
  lowerCase: true,
  symbols: true,
});
// → "aK#7mX!2pL@9"

// Must enable at least one type or throws:
generateOTP(6, {}); // ❌ throws Error: "At least one character type must be enabled"`}
      />
      <h2>Why Cryptographically Secure?</h2>
      <p>
        Unlike <code className="inline-code">Math.random()</code> (which is pseudorandom and predictable),{" "}
        <code className="inline-code">crypto.getRandomValues()</code> uses the operating system&apos;s
        secure random number generator. This makes the OTPs suitable for security-sensitive flows
        like 2FA codes, reset tokens, and invite links.
      </p>
      <Callout type="tip" title="Perfect For">
        Email verification codes, SMS 2FA codes, temporary invite tokens, CAPTCHA tokens, session IDs, and random passwords.
      </Callout>
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Debounce
// ─────────────────────────────────────────────
function SectionDebounce() {
  return (
    <section id="debounce">
      <h1>Debounce</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-orange">Performance</span>
        <span className="badge badge-green">TypeScript Generics</span>
      </div>
      <p>
        Creates a debounced version of a function that delays its execution until after a specified wait
        period has elapsed since the last invocation. Essential for input fields, search boxes, and resize handlers.
      </p>

      <h2>debounce(fn, delay)</h2>
      <div className="fn-signature">debounce&lt;T&gt;(fn: T, delay: number): DebouncedFunction&lt;T&gt;</div>
      <ApiTable
        rows={[
          { param: "fn", type: "(...args: any[]) => void", required: true, description: "The function to debounce." },
          { param: "delay", type: "number", required: true, description: "Milliseconds to wait after the last invocation before calling fn." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { debounce } from 'webdev-power-kit';

// Search input — only fires 300ms after user stops typing
const search = debounce(async (query: string) => {
  const results = await fetchSearchResults(query);
  renderResults(results);
}, 300);

document.querySelector('#search-input')!
  .addEventListener('input', (e) => {
    search((e.target as HTMLInputElement).value);
  });

// Window resize handler — expensive layout recalculation
const handleResize = debounce(() => {
  recalculateLayout();
}, 150);

window.addEventListener('resize', handleResize);`}
      />
      <h2>React Search Hook</h2>
      <CodeBlock
        lang="tsx"
        code={`"use client";
import { useEffect, useState, useMemo } from 'react';
import { debounce } from 'webdev-power-kit';

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  const debouncedSetter = useMemo(
    () => debounce((val: T) => setDebounced(val), delay),
    [delay]
  );

  useEffect(() => {
    debouncedSetter(value);
  }, [value, debouncedSetter]);

  return debounced;
}

// Usage:
function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Throttle
// ─────────────────────────────────────────────
function SectionThrottle() {
  return (
    <section id="throttle">
      <h1>Throttle</h1>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span className="badge badge-orange">Performance</span>
        <span className="badge badge-green">TypeScript Generics</span>
      </div>
      <p>
        Limits how often a function can be called. Unlike debounce (which delays until idle), throttle
        ensures the function runs at most once per interval. Perfect for scroll events and mouse movements.
      </p>

      <h2>throttle(fn, interval)</h2>
      <div className="fn-signature">throttle&lt;T&gt;(fn: T, interval: number): ThrottledFunction&lt;T&gt;</div>
      <ApiTable
        rows={[
          { param: "fn", type: "(...args: any[]) => void", required: true, description: "The function to throttle." },
          { param: "interval", type: "number", required: true, description: "Minimum milliseconds between function calls." },
        ]}
      />
      <CodeBlock
        lang="typescript"
        code={`import { throttle } from 'webdev-power-kit';

// Scroll parallax — max 60fps (16ms interval)
const updateParallax = throttle((scrollY: number) => {
  document.querySelector('.hero')!
    .style.transform = \`translateY(\${scrollY * 0.3}px)\`;
}, 16);

window.addEventListener('scroll', () => updateParallax(window.scrollY));

// Mouse position tracker — max 30 updates/sec
const trackMouse = throttle((x: number, y: number) => {
  updateCursorPosition(x, y);
}, 33);

document.addEventListener('mousemove', (e) => trackMouse(e.clientX, e.clientY));`}
      />
      <h2>Debounce vs Throttle</h2>
      <div style={{ overflowX: "auto", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
        <table className="api-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Use</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Search input", "debounce", "Wait until user stops typing"],
              ["Window resize", "debounce", "Recalculate layout once, after resizing stops"],
              ["Scroll events", "throttle", "Run smoothly while scrolling (up to X/sec)"],
              ["Mouse tracking", "throttle", "Cap update rate for performance"],
              ["Button spam prevention", "throttle", "Allow first click, ignore rapid repeats"],
              ["Autocomplete API call", "debounce", "Only send request after pause"],
            ].map(([s, u, w]) => (
              <tr key={s}>
                <td style={{ color: "var(--text-secondary)" }}>{s}</td>
                <td>
                  <span className={`badge ${u === "debounce" ? "badge-purple" : "badge-cyan"}`}>{u}</span>
                </td>
                <td style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Changelog
// ─────────────────────────────────────────────
function SectionChangelog() {
  const releases = [
    {
      version: "2.1.5",
      date: "2025",
      type: "patch",
      changes: [
        "Improved TypeScript type exports for geolocation and storage modules",
        "Fixed edge case in idle timer when multiple startIdleTimer calls were made",
        "Updated JSDoc comments across all modules",
      ],
    },
    {
      version: "2.1.0",
      date: "2025",
      type: "minor",
      changes: [
        "Added testNetworkSpeed() for client-side download speed estimation",
        "Added ping() utility for server/API availability checks",
        "Added getConnectionInfo() for Network Information API",
        "Added getAllKeys() to storage module",
        "Added hasItem() to storage module",
      ],
    },
    {
      version: "2.0.0",
      date: "2025",
      type: "major",
      changes: [
        "Complete TypeScript rewrite — full type safety",
        "Modular sub-path exports (import from 'webdev-power-kit/browser/clipboard')",
        "Added throttle() and debounce() performance utilities",
        "Added ScreenInfo module",
        "Added IdleTimer module with stop/reset controls",
        "Breaking: renamed some internal function signatures for consistency",
      ],
    },
    {
      version: "1.x.x",
      date: "2024",
      type: "legacy",
      changes: ["Initial release with core browser API wrappers"],
    },
  ];
  return (
    <section id="changelog">
      <h1>Changelog</h1>
      <p>All notable changes following <a href="https://semver.org" target="_blank" rel="noopener" style={{ color: "var(--accent-purple-light)" }}>Semantic Versioning</a>.</p>
      <div style={{ marginTop: "2rem" }}>
        {releases.map((r) => (
          <div key={r.version} style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: r.type === "major" ? "var(--accent-purple)" : r.type === "minor" ? "var(--accent-cyan)" : r.type === "patch" ? "var(--accent-green)" : "var(--text-muted)", flexShrink: 0, marginTop: "0.35rem" }} />
              <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: "0.5rem" }} />
            </div>
            <div style={{ flex: 1, paddingBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>v{r.version}</span>
                <span className={`badge ${r.type === "major" ? "badge-purple" : r.type === "minor" ? "badge-cyan" : r.type === "patch" ? "badge-green" : "badge-orange"}`}>{r.type}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{r.date}</span>
              </div>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.8" }}>
                {r.changes.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: Contributing
// ─────────────────────────────────────────────
function SectionContributing() {
  return (
    <section id="contributing">
      <h1>Contributing</h1>
      <p>We welcome contributions! Here&apos;s how to get started:</p>
      <h2>1. Fork & Clone</h2>
      <CodeBlock lang="bash" code={`git clone https://github.com/dev-aditya-lab/webdev-power-kit.git
cd webdev-power-kit
npm install`} />
      <h2>2. Create a Branch</h2>
      <CodeBlock lang="bash" code={`git checkout -b feature/your-feature-name`} />
      <h2>3. Add Your Module</h2>
      <p>Every new feature must follow the module structure:</p>
      <CodeBlock lang="bash" code={`src/
  browser/
    your-feature/
      index.ts    ← Export your functions here`} />
      <h2>Module Checklist</h2>
      {[
        "Place in a dedicated folder with a meaningful name",
        "Export from index.ts with explicit TypeScript types",
        "Handle errors gracefully — never throw unhandled exceptions",
        "Include JSDoc comments on every exported function",
        "Check for browser API support before using it",
        "Export your module from src/browser/index.ts",
      ].map((item) => (
        <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.6rem 0", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          <span style={{ color: "var(--accent-green)", marginTop: "0.1rem" }}>✓</span>
          <span>{item}</span>
        </div>
      ))}
      <h2>4. Submit a PR</h2>
      <p>Open a pull request against <code className="inline-code">main</code>. For major changes, open an issue first to discuss.</p>
      <div style={{ marginTop: "1.5rem" }}>
        <a href="https://github.com/dev-aditya-lab/webdev-power-kit/issues" target="_blank" rel="noopener" className="btn btn-primary" style={{ marginRight: "1rem" }}>
          🐛 Report Issue
        </a>
        <a href="https://github.com/dev-aditya-lab/webdev-power-kit" target="_blank" rel="noopener" className="btn btn-secondary">
          ⭐ Star on GitHub
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  Section: FAQ
// ─────────────────────────────────────────────
function SectionFAQ() {
  const faqs = [
    {
      q: "Does it work with React / Next.js / Vue / Svelte?",
      a: "Yes! The library is framework-agnostic. It works with any JavaScript or TypeScript environment. For Next.js, remember to use 'use client' since these are browser APIs.",
    },
    {
      q: "Why do some features require HTTPS?",
      a: "Browser security policies restrict access to sensitive APIs (Clipboard write, Geolocation, Notifications) to secure contexts (https:// or localhost). Testing with file:// URLs won't work — use a dev server.",
    },
    {
      q: "Is this tree-shakeable?",
      a: "Yes! webdev-power-kit is a pure ES Module with no side effects. Modern bundlers like Vite, Rollup, and Webpack 5 will automatically tree-shake unused functions.",
    },
    {
      q: "Can I use just one module without importing everything?",
      a: "Absolutely. You can import from the top-level: import { copyToClipboard } from 'webdev-power-kit'. The bundler will only include what you use.",
    },
    {
      q: "Does it support CommonJS (require)?",
      a: "No. This is a pure ES Module package. CJS users will need a bundler that handles ESM interop, or can use a dynamic import().",
    },
    {
      q: "What happens if a browser doesn't support an API?",
      a: "Functions check for API support before calling it. They throw meaningful errors (e.g., 'Battery API not supported.') rather than cryptic browser errors. Some functions return false or an object with isSupported: false.",
    },
    {
      q: "Is the OTP generator truly secure?",
      a: "Yes. It uses crypto.getRandomValues() — the Web Cryptography API — which uses the operating system's CSPRNG. This is the same source used for cryptographic operations in browsers.",
    },
    {
      q: "How do I report a bug?",
      a: "Open an issue on GitHub: github.com/dev-aditya-lab/webdev-power-kit/issues. Include your browser version, the function you're calling, and the error message.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq">
      <h1>FAQ</h1>
      <p>Frequently asked questions about webdev-power-kit.</p>
      <div style={{ marginTop: "2rem" }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              borderBottom: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "1.25rem 0",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                fontWeight: 500,
              }}
            >
              <span>{faq.q}</span>
              <span style={{ color: "var(--text-muted)", transition: "transform 0.2s", transform: open === i ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>▾</span>
            </button>
            {open === i && (
              <div style={{ paddingBottom: "1.25rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.7" }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  Hero Page
// ─────────────────────────────────────────────
function HeroPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">
          <span>🚀</span> v2.1.5 — Now with Network Speed Testing
        </div>
        <h1 className="hero-title">
          <span className="hero-title-gradient">WebDev</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>Power Kit</span>
        </h1>
        <p className="hero-description">
          The ultimate TypeScript toolkit for modern browser APIs. Clipboard, Battery, Geolocation,
          Notifications, Storage, Network — all with one clean import, zero dependencies.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onNavigate("quick-start")} style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
            Get Started ⚡
          </button>
          <a href="https://github.com/dev-aditya-lab/webdev-power-kit" target="_blank" rel="noopener" className="btn btn-secondary" style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
            GitHub ⭐
          </a>
        </div>
        <div className="hero-badges" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <img src="https://img.shields.io/npm/v/webdev-power-kit?color=8b5cf6&labelColor=0d0d1a&label=npm&style=flat-square" alt="npm version" />
          <img src="https://img.shields.io/npm/dt/webdev-power-kit?color=06b6d4&labelColor=0d0d1a&label=downloads&style=flat-square" alt="downloads" />
          <img src="https://img.shields.io/badge/License-MIT-10b981?labelColor=0d0d1a&style=flat-square" alt="MIT License" />
          <img src="https://img.shields.io/badge/TypeScript-100%25-3178C6?labelColor=0d0d1a&style=flat-square" alt="TypeScript" />
          <img src="https://img.shields.io/badge/zero_deps-✓-f59e0b?labelColor=0d0d1a&style=flat-square" alt="zero dependencies" />
        </div>
      </div>

      {/* Quick Install */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            One install. Endless power.
          </h2>
          <p style={{ color: "var(--text-secondary)" }}>Stop reinventing the wheel. Ship faster.</p>
        </div>
        <CodeBlock
          lang="bash"
          code="npm install webdev-power-kit"
        />
        <CodeBlock
          lang="typescript"
          code={`import {
  copyToClipboard,    // 📋 Clipboard
  getBatteryLevel,    // 🔋 Battery
  sendNotification,   // 🔔 Notifications
  getCurrentLocation, // 📍 Geolocation
  isOnline,           // 🌐 Network
  generateOTP,        // 🔐 Secure OTP
  debounce,           // ⏳ Performance
  setItem, getItem,   // 💾 Storage
} from 'webdev-power-kit';`}
        />

        {/* Feature Grid */}
        <div style={{ textAlign: "center", margin: "4rem 0 2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Everything you need
          </h2>
          <p style={{ color: "var(--text-secondary)" }}>15 functions across 3 modules.</p>
        </div>
        <div className="feature-grid">
          {[
            { icon: "📋", color: "rgba(139,92,246,0.2)", title: "Clipboard", desc: "Read & write clipboard with 1 line", id: "clipboard" },
            { icon: "🔋", color: "rgba(6,182,212,0.2)", title: "Battery", desc: "Monitor battery level & charging", id: "battery" },
            { icon: "🔔", color: "rgba(236,72,153,0.2)", title: "Notifications", desc: "Desktop push notifications", id: "notifications" },
            { icon: "🌙", color: "rgba(139,92,246,0.15)", title: "Dark Mode", desc: "Detect & react to system theme", id: "dark-mode" },
            { icon: "📍", color: "rgba(16,185,129,0.2)", title: "Geolocation", desc: "GPS location & live tracking", id: "geolocation" },
            { icon: "🌐", color: "rgba(6,182,212,0.15)", title: "Network", desc: "Speed test, ping, connection info", id: "network" },
            { icon: "🖥️", color: "rgba(245,158,11,0.15)", title: "Screen Info", desc: "Viewport, pixel ratio, orientation", id: "screen-info" },
            { icon: "💾", color: "rgba(16,185,129,0.15)", title: "Storage", desc: "Type-safe localStorage wrapper", id: "storage" },
            { icon: "👁️", color: "rgba(139,92,246,0.12)", title: "Tab Visibility", desc: "Pause/resume on tab focus", id: "tab-visibility" },
            { icon: "⏱️", color: "rgba(245,158,11,0.12)", title: "Idle Timer", desc: "Auto-detect user inactivity", id: "idle-timer" },
            { icon: "📳", color: "rgba(236,72,153,0.15)", title: "Vibration", desc: "Haptic patterns for mobile", id: "vibration" },
            { icon: "🔐", color: "rgba(16,185,129,0.12)", title: "OTP Generator", desc: "Cryptographically secure OTPs", id: "otp" },
          ].map((f) => (
            <div
              key={f.id}
              className="feature-card"
              style={{ cursor: "pointer" }}
              onClick={() => onNavigate(f.id)}
            >
              <div className="feature-card-icon" style={{ background: f.color }}>{f.icon}</div>
              <div className="feature-card-title">{f.title}</div>
              <div className="feature-card-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Author Card */}
        <div style={{ marginTop: "5rem", padding: "2rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--gradient-accent)", margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", boxShadow: "var(--shadow-glow-purple)" }}>
            👨‍💻
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>Aditya Kumar Gupta</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>CS Engineer • Web Developer • Open Source Enthusiast</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://github.com/dev-aditya-lab" target="_blank" rel="noopener" className="btn btn-secondary" style={{ fontSize: "0.85rem" }}>
              GitHub Profile
            </a>
            <a href="https://github.com/dev-aditya-lab/webdev-power-kit/issues" target="_blank" rel="noopener" className="btn btn-ghost" style={{ fontSize: "0.85rem" }}>
              Report Issue
            </a>
            <span className="pill" style={{ fontSize: "0.78rem" }}>MIT License</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Section Router
// ─────────────────────────────────────────────
const SECTIONS: Record<string, React.FC> = {
  introduction: SectionIntroduction,
  installation: SectionInstallation,
  "quick-start": SectionQuickStart,
  typescript: SectionTypeScript,
  clipboard: SectionClipboard,
  battery: SectionBattery,
  notifications: SectionNotifications,
  "dark-mode": SectionDarkMode,
  geolocation: SectionGeolocation,
  network: SectionNetwork,
  "screen-info": SectionScreenInfo,
  storage: SectionStorage,
  "tab-visibility": SectionTabVisibility,
  "idle-timer": SectionIdleTimer,
  vibration: SectionVibration,
  "prevent-close": SectionPreventClose,
  otp: SectionOTP,
  debounce: SectionDebounce,
  throttle: SectionThrottle,
  changelog: SectionChangelog,
  contributing: SectionContributing,
  faq: SectionFAQ,
};

// ─────────────────────────────────────────────
//  Main App
// ─────────────────────────────────────────────
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const navigateTo = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0 });
  };

  // Keyboard shortcut: Cmd+K to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filteredNav = searchQuery
    ? NAV.map((s) => ({
        ...s,
        links: s.links.filter((l) =>
          l.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((s) => s.links.length > 0)
    : NAV;

  const ActiveSection = activeSection ? SECTIONS[activeSection] : null;

  return (
    <>
      {/* Sidebar overlay (mobile) */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-header">
          <a
            className="sidebar-logo"
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveSection(null); setSidebarOpen(false); window.scrollTo({ top: 0 }); }}
          >
            <div className="sidebar-logo-icon">⚡</div>
            <div>
              <div className="sidebar-logo-text">WebDev Power Kit</div>
              <div className="sidebar-logo-version">v2.1.5 docs</div>
            </div>
          </a>
          {/* Search */}
          <div style={{ marginTop: "1rem", position: "relative" }}>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search docs…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-glass)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "0.4rem 0.75rem 0.4rem 2rem",
                color: "var(--text-secondary)",
                fontSize: "0.8rem",
                fontFamily: "var(--font-sans)",
                outline: "none",
              }}
            />
            <span style={{ position: "absolute", left: "0.6rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "0.8rem" }}>🔍</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {filteredNav.map((s) => (
            <div key={s.section} className="sidebar-section">
              <div className="sidebar-section-title">{s.section}</div>
              {s.links.map((link) => (
                <div
                  key={link.id}
                  className={`sidebar-link${activeSection === link.id ? " active" : ""}`}
                  onClick={() => navigateTo(link.id)}
                >
                  <span className="sidebar-link-icon">{link.icon}</span>
                  {link.label}
                </div>
              ))}
            </div>
          ))}
        </nav>
        {/* Sidebar Footer */}
        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", marginTop: "auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <a href="https://github.com/dev-aditya-lab/webdev-power-kit" target="_blank" rel="noopener" style={{ color: "var(--text-muted)", fontSize: "0.75rem", textDecoration: "none" }}>GitHub</a>
            <span style={{ color: "var(--border)" }}>·</span>
            <a href="https://www.npmjs.com/package/webdev-power-kit" target="_blank" rel="noopener" style={{ color: "var(--text-muted)", fontSize: "0.75rem", textDecoration: "none" }}>npm</a>
            <span style={{ color: "var(--border)" }}>·</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>MIT</span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.7rem", marginTop: "0.5rem" }}>
            Made with ❤️ by Aditya Kumar Gupta
          </p>
        </div>
      </aside>

      {/* Header */}
      <header className="header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          {activeSection && (
            <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem" }}>
              <span
                style={{ color: "var(--text-muted)", cursor: "pointer" }}
                onClick={() => { setActiveSection(null); window.scrollTo({ top: 0 }); }}
              >
                Docs
              </span>
              <span style={{ color: "var(--border)" }}>/</span>
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                {NAV.flatMap((s) => s.links).find((l) => l.id === activeSection)?.label}
              </span>
            </nav>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href="https://github.com/dev-aditya-lab/webdev-power-kit"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
            style={{ fontSize: "0.82rem" }}
          >
            <span>⭐</span> GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/webdev-power-kit"
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
            style={{ fontSize: "0.82rem", padding: "0.45rem 0.9rem" }}
          >
            npm
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        {ActiveSection ? (
          <div className="content-page">
            <ActiveSection />
            {/* Prev / Next navigation */}
            <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              {(() => {
                const allLinks = NAV.flatMap((s) => s.links);
                const idx = allLinks.findIndex((l) => l.id === activeSection);
                const prev = idx > 0 ? allLinks[idx - 1] : null;
                const next = idx < allLinks.length - 1 ? allLinks[idx + 1] : null;
                return (
                  <>
                    {prev ? (
                      <button className="btn btn-secondary" onClick={() => navigateTo(prev.id)}>
                        ← {prev.label}
                      </button>
                    ) : <div />}
                    {next ? (
                      <button className="btn btn-secondary" onClick={() => navigateTo(next.id)}>
                        {next.label} →
                      </button>
                    ) : <div />}
                  </>
                );
              })()}
            </div>
          </div>
        ) : (
          <HeroPage onNavigate={navigateTo} />
        )}
      </main>
    </>
  );
}
