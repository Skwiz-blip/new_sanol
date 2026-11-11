/**
 * Prérendu statique : chaque route devient un vrai fichier HTML.
 * → SEO, partage, rechargement direct et navigation SANS JavaScript.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const { render, ROUTES } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

for (const url of ROUTES) {
  const { html, head } = render(url);
  const page = template.replace('<!--head-->', head).replace('<!--app-->', html);
  const file = url === '/404' ? path.join(dist, '404.html') : path.join(dist, url, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page);
  console.log('  ✓', url);
}
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
