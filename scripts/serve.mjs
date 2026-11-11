/**
 * Serveur statique de prévisualisation du build prérendu.
 * /route → dist/route/index.html, inconnu → dist/404.html (statut 404).
 * Même logique à reproduire sur l'hébergement (voir README).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT ?? 5191);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml',
};
const exists = async (p) => (await stat(p).catch(() => null))?.isFile();

createServer(async (req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
  let file = path.join(dist, url);
  if (!file.startsWith(dist)) return res.writeHead(403).end();
  let status = 200;
  if (!(await exists(file))) {
    const idx = path.join(file, 'index.html');
    if (await exists(idx)) file = idx;
    else {
      file = path.join(dist, '404.html');
      status = 404;
    }
  }
  const body = await readFile(file);
  const ext = path.extname(file);
  res.writeHead(status, {
    'Content-Type': types[ext] ?? 'application/octet-stream',
    'Cache-Control': url.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
  });
  res.end(body);
}).listen(port, () => console.log(`SANOL : prévisualisation sur http://localhost:${port}`));
