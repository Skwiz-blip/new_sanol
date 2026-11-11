import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { isBrowser, prefersReducedMotion } from './env';

/**
 * Niveau d'animation.
 *  HIGH / STANDARD : animations complètes (selon la puissance de l'appareil).
 *  LITE            : animations réduites, si le système le demande
 *                    (prefers-reduced-motion) ou si l'appareil est très faible.
 */
export type Tier = 'high' | 'standard' | 'lite';

type Ctx = {
  tier: Tier;
  reduced: boolean;
  ready: boolean;
};

const QualityContext = createContext<Ctx>({
  tier: 'lite',
  reduced: false,
  ready: false,
});

export function detectTier(): Tier {
  if (!isBrowser) return 'lite';
  if (prefersReducedMotion()) return 'lite';
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };
  if (nav.connection?.saveData) return 'lite';
  if (/(^|-)2g$/.test(nav.connection?.effectiveType ?? '')) return 'lite';
  const cores = nav.hardwareConcurrency ?? 4;
  const mem = nav.deviceMemory ?? 8;
  const small = window.innerWidth < 900;
  if (cores >= 8 && mem >= 8 && !small) return 'high';
  if (cores <= 2 || mem <= 2) return 'lite';
  return 'standard';
}

export function QualityProvider({ children }: { children: ReactNode }) {
  // Rendu serveur et premier rendu client : LITE — rien de lourd n'est
  // monté tant que l'appareil n'a pas été évalué.
  const [state, setState] = useState<{ detected: Tier; reduced: boolean; ready: boolean }>({
    detected: 'lite',
    reduced: false,
    ready: false,
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () =>
      setState({ detected: detectTier(), reduced: mq.matches, ready: true });
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const tier: Tier = state.reduced ? 'lite' : state.detected;

  useEffect(() => {
    if (!state.ready) return;
    const d = document.documentElement;
    d.dataset.tier = tier;
    d.classList.toggle('motion', tier !== 'lite');
  }, [tier, state.ready]);

  const value = useMemo(
    () => ({ tier, reduced: state.reduced, ready: state.ready }),
    [tier, state.reduced, state.ready],
  );
  return <QualityContext.Provider value={value}>{children}</QualityContext.Provider>;
}

export const useQuality = () => useContext(QualityContext);
