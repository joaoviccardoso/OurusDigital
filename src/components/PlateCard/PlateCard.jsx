import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import '@google/model-viewer';
import { PLATE_MODELS, PLATE_RATIO, PLATE_VARIANT_NAMES, PLATE_YAW_OFFSET } from '../../config/models';
import styles from './PlateCard.module.css';

/**
 * Adaptador: o GSAP anima { rotationY, rotationX } neste objeto (em graus) e ele converte
 * para a câmera do <model-viewer>. Assim o resto do projeto (hook da placa, Seção 3, Seção 5)
 * continua usando cardRef exatamente como antes.
 *
 * Extras (não enumeráveis, o GSAP não os enxerga):
 *  - sync():    lê o ângulo atual da câmera (inclui o que o usuário arrastou)
 *  - restore(): reaplica o ângulo guardado na câmera
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

  const sync = () => {
    const o = getEl()?.getCameraOrbit?.();
    if (!o) return;
    ry = PLATE_YAW_OFFSET - (o.theta * 180) / Math.PI;
    rx = 90 - (o.phi * 180) / Math.PI;
  };

  return Object.defineProperties({}, {
    rotationY: { enumerable: true, get: () => ry, set: (v) => { ry = v; apply(); } },
    rotationX: { enumerable: true, get: () => rx, set: (v) => { rx = v; apply(); } },
    sync: { value: sync },
    restore: { value: apply },
  });
}

const assign = (ref, value) => {
  if (!ref) return;
  if (typeof ref === 'function') ref(value);
  else ref.current = value;
};

/**
 * Placa 3D (modelo .glb). Usada na Hero/Seção 2 (stage fixo), Seção 3 e Seção 5.
 *  - variant:     'blue' | 'black'
 *  - cardRef:     recebe o "handle" de rotação (rotationY / rotationX) para o GSAP
 *  - interactive: permite o usuário arrastar para girar a placa (camera-controls)
 */
export default function PlateCard({ variant = 'blue', cardRef, className = '', interactive = false }) {
  const viewer = useRef(null);
  const refHolder = useRef(cardRef);
  refHolder.current = cardRef;

  const handle = useMemo(() => makeHandle(() => viewer.current), []);

  // layout effect: o handle existe antes dos useGSAP dos componentes pais
  useLayoutEffect(() => {
    assign(refHolder.current, handle);
    return () => assign(refHolder.current, null);
  }, [handle]);

  // guarda o ângulo do usuário e o reaplica quando o modelo (cor) recarrega
  useEffect(() => {
    const el = viewer.current;
    if (!el || !interactive) return undefined;

    const onCamera = (e) => {
      if (e.detail?.source === 'user-interaction') handle.sync();
    };
    const onLoad = () => handle.restore();

    el.addEventListener('camera-change', onCamera);
    el.addEventListener('load', onLoad);
    return () => {
      el.removeEventListener('camera-change', onCamera);
      el.removeEventListener('load', onLoad);
    };
  }, [handle, interactive]);

  const extra = PLATE_VARIANT_NAMES ? { 'variant-name': PLATE_VARIANT_NAMES[variant] } : {};

  // só passa os atributos quando interativo (no React 18, `false` viraria o atributo "false" e ligaria o recurso)
  const interactiveProps = interactive
    ? {
        'camera-controls': true,
        'touch-action': 'pan-y', // arrasta na horizontal; a página ainda rola na vertical
        'min-camera-orbit': 'auto 25deg auto', // impede virar de ponta-cabeça
        'max-camera-orbit': 'auto 155deg auto',
      }
    : {};

  return (
    <div
      className={`${styles.wrap} ${interactive ? styles.interactive : ''} ${className}`}
      data-variant={variant}
      style={{ '--plate-ratio': PLATE_RATIO }}
    >
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
        {...interactiveProps}
        {...extra}
      />
    </div>
  );
}