import { createContext, useContext, useEffect } from 'react';
import { SITE } from './data/site';

export type Head = { title: string; description: string; path: string };
/** Côté serveur, le prérendu passe un collecteur ; côté client on écrit dans le document. */
export const HeadContext = createContext<{ set: (h: Head) => void } | null>(null);

export function useSeo(h: Head) {
  const server = useContext(HeadContext);
  const full = { ...h, title: h.title === SITE.nom ? `${SITE.nom} · ${SITE.devise}` : `${h.title} · ${SITE.nom}` };
  if (server) server.set(full);
  useEffect(() => {
    document.title = full.title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = full.description;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full.title, full.description]);
}

export function renderHead(h: Head): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const url = SITE.url + h.path;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GROUPE SANOU SA',
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.telephones.map((t) => t.affiche),
    address: { '@type': 'PostalAddress', streetAddress: SITE.siege, addressLocality: 'Lomé', addressCountry: 'TG' },
  };
  return [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE.url}/media/sanol/reel-reservoir-drone.webp" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
  ].join('\n    ');
}
