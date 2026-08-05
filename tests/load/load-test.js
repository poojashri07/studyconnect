const http = require('http');

const targetUrl = process.env.TARGET_URL || 'http://127.0.0.1:5000/';
const virtualUsers = Number(process.env.VUS || 100);
const durationSeconds = Number(process.env.DURATION_SECONDS || 60);
const maxFailureRate = Number(process.env.MAX_FAILURE_RATE || 0.05);
const endpointPath = new URL(targetUrl).pathname || '/';

const stats = {
  totalRequests: 0,
  successes: 0,
  failures: 0,
  totalLatencyMs: 0,
  minLatencyMs: Infinity,
  maxLatencyMs: 0,
  statusCodes: {}
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeRequest() {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const request = http.get(targetUrl, (res) => {
      res.resume();
      const latencyMs = Date.now() - startedAt;
      stats.totalRequests += 1;
      stats.successes += 1;
      stats.totalLatencyMs += latencyMs;
      stats.minLatencyMs = Math.min(stats.minLatencyMs, latencyMs);
      stats.maxLatencyMs = Math.max(stats.maxLatencyMs, latencyMs);
      stats.statusCodes[res.statusCode] = (stats.statusCodes[res.statusCode] || 0) + 1;
      resolve({ statusCode: res.statusCode, latencyMs });
    });

    request.on('error', (err) => {
      const latencyMs = Date.now() - startedAt;
      stats.totalRequests += 1;
      stats.failures += 1;
      stats.totalLatencyMs += latencyMs;
      stats.minLatencyMs = Math.min(stats.minLatencyMs, latencyMs);
      stats.maxLatencyMs = Math.max(stats.maxLatencyMs, latencyMs);
      reject(err);
    });
  });
}

async function workerLoop(workerId) {
  const endTime = Date.now() + durationSeconds * 1000;
  while (Date.now() < endTime) {
    try {
      await makeRequest();
    } catch (err) {
      // continue with next request
    }

    if (Date.now() < endTime) {
      await delay(10);
    }
  }
}

async function run() {
  console.log(`Starting load test against ${targetUrl}`);
  console.log(`Virtual users: ${virtualUsers}`);
  console.log(`Duration: ${durationSeconds}s`);
  console.log(`Endpoint: ${endpointPath}`);

  const workers = Array.from({ length: virtualUsers }, (_, index) => workerLoop(index));
  await Promise.all(workers);

  const durationMs = durationSeconds * 1000;
  const requestsPerSecond = stats.totalRequests / durationSeconds;
  const averageLatencyMs = stats.totalRequests > 0 ? stats.totalLatencyMs / stats.totalRequests : 0;
  const failureRate = stats.totalRequests > 0 ? stats.failures / stats.totalRequests : 1;

  console.log('\nLoad test summary');
  console.log('------------------');
  console.log(`Requests: ${stats.totalRequests}`);
  console.log(`Successes: ${stats.successes}`);
  console.log(`Failures: ${stats.failures}`);
  console.log(`Failure rate: ${(failureRate * 100).toFixed(2)}%`);
  console.log(`Max allowed failure rate: ${(maxFailureRate * 100).toFixed(2)}%`);
  console.log(`Requests/sec: ${requestsPerSecond.toFixed(2)}`);
  console.log(`Average response time: ${averageLatencyMs.toFixed(2)}ms`);
  console.log(`Min response time: ${stats.minLatencyMs === Infinity ? 0 : stats.minLatencyMs.toFixed(2)}ms`);
  console.log(`Max response time: ${stats.maxLatencyMs.toFixed(2)}ms`);
  console.log('Status codes:', JSON.stringify(stats.statusCodes, null, 2));

  if (stats.totalRequests === 0 || failureRate > maxFailureRate) {
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error('Load test failed:', err);
  process.exit(1);
});
