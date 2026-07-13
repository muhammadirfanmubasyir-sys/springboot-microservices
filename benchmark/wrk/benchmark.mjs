import http from "node:http";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { execSync } from "node:child_process";
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
const CONNECTIONS = parseInt(env.CONNECTIONS || "10", 10);
const THREADS = parseInt(env.THREADS || "2", 10);
const DURATION_SEC = parseInt(env.DURATION_SEC || "10", 10);
const WSL_DISTRO = env.WSL_DISTRO || "Ubuntu-24.04";

function toWslPath(winPath) {
  const normalized = winPath.replace(/\\/g, "/");
  const match = normalized.match(/^([A-Za-z]):\/(.*)/);
  if (match) {
    return `/mnt/${match[1].toLowerCase()}/${match[2]}`;
  }
  return normalized;
}

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

function parseWrkOutput(output) {
  const result = {};

  const rpsMatch = output.match(/Requests\/sec:\s+([\d.]+)/);
  if (rpsMatch) result.requestsPerSec = parseFloat(rpsMatch[1]);

  const transferMatch = output.match(/Transfer\/sec:\s+([\d.]+)\s+KB/);
  if (transferMatch) result.transferPerSecKB = parseFloat(transferMatch[1]);

  const totalRequestsMatch = output.match(/Total Requests:\s+(\d+)/);
  if (totalRequestsMatch) result.totalRequests = parseInt(totalRequestsMatch[1], 10);

  const totalErrorsMatch = output.match(/Total Errors:\s+(\d+)/);
  if (totalErrorsMatch) result.totalErrors = parseInt(totalErrorsMatch[1], 10);

  const connectErrorsMatch = output.match(/connect:\s+(\d+)/);
  if (connectErrorsMatch) result.connectErrors = parseInt(connectErrorsMatch[1], 10);

  const readErrorsMatch = output.match(/read:\s+(\d+)/);
  if (readErrorsMatch) result.readErrors = parseInt(readErrorsMatch[1], 10);

  const writeErrorsMatch = output.match(/write:\s+(\d+)/);
  if (writeErrorsMatch) result.writeErrors = parseInt(writeErrorsMatch[1], 10);

  const timeoutErrorsMatch = output.match(/timeout:\s+(\d+)/);
  if (timeoutErrorsMatch) result.timeoutErrors = parseInt(timeoutErrorsMatch[1], 10);

  const p50Match = output.match(/P50\s+([\d.]+)/);
  if (p50Match) result.p50Ms = parseFloat(p50Match[1]);

  const p75Match = output.match(/P75\s+([\d.]+)/);
  if (p75Match) result.p75Ms = parseFloat(p75Match[1]);

  const p90Match = output.match(/P90\s+([\d.]+)/);
  if (p90Match) result.p90Ms = parseFloat(p90Match[1]);

  const p95Match = output.match(/P95\s+([\d.]+)/);
  if (p95Match) result.p95Ms = parseFloat(p95Match[1]);

  const p99Match = output.match(/P99\s+([\d.]+)/);
  if (p99Match) result.p99Ms = parseFloat(p99Match[1]);

  const p999Match = output.match(/P99\.9\s+([\d.]+)/);
  if (p999Match) result.p999Ms = parseFloat(p999Match[1]);

  const minMatch = output.match(/Min\s+([\d.]+)/);
  if (minMatch) result.minMs = parseFloat(minMatch[1]);

  const avgMatch = output.match(/Avg\s+([\d.]+)/);
  if (avgMatch) result.avgMs = parseFloat(avgMatch[1]);

  const maxMatch = output.match(/Max\s+([\d.]+)/);
  if (maxMatch) result.maxMs = parseFloat(maxMatch[1]);

  return result;
}

function toMarkdown(name, method, path, config, wrkOutput, parsed, date) {
  return `# Benchmark Results: ${name}

**Date:** ${date}
**Tool:** wrk
**Target:** \`${method} http://${TARGET_HOST}:${TARGET_PORT}${path}\`
**Connections:** ${config.connections} | **Threads:** ${config.threads} | **Duration:** ${config.durationSec}s

## Summary

| Metric | Value |
|---|---|
| Total Requests | ${parsed.totalRequests ?? "N/A"} |
| Errors | ${parsed.totalErrors ?? 0} |
| Requests/sec | **${parsed.requestsPerSec?.toFixed(2) ?? "N/A"}** |
| Transfer/sec | ${parsed.transferPerSecKB?.toFixed(2) ?? "N/A"} KB |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | ${parsed.minMs?.toFixed(2) ?? "N/A"} |
| Avg | ${parsed.avgMs?.toFixed(2) ?? "N/A"} |
| P50 | ${parsed.p50Ms?.toFixed(2) ?? "N/A"} |
| P75 | ${parsed.p75Ms?.toFixed(2) ?? "N/A"} |
| P90 | ${parsed.p90Ms?.toFixed(2) ?? "N/A"} |
| P95 | ${parsed.p95Ms?.toFixed(2) ?? "N/A"} |
| P99 | ${parsed.p99Ms?.toFixed(2) ?? "N/A"} |
| P99.9 | ${parsed.p999Ms?.toFixed(2) ?? "N/A"} |
| Max | ${parsed.maxMs?.toFixed(2) ?? "N/A"} |

## Errors

| Type | Count |
|---|---|
| Connect | ${parsed.connectErrors ?? 0} |
| Read | ${parsed.readErrors ?? 0} |
| Write | ${parsed.writeErrors ?? 0} |
| Timeout | ${parsed.timeoutErrors ?? 0} |

## Raw Output

\`\`\`
${wrkOutput}
\`\`\`
`;
}

