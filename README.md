# StudyConnect Automation and Deployment

## Overview

This repository contains GitHub Actions workflows for:
- Selenium E2E testing
- Load testing
- Security review
- Deploy-and-test automation

The current deployment target is Render, not GitHub Pages, unless a fallback is configured.

## Render deployment URL

To test your live Render deployment, add a repository secret in GitHub named `RENDER_URL`.

Example secret value:
```
https://your-app-name.onrender.com
```

If `RENDER_URL` is defined, `deploy-and-test.yml` will validate that URL and run Selenium automation against it.
If it is not defined, the workflow will fall back to GitHub Pages deployment and test the generated Pages URL.

## Workflows

### Load Test
File: `.github/workflows/load-test.yml`
- Starts the app locally
- Runs the load test with a reduced VU count
- Uses `TARGET_URL`, `VUS`, `DURATION_SECONDS`, and `MAX_FAILURE_RATE`

### Selenium E2E Tests
File: `.github/workflows/selenium.yml`
- Installs Chrome
- Runs `npm run test:selenium`
- Uploads `tests/selenium/selenium-report.xlsx`

### Security Review
File: `.github/workflows/security-review.yml`
- Installs dependencies
- Runs the backend security script
- Fails on any critical findings

### Deploy and Test
File: `.github/workflows/deploy-and-test.yml`
- Uses `RENDER_URL` when available
- Falls back to GitHub Pages only when no Render URL is configured
- Runs live Selenium automation against the target URL
- Uploads automation artifacts

## How to run locally

Install dependencies:
```bash
npm ci
```

Run Selenium automation locally:
```bash
npm run test:automation
```

Run load tests locally:
```bash
npm run test:load
```

## How to trigger workflows on GitHub

1. Push to `main`
2. Or run manually from the GitHub Actions tab
3. For `deploy-and-test`, set the `base_url` input manually if needed, or configure `RENDER_URL`

## Artifact locations

- `automation/reports/Automation_Test_Report.xlsx`
- `automation/reports/execution-report.html`
- `automation/reports/summary.md`
- `automation/reports/execution-results.json`
- `automation/screenshots/`
- `automation/logs/`

## Notes

If your live app is on Render, then `Render URL` is the correct test target.
If GitHub Pages is used instead, the workflow will deploy `./public` to `gh-pages`.
