"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./work-gallery.module.css";

type WorkCard = {
  index: string;
  category: string;
  title: string;
  description: string;
  tags?: string[];
  image: string;
  imageAlt: string;
  imagePosition?: string;
  href?: string;
};

const workCards: WorkCard[] = [
  {
    index: "01",
    category: "Сайт для бренда",
    title: "Конный клуб «Торнадо»",
    description:
      "Промо-сайт конного клуба: крупный первый экран, программы с ценами и длительностью, запись через форму с выбором занятия.",
    tags: ["Дизайн + фронтенд", "Программы и цены", "Форма записи", "Адаптив"],
    image: "/cases/horseschool/live/preview.webp",
    imageAlt: "HorseSchool website preview",
    imagePosition: "top",
    href: "/cases/horseschool/live/",
  },
  {
    index: "02",
    category: "Интернет-магазин",
    title: "Кофейня\n«Coffee People»",
    description:
      "Рабочая корзина и оформление заказа. Заказы уходят в админку. Товары добавляются и редактируются через CMS без касания кода.",
    tags: ["Дизайн + фронтенд", "CMS", "Корзина", "Админка", "Адаптив", "Бэкенд"],
    image: "/cases/coffee-preview.webp",
    imageAlt: "Coffee Shop preview",
    imagePosition: "top",
    href: "/cases/coffeeshop/",
  },
  {
    index: "03",
    category: "Личный сайт",
    title: "Сайт стримера HAART",
    description:
      "Личный сайт стримера по Marvel Rivals. Контент редактируется через подключённую CMS, статус трансляции отслеживается в реальном времени.",
    tags: ["Дизайн + фронтенд", "CMS", "Адаптив"],
    image: "/work-gallery/HAARTPREVIEW.webp",
    imageAlt: "xxhaartxx.pro preview",
    imagePosition: "top",
    href: "https://xxhaartxx.pro",
  },
  {
    index: "04",
    category: "Реклама продукта",
    title: "Реклама продукта\nNOXA",
    description: "Реклама продукта: тёмно, кинематографично, без лишнего.",
    tags: ["Дизайн + фронтенд", "Адаптив", "Fashion Tech визуал"],
    image: "/cases/4promo.webp",
    imageAlt: "NOXA landing preview",
    imagePosition: "top",
    href: "/cases/noxa/",
  },
];

const hoverTransition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function WorkGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const checkVisibility = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.9) {
        setIsVisible(true);
      }
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  return (
    <section className={styles.section} id="work">
      <div className={styles.sectionInner} ref={sectionRef}>
        <div className={styles.grid}>
          {workCards.map((card, index) => {
            const hasLink = Boolean(card.href);

            const content = (
              <>
                <div className={styles.cardMeta}>
                  <span className={styles.cardIndex}>{card.index}</span>
                  <span className={styles.cardCategory}>{card.category}</span>
                </div>

                <div className={styles.cardPreview}>
                  <motion.div
                    className={styles.cardPreviewMedia}
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.02, transition: hoverTransition },
                    }}
                  >
                    <Image
                      alt={card.imageAlt}
                      className={styles.cardPreviewImage}
                      fill
                      sizes="(max-width: 820px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      src={card.image}
                      style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
                    />
                  </motion.div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardHeadingRow}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    {hasLink && (
                      <motion.span
                        aria-hidden="true"
                        className={styles.cardArrow}
                        variants={{
                          rest: { x: 0, y: 0 },
                          hover: { x: 2, y: -2, transition: hoverTransition },
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path
                            d="M1.25 11.75L11.75 1.25M11.75 1.25H4M11.75 1.25V9"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.45"
                          />
                        </svg>
                      </motion.span>
                    )}
                  </div>

                  <p className={styles.cardDescription}>{card.description}</p>
                  {card.tags && card.tags.length > 0 && (
                    <div className={styles.cardTags}>
                      {card.tags.map((tag, tagIndex) => (
                        <span className={styles.cardTagItem} key={tag}>
                          {tagIndex > 0 && <span className={styles.cardTagDivider} aria-hidden="true" />}
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            );

            return (
              <motion.article
                className={styles.card}
                key={card.index}
                initial={{ opacity: 0, y: 18 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                {card.href ? (
                  <motion.a
                    animate="rest"
                    aria-label={`Open ${card.title}`}
                    className={styles.cardSurface}
                    href={card.href}
                    initial="rest"
                    rel="noreferrer"
                    target="_blank"
                    transition={hoverTransition}
                    whileHover="hover"
                  >
                    {content}
                  </motion.a>
                ) : (
                  <div className={`${styles.cardSurface} ${styles.cardSurfaceStatic}`}>
                    {content}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
