# Webdev Power Kit 🚀

[![NPM Version](https://img.shields.io/npm/v/webdev-power-kit?color=blue&label=npm%20version)](https://www.npmjs.com/package/webdev-power-kit)
[![Downloads](https://img.shields.io/npm/dt/webdev-power-kit?color=green&label=downloads)](https://www.npmjs.com/package/webdev-power-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-read-0984e3?logo=hashnode)](https://webdev-power-kit.hashnode.space/docs/introduction)
[![Made by Aditya](https://img.shields.io/badge/made%20by-Aditya%20Kumar%20Gupta-blueviolet)](https://github.com/dev-aditya-lab)


A modular toolkit that brings powerful browser APIs to your fingertips. With a simple import, you can access clipboard, notifications, battery status, geolocation, network info, dark mode, vibration, and more—no boilerplate, no fuss.

---

## 🔍 Short Description

Write clean, future-ready web apps with ease using modern browser features in just one line of code:

```js
import { copyToClipboard, sendNotification, isOnline } from 'webdev-power-kit';
````


## 📌 Introduction

Webdev Power Kit is a TypeScript-powered library built for web developers who want to leverage browser features without spending time on repetitive setup. Whether you’re building projects, teaching, or just experimenting, this toolkit offers:

* 🧱 Simple, modular functions
* 💻 Full TypeScript support
* ⚛️ Framework-agnostic usage
* 🌍 Real-world features: dark mode toggle, idle timer, network detection, tab visibility, and more

---

## 📦 Installation

### Via NPM/Yarn:

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

---

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

---

## 📚 Documentation

Explore detailed guides, feature docs, and examples in the docs section:

👉 [Full documentation](https://webdev-power-kit.hashnode.space/docs/introduction)

---

## ✅ Features

| Browser Feature   | Functionality                      |
| ----------------- | ---------------------------------- |
| 🔋 Battery        | Check level & charging status      |
| 📋 Clipboard      | Copy & read text                   |
| 🌙 Dark Mode      | Detect, toggle, listen to changes  |
| ⏳ Idle Timer      | Detect user inactivity             |
| 🌐 Network        | Track online/offline status        |
| 📢 Notifications  | Show native browser notifications  |
| 🛑 Prevent Close  | Warn before leaving the page       |
| 🕶 Tab Visibility | Detect switching or hiding the tab |
| 📳 Vibration      | Control device vibration           |
| 📍 Geolocation    | Use GPS to get user’s location     |
| 📐 Screen Info    | Get viewport & screen dimensions   |

More features coming soon!

---

## 🧩 How It Works

* Built in **TypeScript** for clean code and types
* Modular structure—import only what you need
* Plain functions using native browser APIs
* Graceful error and support handling
* No dependencies—install size is minimal

---

## 📝 FAQ

* **Does it work with frameworks?**
  Yes, fully compatible with React, Vue, Svelte, or Vanilla JS.

* **Need HTTPS or special setup?**
  Some features (clipboard, geolocation) require secure context. Testing with `file://` won’t work—use Live Server or serve locally.

* **What browsers are supported?**
  Modern desktop and mobile browsers are fully supported. Specific browser notes are included in each feature doc.

---

## 🛠 Contributing

Add features, file issues, or fix bugs—open a PR!
Project is MIT licensed and open for community involvement.

---

## ⚡ License

Distributed under the **MIT License**.
See `LICENSE` for details.

---

## 🔗 Stay Connected

* 📘 GitHub: [dev-aditya-lab/webdev-power-kit](https://github.com/dev-aditya-lab/webdev-power-kit)
* 🧑‍💻 Author: Aditya Kumar Gupta
* 💬 Issues & feedback: via GitHub issues or pull requests

