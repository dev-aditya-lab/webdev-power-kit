
let unloadHandler = null;

/**
 * Enable or disable browser's tab close protection.
 * @param {boolean} enable - true to enable, false to disable
 */
export function preventTabClose(enable = true) {
  if (enable) {
    if (!unloadHandler) {
      unloadHandler = (e) => {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      };
      window.addEventListener("beforeunload", unloadHandler);
    }
  } else {
    if (unloadHandler) {
      window.removeEventListener("beforeunload", unloadHandler);
      unloadHandler = null;
    }
  }
}
