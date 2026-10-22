/**
 * Kavach Engine — Core Scam Detection and Rule Evaluation Module
 * 100% Client-Side / Offline / Zero Network Calls
 */

/**
 * Normalizes text for regex evaluation while preserving layout
 * @param {string} text
 * @returns {string}
 */
export function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text.trim();
}

/**
 * Extracts URLs from message text
 * @param {string} text
 * @returns {string[]}
 */
export function extractUrls(text) {
  if (!text) return [];
  const urlRegex = /(?:https?:\/\/|www\.)[^\s<>"'{}|\\^`[\]]+/gi;
  const matches = text.match(urlRegex) || [];
  return matches.map(u => (u.startsWith('http') ? u : `https://${u}`));
}

/**
 * Analyzes a message against the loaded Kavach rules database
 * @param {string} text - Message text to check
 * @param {object} rulesData - Parsed rules.json object
 * @returns {object} Analysis result
 */
export function analyzeMessage(text, rulesData) {
  const normalized = normalizeText(text);

  if (!normalized) {
    return {
      verdict: 'No text provided',
      verdictCode: 'empty',
      score: 0,
      confidence: 'N/A',
      findings: [],
      urlFindings: [],
      mitigations: [],
      highlightedRanges: [],
      recommendedActions: [],
      emergencyContacts: getEmergencyContacts()
    };
  }

  const triggeredRules = [];
  const triggeredUrlRules = [];
  const triggeredMitigations = [];
  const highlightedRanges = [];
  let rawScore = 0;
  let hasCriticalTrigger = false;

  // 1. Evaluate Content Pattern Rules
  if (Array.isArray(rulesData?.rules)) {
    for (const rule of rulesData.rules) {
      let ruleMatched = false;
      const matchedSnippets = [];

      for (const patternStr of rule.patterns) {
        try {
          const regex = new RegExp(patternStr, 'gi');
          let match;
          while ((match = regex.exec(normalized)) !== null) {
            ruleMatched = true;
            matchedSnippets.push(match[0]);
            highlightedRanges.push({
              start: match.index,
              end: match.index + match[0].length,
              ruleId: rule.id,
              severity: rule.severity
            });
            // Prevent infinite loop with zero-width matches
            if (match.index === regex.lastIndex) regex.lastIndex++;
          }
        } catch {
          // Skip invalid regex gracefully
        }
      }

      if (ruleMatched) {
        if (rule.severity === 'critical') {
          hasCriticalTrigger = true;
        }
        rawScore += Number(rule.weight || 25);
        triggeredRules.push({
          id: rule.id,
          name: rule.name,
          family: rule.family,
          severity: rule.severity,
          weight: rule.weight,
          matches: Array.from(new Set(matchedSnippets)),
          explanation: rule.explanation,
          advice: rule.advice,
          source: rule.source
        });
      }
    }
  }

  // 2. Evaluate URL Rules
  const urls = extractUrls(normalized);
  if (Array.isArray(rulesData?.url_rules)) {
    for (const urlRule of rulesData.url_rules) {
      try {
        const regex = new RegExp(urlRule.pattern, 'gi');
        let match;
        while ((match = regex.exec(normalized)) !== null) {
          if (urlRule.severity === 'critical') {
            hasCriticalTrigger = true;
          }
          rawScore += Number(urlRule.weight || 25);
          triggeredUrlRules.push({
            id: urlRule.id,
            name: urlRule.name,
            severity: urlRule.severity,
            weight: urlRule.weight,
            matchedUrl: match[0],
            explanation: urlRule.explanation,
            advice: urlRule.advice
          });
          highlightedRanges.push({
            start: match.index,
            end: match.index + match[0].length,
            ruleId: urlRule.id,
            severity: urlRule.severity
          });
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } catch {
        // Skip invalid regex
      }
    }
  }

  // 3. Evaluate Safe Mitigation Markers (Legitimate Notifications)
  let mitigationDeductions = 0;
  if (Array.isArray(rulesData?.mitigation_rules)) {
    for (const mit of rulesData.mitigation_rules) {
      try {
        const regex = new RegExp(mit.pattern, 'gi');
        if (regex.test(normalized)) {
          mitigationDeductions += Number(mit.weight_reduction || 25);
          triggeredMitigations.push({
            id: mit.id,
            name: mit.name,
            explanation: mit.explanation
          });
        }
      } catch {
        // Skip
      }
    }
  }

  // 4. Compute Final Adjusted Score
  let finalScore = rawScore;

  // If there are mitigations and no critical triggers, reduce score
  if (!hasCriticalTrigger && triggeredMitigations.length > 0) {
    finalScore = Math.max(0, finalScore - mitigationDeductions);
  }

  // If a critical rule triggered (e.g. electricity cutoff tonight, UPI PIN to receive money, digital arrest, fake bank APK),
  // ensure the score is >= 50 so it unambiguously triggers "Likely scam"
  if (hasCriticalTrigger && finalScore < 50) {
    finalScore = 55;
  }

  // Cap score between 0 and 100
  finalScore = Math.min(100, Math.max(0, Math.round(finalScore)));

  // 5. Determine Verdict
  const thresholds = rulesData?.verdict_thresholds || { scam: 40, suspicious: 15 };
  let verdict = 'No known scam signs';
  let verdictCode = 'safe'; // 'scam' | 'suspicious' | 'safe'

  if (finalScore >= thresholds.scam || hasCriticalTrigger) {
    verdict = 'Likely scam';
    verdictCode = 'scam';
  } else if (finalScore >= thresholds.suspicious) {
    verdict = 'Be careful';
    verdictCode = 'suspicious';
  } else {
    verdict = 'No known scam signs';
    verdictCode = 'safe';
  }

  // Merge and sort highlighted spans for clean display
  const mergedRanges = mergeOverlappingRanges(highlightedRanges);

  // Recommendations
  const recommendedActions = generateRecommendations(verdictCode, triggeredRules, triggeredUrlRules);

  return {
    verdict,
    verdictCode,
    score: finalScore,
    rawScore,
    hasCriticalTrigger,
    findings: triggeredRules,
    urlFindings: triggeredUrlRules,
    mitigations: triggeredMitigations,
    extractedUrls: urls,
    highlightedRanges: mergedRanges,
    recommendedActions,
    emergencyContacts: getEmergencyContacts()
  };
}

/**
 * Merge overlapping character index ranges
 * @param {Array<{start: number, end: number, ruleId: string, severity: string}>} ranges
 * @returns {Array<{start: number, end: number, ruleId: string, severity: string}>}
 */
export function mergeOverlappingRanges(ranges) {
  if (!ranges || ranges.length === 0) return [];
  const sorted = [...ranges].sort((a, b) => a.start - b.start || b.end - a.end);
  const result = [];
  let current = { ...sorted[0] };

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];
    if (next.start <= current.end) {
      current.end = Math.max(current.end, next.end);
      if (next.severity === 'critical') current.severity = 'critical';
    } else {
      result.push(current);
      current = { ...next };
    }
  }
  result.push(current);
  return result;
}

