import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/gsap';
import styles from './Reasons.module.css';

const Chevron = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

/** Carrossel nativo (scroll-snap): um card por vez, independente da placa 3D. */
export default function InfoCarousel({ cards }) {
  const track = useRef(null);
  const [active, setActive] = useState(0);

  // vai para o card i sem ler layout (o navegador calcula o scroll)
  const go = (i) => {
    const el = track.current;
    const slide = el?.children[Math.max(0, Math.min(i, cards.length - 1))];
    if (!slide) return;
    slide.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  // descobre qual card está visível sem ler offsetLeft/offsetWidth
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive([...el.children].indexOf(entry.target));
          }
        });
      },
      { root: el, threshold: 0.6 }
    );

    [...el.children].forEach((child) => io.observe(child));
    return () => io.disconnect();
  }, [cards]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
  };

  return (
    <div className={styles.carousel} role="group" aria-roledescription="carrossel" aria-label="Diferenciais">
      <div className={styles.viewport}>
        <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => go(active - 1)}
                disabled={active === 0} aria-label="Card anterior">
          <Chevron dir="left" />
        </button>

        <div className={styles.track} ref={track} onKeyDown={onKeyDown} tabIndex={0}>
          {cards.map((c) => (
            <div key={c.title} className={styles.slide}>
              <article className={styles.infoCard}>
                {c.icon && <img className={styles.infoIcon} src={c.icon} alt="" aria-hidden="true" />}
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            </div>
          ))}
        </div>

        <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => go(active + 1)}
                disabled={active === cards.length - 1} aria-label="Próximo card">
          <Chevron dir="right" />
        </button>
      </div>

      <div className={styles.dots}>
        {cards.map((c, i) => (
          <button key={c.title} type="button" aria-label={`Ir para o card ${i + 1}`}
                  className={`${styles.dot} ${i === active ? styles.dotOn : ''}`} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}