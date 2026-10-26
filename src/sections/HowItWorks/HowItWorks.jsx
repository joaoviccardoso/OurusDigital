import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { STEPS } from '../../data/content';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import ImageSlot from '../../components/ImageSlot/ImageSlot';
import { SparkIcon } from '../../components/icons';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const root = useRef(null);
  const pin = useRef(null);

  useGSAP(
    () => {
      const balloons = gsap.utils.toArray(`.${styles.balloon}`);
      const hand = `.${styles.hand}`;

      if (prefersReducedMotion()) {
        gsap.set([...balloons, hand], { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      // A placa (fixa) já está parada na âncora; aqui só o pin + balões em sequência.
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2.4}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(hand, { autoAlpha: 0, y: 90 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0);
      balloons.forEach((b, i) => {
        tl.fromTo(b, { autoAlpha: 0, y: 44, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, 0.4 + i * 1.5);
      });
      tl.to({}, { duration: 0.8 }); // respiro final antes de soltar o pin
    },
    { scope: root }
  );

  return (
    <section id="como-funciona" className={styles.section} data-section="how" ref={root}>
      <div className={styles.pin} ref={pin}>
        <SectionHeader icon={<SparkIcon />} badge="Como utilizar as placas" title="Como Funciona" tone="light" style={{ '--title-max': '8ch' }}>
          É muito simples! Em apenas 3 passos seus clientes já deixam uma avaliação no Google.
        </SectionHeader>

        <div className={styles.stage}>
          {/* a placa 3D fixa pousa aqui */}
          <div className={styles.anchor} data-plate-anchor />

          {STEPS.map((s, i) => (
            <article key={s.n} className={`${styles.balloon} ${styles[`b${i + 1}`]}`}>
              <span className={styles.num}>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}