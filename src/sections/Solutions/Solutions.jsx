import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { SOLUTIONS } from '../../data/content';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import ImageSlot from '../../components/ImageSlot/ImageSlot';
import { SparkIcon } from '../../components/icons';
import styles from './Solutions.module.css';

export default function Solutions() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0, y: 56, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className={styles.section} data-section="solutions" ref={root}>
      <SectionHeader icon={<SparkIcon />} badge="Serviços" title="Soluções para o seu crescimento">
        Mais que um site, entregamos soluções digitais que conectam sua marca às pessoas certas e geram resultados reais.
      </SectionHeader>

      <div className={styles.grid}>
        {SOLUTIONS.map((s) => (
          <article key={s.title} className={styles.card} tabIndex={0}>
            <div className={styles.text}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className={styles.tag}>{s.tag}</span>
            </div>
            <ImageSlot className={styles.img} src={s.img} alt={s.title} ratio="16 / 9" />
          </article>
        ))}
      </div>
    </section>
  );
}
