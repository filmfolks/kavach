# Contributing to Kavach

Thank you for contributing to Kavach! By improving our open-source scam detection rules and multilingual support, you are directly helping protect citizens across India from cyber financial fraud.

---

## Architecture Overview

Kavach is designed to be lightweight, transparent, and completely decoupled:
- **`rules/rules.json`**: Declarative database containing all scam families, regex patterns, weights, explanations, advice, and official citations. **Contributors can add new patterns without editing JavaScript code.**
- **`engine.js`**: Pure vanilla JS regex evaluator and heuristic scoring engine.
- **`i18n/`**: Localization strings for English (`en.json`), Hindi (`hi.json`), and Tamil (`ta.json`).
- **`tests/test_rules.js`**: Node.js test suite ensuring high detection accuracy and zero false positives.

---

## How to Add a New Scam Pattern

To add a new scam rule or expand an existing one, update `rules/rules.json`:

```json
{
  "id": "new_scam_pattern_id",
  "family": "category_name",
  "name": "Human-Readable Rule Name",
  "severity": "critical | high | medium | low",
  "weight": 50,
  "languages": ["en", "hi", "hi-Latn", "ta", "ta-Latn"],
  "patterns": [
    "(?:regex_pattern_here).*?(?:keyword)",
    "हिंदी_रेगेक्स_पैटर्न",
    "தமிழ்_ரெஜெக்ஸ்_வடிவம்"
  ],
  "explanation": "Plain-language explanation of why this message is dangerous and how the scam works.",
  "advice": "Actionable, concrete steps for the user (e.g. do not call private numbers, verify on official portal).",
  "source": "Official source citation (e.g. RBI BE(A)WARE booklet, CERT-In Advisory, I4C / cybercrime.gov.in)."
}
```

### Guidelines for Rule Patterns:
1. **Official Sources Only**: Every rule must stem from an authentic, verified advisory (RBI, CERT-In, I4C, NPCI, DoT, TRAI, or State Police). Record the URL in `SOURCES.md`.
2. **Multilingual Inclusivity**: Always consider Romanised scripts (Hinglish like `"aapka khata block"`, Tanglish like `"ungal vangi kanakku"`) in addition to native scripts (Devanagari, Tamil).
3. **Prevent ReDoS (Regular Expression Denial of Service)**:
   - Avoid catastrophic backtracking patterns like `(a+)+`.
   - Prefer non-greedy quantifiers `.*?` bounded by word boundaries or specific tokens.
4. **Weights and Thresholds**:
   - `critical` (weight 50–60): Overt scam red flags (e.g., asking for UPI PIN to receive money, fake electricity cutoff tonight, digital arrest threats).
   - `high` (weight 40–50): High-confidence scam setups (task jobs, lottery winners, instant loans without CIBIL).
   - `medium` (weight 20–35): Suspicious indicators (obfuscated shorteners, unverified TLDs).

---

## Adding a Test Case

Whenever you introduce a new rule or pattern, **you must add at least one test case** in `tests/test_rules.js`:

```javascript
{
  id: 'category_01_lang',
  category: 'your_category',
  language: 'English | Hindi | Tamil',
  text: 'Exact realistic message text seen in the wild...',
  expectedVerdict: 'Likely scam' // or 'Be careful' or 'No known scam signs'
}
```

Run tests locally using Node.js:
```bash
node --test tests/test_rules.js
```
All tests must pass before submitting a Pull Request.

---

## Adding a New Language

Kavach currently supports English, Hindi, and Tamil. To contribute a new Indian language (e.g., Telugu, Kannada, Bengali, Marathi, Malayalam, Gujarati, Punjabi):
1. Create `i18n/<lang_code>.json` using `i18n/en.json` as a template.
2. Add translation strings for UI elements, sample chips, and verdicts.
3. Add native and Romanised keywords to corresponding rules in `rules/rules.json`.
4. Add sample messages in `SAMPLE_MESSAGES` inside `app.js`.
5. Add test cases in `tests/test_rules.js`.

---

## Submitting Pull Requests

1. Fork the repository and create your feature branch: `git checkout -b feature/new-scam-rule`.
2. Commit your changes with clear commit messages.
3. Verify tests: `node --test tests/test_rules.js`.
4. Submit a Pull Request targeting the `main` branch.
