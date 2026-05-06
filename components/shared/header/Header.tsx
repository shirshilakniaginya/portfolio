import Link from "next/link";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`main-container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.mark}>AV</span>
          <span className={styles.label}>WEB &amp; UI/UX DESIGNER</span>
        </div>

        <nav aria-label="Primary" className={styles.nav}>
          <Link className={`${styles.navLink} ${styles.active}`} href="#work">
            Work
          </Link>
          <Link className={styles.navLink} href="#about">
            About
          </Link>
          <Link className={styles.navLink} href="#contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
