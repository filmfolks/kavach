/**
 * Kavach — Main UI Application Controller
 * Plain Vanilla JS (ES Modules) • 100% Client-Side
 */

import { analyzeMessage, highlightMatches } from './engine.js';

// Application State
let currentLang = 'en';
let rulesData = null;
const i18nData = {
  en: null,
  hi: null,
  ta: null
};

// Real-world sample messages mapped by language and family
const SAMPLE_MESSAGES = {
  en: {
    electricity: 'Dear consumer your electricity power will be disconnected tonight at 9.30 pm from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer on 9876543210. Thank you.',
    digital_arrest: 'FedEx Alert: Your parcel containing 140 grams of MDMA narcotics and 5 fake passports has been detained by Mumbai Customs. A digital arrest warrant has been issued by CBI. Join Skype video call immediately.',
    kyc: 'Dear SBI User, your account has been blocked due to pending KYC verification. Please click immediately on http://sbi-kyc-update.com to update your PAN card to avoid permanent closure.',
    upi: 'Congratulations! You have received ₹3,500 cashback reward from PhonePe. Click here and enter UPI PIN to receive money in your bank account.',
    job: 'Work from home opportunity! Earn ₹3,000 to ₹5,000 daily by just liking YouTube videos and rating hotels on Google Maps. No experience needed. Join Telegram: @hr_priya_jobs',
    legit_otp: '492817 is your OTP for transaction of INR 1,499.00 at AMAZON INDIA on Card ending XX4321. DO NOT SHARE THIS OTP WITH ANYONE. Bank never calls or asks for OTP. Valid for 10 mins.'
  },
  hi: {
    electricity: 'प्रिय उपभोक्ता आज रात 9.30 बजे आपकी बिजली काट दी जाएगी क्योंकि पिछले महीने का बिल अपडेट नहीं हुआ है। तुरंत बिजली अधिकारी से संपर्क करें: 9812345678',
    digital_arrest: 'कूरियर कस्टम विभाग: आपके नाम से भेजे गए पार्सल में ड्रग्स और नशीली दवाएं पाई गई हैं। आपके खिलाफ डिजिटल अरेस्ट वारंट जारी किया गया है। तुरंत सीबीआई से वीडियो कॉल पर जुड़ें।',
    kyc: 'प्रिय ग्राहक, आपका बैंक खाता केवाईसी न होने के कारण बंद कर दिया गया है। तुरंत पैन कार्ड अपडेट करें: http://sbi-kyc-update.com',
    upi: 'गूगल पे: आपको ₹5000 का कैशबैक मिला है। पैसे पाने के लिए तुरंत अपना यूपीआई पिन (UPI PIN) दर्ज करें।',
    job: 'घर बैठे पार्ट टाइम जॉब: रोजाना ₹2000 से ₹4000 कमाएं। बस यूट्यूब वीडियो लाइक करें और मैप पर रिव्यू दें। अभी टेलीग्राम जॉइन करें।',
    legit_otp: '492817 आपका ओटीपी (OTP) है। इसे किसी के साथ साझा न करें। बैंक कभी भी आपका ओटीपी नहीं पूछता है।'
  },
  ta: {
    electricity: 'அன்புள்ள வாடிக்கையாளரே, உங்கள் முந்தைய மாத மின்சாரக் கட்டணம் அப்டேட் செய்யப்படவில்லை. இன்று இரவு 9:30 மணிக்கு மின் இணைப்பு துண்டிக்கப்படும். உடனே மின்சார அதிகாரியை 9876501234 என்ற எண்ணில் தொடர்பு கொள்ளவும்.',
    digital_arrest: 'உங்கள் பெயரில் அனுப்பப்பட்ட கூரியர் பார்சலில் போதைப்பொருள் பிடிபட்டுள்ளது. சுங்கத்துறை மற்றும் சிபிஐ மூலம் டிஜிட்டல் கைது நடவடிக்கை தொடங்கப்பட்டுள்ளது. உடனே வீடியோ காலில் இணையவும்.',
    kyc: 'அன்புள்ள வாடிக்கையாளரே, உங்களது வங்கி கணக்கு KYC புதுப்பிக்கப்படாததால் முடக்கப்பட்டுள்ளது. உடனடியாக அப்டேட் செய்யவும் http://sbi-update.xyz',
    upi: 'போன்பே மூலம் உங்களுக்கு ₹3000 கேஷ்பேக் பரிசு கிடைத்துள்ளது. பணத்தை உங்கள் கணக்கில் பெற உடனே UPI PIN ஐ உள்ளிடவும்.',
    job: 'வீட்டிலிருந்தே பகுதி நேர வேலை! தினமும் ₹3000 முதல் ₹5000 வரை சம்பாதிக்கலாம். யூடியூப் வீடியோக்களை லைக் செய்து கூகுள் மேப்பில் ரேட்டிங் கொடுப்பது மட்டுமே வேலை. டெலிகிராமில் இணையவும்.',
    legit_otp: '492817 என்பது உங்களின் OTP ஆகும். இந்த எண்ணை யாருடனும் பகிர வேண்டாம். வங்கி ஒருபோதும் OTP கேட்காது.'
  }
};

