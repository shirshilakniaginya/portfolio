"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import styles from "./about.module.css";

type AboutCard = {
  id: string;
  label: string;
  title: string;
  shortTitle?: string;
  text: string;
  shortText?: string;
  tags?: string[];
  skills?: string[];
  tools?: {
    label: string;
    icons: {
      src: string;
      alt: string;
    }[];
  }[];
  icon: string;
  image?: string;
};

const aboutCards: AboutCard[] = [
  {
    id: "about",
    label: "ОБО МНЕ",
    title: "Проектирую интерфейсы, которые выглядят спокойно и работают понятно.",
    shortTitle: "Обо мне",
    text: "Делаю сайты и лендинги с акцентом на структуру, читаемость и понятный путь к действию. В работе использую Figma, Photoshop, Tilda, React, Next.js, HTML и CSS. Для меня важны аккуратный визуал, ясная логика и интерфейс, который легко поддерживать и развивать.",
    shortText: "Сайты и лендинги со спокойным визуалом, понятной структурой и рабочим сценарием.",
    image: "/about/portrait.png",
    icon: "00",
    skills: ["UI/UX дизайн", "Web design", "Структура лендингов", "Редакторская подача"],
    tools: [
      {
        label: "Figma",
        icons: [{ src: "/about/tools/figma.svg", alt: "Figma" }],
      },
      {
        label: "Photoshop",
        icons: [{ src: "/about/tools/photoshop.svg", alt: "Photoshop" }],
      },
      {
        label: "Tilda",
        icons: [{ src: "/about/tools/tilda.svg", alt: "Tilda" }],
      },
      {
        label: "React",
        icons: [{ src: "/about/tools/react.svg", alt: "React" }],
      },
      {
        label: "Next.js",
        icons: [{ src: "/about/tools/nextjs.svg", alt: "Next.js" }],
      },
      {
        label: "HTML / CSS",
        icons: [
          { src: "/about/tools/html5.svg", alt: "HTML5" },
          { src: "/about/tools/css3.svg", alt: "CSS3" },
        ],
      },
    ],
  },
  {
    id: "structure",
    label: "ПОДХОД",
    title: "Сначала структура, потом визуальный слой и уже после этого анимация.",
    shortTitle: "Сначала структура",
    text: "Собираю сценарий, иерархию и переходы до того, как начинаю делать визуальную часть. Важно, чтобы страница сразу читалась, вела к нужному действию и не требовала лишних объяснений. Такой подход помогает быстрее собирать и редактировать проект без хаоса.",
    shortText: "Сначала сценарий, иерархия и переходы, потом уже визуальная подача.",
    icon: "01",
    tags: ["сценарий", "иерархия", "логика", "анимация"],
  },
  {
    id: "visual",
    label: "ВИЗУАЛ",
    title: "Чистый стиль без шаблонной декоративности, только точный ритм и акценты.",
    shortTitle: "Чистый визуал",
    text: "Держу визуал на воздухе между блоками, контрасте, типографике и точных состояниях. Добавляю только те детали, которые усиливают интерфейс: скролл, ритм, аккуратные акценты и понятные переходы. Без лишнего шума и декоративной перегрузки.",
    shortText: "Важны воздух, иерархия, акценты и точные состояния интерфейса.",
    icon: "02",
    tags: ["скролл", "типографика", "ритм", "детали"],
  },
  {
    id: "handoff",
    label: "ПРОЦЕСС",
    title: "Макет, который удобно передавать в разработку и не страшно развивать дальше.",
    shortTitle: "Удобный handoff",
    text: "Закладываю изменяемые компоненты, понятные состояния и адаптив, чтобы проект было легче поддерживать, редактировать и расширять без лишних рисков. На этапе подготовки сразу проговариваю основные инструменты и рабочий процесс, чтобы потом было проще двигаться дальше.",
    shortText: "Изменяемые компоненты, состояния и адаптив для быстрой реализации.",
    icon: "03",
    tags: ["компоненты", "состояния", "адаптив", "handoff"],
  },
];

const contentTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function About() {
  const [activeId, setActiveId] = useState("about");

  const activeCard = useMemo(
    () => aboutCards.find((card) => card.id === activeId) ?? aboutCards[0],
    [activeId],
  );

  return (
    <section className={`${styles.section} reveal-block`} id="about">
      <div className={`main-container ${styles.container}`}>
        <div className={styles.list}>
          {aboutCards.map((card) => (
            <button
              key={card.id}
              type="button"
              className={`${styles.smallCard} ${card.id === activeId ? styles.smallCardActive : ""}`}
              onClick={() => setActiveId(card.id)}
            >
              <div className={styles.smallTop}>
                <span className={styles.smallIcon}>{card.icon}</span>
                <span className={styles.smallLabel}>{card.label}</span>
              </div>
              <strong className={styles.smallTitle}>{card.shortTitle ?? card.title}</strong>
              <p className={styles.smallText}>{card.shortText ?? card.text}</p>
            </button>
          ))}
        </div>

        <article className={`${styles.card} ${styles.cardActive}`}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeCard.id}
              className={styles.activeInner}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={contentTransition}
            >
              {activeCard.image ? (
                <div className={styles.photoShell}>
                  <Image
                    alt="Портрет веб-дизайнера"
                    className={styles.photo}
                    height={248}
                    priority
                    quality={100}
                    sizes="(max-width: 1100px) 100vw, 240px"
                    src={activeCard.image}
                    width={240}
                  />
                </div>
              ) : (
                <div className={styles.visual} aria-hidden="true">
                  <span>{activeCard.icon}</span>
                </div>
              )}

              <div className={styles.content}>
                <p className={styles.label}>{activeCard.label}</p>
                <h2>{activeCard.title}</h2>
                <p className={styles.text}>{activeCard.text}</p>

                {activeCard.skills || activeCard.tools ? (
                  <div className={styles.metaGroups}>
                    {activeCard.skills ? (
                      <div className={styles.metaGroup}>
                        <span className={styles.metaGroupLabel}>Навыки</span>
                        <div className={styles.tags}>
                          {activeCard.skills.map((skill) => (
                            <span key={skill}>{skill}</span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {activeCard.tools ? (
                      <div className={styles.metaGroup}>
                        <span className={styles.metaGroupLabel}>Инструменты</span>
                        <div className={styles.toolList}>
                          {activeCard.tools.map((tool) => (
                            <span key={tool.label} className={styles.toolItem}>
                              <span className={styles.toolIcons} aria-hidden="true">
                                {tool.icons.map((icon) => (
                                  <img
                                    key={icon.src}
                                    alt=""
                                    className={styles.toolIcon}
                                    height="16"
                                    src={icon.src}
                                    width="16"
                                  />
                                ))}
                              </span>
                              <span>{tool.label}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className={styles.tags}>
                    {activeCard.tags?.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </article>
      </div>
    </section>
  );
}
