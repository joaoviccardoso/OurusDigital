import { useRef } from 'react';
import { useGSAP, gsap, prefersReducedMotion } from '../../lib/gsap';
import { usePlate } from '../../providers/PlateProvider';
import PlateCard from '../../components/PlateCard/PlateCard';
import styles from './Reasons.module.css';

const OPTIONS = [
  { value: 'blue', label: 'Modelo Azul' },
  { value: 'black', label: 'Modelo Preta' },
];

/** Slide interativo: alterna a cor da placa 3D (estado global em PlateProvider). */
export default function ColorSlide() {
  const { variant, setVariant } = usePlate();
  const card = useRef(null);
  const first = useRef(true);

  // gira a placa a cada troca de cor
  useGSAP(
    () => {
      if (first.current) { first.current = false; return; }
      if (prefersReducedMotion()) return;
      gsap.fromTo(card.current, { rotationY: -140 }, { rotationY: 0, duration: 1, ease: 'back.out(1.3)' });
    },
    { dependencies: [variant] }
  );

  return (
    <div className={styles.colorSlide}>
      <div className={styles.colorPlate}>
        <PlateCard variant={variant} cardRef={card} scene />
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
    </div>
  );
}
