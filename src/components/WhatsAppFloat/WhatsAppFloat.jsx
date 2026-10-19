import { WHATSAPP_URL } from '../../config/site';
import styles from './WhatsAppFloat.module.css';

export function WhatsAppIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.47 15.03L2 22l5.1-1.34A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-3.02.8.81-2.95-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 4.2c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.78 2.84 4.4 3.87 2.17.85 2.6.68 3.07.64.47-.04 1.52-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.07-.11-.24-.17-.5-.3-.26-.13-1.52-.75-1.76-.84-.23-.09-.4-.13-.58.13-.17.26-.66.84-.81 1.01-.15.17-.3.2-.56.07-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.52.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44h-.5Z" />
    </svg>
  );
}

export default function WhatsAppFloat() {
  return (
    <a className={styles.fab} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
      <WhatsAppIcon />
    </a>
  );
}
