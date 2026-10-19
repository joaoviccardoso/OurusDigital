import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { BRAND } from '../../config/site';
import { BENEFITS } from '../../data/content';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Carousel from '../../components/Carousel/Carousel';
import { BoltIcon, ShieldIcon } from '../../components/icons';
import ColorSlide from './ColorSlide';
import styles from './Reasons.module.css';

const renderTitle = (title) =>
  title.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

export default function Reasons() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray(`.${styles.benefit}`).forEach((el) => {
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
    <section className={styles.section} data-section="reasons" ref={root}>
      <SectionHeader icon={<BoltIcon />} badge={`Por que ${BRAND}?`} title="Soluções para o seu crescimento">
        Mais que um site, entregamos soluções digitais que conectam sua marca às pessoas certas e geram resultados reais.
      </SectionHeader>

      <div className={styles.benefits}>
        {BENEFITS.map((b, i) => {
          const reverse = i % 2 === 1; // alterna o lado
          return (
            <article key={b.title} className={`${styles.benefit} ${reverse ? styles.reverse : ''}`}>
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
          );
        })}
      </div>

      <SectionHeader icon={<BoltIcon />} badge={`Por que ${BRAND}?`} title="Soluções para o seu crescimento" style={{ margin: "3rem 0rem" }}>
        Mais que um site, entregamos soluções digitais que conectam sua marca às pessoas certas e geram resultados reais.
      </SectionHeader>

      <div className={styles.carousel}>
        <Carousel label="Escolha a cor da sua placa">
          <ColorSlide />
          <div className={styles.infoSlide}>
            <ShieldIcon width={34} height={34} />
            <h3>Total conformidade com as diretrizes do Google</h3>
            <p>Tecnologia NFC e QR Code feitos para aumentar avaliações legítimas no Google Meu Negócio.</p>
          </div>
          <div className={styles.infoSlide}>
            <BoltIcon width={34} height={34} />
            <h3>Garantia 100%</h3>
            <p>Sua placa chega pronta para uso. Aproximou, avaliou.</p>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
