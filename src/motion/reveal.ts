import { gsap, ScrollTrigger } from './gsap';

/**
 * Système de révélation déclaratif.
 *
 * Le balisage porte l'intention, ce module l'exécute :
 *   data-reveal="lines"  → chaque .line-mask > span monte depuis son masque
 *   data-reveal="words"  → le texte est découpé en mots qui apparaissent
 *   data-reveal="fade"   → montée douce + opacité
 *   data-reveal="media"  → masque qui s'ouvre + léger dézoom de l'image
 *   data-reveal="stagger"→ les enfants directs apparaissent en cascade
 *   data-parallax="0.15" → parallaxe légère sur l'image enfant
 *
 * Sans JS ou en mode réduit, rien n'est masqué : le contenu reste lisible.
 */
export function revealScope(root: HTMLElement): () => void {
  const ctx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      const type = el.dataset.reveal;
      const delay = Number(el.dataset.delay ?? 0);
      const st = { trigger: el, start: el.dataset.start ?? 'top 86%', once: true };

      if (type === 'lines') {
        const lines = el.querySelectorAll<HTMLElement>('.line-mask > span');
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(lines, { yPercent: 108 }, { yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.09, delay, scrollTrigger: st });
      } else if (type === 'words') {
        splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          el.querySelectorAll('.word'),
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.025, delay, scrollTrigger: st },
        );
      } else if (type === 'media') {
        const img = el.querySelector('img');
        gsap.fromTo(el, { autoAlpha: 1, clipPath: 'inset(18% 0% 18% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', delay, scrollTrigger: st });
        if (img) gsap.fromTo(img, { scale: 1.22 }, { scale: 1, duration: 1.8, ease: 'expo.out', delay, scrollTrigger: st });
      } else if (type === 'stagger') {
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          Array.from(el.children),
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, delay, scrollTrigger: st },
        );
      } else {
        gsap.fromTo(el, { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, delay, scrollTrigger: st });
      }
    });

    root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      const amount = Number(el.dataset.parallax || 0.12);
      const target = el.querySelector('img') ?? el;
      gsap.fromTo(
        target,
        { yPercent: -amount * 50, scale: 1 + amount },
        { yPercent: amount * 50, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    });
  }, root);

  requestAnimationFrame(() => ScrollTrigger.refresh());
  return () => ctx.revert();
}

function splitWords(el: HTMLElement) {
  if (el.dataset.split === '1') return;
  el.dataset.split = '1';
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const parts = (node.textContent ?? '').split(/(\s+)/);
    const frag = document.createDocumentFragment();
    parts.forEach((p) => {
      if (!p) return;
      if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
      else {
        const s = document.createElement('span');
        s.className = 'word';
        s.textContent = p;
        frag.appendChild(s);
      }
    });
    node.replaceWith(frag);
  });
}
