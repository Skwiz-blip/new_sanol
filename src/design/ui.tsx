import { useState, type ReactNode } from 'react';
import { PHOTOS, type PhotoId } from '../data/photos';
import { TransitionLink } from '../navigation/TransitionLink';
import { ArrowDown, ArrowRight, Plus } from './Icons';

/** Photographie du registre : cadrage, chargement différé, révélation et parallaxe au défilement. */
export function Photo({
  id,
  className,
  priority,
  reveal,
  parallax,
}: {
  id: PhotoId;
  className?: string;
  priority?: boolean;
  reveal?: boolean;
  parallax?: number;
}) {
  const p = PHOTOS[id];
  const [echec, setEchec] = useState(false);
  return (
    <div className={['photo', className].filter(Boolean).join(' ')} data-reveal={reveal ? 'media' : undefined} data-parallax={parallax || undefined}>
      {echec ? (
        <div className="photo__repli" role="img" aria-label={p.alt}>
          {p.alt}
        </div>
      ) : (
        <img
          src={p.src}
          alt={p.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          style={{ objectPosition: 'focus' in p ? p.focus : undefined }}
          onError={() => setEchec(true)}
        />
      )}
    </div>
  );
}

/** Sur-titre : le libellé en capitales. */
export function Oeil({ children, clair }: { children: ReactNode; clair?: boolean }) {
  return (
    <p className={`oeil${clair ? ' oeil--clair' : ''}`}>
      {children}
    </p>
  );
}

const ICONES = { plus: Plus, droite: ArrowRight, bas: ArrowDown };

/** Bouton en deux cases : le libellé, puis l'icône. */
export function Bouton({
  to,
  children,
  variante = 'rouge',
  icone = 'plus',
  label,
}: {
  to: string;
  children: ReactNode;
  variante?: 'rouge' | 'bleu' | 'blanc' | 'clair' | 'encre';
  icone?: keyof typeof ICONES;
  label?: string;
}) {
  const Icone = ICONES[icone];
  return (
    <TransitionLink to={to} className={`btn btn--${variante}`} label={label}>
      <span>{children}</span>
      <i aria-hidden="true">
        <Icone />
      </i>
    </TransitionLink>
  );
}

/** Lien souligné en capitales, avec son signe « plus ». */
export function Lien({ to, children, label }: { to: string; children: ReactNode; label?: string }) {
  return (
    <TransitionLink to={to} className="lien" label={label}>
      {children}
      <Plus aria-hidden="true" />
    </TransitionLink>
  );
}

export const Coche = () => (
  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.14" />
    <path d="M5.8 10.4l2.7 2.7 5.7-5.9" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Le motif du logo : les arcs concentriques rouge et bleu. */
export function Arcs({ className }: { className?: string }) {
  return (
    <svg className={['arcs', className].filter(Boolean).join(' ')} viewBox="0 0 600 600" fill="none" aria-hidden="true">
      {[270, 214, 158, 102, 46].map((r, k) => (
        <circle key={r} cx="300" cy="300" r={r} strokeWidth="30" className={k % 2 ? 'arcs__b' : 'arcs__a'} />
      ))}
    </svg>
  );
}
