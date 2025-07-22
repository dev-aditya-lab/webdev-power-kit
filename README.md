<p align="center">
  <img src="https://raw.githubusercontent.com/dev-aditya-lab/webdev-power-kit/refs/heads/main/webdev%20logo%20long.png" width="500" alt="WebDev Power Kit Logo" />
  
</p>

<!-- <h1 align="center">🚀 WebDev Power Kit</h1> -->

<p align="center">
  A powerful, modular toolkit that simplifies working with browser APIs, utility tools, and system-level features — built for modern web developers. ⚡
</p>


[![NPM Version](https://img.shields.io/npm/v/webdev-power-kit?color=blue&label=npm%20version)](https://www.npmjs.com/package/webdev-power-kit)
[![Downloads](https://img.shields.io/npm/dt/webdev-power-kit?color=green&label=downloads)](https://www.npmjs.com/package/webdev-power-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-read-0984e3?logo=hashnode)](https://webdev-power-kit.hashnode.space/docs/introduction)
[![Made by Aditya](https://img.shields.io/badge/made%20by-Aditya%20Kumar%20Gupta-blueviolet)](https://github.com/dev-aditya-lab)


---

## 📦 About the Project

**WebDev Power Kit** is a TypeScript-powered, modular toolkit designed to make common browser tasks and utility features incredibly simple and developer-friendly.

Whether you're building SPAs, dashboards, dev tools, or internal tools — this package saves you from writing repetitive, error-prone code.

Write clean, future-ready web apps with ease using modern browser features in just one line of code:

### ✨ Highlights

* ✅ **Modular Structure** — only import what you need
* 🧠 **TypeScript Support** — 100% typed with full JSDoc comments
* ⚛️ **React-friendly** — examples included for React developers
* 🌐 **Browser API Wrappers** — safe, clean functions for real-world apps
* 🔌 **System Utilities** — OTPs, UUIDs, performance, and more
* 🧪 **Well-tested** — secure, production-ready utilities

---


## 📖 Documentation


Explore detailed guides, feature docs, and examples in the docs section:

👉 [View Full Documentation](https://webdev-power-kit.hashnode.space/docs/introduction)

**Structure Includes:**

* ✨ Features
* 📥 Parameters
* 🔁 Return values
* ⚛️ React usage examples
* 🚨 Error handling tips
* 📦 Real world use cases
* 🔐 Browser support tables

Each page is written for **developers**, not bots. With TypeScript context and practical examples that work in real apps.

---

## 📦 Installation

```bash
npm install webdev-power-kit
# or
yarn add webdev-power-kit
```
### Via CDN (ES Module):

```html
<script type="module">
  import { copyToClipboard } from 'https://cdn.jsdelivr.net/npm/webdev-power-kit/+esm';
  copyToClipboard('Hello via CDN!');
</script>
```
## ⚡ Quickstart

### HTML (CDN ESM):

```html
<script type="module">
  import { copyToClipboard } from 'https://cdn.jsdelivr.net/npm/webdev-power-kit/+esm';
  copyToClipboard('Hello world from clipboard!');
</script>
```

### React Example:

```tsx
import { vibrate } from 'webdev-power-kit';
export default function App() {
  return <button onClick={() => vibrate([200,100,200])}>Vibrate</button>;
}
```

## 🚀 Usage Example

```ts
import { copyToClipboard } from "webdev-power-kit/browser/clipboard";

copyToClipboard("Hello from clipboard!")
  .then(() => console.log("Copied!"))
  .catch(err => console.error("Error copying:", err));
```



```tsx
"use client";

import React from "react";
import { useEffect } from "react";
import { isOnline } from "webdev-power-kit/browser/network/is-online";

export default function NetworkStatus() {
  useEffect(() => {
    console.log("User is online:", isOnline());
  }, []);
  return <p>Check console for online status ✅</p>;
}
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

We follow a clean modular structure — every feature must:

* Be placed in its own folder (Meaningful name)
* Include `index.ts` with typed exports
* Handle errors gracefully
* Include comments and JSDoc
* Follow `files` whitelist in `package.json`

---
## 📝 FAQ

* **Does it work with frameworks?**
  >. Yes, fully compatible with React, Vue, Svelte, or Vanilla JS.

* **Need HTTPS or special setup?**
  > Some features (clipboard, geolocation) require secure context. Testing with `file://` won’t work—use Live Server or serve locally.

* **What browsers are supported?**
  > Modern desktop and mobile browsers are fully supported. Specific browser notes are included in each feature doc.
---

## 👨‍💻 Author

**Aditya Kumar Gupta**
Computer Science Engineer • Web Developer 

<!-- * 🔗 [Portfolio](https://your-portfolio-link) -->
* 🐙 [GitHub](https://github.com/dev-aditya-lab)
* 📝 [Hashnode Docs](https://webdev-power-kit.hashnode.space/docs/introduction)

---

## 📄 License
Distributed under the **MIT License**.
See `LICENSE` for details.


---

> 🚀 `webdev-power-kit` makes building professional browser-based apps faster, safer, and fun again.
> Import only what you need — clean, typed, and production-ready.



----
React Native feature coming soon 🥳