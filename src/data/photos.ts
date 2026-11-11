export type Photo = { src: string; alt: string; focus?: string; provisoire?: boolean };

const reel = (fichier: string, alt: string, focus?: string): Photo => ({ src: `/media/sanol/${fichier}.webp`, alt, focus });

/** Photographies du reportage SANOU SA (octobre 2026), sauf mention « provisoire ». */
export const PHOTOS = {
  sphere: reel('reel-reservoir-drone', 'La sphère du dépôt GPL portant l’inscription Sanol Gaz, vue du ciel.', '50% 42%'),
  sphereSol: reel('reel-reservoir', 'La sphère de stockage Sanol Gaz et son escalier d’accès jaune.', '50% 40%'),
  inscription: reel('reel-logo-sanolgaz', 'L’inscription Sanol Gaz sur la sphère du dépôt.', '55% 45%'),
  spheres: reel('reel-reservoirs', 'Les installations de stockage du dépôt GPL.', '45% 50%'),
  spheresCiel: reel('reel-reservoirs-ciel', 'Les installations de stockage vues d’en haut.'),
  vueAerienne: reel('reel-vue-aerienne', 'Vue aérienne du dépôt GPL SANOU SA et de ses baies de chargement.', '50% 55%'),
  zonePortuaire: reel('reel-zone-portuaire', 'Le dépôt GPL SANOU SA dans la zone portuaire de Lomé, vu du ciel.'),
  baies: reel('reel-quai-camions', 'Camions-citernes sous l’auvent des baies de chargement, devant la sphère Sanol Gaz.', '45% 55%'),
  baiesDrone: reel('reel-quai-drone', 'Les baies de chargement vues du ciel, sous l’auvent bleu et rouge.', '60% 55%'),
  camionsBaies: reel('reel-camions-quai', 'Camions-citernes alignés aux baies de chargement.', '55% 60%'),
  equipeBaies: reel('reel-quai-equipe', 'L’équipe du dépôt au travail sous l’auvent des baies de chargement.', '50% 60%'),
  raccordement: reel('reel-raccordement', 'Opérateurs raccordant un camion-citerne Sanol Gaz au bras de chargement.', '50% 45%'),
  operateurs: reel('reel-operateurs', 'Deux opérateurs en tenue de sécurité à l’arrière d’un camion-citerne Sanol Gaz.', '50% 45%'),
  conduites: reel('reel-conduites', 'Conduites et bras de chargement du dépôt.'),
  camionDepot: reel('reel-camion-depot', 'Camion-citerne Sanol Gaz devant les installations de stockage.', '50% 60%'),
  camionSphere: reel('reel-camion-reservoir', 'Camion-citerne Sanol Gaz devant la sphère du dépôt.', '50% 60%'),
  posteControle: reel('reel-poste-controle', 'Poste de contrôle à l’entrée du dépôt, à l’arrivée d’un camion-citerne.', '50% 55%'),
  consignes: reel('reel-consignes', 'Panneau des consignes de sécurité du dépôt.', '50% 45%'),
  agent: reel('reel-equipe', 'Agent du dépôt en tenue de sécurité devant les baies de chargement.', '40% 50%'),
  siege: reel('reel-siege', 'Le bâtiment administratif du Groupe SANOU SA.', '50% 55%'),
  siegeDrone: reel('reel-siege-drone', 'Le bâtiment administratif et l’entrée du dépôt, vus du ciel.', '50% 55%'),
  centreEmplisseur: reel('reel-centre-remplisseur', 'La chaîne d’emplissage des bouteilles de gaz du centre emplisseur.', '45% 55%'),
  // Image provisoire : gardée tant que SANOU SA n'a pas fourni ses photos de navires.
  navire: {
    src: '/media/provisoire/navire.webp',
    alt: 'Vue aérienne d’un navire-citerne en mer.',
    provisoire: true,
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof PHOTOS;
