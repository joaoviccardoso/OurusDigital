import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { MODELS } from '../../data/content';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import PlateCard from '../../components/PlateCard/PlateCard';
import { BoltIcon } from '../../components/icons';
import styles from './Models.module.css';

export default function Models() {
  const root = useRef(null);

  const handles = useRef({});

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray(`.${styles.item}`).forEach((item, i) => {
        const wrapper = item.querySelector(`.${styles.plate}`);
        const handle = handles.current[MODELS[i].variant];
        const text = item.querySelector(`.${styles.copy}`);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 40%', scrub: 0.6 },
        });
        tl.fromTo(wrapper, { y: 60, scale: 0.9 }, { y: 0, scale: 1, ease: 'none' }, 0);
        if (handle) tl.fromTo(handle, { rotationY: -55, rotationX: 12 }, { rotationY: 0, rotationX: 0, ease: 'none' }, 0);

        gsap.from(text, {
          autoAlpha: 0, y: 28, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 60%', toggleActions: 'play none none reverse' },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className={styles.section} data-section="models" ref={root}>
      <SectionHeader icon={<BoltIcon />} badge="Modelo das placas" title="Modelos Disponíveis">
        Escolha o estilo que mais combina com o seu negócio.
      </SectionHeader>

      <div className={styles.list}>
        {MODELS.map((m) => (
          <article key={m.variant} className={styles.item}>
            <div className={styles.plate}>
              <PlateCard variant={m.variant} cardRef={(h) => { handles.current[m.variant] = h; }} />
            </div>
            <div className={styles.copy}>
              <h3 className={styles.name}>
                <span className={`${styles.dot} ${styles[m.variant]}`} />
                {m.name}
              </h3>
              <p>{m.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}