import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useQuality } from '../motion/quality';
import { useSmoothScroll } from '../motion/SmoothScroll';
import { PHOTOS, type PhotoId } from '../data/photos';
import { NAVIGATION, SITE } from '../data/site';

/**
 * Transitions de page.
 *
 * Aller : un panneau blanc puis un panneau bleu SANOL montent, puis la
 * photographie de l'agent devant les baies se dévoile par le bas (clip-path,
 * pour ne pas déformer l'image) ; le nom de la destination s'inscrit en
 * typographie monumentale ; on change de route sous le masque, on remonte
 * en haut, puis les panneaux se retirent par le haut.
 *
 * Les liens restent de vrais <a href> : clic molette, Ctrl/Cmd+clic,
 * « ouvrir dans un nouvel onglet » et navigation sans JS fonctionnent.
 * Retour / avant du navigateur : pas de masque, restauration du scroll.
 * Mode LITE / reduced-motion : navigation instantanée.
 */
type Ctx = { go: (to: string, label?: string) => void; busy: () => boolean };
const TransitionContext = createContext<Ctx>({ go: () => {}, busy: () => false });

/** Photographie de l'écran de transition, par destination. Par défaut : l'agent devant les baies. */
const PHOTO_TRANSITION: Partial<Record<string, PhotoId>> = { '/stations': 'stationSanol' };
const photoPour = (to: string) => PHOTOS[PHOTO_TRANSITION[to.split(/[?#]/)[0]] ?? 'agent'].src;
const attendre = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function labelFor(to: string): string {
  const path = to.split(/[?#]/)[0];
  const item = NAVIGATION.find((n) => n.href === path);
  if (item) return item.court ?? item.libelle;
  return 'SANOU SA';
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { tier } = useQuality();
  const { scrollTo, stop, start } = useSmoothScroll();
  const overlay = useRef<HTMLDivElement>(null);
  const running = useRef(false);
  const pending = useRef<null | (() => void)>(null);

  const go = useCallback(
    async (to: string, label?: string) => {
      const [path, hash] = to.split('#');
      const same = path === location.pathname || (path === '' && hash);
      if (same) {
        if (hash) scrollTo(`#${hash}`, { offset: -80 });
        else scrollTo(0);
        return;
      }
      if (running.current) return;
      if (tier === 'lite' || !overlay.current) {
        navigate(to);
        return;
      }
      running.current = true;
      const { gsap } = await import('../motion/gsap');
      const el = overlay.current;
      const title = el.querySelector('.pt__title span') as HTMLElement;
      title.textContent = label ?? labelFor(to);
      stop();
      const image = el.querySelector<HTMLImageElement>('.pt__panel--photo img');
      const src = photoPour(to);
      if (image && image.getAttribute('src') !== src) {
        image.src = src;
        await Promise.race([image.decode().catch(() => {}), attendre(300)]);
      }
      gsap.set(el, { visibility: 'visible' });
      const tl = gsap.timeline();
      const photo = el.querySelector('.pt__panel--photo');
      const devise = el.querySelector('.pt__devise');
      tl.set(el.querySelectorAll('.pt__panel--ink, .pt__panel--blue'), { scaleY: 0, transformOrigin: '50% 100%' })
        .set(photo, { clipPath: 'inset(100% 0% 0% 0%)' })
        .set(title, { yPercent: 110 })
        .set(devise, { autoAlpha: 0 })
        .to(el.querySelector('.pt__panel--ink'), { scaleY: 1, duration: 0.55, ease: 'expo.inOut' })
        .to(el.querySelector('.pt__panel--blue'), { scaleY: 1, duration: 0.55, ease: 'expo.inOut' }, 0.07)
        .to(photo, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.inOut' }, 0.14)
        .to(title, { yPercent: 0, duration: 0.6, ease: 'expo.out' }, 0.4)
        .to(devise, { autoAlpha: 1, duration: 0.4 }, 0.5);
      await tl.then();
      // Sous le masque : on change de page, on revient en haut.
      await new Promise<void>((resolve) => {
        pending.current = resolve;
        navigate(to);
      });
      scrollTo(0, { immediate: true });
      start();
      const out = gsap.timeline({
        onComplete: () => {
          gsap.set(el, { visibility: 'hidden' });
          running.current = false;
        },
      });
      out
        .to(title, { yPercent: -110, duration: 0.45, ease: 'expo.in' }, 0.05)
        .to(devise, { autoAlpha: 0, duration: 0.25 }, 0.05)
        .set(el.querySelectorAll('.pt__panel--ink, .pt__panel--blue'), { transformOrigin: '50% 0%' })
        .to(photo, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.65, ease: 'expo.inOut' }, 0.35)
        .to(el.querySelector('.pt__panel--blue'), { scaleY: 0, duration: 0.65, ease: 'expo.inOut' }, 0.42)
        .to(el.querySelector('.pt__panel--ink'), { scaleY: 0, duration: 0.65, ease: 'expo.inOut' }, 0.49);
      document.dispatchEvent(new CustomEvent('sanol:page-reveal'));
    },
    [location.pathname, navigate, scrollTo, start, stop, tier],
  );

  // Au repos, on précharge les photos des écrans de transition.
  useEffect(() => {
    const id = window.setTimeout(() => {
      for (const k of Object.values(PHOTO_TRANSITION)) if (k) new Image().src = PHOTOS[k].src;
    }, 2500);
    return () => window.clearTimeout(id);
  }, []);

  // La nouvelle route est rendue : on libère la transition.
  useEffect(() => {
    if (pending.current) {
      const r = pending.current;
      pending.current = null;
      requestAnimationFrame(() => r());
    }
  }, [location.key]);

  return (
    <TransitionContext.Provider value={{ go, busy: () => running.current }}>
      {children}
      <div className="pt" ref={overlay} aria-hidden="true">
        <div className="pt__panel pt__panel--ink" />
        <div className="pt__panel pt__panel--blue" />
        <div className="pt__panel pt__panel--photo">
          <img src={PHOTOS.agent.src} alt="" decoding="async" fetchPriority="low" />
        </div>
        <div className="pt__label">
          <div className="pt__title">
            <span>SANOU SA</span>
          </div>
          <span className="pt__devise">{SITE.devise}</span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);
