import { copyToClipboard, readClipboard } from '../src/index.js';
import { sendNotification } from '../src/index.js';
import { getBatteryStatus } from '../src/index.js';
import { isOnline, listenNetworkStatus } from "../src/index.js";
import { listenTabVisibility } from "../src/index.js";
import { preventTabClose } from "../src/index.js";
import { startIdleTimer } from "../src/index.js";

startIdleTimer(5, () => {
  document.getElementById("idle").textContent = "💤 You are idle!";
});

document.getElementById("enable").onclick = () => {
  preventTabClose(true);
  alert("Tab close protection enabled.");
};

document.getElementById("disable").onclick = () => {
  preventTabClose(false);
  alert("Tab close protection disabled.");
};

listenTabVisibility((visible) => {
  document.getElementById("tab-status").textContent =
    visible ? "👀 Tab is visible" : "🙈 Tab is hidden";
});

const statusText = document.getElementById("status");

listenNetworkStatus((isOnline) => {
  statusText.textContent = isOnline
    ? "✅ You are online"
    : "❌ You are offline";
  statusText.style.color = isOnline ? "green" : "red";
});


document.getElementById("battery").onclick = async () => {
  try {
    const { level, charging } = await getBatteryStatus();
    document.getElementById("battery-output").textContent =
      `Battery: ${level}% | Charging: ${charging ? "Yes" : "No"}`;
  } catch (e) {
    alert("Battery API not supported in this browser.");
  }
};

document.getElementById("copy").onclick = () => {
  copyToClipboard("Bhai OP hai!")
    .then(() => alert("Text Copied!"));
};

document.getElementById("read").onclick = async () => {
  const text = await readClipboard();
  document.getElementById("result").textContent = `Clipboard: ${text}`;
};

document.getElementById("notify").onclick = () => {
  sendNotification("Hey Dev!", {
    body: "This is your browser talking 😄"
  });
};