// DOM Elements
const messageInput = document.getElementById('messageInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const pasteBtn = document.getElementById('pasteBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsCard = document.getElementById('resultsCard');
const verdictHeader = document.getElementById('verdictHeader');
const verdictIcon = document.getElementById('verdictIcon');
const verdictText = document.getElementById('verdictText');
const verdictDesc = document.getElementById('verdictDesc');
const scoreValue = document.getElementById('scoreValue');
const highlightSection = document.getElementById('highlightSection');
const highlightPreview = document.getElementById('highlightPreview');
const findingsSection = document.getElementById('findingsSection');
const findingsList = document.getElementById('findingsList');
const actionsList = document.getElementById('actionsList');
const emergencyGrid = document.getElementById('emergencyGrid');
const copyReportBtn = document.getElementById('copyReportBtn');

// Language elements
const langButtons = {
  en: document.getElementById('langEn'),
  hi: document.getElementById('langHi'),
  ta: document.getElementById('langTa')
};

// Sample Chips
const sampleChips = {
  electricity: document.getElementById('sampleElec'),
  digital_arrest: document.getElementById('sampleArrest'),
  kyc: document.getElementById('sampleKyc'),
  upi: document.getElementById('sampleUpi'),
  job: document.getElementById('sampleJob'),
  legit_otp: document.getElementById('sampleLegit')
};

/**
 * Initializes Application
 */
async function init() {
  registerServiceWorker();
  await loadResources();
  setupEventListeners();
  restorePreferences();
}

/**
 * Registers PWA Service Worker for Offline Functionality
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Kavach Service Worker registered:', reg.scope))
      .catch((err) => console.warn('Service Worker registration skipped:', err));
  }
}

/**
 * Loads rules.json and i18n translation files
 */
async function loadResources() {
  try {
    const [rulesRes, enRes, hiRes, taRes] = await Promise.all([
      fetch('./rules/rules.json'),
      fetch('./i18n/en.json'),
      fetch('./i18n/hi.json'),
      fetch('./i18n/ta.json')
    ]);

    rulesData = await rulesRes.json();
    i18nData.en = await enRes.json();
    i18nData.hi = await hiRes.json();
    i18nData.ta = await taRes.json();

    updateLanguageUI(currentLang);
  } catch (error) {
    console.error('Failed to load Kavach application resources:', error);
  }
}

/**
 * Sets up user event listeners
 */
function setupEventListeners() {
  // Analyze on button click
  analyzeBtn.addEventListener('click', runAnalysis);

  // Paste from clipboard
  pasteBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          messageInput.value = text;
          runAnalysis();
        }
      } else {
        messageInput.focus();
      }
    } catch {
      messageInput.focus();
    }
  });

  // Clear input
  clearBtn.addEventListener('click', () => {
    messageInput.value = '';
    resultsCard.classList.remove('visible');
    messageInput.focus();
  });

  // Copy Analysis Report
  copyReportBtn.addEventListener('click', copyAnalysisReport);

  // Keyboard shortcut: Ctrl/Cmd + Enter to analyze
  messageInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runAnalysis();
    }
  });

  // Language buttons
  Object.keys(langButtons).forEach((lang) => {
    langButtons[lang].addEventListener('click', () => {
      setLanguage(lang);
    });
  });

  // Sample Chips
  Object.keys(sampleChips).forEach((key) => {
    if (sampleChips[key]) {
      sampleChips[key].addEventListener('click', () => {
        const sampleText = SAMPLE_MESSAGES[currentLang]?.[key] || SAMPLE_MESSAGES.en[key];
        messageInput.value = sampleText;
        runAnalysis();
      });
    }
  });
}

/**
 * Switch Active UI Language
 */
