import http from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

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
        try {
          const json = JSON.parse(data);
          if (json.access_token) resolve(json.access_token);
          else reject(new Error(`No access_token: ${data}`));
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.write(body.toString());
    req.end();
  });
}

function generateJmx(endpoint, targetHost, targetPort) {
  const isPost = endpoint.method === "POST";
  const bodyXml = isPost
    ? `
          <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
            <collectionProp name="Arguments.arguments">
              <elementProp name="" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">${endpoint.body}</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>`
    : "";

  const contentTypeHeader = isPost
    ? `
              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">Content-Type</stringProp>
                <stringProp name="Header.value">application/json</stringProp>
              </elementProp>`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="${endpoint.name}" enabled="true">
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" enabled="true">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="${endpoint.name}" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">-1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">\${__P(concurrency,10)}</stringProp>
        <stringProp name="ThreadGroup.ramp_time">\${__P(rampup,2)}</stringProp>
        <boolProp name="ThreadGroup.scheduler">true</boolProp>
        <stringProp name="ThreadGroup.duration">\${__P(duration,10)}</stringProp>
        <stringProp name="ThreadGroup.delay">0</stringProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="${endpoint.name}" enabled="true">
          <stringProp name="HTTPSampler.domain">\${__P(target,${targetHost})}</stringProp>
          <stringProp name="HTTPSampler.port">\${__P(port,${targetPort})}</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.path">${endpoint.path}</stringProp>
          <stringProp name="HTTPSampler.method">${endpoint.method}</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.implementation">HttpClient4</stringProp>${bodyXml}
        </HTTPSamplerProxy>
        <hashTree>
          <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP Header Manager" enabled="true">
            <collectionProp name="HeaderManager.headers">
              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">Authorization</stringProp>
                <stringProp name="Header.value">Bearer \${__P(ACCESS_TOKEN,)}</stringProp>
              </elementProp>${contentTypeHeader}
            </collectionProp>
          </HeaderManager>
          <hashTree/>
        </hashTree>
        <ResultCollector guiclass="StatVisualizer" testclass="ResultCollector" testname="Summary Report" enabled="true">
          <boolProp name="ResultCollector.error_logging">false</boolProp>
          <objProp>
            <name>saveConfig</name>
            <value class="SampleSaveConfiguration">
              <time>true</time><latency>true</latency><timestamp>true</timestamp>
              <success>true</success><label>true</label><code>true</code>
              <message>true</message><threadName>true</threadName>
              <fieldNames>true</fieldNames><bytes>true</bytes><sentBytes>true</sentBytes>
              <url>true</url><threadCounts>true</threadCounts><connectTime>true</connectTime>
            </value>
          </objProp>
          <stringProp name="filename">\${__P(jtl-dir,results)}/${endpoint.jtl}</stringProp>
        </ResultCollector>
        <hashTree/>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>`;
}

function parseJtlLine(line) {
  if (!line.trim() || line.startsWith("timeStamp")) return null;
  const parts = line.split(",");
  if (parts.length < 13) return null;
  return {
    timeStamp: parseInt(parts[0]),
    elapsed: parseInt(parts[1]),
    label: parts[2],
    responseCode: parts[3],
    responseMessage: parts[4],
    threadName: parts[5],
    success: parts[6] === "true",
    bytes: parseInt(parts[7]),
    sentBytes: parseInt(parts[8]),
    Latency: parseInt(parts[12]),
    Connect: parts.length > 13 ? parseInt(parts[13]) : 0,
  };
}

function computeStats(samples) {
  if (samples.length === 0) return null;
  const latencies = samples.map((s) => s.elapsed).sort((a, b) => a - b);
  const successes = samples.filter((s) => s.success);
  const errors = samples.filter((s) => !s.success);
  const totalBytes = samples.reduce((sum, s) => sum + s.bytes, 0);
  const firstTs = samples[0].timeStamp;
  const lastTs = samples[samples.length - 1].timeStamp;
  const durationMs = lastTs - firstTs || 1;
  const durationSec = durationMs / 1000;
  const percentile = (arr, p) => arr[Math.ceil((p / 100) * arr.length) - 1];
  const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const statusCodes = {};
  for (const s of samples) {
    const code = s.responseCode || "N/A";
    statusCodes[code] = (statusCodes[code] || 0) + 1;
  }
  return {
    totalRequests: samples.length, successful: successes.length, errors: errors.length,
    rps: (samples.length / durationSec).toFixed(2), avgLatency: avg.toFixed(2),
    minLatency: latencies[0], p50: percentile(latencies, 50), p90: percentile(latencies, 90),
    p95: percentile(latencies, 95), p99: percentile(latencies, 99),
    maxLatency: latencies[latencies.length - 1],
    throughput: (totalBytes / 1024 / 1024 / durationSec).toFixed(2),
    totalBytes, durationSec: durationSec.toFixed(2), statusCodes,
  };
}

function toMarkdown(name, method, url, stats) {
  return `# Benchmark Results: ${name}

**Date:** ${new Date().toISOString()}
**Target:** \`${method} ${url}\`
**Concurrency:** 10
**Duration:** ${stats.durationSec}s
**Tool:** Apache JMeter 5.6.3

## Summary

| Metric | Value |
|---|---|
| Total Requests | ${stats.totalRequests} |
| Successful | ${stats.successful} |
| Errors | ${stats.errors} |
| Requests/sec | **${stats.rps}** |
| Throughput | ${stats.throughput} MB/s |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | ${stats.minLatency} |
| Average | ${stats.avgLatency} |
| P50 | ${stats.p50} |
| P90 | ${stats.p90} |
| P95 | ${stats.p95} |
| P99 | ${stats.p99} |
| Max | ${stats.maxLatency} |

## Status Codes

| Code | Count |
|---|---|
${Object.entries(stats.statusCodes).map(([code, count]) => `| ${code} | ${count} |`).join("\n")}
`;
}

