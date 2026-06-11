"use client";

import styles from "./footer.module.css";

export function Footer() {
  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <span className={styles.meta}>Made by shttq</span>
      <span className={styles.rights}>All rights reserved</span>
      <a className={styles.link} href="#top" onClick={scrollToTop}>
        Наверх ↑
      </a>
    </footer>
  );
}
