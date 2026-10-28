import { useEffect, useRef, useState } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { STEPS } from '../../data/content';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { SparkIcon } from '../../components/icons';
import styles from './HowItWorks.module.css';

/**
 * Celulares fracos (pouca RAM / poucos núcleos) ganham o modo "lite":
 * o CSS só tira as camadas mais caras e menos perceptíveis (anel mais externo, 2ª onda
 * e o "piscar" dos pontos grandes). No desktop o modo lite nunca é aplicado.
 * Para testar: abra o site com ?lite na URL.
 */
function isWeakDevice() {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).has('lite')) return true;
  const mem = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  return Boolean((mem && mem <= 4) || (cores && cores <= 4));
}

export default function HowItWorks() {
  const root = useRef(null);
  const pin = useRef(null);
  const [lite] = useState(isWeakDevice);

  // Pausa as animações CSS infinitas (anéis, ondas, twinkle) quando a seção está fora da tela.
  // Mexe direto no DOM (data-active) para não re-renderizar o React a cada scroll.
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      el.dataset.active = 'true';
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => { el.dataset.active = String(entry.isIntersecting); },
      { rootMargin: '150px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const balloons = gsap.utils.toArray(`.${styles.balloon}`);
      const rings = [`.${styles.glow}`, `.${styles.ring}`];
      const dots = `.${styles.dots}`;
      const dotsBig = `.${styles.dotsBig}`;

      if (prefersReducedMotion()) {
        gsap.set([...balloons, ...rings, dots], { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(dotsBig, { autoAlpha: 0.45 });
        return;
      }

      // A placa (fixa) já está parada na âncora; aqui só o pin + balões em sequência.
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', force3D: true },
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

      // halo + anéis "abrem" a partir da placa (só transform + opacity: roda na GPU)
      tl.fromTo(rings, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.6, stagger: 0.15 }, 0);

      // pontos aparecem e deslizam com o scroll (parallax).
      // ANTES: animava backgroundPosition (repinta a camada gigante a cada frame).
      // AGORA: anima x/y (transform) — o deslocamento é múltiplo do tamanho do "tile",
      // então o resultado visual é idêntico e a emenda continua invisível.
      tl.fromTo(dots, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 0);
      tl.fromTo(dots, { x: 0, y: 0 }, { x: 88, y: 88, duration: 6, ease: 'none' }, 0);
      tl.fromTo(dotsBig, { x: 0, y: 0 }, { x: 132, y: 132, duration: 6, ease: 'none' }, 0);

      balloons.forEach((b, i) => {
        tl.fromTo(b, { autoAlpha: 0, y: 44, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, 0.4 + i * 1.5);
      });
      tl.to({}, { duration: 0.8 }); // respiro final antes de soltar o pin
    },
    { scope: root }
  );

  return (
    <section
      id="como-funciona"
      className={styles.section}
      data-section="how"
      data-perf={lite ? 'lite' : 'full'}
      ref={root}
    >
      <div className={styles.pin} ref={pin}>
        <SectionHeader icon={<SparkIcon />} badge="Como utilizar as placas" title="Como Funciona" tone="light" style={{ '--title-max': '8ch' }}>
          É muito simples! Em apenas 3 passos seus clientes já deixam uma avaliação no Google.
        </SectionHeader>

        <div className={styles.stage}>
          {/* camada decorativa: pontos, halo, ondas e anéis ao redor da placa */}
          <div className={styles.decor} aria-hidden="true">
            {/* uma única máscara para as duas grades de pontos */}
            <div className={styles.dotsMask}>
              <span className={styles.dots} />
              <span className={styles.dotsBig} />
            </div>
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