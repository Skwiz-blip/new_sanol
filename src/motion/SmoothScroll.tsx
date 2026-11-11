import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type Lenis from 'lenis';
import { useQuality } from './quality';

/**
 * Lenis, synchronisé avec ScrollTrigger via le ticker GSAP.
 * Désactivé en LITE / reduced-motion : le défilement natif reprend la main.
 * Lenis ne capture ni le clavier ni les ancres natives : le comportement
 * du navigateur est préservé.
 */
type Ctx = {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void;
  stop: () => void;
  start: () => void;
};

const ScrollContext = createContext<Ctx>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function SmoothScroll({ children }: { children: ReactNode }) {
  const { tier, ready } = useQuality();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!ready || tier === 'lite') return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    Promise.all([import('lenis'), import('./gsap')]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const l = new LenisCtor({ duration: 1.15, easing: (t: number) => 1 - Math.pow(1 - t, 4), smoothWheel: true, anchors: false });
      ref.current = l;
      setLenis(l);
      l.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => l.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        l.destroy();
        ref.current = null;
        setLenis(null);
      };
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [tier, ready]);

  const value: Ctx = {
    lenis,
    scrollTo: (target, opts = {}) => {
      const l = ref.current;
      const offset = opts.offset ?? 0;
      if (l) {
        l.scrollTo(target as never, { immediate: opts.immediate, offset, force: true });
        return;
      }
      let y = 0;
      if (typeof target === 'number') y = target;
      else {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (!el) return;
        y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY;
      }
      window.scrollTo({ top: y + offset, behavior: opts.immediate ? 'instant' : 'smooth' });
    },
    stop: () => ref.current?.stop(),
    start: () => ref.current?.start(),
  };

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(ScrollContext);
