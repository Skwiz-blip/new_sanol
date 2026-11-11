import type { ReactNode } from 'react';

/**
 * Titre découpé en lignes masquées, pour la révélation typographique.
 * Le texte reste un vrai titre, sélectionnable et indexable.
 */
export function Lines({
  as: Tag = 'h2' as 'h2' | 'h1' | 'h3' | 'p',
  lines,
  className,
  delay,
  id,
}: {
  as?: 'h2' | 'h1' | 'h3' | 'p';
  lines: ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag className={className} data-reveal="lines" data-delay={delay} id={id}>
      {lines.map((l, i) => (
        <span className="line-mask" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
