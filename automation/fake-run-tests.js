const fs = require('fs');
const path = require('path');

console.log('Running fake automation suite...');
console.log('Generating fake reports...');

const reportsPath = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsPath)) fs.mkdirSync(reportsPath, { recursive: true });

const summary = {
  total: 10,
  passed: 10,
  failed: 0,
  skipped: 0,
  passPercentage: 100,
  duration: 12,
  failures: []
};

const html = `<!DOCTYPE html><html><body><h1>Fake Automation Report</h1><p>All checks passed.</p></body></html>`;
const json = { summary, testCases: [] };
const markdown = `# Fake Automation Summary\nAll fake checks passed.\n`;

fs.writeFileSync(path.join(reportsPath, 'Automation_Test_Report.xlsx'), 'Fake Excel content');
fs.writeFileSync(path.join(reportsPath, 'execution-report.html'), html);
fs.writeFileSync(path.join(reportsPath, 'summary.md'), markdown);
fs.writeFileSync(path.join(reportsPath, 'execution-results.json'), JSON.stringify(json, null, 2));

console.log('Fake automation suite completed successfully.');
process.exit(0);
