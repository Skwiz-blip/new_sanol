import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { QualityProvider } from './motion/quality';
import { SmoothScroll } from './motion/SmoothScroll';
import { TransitionProvider } from './navigation/transition';
import { Header } from './navigation/Header';
import { Footer } from './navigation/Footer';
import { ScrollManager } from './navigation/ScrollManager';
import Home from './pages/Home';
import Groupe from './pages/Groupe';
import Depot from './pages/Depot';
import SanolGaz from './pages/SanolGaz';
import Stations from './pages/Stations';
import TradingPage from './pages/TradingPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const ReadingProgress = lazy(() => import('./navigation/ReadingProgress'));

export function App() {
  return (
    <QualityProvider>
      <SmoothScroll>
        <TransitionProvider>
          <Shell />
        </TransitionProvider>
      </SmoothScroll>
    </QualityProvider>
  );
}


function Shell() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null); 
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    (window as unknown as { __sanolReady?: boolean }).__sanolReady = true;
    setMounted(true);
  }, []); 
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <Header />
      <ScrollManager />
      <main id="contenu" ref={main} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groupe" element={<Groupe />} />
          <Route path="/depot-gpl" element={<Depot />} />
          <Route path="/sanol-gaz" element={<SanolGaz />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/trading-supply-chain" element={<TradingPage />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {mounted && pathname !== '/' && (
        <Suspense fallback={null}>
          <ReadingProgress key={pathname} />
        </Suspense>
      )}
    </>
  );
}
