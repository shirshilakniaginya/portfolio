import { randomUUID } from "node:crypto";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { isIP } from "node:net";
import { IpRateLimiter } from "./rate-limit.js";
import { sendTelegramMessage } from "./telegram.js";
import { validateContactPayload } from "./validation.js";

const HOST = "127.0.0.1";
const MAX_BODY_BYTES = 20 * 1024;
const limiter = new IpRateLimiter(5, 10 * 60 * 1_000);

function readPort(value: string | undefined): number {
  const port = Number(value ?? "3001");
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }
  return port;
}

const PORT = readPort(process.env.PORT);

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: Record<string, unknown>,
  headers: Record<string, string> = {},
): void {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  });
  response.end(JSON.stringify(payload));
}

function getClientKey(request: IncomingMessage): string {
  const forwarded = request.headers["x-forwarded-for"];
  const firstForwarded = (Array.isArray(forwarded) ? forwarded[0] : forwarded)
    ?.split(",", 1)[0]
    ?.trim();

  if (firstForwarded && firstForwarded.length <= 64 && isIP(firstForwarded)) {
    return firstForwarded;
  }

  return request.socket.remoteAddress ?? "unknown";
}

async function readJsonBody(request: IncomingMessage): Promise<unknown> {
  const declaredLength = Number(request.headers["content-length"] ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    request.resume();
    throw new Error("payload_too_large");
  }

  const chunks: Buffer[] = [];
  let receivedBytes = 0;
  let tooLarge = false;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    receivedBytes += buffer.length;

    if (receivedBytes > MAX_BODY_BYTES) {
      tooLarge = true;
      continue;
    }

    chunks.push(buffer);
  }

  if (tooLarge) throw new Error("payload_too_large");

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("invalid_json");
  }
}

async function handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const requestId = randomUUID();
  const startedAt = Date.now();
  const path = new URL(request.url ?? "/", "http://localhost").pathname;
  let statusCode = 500;

  try {
    if (path === "/health") {
      if (request.method !== "GET") {
        statusCode = 405;
        sendJson(response, statusCode, { ok: false }, { Allow: "GET" });
        return;
      }

      statusCode = 200;
      sendJson(response, statusCode, { ok: true });
      return;
    }

    if (path !== "/api/contact") {
      statusCode = 404;
      sendJson(response, statusCode, { ok: false });
      return;
    }

    if (request.method !== "POST") {
      statusCode = 405;
      sendJson(response, statusCode, { ok: false }, { Allow: "POST" });
      return;
    }

    const mediaType = request.headers["content-type"]?.split(";", 1)[0]?.trim().toLowerCase();
    if (mediaType !== "application/json") {
      statusCode = 415;
      sendJson(response, statusCode, { ok: false });
      return;
    }

    const rateLimit = limiter.consume(getClientKey(request));
    if (!rateLimit.allowed) {
      statusCode = 429;
      sendJson(
        response,
        statusCode,
        { ok: false },
        { "Retry-After": String(rateLimit.retryAfterSeconds) },
      );
      return;
    }

    let body: unknown;
    try {
      body = await readJsonBody(request);
    } catch (error) {
      statusCode = error instanceof Error && error.message === "payload_too_large" ? 413 : 400;
      sendJson(response, statusCode, { ok: false });
      return;
    }

    const validation = validateContactPayload(body);
    if (!validation.ok) {
      if (validation.kind === "spam") {
        statusCode = 200;
        sendJson(response, statusCode, { ok: true });
        return;
      }

      statusCode = 400;
      sendJson(response, statusCode, { ok: false });
      return;
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      statusCode = 503;
      sendJson(response, statusCode, { ok: false });
      return;
    }

    try {
      await sendTelegramMessage(token, chatId, validation.data);
    } catch {
      statusCode = 502;
      sendJson(response, statusCode, { ok: false });
      return;
    }

    statusCode = 200;
    sendJson(response, statusCode, { ok: true });
  } finally {
    console.info(JSON.stringify({
      event: "request_complete",
      requestId,
      method: request.method,
      path,
      statusCode,
      durationMs: Date.now() - startedAt,
    }));
  }
}

const server = createServer((request, response) => {
  void handleRequest(request, response).catch(() => {
    if (!response.headersSent) sendJson(response, 500, { ok: false });
    else response.end();
  });
});

server.headersTimeout = 10_000;
server.requestTimeout = 15_000;
server.keepAliveTimeout = 5_000;

server.listen(PORT, HOST, () => {
  console.info(JSON.stringify({ event: "server_started", host: HOST, port: PORT }));
});

let shuttingDown = false;
function shutdown(signal: NodeJS.Signals): void {
  if (shuttingDown) return;
  shuttingDown = true;
  console.info(JSON.stringify({ event: "shutdown_started", signal }));

  const forceCloseTimer = setTimeout(() => {
    server.closeAllConnections();
  }, 10_000);
  forceCloseTimer.unref();

  server.close((error) => {
    clearTimeout(forceCloseTimer);
    if (error) {
      console.error(JSON.stringify({ event: "shutdown_failed" }));
      process.exitCode = 1;
    }
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
