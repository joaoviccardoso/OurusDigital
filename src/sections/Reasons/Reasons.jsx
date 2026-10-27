import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { BRAND } from '../../config/site';
import { BENEFITS, INFO_SLIDES } from '../../data/content';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { BoltIcon } from '../../components/icons';
import ColorShowcase from './ColorShowcase';
import styles from './Reasons.module.css';

const renderTitle = (title) =>
  title.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

export default function Reasons() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray(`.${styles.item}`).forEach((el) => {
        const fromX = el.classList.contains(styles.reverse) ? 36 : -36;
        gsap.from(el, {
          autoAlpha: 0, y: 44, x: fromX, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="motivos" className={styles.section} data-section="reasons" ref={root}>
      <SectionHeader icon={<BoltIcon />} badge={`Por que ${BRAND}?`} title="Soluções para o seu crescimento">
        Mais que um site, entregamos soluções digitais que conectam sua marca às pessoas certas e geram resultados reais.
      </SectionHeader>

      <div className={styles.benefits}>
        {BENEFITS.map((b, i) => {
          const reverse = i % 2 === 1; // alterna o lado
          return (
            <div
              key={b.title}
              className={`${styles.item} ${reverse ? styles.reverse : ''}`}
              style={{ zIndex: BENEFITS.length - i }}
            >
              <span className={styles.light} aria-hidden="true" />

              <article className={styles.benefit}>
                <div className={styles.copy}>
                  {b.icon && (
                    <span className={styles.icon}>
                      <img src={b.icon} alt="" aria-hidden="true" />
                    </span>
                  )}
                  <h3>{renderTitle(b.title)}</h3>
                  <p>{b.text}</p>
                  {b.tag && <small className={styles.tag}>{b.tag}</small>}
                </div>

                <div className={styles.media}>
                  <img src={b.image} alt={b.imageAlt} loading="lazy" />
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <SectionHeader
        icon={<BoltIcon />}
        badge={`Por que ${BRAND}?`}
        title={<>Seu negócio merece <span className={styles.hl}>mais que presença digital.</span></>}
        style={{ margin: '4rem 0 0' }}
        id={'modelos'}
      >
        Soluções pensadas para fortalecer sua marca, conquistar a confiança dos clientes e transformar sua presença digital em novas oportunidades.
      </SectionHeader>

      {/* placa 3D + cores + carrossel de cards, num bloco único */}
      <ColorShowcase cards={INFO_SLIDES.flat()} />
    </section>
  );
}