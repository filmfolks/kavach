# Kavach Test Results

## Summary
- **Test Framework**: Native Node.js test runner (`node:test`, `node:assert/strict`)
- **Dependencies**: 0 external dependencies (pure standard library)
- **Total Test Cases**: 58 sample messages + 2 suite validations = **60 tests**
- **Passed**: 60
- **Failed**: 0
- **Pass Rate**: 100%
- **Execution Duration**: ~220ms
- **Environment**: Node.js v20.19.2 (Linux x86_64)

---

## Test Coverage Breakdown

### By Scam Family & Category
| Category / Family | Total Tests | Expected Verdict | Result |
| :--- | :---: | :--- | :--- |
| **Fake KYC / Account Blocked Alert** | 6 | Likely scam | 6 / 6 Passed |
| **Electricity Bill Disconnection Threat** | 5 | Likely scam | 5 / 5 Passed |
| **FedEx / Courier Drugs & Digital Arrest** | 5 | Likely scam | 5 / 5 Passed |
| **UPI Collect Request / PIN to Receive** | 6 | Likely scam | 6 / 6 Passed |
| **Task-Based / Like & Review Job Scam** | 4 | Likely scam | 4 / 4 Passed |
| **KBC / Lucky Draw / Lottery Winner** | 4 | Likely scam | 4 / 4 Passed |
| **Remote Access App (AnyDesk) & OTP Sharing** | 4 | Likely scam | 4 / 4 Passed |
| **Predatory Instant Loan Apps** | 3 | Likely scam | 3 / 3 Passed |
| **Guaranteed Stock Tips & VIP Crypto Groups** | 3 | Likely scam | 3 / 3 Passed |
| **Impersonating Authority (TRAI / Police / DoT)** | 3 | Likely scam | 3 / 3 Passed |
| **Suspicious Links & Spoofed Gov/Bank Domains** | 3 | Likely scam | 3 / 3 Passed |
| **Ambiguous / Isolated Caution Indicators** | 2 | Be careful | 2 / 2 Passed |
| **Legitimate Messages (OTP, Debit, Delivery, Receipts)** | 10 | No known scam signs | 10 / 10 Passed |

### By Language
| Language | Test Count | Pass Count | Status |
| :--- | :---: | :---: | :---: |
| **English** | 29 | 29 | 100% |
| **Hindi (Devanagari)** | 11 | 11 | 100% |
| **Hindi (Romanised / Hinglish)** | 6 | 6 | 100% |
| **Tamil (Script)** | 9 | 9 | 100% |
| **Tamil (Romanised / Tanglish)** | 3 | 3 | 100% |

---

## Complete Test Output

