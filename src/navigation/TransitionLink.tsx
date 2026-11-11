import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useLocation } from 'react-router';
import { useTransition } from './transition';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  label?: string;
  children: ReactNode;
  /** aria-current automatique quand la route correspond. */
  matchCurrent?: boolean;
};

export function TransitionLink({ to, label, children, onClick, matchCurrent, ...rest }: Props) {
  const { go } = useTransition();
  const { pathname } = useLocation();
  const current =
    matchCurrent && (to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(to + '/'));

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== '_self') return;
    e.preventDefault();
    go(to, label);
  };

  return (
    <a href={to} onClick={handle} aria-current={current ? 'page' : undefined} {...rest}>
      {children}
    </a>
  );
}
