"use client";

import { useState, useEffect, useRef } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import {
  Callout,
  ParamTable,
  BrowserSupport as BrowserSupportBase,
} from "@/components/DocComponents";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ApiShowcase } from "@/components/landing/ApiShowcase";
import { CodeDemo } from "@/components/landing/CodeDemo";
import { GetStarted } from "@/components/landing/GetStarted";
import { Author } from "@/components/landing/Author";
import { Footer } from "@/components/layout/Footer";
import { ALL_NAV_ITEMS } from "@/lib/nav";

// ─────────────────────────────────────────────
//  Adapter: old ApiTable → new ParamTable
// ─────────────────────────────────────────────
function ApiTable({
  rows,
}: {
  rows: { param: string; type: string; required?: boolean; description: string; default?: string }[];
}) {
  return (
    <ParamTable
      rows={rows.map((r) => ({
        name: r.param,
        type: r.type,
        required: r.required,
        description: r.description,
        defaultValue: r.default,
      }))}
    />
  );
}

// ─────────────────────────────────────────────
//  Adapter: old BrowserSupport → new component
// ─────────────────────────────────────────────
function BrowserSupport({
  items,
}: {
  items: { browser: string; icon: string; supported: boolean | "partial" }[];
}) {
  return (
    <BrowserSupportBase
      items={items.map((b) => ({
        name: b.browser,
        status:
          b.supported === true
            ? ("yes" as const)
            : b.supported === "partial"
              ? ("partial" as const)
              : ("no" as const),
      }))}
    />
  );
}

// ─────────────────────────────────────────────
// Doc section components (kept inline for SPA compatibility)
// Each section is a self-contained function
// To add a new section: 1) Add function here, 2) Add to SECTIONS map, 3) Add to nav.ts
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
        webdev-power-kit is a pure ES Module (<code className="inline-code">type: &quot;module&quot;</code>). It works
        natively with modern bundlers (Vite, Webpack 5, Rollup) and Next.js.
      </Callout>
    </section>
  );
}

function SectionQuickStart() {
  return (
    <section id="quick-start">
      <h1>Quick Start</h1>
      <p>Get up and running in under 60 seconds.</p>
      <h2>1. Install</h2>
      <CodeBlock lang="bash" code="npm install webdev-power-kit" />
      <h2>2. Import &amp; Use</h2>
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
    vibrate([100, 50, 100]);
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
    </section>
  );
}

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
} from 'webdev-power-kit';`}
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

setItem<UserProfile>('user', { name: 'Aditya', theme: 'dark', score: 42 });

const user = getItem<UserProfile>('user');
//    ^ UserProfile | null
console.log(user?.name);`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
// Section map: add new sections HERE
// Just add a new key-value pair — no other changes needed
// ─────────────────────────────────────────────
const SECTION_REGISTRY: Record<string, React.ComponentType> = {
  introduction: SectionIntroduction,
  installation: SectionInstallation,
  "quick-start": SectionQuickStart,
  typescript: SectionTypeScript,
  // Browser API sections, Utilities, Performance, and Project sections
  // are rendered dynamically below via DYNAMIC_SECTIONS
};

// Sections rendered from page.tsx (22 total — existing docs, unchanged)
// We keep them in the original file for SPA compatibility.
// They're imported from the remaining sections in page.tsx itself.

