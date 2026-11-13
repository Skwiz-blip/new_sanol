import { useEffect, useState, type CSSProperties } from 'react';
import type { PhotoId } from '../data/photos';
import { Pause, Play } from '../design/Icons';
import { Bouton, Oeil, Photo } from '../design/ui';
import { useQuality } from '../motion/quality';

/** Les vues de l'ouverture : une par entité. La première est la sphère portant l'inscription Sanol Gaz. */
const VUES: { photo: PhotoId; legende: string }[] = [
  { photo: 'sphere', legende: 'Dépôt GPL · Katanga' },
  { photo: 'centreEmplisseur', legende: 'Centre Emplisseur · Kpogan' },
  { photo: 'camionDepot', legende: 'Stations-service et shops' },
];
const DUREE = 6500;

/**
 * L'ouverture de l'accueil : la photographie plein écran, la devise du
 * Groupe en capitales, et les vues qui se succèdent avec un lent zoom.
 * Sans animations (réglage du système), la première vue reste fixe.
 */
export function Hero() {
  const [i, setI] = useState(0);
  const [lecture, setLecture] = useState(true);
  const { tier, ready } = useQuality();
  const mouvement = ready && tier !== 'lite';

  useEffect(() => {
    if (!mouvement || !lecture) return;
    const id = window.setTimeout(() => {
      if (document.visibilityState === 'visible') setI((v) => (v + 1) % VUES.length);
    }, DUREE);
    return () => window.clearTimeout(id);
  }, [i, lecture, mouvement]);

  return (
    <section className={`hero${mouvement ? ' hero--mouvement' : ''}`} aria-label="Groupe SANOU SA">
      <div className="hero__fond" aria-hidden="true">
        {VUES.map((v, k) => (
          <Photo key={v.photo} id={v.photo} priority={k === 0} className={k === i ? 'is-active' : ''} />
        ))}
        <span className="hero__voile" />
      </div>

      <div className="cadre hero__contenu">
        <Oeil clair>Groupe SANOU SA.</Oeil>
        <h1 className="hero__titre">
          <span className="line-mask">
            <span>Une vision,</span>
          </span>
          <span className="line-mask">
            <span>une ambition,</span>
          </span>
          <span className="line-mask">
            <span>
              plusieurs horizons<b>.</b>
            </span>
          </span>
        </h1>
        <p className="hero__chapo">
          Réception, stockage et distribution du GPL, emplissage des bouteilles SANOL GAZ, stations-service et shops : un acteur intégré de la
          chaîne d’approvisionnement et de distribution des produits énergétiques.
        </p>
        <div className="hero__actions">
          <Bouton to="/groupe" variante="bleu" label="Le Groupe">
            Découvrir le Groupe
          </Bouton>
          <Bouton to="/#entites" variante="clair" icone="bas">
            Nos entités
          </Bouton>
        </div>
      </div>

      <div className="cadre hero__bas">
        <div className="hero__vues" role="tablist" aria-label="Les entités du Groupe">
          {VUES.map((v, k) => (
            <button
              key={v.photo}
              type="button"
              role="tab"
              aria-selected={k === i}
              className={`${k === i ? 'is-active' : ''} ${k < i ? 'is-done' : ''} ${mouvement && lecture ? 'is-running' : ''}`}
              style={{ '--d': `${DUREE}ms` } as CSSProperties}
              onClick={() => setI(k)}
            >
              <i aria-hidden="true" />
              <span>
                {String(k + 1).padStart(2, '0')} {v.legende}
              </span>
            </button>
          ))}
        </div>
        {mouvement ? (
          <button type="button" className="hero__pause" onClick={() => setLecture((l) => !l)} aria-label={lecture ? 'Mettre en pause le défilement' : 'Reprendre le défilement'}>
            {lecture ? <Pause /> : <Play />}
          </button>
        ) : null}
      </div>
    </section>
  );
}
