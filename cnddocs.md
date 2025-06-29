

## 🌐 CDN Usage (Vanilla HTML + JS)

You can use it directly in your browser using **Skypack CDN** or **jsDelivr**.

> ✅ Works in `type="module"` script
> ⚠️ Works only on `https` or `localhost` due to browser API restrictions.

### ✅ Example using [Skypack CDN](https://cdn.skypack.dev)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>WebDev Power Kit - CDN Example</title>
</head>
<body>
  <button id="copyBtn">Copy to Clipboard</button>

  <script type="module">
    import { copyToClipboard } from 'https://cdn.skypack.dev/webdev-power-kit';

    document.getElementById("copyBtn").addEventListener("click", () => {
      copyToClipboard("Text from WebDev Power Kit!");
      alert("Text copied ✅");
    });
  </script>
</body>
</html>
```

---

### 🔁 CDN Mirror Options

| CDN Provider | Script URL                                           |
| ------------ | ---------------------------------------------------- |
| Skypack      | `https://cdn.skypack.dev/webdev-power-kit`           |
| jsDelivr     | `https://cdn.jsdelivr.net/npm/webdev-power-kit/+esm` |
| UNPKG        | `https://unpkg.com/webdev-power-kit/+esm`            |

> Use whichever CDN loads fastest for your audience.

---

## 🧪 API Reference

### 📋 `copyToClipboard(text: string): Promise<void>`

Copies given text to the clipboard.

```js
await copyToClipboard("Hello world!");
```

---

### 📋 `readClipboard(): Promise<string>`

Reads text from clipboard.

```js
const data = await readClipboard();
```

---

### 🔔 `showNotification(title: string, options?: NotificationOptions): void`

Shows a browser notification.

```js
showNotification("Hey!", { body: "This is from WebDev Power Kit" });
```

> ⚠️ Requires Notification permission.

---

### 🔋 `getBatteryLevel(): Promise<number>`

Returns battery percentage (0 to 100).

```js
const battery = await getBatteryLevel();
console.log("Battery:", battery + "%");
```

---

## ⚠️ Browser API Requirements

* Clipboard & Notifications need **secure context** (`https` or `localhost`)
* Notifications need permission from user
* Battery API not supported on all devices

---

## 💬 Support

* GitHub: [dev-aditya-lab/webdev-power-kit](https://github.com/dev-aditya-lab/webdev-power-kit)
* Raise issues or feature requests [here](https://github.com/dev-aditya-lab/webdev-power-kit/issues)

---

## 📄 License

MIT © [Aditya Kumar Gupta](https://github.com/dev-aditya-lab)

---

### ✅ Done Bhai!

Tu isko `README.md` me daal de ya docs page bana le.
Agar chaahe toh isko separate `docs.md` ya GitHub Pages pe host bhi kar sakte ho. Let me know if you want help in that too 💛
