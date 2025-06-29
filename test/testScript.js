    import { copyToClipboard, readClipboard } from '../src/index.js';
    import { sendNotification } from '../src/index.js';

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