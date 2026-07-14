# Contributing to WebDev Power Kit

Thank you for choosing to contribute to WebDev Power Kit. This document outlines the guidelines and workflows for submitting bug reports, feature requests, and code contributions.

---

## Code of Conduct

By participating in this project, you agree to maintain a professional and respectful environment. Please treat all contributors and maintainers with courtesy and respect.

---

## How to Contribute

### 1. Reporting Bugs

If you encounter unexpected behavior or errors:
* Check the existing issues database to ensure the bug has not already been reported.
* Create a new issue describing the clear step-by-step instructions to reproduce the problem.
* Include details about the environment (e.g., browser name, browser version, and OS).

Use the official [Bug Report Template](https://github.com/dev-aditya-lab/webdev-power-kit/issues/new?template=bug_report.yml) to submit your report.

### 2. Requesting Features

To suggest new browser wrappers, performance optimizations, or general utility features:
* Provide a clear description of the proposed feature and why it would be beneficial to the developer community.
* Outline the expected API signature and input/output parameters.

Use the official [Feature Request Template](https://github.com/dev-aditya-lab/webdev-power-kit/issues/new?template=feature_request.yml) to submit your request.

### 3. General Inquiries or Support

If you have questions regarding setup, integration, or best practices, please use the [Q&A template](https://github.com/dev-aditya-lab/webdev-power-kit/issues/new?template=question.yml) to ask a question.

---

## Code Contribution Workflow

To propose code modifications or add new features, please follow this development workflow:

1. **Fork and Clone**: Fork the repository on GitHub and clone your fork locally.
2. **Branch**: Create a new topic branch from the main branch (e.g., `feature/clipboard-enhancements` or `bugfix/battery-listener`).
3. **Develop**: Implement your modifications. Ensure all code complies with the project's standards.
4. **Test**: Run verification steps locally to ensure no compilation or runtime errors are introduced.
5. **Pull Request**: Push your branch to your fork and submit a Pull Request (PR) to the main repository.

---

## Development Standards

To maintain consistency and code quality, all contributions must adhere to the following standards:

* **Modular Structure**: Each wrapper or utility must reside in its own subdirectory with an `index.ts` containing typed exports.
* **TypeScript Integrity**: Write fully typed code. Avoid the use of `any` types where possible, and provide complete JSDoc annotations for all public interfaces.
* **Robust Error Handling**: Handle API omissions gracefully. Implement fallbacks or throw meaningful, typed errors when browser capabilities are unsupported.
* **Framework Agnostic**: The core library code must be framework-agnostic. Component-specific examples (e.g., React hooks or wrappers) belong solely within the documentation folders.

---

## Questions or Private Collaborations

For private requests, security-sensitive disclosures, or collaborative opportunities, please reach out via the [GitHub Discussions Board](https://github.com/dev-aditya-lab/webdev-power-kit/discussions) or refer to the [Security Policy](SECURITY.md).

Thank you for helping to improve WebDev Power Kit.
