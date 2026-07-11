import http from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import autocannon from "autocannon";

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
    env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
  return env;
}

async function fetchToken(env) {
  const url = `${env.KEYCLOAK_URL}/realms/${env.REALM}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: env.CLIENT_ID,
    client_secret: env.CLIENT_SECRET,
  });

  return new Promise((resolve, reject) => {
    const req = http.request(url, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const json = JSON.parse(data);
        if (json.access_token) resolve(json.access_token);
        else reject(new Error(`No access_token: ${data}`));
      });
    });
    req.on("error", reject);
    req.write(body.toString());
    req.end();
  });
}

function toMarkdown(name, method, url, result) {
  const latency = result.latency;
  const requests = result.requests;
  return `# Benchmark Results: ${name}

**Date:** ${new Date().toISOString()}
**Target:** \`${method} ${url}\`
**Connections:** ${result.connections}
**Duration:** ${result.duration.toFixed(1)}s
**Tool:** autocannon v8.0.0

## Summary

| Metric | Value |
|---|---|
| Total Requests | ${requests.total} |
| Requests/sec | **${requests.average.toFixed(2)}** |
| Throughput | ${(result.throughput.average / 1024 / 1024).toFixed(2)} MB/s |
| Errors | ${result.errors} |
| Timeouts | ${result.timeouts} |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | ${latency.min} |
| Average | ${latency.average.toFixed(2)} |
| P50 | ${latency.p50} |
| P90 | ${latency.p90} |
| P99 | ${latency.p99} |
| Max | ${latency.max} |

## Status Codes

| Code | Count |
|---|---|
${Object.entries(result.statusCodeStats || {}).map(([code, stats]) => `| ${code} | ${stats.count} |`).join("\n") || "| - | 0 |"}
`;
}

async function main() {
  const env = loadEnv();
  const token = await fetchToken(env);
  const baseUrl = `http://${env.TARGET_HOST}:${env.TARGET_PORT}`;
  const connections = parseInt(env.CONCURRENCY || "10", 10);
  const duration = parseInt(env.DURATION_SEC || "10", 10);

  const benchmarks = [
    {
      name: "Product Service - GET All Products",
      method: "GET",
      path: "/api/product",
      body: null,
      contentType: null,
    },
    {
      name: "Product Service - POST Create Product",
      method: "POST",
      path: "/api/product",
      body: JSON.stringify({ name: "Benchmark Product", description: "Auto-generated", price: 9.99 }),
      contentType: "application/json",
    },
    {
      name: "Order Service - POST Create Order",
      method: "POST",
      path: "/api/order",
      body: JSON.stringify({ orderLineItemsDtoList: [{ skuCode: "iPhone_15", price: 800.0, quantity: 1 }] }),
      contentType: "application/json",
    },
  ];

  const allResults = [];

  for (const bm of benchmarks) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`  Benchmarking: ${bm.name}`);
    console.log(`  ${bm.method} ${baseUrl}${bm.path}`);
    console.log(`  Connections: ${connections} | Duration: ${duration}s`);
    console.log(`${"=".repeat(60)}`);

    const opts = {
      url: `${baseUrl}${bm.path}`,
      connections,
      duration,
      method: bm.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (bm.body) {
      opts.body = bm.body;
      opts.headers["Content-Type"] = bm.contentType;
    }

    const result = await new Promise((resolve, reject) => {
      const instance = autocannon(opts, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
      autocannon.track(instance, { renderProgressBar: false });
    });

    console.log(`\n  Results:`);
    console.log(`  ─────────────────────────────────────────`);
    console.log(`  Total Requests:     ${result.requests.total}`);
    console.log(`  Requests/sec:       ${result.requests.average.toFixed(2)}`);
    console.log(`  Avg Latency:        ${result.latency.average.toFixed(2)} ms`);
    console.log(`  P50 Latency:        ${result.latency.p50} ms`);
    console.log(`  P99 Latency:        ${result.latency.p99} ms`);
    console.log(`  Max Latency:        ${result.latency.max} ms`);
    console.log(`  Errors:             ${result.errors}`);
    console.log(`  Status Codes:       ${JSON.stringify(result.statusCodeStats)}`);
    console.log(`  ─────────────────────────────────────────\n`);

    allResults.push({ name: bm.name, method: bm.method, url: `${baseUrl}${bm.path}`, result });

    // Write JSON
    const slug = bm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    writeFileSync(join(__dirname, `${slug}.json`), JSON.stringify(result, null, 2), "utf-8");

    // Write Markdown
    writeFileSync(join(__dirname, `${slug}.md`), toMarkdown(bm.name, bm.method, `${baseUrl}${bm.path}`, result), "utf-8");
  }

  // Write combined summary
  const summaryMd = allResults.map((r) => toMarkdown(r.name, r.method, r.url, r.result)).join("\n---\n\n");
  writeFileSync(join(__dirname, "summary.md"), summaryMd, "utf-8");

  console.log(`  All benchmarks complete!`);
  console.log(`  Results written to: ${__dirname}`);
}

main().catch((err) => {
  console.error("Benchmark failed:", err);
  process.exit(1);
});
