// Génère le CV en PDF à partir de la page /cv du site statique (dossier out/).
// Utilise le navigateur Chrome ou Edge déjà installé sur la machine : aucun téléchargement.
import { createReadStream, existsSync, statSync, copyFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const OUT = join(process.cwd(), "out");
const FILE = "gloria-sodjahin-cv.pdf";
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".txt": "text/plain",
};

if (!existsSync(OUT)) {
  console.error("Dossier out/ introuvable : lancez d'abord `next build`.");
  process.exit(1);
}

const server = createServer((req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
  let file = join(OUT, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});

await new Promise((resolve) => server.listen(0, resolve));
const port = server.address().port;

async function launch() {
  for (const channel of ["chrome", "msedge"]) {
    try {
      return await chromium.launch({ channel });
    } catch {
      /* essai suivant */
    }
  }
  try {
    return await chromium.launch();
  } catch {
    return null;
  }
}

const browser = await launch();
if (!browser) {
  // Serveur de build (Vercel, Netlify…) sans navigateur : on garde le PDF versionné dans public/,
  // déjà copié dans out/ par `next build`.
  server.close();
  if (!existsSync(join(OUT, FILE))) {
    console.error(`Aucun navigateur trouvé et public/${FILE} est absent : impossible de fournir le PDF.`);
    process.exit(1);
  }
  console.warn(`⚠ Aucun navigateur (Chrome/Edge) trouvé : PDF non régénéré, la version de public/${FILE} est utilisée.`);
  process.exit(0);
}
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/cv/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: join(OUT, FILE),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  copyFileSync(join(OUT, FILE), join(process.cwd(), "public", FILE));
  console.log(`✓ PDF généré : out/${FILE} (copié dans public/)`);
} finally {
  await browser.close();
  server.close();
}
