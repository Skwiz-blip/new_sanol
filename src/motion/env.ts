export const isBrowser = typeof window !== 'undefined';

export function prefersReducedMotion(): boolean {
  return isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasFinePointer(): boolean {
  return isBrowser && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
