import { useState } from 'react';
import styles from './ImageSlot.module.css';

/**
 * Imagem com fallback. Coloque o arquivo em public/images e passe src="/images/arquivo.png".
 * placeholder=false -> se a imagem não existir, não renderiza nada.
 */
export default function ImageSlot({ src, alt = '', className = '', placeholder = true, ratio }) {
  const [failed, setFailed] = useState(false);
  if (failed && !placeholder) return null;
  return (
    <div className={`${styles.slot} ${failed ? styles.empty : ''} ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {failed ? <span>Imagem</span> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
}