function setLanguage(lang) {
  if (!i18nData[lang]) return;
  currentLang = lang;
  localStorage.setItem('kavach_lang', lang);

  // Update button active state
  Object.keys(langButtons).forEach((l) => {
    langButtons[l].classList.toggle('active', l === lang);
  });

  updateLanguageUI(lang);

  // If a result is currently showing, re-run analysis to update recommendations and verdict text
  if (messageInput.value.trim()) {
    runAnalysis();
  }
}

/**
 * Updates all UI strings to selected language
 */
function updateLanguageUI(lang) {
  const dict = i18nData[lang] || i18nData.en;
  if (!dict) return;

  document.getElementById('appTitle').textContent = dict.app_name;
  document.getElementById('appTagline').textContent = dict.tagline;
  document.getElementById('privacyBadge').innerHTML = `<span>🔒</span><span>${dict.privacy_badge}</span>`;
  messageInput.placeholder = dict.input_placeholder;
  document.getElementById('btnAnalyzeText').textContent = dict.btn_analyze;
  document.getElementById('btnPasteText').textContent = dict.btn_paste;
  document.getElementById('btnClearText').textContent = dict.btn_clear;
  document.getElementById('btnCopyReportText').textContent = dict.btn_copy_report;
  document.getElementById('samplesTitle').textContent = dict.sample_title;
  document.getElementById('indicatorsTitle').innerHTML = `<span>⚠️</span><span>${dict.indicators_title}</span>`;
  document.getElementById('actionsTitle').innerHTML = `<span>📋</span><span>${dict.actions_title}</span>`;
  document.getElementById('emergencyTitle').innerHTML = `<span>🚨</span><span>${dict.emergency_title}</span>`;
  document.getElementById('disclaimerText').textContent = dict.disclaimer;

  // Update sample button labels
  if (dict.samples) {
    if (sampleChips.electricity) sampleChips.electricity.textContent = dict.samples.electricity;
    if (sampleChips.digital_arrest) sampleChips.digital_arrest.textContent = dict.samples.digital_arrest;
    if (sampleChips.kyc) sampleChips.kyc.textContent = dict.samples.kyc;
    if (sampleChips.upi) sampleChips.upi.textContent = dict.samples.upi;
    if (sampleChips.job) sampleChips.job.textContent = dict.samples.job;
    if (sampleChips.legit_otp) sampleChips.legit_otp.textContent = dict.samples.legit_otp;
  }
}

/**
 * Restores user preferences from localStorage
 */
function restorePreferences() {
  const savedLang = localStorage.getItem('kavach_lang');
  if (savedLang && i18nData[savedLang]) {
    setLanguage(savedLang);
  }
}

/**
 * Executes message analysis and renders findings
 */
function runAnalysis() {
  const text = messageInput.value.trim();
  const dict = i18nData[currentLang] || i18nData.en;

  if (!text) {
    alert(dict?.no_text_alert || 'Please paste or type a message to check.');
    messageInput.focus();
    return;
  }

  if (!rulesData) {
    console.error('Rules data not loaded yet.');
    return;
  }

  const result = analyzeMessage(text, rulesData);
  renderResults(text, result, dict);
}

/**
 * Renders verdict, explanations, highlights, and emergency contacts
 */
