import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { HeadContext, renderHead, type Head } from './seo';

export function render(url: string) {
  let head: Head = { title: 'GROUPE SANOU SA', description: '', path: url };
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={{ set: (h) => (head = h) }}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );
  return { html, head: renderHead(head) };
}

export const ROUTES = ['/', '/groupe', '/depot-gpl', '/sanol-gaz', '/stations', '/trading-supply-chain', '/contact', '/404'];
