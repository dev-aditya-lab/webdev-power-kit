
## 🌐 CDN Usage (Vanilla HTML + JS)

You can use it directly in your browser using **Skypack CDN** or **jsDelivr**.

> ✅ Works in `type="module"` script
> ⚠️ Works only on `https` or `localhost` due to browser API restrictions.

### ✅ Example using **[jsDelivr](https://cdn.jsdelivr.net/npm/webdev-power-kit/+esm)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>WebDev Power Kit - CDN Example</title>
</head>
<body>
  <button id="copyBtn">Copy to Clipboard</button>

  <script type="module">
    import { copyToClipboard } from 'https://cdn.jsdelivr.net/npm/webdev-power-kit/+esm';

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

- **[jsDelivr](https://cdn.jsdelivr.net/npm/webdev-power-kit/+esm)**
```url
https://cdn.jsdelivr.net/npm/webdev-power-kit/+esm
```

- **[UNPKG](https://unpkg.com/webdev-power-kit/+esm)**
```url
https://unpkg.com/webdev-power-kit/+esm
```

- **[Skypack](https://cdn.skypack.dev/webdev-power-kit)**
```url
https://cdn.skypack.dev/webdev-power-kit
```

---
