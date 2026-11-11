import { animate } from 'animejs';

/**
 * Anime.js — rôle unique : les micro-animations d'interface
 * (compteurs, tracés SVG, petits détails). GSAP garde le scroll et les scènes.
 */
export function countUp(el: HTMLElement, to: number, opts: { duration?: number; delay?: number } = {}) {
  const fmt = new Intl.NumberFormat('fr-FR');
  const state = { v: 0 };
  el.textContent = fmt.format(0);
  return animate(state, {
    v: to,
    duration: opts.duration ?? 1600,
    delay: opts.delay ?? 0,
    ease: 'outExpo',
    onUpdate: () => {
      el.textContent = fmt.format(Math.round(state.v));
    },
  });
}

export function drawPath(path: SVGPathElement | SVGLineElement | SVGPolylineElement, duration = 1800, delay = 0) {
  const len = (path as SVGGeometryElement).getTotalLength();
  path.style.strokeDasharray = `${len}`;
  path.style.strokeDashoffset = `${len}`;
  return animate(path, { strokeDashoffset: [len, 0], duration, delay, ease: 'inOutQuart' });
}
