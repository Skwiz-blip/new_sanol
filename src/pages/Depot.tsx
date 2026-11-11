import { useRef } from 'react';
import type { PhotoId } from '../data/photos';
import { SITE, contact } from '../data/site';
import { Lines } from '../design/Lines';
import { PageHero } from '../design/PageHero';
import { Bouton, Oeil, Photo } from '../design/ui';
import { useReveal } from '../motion/useReveal';
import { Chaine } from '../sections/Chaine';
import { CartesEntites } from '../sections/Entites';
import { Chiffres, Mosaique } from '../sections/blocs';
import { useSeo } from '../seo';

const ACTIVITES: { titre: string; texte: string; photo: PhotoId }[] = [
  { titre: 'La réception', texte: 'Le GPL arrive par voie maritime, à bord d’un tanker.', photo: 'zonePortuaire' },
  { titre: 'Le stockage', texte: 'Le produit est stocké dans une sphère construite sous talus.', photo: 'sphereSol' },
  { titre: 'La distribution', texte: 'Les camions-citernes sont chargés depuis trois baies de chargement.', photo: 'baiesDrone' },
];

export default function Depot() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  useSeo({
    title: 'Dépôt GPL SANOU SA · Katanga',
    description:
      'Le Dépôt GPL SANOU SA, dans la zone portuaire de Lomé (Katanga) : réception par voie maritime, stockage en sphère sous talus et distribution du GPL par camions-citernes.',
    path: '/depot-gpl',
  });
  return (
    <div ref={ref}>
      <PageHero
        photo="sphere"
        fil="Dépôt GPL"
        oeil="Dépôt GPL SANOU SA · Katanga."
        lignes={['Recevoir, stocker,', 'distribuer le GPL.']}
        chapo="Implanté dans la zone portuaire, quartier Katanga, le dépôt renforce le positionnement du Groupe dans le secteur du gaz."
      />

      <section className="bande" aria-labelledby="activites-titre">
        <div className="cadre">
          <div className="tete">
            <div>
              <Oeil>Nos activités.</Oeil>
              <Lines className="t2" id="activites-titre" lines={['Trois activités,', <em key="e">un même site.</em>]} />
            </div>
            <p className="tete__texte" data-reveal="fade">
              Réception par voie maritime, stockage et distribution du GPL : le dépôt réunit les trois métiers sur un même site.
            </p>
          </div>
          <ol className="trio" role="list" data-reveal="stagger">
            {ACTIVITES.map((a, k) => (
              <li key={a.titre}>
                <Photo id={a.photo} />
                <span className="mono">{String(k + 1).padStart(2, '0')}</span>
                <h3>{a.titre}</h3>
                <p>{a.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Chaine />
      <Chiffres />

      <section className="bande bande--ciel" aria-labelledby="pratique-titre">
        <div className="cadre duo">
          <div className="duo__tete">
            <Oeil>Informations pratiques.</Oeil>
            <Lines className="t2" id="pratique-titre" lines={['Venir charger', <em key="e">au dépôt.</em>]} />
            <Bouton to={contact('vrac')} label="Contact">
              Contacter le dépôt
            </Bouton>
          </div>
          <dl className="fiche" data-reveal="stagger">
            <div>
              <dt>Horaires</dt>
              <dd>{SITE.horairesDepot}</dd>
            </div>
            <div>
              <dt>Adresse</dt>
              <dd>{SITE.depot}</dd>
            </div>
            <div>
              <dt>Chargement</dt>
              <dd>3 baies de chargement de camions-citernes</dd>
            </div>
            <div>
              <dt>Avant chargement</dt>
              <dd>Contrôle sécuritaire de chaque camion-citerne</dd>
            </div>
            <div>
              <dt>Parking</dt>
              <dd>Une flotte de 100 camions-citernes et plus</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bande" aria-labelledby="images-titre">
        <div className="cadre">
          <div className="tete">
            <div>
              <Oeil>En images.</Oeil>
              <Lines className="t2" id="images-titre" lines={['Les installations,', <em key="e">les équipes, les opérations.</em>]} />
            </div>
          </div>
          <Mosaique photos={['vueAerienne', 'inscription', 'raccordement', 'camionsBaies', 'operateurs', 'conduites', 'equipeBaies', 'consignes', 'spheresCiel']} />
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
          <CartesEntites sauf="depot-gpl" />
        </div>
      </section>
    </div>
  );
}
