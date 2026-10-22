# Official Sources & Cybercrime Advisories

This document records the official government, regulatory, and law enforcement advisories directly researched and referenced to design the pattern detection rules in `rules/rules.json`.

---

## 1. Reserve Bank of India (RBI)

### RBI "BE(A)WARE — A Booklet on Modus Operandi of Financial Frauds"
- **Issuing Authority**: Reserve Bank of India (Consumer Education and Protection Department)
- **URL**: [https://rbi.org.in](https://rbi.org.in) / [https://cms.rbi.org.in](https://cms.rbi.org.in)
- **Rules Supported**:
  - `kyc_account_blocked_threat` (Part A, Section 1: Phishing Links & Vishing)
  - `upi_collect_pin_to_receive` (Part A, Section 3: Online Selling Platforms & UPI Fraud)
  - `remote_access_apps_exfiltration` (Part A, Section 4 & 6: Screen-Sharing / Remote Access Apps AnyDesk / TeamViewer)
  - `lottery_prize_kbc_scam` (Part A, Section 12: Lottery Frauds)
  - `fake_task_job_scam` (Part A, Section 13: Online Job Frauds)
  - `fake_investment_crypto_stock_group` (Part B, Section 5: Ponzi & MLM Investment Schemes)
- **Official Guidance**:
  - Banks never request confidential credentials (passwords, PINs, OTPs, or remote screen sharing) via SMS or phone calls.
  - A UPI PIN is strictly required only to authorize outgoing payments (debit). Never enter a UPI PIN to receive money, cashback, or prizes.

### RBI Digital Lending Guidelines & Sachet Portal
- **Issuing Authority**: Reserve Bank of India
- **URL**: [https://sachet.rbi.org.in](https://sachet.rbi.org.in)
- **Rules Supported**: `fake_predatory_loan_apps`
- **Official Guidance**:
  - Regulated financial entities and NBFCs must be verified via the RBI Sachet registry.
  - Illegal instant loan apps operating through sideloaded APKs access private device contacts and gallery permissions for illegal harassment.

---

## 2. Indian Cyber Crime Coordination Centre (I4C) & Ministry of Home Affairs (MHA)

### National "Digital Arrest" Cyber Fraud Advisory
- **Issuing Authority**: Ministry of Home Affairs (MHA) / Press Information Bureau (PIB)
- **URL**: [https://pib.gov.in](https://pib.gov.in) & [https://cybercrime.gov.in](https://cybercrime.gov.in)
- **Rules Supported**: `digital_arrest_courier_drugs`
- **Official Guidance**:
  - There is NO provision for "digital arrest" under Indian criminal law (CrPC / Bharatiya Nagarik Suraksha Sanhita).
  - Law enforcement agencies (CBI, Customs, ED, Police, NCB) never investigate suspects, serve warrants, or conduct interrogations over Skype, WhatsApp, or video calls.
  - Citizens targeted must immediately report via National Cyber Crime Helpline **1930** or [cybercrime.gov.in](https://cybercrime.gov.in).

### Advisory on Part-Time Telegram / Micro-Task Job Scams
- **Issuing Authority**: I4C & PIB Fact Check
- **URL**: [https://cybercrime.gov.in](https://cybercrime.gov.in) & [https://pib.gov.in](https://pib.gov.in)
- **Rules Supported**: `fake_task_job_scam`
- **Official Guidance**:
  - Organized cyber syndicates advertise flexible "work-from-home" jobs promising ₹2,000–₹5,000 daily for trivial actions like liking YouTube videos or rating Google Maps locations.
  - Victims are coerced into "prepaid task" accounts and Telegram channels where deposited money is siphoned.
  - Legitimate employers never ask candidates to pay advance registration fees or "recharge" tasks.

---

## 3. Department of Telecommunications (DoT) — Sanchar Saathi

### Chakshu Facility (Suspected Fraud Communication Reporting)
- **Issuing Authority**: Department of Telecommunications (Ministry of Communications, Govt. of India)
- **URL**: [https://sancharsaathi.gov.in](https://sancharsaathi.gov.in)
- **Rules Supported**:
  - `electricity_bill_disconnection_threat`
  - `authority_impersonation_trai_police_sim`
  - `url_shortener_detected`
  - `direct_apk_download`
- **Official Guidance**:
  - Citizens can proactively flag fraudulent voice calls, SMS, and WhatsApp messages impersonating public utilities, telecom officials, or banks.
  - Telecom resources, fake virtual numbers, and compromised IMEIs reported via Chakshu are investigated and blocked nationwide.

---

## 4. National Payments Corporation of India (NPCI)

### NPCI UPI Safety Advisory ("UPI Chalega")
- **Issuing Authority**: National Payments Corporation of India (NPCI)
- **URL**: [https://www.npci.org.in](https://www.npci.org.in)
- **Rules Supported**: `upi_collect_pin_to_receive`
- **Official Guidance**:
  - "UPI PIN is only required to send money from your bank account, NEVER to receive money."
  - Scanning a QR code or entering your 4-digit or 6-digit UPI PIN authorizes money leaving your account.
  - Fraudulent buyers on online classifieds trick victims using the "Collect Request" / "Pull Request" feature under the guise of paying for items.

---

## 5. Telecom Regulatory Authority of India (TRAI)

### Advisory on Mobile Number Disconnection & Impersonation Threats
- **Issuing Authority**: Telecom Regulatory Authority of India (TRAI)
- **URL**: [https://www.trai.gov.in](https://www.trai.gov.in)
- **Rules Supported**: `authority_impersonation_trai_police_sim`
- **Official Guidance**:
  - TRAI has formally clarified that it DOES NOT block or disconnect individual mobile numbers or demand customer KYC.
  - TRAI has not authorized any third-party agency to send messages or make automated IVR calls threatening disconnection within 2 hours.
  - All legitimate service-related alerts are handled directly by licensed Access Service Providers (Jio, Airtel, Vi, BSNL).

---

## 6. Indian Computer Emergency Response Team (CERT-In)

### CERT-In Security Advisories on Banking Trojans, Phishing & Rogue APKs
- **Issuing Authority**: CERT-In (Ministry of Electronics & Information Technology - MeitY)
- **URL**: [https://www.cert-in.org.in](https://www.cert-in.org.in)
- **Rules Supported**:
  - `direct_apk_download`
  - `fake_gov_domain_lookalike`
  - `fake_bank_domain_lookalike`
  - `ip_address_link`
  - `remote_access_apps_exfiltration`
- **Official Guidance**:
  - Warning against sophisticated e-Challan and banking malware campaigns disguised as `.apk` downloads (e.g. `RTO_Challan.apk`, `MParivahan.apk`, fake banking update APKs).
  - Malicious applications request Accessibility Services and SMS notification permissions to read one-time passwords (OTPs) and bypass multi-factor authentication.
  - Government portals in India strictly use `.gov.in` and `.nic.in` domains; unofficial domains using words like `echallan`, `pmkisan`, or `parivahan` with `.com`, `.top`, or `.xyz` are malicious lookalikes.

---

## Summary Mapping Table

| Rule ID | Scam Family | Primary Official Source | Official Publication / Advisory |
| :--- | :--- | :--- | :--- |
| `kyc_account_blocked_threat` | Fake KYC / Account Block | Reserve Bank of India (RBI) | BE(A)WARE Booklet (Part A) |
| `electricity_bill_disconnection_threat` | Electricity Disconnection | DoT / State Discoms / PIB | Chakshu Utility Fraud Alerts |
| `digital_arrest_courier_drugs` | Courier / Digital Arrest | I4C / MHA / PIB | National Digital Arrest Advisory |
| `upi_collect_pin_to_receive` | UPI Collect Request | NPCI / RBI | "UPI PIN to Receive Money" Advisory |
| `fake_task_job_scam` | Like & Review Job Scam | I4C / MHA / PIB | Telegram Task Scams Advisory |
| `lottery_prize_kbc_scam` | KBC / Lucky Draw | RBI / PIB Fact Check | BE(A)WARE Booklet & PIB Notices |
| `remote_access_apps_exfiltration` | Remote Access Apps (AnyDesk) | CERT-In / RBI | Screen-Sharing & OTP Fraud Advisory |
| `fake_predatory_loan_apps` | Fake Loan Apps | RBI / CERT-In | Digital Lending Guidelines & Safety Compass |
| `fake_investment_crypto_stock_group`| Guaranteed Stock / Crypto | SEBI / RBI | Investor Awareness & Ponzi Schemes |
| `authority_impersonation_trai_police_sim` | Impersonating Authority | TRAI / DoT | TRAI Mobile Disconnection Clarification |
| `url_rules` (APK, IP, Lookalike Domains) | Suspicious Links | CERT-In / DoT | Android Malware & Phishing Countermeasures |
