import { useRef } from 'react';
import { PageHero } from '../design/PageHero';
import { useReveal } from '../motion/useReveal';
import { Trading } from '../sections/blocs';
import { useSeo } from '../seo';

export default function TradingPage() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  useSeo({
    title: 'Trading & Supply Chain',
    description:
      'Trading & Supply Chain, analyse des marchés, cotations PLATTS, négociation et optimisation des achats : le GROUPE SANOU SA coordonne la chaîne, de l’achat à la distribution.',
    path: '/trading-supply-chain',
  });
  return (
    <div ref={ref}>
      <PageHero
        photo="tradingPoste"
        fil="Trading & Supply Chain"
        oeil="Trading & Supply Chain."
        lignes={['Coordonner la chaîne,', 'de l’achat à la distribution.']}
        chapo="Un axe majeur du positionnement du Groupe : organiser chaque étape de l’approvisionnement."
      />
      <Trading complet />
    </div>
  );
}
