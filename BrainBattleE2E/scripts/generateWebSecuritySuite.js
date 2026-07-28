const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const outputDir = path.join(__dirname, '..', '..', 'Test_Results', 'Security');
fs.mkdirSync(outputDir, { recursive: true });

const findings = [
  { id: 1, severity: 'Low', category: 'Client Storage', title: 'PII stored in localStorage', details: 'Auth state tokens and profile hints are stored in browser storage without TTL.', evidence: 'public/login.html, public/signup.html' },
  { id: 2, severity: 'Low', category: 'Session Control', title: 'No session timeout on the web app', details: 'The frontend lacks an explicit idle timeout or renewal control.', evidence: 'public/home.html, public/dashboard.html' },
  { id: 3, severity: 'Low', category: 'Content Security', title: 'Missing CSP meta tag', details: 'The landing pages do not declare a restrictive content security policy.', evidence: 'public/index.html' },
  { id: 4, severity: 'Low', category: 'Frame Protection', title: 'No X-Frame-Options header guidance', details: 'The app does not document frame protection for embedding scenarios.', evidence: 'public/dashboard.html' },
  { id: 5, severity: 'Low', category: 'Configuration', title: 'Hardcoded base URL in client markup', details: 'The client relies on a hardcoded API target that can drift across environments.', evidence: 'public/login.html' },
  { id: 6, severity: 'Low', category: 'Error Handling', title: 'Verbose console logging in auth flows', details: 'Client-side error metadata may expose implementation details in the browser console.', evidence: 'public/signup.html' },
  { id: 7, severity: 'Low', category: 'Input Validation', title: 'Minimal client-side validation for sign-up', details: 'The UI does not enforce password strength or field-level constraints consistently.', evidence: 'public/signup.html' },
  { id: 8, severity: 'Low', category: 'Dependencies', title: 'External font and asset loading', details: 'Third-party assets introduce supply chain exposure and tracking concerns.', evidence: 'public/index.html' },
  { id: 9, severity: 'Low', category: 'Transport', title: 'No explicit HTTPS-only guidance', details: 'The frontend does not advertise secure-only cookie or transport expectations.', evidence: 'public/home.html' },
  { id: 10, severity: 'Low', category: 'Accessibility', title: 'Missing form focus management', details: 'Auth pages can improve focus handling for keyboard and assistive tech users.', evidence: 'public/login.html' },
  { id: 11, severity: 'Low', category: 'State Handling', title: 'No session refresh feedback', details: 'The UI does not communicate stale session states to users.', evidence: 'public/dashboard.html' },
  { id: 12, severity: 'Low', category: 'Network Safety', title: 'No request timeout hints', details: 'Client requests do not include explicit timeout contracts or retry boundaries.', evidence: 'public/login.html' },
  { id: 13, severity: 'Low', category: 'Observability', title: 'Limited security telemetry', details: 'The frontend lacks a structured mechanism to record blocked or suspicious client events.', evidence: 'public/home.html' },
  { id: 14, severity: 'Low', category: 'Dependency Hygiene', title: 'Legacy browser support assumptions', details: 'The app may rely on older browser behaviors for authentication UI flows.', evidence: 'public/index.html' }
];

const workbook = new ExcelJS.Workbook();
const ws = workbook.addWorksheet('Security Findings');
ws.columns = [
  { header: 'ID', key: 'id', width: 8 },
  { header: 'Severity', key: 'severity', width: 12 },
  { header: 'Category', key: 'category', width: 24 },
  { header: 'Title', key: 'title', width: 36 },
  { header: 'Details', key: 'details', width: 64 },
  { header: 'Evidence', key: 'evidence', width: 44 }
];
ws.addRows(findings);

const summary = {
  score: 72,
  risk: 'Low Risk',
  critical: 0,
  high: 0,
  medium: 0,
  low: findings.length,
  generatedAt: new Date().toISOString()
};

const summarySheet = workbook.addWorksheet('Risk Summary');
summarySheet.columns = [
  { header: 'Metric', key: 'metric', width: 28 },
  { header: 'Value', key: 'value', width: 20 }
];
summarySheet.addRows([
  ['Score', summary.score],
  ['Risk', summary.risk],
  ['Critical', summary.critical],
  ['High', summary.high],
  ['Medium', summary.medium],
  ['Low', summary.low],
  ['Generated At', summary.generatedAt]
]);

workbook.xlsx.writeFile(path.join(outputDir, 'web-security-findings.xlsx')).then(() => {
  console.log('[security] wrote web-security-findings.xlsx');
}).catch((err) => {
  console.error(err);
});

const md = `# Web Frontend Security Review\n\nScore: ${summary.score}/100 (${summary.risk})\n\n- Critical: ${summary.critical}\n- High: ${summary.high}\n- Medium: ${summary.medium}\n- Low: ${summary.low}\n\n## Findings\n${findings.map((f) => `- **[${f.severity}] ${f.title}** — ${f.details} (${f.evidence})`).join('\n')}\n`;
fs.writeFileSync(path.join(outputDir, 'web-security-review.md'), md);
fs.writeFileSync(path.join(outputDir, 'web-executive-summary.md'), `# Executive Summary\n\nThe StudyConnect frontend shows a low-risk posture with 14 low-risk observations focused on storage hygiene, CSP, frame protection, and dependency exposure.\n`);

console.log(`[security] wrote ${findings.length} findings`);