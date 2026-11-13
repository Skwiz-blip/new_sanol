import { CHIFFRES, EXPERTISES, FLUX, GARANTIES } from '../data/contenu';
import type { PhotoId } from '../data/photos';
import { Lines } from '../design/Lines';
import { Bouton, Lien, Oeil, Photo } from '../design/ui';

/** Le Groupe en quelques lignes, sa grande photographie et ses repères. */
export function Intro() {
  return (
    <section className="bande intro" aria-labelledby="intro-titre">
      <div className="cadre intro__grille">
        <div>
          <Oeil>Le Groupe.</Oeil>
          <Lines className="t2" id="intro-titre" lines={['Bâtir aujourd’hui,', <em key="e">développer demain.</em>]} />
        </div>
        <div className="intro__texte" data-reveal="fade">
          <p className="chapo">
            Créé en 2007 sous l’appellation SANOL, le Groupe SANOU SA est né d’une ambition entrepreneuriale, portée par une volonté de
            croissance et de développement dans le secteur des hydrocarbures.
          </p>
          <p>
            Aujourd’hui, il fédère trois entités complémentaires autour d’une même vision : développer ses activités, consolider son
            expertise et explorer de nouvelles perspectives de croissance.
          </p>
          <Lien to="/groupe" label="Le Groupe">
            Notre histoire
          </Lien>
        </div>
      </div>
      <div className="cadre">
        <div className="intro__visuel">
          <Photo id="controle" reveal parallax={0.1} />
        </div>
        <dl className="reperes" data-reveal="stagger">
          <div>
            <dt>Création, sous l’appellation SANOL</dt>
            <dd>2007</dd>
          </div>
          <div>
            <dt>Entités complémentaires</dt>
            <dd>3</dd>
          </div>
          <div>
            <dt>Étapes maîtrisées, du tanker au camion-citerne</dt>
            <dd>6</dd>
          </div>
          <div>
            <dt>Camions-citernes accueillis au dépôt</dt>
            <dd>
              <small>≥</small> 100
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/** Le dépôt en chiffres, puis ses garanties de sécurité. */
export function Chiffres() {
  return (
    <section className="bande chiffres" aria-labelledby="chiffres-titre">
      <div className="cadre">
        <div className="tete">
          <div>
            <Oeil>Le dépôt en chiffres.</Oeil>
            <Lines className="t2" id="chiffres-titre" lines={['Des installations', <em key="e">à la mesure de l’ambition.</em>]} />
          </div>
          <p className="tete__texte" data-reveal="fade">
            À Katanga, dans la zone portuaire, le Dépôt GPL SANOU SA reçoit, stocke et distribue le GPL depuis février 2026.
          </p>
        </div>
        <ul className="cartes-chiffres" role="list" data-reveal="stagger">
          {CHIFFRES.map((c) => (
            <li key={c.libelle} className={`chiffre chiffre--${c.ton}`}>
              <span className="chiffre__valeur">
                {c.valeur}
                {c.suite ? <small>{c.suite}</small> : null}
              </span>
              <span className="chiffre__libelle">{c.libelle}</span>
            </li>
          ))}
        </ul>
        <div className="garanties">
          <div className="garanties__photo">
            <Photo id="camionSphere" reveal parallax={0.08} />
          </div>
          <ol role="list" data-reveal="stagger">
            {GARANTIES.map((g, k) => (
              <li key={g.titre}>
                <span className="mono">{String(k + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{g.titre}</h3>
                  <p>{g.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** La stratégie Trading & Supply Chain : le flux, puis les quatre expertises. */
export function Trading({ complet }: { complet?: boolean }) {
  return (
    <section className="bande bande--ciel trading" aria-labelledby="trading-titre">
      <div className="cadre">
        <ol className="flux" role="list" data-reveal="stagger" aria-label="De l’achat à la distribution">
          {FLUX.map((f, k) => (
            <li key={f}>
              <span className="mono">{String(k + 1).padStart(2, '0')}</span>
              {f}
            </li>
          ))}
        </ol>
        <div className="trading__grille">
          <div className="trading__tete">
            <Oeil>Trading &amp; Supply Chain.</Oeil>
            <Lines className="t2" id="trading-titre" lines={['De l’achat du produit', <em key="e">jusqu’à sa distribution.</em>]} />
            <p className="chapo" data-reveal="fade">
              Le Groupe organise et coordonne les différentes étapes de la chaîne d’approvisionnement, depuis l’achat et la réception du
              produit jusqu’à sa distribution.
            </p>
            {!complet && (
              <Bouton to="/trading-supply-chain" variante="encre" label="Trading">
                Notre stratégie
              </Bouton>
            )}
          </div>
          <ol className="expertises" role="list" data-reveal="stagger">
            {EXPERTISES.map((x, k) => (
              <li key={x.titre}>
                <span className="mono">{String(k + 1).padStart(2, '0')}</span>
                <h3>{x.titre}</h3>
                <p>{x.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const RANG_A: PhotoId[] = ['sphereSol', 'baiesDrone', 'operateurs', 'camionsBaies', 'siegeDrone', 'conduites'];
const RANG_B: PhotoId[] = ['equipeBaies', 'inscription', 'agent', 'spheresCiel', 'raccordement', 'flexibles'];

/** Deux rangées de photographies qui défilent lentement, en sens opposés. */
export function Galerie() {
  return (
    <section className="bande galerie" aria-labelledby="galerie-titre">
      <div className="cadre tete">
        <div>
          <Oeil>En images.</Oeil>
          <Lines className="t2" id="galerie-titre" lines={['Le dépôt,', <em key="e">tel qu’il est.</em>]} />
        </div>
        <div data-reveal="fade">
          <Lien to="/depot-gpl" label="Dépôt GPL">
            Visiter le dépôt
          </Lien>
        </div>
      </div>
      <div className="defile" aria-hidden="true">
        <div className="defile__rang">
          {[...RANG_A, ...RANG_A].map((id, k) => (
            <Photo key={k} id={id} />
          ))}
        </div>
        <div className="defile__rang defile__rang--inverse">
          {[...RANG_B, ...RANG_B].map((id, k) => (
            <Photo key={k} id={id} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Grille de photographies, pour les pages intérieures. */
export function Mosaique({ photos }: { photos: PhotoId[] }) {
  return (
    <ul className="mosaique" role="list">
      {photos.map((id) => (
        <li key={id}>
          <Photo id={id} reveal />
        </li>
      ))}
    </ul>
  );
}
