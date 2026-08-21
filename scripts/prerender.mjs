/**
 * Bakes the rendered page into dist/public/index.html.
 *
 * Why this exists: the page is a client-rendered React app, so the shipped
 * index.html is an empty <div id="root"></div>. Googlebot executes JavaScript
 * and copes; the AI crawlers this page is trying to reach — GPTBot,
 * OAI-SearchBot, ClaudeBot, PerplexityBot, CCBot — largely do not. To them an
 * unprerendered SPA is a blank page with a title, which is worth nothing when
 * an assistant is deciding what to recommend.
 *
 * The approach is deliberately dependency-free: serve the build over loopback,
 * let the system Chrome render it, and dump the resulting DOM back over
 * index.html. React still boots on top of the markup afterwards, so behaviour
 * is unchanged for human visitors.
 *
 * Run: node scripts/prerender.mjs   (wired into `pnpm build`)
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const DIST = new URL("../dist/public/", import.meta.url).pathname;
const INDEX = join(DIST, "index.html");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

function findChrome() {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      `No Chrome found. Tried: ${CHROME_CANDIDATES.join(", ")}. Set CHROME_PATH to override.`,
    );
  }
  return found;
}

function serve() {
  const server = createServer(async (req, res) => {
    // Strip the query string, refuse anything trying to climb out of dist.
    const rel = normalize(decodeURIComponent(req.url.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
    const file = join(DIST, rel === "/" ? "index.html" : rel);
    if (!file.startsWith(DIST)) {
      res.writeHead(403).end();
      return;
    }
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

function dumpDom(chrome, url) {
  return new Promise((resolve, reject) => {
    const child = spawn(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      // Fast-forwards timers so React has mounted and the JSON-LD tag has been
      // appended before the DOM is read, without an arbitrary sleep.
      "--virtual-time-budget=8000",
      "--dump-dom",
      url,
    ]);
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0 && !out) reject(new Error(`chrome exited ${code}: ${err.slice(-400)}`));
      else resolve(out);
    });
  });
}

const { server, port } = await serve();
try {
  const chrome = findChrome();
  const html = await dumpDom(chrome, `http://127.0.0.1:${port}/`);

  if (process.env.PRERENDER_DEBUG) {
    await writeFile("/tmp/prerender-dump.html", html);
    console.log(`debug: ${html.length} bytes → /tmp/prerender-dump.html`);
  }

  // Guard against silently shipping a blank shell: if Chrome handed back an
  // empty root, the prerender failed and overwriting index.html would make
  // things worse, not better.
  const problems = [];
  if (html.includes('<div id="root"></div>')) problems.push("root element is still empty");
  if (!html.includes('id="speakband-jsonld"')) problems.push("JSON-LD was never injected");
  if (html.length < 30_000) problems.push(`document is only ${html.length} bytes`);
  if (problems.length) {
    throw new Error(`prerender failed (${problems.join("; ")}); keeping the SPA shell`);
  }

  const before = (await readFile(INDEX, "utf8")).length;
  await writeFile(INDEX, `<!doctype html>\n${html.replace(/^<!DOCTYPE html>\n?/i, "")}`);
  console.log(
    `prerender: index.html ${(before / 1024).toFixed(1)} kB → ${(html.length / 1024).toFixed(1)} kB`,
  );
} finally {
  server.close();
}
