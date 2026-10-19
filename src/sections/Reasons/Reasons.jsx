import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { BRAND } from '../../config/site';
import { BENEFITS } from '../../data/content';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Carousel from '../../components/Carousel/Carousel';
import { BoltIcon, ShieldIcon } from '../../components/icons';
import ColorSlide from './ColorSlide';
import styles from './Reasons.module.css';

export default function Reasons() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray(`.${styles.benefit}`).forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0, y: 44, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className={styles.section} data-section="reasons" ref={root}>
      <SectionHeader icon={<BoltIcon />} badge={`Por que ${BRAND}?`} title="Seu negócio merece mais que presença digital.">
        Soluções pensadas para fortalecer sua marca, conquistar a confiança dos clientes e transformar sua presença digital em novas oportunidades.
      </SectionHeader>

      <div className={styles.benefits}>
        {BENEFITS.map((b) => (
          <article key={b.title} className={styles.benefit}>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </article>
        ))}
      </div>

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
