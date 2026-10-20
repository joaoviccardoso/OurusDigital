import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { usePlate } from '../../providers/PlateProvider';
import PlateCard from '../../components/PlateCard/PlateCard';
import InfoCarousel from './InfoCarousel';
import styles from './Reasons.module.css';

const OPTIONS = [
  { value: 'blue', label: 'Modelo Azul' },
  { value: 'black', label: 'Modelo Preta' },
];

/** Bloco único: placa 3D (arrastável) + seletor de cor + carrossel de cards. */
export default function ColorShowcase({ cards }) {
  const { variant, setVariant } = usePlate();
  const card = useRef(null);
  const first = useRef(true);

  // a cada troca de cor, dá uma volta e volta para o ângulo em que o usuário deixou a placa
  useGSAP(
    () => {
      if (first.current) { first.current = false; return; }
      const h = card.current;
      if (!h || prefersReducedMotion()) return;
      h.sync?.();
      const from = h.rotationY;
      gsap.fromTo(h, { rotationY: from - 140 }, { rotationY: from, duration: 1, ease: 'back.out(1.3)' });
    },
    { dependencies: [variant] }
  );

  return (
    <div className={styles.showcase}>
      <div className={styles.stage}>
        <div className={styles.colorPlate}>
          <PlateCard interactive variant={variant} cardRef={card} className={styles.plateWrap} />
        </div>
        <p className={styles.hint}>↔ Arraste para girar a placa</p>
      </div>

      <div className={styles.picker} role="radiogroup" aria-label="Cor da placa">
        <p className={styles.pickerTitle}>Cores</p>
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={variant === o.value}
            className={`${styles.option} ${variant === o.value ? styles.optionOn : ''}`}
            onClick={() => setVariant(o.value)}
          >
            <span className={`${styles.swatch} ${styles[`sw_${o.value}`]}`} />
            {o.label}
          </button>
        ))}
      </div>

      <InfoCarousel cards={cards} />
    </div>
  );
}