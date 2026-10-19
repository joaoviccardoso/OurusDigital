import { BRAND } from '../../config/site';
import Logo from '../Logo/Logo';
import { ShieldIcon } from '../icons';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Logo size={44} />
        <span>{BRAND}</span>
      </div>

      <p className={styles.about}>
        Tecnologia NFC e QR Code feitos para aumentar avaliações legítimas no Google Meu Negócio.
      </p>

      <nav className={styles.links} aria-label="Links institucionais">
        <a href="#">Termos de Uso</a>
        <a href="#">Políticas de Privacidade</a>
        <a href="#">Garantia 100%</a>
      </nav>

      <p className={styles.seal}><ShieldIcon /> Total conformidade com diretrizes do Google</p>

      <p className={styles.copy}>© {new Date().getFullYear()} {BRAND} Brasil. Todos os direitos reservados.</p>
    </footer>
  );
}
