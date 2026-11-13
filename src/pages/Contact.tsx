import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router';
import { OBJETS, SITE } from '../data/site';
import { Mail, Phone, Pin } from '../design/Icons';
import { PageHero } from '../design/PageHero';
import { useReveal } from '../motion/useReveal';
import { useSeo } from '../seo';

type Etat = { type: 'idle' } | { type: 'sending' } | { type: 'ok' } | { type: 'error'; message: string };

/**
 * Formulaire branché sur l'endpoint Payload existant (POST /api/contact).
 * Sans JS, le formulaire s'envoie normalement (action + method).
 */
export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [etat, setEtat] = useState<Etat>({ type: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { search } = useLocation();
  // ?objet=vrac : l'objet est pré-sélectionné (après hydratation, la page étant prérendue)
  useEffect(() => {
    const id = new URLSearchParams(search).get('objet');
    const o = OBJETS.find((x) => x.id === id);
    const sel = ref.current?.querySelector<HTMLSelectElement>('select[name="objet"]');
    if (o && sel) sel.value = o.libelle;
  }, [search]);
  useReveal(ref);
  useSeo({
    title: 'Contact',
    description: `Contacter le ${SITE.nom}. Siège social : ${SITE.siege}. Dépôt GPL : ${SITE.depot}. ${SITE.email}.`,
    path: '/contact',
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    if (!String(data.get('nom') ?? '').trim()) errs.nom = 'Indiquez votre nom.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email') ?? ''))) errs.email = 'Indiquez une adresse e-mail valide.';
    if (!String(data.get('objet') ?? '').trim()) errs.objet = 'Choisissez un objet.';
    if (String(data.get('message') ?? '').trim().length < 10) errs.message = 'Votre message doit contenir au moins 10 caractères.';
    if (!data.get('consentement')) errs.consentement = 'Votre accord est nécessaire pour traiter la demande.';
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setEtat({ type: 'sending' });
    try {
      const res = await fetch(SITE.apiContact, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      if (!res.ok) throw new Error(String(res.status));
      setEtat({ type: 'ok' });
      form.reset();
    } catch {
      setEtat({
        type: 'error',
        message: `L’envoi n’a pas abouti. Réessayez dans un instant, ou écrivez directement à ${SITE.email}.`,
      });
    }
  };

  const field = (name: string) => ({
    id: `f-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `e-${name}` : undefined,
  });
  const err = (name: string) =>
    errors[name] ? (
      <p className="champ__erreur" id={`e-${name}`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <div ref={ref}>
      <PageHero
        photo="siege"
        fil="Contact"
        oeil="Contact."
        lignes={['Parlons de', 'vos besoins.']}
        chapo="GPL en vrac, bouteilles de gaz, produits pétroliers ou partenariat : décrivez votre besoin, nos équipes vous répondent."
      />
      <section className="bande" aria-label="Coordonnées et formulaire">
        <div className="cadre contact">
          <aside className="contact__infos" data-reveal="stagger">
            <div className="contact__carte">
              <Pin />
              <div>
                <h2>Siège social</h2>
                <p>{SITE.siege}</p>
              </div>
            </div>
            <div className="contact__carte">
              <Pin />
              <div>
                <h2>Dépôt GPL SANOU SA</h2>
                <p>{SITE.depot}</p>
                <p>{SITE.horairesDepot}</p>
              </div>
            </div>
            <div className="contact__carte">
              <Pin />
              <div>
                <h2>SANOL GAZ, Centre Emplisseur</h2>
                <p>{SITE.centre}</p>
              </div>
            </div>
            <div className="contact__carte">
              <Phone />
              <div>
                <h2>Téléphone</h2>
                {SITE.telephones.map((t) => (
                  <a key={t.lien} href={t.lien}>
                    {t.affiche}
                  </a>
                ))}
              </div>
            </div>
            <div className="contact__carte">
              <Mail />
              <div>
                <h2>E-mail</h2>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </div>
          </aside>

          <form className="formulaire" action={SITE.apiContact} method="post" noValidate onSubmit={submit} id="formulaire" data-reveal="fade">
            <h2 className="t3">Votre demande</h2>
            <p className="formulaire__note">Les champs marqués * sont obligatoires.</p>
            <div className="formulaire__paire">
              <div className="champ">
                <label htmlFor="f-nom">Nom et prénom *</label>
                <input {...field('nom')} autoComplete="name" required />
                {err('nom')}
              </div>
              <div className="champ">
                <label htmlFor="f-societe">Société</label>
                <input {...field('societe')} autoComplete="organization" />
              </div>
            </div>
            <div className="formulaire__paire">
              <div className="champ">
                <label htmlFor="f-email">E-mail *</label>
                <input {...field('email')} type="email" autoComplete="email" required />
                {err('email')}
              </div>
              <div className="champ">
                <label htmlFor="f-telephone">Téléphone</label>
                <input {...field('telephone')} type="tel" autoComplete="tel" />
              </div>
            </div>
            <div className="champ">
              <label htmlFor="f-objet">Objet *</label>
              <select {...field('objet')} required defaultValue="">
                <option value="" disabled>
                  Choisir un objet
                </option>
                {OBJETS.map((o) => (
                  <option key={o.id}>{o.libelle}</option>
                ))}
              </select>
              {err('objet')}
            </div>
            <div className="champ">
              <label htmlFor="f-message">Message *</label>
              <textarea {...field('message')} rows={6} required />
              {err('message')}
            </div>
            <div className="champ champ--piege" aria-hidden="true">
              <label htmlFor="f-site">Ne pas remplir</label>
              <input id="f-site" name="site" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="champ champ--case">
              <input {...field('consentement')} type="checkbox" value="1" />
              <label htmlFor="f-consentement">
                J’accepte que mes données soient utilisées pour traiter ma demande. Elles sont conservées six mois, puis supprimées.
              </label>
              {err('consentement')}
            </div>
            <div className="formulaire__actions">
              <button type="submit" className="btn btn--rouge" disabled={etat.type === 'sending'}>
                <span>{etat.type === 'sending' ? 'Envoi…' : 'Envoyer le message'}</span>
                <i aria-hidden="true">
                  <Mail />
                </i>
              </button>
              <p className="formulaire__etat" role="status" aria-live="polite">
                {etat.type === 'ok' && 'Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement.'}
                {etat.type === 'error' && etat.message}
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
