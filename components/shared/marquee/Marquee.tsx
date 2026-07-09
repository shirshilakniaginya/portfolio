import styles from "./marquee.module.css";

const items = [
  "Лендинги",
  "Промо-сайты",
  "Редизайн",
  "Сайты услуг",
  "Адаптив",
  "Анимации",
];

export function Marquee() {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div className={styles.group} key={copy}>
            {items.map((item) => (
              <span className={styles.item} key={item}>
                {item}
                <span className={styles.dot} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
