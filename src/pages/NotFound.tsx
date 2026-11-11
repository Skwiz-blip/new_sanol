import { Arcs, Bouton, Oeil } from '../design/ui';
import { useSeo } from '../seo';

export default function NotFound() {
  useSeo({ title: 'Page introuvable', description: 'Cette page n’existe pas ou a été déplacée.', path: '/404' });
  return (
    <section className="introuvable">
      <Arcs />
      <div className="cadre">
        <Oeil clair>Erreur 404.</Oeil>
        <h1 className="t1">Page introuvable.</h1>
        <p>Cette page n’existe pas, ou elle a été déplacée.</p>
        <Bouton to="/" variante="blanc" label="Accueil">
          Revenir à l’accueil
        </Bouton>
      </div>
    </section>
  );
}
