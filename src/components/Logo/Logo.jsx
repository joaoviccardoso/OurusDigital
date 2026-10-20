import { useState } from 'react';
import { BRAND } from '../../config/site';
import styles from './Logo.module.css';

/** Usa /images/logo.png; se o arquivo ainda não existir, mostra um monograma. */
export default function Logo({ size = 30 }) {
  const [failed, setFailed] = useState(false);
  return (
    <a href="#top" className={styles.logo} style={{ '--size': `${size}px` }} aria-label={BRAND}>
      {failed ? (
        <span className={styles.fallback}>OD</span>
      ) : (
        <img src="/images/logoOurus.png" alt={BRAND} onError={() => setFailed(true)} />
      )}
    </a>
  );
}