function toHtml(name, method, url, stats) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Benchmark: ${name}</title>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:900px;margin:40px auto;padding:0 20px;color:#333;background:#f8f9fa}
    h1{color:#1a1a2e;border-bottom:3px solid #16213e;padding-bottom:10px}
    .meta{color:#666;font-size:.9em;margin-bottom:20px}
    table{width:100%;border-collapse:collapse;margin:20px 0;background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,.1)}
    th{background:#16213e;color:white;padding:12px 15px;text-align:left;font-weight:600}
    td{padding:10px 15px;border-bottom:1px solid #eee}
    tr:hover td{background:#f0f4ff}
    .hl{font-weight:bold;color:#0f3460;font-size:1.1em}
    .err{color:#e74c3c}.ok{color:#27ae60}
    h2{color:#16213e;margin-top:30px}
    code{background:#e8eaf6;padding:2px 6px;border-radius:4px;font-size:.9em}
  </style>
</head>
<body>
  <h1>Benchmark: ${name}</h1>
  <div class="meta"><strong>Date:</strong> ${new Date().toISOString()} | <strong>Target:</strong> <code>${method} ${url}</code> | <strong>Tool:</strong> JMeter 5.6.3</div>
  <h2>Summary</h2>
  <table><tr><th>Metric</th><th>Value</th></tr>
    <tr><td>Total Requests</td><td>${stats.totalRequests}</td></tr>
    <tr><td>Successful</td><td class="ok">${stats.successful}</td></tr>
    <tr><td>Errors</td><td class="${stats.errors > 0 ? "err" : ""}">${stats.errors}</td></tr>
    <tr><td>Requests/sec</td><td class="hl">${stats.rps}</td></tr>
    <tr><td>Throughput</td><td>${stats.throughput} MB/s</td></tr>
  </table>
  <h2>Latency (ms)</h2>
  <table><tr><th>Percentile</th><th>Value</th></tr>
    <tr><td>Min</td><td>${stats.minLatency}</td></tr>
    <tr><td>Average</td><td>${stats.avgLatency}</td></tr>
    <tr><td>P50</td><td>${stats.p50}</td></tr>
    <tr><td>P90</td><td>${stats.p90}</td></tr>
    <tr><td>P95</td><td>${stats.p95}</td></tr>
    <tr><td>P99</td><td>${stats.p99}</td></tr>
    <tr><td>Max</td><td>${stats.maxLatency}</td></tr>
  </table>
  <h2>Status Codes</h2>
  <table><tr><th>Code</th><th>Count</th></tr>
    ${Object.entries(stats.statusCodes).map(([c, n]) => `<tr><td>${c}</td><td>${n}</td></tr>`).join("\n    ")}
  </table>
</body></html>`;
}

function toSummaryHtml(results) {
  const rows = results.map(r => `<tr><td>${r.name}</td><td><code>${r.method}</code></td><td><code>${r.path}</code></td><td class="hl">${r.stats.rps}</td><td>${r.stats.avgLatency}</td><td>${r.stats.p50}</td><td>${r.stats.p95}</td><td>${r.stats.p99}</td><td>${r.stats.maxLatency}</td><td>${r.stats.errors > 0 ? '<span class="err">'+r.stats.errors+"</span>" : '<span class="ok">0</span>'}</td></tr>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Microservices Benchmark Summary - JMeter</title>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:1100px;margin:40px auto;padding:0 20px;color:#333;background:#f8f9fa}
    h1{color:#1a1a2e;border-bottom:3px solid #16213e;padding-bottom:10px}
    h2{color:#16213e;margin-top:30px}
    table{width:100%;border-collapse:collapse;margin:20px 0;background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,.1)}
    th{background:#16213e;color:white;padding:12px 15px;text-align:left;font-weight:600}
    td{padding:10px 15px;border-bottom:1px solid #eee}
    tr:hover td{background:#f0f4ff}
    .hl{font-weight:bold;color:#0f3460}
    .err{color:#e74c3c;font-weight:bold}.ok{color:#27ae60}
    code{background:#e8eaf6;padding:2px 6px;border-radius:4px;font-size:.9em}
    .footer{margin-top:30px;padding-top:15px;border-top:1px solid #ddd;color:#999;font-size:.85em}
  </style>
</head>
<body>
  <h1>Microservices Benchmark Summary</h1>
  <div class="meta"><strong>Tool:</strong> Apache JMeter 5.6.3 | <strong>Concurrency:</strong> 10 | <strong>Duration:</strong> 10s per endpoint</div>
  <h2>Results</h2>
  <table><tr><th>Endpoint</th><th>Method</th><th>Path</th><th>RPS</th><th>Avg (ms)</th><th>P50</th><th>P95</th><th>P99</th><th>Max</th><th>Errors</th></tr>${rows}</table>
  <div class="footer">Generated by JMeter Benchmark Suite | Spring Boot Microservices Platform</div>
</body></html>`;
}

async function main() {
  const env = loadEnv();
  const concurrency = env.CONCURRENCY || "10";
  const duration = env.DURATION_SEC || "10";
  const rampUp = env.RAMP_UP_SEC || "2";

  console.log("  Fetching OAuth2 token...");
  const token = await fetchToken(env);
  console.log("  Token fetched successfully\n");

  const resultsDir = join(__dirname, "results");
  if (!existsSync(resultsDir)) mkdirSync(resultsDir, { recursive: true });

  const logsDir = join(__dirname, "logs");
  if (!existsSync(logsDir)) mkdirSync(logsDir, { recursive: true });

  const htmlDir = join(__dirname, "html");
  if (!existsSync(htmlDir)) mkdirSync(htmlDir, { recursive: true });

  const mdDir = join(__dirname, "md");
  if (!existsSync(mdDir)) mkdirSync(mdDir, { recursive: true });

  const jmeterHome = process.env.JMETER_HOME || "C:\\Users\\LENOVO~1\\AppData\\Local\\Temp\\opencode\\jmeter\\apache-jmeter-5.6.3";
  const jmeterBin = join(jmeterHome, "bin", "jmeter.bat");
  const plansDir = join(__dirname, "plans");
  if (!existsSync(plansDir)) mkdirSync(plansDir, { recursive: true });

  const endpoints = [
    { name: "Product Service - GET All Products", method: "GET", path: "/api/product", jtl: "get-all-products.jtl", body: null },
    { name: "Product Service - POST Create Product", method: "POST", path: "/api/product", jtl: "post-create-product.jtl",
      body: '{"name":"Benchmark Product","description":"Auto-generated for benchmark","price":9.99}' },
    { name: "Order Service - POST Create Order", method: "POST", path: "/api/order", jtl: "post-create-order.jtl",
      body: '{"orderLineItemsDtoList":[{"skuCode":"iPhone_15","price":800.0,"quantity":1}]}' },
    { name: "Inventory Service - GET Inventory", method: "GET", path: "/api/inventory?skuCode=iPhone_15", jtl: "get-inventory.jtl", body: null },
  ];

  const allResults = [];

  for (const ep of endpoints) {
    console.log(`${"=".repeat(60)}`);
    console.log(`  Benchmarking: ${ep.name}`);
    console.log(`  ${ep.method} http://${env.TARGET_HOST}:${env.TARGET_PORT}${ep.path}`);
    console.log(`  Concurrency: ${concurrency} | Duration: ${duration}s`);
    console.log(`${"=".repeat(60)}`);

    // Generate individual test plan
    const jmxContent = generateJmx(ep, env.TARGET_HOST, env.TARGET_PORT);
    const jmxPath = join(plansDir, `${ep.jtl.replace(".jtl", ".jmx")}`);
    writeFileSync(jmxPath, jmxContent, "utf-8");

    // Clean previous JTL
    const jtlPath = join(resultsDir, ep.jtl);
    try { if (existsSync(jtlPath)) unlinkSync(jtlPath); } catch {}

    // Run JMeter
    const logFile = join(logsDir, `jmeter_${ep.jtl.replace(".jtl", "")}.log`);
    const jmeterCmd = `"${jmeterBin}" -n -t "${jmxPath}" -Jconcurrency=${concurrency} -Jduration=${duration} -Jrampup=${rampUp} -Jtarget=${env.TARGET_HOST} -Jport=${env.TARGET_PORT} -JACCESS_TOKEN=${token} -Jjtl-dir="${resultsDir}" -j "${logFile}"`;
    try {
      execSync(jmeterCmd, { cwd: __dirname, stdio: "pipe", timeout: (parseInt(duration) + parseInt(rampUp) + 30) * 1000 });
    } catch (err) {
      console.log(`  JMeter finished (exit: ${err.status})`);
    }

    // Parse JTL
    if (existsSync(jtlPath)) {
      const samples = readFileSync(jtlPath, "utf-8").split("\n").map(parseJtlLine).filter(Boolean);
      const stats = computeStats(samples);
      if (stats) {
        console.log(`\n  Results:`);
        console.log(`  ─────────────────────────────────────────`);
        console.log(`  Total Requests:     ${stats.totalRequests}`);
        console.log(`  Successful:         ${stats.successful}`);
        console.log(`  Errors:             ${stats.errors}`);
        console.log(`  Requests/sec:       ${stats.rps}`);
        console.log(`  Avg Latency:        ${stats.avgLatency} ms`);
        console.log(`  P50:                ${stats.p50} ms`);
        console.log(`  P95:                ${stats.p95} ms`);
        console.log(`  P99:                ${stats.p99} ms`);
        console.log(`  Max:                ${stats.maxLatency} ms`);
        console.log(`  Status Codes:       ${JSON.stringify(stats.statusCodes)}`);
        console.log(`  ─────────────────────────────────────────\n`);

        const fullUrl = `http://${env.TARGET_HOST}:${env.TARGET_PORT}${ep.path}`;
        const slug = ep.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
        writeFileSync(join(mdDir, `${slug}.md`), toMarkdown(ep.name, ep.method, fullUrl, stats), "utf-8");
        writeFileSync(join(htmlDir, `${slug}.html`), toHtml(ep.name, ep.method, fullUrl, stats), "utf-8");
        allResults.push({ name: ep.name, method: ep.method, path: fullUrl, stats });
      }
    } else {
      console.log(`  No JTL file found\n`);
    }
  }

  writeFileSync(join(mdDir, "summary.md"), allResults.map(r => toMarkdown(r.name, r.method, r.path, r.stats)).join("\n---\n\n"), "utf-8");
  writeFileSync(join(htmlDir, "summary.html"), toSummaryHtml(allResults), "utf-8");

  console.log(`  All benchmarks complete!`);
  console.log(`  Results written to: ${__dirname}`);
}

main().catch((err) => { console.error("Benchmark failed:", err); process.exit(1); });
