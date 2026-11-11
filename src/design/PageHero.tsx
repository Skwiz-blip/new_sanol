import type { ReactNode } from 'react';
import type { PhotoId } from '../data/photos';
import { TransitionLink } from '../navigation/TransitionLink';
import { Oeil, Photo } from './ui';

/** Bandeau d'ouverture des pages intérieures : grande photographie, fil d'Ariane, titre en capitales. */
export function PageHero({
  photo,
  oeil,
  lignes,
  chapo,
  fil,
}: {
  photo: PhotoId;
  oeil: string;
  lignes: ReactNode[];
  chapo?: string;
  fil: string;
}) {
  return (
    <section className="phero">
      <Photo id={photo} priority className="phero__fond" />
      <span className="phero__voile" aria-hidden="true" />
      <div className="cadre phero__contenu">
        <nav className="fil" aria-label="Fil d’Ariane">
          <TransitionLink to="/" label="Accueil">
            Accueil
          </TransitionLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{fil}</span>
        </nav>
        <Oeil clair>{oeil}</Oeil>
        <h1 className="t1">
          {lignes.map((l, k) => (
            <span className="line-mask" key={k}>
              <span>{l}</span>
            </span>
          ))}
        </h1>
        {chapo ? <p className="phero__chapo">{chapo}</p> : null}
      </div>
    </section>
  );
}
