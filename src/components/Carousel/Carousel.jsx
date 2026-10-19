import { Children, useRef, useState } from 'react';
import { ChevronIcon } from '../icons';
import styles from './Carousel.module.css';

/** Carrossel com scroll-snap nativo (funciona bem com touch), setas e indicadores. */
export default function Carousel({ children, label = 'Carrossel' }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const slides = Children.toArray(children);

  const goTo = (n) => {
    const el = track.current;
    const clamped = Math.max(0, Math.min(slides.length - 1, n));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
  };
  const onScroll = () => {
    const el = track.current;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className={styles.root} role="region" aria-roledescription="carrossel" aria-label={label}>
      <div className={styles.track} ref={track} onScroll={onScroll}>
        {slides.map((slide, i) => (
          <div className={styles.slide} key={i} aria-label={`${i + 1} de ${slides.length}`}>{slide}</div>
        ))}
      </div>

      <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => goTo(index - 1)} aria-label="Anterior" disabled={index === 0}>
        <ChevronIcon dir="left" />
      </button>
      <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => goTo(index + 1)} aria-label="Próximo" disabled={index === slides.length - 1}>
        <ChevronIcon />
      </button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button key={i} type="button" className={i === index ? styles.dotOn : styles.dot} onClick={() => goTo(i)} aria-label={`Ir para ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
