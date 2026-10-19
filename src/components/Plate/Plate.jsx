import { usePlate } from '../../providers/PlateProvider';
import PlateCard from '../PlateCard/PlateCard';
import styles from './Plate.module.css';

/**
 * Stage fixo com a placa principal. Camadas (cada uma animada por um motivo):
 *  mover  -> posição vertical guiada pelo scroll (Hero → Como funciona)
 *  exiter -> saída da placa quando a Seção 2 termina
 *  scaler -> animação de entrada
 *  float  -> flutuação idle
 *  card   -> rotação 3D
 */
export default function Plate() {
  const { refs, variant } = usePlate();
  const set = (key) => (el) => { refs.current[key] = el; };

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.mover} ref={set('mover')}>
        <div className={styles.layer} ref={set('exiter')}>
          <div className={`${styles.layer} ${styles.scaler}`} ref={set('scaler')}>
            <div className={styles.layer} ref={set('float')}>
              <PlateCard variant={variant} cardRef={set('card')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
