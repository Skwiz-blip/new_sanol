import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { NAVIGATION, SITE } from '../data/site';
import { Close, Plus } from '../design/Icons';
import { Arcs } from '../design/ui';
import { useSmoothScroll } from '../motion/SmoothScroll';
import { TransitionLink } from './TransitionLink';

const LIENS = NAVIGATION.filter((n) => n.href !== '/contact');

/**
 * En-tête : une barre blanche flottante, qui s'efface quand on descend et
 * revient dès qu'on remonte. Sur petit écran, les liens passent dans un
 * menu plein écran aux couleurs du logo.
 */
export function Header() {
  const [cache, setCache] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const { pathname } = useLocation();
  const { stop, start } = useSmoothScroll();

  useEffect(() => setOuvert(false), [pathname]);

  useEffect(() => {
    let dernier = window.scrollY;
    let raf = 0;
    const lire = () => {
      raf = 0;
      const y = window.scrollY;
      if (Math.abs(y - dernier) > 6) {
        setCache(y > dernier && y > 420);
        dernier = y;
      }
    };
    const auDefilement = () => {
      if (!raf) raf = requestAnimationFrame(lire);
    };
    window.addEventListener('scroll', auDefilement, { passive: true });
    return () => {
      window.removeEventListener('scroll', auDefilement);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Menu ouvert : la page ne défile plus derrière, Échap le referme.
  useEffect(() => {
    if (!ouvert) return;
    stop();
    const auClavier = (e: KeyboardEvent) => e.key === 'Escape' && setOuvert(false);
    document.addEventListener('keydown', auClavier);
    return () => {
      start();
      document.removeEventListener('keydown', auClavier);
    };
  }, [ouvert, start, stop]);

  return (
    <>
      <header className="entete" data-cache={cache && !ouvert}>
        <div className="entete__barre">
          <TransitionLink to="/" className="marque" label="Accueil" aria-label={`${SITE.nom}, accueil`}>
            <img src="/logo-sanol.png" alt="" width="64" height="46" />
            <span>
              Groupe <b>SANOU SA</b>
            </span>
          </TransitionLink>
          <nav className="entete__nav" aria-label="Navigation principale">
            {LIENS.map((n) => (
              <TransitionLink key={n.href} to={n.href} matchCurrent label={n.court ?? n.libelle}>
                {n.libelle}
              </TransitionLink>
            ))}
          </nav>
          <TransitionLink to="/contact" className="btn btn--rouge entete__action" label="Contact">
            <span>Contactez-nous</span>
            <i aria-hidden="true">
              <Plus />
            </i>
          </TransitionLink>
          <button className="entete__menu" type="button" aria-expanded={ouvert} aria-controls="menu" onClick={() => setOuvert(true)}>
            Menu
            <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="menu" id="menu" data-ouvert={ouvert} aria-hidden={!ouvert} role="dialog" aria-modal="true" aria-label="Menu">
        <Arcs />
        <div className="menu__haut">
          <span className="marque marque--clair">
            <span>
              Groupe <b>SANOU SA</b>
            </span>
          </span>
          <button type="button" className="menu__fermer" onClick={() => setOuvert(false)} tabIndex={ouvert ? 0 : -1}>
            Fermer <Close />
          </button>
        </div>
        <nav className="menu__liens" aria-label="Menu">
          {[{ libelle: 'Accueil', href: '/' }, ...NAVIGATION].map((n, k) => (
            <TransitionLink key={n.href} to={n.href} matchCurrent label={n.libelle} tabIndex={ouvert ? 0 : -1} style={{ transitionDelay: `${80 + k * 45}ms` }}>
              <small>{String(k + 1).padStart(2, '0')}</small>
              {n.libelle}
            </TransitionLink>
          ))}
        </nav>
        <div className="menu__bas">
          <a href={`mailto:${SITE.email}`} tabIndex={ouvert ? 0 : -1}>
            {SITE.email}
          </a>
          <a href={SITE.telephones[0].lien} tabIndex={ouvert ? 0 : -1}>
            {SITE.telephones[0].affiche}
          </a>
          <span>{SITE.devise}</span>
        </div>
      </div>
    </>
  );
}
