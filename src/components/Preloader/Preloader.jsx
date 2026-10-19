import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { BRAND } from '../../config/site';
import styles from './Preloader.module.css';

const whenLoaded = () =>
  new Promise((res) => {
    if (document.readyState === 'complete') res();
    else window.addEventListener('load', res, { once: true });
  });

/**
 * Progresso: sobe até 90% de forma suave e só chega a 100% quando
 * fontes + window.load terminarem. Depois abre a cortina.
 * onReveal: dispara no meio da saída (a Hero começa a animar por trás da cortina).
 * onDone  : cortina removida.
 */
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);
  const counter = useRef(null);
  const bar = useRef(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const progress = { v: 0 };
      const paint = () => {
        const n = Math.round(progress.v);
        counter.current.textContent = String(n).padStart(3, '0');
        bar.current.style.transform = `scaleX(${progress.v / 100})`;
      };

      gsap.from(`.${styles.brand}, .${styles.meter}`, {
        autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      });

      const climb = gsap.to(progress, {
        v: 90, duration: reduced ? 0.2 : 1.6, ease: 'power2.out', onUpdate: paint,
      });

      Promise.all([document.fonts.ready, whenLoaded(), climb.then()]).then(() => {
        const out = gsap.timeline({ onComplete: onDone });
        out
          .to(progress, { v: 100, duration: 0.45, ease: 'power1.inOut', onUpdate: paint })
          .to(`.${styles.content}`, { autoAlpha: 0, y: -20, duration: 0.45, ease: 'power2.in' }, '+=0.15')
          .call(onReveal, null, '>-0.1')
          .to(root.current, { yPercent: -100, duration: reduced ? 0.01 : 1, ease: 'expo.inOut' }, '<');
      });
    },
    { scope: root }
  );

  return (
    <div className={styles.root} ref={root} role="status" aria-label="Carregando">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.brand}>{BRAND}</p>
        <div className={styles.meter}>
          <span className={styles.count} ref={counter}>000</span>
          <span className={styles.track}>
            <span className={styles.bar} ref={bar} />
          </span>
        </div>
      </div>
    </div>
  );
}
