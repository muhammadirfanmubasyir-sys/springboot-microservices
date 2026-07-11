import http from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadEnv() {
  const envPath = join(__dirname, ".env");
  const env = {};
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    env[key] = value;
  }
  return env;
}

const env = loadEnv();

const KEYCLOAK_URL = env.KEYCLOAK_URL || "http://keycloak:8080";
const REALM = env.REALM || "spring-boot-micro-services-realm";
const CLIENT_ID = env.CLIENT_ID || "spring-cloud-client";
const CLIENT_SECRET = env.CLIENT_SECRET || "";
const TARGET_HOST = env.TARGET_HOST || "api-gateway";
const TARGET_PORT = parseInt(env.TARGET_PORT || "8888", 10);
const CONCURRENCY = parseInt(env.CONCURRENCY || "10", 10);
const DURATION_SEC = parseInt(env.DURATION_SEC || "10", 10);

async function fetchToken() {
  const url = `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  return new Promise((resolve, reject) => {
    const req = http.request(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (json.access_token) {
              resolve(json.access_token);
            } else {
              reject(new Error(`Token response missing access_token: ${data}`));
            }
          } catch (e) {
            reject(new Error(`Failed to parse token response: ${data}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body.toString());
    req.end();
  });
}

function percentile(sorted, p) {
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

function formatMs(us) {
  return (us / 1000).toFixed(2);
}

function makeRequest(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const start = process.hrtime.bigint();
    const options = {
      hostname: TARGET_HOST,
      port: TARGET_PORT,
      path,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const elapsed = Number(process.hrtime.bigint() - start) / 1000;
        resolve({ statusCode: res.statusCode, latencyUs: elapsed, body: data });
      });
    });

    req.on("error", (err) => {
      const elapsed = Number(process.hrtime.bigint() - start) / 1000;
      reject({ error: err.message, latencyUs: elapsed });
    });

    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function benchmark(name, method, path, body) {
  const token = await fetchToken();
  console.log(`  Token refreshed for: ${name}`);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`  Benchmarking: ${name}`);
  console.log(`  ${method} http://${TARGET_HOST}:${TARGET_PORT}${path}`);
  console.log(`  Concurrency: ${CONCURRENCY} | Duration: ${DURATION_SEC}s`);
  console.log(`${"=".repeat(60)}`);

  const latencies = [];
  let totalRequests = 0;
  let successCount = 0;
  let errorCount = 0;
  let statusCodes = {};
  const startTime = Date.now();
  const endTime = startTime + DURATION_SEC * 1000;
  let running = true;

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(
      (async () => {
        while (running) {
          try {
            const res = await makeRequest(method, path, body, token);
            latencies.push(res.latencyUs);
            totalRequests++;
            statusCodes[res.statusCode] = (statusCodes[res.statusCode] || 0) + 1;
            if (res.statusCode >= 200 && res.statusCode < 300) {
              successCount++;
            } else {
              errorCount++;
            }
          } catch (err) {
            latencies.push(err.latencyUs || 0);
            totalRequests++;
            errorCount++;
          }
        }
      })()
    );
  }

  await new Promise((r) => setTimeout(r, DURATION_SEC * 1000 + 500));
  running = false;
  await Promise.all(workers);

  const elapsedSec = (Date.now() - startTime) / 1000;
  latencies.sort((a, b) => a - b);

  const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0;
  const minLatency = latencies.length > 0 ? latencies[0] : 0;
  const maxLatency = latencies.length > 0 ? latencies[latencies.length - 1] : 0;
  const p50 = latencies.length > 0 ? percentile(latencies, 50) : 0;
  const p95 = latencies.length > 0 ? percentile(latencies, 95) : 0;
  const p99 = latencies.length > 0 ? percentile(latencies, 99) : 0;
  const rps = totalRequests / elapsedSec;

  const results = {
    name,
    method,
    path: `http://${TARGET_HOST}:${TARGET_PORT}${path}`,
    concurrency: CONCURRENCY,
    durationSec: DURATION_SEC,
    totalRequests,
    successCount,
    errorCount,
    requestsPerSec: rps.toFixed(2),
    avgLatencyMs: formatMs(avgLatency),
    minLatencyMs: formatMs(minLatency),
    maxLatencyMs: formatMs(maxLatency),
    p50LatencyMs: formatMs(p50),
    p95LatencyMs: formatMs(p95),
    p99LatencyMs: formatMs(p99),
    statusCodes,
    actualDurationSec: elapsedSec.toFixed(2),
  };

  console.log(`\n  Results:`);
  console.log(`  ─────────────────────────────────────────`);
  console.log(`  Total Requests:     ${results.totalRequests}`);
  console.log(`  Successful:         ${results.successCount}`);
  console.log(`  Errors:             ${results.errorCount}`);
  console.log(`  Requests/sec:       ${results.requestsPerSec}`);
  console.log(`  Avg Latency:        ${results.avgLatencyMs} ms`);
  console.log(`  Min Latency:        ${results.minLatencyMs} ms`);
  console.log(`  Max Latency:        ${results.maxLatencyMs} ms`);
  console.log(`  P50 Latency:        ${results.p50LatencyMs} ms`);
  console.log(`  P95 Latency:        ${results.p95LatencyMs} ms`);
  console.log(`  P99 Latency:        ${results.p99LatencyMs} ms`);
  console.log(`  Status Codes:       ${JSON.stringify(results.statusCodes)}`);
  console.log(`  Actual Duration:    ${results.actualDurationSec}s`);
  console.log(`  ─────────────────────────────────────────\n`);

  return results;
}

