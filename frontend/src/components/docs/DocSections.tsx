"use client";

import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/DocComponents";
import { ApiTable, BrowserSupport } from "@/components/docs/DocAdapters";

// ─────────────────────────────────────────────────────────────────
// Section dispatcher — called by /docs/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────
export function renderSection(slug: string): React.ReactNode {
  switch (slug) {
    case "introduction":   return <SectionIntroduction />;
    case "installation":   return <SectionInstallation />;
    case "quick-start":    return <SectionQuickStart />;
    case "typescript":     return <SectionTypeScript />;
    case "clipboard":      return <SectionClipboard />;
    case "battery":        return <SectionBattery />;
    case "notifications":  return <SectionNotifications />;
    case "dark-mode":      return <SectionDarkMode />;
    case "geolocation":    return <SectionGeolocation />;
    case "network":        return <SectionNetwork />;
    case "screen-info":    return <SectionScreenInfo />;
    case "storage":        return <SectionStorage />;
    case "tab-visibility": return <SectionTabVisibility />;
    case "idle-timer":     return <SectionIdleTimer />;
    case "vibration":      return <SectionVibration />;
    case "prevent-close":  return <SectionPreventClose />;
    case "otp":            return <SectionOTP />;
    case "debounce":       return <SectionDebounce />;
    case "throttle":       return <SectionThrottle />;
    case "changelog":      return <SectionChangelog />;
    case "contributing":   return <SectionContributing />;
    case "faq":            return <SectionFAQ />;
    default: return (
      <section>
        <h1>Not Found</h1>
        <p>This documentation page does not exist.</p>
      </section>
    );
  }
}

// ─────────────────────────────────────────────────────────────────
// Getting Started
// ─────────────────────────────────────────────────────────────────

function SectionIntroduction() {
  return (
    <section id="introduction">
      <h1>Introduction</h1>
      <p className="page-lead">
        <strong>webdev-power-kit</strong> is a zero-dependency, fully-typed TypeScript library
        that wraps the most common browser APIs — Clipboard, Battery, Geolocation, Notifications,
        Network, Storage, and more — into clean, consistent, promise-based functions.
      </p>
      <h2>Why webdev-power-kit?</h2>
      <p>
        Browser APIs are powerful but inconsistent. Each one has a different pattern — some use
        callbacks, some use events, some require feature detection. This library normalises all of
        them into a single cohesive API surface.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>🚀 Zero dependencies — one install, no transitive baggage</li>
        <li>💯 Fully typed — complete TypeScript generics throughout</li>
        <li>🌲 Tree-shakeable — import only what you use</li>
        <li>🔒 Safe — graceful fallbacks for unsupported environments (SSR, Node.js)</li>
        <li>📦 Tiny — each function is a standalone export</li>
      </ul>
      <Callout type="info" title="Browser only">
        All functions that wrap native browser APIs are no-ops in Node.js / SSR. Use
        them inside <code>useEffect</code> or with the <code>&quot;use client&quot;</code> directive.
      </Callout>
    </section>
  );
}

function SectionInstallation() {
  return (
    <section id="installation">
      <h1>Installation</h1>
      <p>Install webdev-power-kit from npm:</p>
      <CodeBlock lang="bash" code={`npm install webdev-power-kit`} />
      <CodeBlock lang="bash" code={`yarn add webdev-power-kit`} />
      <CodeBlock lang="bash" code={`pnpm add webdev-power-kit`} />
      <h2>Requirements</h2>
      <ul>
        <li>Node.js ≥ 18 (for build tooling)</li>
        <li>TypeScript ≥ 5.0 (optional but recommended)</li>
        <li>Any modern bundler (Vite, Webpack 5, esbuild, Rollup)</li>
      </ul>
      <Callout type="tip" title="ES Module first">
        The package ships as ESM by default with a CommonJS fallback. Vite / Next.js work
        out of the box with no extra config.
      </Callout>
    </section>
  );
}

function SectionQuickStart() {
  return (
    <section id="quick-start">
      <h1>Quick Start</h1>
      <p>Import any function directly by name — no default export:</p>
      <CodeBlock
        lang="typescript"
        code={`import {
  copyToClipboard,
  getBatteryLevel,
  getLocation,
  isOnline,
} from 'webdev-power-kit';

// Copy text
await copyToClipboard('Hello World!');

// Battery
const level = await getBatteryLevel();
console.log(\`Battery: \${level}%\`);

// Geolocation
const { latitude, longitude } = await getLocation();

// Network
console.log(isOnline()); // true | false`}
      />
      <Callout type="tip" title="Tree-shaking">
        Because each function is a named export, bundlers automatically eliminate any
        code you don&apos;t import. Your bundle only grows by the functions you actually use.
      </Callout>
    </section>
  );
}