async function runBenchmark(name, method, path, body) {
  const date = new Date().toISOString();
  const token = await fetchToken();
  console.log(`  Token refreshed for: ${name}`);

  const luaScript = join(__dirname, "wrk-auth.lua");
  const luaScriptWsl = toWslPath(luaScript);
  const tokenFile = join(__dirname, `.wrk-token-${Date.now()}.txt`);
  const tokenFileWsl = toWslPath(tokenFile);

  writeFileSync(tokenFile, token, "utf-8");

  const targetUrl = `http://${TARGET_HOST}:${TARGET_PORT}${path}`;

  const wslPrefix = `wsl -d ${WSL_DISTRO} --`;

  let wrkCmd = `${wslPrefix} wrk -t${THREADS} -c${CONNECTIONS} -d${DURATION_SEC}s --latency`;
  wrkCmd += ` -s "${luaScriptWsl}"`;
  wrkCmd += ` "${targetUrl}"`;

  if (method === "POST" && body) {
    const bodyFile = join(__dirname, `.wrk-body-${Date.now()}.json`);
    const bodyFileWsl = toWslPath(bodyFile);
    writeFileSync(bodyFile, JSON.stringify(body), "utf-8");

    const postLua = join(__dirname, `.wrk-post-${Date.now()}.lua`);
    const postLuaWsl = toWslPath(postLua);
    const postScript = `
dofile("${luaScriptWsl}")
wrk.method = "POST"
wrk.body = io.open("${bodyFileWsl}", "r"):read("*a")
wrk.headers["Content-Type"] = "application/json"
`;
    writeFileSync(postLua, postScript, "utf-8");

    wrkCmd = `${wslPrefix} wrk -t${THREADS} -c${CONNECTIONS} -d${DURATION_SEC}s --latency`;
    wrkCmd += ` -s "${postLuaWsl}"`;
    wrkCmd += ` "${targetUrl}"`;
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`  Benchmarking: ${name}`);
  console.log(`  ${method} ${targetUrl}`);
  console.log(`  Connections: ${CONNECTIONS} | Threads: ${THREADS} | Duration: ${DURATION_SEC}s`);
  console.log(`${"=".repeat(60)}\n`);

  let wrkOutput = "";
  try {
    wrkOutput = execSync(wrkCmd, {
      encoding: "utf-8",
      timeout: (DURATION_SEC + 10) * 1000,
      env: { ...process.env },
    });
  } catch (err) {
    wrkOutput = err.stdout || err.message;
  }

  console.log(wrkOutput);

  const parsed = parseWrkOutput(wrkOutput);

  try { unlinkSync(tokenFile); } catch {}

  if (method === "POST" && body) {
    try {
      const files = (await import("node:fs")).readdirSync(__dirname);
      for (const f of files) {
        if ((f.startsWith(".wrk-body-") || f.startsWith(".wrk-post-")) &&
            (f.endsWith(".json") || f.endsWith(".lua"))) {
          try { unlinkSync(join(__dirname, f)); } catch {}
        }
      }
    } catch {}
  }

  return { name, method, path, config: { connections: CONNECTIONS, threads: THREADS, durationSec: DURATION_SEC }, wrkOutput, parsed, date };
}

async function main() {
  const fs = await import("node:fs/promises");
  const allResults = [];

  allResults.push(
    await runBenchmark(
      "Product Service - GET All Products",
      "GET",
      "/api/product"
    )
  );

  allResults.push(
    await runBenchmark(
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

  allResults.push(
    await runBenchmark(
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

  allResults.push(
    await runBenchmark(
      "Inventory Service - GET Inventory",
      "GET",
      "/api/inventory?skuCode=iPhone_15"
    )
  );

  for (const result of allResults) {
    const slug = result.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+$/, "");
    const filePath = join(__dirname, "result", `${slug}.md`);
    const md = toMarkdown(
      result.name,
      result.method,
      result.path,
      result.config,
      result.wrkOutput,
      result.parsed,
      result.date
    );
    await fs.writeFile(filePath, md, "utf-8");
    console.log(`  Written: ${filePath}`);
  }

  const summaryMd = allResults
    .map((r) =>
      toMarkdown(r.name, r.method, r.path, r.config, r.wrkOutput, r.parsed, r.date)
    )
    .join("\n---\n\n");
  const summaryPath = join(__dirname, "result", "summary.md");
  await fs.writeFile(summaryPath, summaryMd, "utf-8");
  console.log(`  Written: ${summaryPath}`);

  console.log(`\n  All wrk benchmarks complete!`);
}

main().catch((err) => {
  console.error("Benchmark failed:", err);
  process.exit(1);
});
