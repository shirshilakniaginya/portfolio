import { ReactNode } from "react";
import styles from "./page-shell.module.css";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className={styles.pageShell}>
      <aside className={styles.sideRail}>
        <div className={styles.railLine} />
        <div className={styles.railCopy}>
          <span>Portfolio</span>
          <span>Calm editorial websites and systems</span>
        </div>
      </aside>

      <main className={styles.pageContent}>{children}</main>
    </div>
  );
}