// ─────────────────────────────────────────────
// Main App Component
// ─────────────────────────────────────────────

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const isScrolling = useRef(false);

  // Observe sections for active highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveId(entry.target.id || null);
          }
        }
      },
      { threshold: [0.3], rootMargin: "-60px 0px -40% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((el) => {
      observer.observe(el);
      sectionRefs.current.set(el.id, el as HTMLElement);
    });

    return () => observer.disconnect();
  }, [activeId]);

  const navigateTo = (id: string) => {
    if (id === "__home__") {
      setActiveId(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    isScrolling.current = true;
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { isScrolling.current = false; }, 800);
    }
    setSidebarOpen(false);
  };

  const isHome = !activeId;

  return (
    <div className="layout">
      <Sidebar
        activeId={activeId}
        onNavigate={navigateTo}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="page-content">
        <Navbar
          activeId={activeId}
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          sidebarOpen={sidebarOpen}
        />

        <main>
          {/* ── Landing Page ── */}
          {isHome && (
            <>
              <Hero onNavigate={navigateTo} />
              <ApiShowcase onNavigate={navigateTo} />
              <CodeDemo onNavigate={navigateTo} />
              <GetStarted onNavigate={navigateTo} />
              <Author />
              <Footer />
            </>
          )}

          {/* ── Docs ── */}
          {!isHome && (
            <div className="doc-page">
              {/* Render the matching doc section */}
              <DocSectionRenderer activeId={activeId} navigateTo={navigateTo} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Doc section renderer — delegates to section components
// ─────────────────────────────────────────────
function DocSectionRenderer({
  activeId,
  navigateTo,
}: {
  activeId: string | null;
  navigateTo: (id: string) => void;
}) {
  if (!activeId) return null;

  // Getting started sections
  if (activeId === "introduction") return <SectionIntroduction />;
  if (activeId === "installation") return <SectionInstallation />;
  if (activeId === "quick-start") return <SectionQuickStart />;
  if (activeId === "typescript") return <SectionTypeScript />;

  // For all other sections, show a clean placeholder
  // (the full 22-section content from the original page.tsx follows below)
  return <LegacyDocSections activeId={activeId} />;
}

// ─────────────────────────────────────────────
// Legacy doc sections — all remaining browser/utils/perf/project docs
// These remain as-is so nothing breaks
// ─────────────────────────────────────────────
function LegacyDocSections({ activeId }: { activeId: string }) {
  // We render ALL sections but only the matching one is visible
  // This matches the original scroll-based approach
  return (
    <div>
      <SectionClipboard id="clipboard" active={activeId === "clipboard"} />
      <SectionBattery id="battery" active={activeId === "battery"} />
      <SectionNotifications id="notifications" active={activeId === "notifications"} />
      <SectionDarkMode id="dark-mode" active={activeId === "dark-mode"} />
      <SectionGeolocation id="geolocation" active={activeId === "geolocation"} />
      <SectionNetwork id="network" active={activeId === "network"} />
      <SectionScreenInfo id="screen-info" active={activeId === "screen-info"} />
      <SectionStorage id="storage" active={activeId === "storage"} />
      <SectionTabVisibility id="tab-visibility" active={activeId === "tab-visibility"} />
      <SectionIdleTimer id="idle-timer" active={activeId === "idle-timer"} />
      <SectionVibration id="vibration" active={activeId === "vibration"} />
      <SectionPreventClose id="prevent-close" active={activeId === "prevent-close"} />
      <SectionOTP id="otp" active={activeId === "otp"} />
      <SectionDebounce id="debounce" active={activeId === "debounce"} />
      <SectionThrottle id="throttle" active={activeId === "throttle"} />
      <SectionChangelog id="changelog" active={activeId === "changelog"} />
      <SectionContributing id="contributing" active={activeId === "contributing"} />
      <SectionFAQ id="faq" active={activeId === "faq"} />
    </div>
  );
}

// Show only the matching section, hide others
function SectionClipboard({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Clipboard</h1>
      <p>Copy text to the clipboard and read clipboard contents using a clean, typed API.</p>
      <h2>copyToClipboard</h2>
      <div className="fn-sig">copyToClipboard(text: string): Promise&lt;void&gt;</div>
      <ApiTable rows={[
        { param: "text", type: "string", required: true, description: "The text to copy to the clipboard." },
      ]} />
      <CodeBlock lang="typescript" code={`import { copyToClipboard } from 'webdev-power-kit';
await copyToClipboard('Hello, World!');`} />
      <BrowserSupport items={[
        { browser: "Chrome", icon: "chrome", supported: true },
        { browser: "Firefox", icon: "firefox", supported: true },
        { browser: "Safari", icon: "safari", supported: true },
        { browser: "Edge", icon: "edge", supported: true },
      ]} />
    </section>
  );
}

function SectionBattery({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Battery</h1>
      <p>Monitor battery level, charging status, and subscribe to battery events.</p>
      <h2>getBatteryLevel</h2>
      <div className="fn-sig">getBatteryLevel(): Promise&lt;number&gt;</div>
      <p>Returns the battery level as a percentage (0–100).</p>
      <CodeBlock lang="typescript" code={`import { getBatteryLevel } from 'webdev-power-kit';
const level = await getBatteryLevel();
console.log(\`Battery: \${level}%\`);`} />
      <BrowserSupport items={[
        { browser: "Chrome", icon: "chrome", supported: true },
        { browser: "Firefox", icon: "firefox", supported: false },
        { browser: "Safari", icon: "safari", supported: false },
        { browser: "Edge", icon: "edge", supported: true },
      ]} />
    </section>
  );
}

function SectionNotifications({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Notifications</h1>
      <p>Send native browser notifications with a single function call.</p>
      <h2>sendNotification</h2>
      <div className="fn-sig">sendNotification(title: string, options?: NotificationOptions): Promise&lt;void&gt;</div>
      <CodeBlock lang="typescript" code={`import { sendNotification } from 'webdev-power-kit';
await sendNotification('Hello!', { body: 'Notification body', icon: '/icon.png' });`} />
    </section>
  );
}

function SectionDarkMode({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Dark Mode</h1>
      <p>Detect and toggle the user&apos;s preferred color scheme.</p>
      <h2>isDarkMode</h2>
      <div className="fn-sig">isDarkMode(): boolean</div>
      <CodeBlock lang="typescript" code={`import { isDarkMode, onDarkModeChange } from 'webdev-power-kit';
console.log(isDarkMode()); // true | false
onDarkModeChange((dark) => {
  document.body.classList.toggle('dark', dark);
});`} />
    </section>
  );
}

function SectionGeolocation({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Geolocation</h1>
      <p>Get the user&apos;s GPS coordinates with a clean promise-based API.</p>
      <h2>getLocation</h2>
      <div className="fn-sig">getLocation(options?: LocationOptions): Promise&lt;Coordinates&gt;</div>
      <CodeBlock lang="typescript" code={`import { getLocation } from 'webdev-power-kit';
const coords = await getLocation();
console.log(coords.latitude, coords.longitude);`} />
    </section>
  );
}

function SectionNetwork({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Network</h1>
      <p>Monitor online/offline status and run speed tests.</p>
      <h2>isOnline</h2>
      <div className="fn-sig">isOnline(): boolean</div>
      <h2>onNetworkChange</h2>
      <div className="fn-sig">onNetworkChange(callback: (status: boolean) =&gt; void): () =&gt; void</div>
      <CodeBlock lang="typescript" code={`import { isOnline, onNetworkChange } from 'webdev-power-kit';
console.log(isOnline()); // true | false
const stop = onNetworkChange((online) => {
  console.log(online ? 'Back online!' : 'Offline');
});`} />
    </section>
  );
}

function SectionScreenInfo({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Screen Info</h1>
      <p>Get viewport dimensions, device pixel ratio, and orientation.</p>
      <h2>getScreenInfo</h2>
      <div className="fn-sig">getScreenInfo(): ScreenInfo</div>
      <CodeBlock lang="typescript" code={`import { getScreenInfo } from 'webdev-power-kit';
const info = getScreenInfo();
console.log(info.width, info.height, info.dpr);`} />
    </section>
  );
}

function SectionStorage({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Storage</h1>
      <p>Typed localStorage wrapper with generics for full type safety.</p>
      <h2>setItem / getItem</h2>
      <div className="fn-sig">setItem&lt;T&gt;(key: string, value: T): void</div>
      <div className="fn-sig">getItem&lt;T&gt;(key: string): T | null</div>
      <CodeBlock lang="typescript" code={`import { setItem, getItem, removeItem } from 'webdev-power-kit';

interface User { name: string; theme: 'light' | 'dark'; }
setItem<User>('user', { name: 'Aditya', theme: 'dark' });
const user = getItem<User>('user'); // User | null
removeItem('user');`} />
    </section>
  );
}

function SectionTabVisibility({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Tab Visibility</h1>
      <p>Detect when the user switches tabs or minimizes the browser.</p>
      <h2>onTabVisibilityChange</h2>
      <div className="fn-sig">onTabVisibilityChange(callback: (visible: boolean) =&gt; void): () =&gt; void</div>
      <CodeBlock lang="typescript" code={`import { onTabVisibilityChange } from 'webdev-power-kit';
const stop = onTabVisibilityChange((visible) => {
  if (!visible) pauseAnimation();
  else resumeAnimation();
});`} />
    </section>
  );
}

function SectionIdleTimer({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Idle Timer</h1>
      <p>Detect user inactivity and trigger callbacks after a configurable timeout.</p>
      <h2>onIdle</h2>
      <div className="fn-sig">onIdle(callback: () =&gt; void, timeout?: number): () =&gt; void</div>
      <CodeBlock lang="typescript" code={`import { onIdle } from 'webdev-power-kit';
// Fire callback after 30s of inactivity
const stop = onIdle(() => {
  console.log('User is idle');
}, 30000);`} />
    </section>
  );
}

function SectionVibration({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Vibration</h1>
      <p>Trigger haptic feedback patterns on mobile devices.</p>
      <h2>vibrate</h2>
      <div className="fn-sig">vibrate(pattern: number | number[]): boolean</div>
      <CodeBlock lang="typescript" code={`import { vibrate } from 'webdev-power-kit';
vibrate(200);             // 200ms pulse
vibrate([200, 100, 200]); // pattern: vibrate, pause, vibrate`} />
    </section>
  );
}

function SectionPreventClose({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Prevent Close</h1>
      <p>Block accidental tab closes with a confirmation dialog.</p>
      <h2>enablePreventClose / disablePreventClose</h2>
      <CodeBlock lang="typescript" code={`import { enablePreventClose, disablePreventClose } from 'webdev-power-kit';
enablePreventClose(); // Shows "Are you sure?" on close
// When safe to close:
disablePreventClose();`} />
    </section>
  );
}

function SectionOTP({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>OTP Generator</h1>
      <p>Generate cryptographically secure one-time passwords.</p>
      <h2>generateOTP</h2>
      <div className="fn-sig">generateOTP(length?: number, options?: OTPOptions): string</div>
      <ApiTable rows={[
        { param: "length", type: "number", required: false, description: "Length of the OTP.", default: "6" },
        { param: "digits", type: "boolean", required: false, description: "Include digits (0-9).", default: "true" },
        { param: "upperCase", type: "boolean", required: false, description: "Include uppercase letters.", default: "false" },
        { param: "lowerCase", type: "boolean", required: false, description: "Include lowercase letters.", default: "false" },
        { param: "symbols", type: "boolean", required: false, description: "Include symbols.", default: "false" },
      ]} />
      <CodeBlock lang="typescript" code={`import { generateOTP } from 'webdev-power-kit';
const otp = generateOTP(6);                    // '472819'
const alphaOtp = generateOTP(8, {              // 'aX3bY7pQ'
  digits: true, upperCase: true, lowerCase: true
});`} />
    </section>
  );
}

function SectionDebounce({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Debounce</h1>
      <p>Delay function execution until after a quiet period.</p>
      <h2>debounce</h2>
      <div className="fn-sig">debounce&lt;T extends (...args: any[]) =&gt; void&gt;(fn: T, delay: number): T</div>
      <CodeBlock lang="typescript" code={`import { debounce } from 'webdev-power-kit';
const handleSearch = debounce((query: string) => {
  fetchResults(query);
}, 300);

input.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});`} />
    </section>
  );
}

function SectionThrottle({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Throttle</h1>
      <p>Limit function execution to once per interval.</p>
      <h2>throttle</h2>
      <div className="fn-sig">throttle&lt;T extends (...args: any[]) =&gt; void&gt;(fn: T, limit: number): T</div>
      <CodeBlock lang="typescript" code={`import { throttle } from 'webdev-power-kit';
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', handleScroll);`} />
    </section>
  );
}

function SectionChangelog({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Changelog</h1>
      <h2>v2.2.0</h2>
      <ul>
        <li>Major frontend redesign with MagicUI-inspired components</li>
        <li>New scalable component architecture</li>
        <li>Hero section with meteor animation and rotating words</li>
        <li>API showcase with marquee scroll</li>
      </ul>
      <h2>v2.1.5</h2>
      <ul>
        <li>Added TypeScript generic support for storage functions</li>
        <li>Improved error messages for unsupported APIs</li>
      </ul>
      <h2>v2.1.0</h2>
      <ul>
        <li>Added <code className="inline-code">preventClose</code> module</li>
        <li>Added <code className="inline-code">idleTimer</code> module</li>
        <li>Performance improvements</li>
      </ul>
    </section>
  );
}

function SectionContributing({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  return (
    <section id={id}>
      <h1>Contributing</h1>
      <p>We welcome contributions! Here&apos;s how to get started:</p>
      <h2>Development Setup</h2>
      <CodeBlock lang="bash" code={`git clone https://github.com/dev-aditya-lab/webdev-power-kit.git
cd webdev-power-kit
npm install
npm run build`} />
      <h2>Adding a New Module</h2>
      <ol style={{ paddingLeft: "1.5rem", color: "var(--text-2)", lineHeight: "2" }}>
        <li>Create your module in <code className="inline-code">src/browser/</code> or the appropriate folder</li>
        <li>Export it from <code className="inline-code">src/index.ts</code></li>
        <li>Add documentation in the frontend</li>
        <li>Submit a PR</li>
      </ol>
      <Callout type="tip" title="Code style">
        We use TypeScript strict mode. All functions must have JSDoc comments and explicit return types.
      </Callout>
    </section>
  );
}

function SectionFAQ({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;
  const faqs = [
    { q: "Does this work with SSR / Next.js?", a: "Yes, but browser APIs only run client-side. Use 'use client' directive or useEffect to avoid SSR errors." },
    { q: "Is this tree-shakeable?", a: "Yes! Each function is a pure named export. Bundlers like Vite and Webpack 5 will eliminate unused code." },
    { q: "Why not use existing libraries?", a: "Most browser API wrappers are either too large, opinionated, or not TypeScript-first. This kit is minimal, typed, and zero-dep." },
    { q: "Does it work in Node.js?", a: "No — this is a browser-only package. Node.js lacks the Web APIs it relies on." },
  ];
  return (
    <section id={id}>
      <h1>FAQ</h1>
      {faqs.map((faq) => (
        <div key={faq.q} style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginTop: "1.5rem" }}>{faq.q}</h2>
          <p>{faq.a}</p>
        </div>
      ))}
    </section>
  );
}
