import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

const SmoothScrollContext = createContext(null);

/**
 * Lenis + GSAP ScrollTrigger usando UM único loop (gsap.ticker).
 * O Lenis nasce parado (durante o preloader); o App chama lenis.start().
 * Em touch, o Lenis mantém o scroll nativo (syncTouch: false), o mais seguro em mobile.
 */
export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const instance = new Lenis({ lerp: 0.06, smoothWheel: true, autoRaf: false });
    instance.stop();

    const onTick = (time) => instance.raf(time * 1000);
    instance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);
    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <SmoothScrollContext.Provider value={lenis}>{children}</SmoothScrollContext.Provider>;
}

export const useLenis = () => useContext(SmoothScrollContext);
