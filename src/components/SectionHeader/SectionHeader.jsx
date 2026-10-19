import styles from './SectionHeader.module.css';

/** tone: 'dark' (padrão, fundo escuro) | 'light' (fundo branco). style: aceita variáveis, ex.: { '--title-max': '8ch' } */
export default function SectionHeader({ icon, badge, title, children, tone = 'dark', style }) {
  return (
    <header className={`${styles.header} ${tone === 'light' ? styles.light : ''}`} style={style}>
      <p className={styles.badge}>{icon}<span>{badge}</span></p>
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.sub}>{children}</p>}
    </header>
  );
}