function SectionTypeScript() {
  return (
    <section id="typescript">
      <h1>TypeScript</h1>
      <p>
        webdev-power-kit is written in TypeScript and ships with full declaration files.
        No <code>@types/</code> package needed.
      </p>
      <h2>Generic Storage</h2>
      <CodeBlock
        lang="typescript"
        code={`import { setItem, getItem } from 'webdev-power-kit';

interface UserPrefs {
  theme: 'light' | 'dark';
  fontSize: number;
}

setItem<UserPrefs>('prefs', { theme: 'dark', fontSize: 16 });
const prefs = getItem<UserPrefs>('prefs'); // UserPrefs | null`}
      />
      <h2>OTP Options type</h2>
      <CodeBlock
        lang="typescript"
        code={`import type { OTPOptions } from 'webdev-power-kit';

const opts: OTPOptions = {
  digits: true,
  upperCase: true,
  lowerCase: false,
  symbols: false,
};`}
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Browser APIs
// ─────────────────────────────────────────────────────────────────

function SectionClipboard() {
  return (
    <section id="clipboard">
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

function SectionBattery() {
  return (
    <section id="battery">
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

function SectionNotifications() {
  return (
    <section id="notifications">
      <h1>Notifications</h1>
      <p>Send native browser notifications with a single function call.</p>
      <h2>sendNotification</h2>
      <div className="fn-sig">sendNotification(title: string, options?: NotificationOptions): Promise&lt;void&gt;</div>
      <CodeBlock lang="typescript" code={`import { sendNotification } from 'webdev-power-kit';
await sendNotification('Hello!', { body: 'Notification body', icon: '/icon.png' });`} />
    </section>
  );
}

function SectionDarkMode() {
  return (
    <section id="dark-mode">
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

function SectionGeolocation() {
  return (
    <section id="geolocation">
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

function SectionNetwork() {
  return (
    <section id="network">
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

function SectionScreenInfo() {
  return (
    <section id="screen-info">
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

function SectionStorage() {
  return (
    <section id="storage">
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

function SectionTabVisibility() {
  return (
    <section id="tab-visibility">
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

function SectionIdleTimer() {
  return (
    <section id="idle-timer">
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

function SectionVibration() {
  return (
    <section id="vibration">
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

function SectionPreventClose() {
  return (
    <section id="prevent-close">
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

// ─────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────

function SectionOTP() {
  return (
    <section id="otp">
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

// ─────────────────────────────────────────────────────────────────
// Performance
// ─────────────────────────────────────────────────────────────────

function SectionDebounce() {
  return (
    <section id="debounce">
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

function SectionThrottle() {
  return (
    <section id="throttle">
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

// ─────────────────────────────────────────────────────────────────
// Project
// ─────────────────────────────────────────────────────────────────

function SectionChangelog() {
  return (
    <section id="changelog">
      <h1>Changelog</h1>
      <h2>v2.2.0</h2>
      <ul>
        <li>Major frontend redesign — B&amp;W monochrome theme</li>
        <li>Dedicated routing: <code>/</code> landing + <code>/docs/[slug]</code></li>
        <li>Hero with GSAP bracket animation and live GitHub stats</li>
        <li>Lenis smooth scroll, GSAP horizontal scroll</li>
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

function SectionContributing() {
  return (
    <section id="contributing">
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

function SectionFAQ() {
  const faqs = [
    { q: "Does this work with SSR / Next.js?", a: "Yes, but browser APIs only run client-side. Use 'use client' directive or useEffect to avoid SSR errors." },
    { q: "Is this tree-shakeable?", a: "Yes! Each function is a pure named export. Bundlers like Vite and Webpack 5 will eliminate unused code." },
    { q: "Why not use existing libraries?", a: "Most browser API wrappers are either too large, opinionated, or not TypeScript-first. This kit is minimal, typed, and zero-dep." },
    { q: "Does it work in Node.js?", a: "No — this is a browser-only package. Node.js lacks the Web APIs it relies on." },
  ];
  return (
    <section id="faq">
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
