import { useEffect, useRef, useState } from 'react';
import { CHAINE } from '../data/contenu';
import { ChevronLeft, ChevronRight } from '../design/Icons';
import { Oeil, Photo } from '../design/ui';
import { useQuality } from '../motion/quality';

/**
 * La chaîne d'approvisionnement du GPL, en six étapes.
 *
 * Sur grand écran, la section se fige et le défilement vertical fait
 * glisser les étapes à l'horizontale. Sur téléphone, ou si le système
 * demande moins d'animations, les étapes se parcourent au doigt ou avec
 * les flèches.
 */
export function Chaine() {
  const piste = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const jauge = useRef<HTMLElement>(null);
  const [course, setCourse] = useState(0);
  const [actif, setActif] = useState(0);
  const { tier, ready } = useQuality();
  const fige = ready && tier !== 'lite' && course > 0;

  // La distance à parcourir : ce qui dépasse de l'écran. Zéro sur petit écran.
  useEffect(() => {
    if (!ready || tier === 'lite') return;
    const mesurer = () => {
      const r = rail.current;
      if (!r || window.innerWidth < 900) return setCourse(0);
      // La zone a des marges intérieures : la dernière carte doit arriver entière, marge droite comprise.
      const zone = r.parentElement!;
      const cs = getComputedStyle(zone);
      const marges = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      setCourse(Math.max(0, r.scrollWidth + marges - zone.clientWidth));
    };
    mesurer();
    window.addEventListener('resize', mesurer);
    const id = window.setTimeout(mesurer, 600);
    return () => {
      window.removeEventListener('resize', mesurer);
      window.clearTimeout(id);
    };
  }, [ready, tier]);

  useEffect(() => {
    const r = rail.current;
    if (!fige) {
      if (r) r.style.transform = '';
      return;
    }
    let raf = 0;
    const lire = () => {
      raf = 0;
      const p = piste.current;
      if (!p || !r) return;
      const total = p.offsetHeight - window.innerHeight;
      // Le glissement s'achève à 80 % du parcours : la dernière carte reste ensuite affichée un moment.
      const t = Math.min(1, Math.max(0, -p.getBoundingClientRect().top / Math.max(1, total * 0.8)));
      r.style.transform = `translate3d(${-t * course}px, 0, 0)`;
      if (jauge.current) jauge.current.style.transform = `scaleX(${t})`;
      setActif(Math.round(t * (CHAINE.length - 1)));
    };
    const auDefilement = () => {
      if (!raf) raf = requestAnimationFrame(lire);
    };
    lire();
    window.addEventListener('scroll', auDefilement, { passive: true });
    return () => {
      window.removeEventListener('scroll', auDefilement);
      cancelAnimationFrame(raf);
    };
  }, [fige, course]);

  // Sans figeage : les flèches font avancer d'une carte.
  const avancer = (sens: 1 | -1) => {
    const zone = rail.current?.parentElement;
    const carte = rail.current?.firstElementChild as HTMLElement | null;
    if (zone && carte) zone.scrollBy({ left: sens * (carte.offsetWidth + 24), behavior: 'smooth' });
  };

  return (
    <section className={`chaine${fige ? ' chaine--figee' : ''}`} aria-labelledby="chaine-titre">
      <div className="chaine__piste" ref={piste} style={fige ? { height: `calc(100svh + ${Math.round(course * 1.25)}px)` } : undefined}>
        <div className="chaine__ecran">
          <div className="cadre chaine__tete">
            <div>
              <Oeil clair>La chaîne du GPL.</Oeil>
              <h2 className="t2" id="chaine-titre">
                Du tanker <em>au camion-citerne.</em>
              </h2>
            </div>
            <p>De l’arrivée du produit par voie maritime jusqu’à sa distribution : six étapes, une même maîtrise.</p>
            <div className="chaine__pilotage">
              <span className="chaine__compte" aria-hidden="true">
                {String(actif + 1).padStart(2, '0')} / {String(CHAINE.length).padStart(2, '0')}
              </span>
              {!fige && (
                <>
                  <button type="button" onClick={() => avancer(-1)} aria-label="Étape précédente">
                    <ChevronLeft />
                  </button>
                  <button type="button" onClick={() => avancer(1)} aria-label="Étape suivante">
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="chaine__zone">
            <ol className="chaine__rail" ref={rail} role="list">
              {CHAINE.map((e, k) => (
                <li key={e.rang} className={`etape${fige && k === actif ? ' is-active' : ''}`}>
                  <Photo id={e.photo} />
                  <div className="etape__texte">
                    <span className="etape__rang">{e.rang}</span>
                    <h3>{e.titre}</h3>
                    <p>{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="cadre">
            <div className="chaine__jauge" aria-hidden="true">
              <i ref={jauge} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
