import { useRef } from 'react';
import { FORMATS } from '../data/contenu';
import { contact } from '../data/site';
import { Lines } from '../design/Lines';
import { PageHero } from '../design/PageHero';
import { Bouton, Oeil, Photo } from '../design/ui';
import { useReveal } from '../motion/useReveal';
import { CartesEntites } from '../sections/Entites';
import { useSeo } from '../seo';

const OPERATIONS = [
  { titre: 'Les installations', texte: 'Un Centre Emplisseur implanté à Kpogan.' },
  { titre: 'L’emplissage', texte: 'Les opérations d’emplissage des bouteilles de gaz.' },
  { titre: 'Les bouteilles SANOL', texte: 'Des bouteilles de marque SANOL, en trois formats.' },
];

export default function SanolGaz() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  useSeo({
    title: 'SANOL GAZ · Centre Emplisseur de Kpogan',
    description: 'SANOL GAZ : le Centre Emplisseur de Kpogan et les bouteilles de gaz de marque SANOL, en 6, 12,5 et 50 kg.',
    path: '/sanol-gaz',
  });
  return (
    <div ref={ref}>
      <PageHero
        photo="sanolGaz"
        fil="Sanol Gaz"
        oeil="SANOL GAZ · Centre Emplisseur de Kpogan."
        lignes={['Le gaz en bouteille,', 'de marque SANOL.']}
        chapo="Avec SANOL GAZ, le Groupe a élargi son champ d’intervention au secteur gazier."
      />

      <section className="bande" aria-labelledby="centre-titre">
        <div className="cadre duo duo--image">
          <div className="duo__visuel">
            <Photo id="centreEmplisseur" reveal />
          </div>
          <div>
            <Oeil>Le Centre Emplisseur.</Oeil>
            <Lines className="t2" id="centre-titre" lines={['À Kpogan,', <em key="e">l’emplissage des bouteilles.</em>]} />
            <div className="prose" data-reveal="fade">
              <p>
                Le Groupe a progressivement élargi son champ d’intervention au secteur gazier, avec la création de SANOL GAZ et la mise en
                place de son Centre Emplisseur, situé à Kpogan.
              </p>
            </div>
            <ol className="liste-rang" role="list" data-reveal="stagger">
              {OPERATIONS.map((o, k) => (
                <li key={o.titre}>
                  <span className="mono">{String(k + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{o.titre}</h3>
                    <p>{o.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bande bande--bleu" aria-labelledby="formats-titre">
        <div className="cadre">
          <div className="tete">
            <div>
              <Oeil clair>Les bouteilles SANOL.</Oeil>
              <h2 className="t2" id="formats-titre">
                Trois formats, <em>une même marque.</em>
              </h2>
            </div>
            <div data-reveal="fade">
              <Bouton to={contact('bouteilles')} variante="blanc" label="Contact">
                Commander des bouteilles
              </Bouton>
            </div>
          </div>
          <ul className="formats" role="list" data-reveal="stagger">
            {FORMATS.map((f) => {
              const [nombre, unite] = f.valeur.split(' ');
              return (
                <li key={f.valeur} className={f.photo ? 'formats__avec-photo' : undefined}>
                  {f.photo ? <Photo id={f.photo} className="formats__photo" /> : null}
                  <span className="formats__valeur">
                    {nombre}
                    <small>{unite}</small>
                  </span>
                  <span className="formats__libelle">Bouteille de gaz SANOL</span>
                </li>
              );
            })}
          </ul>
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
          <CartesEntites sauf="sanol-gaz" />
        </div>
      </section>
    </div>
  );
}
