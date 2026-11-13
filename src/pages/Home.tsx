import { useRef } from 'react';
import { SITE } from '../data/site';
import { useReveal } from '../motion/useReveal';
import { Entites } from '../sections/Entites';
import { Hero } from '../sections/Hero';
import { Chiffres, Galerie, Intro, Trading } from '../sections/blocs';
import { useSeo } from '../seo';

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  useSeo({
    title: SITE.nom,
    description:
      'GROUPE SANOU SA : réception, stockage et distribution du GPL au dépôt de Katanga, Centre Emplisseur SANOL GAZ de Kpogan, stations-service et shops SANOL. Lomé, Togo.',
    path: '/',
  });
  return (
    <div ref={ref}>
      <Hero />
      <Intro />
      <Entites />
      <Chiffres />
      <Trading />
      <Galerie />
    </div>
  );
}
