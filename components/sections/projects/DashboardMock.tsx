import styles from "./mock.module.css";

const SIDE = ["Обзор", "Аналитика", "Проекты", "Отчёты"];
const STATS = [
  { value: "128k", label: "Активные" },
  { value: "24%", label: "Рост" },
  { value: "71.2%", label: "Вовлечённость" },
];

const LINE = "M0,86 C42,78 70,92 112,66 C152,42 182,82 222,58 C262,36 300,50 340,28 C362,20 382,24 400,16";
const AREA = `${LINE} L400,118 L0,118 Z`;

/** Placeholder analytics dashboard mock (reference: Inertia Labs). */
export function DashboardMock({ brand = "Inertia", url = "app.inertia.io" }: { brand?: string; url?: string }) {
  return (
    <div className={styles.frame}>
      <div className={styles.chrome}>
        <span className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
        <span className={styles.url}>{url}</span>
      </div>

      <div className={styles.dash}>
        <aside className={styles.dashSide}>
          <span className={styles.dashSideBrand}>{brand}</span>
          {SIDE.map((item, i) => (
            <span
              key={item}
              className={`${styles.dashSideItem} ${i === 1 ? styles.dashSideItemActive : ""}`}
            >
              {item}
            </span>
          ))}
        </aside>

        <div className={styles.dashMain}>
          <div className={styles.dashHead}>
            <h3 className={styles.dashTitle}>Аналитика, которая помогает принимать решения</h3>
            <span className={styles.dashChip}>За 30 дней</span>
          </div>

          <div className={styles.dashStats}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div className={styles.dashStatValue}>{s.value}</div>
                <div className={styles.dashStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className={styles.dashChart}>
            <span className={styles.dashCallout}>+28%</span>
            <svg viewBox="0 0 400 120" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6f5ad6" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#6f5ad6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={AREA} fill="url(#dashFill)" />
              <path d={LINE} stroke="#6f5ad6" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="400" cy="16" r="3.5" fill="#6f5ad6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
