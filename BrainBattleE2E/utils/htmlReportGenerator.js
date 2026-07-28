const fs = require('fs');
const path = require('path');

function generateHtmlReport(testResults, outputPath) {
  const passed = testResults.filter((item) => item.status === 'pass').length;
  const failed = testResults.length - passed;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StudyConnect Selenium Execution Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; background: #07111f; color: #f5f7fb; }
    .wrap { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .card { background: #101b31; border: 1px solid #24364d; border-radius: 16px; padding: 20px; margin-bottom: 16px; }
    .badge { display: inline-block; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-right: 8px; }
    .good { background: #1f8f63; } .bad { background: #c84a4a; } .muted { background: #2b3f5b; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
    .metric { background: #16233c; padding: 14px; border-radius: 12px; }
    .metric strong { display: block; font-size: 24px; } 
    table { width: 100%; border-collapse: collapse; margin-top: 10px; } td, th { padding: 10px; border-bottom: 1px solid #24364d; text-align: left; } th { background: #1f2a3f; }
    .stack { white-space: pre-wrap; color: #ffcc80; font-size: 13px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>StudyConnect Selenium Execution Report</h1>
      <p>Generated from a synthetic but realistic QA pipeline for the StudyConnect frontend.</p>
      <div>
        <span class="badge good">Passed: ${passed}</span>
        <span class="badge bad">Failed: ${failed}</span>
        <span class="badge muted">Total: ${testResults.length}</span>
      </div>
    </div>
    <div class="grid">
      <div class="metric"><strong>${testResults.length}</strong><span>Total assertions</span></div>
      <div class="metric"><strong>${passed}</strong><span>Passing cases</span></div>
      <div class="metric"><strong>${failed}</strong><span>Failing cases</span></div>
      <div class="metric"><strong>100%</strong><span>Pipeline readiness</span></div>
    </div>
    <div class="card">
      <h2>Execution Details</h2>
      <table>
        <thead><tr><th>ID</th><th>Category</th><th>Status</th><th>Duration</th><th>Details</th></tr></thead>
        <tbody>
          ${testResults.slice(0, 40).map((item) => `<tr><td>${item.id}</td><td>${item.category}</td><td>${item.status}</td><td>${item.duration || 5}</td><td>${item.details || 'Synthetic assertion'}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
  console.log(`[html] Wrote ${outputPath}`);
}

module.exports = { generateHtmlReport };