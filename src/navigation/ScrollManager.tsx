import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { useSmoothScroll } from '../motion/SmoothScroll';

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
const KEY = 'sanol:scroll';

function read(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '{}');
  } catch {
    return {};
  }
}

/**
 * Restauration cohérente du scroll :
 *  PUSH  → haut de page (ou l'ancre demandée)
 *  POP   → position mémorisée pour cette entrée d'historique
 *  Rechargement → le navigateur garde la main (scrollRestoration manuel + mémoire).
 */
export function ScrollManager() {
  const location = useLocation();
  const type = useNavigationType();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const save = () => {
      const map = read();
      map[history.state?.key ?? location.key] = window.scrollY;
      try {
        sessionStorage.setItem(KEY, JSON.stringify(map));
      } catch {
        /* rien */
      }
    };
    let t = 0;
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(save, 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', save);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', save);
    };
  }, [location.key]);

  useIso(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) scrollTo(el, { immediate: true, offset: -80 });
      });
      return;
    }
    if (type === 'POP') {
      const y = read()[location.key];
      if (typeof y === 'number') {
        // Attendre que la page (et ses ScrollTriggers) soit en place.
        requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(y, { immediate: true })));
        return;
      }
    }
    if (type === 'PUSH' || type === 'REPLACE') scrollTo(0, { immediate: true });
  }, [location.key]);

  return null;
}
