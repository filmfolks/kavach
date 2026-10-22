# Kavach Project Roadmap

This roadmap outlines key milestones for expanding Kavach into an ubiquitous, privacy-first civic cybersecurity tool for all Indian citizens.

---

## 1. Expansion to 10+ Additional Indian Languages
- **Objective**: Extend regex rules, romanised dialect keywords, and UI translations to India's major regional languages.
- **Target Languages**: Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Bengali (বাংলা), Marathi (मराठी), Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡ଼ିଆ).
- **Scope**: Include transliterated scripts (e.g. Romanised Telugu / Manglish / Benglish) to detect conversational messaging scams.

---

## 2. Android Web Share Target API Integration
- **Objective**: Allow users to share suspicious messages directly into Kavach from WhatsApp, SMS, or Telegram with one tap.
- **Implementation**: Leverage the W3C Web Share Target API in `manifest.webmanifest`:
  ```json
  "share_target": {
    "action": "/index.html",
    "method": "GET",
    "params": {
      "title": "title",
      "text": "text"
    }
  }
  ```
- **Benefit**: Frictionless user experience on low-cost Android smartphones.

---

## 3. On-Device Screenshot OCR (No Cloud Uploads)
- **Objective**: Detect scams from forwarded WhatsApp screenshots and e-challan images.
- **Implementation**: Integrate a lightweight, offline WebAssembly-compiled OCR engine (e.g., Tesseract.js WASM with quantized language models).
- **Privacy Assurance**: Images are processed strictly within device memory with zero server uploads.

---

## 4. Desktop & Mobile Browser Extension (Chrome, Brave, Firefox)
- **Objective**: Provide continuous defense when reading emails or using WhatsApp Web on computers.
- **Features**:
  - Context menu: "Check with Kavach" on right-clicking selected text.
  - Automatic subtle warning banner on webmail phishing attempts.
  - Built with Manifest V3 and shared engine logic from `engine.js`.

---

## 5. SMS Sender Header & Short Code Heuristics
- **Objective**: Flag fake utility or bank messages sent from personal 10-digit mobile numbers (+91-98xxxxxx) instead of authorized DLT alphanumeric sender IDs (e.g. `AX-SBIBNK`, `VK-TNEBPR`).
- **Implementation**: Add specialized header analysis heuristics matching TRAI Telecom Commercial Communications Customer Preference Regulations (TCCCPR).

---

## 6. Offline Malicious Domain Bloom Filter
- **Objective**: Instant offline detection of millions of known phishing and loan scam domains.
- **Implementation**: Compile a compressed, probabilistic Bloom filter of malicious domains flagged by CERT-In and DoT Chakshu.
- **Advantage**: Sub-millisecond URL verification with a footprint of under 2 MB storage.

---

## 7. Signed Delta Community Rule Updates
- **Objective**: Allow users' offline PWAs to receive new emerging scam rules without updating the entire app.
- **Implementation**: Implement cryptographically signed delta patches (`rules-diff-YYYY-MM-DD.json`) verified with Ed25519 public keys and cached in IndexedDB.

---

## 8. Web Speech API Voice Scam Checker (Vishing Defense)
- **Objective**: Assist elderly and visually impaired citizens in assessing voice calls or audio recordings.
- **Implementation**: Real-time on-device speech-to-text using the browser's native `webkitSpeechRecognition` / SpeechRecognition API, feeding the resulting transcript into `engine.js`.
