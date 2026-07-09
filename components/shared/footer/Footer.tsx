"use client";

import { socials } from "@/lib/home-content";
import styles from "./footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <span className={styles.note}>Работаю удалённо по всему миру</span>

          <ul className={styles.socials}>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  className={styles.social}
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <a className={styles.top} href="#top" onClick={scrollToTop}>
            Наверх ↑
          </a>
        </div>

        <a
          className={styles.wordmark}
          href="#top"
          onClick={scrollToTop}
          aria-label="Наверх — shtq.pro"
        >
          SHTQ.PRO
        </a>

        <div className={styles.bottomRow}>
          <span className={styles.brand}>© {year} — shtq.pro</span>
          <span className={styles.meta}>Веб-дизайн и разработка сайтов</span>
        </div>
      </div>
    </footer>
  );
}