```
▶ Kavach Rule Engine Test Suite
  ✔ Total test cases must be >= 40 (Found: 58) (0.961774ms)
  ✔ [kyc_01_en] (fake_kyc_account_blocked | English) -> Likely scam (10.449417ms)
  ✔ [kyc_02_en] (fake_kyc_account_blocked | English) -> Likely scam (7.19368ms)
  ✔ [kyc_03_hi_devanagari] (fake_kyc_account_blocked | Hindi (Devanagari)) -> Likely scam (7.81995ms)
  ✔ [kyc_04_hi_hinglish] (fake_kyc_account_blocked | Hindi (Hinglish)) -> Likely scam (0.263706ms)
  ✔ [kyc_05_ta_script] (fake_kyc_account_blocked | Tamil (Script)) -> Likely scam (0.208786ms)
  ✔ [kyc_06_ta_tanglish] (fake_kyc_account_blocked | Tamil (Tanglish)) -> Likely scam (0.226748ms)
  ✔ [elec_01_en] (electricity_bill_disconnection | English) -> Likely scam (0.293707ms)
  ✔ [elec_02_hi_devanagari] (electricity_bill_disconnection | Hindi (Devanagari)) -> Likely scam (0.363597ms)
  ✔ [elec_03_hi_hinglish] (electricity_bill_disconnection | Hindi (Hinglish)) -> Likely scam (0.303594ms)
  ✔ [elec_04_ta_script] (electricity_bill_disconnection | Tamil (Script)) -> Likely scam (0.31961ms)
  ✔ [elec_05_ta_tanglish] (electricity_bill_disconnection | Tamil (Tanglish)) -> Likely scam (0.311227ms)
  ✔ [courier_01_en] (courier_drugs_digital_arrest | English) -> Likely scam (0.328597ms)
  ✔ [courier_02_en] (courier_drugs_digital_arrest | English) -> Likely scam (0.39855ms)
  ✔ [courier_03_hi_devanagari] (courier_drugs_digital_arrest | Hindi (Devanagari)) -> Likely scam (0.367834ms)
  ✔ [courier_04_hi_hinglish] (courier_drugs_digital_arrest | Hindi (Hinglish)) -> Likely scam (0.210475ms)
  ✔ [courier_05_ta_script] (courier_drugs_digital_arrest | Tamil (Script)) -> Likely scam (0.246238ms)
  ✔ [upi_01_en] (upi_collect_request | English) -> Likely scam (0.248231ms)
  ✔ [upi_02_en] (upi_collect_request | English) -> Likely scam (0.331513ms)
  ✔ [upi_03_hi_devanagari] (upi_collect_request | Hindi (Devanagari)) -> Likely scam (0.310589ms)
  ✔ [upi_04_hi_hinglish] (upi_collect_request | Hindi (Hinglish)) -> Likely scam (0.211897ms)
  ✔ [upi_05_ta_script] (upi_collect_request | Tamil (Script)) -> Likely scam (0.2165ms)
  ✔ [upi_06_ta_tanglish] (upi_collect_request | Tamil (Tanglish)) -> Likely scam (0.256363ms)
  ✔ [task_01_en] (fake_task_job_scam | English) -> Likely scam (0.219483ms)
  ✔ [task_02_hi_devanagari] (fake_task_job_scam | Hindi (Devanagari)) -> Likely scam (0.188936ms)
  ✔ [task_03_hi_hinglish] (fake_task_job_scam | Hindi (Hinglish)) -> Likely scam (0.195448ms)
  ✔ [task_04_ta_script] (fake_task_job_scam | Tamil (Script)) -> Likely scam (0.197328ms)
  ✔ [lottery_01_en] (lottery_prize_scam | English) -> Likely scam (1.566621ms)
  ✔ [lottery_02_hi_devanagari] (lottery_prize_scam | Hindi (Devanagari)) -> Likely scam (0.171384ms)
  ✔ [lottery_03_hi_hinglish] (lottery_prize_scam | Hindi (Hinglish)) -> Likely scam (0.207044ms)
  ✔ [lottery_04_ta_script] (lottery_prize_scam | Tamil (Script)) -> Likely scam (0.214748ms)
  ✔ [remote_01_en] (remote_access_otp | English) -> Likely scam (0.274264ms)
  ✔ [remote_02_en] (remote_access_otp | English) -> Likely scam (0.177257ms)
  ✔ [remote_03_hi_devanagari] (remote_access_otp | Hindi (Devanagari)) -> Likely scam (0.162073ms)
  ✔ [remote_04_ta_script] (remote_access_otp | Tamil (Script)) -> Likely scam (0.158843ms)
  ✔ [loan_01_en] (fake_loan_apps | English) -> Likely scam (0.22361ms)
  ✔ [loan_02_hi_devanagari] (fake_loan_apps | Hindi (Devanagari)) -> Likely scam (0.147474ms)
  ✔ [loan_03_ta_script] (fake_loan_apps | Tamil (Script)) -> Likely scam (0.137093ms)
  ✔ [invest_01_en] (investment_stock_tips | English) -> Likely scam (0.183936ms)
  ✔ [invest_02_hi_devanagari] (investment_stock_tips | Hindi (Devanagari)) -> Likely scam (0.138084ms)
  ✔ [invest_03_ta_script] (investment_stock_tips | Tamil (Script)) -> Likely scam (0.123745ms)
  ✔ [auth_01_en] (impersonating_authority | English) -> Likely scam (0.14337ms)
  ✔ [auth_02_hi_devanagari] (impersonating_authority | Hindi (Devanagari)) -> Likely scam (0.131193ms)
  ✔ [auth_03_ta_script] (impersonating_authority | Tamil (Script)) -> Likely scam (0.133628ms)
  ✔ [url_01_fake_gov] (suspicious_links | English) -> Likely scam (0.147232ms)
  ✔ [url_02_ip_address] (suspicious_links | English) -> Likely scam (0.16482ms)
  ✔ [url_03_apk_sideload] (suspicious_links | English) -> Likely scam (0.231945ms)
  ✔ [ambiguous_01_shortener_alone] (ambiguous | English) -> Be careful (0.167893ms)
  ✔ [ambiguous_02_suspicious_tld] (ambiguous | English) -> Be careful (0.132654ms)
  ✔ [legit_01_bank_otp] (legitimate | English) -> No known scam signs (0.242032ms)
  ✔ [legit_02_bank_debit] (legitimate | English) -> No known scam signs (0.150505ms)
  ✔ [legit_03_bank_credit] (legitimate | English) -> No known scam signs (1.197978ms)
  ✔ [legit_04_ecommerce_delivery] (legitimate | English) -> No known scam signs (0.206426ms)
  ✔ [legit_05_flipkart_delivered] (legitimate | English) -> No known scam signs (0.143858ms)
  ✔ [legit_06_irctc_pnr] (legitimate | English) -> No known scam signs (0.135541ms)
  ✔ [legit_07_electricity_receipt] (legitimate | English) -> No known scam signs (0.165551ms)
  ✔ [legit_08_aadhaar_otp] (legitimate | English) -> No known scam signs (0.130909ms)
  ✔ [legit_09_whatsapp_code] (legitimate | English) -> No known scam signs (0.123345ms)
  ✔ [legit_10_personal_chat] (legitimate | English) -> No known scam signs (0.123134ms)
✔ Kavach Rule Engine Test Suite (47.438862ms)
ℹ tests 60
ℹ suites 0
ℹ pass 60
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 221.669266
```
