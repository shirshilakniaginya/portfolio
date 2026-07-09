"use client";
import styles from "./footer.module.css";

const MANIFEST = [
  "Системный дизайн. Чистый код.",
  "Осознанный подход к каждому блоку.",
  "Работаю удалённо по всему миру.",
  "Сайты, которые ведут к заявке.",
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <a className={styles.brand} href="#hero" onClick={scrollToTop} aria-label="В начало">
            <span className={styles.brandBadge}>SHTQ</span>
          </a>

          <p className={styles.manifest}>
            {MANIFEST.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>

          <div className={styles.block}>
            <span>© {year} SHTQ.PRO</span>
            <span className={styles.blockMuted}>Все права защищены</span>
          </div>

          <div className={styles.block}>
            <span>Версия 1.0.0</span>
            <span className={styles.blockMuted}>Сделано с умыслом</span>
          </div>

          <a
            className={styles.topBtn}
            href="#hero"
            onClick={scrollToTop}
            aria-label="Наверх"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
