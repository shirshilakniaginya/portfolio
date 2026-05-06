"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type AboutCard = {
  id: string;
  label: string;
  title: string;
  shortTitle?: string;
  text: string;
  shortText?: string;
  tags: string[];
  icon: string;
  image?: string;
};

const aboutCards: AboutCard[] = [
  {
    id: "about",
    label: "ОБО МНЕ",
    title: "Проектирую интерфейсы, которые выглядят спокойно и работают понятно.",
    shortTitle: "Обо мне",
    text: "Собираю сайты и интерфейсы вокруг структуры, ритма, смысла и визуальной дисциплины. В работе важны не эффекты ради эффектов, а ясная подача, доверие и удобный сценарий для пользователя.",
    shortText: "Спокойные интерфейсы, ясная подача и рабочая визуальная дисциплина.",
    image: "/about/portrait.png",
    icon: "00",
    tags: ["UX-структура", "UI-дизайн", "Лендинги", "Портфолио"],
  },
  {
    id: "structure",
    label: "ПОДХОД",
    title: "Сначала структура, потом визуальный слой.",
    shortTitle: "Сначала структура",
    text: "Сначала собираю сценарий, иерархию и логику страницы. Визуальный слой появляется после того, как понятна роль каждого блока.",
    shortText: "Собираю сценарий, иерархию и логику страницы до визуального слоя.",
    icon: "01",
    tags: ["Сетка", "Сценарий"],
  },
  {
    id: "visual",
    label: "ВИЗУАЛ",
    title: "Чистый стиль без шаблонной декоративности.",
    shortTitle: "Чистый визуал",
    text: "Визуал держится на типографике, ритме, воздухе и точных акцентах. Без лишней декоративности и случайных эффектов.",
    shortText: "Типографика, ритм и акценты без лишней декоративности.",
    icon: "02",
    tags: ["Типографика", "Ритм"],
  },
  {
    id: "handoff",
    label: "ПРОЦЕСС",
    title: "Макет, который удобно передавать в разработку.",
    shortTitle: "Удобный handoff",
    text: "Компоненты, состояния и адаптивы собираются так, чтобы страницу было проще и быстрее реализовать без хаоса.",
    shortText: "Компоненты, состояния и адаптивы для быстрой реализации.",
    icon: "03",
    tags: ["Компоненты", "Handoff"],
  },
];

const contentTransition = {
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function AboutSlider() {
  const [activeId, setActiveId] = useState("about");

  const activeCard = useMemo(
    () => aboutCards.find((card) => card.id === activeId) ?? aboutCards[0],
    [activeId],
  );

  const inactiveCards = useMemo(
    () => aboutCards.filter((card) => card.id !== activeId),
    [activeId],
  );

  return (
    <section className="about-switcher reveal-block" id="about">
      <div className="main-container about-switcher__container">
        <article className="about-card about-card--active">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeCard.id}
              className="about-card__active-inner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={contentTransition}
            >
              {activeCard.image ? (
                <div className="about-card__photo-shell">
                  <Image
                    alt="Портрет веб-дизайнера"
                    className="about-card__photo"
                    height={248}
                    priority
                    quality={100}
                    sizes="(max-width: 1100px) 100vw, 240px"
                    src={activeCard.image}
                    width={240}
                  />
                </div>
              ) : (
                <div className="about-card__visual" aria-hidden="true">
                  <span>{activeCard.icon}</span>
                </div>
              )}

              <div className="about-card__content">
                <p className="about-card__label">{activeCard.label}</p>
                <h2>{activeCard.title}</h2>
                <p className="about-card__text">{activeCard.text}</p>

                <div className="about-card__tags">
                  {activeCard.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </article>

        <div className="about-switcher__list">
          {inactiveCards.map((card) => (
            <button
              key={card.id}
              type="button"
              className="about-card--small"
              onClick={() => setActiveId(card.id)}
            >
              <div className="about-card__small-top">
                <span className="about-card__small-icon">{card.icon}</span>
                <span className="about-card__small-label">{card.label}</span>
              </div>
              <strong className="about-card__small-title">{card.shortTitle ?? card.title}</strong>
              <p className="about-card__small-text">
                {card.shortText ?? card.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