/**
 * Generate HTML string with highlighted suspicious phrases
 * @param {string} text
 * @param {Array<{start: number, end: number, severity: string}>} ranges
 * @returns {string} Safe HTML with <mark> tags
 */
export function highlightMatches(text, ranges) {
  if (!text) return '';
  if (!ranges || ranges.length === 0) return escapeHtml(text);

  let html = '';
  let lastIndex = 0;

  for (const r of ranges) {
    const start = Math.max(0, Math.min(r.start, text.length));
    const end = Math.max(start, Math.min(r.end, text.length));

    html += escapeHtml(text.slice(lastIndex, start));
    const snippet = text.slice(start, end);
    const badgeClass = r.severity === 'critical' ? 'hl-critical' : 'hl-warning';
    html += `<mark class="kavach-hl ${badgeClass}" title="Suspicious pattern detected">${escapeHtml(snippet)}</mark>`;
    lastIndex = end;
  }
  html += escapeHtml(text.slice(lastIndex));
  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates tailored recommendations based on verdict and triggered rules
 */
function generateRecommendations(verdictCode, findings, urlFindings) {
  const actions = [];

  if (verdictCode === 'scam') {
    actions.push('Do NOT click any links, download files, or call numbers mentioned in the message.');
    actions.push('Report the message immediately to Sanchar Saathi "Chakshu" portal (sancharsaathi.gov.in).');
    actions.push('If you have already lost money, immediately call the National Cyber Crime Helpline: 1930.');
    actions.push('Block and report the sender on WhatsApp or SMS.');
  } else if (verdictCode === 'suspicious') {
    actions.push('Exercise caution. Verify the sender identity through official channels before taking action.');
    actions.push('Do not share OTPs, UPI PINs, or netbanking passwords with anyone.');
    actions.push('If unsure, cross-check on your provider\'s official mobile app or visit their official branch.');
  } else {
    actions.push('This message matches legitimate communication patterns.');
    actions.push('Always remember: Banks and official departments NEVER ask for OTP or UPI PIN to receive money or solve issues.');
  }

  // Family-specific advice
  const families = new Set(findings.map(f => f.family));
  if (families.has('fake_kyc_account_blocked')) {
    actions.push('KYC: Visit your bank branch or use the official bank app directly. Banks never update KYC via SMS links.');
  }
  if (families.has('electricity_bill_disconnection')) {
    actions.push('Electricity: Power boards never send personal 10-digit mobile numbers for bill payments or immediate cutoff threats.');
  }
  if (families.has('courier_drugs_digital_arrest')) {
    actions.push('Digital Arrest: Under Indian law, NO police or court carries out arrests or interrogations over Skype/WhatsApp.');
  }
  if (families.has('upi_collect_request')) {
    actions.push('UPI: Entering your UPI PIN will ALWAYS DEBIT money from your bank, NEVER credit money.');
  }
  if (families.has('remote_access_otp')) {
    actions.push('Remote App: Never install AnyDesk, TeamViewer, or QuickSupport on the advice of an unknown caller.');
  }

  return Array.from(new Set(actions));
}

/**
 * Official Indian Cyber Crime Emergency Contacts
 */
export function getEmergencyContacts() {
  return [
    {
      name: 'National Cyber Crime Helpline',
      contact: '1930',
      type: 'Toll-Free Phone',
      description: 'Immediate financial cyber fraud assistance (Golden Hour fund freeze).'
    },
    {
      name: 'National Cyber Crime Reporting Portal',
      contact: 'https://cybercrime.gov.in',
      type: 'Official Portal',
      description: 'Ministry of Home Affairs (MHA) portal to register cyber crime complaints.'
    },
    {
      name: 'Sanchar Saathi (Chakshu)',
      contact: 'https://sancharsaathi.gov.in',
      type: 'DoT Portal',
      description: 'Report suspected fraud calls, SMS, WhatsApp messages and cloned SIMs.'
    },
    {
      name: 'RBI Sachet Portal',
      contact: 'https://sachet.rbi.org.in',
      type: 'RBI Portal',
      description: 'Check registered financial entities and report illegal deposits/loan apps.'
    }
  ];
}