function toMarkdown(results) {
  return `# Benchmark Results: ${results.name}

**Date:** ${new Date().toISOString()}
**Target:** \`${results.method} ${results.path}\`
**Concurrency:** ${results.concurrency}
**Duration:** ${results.durationSec}s (actual: ${results.actualDurationSec}s)

## Summary

| Metric | Value |
|---|---|
| Total Requests | ${results.totalRequests} |
| Successful | ${results.successCount} |
| Errors | ${results.errorCount} |
| Requests/sec | **${results.requestsPerSec}** |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | ${results.minLatencyMs} |
| Avg | ${results.avgLatencyMs} |
| P50 | ${results.p50LatencyMs} |
| P95 | ${results.p95LatencyMs} |
| P99 | ${results.p99LatencyMs} |
| Max | ${results.maxLatencyMs} |

## Status Codes

| Code | Count |
|---|---|
${Object.entries(results.statusCodes)
  .map(([code, count]) => `| ${code} | ${count} |`)
  .join("\n")}
`;
}

async function main() {
  const allResults = [];

  // Test 1: GET /api/product
  allResults.push(
    await benchmark(
      "Product Service - GET All Products",
      "GET",
      "/api/product"
    )
  );

  // Test 2: POST /api/product
  allResults.push(
    await benchmark(
      "Product Service - POST Create Product",
      "POST",
      "/api/product",
      {
        name: "Benchmark Product",
        description: "Auto-generated for benchmark",
        price: 9.99,
      }
    )
  );

  // Test 3: POST /api/order
  allResults.push(
    await benchmark(
      "Order Service - POST Create Order",
      "POST",
      "/api/order",
      {
        orderLineItemsDtoList: [
          {
            skuCode: "iPhone_15",
            price: 800.0,
            quantity: 1,
          },
        ],
      }
    )
  );

  // Write individual markdown files
  const fs = await import("node:fs/promises");

  for (const result of allResults) {
    const slug = result.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+$/, "");
    const filePath = join(__dirname, `${slug}.md`);
    await fs.writeFile(filePath, toMarkdown(result), "utf-8");
    console.log(`  Written: ${filePath}`);
  }

  // Write combined summary
  const summaryMd = allResults
    .map((r) => toMarkdown(r))
    .join("\n---\n\n");
  const summaryPath = join(__dirname, "summary.md");
  await fs.writeFile(summaryPath, summaryMd, "utf-8");
  console.log(`  Written: ${summaryPath}`);

  console.log(`\n  All benchmarks complete!`);
}

main().catch((err) => {
  console.error("Benchmark failed:", err);
  process.exit(1);
});
