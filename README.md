# WebDev Power Kit

A modular, TypeScript-powered utility library designed to simplify browser API interactions, performance optimization, and common utility tasks.

[Website and Documentation](https://webdev-power-kit.hashnode.space/docs/introduction) | [GitHub Repository](https://github.com/dev-aditya-lab/webdev-power-kit) | [npm Package](https://www.npmjs.com/package/webdev-power-kit)

---

## Overview

WebDev Power Kit provides clean, type-safe wrappers for modern Web APIs and utilities. It abstracts browser inconsistencies, handles edge cases, and implements safe error recovery fallback mechanisms, allowing developers to implement features with single-line operations.

### Key Features

* **Modular Imports**: Import only the utilities required for your application to minimize bundle size.
* **Full TypeScript Integration**: 100% type definition coverage with JSDoc descriptions for enhanced IDE IntelliSense.
* **Framework Agnostic**: Integrates seamlessly with React, Vue, Svelte, Angular, Next.js, or vanilla JavaScript projects.
* **Safe Error Handling**: Prevents application crashes due to browser-specific unsupported APIs through graceful fallback behaviors.
* **Zero Dependencies**: Developed entirely with native browser features to ensure a minimal library footprint.

---

## Installation

Install the package via your preferred package manager:

```bash
npm install webdev-power-kit
```

Or via yarn:

```bash
yarn add webdev-power-kit
```

### CDN Usage (ES Modules)

You can import specific modules directly into standard HTML documents using CDN services like jsDelivr:

```html
<script type="module">
  import { copyToClipboard } from 'https://cdn.jsdelivr.net/npm/webdev-power-kit/+esm';
  
  copyToClipboard('Hello from the CDN!');
</script>
```

---

## Usage Examples

### Clipboard API (TypeScript / JavaScript)

```typescript
import { copyToClipboard } from "webdev-power-kit/browser/clipboard";

copyToClipboard("Text to copy")
  .then(() => {
    console.log("Text successfully copied to clipboard.");
  })
  .catch((error) => {
    console.error("Clipboard write operation failed:", error);
  });
```

### Network Status (React Integration)

```tsx
"use client";

import React, { useEffect, useState } from "react";
import { isOnline, onNetworkChange } from "webdev-power-kit/browser/network/is-online";

export default function NetworkStatusIndicator() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(isOnline());
    
    const unsubscribe = onNetworkChange((status) => {
      setOnline(status);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <p>Current Status: {online ? "Online" : "Offline"}</p>
    </div>
  );
}
```

### Device Vibration

```typescript
import { vibrate } from "webdev-power-kit/browser/vibrate";

// Triggers a vibration-pause-vibration haptic feedback pattern
vibrate([200, 100, 200]);
```

---

## Project Structure

WebDev Power Kit is organized into clean, specific functional categories:

* **Browser APIs**: Safe wrappers for native capabilities such as Battery, Clipboard, Geolocation, Notifications, Storage, and Visibility.
* **Performance Utilities**: Core performance helpers such as debounce and throttle.
* **General Utilities**: Encryption helpers, OTP generation, and formatting tools.

---

## Contributing

Contributions to the project are welcome. Please refer to the [Contributing Guide](CONTRIBUTING.md) for detailed workflows and formatting guidelines.

---

## Author

**Aditya Kumar Gupta**
* Portfolio: [devaditya.dev](https://devaditya.dev)
* GitHub: [@dev-aditya-lab](https://github.com/dev-aditya-lab)
* Documentation Hub: [Hashnode Docs](https://webdev-power-kit.hashnode.space/docs/introduction)

---

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](LICENSE) file for the complete license text.