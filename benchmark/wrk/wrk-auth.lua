wrk.method = "GET"
wrk.body = nil
wrk.headers = { ["Content-Type"] = "application/json" }

local token_file = os.tmpname() .. "_wrk_token.txt"
local auth_token = nil

function init(args)
    local f = io.open(token_file, "r")
    if f then
        auth_token = f:read("*a")
        f:close()
        auth_token = auth_token:gsub("%s+", "")
    end
    if auth_token and #auth_token > 0 then
        wrk.headers["Authorization"] = "Bearer " .. auth_token
    end
end

function request()
    return wrk.format(nil, nil, nil, nil)
end

function response(status, headers, body)
    if status == 401 then
        return nil
    end
end

function done(summary, latency, requests)
    io.write("─────────────────────────────────────────────────\n")
    io.write(string.format("  Requests/sec:   %.2f\n", summary.requests / (summary.duration / 1e6)))
    io.write(string.format("  Transfer/sec:   %.2f KB\n", (summary.bytes / (summary.duration / 1e6)) / 1024))
    io.write(string.format("  Total Requests: %d\n", summary.requests))
    io.write(string.format("  Total Errors:   %d (connect: %d, read: %d, write: %d, timeout: %d)\n",
        summary.errors.connect + summary.errors.read + summary.errors.write + summary.errors.timeout,
        summary.errors.connect, summary.errors.read, summary.errors.write, summary.errors.timeout))
    io.write("─────────────────────────────────────────────────\n")
    io.write("  Latency Distribution (ms)\n")
    io.write("─────────────────────────────────────────────────\n")
    for _, p in pairs({ 50, 75, 90, 95, 99, 99.9 }) do
        io.write(string.format("  P%-6.1f %8.2f\n", p, latency:percentile(p) / 1000))
    end
    io.write("─────────────────────────────────────────────────\n")
    io.write("  Latency (ms)\n")
    io.write("─────────────────────────────────────────────────\n")
    io.write(string.format("  Min    %8.2f\n", latency.min / 1000))
    io.write(string.format("  Avg    %8.2f\n", latency.mean / 1000))
    io.write(string.format("  Max    %8.2f\n", latency.max / 1000))
    io.write("─────────────────────────────────────────────────\n")
    io.write("  Status Codes\n")
    io.write("─────────────────────────────────────────────────\n")
    io.write(string.format("  Total: %d\n", summary.requests))
    io.write(string.format("  Errors: %d\n", summary.errors.connect + summary.errors.read + summary.errors.write + summary.errors.timeout))
    io.write("─────────────────────────────────────────────────\n")
end
