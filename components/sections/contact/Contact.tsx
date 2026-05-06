import { FlipAnchorButton } from "@/components/shared/buttons/FlipButton";
import styles from "./contact.module.css";

export function Contact() {
  return (
    <section className={`${styles.section} reveal-block`} id="contact">
      <div className={`main-container ${styles.grid}`}>
        <div className={styles.leftColumn}>
          <h2 className={styles.title}>Давай обсудим формат, объем и структуру проекта.</h2>
          <p className={styles.description}>Пришли нишу, основную цель и референсы я предложу структуру и подход, которые дадут результат.</p>
        </div>

        <div className={styles.middleColumn}>
          <div className={styles.buttons}>
            <FlipAnchorButton href="mailto:hello@portfolio.dev" label="Написать на почту" tone="dark" className={styles.contactButton} />
            <FlipAnchorButton href="https://t.me/" label="Telegram" tone="light" className={styles.contactButton} rel="noreferrer" target="_blank" />
            <FlipAnchorButton href="#about" label="Скачать CV" tone="light" className={styles.contactButton} />
          </div>
          <div className={styles.status}>
            <span className={styles.statusDot}></span> Быстрый ответ в течение 24 часов
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.contactCard}>
            <div className={styles.contactCardLabel}>С ЧЕГО ЛУЧШЕ НАЧАТЬ</div>
            <p className={styles.contactCardText}>Лучше всего подойдут<br />для портфолио, экспертных<br />сайтов и лендингов с<br />акцентом на конверсию<br />и сильную структуру.</p>
            <div className={styles.contactCardImage}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
