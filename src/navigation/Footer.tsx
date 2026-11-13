import { useLocation } from 'react-router';
import { ENTITES } from '../data/contenu';
import { SITE, contact, coordonneesPour } from '../data/site';
import { Phone } from '../design/Icons';
import { Arcs, Bouton, Oeil } from '../design/ui';
import { TransitionLink } from './TransitionLink';

/** L'appel à contacter le Groupe, puis le pied de page : la devise en grand, les entités, les coordonnées. */
export function Footer() {
  const { pathname } = useLocation();
  const tel = SITE.telephones[0];
  const coord = coordonneesPour(pathname);
  return (
    <>
      {pathname !== '/contact' && (
        <section className="appel" aria-labelledby="appel-titre">
          <Arcs />
          <div className="cadre appel__contenu">
            <Oeil clair>Contact.</Oeil>
            <h2 className="t2" id="appel-titre">
              Un besoin en énergie ? <em>Parlons-en.</em>
            </h2>
            <p>GPL en vrac, bouteilles de gaz, produits pétroliers ou partenariat : nos équipes vous répondent.</p>
            <div className="appel__actions">
              <Bouton to={contact()} variante="blanc" label="Contact">
                Contactez-nous
              </Bouton>
              <a className="btn btn--clair" href={tel.lien}>
                <span>{tel.affiche}</span>
                <i aria-hidden="true">
                  <Phone />
                </i>
              </a>
            </div>
          </div>
        </section>
      )}

      <footer className="pied">
        <div className="cadre">
          <p className="pied__devise">
            Une vision, une ambition, <em>plusieurs horizons.</em>
          </p>
          <div className="pied__grille">
            <div className="pied__marque">
              <img src="/logo-sanol.png" alt="" width="96" height="70" loading="lazy" />
              <p>{SITE.slogan}</p>
            </div>
            <nav aria-label="Le Groupe">
              <h2>Le Groupe</h2>
              <ul role="list">
                <li>
                  <TransitionLink to="/groupe">Notre histoire</TransitionLink>
                </li>
                <li>
                  <TransitionLink to="/trading-supply-chain">Trading &amp; Supply Chain</TransitionLink>
                </li>
                <li>
                  <TransitionLink to="/contact">Contact</TransitionLink>
                </li>
              </ul>
            </nav>
            <nav aria-label="Nos entités">
              <h2>Nos entités</h2>
              <ul role="list">
                {ENTITES.map((e) => (
                  <li key={e.slug}>
                    <TransitionLink to={`/${e.slug}`}>{e.marque}</TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2>Coordonnées</h2>
              <address>
                {coord.adresses.map((a, k) => (
                  <span key={a}>
                    {k > 0 ? <br /> : null}
                    {a}
                  </span>
                ))}
              </address>
              <ul role="list">
                <li>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                {coord.telephones.map((t, k) => (
                  <li key={t?.lien ?? `tel-${k}`}>{t ? <a href={t.lien}>{t.affiche}</a> : <span>+228 XX XX XX XX</span>}</li>
                ))}
                <li>
                  <a href={SITE.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pied__bas">
            <span>© 2026 {SITE.nom} · Lomé, Togo</span>
            {/* La signature du réalisateur : nouvel onglet, sans transmettre la page d'origine. */}
            <a href="https://liveydream.com/" target="_blank" rel="noopener noreferrer">
              SITE RÉALISÉ PAR LIVE Y DREAM
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
