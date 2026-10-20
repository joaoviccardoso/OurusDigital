import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { BRAND } from '../../config/site';
import { BoltIcon } from '../../components/icons';
import styles from './Preloader.module.css';

const STARS = [0, 1, 2, 3, 4];

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
      const stars = [...root.current.querySelectorAll(`.${styles.star}`)];

      const paint = () => {
        const n = Math.round(progress.v);
        counter.current.textContent = `${n}%`;
        bar.current.style.transform = `scaleX(${progress.v / 100})`;
        // uma estrela acende a cada 20% (a última chega junto com os 90%)
        stars.forEach((s, i) => s.classList.toggle(styles.starOn, n >= i * 20 + 10));
      };

      gsap.from(`.${styles.light}`, { autoAlpha: 0, duration: 1.2, ease: 'power2.out' });
      gsap.from(`.${styles.badge}, .${styles.card}`, {
        autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.12, ease: 'power3.out',
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
      <span className={`${styles.light} ${styles.lightA}`} aria-hidden="true" />
      <span className={`${styles.light} ${styles.lightB}`} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.badge}>
          <BoltIcon width={14} height={14} />
          Carregando
        </p>

        <div className={styles.card}>
          <div className={styles.stars} aria-hidden="true">
            {STARS.map((i) => (
              <svg key={i} className={styles.star} viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          <p className={styles.brand}>{BRAND}</p>

          <div className={styles.meter}>
            <span className={styles.count} ref={counter}>0%</span>
            <span className={styles.track}>
              <span className={styles.bar} ref={bar} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}