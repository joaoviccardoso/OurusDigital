import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { WHATSAPP_URL } from '../../config/site';
import { WhatsAppIcon } from '../../components/WhatsAppFloat/WhatsAppFloat';
import styles from './Hero.module.css';

function BoltIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 2 4 14h6.5L9.5 22 20 9.5h-6.8L13.5 2Z" />
    </svg>
  );
}

export default function Hero({ ready }) {
  const root = useRef(null);

  // Estado inicial do título: definido pelo GSAP (e não pelo CSS), porque o GSAP
  // converte translateY(110%) do CSS para pixels e a animação em yPercent não "desfaz" isso.
  useGSAP(
    () => {
      gsap.set(`.${styles.lineInner}`, { yPercent: 110 });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (!ready) return;
      if (prefersReducedMotion()) {
        gsap.set([`.${styles.badge}`, `.${styles.lead}`, `.${styles.cta}`], { autoAlpha: 1, y: 0 });
        gsap.set(`.${styles.lineInner}`, { yPercent: 0 });
        return;
      }
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(`.${styles.badge}`, { autoAlpha: 1, y: 0, duration: 0.8 })
        .to(`.${styles.lineInner}`, { yPercent: 0, duration: 1.1, stagger: 0.12 }, '-=0.5')
        .to(`.${styles.lead}`, { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.7')
        .to(`.${styles.cta}`, { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.7');
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section id="inicio" className={styles.hero} data-section="hero" ref={root}>
      <div className={styles.copy}>
        <p className={styles.badge}>
          <BoltIcon />
          <span>Mais avaliações mais credibilidade.</span>
        </p>

        <h1 className={styles.title}>
          <span className={styles.line}><span className={styles.lineInner}>Transforme Clientes</span></span>
          <span className={styles.line}><span className={styles.lineInner}>em avaliações</span></span>
        </h1>

        <div className={styles.side}>
          <p className={styles.lead}>
            Facilite o pedido de avaliação do seu cliente com tecnologia NFC e QR Code.
          </p>

          <a className={styles.cta} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={26} />
            Quero minha Placa Agora
          </a>
        </div>
      </div>

      {/* A placa 3D (fixa) pousa aqui no início; a âncora só reserva o espaço */}
      <div className={styles.anchor} data-plate-anchor />
    </section>
  );
}