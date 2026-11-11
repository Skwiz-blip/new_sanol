import { useState } from 'react';
import { ENTITES } from '../data/contenu';
import { ArrowUpRight } from '../design/Icons';
import { Lines } from '../design/Lines';
import { Bouton, Coche, Oeil, Photo } from '../design/ui';
import { TransitionLink } from '../navigation/TransitionLink';

/** Les trois entités du Groupe en onglets alignés : photographie, description, activités. */
export function Entites() {
  const [i, setI] = useState(0);
  const e = ENTITES[i];
  return (
    <section className="bande bande--ciel entites" id="entites" aria-labelledby="entites-titre">
      <div className="cadre">
        <div className="tete">
          <div>
            <Oeil>Nos entités.</Oeil>
            <Lines className="t2" id="entites-titre" lines={['Trois entités,', <em key="e">une même vision.</em>]} />
          </div>
          <p className="tete__texte" data-reveal="fade">
            Chaque entité porte son métier. Ensemble, elles couvrent la chaîne de l’énergie, de la réception du GPL jusqu’au client.
          </p>
        </div>

        <div className="onglets" role="tablist" aria-label="Les entités du Groupe" data-reveal="fade">
          {ENTITES.map((x, k) => (
            <button
              key={x.slug}
              type="button"
              role="tab"
              id={`onglet-${x.slug}`}
              aria-selected={k === i}
              aria-controls="entite-panneau"
              className={`onglet${k === i ? ' is-active' : ''}`}
              onClick={() => setI(k)}
            >
              <span className="onglet__rang">{x.rang}</span>
              <span className="onglet__nom">{x.marque}</span>
              <span className="onglet__lieu">{x.lieu}</span>
            </button>
          ))}
        </div>

        <div className="entite" id="entite-panneau" role="tabpanel" aria-labelledby={`onglet-${e.slug}`} data-reveal="fade">
          <div className="entite__visuel">
            {ENTITES.map((x, k) => (
              <Photo key={x.slug} id={x.photo} className={k === i ? 'is-active' : ''} />
            ))}
            <span className="entite__etiquette">
              {e.marque} · {e.lieu}
            </span>
          </div>
          <div className="entite__texte" key={e.slug}>
            <span className="entite__rang" aria-hidden="true">
              {e.rang}
            </span>
            <h3 className="t3">{e.titre}</h3>
            <p>{e.resume}</p>
            <ul className="coches" role="list">
              {e.points.map((p) => (
                <li key={p}>
                  <Coche />
                  {p}
                </li>
              ))}
            </ul>
            <Bouton to={`/${e.slug}`} variante="bleu" label={e.marque}>
              Découvrir
            </Bouton>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Les mêmes entités en trois cartes, pour les pages intérieures. */
export function CartesEntites({ sauf }: { sauf?: string }) {
  return (
    <ul className="cartes-entites" role="list" data-reveal="stagger">
      {ENTITES.filter((e) => e.slug !== sauf).map((e) => (
        <li key={e.slug}>
          <TransitionLink to={`/${e.slug}`} className="carte-entite" label={e.marque}>
            <Photo id={e.photo} />
            <span className="carte-entite__voile" aria-hidden="true" />
            <span className="carte-entite__haut">
              <span>{e.rang}</span>
              <ArrowUpRight />
            </span>
            <span className="carte-entite__bas">
              <strong>{e.marque}</strong>
              <small>{e.lieu}</small>
            </span>
          </TransitionLink>
        </li>
      ))}
    </ul>
  );
}
