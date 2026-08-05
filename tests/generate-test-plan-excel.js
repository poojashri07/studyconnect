const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const inputPath = path.join(__dirname, 'test-plan.md');
const outputPath = path.join(__dirname, 'test-plan.xlsx');

const raw = fs.readFileSync(inputPath, 'utf8');
const lines = raw.split(/\r?\n/);

const rows = [];
let currentCategory = '';
let currentCategoryIndex = 0;
let currentCategoryName = '';
let sectionOrder = [];

for (const line of lines) {
  const headingMatch = line.match(/^##\s+(.+)$/);
  if (headingMatch) {
    currentCategory = headingMatch[1].trim();
    currentCategoryName = currentCategory;
    currentCategoryIndex += 1;
    sectionOrder.push(currentCategoryName);
    continue;
  }

  const itemMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);
  if (itemMatch && currentCategoryName) {
    const caseNumber = Number(itemMatch[1]);
    const description = itemMatch[2].trim();
    rows.push({
      Category: currentCategoryName,
      CaseNumber: caseNumber,
      Description: description,
    });
  }
}

const summary = {
  Category: 'Summary',
  CaseNumber: '',
  Description: `Total test cases: ${rows.length}`,
};

const wb = XLSX.utils.book_new();
const wsData = [
  ['Category', 'Case Number', 'Description'],
  ...rows.map((row) => [row.Category, row.CaseNumber, row.Description])
];
const ws = XLSX.utils.aoa_to_sheet(wsData);
XLSX.utils.book_append_sheet(wb, ws, 'Test Cases');

const summaryWs = XLSX.utils.aoa_to_sheet([
  ['Category', 'Value'],
  ['Total test cases', rows.length],
  ['Functional', rows.filter((r) => r.Category === 'Functional Test Cases (100)').length],
  ['UI/UX', rows.filter((r) => r.Category === 'UI/UX Test Cases (80)').length],
  ['Validation', rows.filter((r) => r.Category === 'Validation Test Cases (60)').length],
  ['Unit', rows.filter((r) => r.Category === 'Unit Test Cases (40)').length],
  ['Deployment / Release', rows.filter((r) => r.Category === 'Deployment / Release / Deployable Status Test Cases (20)').length],
]);
XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

XLSX.writeFile(wb, outputPath);
console.log(`Generated Excel test plan at ${outputPath}`);
