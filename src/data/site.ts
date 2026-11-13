/**
 * Données institutionnelles : une seule source pour l'en-tête, le pied de
 * page, le contact et le référencement. Les valeurs viennent du document
 * « Informations complémentaires pour le site » fourni par le Groupe.
 */
export const SITE = {
  nom: 'GROUPE SANOU SA',
  devise: 'Une vision, une ambition, plusieurs horizons.',
  /** Le slogan de la marque Sanol. */
  slogan: 'Sanol, l’énergie en mouvement, au service de tous.',
  promesse: 'Bâtir aujourd’hui, développer demain.',
  url: 'https://sanou-sa.com',
  siege: 'Adidoadin, Lomé',
  depot: 'Zone portuaire, quartier Katanga, Lomé',
  centre: 'Kpogan',
  horairesDepot: 'Du lundi au vendredi, de 7 h à 17 h',
  pdg: 'Monsieur SANOU Komi',
  email: 'contact@sanou-sa.com',
  telephones: [
    { affiche: '+228 22 70 77 76', lien: 'tel:+22822707776' },
    { affiche: '+228 90 32 79 71', lien: 'tel:+22890327971' },
  ],
  facebook: 'https://facebook.com/sanol.togo',
  /** Point d'entrée du formulaire : l'endpoint Payload existant (apps/site). */
  apiContact: (import.meta.env.VITE_API_URL ?? '') + '/api/contact',
} as const;

/**
 * Les coordonnées du pied de page, propres à chaque onglet.
 * Un téléphone à `null` n'est pas encore communiqué : il s'affiche « +228 XX XX XX XX », sans lien.
 */
export type Telephone = { affiche: string; lien: string };
export type Coordonnees = { adresses: string[]; telephones: (Telephone | null)[] };

const siegeSeul = (): Coordonnees => ({ adresses: [`Siège social : ${SITE.siege}`], telephones: [null] });

export const COORDONNEES: Record<string, Coordonnees> = {
  '/': siegeSeul(),
  '/groupe': siegeSeul(),
  '/depot-gpl': {
    adresses: [`Siège social : ${SITE.siege}`, `Dépôt GPL : ${SITE.depot}`],
    telephones: [...SITE.telephones],
  },
  '/sanol-gaz': siegeSeul(),
  '/stations': siegeSeul(),
  '/trading-supply-chain': siegeSeul(),
  '/contact': siegeSeul(),
};

export const coordonneesPour = (pathname: string): Coordonnees => COORDONNEES[pathname.replace(/\/+$/, '') || '/'] ?? siegeSeul();

export type NavItem = { libelle: string; href: string; court?: string };

export const NAVIGATION: NavItem[] = [
  { libelle: 'Le Groupe', href: '/groupe' },
  { libelle: 'Dépôt GPL', href: '/depot-gpl' },
  { libelle: 'Sanol Gaz', href: '/sanol-gaz' },
  { libelle: 'Stations-service', href: '/stations' },
  { libelle: 'Trading & Supply Chain', href: '/trading-supply-chain', court: 'Trading' },
  { libelle: 'Contact', href: '/contact' },
];

/** Objets du formulaire de contact : ?objet=vrac pré-sélectionne la bonne ligne. */
export type ObjetId = 'vrac' | 'revendeur' | 'bouteilles' | 'carburants' | 'partenariat' | 'presse' | 'autre';
export const OBJETS: { id: ObjetId; libelle: string }[] = [
  { id: 'vrac', libelle: 'GPL en vrac (dépôt)' },
  { id: 'bouteilles', libelle: 'Bouteilles de gaz Sanol Gaz' },
  { id: 'revendeur', libelle: 'Devenir revendeur agréé' },
  { id: 'carburants', libelle: 'Stations-service et produits pétroliers' },
  { id: 'partenariat', libelle: 'Partenariat' },
  { id: 'presse', libelle: 'Presse' },
  { id: 'autre', libelle: 'Autre demande' },
];

export const contact = (objet?: ObjetId) => (objet ? `/contact?objet=${objet}#formulaire` : '/contact#formulaire');
