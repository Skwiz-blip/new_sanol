import { useEffect, type RefObject } from 'react';
import { useQuality } from './quality';

/** Branche le système de révélation sur un conteneur, si le mouvement est permis. */
export function useReveal(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const { tier, ready } = useQuality();
  useEffect(() => {
    if (!ready || tier === 'lite' || !ref.current) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import('./reveal').then(({ revealScope }) => {
      if (!cancelled && ref.current) cleanup = revealScope(ref.current);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier, ready, ...deps]);
}
