# Webdev Power Kit ⚡

A modern JavaScript toolkit that makes using powerful browser features super easy.  
Copy to clipboard, send notifications, check battery level, vibrate device, and more — all in just one line.

---

## 🚀 Installation

```bash
npm install webdev-power-kit
```

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
```
### 2. `readClipboard()`

📌 To read the copyed text from clipboard.

```js
import { readClipboard } from "webdev-power-kit";

const text = await readClipboard();
```

---

# 📢 Notification API – webdev-power-kit

This module lets you easily show native browser notifications with full control over title, body, icon, etc.

---

## ✨ Features

* Request user permission automatically
* Show native browser notifications
* Customize: title, body, icon, vibration, sound, etc.
* Uses built-in `Notification` API

---

## ✅ Functions

### 1. `requestNotificationPermission()`

📌 Request permission from the user to show notifications.

```js
import { requestNotificationPermission } from "webdev-power-kit";

await requestNotificationPermission();
```

#### 🔁 Returns:

* `Promise<'granted' | 'denied' | 'default'>`

---

### 2. `sendNotification(title, options)`

📌 Shows a native notification to the user.

```js
import { sendNotification } from "webdev-power-kit";

sendNotification("Hello Dev!", {
  body: "Welcome to Webdev Power Kit 🚀",
  icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
  vibrate: [200, 100, 200]
});
```

#### 📥 Parameters:

* `@param {string} title`
  **Title** of the notification (bold headline text)

* `@param {Object} [options]`
  Optional object to customize notification:

| Option               | Type      | Description                                   |
| -------------------- | --------- | --------------------------------------------- |
| `body`               | string    | Message content                               |
| `icon`               | string    | URL to icon image                             |
| `vibrate`            | number\[] | Vibration pattern (mobile supported)          |
| `tag`                | string    | ID to replace duplicate notifications         |
| `requireInteraction` | boolean   | If true, notification stays until user closes |

#### 🔁 Returns:

* `Promise<void>`

---

## 🔐 Browser Support

| Browser | Supported? | Notes                      |
| ------- | ---------- | -------------------------- |
| Chrome  | ✅          | Needs permission           |
| Firefox | ✅          | Needs permission           |
| Safari  | ⚠️         | Limited support on desktop |
| Mobile  | ✅          | Vibration supported        |

---


# 🔋 Battery API – webdev-power-kit

This module helps you get real-time info about your device’s battery level and charging status using the built-in Battery Status API.

---

## ✨ Features

* Get current battery level (0–100%)
* Check whether device is charging or not
* Easy one-liner function
* Uses native `navigator.getBattery()` API

---

## ✅ Functions

### 1. `getBatteryStatus()`

📌 Get battery percentage and charging state.

```js
import { getBatteryStatus } from "webdev-power-kit";

const battery = await getBatteryStatus();
console.log(`Battery: ${battery.level}%`);
console.log(`Charging: ${battery.charging ? "Yes" : "No"}`);
```

#### 🔁 Returns:

```js
{
  level: 87,          // Battery percentage (0–100)
  charging: true      // true if plugged in, false if not
}
```

#### 📥 Output Example:

```
Battery: 62%
Charging: No
```

---


## 🔐 Browser Support

| Browser | Supported? | Notes                              |
| ------- | ---------- | ---------------------------------- |
| Chrome  | ✅          | Fully supported                    |
| Edge    | ✅          | Fully supported                    |
| Firefox | ❌          | Removed support in recent versions |
| Safari  | ❌          | Not supported                      |
| Android | ✅          | Mostly supported                   |

---
