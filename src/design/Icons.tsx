import type { SVGProps } from 'react';

const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'square' as const, 'aria-hidden': true };

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M3 12h17M14 6l6 6-6 6" /></svg>
);
export const ArrowDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 3v17M6 14l6 6 6-6" /></svg>
);
export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M6 18L18 6M8 6h10v10" /></svg>
);
export const Close = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M5 5l14 14M19 5L5 19" /></svg>
);
export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 4v16M4 12h16" /></svg>
);
export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M15 5l-7 7 7 7" /></svg>
);
export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M9 5l7 7-7 7" /></svg>
);
export const Phone = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" /></svg>
);
export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M3 5h18v14H3zM3 6l9 7 9-7" /></svg>
);
export const Pin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
);
export const Chat = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth={2.4} strokeLinecap="round" /></svg>
);
export const Pause = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M9 5v14M15 5v14" strokeWidth={2} /></svg>
);
export const Play = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M8 5l11 7-11 7z" fill="currentColor" stroke="none" /></svg>
);