function renderResults(originalText, result, dict) {
  resultsCard.classList.add('visible');

  // 1. Verdict Styling & Texts
  verdictHeader.className = 'verdict-header';
  scoreValue.textContent = result.score;

  if (result.verdictCode === 'scam') {
    verdictHeader.classList.add('verdict-scam');
    verdictIcon.textContent = '🚨';
    verdictText.textContent = dict?.scam_verdict?.title || 'Likely Scam (High Risk)';
    verdictDesc.textContent = dict?.scam_verdict?.desc || 'Critical scam patterns flagged! Do NOT click links or send money.';
  } else if (result.verdictCode === 'suspicious') {
    verdictHeader.classList.add('verdict-suspicious');
    verdictIcon.textContent = '⚠️';
    verdictText.textContent = dict?.caution_verdict?.title || 'Be Careful (Potential Suspicion)';
    verdictDesc.textContent = dict?.caution_verdict?.desc || 'Contains suspicious or unknown links/urgency. Proceed with caution.';
  } else {
    verdictHeader.classList.add('verdict-safe');
    verdictIcon.textContent = '✅';
    verdictText.textContent = dict?.clean_verdict?.title || 'No Known Scam Signs Detected';
    verdictDesc.textContent = dict?.clean_verdict?.desc || 'Message matches legitimate communication patterns. Always keep passwords private.';
  }

  // 2. Highlighted Snippets Preview
  if (result.highlightedRanges && result.highlightedRanges.length > 0) {
    highlightSection.style.display = 'block';
    highlightPreview.innerHTML = highlightMatches(originalText, result.highlightedRanges);
  } else {
    highlightSection.style.display = 'none';
  }

  // 3. Explanations & Modus Operandi Findings
  const allFindings = [...result.findings, ...result.urlFindings];
  findingsList.innerHTML = '';

  if (allFindings.length > 0) {
    findingsSection.style.display = 'block';
    allFindings.forEach((f) => {
      const item = document.createElement('div');
      item.className = `finding-item severity-${f.severity || 'medium'}`;

      const severityBadgeClass = f.severity === 'critical' ? 'badge-critical' : (f.severity === 'high' ? 'badge-high' : 'badge-medium');

      item.innerHTML = `
        <div class="finding-name">
          <span>${escapeHtml(f.name)}</span>
          <span class="finding-badge ${severityBadgeClass}">${escapeHtml(f.severity || 'warning')}</span>
        </div>
        <div class="finding-explanation">${escapeHtml(f.explanation || '')}</div>
        ${f.advice ? `<div class="finding-advice">💡 <strong>Advice:</strong> ${escapeHtml(f.advice)}</div>` : ''}
        ${f.source ? `<div class="finding-source">📚 Source: ${escapeHtml(f.source)}</div>` : ''}
      `;
      findingsList.appendChild(item);
    });
  } else {
    findingsSection.style.display = 'none';
  }

  // 4. Action Steps
  actionsList.innerHTML = '';
  result.recommendedActions.forEach((act) => {
    const li = document.createElement('li');
    li.className = 'action-item';
    li.innerHTML = `<span class="action-icon">✔</span><span>${escapeHtml(act)}</span>`;
    actionsList.appendChild(li);
  });

  // 5. Emergency Contacts
  emergencyGrid.innerHTML = '';
  result.emergencyContacts.forEach((contact) => {
    const div = document.createElement('div');
    div.className = 'emergency-card';
    const isUrl = contact.contact.startsWith('http');
    const href = isUrl ? contact.contact : `tel:${contact.contact.replace(/[^\d+]/g, '')}`;
    const linkIcon = isUrl ? '🌐' : '📞';

    div.innerHTML = `
      <div>
        <div class="emergency-name">${escapeHtml(contact.name)}</div>
        <div class="emergency-desc">${escapeHtml(contact.description)}</div>
      </div>
      <div>
        <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="emergency-link">
          <span>${linkIcon}</span>
          <span>${escapeHtml(contact.contact)}</span>
        </a>
      </div>
    `;
    emergencyGrid.appendChild(div);
  });

  // Scroll to results smoothly on mobile
  resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Copies a structured report of the analysis to the clipboard
 */
async function copyAnalysisReport() {
  const text = messageInput.value.trim();
  if (!text || !rulesData) return;

  const result = analyzeMessage(text, rulesData);
  const dict = i18nData[currentLang] || i18nData.en;

  let report = `🛡️ Kavach Scam Analysis Report\n`;
  report += `Verdict: ${result.verdict} (Risk Score: ${result.score}/100)\n`;
  report += `Date: ${new Date().toLocaleString()}\n\n`;
  report += `Original Message:\n"${text}"\n\n`;

  if (result.findings.length > 0 || result.urlFindings.length > 0) {
    report += `Identified Red Flags:\n`;
    [...result.findings, ...result.urlFindings].forEach((f, idx) => {
      report += `${idx + 1}. [${f.severity.toUpperCase()}] ${f.name}\n   - Why: ${f.explanation}\n   - Advice: ${f.advice}\n`;
    });
    report += `\n`;
  }

  report += `Emergency Contacts for India:\n`;
  report += `- National Cyber Crime Helpline: 1930\n`;
  report += `- National Cyber Crime Reporting Portal: https://cybercrime.gov.in\n`;
  report += `- Sanchar Saathi (Chakshu): https://sancharsaathi.gov.in\n\n`;
  report += `Analyzed 100% offline via Kavach (Open-Source Scam Message Checker)\n`;

  try {
    await navigator.clipboard.writeText(report);
    const originalText = document.getElementById('btnCopyReportText').textContent;
    document.getElementById('btnCopyReportText').textContent = dict?.btn_copied || 'Report Copied!';
    setTimeout(() => {
      document.getElementById('btnCopyReportText').textContent = originalText;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy report:', err);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Start app
window.addEventListener('DOMContentLoaded', init);
