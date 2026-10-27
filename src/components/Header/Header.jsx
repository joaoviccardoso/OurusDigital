import { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import { useLenis } from '../../providers/SmoothScrollProvider';
import styles from './Header.module.css';

const LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'como-funciona', label: 'Como funciona' },
  // { id: 'modelos', label: 'Modelos' },
  { id: 'motivos', label: 'Por que escolher' },
  { id: 'modelos', label: 'Modelos' },
];

export default function Header() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');

  // destaca o link da seção que está na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // fecha o menu mobile com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // fecha o menu mobile ao ir para o desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const goTo = (e, id) => {
    e.preventDefault();
    setOpen(false);

    const el = document.getElementById(id);
    if (!el) {
      console.warn(`[Header] Seção #${id} não encontrada. Confira o id no componente da seção.`);
      return;
    }

    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <Logo size={48} />

      {/* Desktop: links lado a lado */}
      <nav className={styles.nav} aria-label="Navegação principal">
        {LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => goTo(e, id)}
            className={`${styles.link} ${active === id ? styles.active : ''}`}
            aria-current={active === id ? 'true' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Mobile: hambúrguer */}
      <button
        type="button"
        className={`${styles.menu} ${open ? styles.menuOpen : ''}`}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Painel do menu mobile */}
      <div className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
        {LINKS.map(({ id, label }) => (
          <a key={id} href={`#${id}`} onClick={(e) => goTo(e, id)}>
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}