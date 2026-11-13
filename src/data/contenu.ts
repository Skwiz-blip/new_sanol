import type { PhotoId } from './photos';

/** Les trois entités du Groupe, dans l'ordre demandé par le Groupe. */
export type Entite = {
  slug: string;
  rang: string;
  marque: string;
  lieu: string;
  titre: string;
  resume: string;
  points: string[];
  photo: PhotoId;
};

export const ENTITES: Entite[] = [
  {
    slug: 'depot-gpl',
    rang: '01',
    marque: 'Dépôt GPL SANOU SA',
    lieu: 'Katanga',
    titre: 'Réception, stockage et distribution du GPL.',
    resume:
      'Implanté dans la zone portuaire, quartier Katanga, le dépôt reçoit le GPL par voie maritime, le stocke en sphère sous talus et le distribue par camions-citernes.',
    points: ['Réception par voie maritime (tanker)', 'Stockage en sphère sous talus', 'Distribution par camions-citernes'],
    photo: 'baies',
  },
  {
    slug: 'sanol-gaz',
    rang: '02',
    marque: 'SANOL GAZ',
    lieu: 'Centre Emplisseur de Kpogan',
    titre: 'L’emplissage des bouteilles de gaz de marque SANOL.',
    resume: 'À Kpogan, le Centre Emplisseur assure l’emplissage des bouteilles de gaz SANOL, proposées en 6, 12,5 et 50 kg.',
    points: ['Installations du Centre Emplisseur', 'Opérations d’emplissage', 'Bouteilles de 6, 12,5 et 50 kg'],
    photo: 'sanolGaz',
  },
  {
    slug: 'stations',
    rang: '03',
    marque: 'SANOL',
    lieu: 'Stations-service et shops',
    titre: 'Les produits pétroliers, au plus près des clients.',
    resume:
      'Depuis 2007, SANOL distribue les produits pétroliers à travers son réseau de stations-service, avec des espaces commerciaux (shops) qui offrent des produits et services de proximité.',
    points: ['Réseau de stations-service', 'Distribution de produits pétroliers', 'Espaces commerciaux (shops)'],
    photo: 'stationSanol',
  },
  
];

/** La chaîne d'approvisionnement du GPL, de la mer aux camions-citernes. */
export const CHAINE: { rang: string; titre: string; texte: string; photo: PhotoId }[] = [
  { rang: '01', titre: 'Approvisionnement maritime', texte: 'Arrivée du tanker transportant le GPL.', photo: 'navireApproche' },
  { rang: '02', titre: 'Accostage', texte: 'Arrivée et accostage du navire au quai.', photo: 'flexibles' },
  { rang: '03', titre: 'Opérations de réception', texte: 'Raccordement des flexibles entre le navire et les installations terrestres.', photo: 'accostage' },
  { rang: '04', titre: 'Stockage', texte: 'Acheminement du GPL vers les installations de stockage, notamment la sphère.', photo: 'sphereSol' },
  { rang: '05', titre: 'Transfert du produit', texte: 'Circulation du GPL à travers les pipelines, de la sphère jusqu’aux baies de chargement.', photo: 'raccordement' },
  { rang: '06', titre: 'Distribution', texte: 'Chargement du GPL dans les camions-citernes, vers les clients et les points de distribution.', photo: 'stationSanol' },
];

/** Le dépôt en chiffres : uniquement ce que le Groupe a communiqué. */
export const CHIFFRES: { valeur: string; suite?: string; libelle: string; ton: 'rouge' | 'bleu' | 'clair' }[] = [
  { valeur: '3', libelle: 'baies de chargement de camions-citernes', ton: 'rouge' },
  { valeur: '≥ 100', libelle: 'camions-citernes accueillis sur le parking', ton: 'bleu' },
  { valeur: '7 h', suite: 'à 17 h', libelle: 'du lundi au vendredi', ton: 'clair' },
  { valeur: '2026', suite: 'février', libelle: 'début des activités du dépôt', ton: 'bleu' },
];

export const GARANTIES: { titre: string; texte: string }[] = [
  { titre: 'Sphère sous talus certifiée', texte: 'Sphère construite sous talus, certifiée CODAP 2015, Division 2, Catégorie A, par PARESA.' },
  { titre: 'Contrôle avant chargement', texte: 'Contrôle sécuritaire des camions-citernes avant chaque chargement.' },
  { titre: 'Une flotte accueillie', texte: 'Un parking disponible pour accueillir une flotte de 100 camions-citernes et plus.' },
];

export const EXPERTISES: { titre: string; texte: string }[] = [
  { titre: 'Trading & Supply Chain', texte: 'Organiser et coordonner chaque étape de la chaîne, de l’achat du produit jusqu’à sa distribution.' },
  { titre: 'Analyse des marchés', texte: 'Suivre les marchés de l’énergie pour décider au bon moment.' },
  { titre: 'Cotations PLATTS', texte: 'S’appuyer sur les cotations PLATTS pour suivre les prix des produits.' },
  { titre: 'Négociation et optimisation des achats', texte: 'Négocier et optimiser les achats pour sécuriser l’approvisionnement.' },
];

export const FLUX = ['Achat', 'Transport maritime', 'Réception', 'Stockage', 'Distribution'];

/** L'histoire du Groupe, telle que rédigée par le Groupe. */
export const HISTOIRE: { repere: string; titre: string; texte: string }[] = [
  {
    repere: '2007',
    titre: 'La création, sous l’appellation SANOL',
    texte:
      'Le Groupe naît d’une ambition entrepreneuriale, portée par une volonté de croissance et de développement dans le secteur des hydrocarbures. Il distribue d’abord les produits pétroliers à travers son réseau de stations-service, avec des espaces commerciaux (shops) de proximité.',
  },
  {
    repere: 'Gaz',
    titre: 'SANOL GAZ et le Centre Emplisseur de Kpogan',
    texte:
      'Le Groupe élargit progressivement son champ d’intervention au secteur gazier, avec la création de SANOL GAZ et la mise en place de son Centre Emplisseur, situé à Kpogan.',
  },
  {
    repere: '2026',
    titre: 'Le Dépôt GPL SANOU SA, à Katanga',
    texte:
      'Une nouvelle étape est franchie avec le Dépôt GPL SANOU SA, implanté dans la zone portuaire, quartier Katanga. Cette infrastructure renforce le positionnement du Groupe dans le secteur du gaz. Les activités y débutent en février 2026.',
  },
  {
    repere: 'Aujourd’hui',
    titre: 'Trois entités, une même vision',
    texte:
      'Le GROUPE SANOU SA fédère trois entités complémentaires autour d’une même vision : développer ses activités, consolider son expertise et explorer de nouvelles perspectives de croissance.',
  },
];

export const VALEURS: { titre: string; texte: string }[] = [
  { titre: 'Professionnalisme', texte: 'Une exigence constante dans la conduite de chaque activité.' },
  { titre: 'Qualité de service', texte: 'Des clients servis avec soin, partout où le Groupe intervient.' },
  { titre: 'Sécurité', texte: 'La sécurité des personnes et des installations, avant tout.' },
  { titre: 'Nouvelles opportunités', texte: 'La recherche permanente de nouvelles perspectives de croissance.' },
];

/** Les formats de bouteilles SANOL. */
export const FORMATS: { valeur: string; photo?: PhotoId }[] = [
  { valeur: '6 kg', photo: 'bouteille6' },
  { valeur: '12,5 kg', photo: 'bouteille125' },
  { valeur: '50 kg', photo: 'bouteille50' },
];
