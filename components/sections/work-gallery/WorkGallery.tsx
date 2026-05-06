import { works } from "@/lib/portfolio-content";
import styles from "./work-gallery.module.css";

const gradients = [
  "linear-gradient(135deg, #FDFDFD 0%, #EAEFF6 100%)",
  "linear-gradient(135deg, #F0EAE4 0%, #DFD1C7 100%)",
  "linear-gradient(135deg, #FBFBFF 0%, #EBE8F7 100%)",
  "linear-gradient(135deg, #FAFAFA 0%, #E6E6E6 100%)",
] as const;

const categories = [
  "UI/UX, WEB DESIGN, NEXT.JS",
  "UI/UX, WEB DESIGN, TILDA",
  "UI/UX, WEB DESIGN, NEXT.JS",
  "UI/UX, WEB DESIGN, NEXT.JS",
] as const;

export function WorkGallery() {
  return (
    <section className={`${styles.section} reveal-block`} id="work">
      <div className="main-container">
        <div className={styles.sectionHeader}>
          <div className={styles.headerSubtitle}>ИЗБРАННЫЕ РАБОТЫ</div>
          <div className={styles.headerRow}>
            <h2>Короткая подборка проектов<br />в разных направлениях. </h2>
            <p className={styles.headerDesc}>
              Каждый проект — это продуманная структура,<br />
              аккуратная визуальная система и фокус<br />
              на целях пользователя и бизнеса.
            </p>
            <a href="#" className={styles.secondaryButton}>
              Смотреть все работы
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.grid}>
          {works.map((work, index) => (
            <article className={styles.card} key={work.title}>
              <div
                className={styles.cardImage}
                style={{ background: gradients[index % gradients.length] }}
              />
              <div className={styles.cardContent}>
                <div className={styles.cardCategory}>
                  {categories[index % categories.length]}
                </div>
                <h3 className={styles.cardTitle}>{work.title}</h3>
                <p className={styles.cardDescription}>{work.description}</p>
                <div className={styles.cardBottom}>
                  <div className={styles.cardYear}>
                    {work.label?.includes("01")
                      ? "2024"
                      : work.label?.includes("02")
                        ? "2024"
                        : "2024"}
                  </div>
                  <button className={styles.cardLinkButton}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
