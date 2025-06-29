
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

