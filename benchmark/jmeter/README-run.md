# run.mjs - JMeter Benchmark Runner

Run JMeter benchmarks from existing `.jmx` test plans and generate reports.

## Prerequisites

1. Java 8+ installed (`java -version`)
2. `.jmx` files in `plans/` folder
3. Docker Compose services running

## Quick Start

```bash
cd benchmark/jmeter
node run.mjs
```

## What It Does

1. Reads all `.jmx` files from `plans/` folder
2. Fetches OAuth2 token from Keycloak
3. Runs JMeter for each test plan
4. Generates 3 types of reports:

| Report | Location | Description |
|---|---|---|
| Markdown | `md/*.md` | Simple text tables |
| HTML | `html/*.html` | Styled web pages |
| Dashboard | `charts-graphs/*/index.html` | JMeter charts & graphs |

## Command Line Options

All options are passed via `.env` file:

```env
TARGET_HOST=api-gateway        # API Gateway hostname
TARGET_PORT=8888               # API Gateway port
CONCURRENCY=10                 # Number of concurrent threads
DURATION_SEC=10                # Test duration in seconds
RAMP_UP_SEC=2                  # Thread ramp-up period
KEYCLOAK_URL=http://keycloak:8080
REALM=spring-boot-micro-services-realm
CLIENT_ID=spring-cloud-client
CLIENT_SECRET=your-secret
```

Or override via environment variables:

```bash
set CONCURRENCY=20
set DURATION_SEC=30
node run.mjs
```

## Output Structure

```
benchmark/jmeter/
├── plans/                          # Input: JMX test plans
│   ├── get-all-products.jmx
│   ├── post-create-product.jmx
│   ├── post-create-order.jmx
│   └── get-inventory.jmx
│
├── results/                        # Raw JMeter CSV data
│   ├── get-all-products.jtl
│   ├── post-create-product.jtl
│   ├── post-create-order.jtl
│   └── get-inventory.jtl
│
├── md/                             # Markdown reports
│   ├── summary.md
│   ├── get-all-products.md
│   ├── post-create-product.md
│   ├── post-create-order.md
│   └── get-inventory.md
│
├── html/                           # Custom HTML reports
│   ├── summary.html
│   ├── get-all-products.html
│   ├── post-create-product.html
│   ├── post-create-order.html
│   └── get-inventory.html
│
├── charts-graphs/                  # JMeter dashboard (charts & graphs)
│   ├── get-all-products/
│   │   └── index.html              # Open in browser
│   ├── post-create-product/
│   │   └── index.html
│   ├── post-create-order/
│   │   └── index.html
│   └── get-inventory/
│       └── index.html
│
└── logs/                           # JMeter log files
    ├── jmeter_get-all-products.log
    └── ...
```

## Viewing Dashboard Reports

Open `charts-graphs/{endpoint}/index.html` in a browser:

```bash
# Windows
start charts-graphs\get-all-products\index.html

# macOS
open charts-graphs/get-all-products/index.html

# Linux
xdg-open charts-graphs/get-all-products/index.html
```

The JMeter dashboard includes:
- Response Time Over Time
- Response Time Percentiles
- Response Time Distribution
- Requests Per Second
- Response Time vs Threads
- Latency Over Time
- Throughput Over Time
- Response Codes Per Second

## Adding New Endpoints

1. Create a `.jmx` file in `plans/` folder
2. Run `node run.mjs`

The script auto-discovers all `.jmx` files in `plans/`.

## Troubleshooting

| Issue | Solution |
|---|---|
| `plans/ folder not found` | Create `plans/` folder and add `.jmx` files |
| `No .jmx files found` | Add `.jmx` files to `plans/` folder |
| `Token fetch failed` | Check `.env` credentials and Keycloak URL |
| `JMeter not found` | Set `JMETER_HOME` environment variable |
| Dashboard not generated | Ensure JMeter has `report-dashboard` support (5.0+) |
