![npm](https://img.shields.io/npm/v/webdev-power-kit)
![license](https://img.shields.io/npm/l/webdev-power-kit)
![issues](https://img.shields.io/github/issues/dev-aditya-lab/webdev-power-kit)


# Webdev Power Kit ⚡

A modern JavaScript toolkit that makes using powerful browser features super easy.  
Copy to clipboard, send notifications, check battery level, vibrate device, and more — all in just one line.

---

## 🚀 Installation

```bash
npm install webdev-power-kit
```
---
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


# 📳 Vibration API – webdev-power-kit

This module lets you trigger device vibration using the native Vibration API — great for haptic feedback in mobile web apps.

#### 👉 Use a real Android/iPhone browser to test (won't work on most laptops/desktops).

---

## ✨ Features

* Vibrate device on click, error, success, etc.
* Supports single duration or pattern
* Uses built-in `navigator.vibrate()` method
* Works best on **mobile browsers**

---

## ✅ Functions

### 1. `vibrate(pattern)`

📌 Vibrates the user’s device using a simple number or a pattern array.

```js
import { vibrate } from "webdev-power-kit";

// Vibrate for 200ms
vibrate(200);

// Vibrate for 300ms, pause 100ms, vibrate 300ms again
vibrate([300, 100, 300]);
```

#### 📥 Parameters:

| Param   | Type                   | Description                                               |
| ------- | ---------------------- | --------------------------------------------------------- |
| pattern | `number` or `number[]` | Single duration or array of vibration & pause times in ms |

#### 🔁 Returns:

* `true` → if vibration triggered
* `false` → if not supported by browser/device


---

## 🔐 Browser Support

| Browser | Supported? | Notes                         |
| ------- | ---------- | ----------------------------- |
| Chrome  | ✅          | Fully supported (mobile only) |
| Edge    | ✅          | Same as Chrome                |
| Firefox | ✅          | Mobile version supported      |
| Safari  | ⚠️         | Limited / No support          |
| Desktop | ❌          | Mostly not supported          |

---




# 🌐 Network API – webdev-power-kit

This module allows you to detect the internet connection status of the browser and listen for changes in real-time.

---

## ✨ Features

* Check if user is currently online or offline
* Listen for real-time status changes
* Helpful for offline alerts, syncing, and caching
* Uses built-in `navigator.onLine` and browser events

---

## ✅ Functions

### 1. `isOnline()`

📌 Returns the current network status (online or offline).

```js
import { isOnline } from "webdev-power-kit";

if (isOnline()) {
  console.log("You are online!");
} else {
  console.log("You are offline!");
}
```

#### 🔁 Returns:

* `true` → if user is online
* `false` → if user is offline

---

### 2. `listenNetworkStatus(callback)`

📌 Listens for online/offline status changes and runs a callback with the updated status.

```js
import { listenNetworkStatus } from "webdev-power-kit";

listenNetworkStatus((status) => {
  console.log("Network status:", status ? "Online ✅" : "Offline ❌");
});
```

#### 📥 Parameters:

| Param      | Type                        | Description                                           |
| ---------- | --------------------------- | ----------------------------------------------------- |
| `callback` | `(status: boolean) => void` | Function called with true (online) or false (offline) |

#### 🔁 Returns:

* A function to unsubscribe and stop listening

---

## 🔐 Browser Support

| Browser | Supported? | Notes                      |
| ------- | ---------- | -------------------------- |
| Chrome  | ✅          | Fully supported            |
| Firefox | ✅          | Fully supported            |
| Edge    | ✅          | Fully supported            |
| Safari  | ✅          | Fully supported            |
| Mobile  | ✅          | Works well on most devices |

---



# 👁 Tab Visibility API – webdev-power-kit

This module lets you detect when a browser tab becomes visible or hidden — great for optimizing UI behavior, saving resources, or tracking user focus.

---

## ✨ Features

* Detect if the tab is active or hidden
* Listen for real-time tab visibility changes
* Use to pause/resume media, animations, or timers
* Uses native `document.visibilityState`

---

## ✅ Functions

### 1. `isTabVisible()`

📌 Check whether the current browser tab is visible to the user.

```js
import { isTabVisible } from "webdev-power-kit";

if (isTabVisible()) {
  console.log("User is looking at this tab");
} else {
  console.log("Tab is in background");
}
```

#### 🔁 Returns:

* `true` → if tab is visible
* `false` → if tab is hidden or inactive

---

### 2. `listenTabVisibility(callback)`

📌 Listen for changes in tab visibility and execute callback accordingly.

```js
import { listenTabVisibility } from "webdev-power-kit";

listenTabVisibility((visible) => {
  console.log(visible ? "👀 Visible" : "🙈 Hidden");
});
```

#### 📥 Parameters:

| Param      | Type                         | Description                                      |
| ---------- | ---------------------------- | ------------------------------------------------ |
| `callback` | `(visible: boolean) => void` | Called with `true` (visible) or `false` (hidden) |

#### 🔁 Returns:

* A function to unsubscribe and stop listening

---

## 🔐 Browser Support

| Browser | Supported? | Notes           |
| ------- | ---------- | --------------- |
| Chrome  | ✅          | Fully supported |
| Firefox | ✅          | Fully supported |
| Edge    | ✅          | Fully supported |
| Safari  | ✅          | Fully supported |
| Mobile  | ✅          | Fully supported |

---

## 💡 Use Cases

* Pause videos or animations when tab is hidden
* Stop background API calls while inactive
* Detect user engagement and tab switching
* Show “Welcome back” messages on return


---

# 🛑 Prevent Tab Close API – webdev-power-kit

This module allows you to warn users before they close or refresh the tab — perfect for preventing loss of unsaved data or accidental exits.

---

## ✨ Features

* Trigger a warning before tab is closed or reloaded
* Easy toggle with a single function call
* Uses native `beforeunload` event
* Useful for forms, editors, and critical workflows

---

## ✅ Functions

### 1. `preventTabClose(enable)`

📌 Enables or disables tab close protection.

```js
import { preventTabClose } from "webdev-power-kit";

// Enable protection
preventTabClose(true);

// Disable protection
preventTabClose(false);
```

#### 📥 Parameters:

| Param  | Type    | Description                                 |
| ------ | ------- | ------------------------------------------- |
| enable | boolean | Set to `true` to enable, `false` to disable |

#### 🔁 Returns:

* `void`

---

## 🔐 Browser Support

| Browser | Supported? | Notes                               |
| ------- | ---------- | ----------------------------------- |
| Chrome  | ✅          | Shows a confirmation dialog         |
| Firefox | ✅          | Shows built-in warning message      |
| Edge    | ✅          | Supported                           |
| Safari  | ✅          | Limited message customization       |
| Mobile  | ⚠️         | May not work on all mobile browsers |

---

## 💡 Use Cases

* Prevent form data loss
* Alert user during critical flows (payment, editing)
* Confirm before logging out or exiting dashboard
* Protect unsaved changes in web editors

---

# ⏱️ Idle Timer API – webdev-power-kit

This module helps you detect when a user becomes inactive (idle) for a certain amount of time — perfect for auto-logout, showing alerts, or stopping background activity.

---

## ✨ Features

* Track if user is inactive for X seconds
* Automatically resets on any activity (scroll, key, mouse, touch)
* Lightweight and easy to use
* Uses native browser events

---

## ✅ Functions

### 1. `startIdleTimer(seconds, onIdle)`

📌 Starts tracking user activity and runs your callback when idle.

```js
import { startIdleTimer } from "webdev-power-kit";

// Run after 10 seconds of inactivity
startIdleTimer(10, () => {
  console.log("💤 User is idle!");
});
```

#### 📥 Parameters:

| Param     | Type       | Description                                     |
| --------- | ---------- | ----------------------------------------------- |
| `seconds` | `number`   | Time in seconds to wait before calling `onIdle` |
| `onIdle`  | `function` | Callback function to run when user becomes idle |

#### 🔁 Returns:

* `() => void` — A function to stop and clean up the idle timer

---

## 🔐 Browser Support

| Browser | Supported? | Notes           |
| ------- | ---------- | --------------- |
| Chrome  | ✅          | Fully supported |
| Firefox | ✅          | Fully supported |
| Edge    | ✅          | Fully supported |
| Safari  | ✅          | Fully supported |
| Mobile  | ✅          | Fully supported |

---

## 💡 Use Cases

* Auto-logout after inactivity
* Show “You’re idle” banner
* Pause API polling when user is inactive
* Lock app after idle timeout in sensitive dashboards
---

# 🌙 Dark Mode API – webdev-power-kit

This module detects whether the user prefers dark or light mode, and lets you listen to theme changes in real-time using the system’s color scheme preference.

---

## ✨ Features

* Detect if dark mode is enabled by system/browser
* Listen for real-time theme changes
* Useful for automatic theming or toggles
* Uses native `window.matchMedia`

---

## ✅ Functions

### 1. `isDarkMode()`

📌 Returns whether the user’s system prefers dark mode.

```js
import { isDarkMode } from "webdev-power-kit";

if (isDarkMode()) {
  console.log("🌙 Dark mode is enabled");
} else {
  console.log("☀️ Light mode is enabled");
}
```

#### 🔁 Returns:

* `true` → if user prefers dark mode
* `false` → if light mode is preferred

---

### 2. `listenDarkMode(callback)`

📌 Listen to changes in the system theme (dark ↔️ light) in real-time.

```js
import { listenDarkMode } from "webdev-power-kit";

listenDarkMode((isDark) => {
  console.log("Theme changed:", isDark ? "Dark" : "Light");
});
```

#### 📥 Parameters:

| Param      | Type                        | Description                                              |
| ---------- | --------------------------- | -------------------------------------------------------- |
| `callback` | `(isDark: boolean) => void` | Called with `true` for dark mode, `false` for light mode |

#### 🔁 Returns:

* A function to unsubscribe and stop listening

---

## 🔐 Browser Support

| Browser | Supported? | Notes                            |
| ------- | ---------- | -------------------------------- |
| Chrome  | ✅          | Fully supported                  |
| Firefox | ✅          | Fully supported                  |
| Edge    | ✅          | Fully supported                  |
| Safari  | ✅          | Fully supported (macOS/iOS only) |
| Mobile  | ✅          | Most modern devices supported    |

---

## 💡 Use Cases

* Auto-switch theme on page load
* Show theme toggle suggestion
* Sync app theme with OS settings
* Apply different CSS styles dynamically

---




## 📄 License

MIT © [Aditya Kumar Gupta](https://github.com/dev-aditya-lab)
