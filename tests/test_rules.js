import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeMessage } from '../engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rulesPath = path.join(__dirname, '..', 'rules', 'rules.json');
const rulesData = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));

/**
 * Test dataset with >= 45 realistic scam and legitimate sample messages
 * Spans English, Hindi (Devanagari + Hinglish), Tamil (Tamil script + Tanglish)
 */
const testCases = [
  // ==========================================
  // FAMILY 1: FAKE KYC / ACCOUNT BLOCKED
  // ==========================================
  {
    id: 'kyc_01_en',
    category: 'fake_kyc_account_blocked',
    language: 'English',
    text: 'Dear Customer, your SBI account has been blocked due to pending KYC verification. Please click immediately on http://sbi-kyc-update.com to verify your PAN card to avoid permanent deactivation.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'kyc_02_en',
    category: 'fake_kyc_account_blocked',
    language: 'English',
    text: 'Dear user, your HDFC netbanking will be suspended within 24 hours. Update your KYC immediately by visiting http://bit.ly/hdfc-kyc-verify',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'kyc_03_hi_devanagari',
    category: 'fake_kyc_account_blocked',
    language: 'Hindi (Devanagari)',
    text: 'प्रिय ग्राहक, आपका बैंक खाता केवाईसी न होने के कारण बंद कर दिया गया है। तुरंत पैन कार्ड अपडेट करें: http://pnb-kyc-portal.top',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'kyc_04_hi_hinglish',
    category: 'fake_kyc_account_blocked',
    language: 'Hindi (Hinglish)',
    text: 'Aapka SBI YONO khata block kar diya gaya hai. Turant KYC update kare nahi toh account band ho jayega: http://bit.ly/yono-update',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'kyc_05_ta_script',
    category: 'fake_kyc_account_blocked',
    language: 'Tamil (Script)',
    text: 'அன்புள்ள வாடிக்கையாளரே, உங்களது வங்கி கணக்கு KYC புதுப்பிக்கப்படாததால் முடக்கப்பட்டுள்ளது. உடனடியாக அப்டேட் செய்யவும் http://sbi-update.xyz',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'kyc_06_ta_tanglish',
    category: 'fake_kyc_account_blocked',
    language: 'Tamil (Tanglish)',
    text: 'Ungal vangi kanakku block aagi vittadhu. Udane KYC update seiyavum link moolam: http://bit.ly/bank-kyc-ta',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 2: ELECTRICITY BILL DISCONNECTION
  // ==========================================
  {
    id: 'elec_01_en',
    category: 'electricity_bill_disconnection',
    language: 'English',
    text: 'Dear consumer your electricity power will be disconnected tonight at 9.30 pm from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer on 9876543210. Thank you.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'elec_02_hi_devanagari',
    category: 'electricity_bill_disconnection',
    language: 'Hindi (Devanagari)',
    text: 'प्रिय उपभोक्ता आज रात 9.30 बजे आपकी बिजली काट दी जाएगी क्योंकि पिछले महीने का बिल अपडेट नहीं हुआ है। तुरंत बिजली अधिकारी से संपर्क करें: 9812345678',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'elec_03_hi_hinglish',
    category: 'electricity_bill_disconnection',
    language: 'Hindi (Hinglish)',
    text: 'Aapka bijli connection aaj raat 9:30 baje kaat diya jayega. Pichle mahine ka bill update nahi hua hai. Turant electricity officer se baat kare: 9898989898',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'elec_04_ta_script',
    category: 'electricity_bill_disconnection',
    language: 'Tamil (Script)',
    text: 'அன்புள்ள வாடிக்கையாளரே, உங்கள் முந்தைய மாத மின்சாரக் கட்டணம் அப்டேட் செய்யப்படவில்லை. இன்று இரவு 9:30 மணிக்கு மின் இணைப்பு துண்டிக்கப்படும். உடனே மின்சார அதிகாரியை 9876501234 என்ற எண்ணில் தொடர்பு கொள்ளவும்.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'elec_05_ta_tanglish',
    category: 'electricity_bill_disconnection',
    language: 'Tamil (Tanglish)',
    text: 'Inru iravu ungal min inaippu thundikkappadum. Munthaiya madha minsara kattanam update aagavillai. Udane contact seiyavum 9876543210',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 3: COURIER / FEDEX DRUGS + DIGITAL ARREST
  // ==========================================
  {
    id: 'courier_01_en',
    category: 'courier_drugs_digital_arrest',
    language: 'English',
    text: 'FedEx Alert: Your parcel #FX-9821 containing 140 grams of MDMA narcotics and 5 fake passports has been seized by Customs at Mumbai Airport. A digital arrest warrant has been issued by CBI. Join Skype call immediately for verification.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'courier_02_en',
    category: 'courier_drugs_digital_arrest',
    language: 'English',
    text: 'This is Delhi Police Crime Branch. Your Aadhaar card is linked to a money laundering syndicate. You are placed under digital arrest. You must remain on video call until investigation concludes.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'courier_03_hi_devanagari',
    category: 'courier_drugs_digital_arrest',
    language: 'Hindi (Devanagari)',
    text: 'कूरियर कस्टम विभाग: आपके नाम से भेजे गए पार्सल में ड्रग्स और नशीली दवाएं पाई गई हैं। आपके खिलाफ डिजिटल अरेस्ट वारंट जारी किया गया है। तुरंत सीबीआई से वीडियो कॉल पर जुड़ें।',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'courier_04_hi_hinglish',
    category: 'courier_drugs_digital_arrest',
    language: 'Hindi (Hinglish)',
    text: 'Aapke parcel me MDMA drugs pakda gaya hai. Mumbai Customs aur CBI ne aapke khilaf digital arrest warrant nikala hai. Turant Skype call par connect kare.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'courier_05_ta_script',
    category: 'courier_drugs_digital_arrest',
    language: 'Tamil (Script)',
    text: 'உங்கள் பெயரில் அனுப்பப்பட்ட கூரியர் பார்சலில் போதைப்பொருள் பிடிபட்டுள்ளது. சுங்கத்துறை மற்றும் சிபிஐ மூலம் டிஜிட்டல் கைது நடவடிக்கை தொடங்கப்பட்டுள்ளது. உடனே வீடியோ காலில் இணையவும்.',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 4: UPI COLLECT REQUEST / PIN TO RECEIVE
  // ==========================================
  {
    id: 'upi_01_en',
    category: 'upi_collect_request',
    language: 'English',
    text: 'Congratulations! You have received ₹3,500 cashback reward from PhonePe. Click here and enter UPI PIN to receive money in your bank account.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'upi_02_en',
    category: 'upi_collect_request',
    language: 'English',
    text: 'OLX Buyer: I have sent ₹8,000 for your sofa. Please accept the collect request and enter your UPI PIN to get the credit in your account.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'upi_03_hi_devanagari',
    category: 'upi_collect_request',
    language: 'Hindi (Devanagari)',
    text: 'गूगल पे: आपको ₹5000 का कैशबैक मिला है। पैसे पाने के लिए तुरंत अपना यूपीआई पिन (UPI PIN) दर्ज करें।',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'upi_04_hi_hinglish',
    category: 'upi_collect_request',
    language: 'Hindi (Hinglish)',
    text: 'Aapko PhonePe se ₹2,000 ka cashback mila hai. Bank account me paise lene ke liye UPI PIN dale aur claim kare.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'upi_05_ta_script',
    category: 'upi_collect_request',
    language: 'Tamil (Script)',
    text: 'போன்பே மூலம் உங்களுக்கு ₹3000 கேஷ்பேக் பரிசு கிடைத்துள்ளது. பணத்தை உங்கள் கணக்கில் பெற உடனே UPI PIN ஐ உள்ளிடவும்.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'upi_06_ta_tanglish',
    category: 'upi_collect_request',
    language: 'Tamil (Tanglish)',
    text: 'Google Pay cashback kedaithulladhu. Panam ungal accountil vara udane UPI PIN podavum.',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 5: FAKE TASK / JOB SCAM
  // ==========================================
  {
    id: 'task_01_en',
    category: 'fake_task_job_scam',
    language: 'English',
    text: 'Work from home opportunity! Earn ₹3,000 to ₹5,000 daily by just liking YouTube videos and rating hotels on Google Maps. No experience needed. Join Telegram: @hr_priya_jobs',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'task_02_hi_devanagari',
    category: 'fake_task_job_scam',
    language: 'Hindi (Devanagari)',
    text: 'घर बैठे पार्ट टाइम जॉब: रोजाना ₹2000 से ₹4000 कमाएं। बस यूट्यूब वीडियो लाइक करें और मैप पर रिव्यू दें। अभी टेलीग्राम जॉइन करें।',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'task_03_hi_hinglish',
    category: 'fake_task_job_scam',
    language: 'Hindi (Hinglish)',
    text: 'Ghar baithe part time job karke daily ₹3000 kamaye. Sirf YouTube video like aur Google map review karna hai. Contact Telegram @job_recruiter',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'task_04_ta_script',
    category: 'fake_task_job_scam',
    language: 'Tamil (Script)',
    text: 'வீட்டிலிருந்தே பகுதி நேர வேலை! தினமும் ₹3000 முதல் ₹5000 வரை சம்பாதிக்கலாம். யூடியூப் வீடியோக்களை லைக் செய்து கூகுள் மேப்பில் ரேட்டிங் கொடுப்பது மட்டுமே வேலை. டெலிகிராமில் இணையவும்.',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 6: LOTTERY / PRIZE / KBC SCAMS
  // ==========================================
  {
    id: 'lottery_01_en',
    category: 'lottery_prize_scam',
    language: 'English',
    text: 'Congratulations! Your mobile number has won ₹25,00,000 in Kaun Banega Crorepati (KBC) lucky draw. Contact WhatsApp lottery manager Rana Pratap Singh on +91-9876543210 to claim after paying 2% registration fee.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'lottery_02_hi_devanagari',
    category: 'lottery_prize_scam',
    language: 'Hindi (Devanagari)',
    text: 'बधाई हो! आपके मोबाइल नंबर ने केबीसी (KBC) लकी ड्रॉ में ₹25 लाख जीते हैं। लॉटरी मैनेजर से संपर्क करें और प्रोसेसिंग फीस जमा करें।',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'lottery_03_hi_hinglish',
    category: 'lottery_prize_scam',
    language: 'Hindi (Hinglish)',
    text: 'Badhai ho! Aapka number KBC lottery me select hua hai aur aapne jeete hain 25 lakh. Lottery manager se contact kare aur processing fee jama kare.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'lottery_04_ta_script',
    category: 'lottery_prize_scam',
    language: 'Tamil (Script)',
    text: 'வாழ்த்துக்கள்! உங்கள் மொபைல் எண் KBC அதிர்ஷ்டக் குலுக்கலில் ₹25 லட்சம் பரிசை வென்றுள்ளது. பரிசைப் பெற செயலாக்கக் கட்டணம் செலுத்தி வாட்ஸ்அப்பில் தொடர்பு கொள்ளவும்.',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 7: REMOTE ACCESS APPS & OTP EXFILTRATION
  // ==========================================
  {
    id: 'remote_01_en',
    category: 'remote_access_otp',
    language: 'English',
    text: 'Customer Support: To process your pending bank refund, please install AnyDesk app from Play Store and provide the 9-digit screen share code to our executive.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'remote_02_en',
    category: 'remote_access_otp',
    language: 'English',
    text: 'SBI Support: Please share the OTP received on your mobile with our support agent to verify and unblock your netbanking account immediately.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'remote_03_hi_devanagari',
    category: 'remote_access_otp',
    language: 'Hindi (Devanagari)',
    text: 'कस्टमर केयर: खाता चालू करने के लिए प्ले स्टोर से एनीडेस्क (AnyDesk) डाउनलोड करें और 9 अंकों का कोड हमारे अधिकारी को बताएं।',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'remote_04_ta_script',
    category: 'remote_access_otp',
    language: 'Tamil (Script)',
    text: 'வங்கி கணக்கு சிக்கலை சரிசெய்ய QuickSupport செயலியைப் பதிவிறக்கம் செய்து 9 இலக்க எண்ணை எங்கள் அதிகாரியிடம் தெரிவிக்கவும்.',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 8: PREDATORY FAKE LOAN APPS
  // ==========================================
  {
    id: 'loan_01_en',
    category: 'fake_loan_apps',
    language: 'English',
    text: 'Instant personal loan up to ₹2,00,000 approved in 5 minutes! No documents, zero CIBIL score required. Direct disbursal. Download loan APK now: http://tinyurl.com/fast-cash-apk',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'loan_02_hi_devanagari',
    category: 'fake_loan_apps',
    language: 'Hindi (Devanagari)',
    text: 'बिना किसी दस्तावेज़ और बिना सिबिल स्कोर के ₹1,00,000 का तुरंत पर्सनल लोन पाएं। सिर्फ 5 मिनट में बैंक खाते में। अभी एपीके डाउनलोड करें http://loan-quick.xyz',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'loan_03_ta_script',
    category: 'fake_loan_apps',
    language: 'Tamil (Script)',
    text: 'ஆவணங்கள் மற்றும் சிபில் ஸ்கோர் இன்றி ₹1,00,000 வரை உடனடி கடன் 5 நிமிடத்தில் பெறலாம்! உடனே லோன் செயலியை பதிவிறக்கம் செய்யவும் http://bit.ly/quick-loan-app',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 9: INVESTMENT & STOCK TIPS SCAMS
  // ==========================================
  {
    id: 'invest_01_en',
    category: 'investment_stock_tips',
    language: 'English',
    text: 'Exclusive VIP WhatsApp group: Get 100% guaranteed stock market tips with 300% monthly profit! Join now for free insider signals and multibagger calls: http://bit.ly/vip-stocks',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'invest_02_hi_devanagari',
    category: 'investment_stock_tips',
    language: 'Hindi (Devanagari)',
    text: 'शेयर बाजार में 100% गारंटीड मुनाफा! रोजाना ₹10,000 कमाने के लिए हमारा वीआईपी व्हाट्सएप ग्रुप जॉइन करें। पक्का रिटर्न जीरो रिस्क।',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'invest_03_ta_script',
    category: 'investment_stock_tips',
    language: 'Tamil (Script)',
    text: 'பங்குச் சந்தையில் 100% உத்தரவாதமான லாபம்! தினமும் ₹10,000 வரை சம்பாதிக்க எங்கள் விஐபி வாட்ஸ்அப் குழுவில் இணையுங்கள். பூஜ்ஜிய ஆபத்து.',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 10: IMPERSONATING TRAI / POLICE / GOV
  // ==========================================
  {
    id: 'auth_01_en',
    category: 'impersonating_authority',
    language: 'English',
    text: 'TRAI Alert: All your mobile number outgoing and incoming calls will be disconnected within 2 hours due to illegal activities. Contact Department of Telecommunications officer immediately.',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'auth_02_hi_devanagari',
    category: 'impersonating_authority',
    language: 'Hindi (Devanagari)',
    text: 'ट्राई (TRAI) चेतावनी: अवैध गतिविधियों के कारण आपका मोबाइल नंबर 2 घंटे में बंद कर दिया जाएगा। तुरंत कॉल करें और सिम कार्ड सत्यापन करवाएं।',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'auth_03_ta_script',
    category: 'impersonating_authority',
    language: 'Tamil (Script)',
    text: 'டிராய் (TRAI) அவசர அறிவிப்பு: உங்களது சிம் கார்டு அடுத்த 2 மணி நேரத்தில் முடக்கப்படும். சேவையைத் தொடர உடனடியாக தொடர்பு கொள்ளவும்.',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // FAMILY 11: SUSPICIOUS LINKS & SPOOFED SITES
  // ==========================================
  {
    id: 'url_01_fake_gov',
    category: 'suspicious_links',
    language: 'English',
    text: 'Your traffic e-challan of ₹2000 is pending. Pay immediately to avoid court summons: http://echallan-parivahan.top/pay',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'url_02_ip_address',
    category: 'suspicious_links',
    language: 'English',
    text: 'Urgent notification regarding your pending subsidy. Access your account here: http://192.168.1.105:8080/claim-subsidy',
    expectedVerdict: 'Likely scam'
  },
  {
    id: 'url_03_apk_sideload',
    category: 'suspicious_links',
    language: 'English',
    text: 'Download the new PM-Yojana welfare application to receive ₹5000 directly: http://welfare-scheme.xyz/app.apk',
    expectedVerdict: 'Likely scam'
  },

  // ==========================================
  // AMBIGUOUS / CAUTION CASES (BE CAREFUL)
  // ==========================================
  {
    id: 'ambiguous_01_shortener_alone',
    category: 'ambiguous',
    language: 'English',
    text: 'Check out the new menu for this weekend at our café: https://bit.ly/cafe-menu-special',
    expectedVerdict: 'Be careful'
  },
  {
    id: 'ambiguous_02_suspicious_tld',
    category: 'ambiguous',
    language: 'English',
    text: 'Visit our photography portfolio to see latest pictures from the event: https://naturephotos.xyz/gallery',
    expectedVerdict: 'Be careful'
  },

  // ==========================================
  // LEGITIMATE / SAFE MESSAGES (NO KNOWN SCAM SIGNS)
  // ==========================================
  {
    id: 'legit_01_bank_otp',
    category: 'legitimate',
    language: 'English',
    text: '492817 is your OTP for transaction of INR 1,499.00 at AMAZON INDIA on Card ending XX4321. DO NOT SHARE THIS OTP WITH ANYONE. Bank never calls or asks for OTP. Valid for 10 mins.',
    expectedVerdict: 'No known scam signs'
  },
  {
    id: 'legit_02_bank_debit',
    category: 'legitimate',
    language: 'English',
    text: 'Dear Customer, INR 340.00 debited from A/c XX8910 on 22-Oct-26 at 11:20 via UPI to ZOMATO. Avail Bal: INR 15,230.50. If not done by you, SMS BLOCK to 567676 - HDFC Bank',
    expectedVerdict: 'No known scam signs'
  },
  {
    id: 'legit_03_bank_credit',
    category: 'legitimate',
    language: 'English',
    text: 'Dear Customer, your A/c XX4567 has been credited with INR 45,000.00 on 22-Oct-26 by NEFT-Salary. Available Balance: INR 62,400.00. - State Bank of India',
    expectedVerdict: 'No known scam signs'
  },
  {
    id: 'legit_04_ecommerce_delivery',
    category: 'legitimate',
    language: 'English',
    text: 'Your Amazon order #402-9871234-5678901 is out for delivery today with delivery associate Ramesh. Share delivery PIN 76 only when package is received in hand.',
    expectedVerdict: 'No known scam signs'
  },
  {
    id: 'legit_05_flipkart_delivered',
    category: 'legitimate',
    language: 'English',
    text: 'Your Flipkart package has been delivered. Thank you for shopping with us! Rate your delivery experience on the official app.',
    expectedVerdict: 'No known scam signs'
  },
  {
    id: 'legit_06_irctc_pnr',
    category: 'legitimate',
    language: 'English',
    text: 'PNR 2415678901 Train 12626 KERALA EXPRESS 22-Oct-26 NDLS to MAS. 2 Passengers Confirmed B1-21, B1-22. Happy Journey - IRCTC',
    expectedVerdict: 'No known scam signs'
  },
  {
    id: 'legit_07_electricity_receipt',
    category: 'legitimate',
    language: 'English',
    text: 'Dear Consumer, thank you for payment of Rs 1,840.00 towards electricity bill for Consumer No 04-22-1089 on 21-Oct-26. Payment ID: TXN49102847. - TANGEDCO',
    expectedVerdict: 'No known scam signs'
  },
  {
    id: 'legit_08_aadhaar_otp',
    category: 'legitimate',
    language: 'English',
    text: '739201 is your OTP to download e-Aadhaar. Do not share OTP with anyone for security reasons. Valid for 10 minutes. - UIDAI',
    expectedVerdict: 'No known scam signs'
  },
  {
    id: 'legit_09_whatsapp_code',
    category: 'legitimate',
    language: 'English',
    text: 'Your WhatsApp code: 382-901. Do not share this code with anyone. WhatsApp employees will never ask for your verification code.',
    expectedVerdict: 'No known scam signs'
  },
  {
    id: 'legit_10_personal_chat',
    category: 'legitimate',
    language: 'English',
    text: 'Hey Suresh, are we still meeting for lunch today at 1:30 PM near the office cafeteria? Let me know!',
    expectedVerdict: 'No known scam signs'
  }
];

test('Kavach Rule Engine Test Suite', async (t) => {
  await t.test(`Total test cases must be >= 40 (Found: ${testCases.length})`, () => {
    assert.ok(testCases.length >= 40, `Expected at least 40 test cases, found ${testCases.length}`);
  });

  let passed = 0;
  let failed = 0;
  const failureDetails = [];

  for (const tc of testCases) {
    await t.test(`[${tc.id}] (${tc.category} | ${tc.language}) -> ${tc.expectedVerdict}`, () => {
      const result = analyzeMessage(tc.text, rulesData);
      try {
        assert.equal(
          result.verdict,
          tc.expectedVerdict,
          `Failed on [${tc.id}]:\n  Message: "${tc.text}"\n  Expected verdict: "${tc.expectedVerdict}"\n  Got verdict: "${result.verdict}" (score: ${result.score}, rawScore: ${result.rawScore})\n  Triggered findings: ${JSON.stringify(result.findings.map(f => f.id))}\n  Triggered URL rules: ${JSON.stringify(result.urlFindings.map(f => f.id))}\n  Mitigations: ${JSON.stringify(result.mitigations.map(m => m.id))}`
        );
        passed++;
      } catch (err) {
        failed++;
        failureDetails.push({ id: tc.id, message: err.message });
        throw err;
      }
    });
  }
});
