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

  if (new URLSearchParams(window.location.search).has('lite')) {
    return true;
  }

  const mem = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const touch = navigator.maxTouchPoints || 0;

  const lowMemory = mem && mem <= 4;
  const lowCpu = cores && cores <= 4;
  const mobile = touch > 0 && window.innerWidth <= 900;

  return Boolean(lowMemory || lowCpu || mobile);
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
      gsap.set([...balloons, ...rings, dots], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });

      gsap.set(dotsBig, { autoAlpha: 0 });

      return;
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    /*
     * MOBILE / CELULARES DE ENTRADA
     *
     * Evita:
     * - parallax dos dots
     * - dotsBig
     * - múltiplos rings
     * - pulses
     *
     * Mantemos somente entrada dos balões + um pequeno movimento.
     */
    if (isMobile || lite) {
      const mobileRings = [`.${styles.glow}`, `.${styles.ringA}`];

      gsap.set(
        [
          `.${styles.ringB}`,
          `.${styles.ringC}`,
          `.${styles.ringD}`,
          `.${styles.pulse}`,
          dotsBig,
        ],
        {
          autoAlpha: 0,
        }
      );

      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },

        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.8}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Apenas uma entrada simples do glow + anel
      tl.fromTo(
        mobileRings,
        {
          autoAlpha: 0,
          scale: 0.9,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
        },
        0
      );

      // Dots aparecem, mas NÃO fazem parallax.
      tl.fromTo(
        dots,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 0.7,
          duration: 0.8,
        },
        0
      );

      // Balões
      balloons.forEach((b, i) => {
        tl.fromTo(
          b,
          {
            autoAlpha: 0,
            y: 20,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
          },
          0.3 + i * 1.1
        );
      });

      return;
    }

    /*
     * DESKTOP
     *
     * Aqui mantemos a experiência completa.
     */
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        force3D: true,
      },

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

    tl.fromTo(
      rings,
      {
        autoAlpha: 0,
        scale: 0.6,
      },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1.6,
        stagger: 0.15,
      },
      0
    );

    tl.fromTo(
      dots,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 1.2,
      },
      0
    );

    tl.fromTo(
      dots,
      {
        x: 0,
        y: 0,
      },
      {
        x: 88,
        y: 88,
        duration: 6,
        ease: 'none',
      },
      0
    );

    tl.fromTo(
      dotsBig,
      {
        x: 0,
        y: 0,
      },
      {
        x: 132,
        y: 132,
        duration: 6,
        ease: 'none',
      },
      0
    );

    balloons.forEach((b, i) => {
      tl.fromTo(
        b,
        {
          autoAlpha: 0,
          y: 44,
          scale: 0.92,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
        },
        0.4 + i * 1.5
      );
    });

    tl.to({}, { duration: 0.8 });
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