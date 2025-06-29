# Webdev Power Kit ⚡

A modern JavaScript toolkit that makes using powerful browser features super easy.  
Copy to clipboard, send notifications, check battery level, vibrate device, and more — all in just one line.

---

## 🚀 Installation

```bash
npm install webdev-power-kit

# 📋 Clipboard API – webdev-power-kit

This module gives you two super easy functions to interact with the browser clipboard using modern APIs.

---

# ✨ Features

- Copy any string to clipboard
- Read the current text from clipboard
- Based on `navigator.clipboard` API

---

## ✅ Functions

### 1. `copyToClipboard(text)`

📌 Copies a given string to the user's clipboard.

```js
import { copyToClipboard } from "webdev-power-kit";

await copyToClipboard("Hello from clipboard!");
