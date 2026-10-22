# Security Policy

## Privacy & Security Guarantee

Kavach is designed from the ground up as a **zero-knowledge, 100% client-side application**:
1. **Zero Data Leaves Your Device**: All regex evaluation and rule heuristics happen entirely inside your web browser or local Node process.
2. **No Tracking or Telemetry**: No analytics scripts, tracking pixels, or third-party monitoring SDKs are included.
3. **Works Offline**: The application utilizes a Service Worker to cache all logic and rules, enabling full offline operation without any active network connection.
4. **No Build Step / No Minified Obfuscation**: The source code is pure vanilla ES modules, allowing full auditability by security researchers.

---

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

---

## Reporting a Vulnerability

If you discover a security vulnerability (such as a ReDoS vulnerability in regex patterns or an XSS injection path in the rendering engine), please report it responsibly:

- **Do NOT open a public GitHub issue** for undisclosed security vulnerabilities.
- **Email**: `security@kavach-project.org` (or contact project maintainers directly).
- Include detailed reproduction steps, example payload, and impact analysis.
- You will receive an initial response within 48 hours.
- Fixes will be developed in a private branch before public release.
