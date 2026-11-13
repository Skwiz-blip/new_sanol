export type Photo = { src: string; alt: string; focus?: string; provisoire?: boolean };

const reel = (fichier: string, alt: string, focus?: string): Photo => ({ src: `/media/sanol/${fichier}.webp`, alt, focus });
/** Visuels de la médiathèque du back-office (illustrations, affiche). */
const visuel = (fichier: string, alt: string, focus?: string): Photo => ({ src: `/media/visuels/${fichier}.webp`, alt, focus });

/** Photographies du reportage SANOU SA (octobre 2026), sauf mention « provisoire ». */
export const PHOTOS = {
  sphere: reel('reel-reservoir-drone', 'La sphère du dépôt GPL portant l’inscription Sanol Gaz, vue du ciel.', '50% 42%'),
  sphereSol: reel('reel-reservoir', 'La sphère de stockage Sanol Gaz et son escalier d’accès jaune.', '50% 40%'),
  inscription: reel('reel-logo-sanolgaz', 'L’inscription Sanol Gaz sur la sphère du dépôt.', '55% 45%'),
  spheres: reel('reel-reservoirs', 'Les installations de stockage du dépôt GPL.', '45% 50%'),
  spheresCiel: reel('reel-reservoirs-ciel', 'Les installations de stockage vues d’en haut.'),
  baies: reel('reel-quai-camions', 'Camions-citernes sous l’auvent des baies de chargement, devant la sphère Sanol Gaz.', '45% 55%'),
  baiesDrone: reel('reel-quai-drone', 'Les baies de chargement vues du ciel, sous l’auvent bleu et rouge.', '60% 55%'),
  camionsBaies: reel('reel-camions-quai', 'Camions-citernes alignés aux baies de chargement.', '55% 60%'),
  equipeBaies: reel('reel-quai-equipe', 'L’équipe du dépôt au travail sous l’auvent des baies de chargement.', '50% 60%'),
  raccordement: reel('reel-raccordement', 'Opérateurs raccordant un camion-citerne Sanol Gaz au bras de chargement.', '50% 45%'),
  operateurs: reel('reel-operateurs', 'Deux opérateurs en tenue de sécurité à l’arrière d’un camion-citerne Sanol Gaz.', '50% 45%'),
  conduites: reel('reel-conduites', 'Conduites et bras de chargement du dépôt.'),
  camionDepot: reel('reel-camion-depot', 'Camion-citerne Sanol Gaz devant les installations de stockage.', '50% 60%'),
  camionSphere: reel('reel-camion-reservoir', 'Camion-citerne Sanol Gaz devant la sphère du dépôt.', '50% 60%'),
  consignes: reel('reel-consignes', 'Panneau des consignes de sécurité du dépôt.', '50% 45%'),
  agent: reel('reel-equipe', 'Agent du dépôt en tenue de sécurité devant les baies de chargement.', '40% 50%'),
  siege: reel('reel-siege', 'Le bâtiment administratif du Groupe SANOU SA.', '50% 55%'),
  siegeDrone: reel('reel-siege-drone', 'Le bâtiment administratif et l’entrée du dépôt, vus du ciel.', '50% 55%'),
  centreEmplisseur: reel('reel-centre-remplisseur', 'La chaîne d’emplissage des bouteilles de gaz du Centre Emplisseur.', '45% 55%'),
  controle: reel('reel-salle-controle', 'Salle de contrôle : un opérateur surveille les écrans de supervision.', '50% 50%'),
  navireQuai: reel('reel-navire-quai', 'Navire-citerne à quai, flexible de déchargement suspendu au-dessus du quai.', '50% 45%'),
  stationSanol: visuel('station-sanol', 'Station-service SANOL au coucher du soleil, avec sa boutique et son totem de prix.', '45% 55%'),
  stationPompiste: visuel('station-pompiste', 'Pompiste SANOL souriant devant une station-service SANOL.', '72% 40%'),
  // Une seule image pour le bandeau de /sanol-gaz et la carte « SANOL GAZ · Centre Emplisseur de Kpogan ».
  sanolGaz: visuel('centre-emplisseur-usine', 'Opérateurs SANOL GAZ au carrousel d’emplissage des bouteilles, au Centre Emplisseur.', '62% 50%'),
  navireApproche: visuel('navire-gpl-approche', 'Navire transporteur de GPL approchant des installations portuaires.', '58% 68%'),
  tradingPoste: visuel('trading-poste', 'Écrans d’un poste de trading affichant des cours en chandeliers.', '62% 50%'),
  tradingGraphique: visuel('trading-graphique', 'Graphique de cours en chandeliers, en hausse.', '50% 50%'),
  bouteille6: visuel('bouteille-6kg', 'Bouteille de gaz SANOL de 6 kg.'),
  bouteille125: visuel('bouteille-12-5kg', 'Bouteille de gaz SANOL de 12,5 kg.'),
  bouteille50: visuel('bouteille-50kg', 'Bouteille de gaz SANOL de 50 kg.'),
  accostage: reel('reel-accostage', 'Opérateurs SANOU SA en tenue rouge assemblant une conduite sur le quai.', '45% 62%'),
  flexibles: reel('reel-flexibles', 'Flexibles raccordés entre le navire-citerne et les installations à terre.', '50% 45%'),
  // Image provisoire : gardée tant que SANOU SA n'a pas fourni ses photos de navires.
  navire: {
    src: '/media/provisoire/navire.webp',
    alt: 'Vue aérienne d’un navire-citerne en mer.',
    provisoire: true,
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof PHOTOS;
