import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { SmoothScrollProvider, useLenis } from './providers/SmoothScrollProvider';
import { PlateProvider } from './providers/PlateProvider';
import { usePlateJourney } from './hooks/usePlateJourney';

import Preloader from './components/Preloader/Preloader';
import Header from './components/Header/Header';
import Plate from './components/Plate/Plate';
import WhatsAppFloat from './components/WhatsAppFloat/WhatsAppFloat';
import Footer from './components/Footer/Footer';

import Hero from './sections/Hero/Hero';
import HowItWorks from './sections/HowItWorks/HowItWorks';
import Models from './sections/Models/Models';
import Solutions from './sections/Solutions/Solutions';
import Reasons from './sections/Reasons/Reasons';

function Site() {
  const lenis = useLenis();
  const [ready, setReady] = useState(false);   // cortina abrindo → Hero e placa animam
  const [loaded, setLoaded] = useState(false); // cortina removida do DOM

  usePlateJourney(ready);

  const handleReveal = useCallback(() => setReady(true), []);
  const handleDone = useCallback(() => setLoaded(true), []);

  // libera o scroll só depois do preloader
  useEffect(() => {
    if (!lenis || !loaded) return;
    lenis.start();
    ScrollTrigger.refresh();
  }, [lenis, loaded]);

  return (
    <>
      {!loaded && <Preloader onReveal={handleReveal} onDone={handleDone} />}
      <Header />
      <Plate />
      <main>
        <Hero ready={ready} />
        <HowItWorks />
        <Models />
        <Reasons />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <PlateProvider>
        <Site />
      </PlateProvider>
    </SmoothScrollProvider>
  );
}
