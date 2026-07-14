# Security Policy

We are committed to maintaining the security and integrity of WebDev Power Kit. We take all reports of potential vulnerabilities seriously and work to resolve them as quickly as possible.

---

## Reporting a Vulnerability

If you identify a security vulnerability in this project, please report it privately to the maintainers to protect downstream users. Do not disclose vulnerabilities in public GitHub issues.

To report an issue:
* Contact the maintainer directly via email: **[contact maintainer](mailto:ad1123itya@gmail.com)**
* Provide a detailed summary of the vulnerability, including step-by-step instructions to reproduce the issue.
* Describe any potential impact or exploit scenarios.

We will acknowledge receipt of your report within two business days and provide updates as the issue is investigated and patched.

---

## Vulnerability Scope

Since this library acts as a wrapper for standard browser capabilities, areas of security review include:
* Potential cross-site scripting (XSS) risks inside text clipboard wrappers.
* Storage API overrides or leaks of local storage variables.
* Incorrect permission handling inside APIs like Geolocation or Notifications.
* Unexpected denial-of-service behaviors due to memory leaks in listeners.

---

## Safe-by-Design Principles

WebDev Power Kit is built to be secure by default:
* **No Telemetry**: No third-party tracking, analytics, or external script inclusions.
* **Principle of Least Privilege**: Utilities only access browser capabilities when explicitly invoked by the developer.
* **Input Validation**: Critical parameters undergo validation before execution.

---

## general feedback

For non-security bugs or standard inquiries, please submit a standard GitHub Issue:
* [GitHub Issues Hub](https://github.com/dev-aditya-lab/webdev-power-kit/issues)

Thank you for helping keep WebDev Power Kit secure.
