import { useRef } from 'react';
import { HISTOIRE, VALEURS } from '../data/contenu';
import { SITE } from '../data/site';
import { Lines } from '../design/Lines';
import { PageHero } from '../design/PageHero';
import { Oeil, Photo } from '../design/ui';
import { useReveal } from '../motion/useReveal';
import { CartesEntites } from '../sections/Entites';
import { useSeo } from '../seo';

export default function Groupe() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  useSeo({
    title: 'Le Groupe',
    description:
      'Créé en 2007 sous l’appellation SANOL, le GROUPE SANOU SA fédère trois entités : le Dépôt GPL SANOU SA, SANOL GAZ et les stations-service SANOL.',
    path: '/groupe',
  });
  return (
    <div ref={ref}>
      <PageHero
        photo="sphere"
        fil="Le Groupe"
        oeil="Le Groupe."
        lignes={['Une vision,', 'une ambition,', 'plusieurs horizons.']}
        chapo={SITE.promesse}
      />

      <section className="bande" aria-labelledby="histoire-titre">
        <div className="cadre duo">
          <div className="duo__tete">
            <Oeil>Notre histoire.</Oeil>
            <Lines className="t2" id="histoire-titre" lines={['Né en 2007,', <em key="e">tourné vers demain.</em>]} />
          </div>
          <div className="prose" data-reveal="fade">
            <p className="chapo">
              Créé en 2007 sous l’appellation SANOL, le Groupe SANOU SA est né d’une ambition entrepreneuriale, portée par une volonté de
              croissance et de développement dans le secteur des hydrocarbures.
            </p>
            <p>
              Fort de son parcours et de son expérience, le Groupe entend inscrire son développement dans une dynamique durable, fondée sur
              le professionnalisme, la qualité de service, la sécurité et la recherche permanente de nouvelles opportunités.
            </p>
          </div>
        </div>
        <div className="cadre">
          <ol className="frise" role="list" data-reveal="stagger">
            {HISTOIRE.map((h) => (
              <li key={h.titre}>
                <span className="frise__repere">{h.repere}</span>
                <h3>{h.titre}</h3>
                <p>{h.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bande bande--ciel" aria-labelledby="direction-titre">
        <div className="cadre duo duo--image">
          <div className="duo__visuel">
            <Photo id="siege" reveal parallax={0.08} />
          </div>
          <div>
            <Oeil>Direction.</Oeil>
            <Lines className="t2" id="direction-titre" lines={['Une expansion menée', <em key="e">avec détermination.</em>]} />
            <div className="prose" data-reveal="fade">
              <p>
                Avec son siège social situé à Adidoadin, et sous la direction de son Président-Directeur Général, {SITE.pdg}, le Groupe
                poursuit son expansion avec ambition et détermination.
              </p>
            </div>
            <dl className="fiche" data-reveal="stagger">
              <div>
                <dt>Président-Directeur Général</dt>
                <dd>{SITE.pdg}</dd>
              </div>
              <div>
                <dt>Siège social</dt>
                <dd>{SITE.siege}</dd>
              </div>
              <div>
                <dt>Création</dt>
                <dd>2007, sous l’appellation SANOL</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bande" aria-labelledby="valeurs-titre">
        <div className="cadre">
          <div className="tete">
            <div>
              <Oeil>Nos fondements.</Oeil>
              <Lines className="t2" id="valeurs-titre" lines={['Une dynamique durable,', <em key="e">quatre exigences.</em>]} />
            </div>
          </div>
          <ol className="valeurs" role="list" data-reveal="stagger">
            {VALEURS.map((v, k) => (
              <li key={v.titre}>
                <span className="mono">{String(k + 1).padStart(2, '0')}</span>
                <h3>{v.titre}</h3>
                <p>{v.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bande bande--ciel" aria-labelledby="entites-groupe">
        <div className="cadre">
          <div className="tete">
            <div>
              <Oeil>Nos entités.</Oeil>
              <Lines className="t2" id="entites-groupe" lines={['Trois entités,', <em key="e">une même vision.</em>]} />
            </div>
          </div>
          <CartesEntites />
        </div>
      </section>
    </div>
  );
}
