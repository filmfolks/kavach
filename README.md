# 🛡️ Kavach (कवच / கவச்)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tests: 100% Pass](https://img.shields.io/badge/Tests-60%2F60%20Pass-brightgreen.svg)](TEST_RESULTS.md)
[![Privacy: 100% Client--Side](https://img.shields.io/badge/Privacy-100%25%20Offline-success.svg)](#privacy-promise)
[![Platform: PWA](https://img.shields.io/badge/Platform-Web%20%2F%20PWA-orange.svg)](#install-as-pwa)

**Kavach** is a free, privacy-first, open-source scam message checker built for India. Anyone can paste a suspicious SMS, WhatsApp message, email text, UPI collect request, or link and receive an instant, explainable verdict: **"Likely scam"**, **"Be careful"**, or **"No known scam signs"** — with the exact triggers highlighted and actionable emergency steps provided.

---

## 📸 Interface Preview

```
+--------------------------------------------------------------------------+
|  🇮🇳 Made for India                                 [English | हिंदी | தமிழ்] |
|                                                                          |
|                                🛡️ KAVACH                                 |
|               Open-Source Scam Message Checker for India                 |
|       [🔒 100% Client-Side • Zero Data Leaves Your Device • Works Offline] |
|                                                                          |
|  +--------------------------------------------------------------------+  |
|  | Dear consumer your electricity power will be disconnected tonight |  |
|  | at 9.30 pm because your previous month bill was not updated.      |  |
|  | Please contact our electricity officer on 9876543210.             |  |
|  +--------------------------------------------------------------------+  |
|  [ 🛡️ Analyze Message ]    [ 📋 Paste ]    [ ✖ Clear ]                    |
|                                                                          |
|  Try Samples: [⚡ Electricity] [👮 Digital Arrest] [🏦 Fake KYC] [💳 UPI] |
|                                                                          |
|  ======================================================================  |
|  🚨 VERDICT: Likely Scam (High Risk)              Risk Score: 55/100     |
|  Critical scam patterns flagged! Do not call numbers or click links.     |
|                                                                          |
|  🔍 Highlighted Suspicious Signs:                                        |
|     "electricity power will be disconnected tonight"                     |
|     "contact our electricity officer on 9876543210"                      |
|                                                                          |
|  ⚠️ Key Indicators & Explanations:                                       |
|     • Electricity Bill Disconnection Threat                              |
|       Power discoms never send sudden disconnection threats via personal |
|       SMS or ask you to call 10-digit private numbers.                   |
|                                                                          |
|  🚨 Emergency Contacts:                                                  |
|     • National Cyber Crime Helpline: 1930                                |
|     • Cyber Crime Portal: https://cybercrime.gov.in                      |
|     • Sanchar Saathi (Chakshu): https://sancharsaathi.gov.in             |
+--------------------------------------------------------------------------+
```

---

## 🔒 Privacy Promise

1. **Zero Data Transmission**: 100% of the analysis is performed client-side inside your browser using vanilla JavaScript ES modules.
2. **Zero Analytics & Trackers**: No third-party trackers, no cookies, and no logging of entered text.
3. **Works Completely Offline**: After the initial page load, Kavach functions without any internet connection through its built-in Service Worker.
4. **No Build Step**: Plain HTML, Vanilla CSS, and JavaScript. Zero minification or hidden code.

---

## 🚀 How to Use

### 1. Web / Browser
Simply open `index.html` in any modern web browser or serve locally:
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080` in your browser.

### 2. Install as PWA (Android / iOS / Desktop)
1. Open Kavach in Chrome, Edge, or Safari on your device.
2. Tap the browser menu and select **"Add to Home Screen"** or **"Install App"**.
3. Launch Kavach anytime directly from your home screen — even when completely offline or in airplane mode.

---

## 🛡️ Scam Families Covered

Kavach rules are derived directly from official advisories published by the **Reserve Bank of India (RBI)**, **CERT-In**, **I4C / Ministry of Home Affairs**, **NPCI**, **TRAI**, and the **Department of Telecommunications (DoT)**:

1. **Fake KYC / Account Blocked**: Alerts falsely threatening your SBI, HDFC, or YONO account will be frozen unless PAN/Aadhaar is updated immediately via an unofficial link.
2. **Electricity Bill Disconnection Threats**: Messages warning that your power supply will be cut off "tonight at 9:30 PM" due to unpaid bills, instructing you to call a personal mobile number.
3. **Courier / FedEx Drug Parcel & "Digital Arrest"**: Intimidation scams claiming a parcel in your name contains MDMA narcotics, placing you under a fake "digital arrest" over Skype or WhatsApp video calls.
4. **UPI Collect Requests & "PIN to Receive Money"**: Traps asking you to enter your UPI PIN to claim cashback, scratch cards, or OLX buyer payments. (*Rule: You NEVER enter a PIN to receive money!*)
5. **Fake Part-Time Job / Task Scams**: Unrealistic daily income offers (₹2,000–₹5,000/day) for liking YouTube videos or rating Google Maps locations, leading to Telegram prepaid investment traps.
6. **Lottery / KBC Lucky Draw**: False claims of winning ₹25 Lakhs or a car in Kaun Banega Crorepati (KBC), asking for advance "processing fees" or GST.
7. **Remote Desktop Apps & OTP Requests**: Coercion to install AnyDesk, QuickSupport, or TeamViewer to steal screen control or share 6-digit OTPs.
8. **Predatory Instant Loan Apps**: Offers for ₹50,000–₹2,00,000 loans within 5 minutes without documents or CIBIL scores, distributing malicious APK download links.
9. **Guaranteed Stock Tips & VIP Crypto Groups**: Unsolicited WhatsApp/Telegram invites promising "100% guaranteed profit" and insider market signals.
10. **Authority Impersonation (TRAI / Police / DoT / CBI)**: Threats stating your SIM card or mobile number will be disconnected within 2 hours by TRAI, or fake arrest notices.
11. **Suspicious Links & Lookalike Domains**: Automatic detection of URL shorteners (`bit.ly`, `tinyurl.com`), direct IP address links (`http://192.168...`), `.apk` sideload links, and domains spoofing government services (`echallan`, `parivahan`) or banks outside official `.gov.in` and bank domains.

---

## 🇮🇳 Multilingual Support

Kavach supports:
- **English**
- **Hindi (हिन्दी)**: Both native Devanagari script and Romanised Hinglish (e.g. *"aapka khata band kar diya gaya hai"*).
- **Tamil (தமிழ்)**: Both native Tamil script and Romanised Tanglish (e.g. *"ungal vangi kanakku block aagi vittadhu"*).

The UI includes a language switcher at the top that updates all buttons, sample chips, and guidance.

---

## ⚙️ How to Add a New Rule

Rules live in `rules/rules.json`. You can add new patterns without editing application code:

```json
{
  "id": "my_new_rule",
  "family": "scam_category",
  "name": "Descriptive Rule Name",
  "severity": "critical | high | medium | low",
  "weight": 50,
  "languages": ["en", "hi", "hi-Latn", "ta", "ta-Latn"],
  "patterns": [
    "regex_pattern_here"
  ],
  "explanation": "Why this message is suspicious.",
  "advice": "Actionable advice for the user.",
  "source": "Official source citation (RBI / CERT-In / I4C / DoT)"
}
```

Validate your rules against the test suite:
```bash
node --test tests/test_rules.js
```

---

## 🧪 Testing

Kavach comes with an automated test suite containing 58+ real-world scam and legitimate messages:
```bash
node --test tests/test_rules.js
```
Full test output and category coverage are recorded in [TEST_RESULTS.md](TEST_RESULTS.md).

---

## 🚨 Emergency Numbers & Official Helplines (India)

| Authority | Contact / Portal | Purpose |
| :--- | :--- | :--- |
| **National Cyber Crime Helpline** | **1930** (Toll-Free) | Immediate reporting of financial cyber fraud to freeze siphoned funds. |
| **National Cyber Crime Portal** | [cybercrime.gov.in](https://cybercrime.gov.in) | Ministry of Home Affairs official portal to lodge formal cybercrime complaints. |
| **Sanchar Saathi (Chakshu)** | [sancharsaathi.gov.in](https://sancharsaathi.gov.in) | Department of Telecommunications portal to report suspected fraud SMS, calls, and WhatsApp messages. |
| **RBI Sachet Portal** | [sachet.rbi.org.in](https://sachet.rbi.org.in) | Verify registered financial entities and report illegal deposit or lending schemes. |
| **Bank Helpline** | Number on back of debit/credit card | Immediately block compromised accounts, cards, or netbanking credentials. |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
