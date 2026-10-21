import { WHATSAPP_URL } from '../../config/site';
import whatsappIcon from '/images/whatsapp.png';
import styles from './WhatsAppFloat.module.css';

export function WhatsAppIcon({ size = 40 }) {
  return (
    <img
      src={whatsappIcon}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      draggable="false"
      className={styles.icon}
    />
  );
}

export default function WhatsAppFloat() {
  return (
    <a
      className={styles.fab}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}