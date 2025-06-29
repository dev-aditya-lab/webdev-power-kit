import { copyToClipboard, readClipboard } from '../src/index.js';
import { sendNotification } from '../src/index.js';
import { getBatteryStatus } from '../src/index.js';

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