import { useRef } from 'react';
import { contact } from '../data/site';
import { Lines } from '../design/Lines';
import { PageHero } from '../design/PageHero';
import { Bouton, Oeil } from '../design/ui';
import { useReveal } from '../motion/useReveal';
import { CartesEntites } from '../sections/Entites';
import { useSeo } from '../seo';

const METIERS = [
  { titre: 'Les stations-service', texte: 'Un réseau de stations-service, premier métier du Groupe depuis 2007.' },
  { titre: 'Les produits pétroliers', texte: 'La distribution des produits pétroliers, au plus près des clients.' },
  { titre: 'Les shops', texte: 'Des espaces commerciaux qui offrent des produits et services de proximité.' },
];

export default function Stations() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  useSeo({
    title: 'SANOL · Stations-service et shops',
    description: 'SANOL : la distribution des produits pétroliers à travers un réseau de stations-service et d’espaces commerciaux (shops).',
    path: '/stations',
  });
  return (
    <div ref={ref}>
      <PageHero
        photo="stationPompiste"
        fil="Stations-service"
        oeil="SANOL · Stations-service et shops."
        lignes={['Les produits pétroliers,', 'au plus près de vous.']}
        chapo="Le premier métier du Groupe, depuis sa création en 2007 sous l’appellation SANOL."
      />

      <section className="bande" aria-labelledby="stations-titre">
        <div className="cadre duo">
          <div className="duo__tete">
            <Oeil>Notre réseau.</Oeil>
            <Lines className="t2" id="stations-titre" lines={['Des stations,', <em key="e">et des services de proximité.</em>]} />
            <Bouton to={contact('carburants')} label="Contact">
              Nous contacter
            </Bouton>
          </div>
          <div className="prose" data-reveal="fade">
            <p className="chapo">
              Le Groupe est présent dans la distribution des produits pétroliers à travers son réseau de stations-service. Il propose
              également des espaces commerciaux (shops), destinés à offrir aux clients des produits et services de proximité.
            </p>
          </div>
        </div>
        <div className="cadre">
          <ol className="valeurs valeurs--trois" role="list" data-reveal="stagger">
            {METIERS.map((m, k) => (
              <li key={m.titre}>
                <span className="mono">{String(k + 1).padStart(2, '0')}</span>
                <h3>{m.titre}</h3>
                <p>{m.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bande bande--ciel" aria-label="Les autres entités">
        <div className="cadre">
          <div className="tete">
            <div>
              <Oeil>Poursuivre.</Oeil>
              <h2 className="t2">
                Les autres entités <em>du Groupe.</em>
              </h2>
            </div>
          </div>
          <CartesEntites sauf="stations" />
        </div>
      </section>
    </div>
  );
}
