import { useLayoutEffect, useMemo, useRef } from 'react';
import '@google/model-viewer';
import { PLATE_MODELS, PLATE_RATIO, PLATE_VARIANT_NAMES, PLATE_YAW_OFFSET } from '../../config/models';
import styles from './PlateCard.module.css';

/**
 * Adaptador: o GSAP anima { rotationY, rotationX } neste objeto (em graus) e ele converte
 * para a câmera do <model-viewer>. Assim o resto do projeto (hook da placa, Seção 3, Seção 5)
 * continua usando cardRef exatamente como antes.
 */
function makeHandle(getEl) {
  let ry = 0;
  let rx = 0;
  const apply = () => {
    const el = getEl();
    if (!el) return;
    el.cameraOrbit = `${PLATE_YAW_OFFSET - ry}deg ${90 - rx}deg auto`;
    el.jumpCameraToGoal?.(); // sem suavização: o scrub do GSAP já suaviza
  };
  return Object.defineProperties({}, {
    rotationY: { enumerable: true, get: () => ry, set: (v) => { ry = v; apply(); } },
    rotationX: { enumerable: true, get: () => rx, set: (v) => { rx = v; apply(); } },
  });
}

const assign = (ref, value) => {
  if (!ref) return;
  if (typeof ref === 'function') ref(value);
  else ref.current = value;
};

/**
 * Placa 3D (modelo .glb). Usada na Hero/Seção 2 (stage fixo), Seção 3 e Seção 5.
 *  - variant: 'blue' | 'black'
 *  - cardRef: recebe o "handle" de rotação (rotationY / rotationX) para o GSAP
 *  - scene  : mantido por compatibilidade (não é mais necessário)
 */
export default function PlateCard({ variant = 'blue', cardRef, className = '' }) {
  const viewer = useRef(null);
  const refHolder = useRef(cardRef);
  refHolder.current = cardRef;

  const handle = useMemo(() => makeHandle(() => viewer.current), []);

  // layout effect: o handle existe antes dos useGSAP dos componentes pais
  useLayoutEffect(() => {
    assign(refHolder.current, handle);
    return () => assign(refHolder.current, null);
  }, [handle]);

  const extra = PLATE_VARIANT_NAMES ? { 'variant-name': PLATE_VARIANT_NAMES[variant] } : {};

  return (
    <div className={`${styles.wrap} ${className}`} data-variant={variant} style={{ '--plate-ratio': PLATE_RATIO }}>
      <i className={styles.glow} />
      <model-viewer
        ref={viewer}
        class={styles.model}
        src={PLATE_MODELS[variant]}
        alt="Placa NFC e QR Code para avaliações no Google"
        camera-orbit={`${PLATE_YAW_OFFSET}deg 90deg auto`}
        field-of-view="28deg"
        environment-image="neutral"
        exposure="1.05"
        shadow-intensity="0"
        interaction-prompt="none"
        disable-zoom
        disable-pan
        disable-tap
        loading="eager"
        {...extra}
      />
    </div>
  );
}