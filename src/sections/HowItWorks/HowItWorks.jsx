import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { STEPS } from '../../data/content';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { SparkIcon } from '../../components/icons';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const root = useRef(null);
  const pin = useRef(null);

  useGSAP(
    () => {
      const balloons = gsap.utils.toArray(`.${styles.balloon}`);
      const hand = `.${styles.hand}`;
      const rings = [`.${styles.glow}`, `.${styles.ring}`];
      // .dotsBig fica de fora: o CSS já anima a opacidade dele (twinkle)
      const dots = `.${styles.dots}`;
      const dotsBig = `.${styles.dotsBig}`;

      if (prefersReducedMotion()) {
        gsap.set([...balloons, hand, ...rings, dots], { autoAlpha: 1, y: 0, scale: 1 });
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

      // halo + anéis "abrem" a partir da placa
      tl.fromTo(rings, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.6, stagger: 0.15 }, 0);

      // pontos aparecem e deslizam com o scroll (parallax)
      tl.fromTo(dots, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 0);
      tl.fromTo(dots, { backgroundPosition: '0px 0px' }, { backgroundPosition: '88px 88px', duration: 6, ease: 'none' }, 0);
      tl.fromTo(dotsBig, { backgroundPosition: '11px 11px' }, { backgroundPosition: '143px 143px', duration: 6, ease: 'none' }, 0);

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
          {/* camada decorativa: pontos, halo, ondas e anéis ao redor da placa (cobre a seção toda) */}
          <div className={styles.decor} aria-hidden="true">
            <span className={styles.dots} />
            <span className={styles.dotsBig} />
            <span className={styles.glow} />
            <span className={`${styles.pulse} ${styles.pulse1}`} />
            <span className={`${styles.pulse} ${styles.pulse2}`} />
            <span className={`${styles.ring} ${styles.ringA}`} />
            <span className={`${styles.ring} ${styles.ringB}`} />
            <span className={`${styles.ring} ${styles.ringC}`} />
            <span className={`${styles.ring} ${styles.ringD}`} />
          </div>

          {/* a placa 3D fixa pousa aqui */}
          <div className={styles.anchor} data-plate-anchor />

          {STEPS.map((s, i) => (
            <article key={s.n} className={`${styles.balloon} ${styles[`b${i + 1}`]}`} data-n={s.n}>
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