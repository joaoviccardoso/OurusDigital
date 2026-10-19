import Logo from '../Logo/Logo';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo size={48} />
      <button type="button" className={styles.menu} aria-label="Abrir menu">
        <span /><span /><span />
      </button>
    </header>
  );
}
