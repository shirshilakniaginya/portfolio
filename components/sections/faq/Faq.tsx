"use client";

import { useRef } from "react";
import gsap from "gsap";
import { reachGoal } from "@/lib/metrika";
import styles from "./faq.module.css";

const TG_HANDLE_URL = "https://t.me/DSVRandom";

// Answers must stay in sync with the visible text: the same strings feed the
// FAQPage JSON-LD below, and Yandex/Google check that markup matches the page.
const FAQ_ITEMS = [
  {
    q: "Сколько стоит сделать сайт?",
    a: "Цена зависит от объёма: у лендинга, многостраничного сайта и редизайна разный состав работ. После короткого брифа фиксирую стоимость и срок до старта.",
  },
  {
    q: "Сколько времени занимает создание сайта?",
    a: "Лендинг обычно занимает 1–2 недели, многостраничный сайт или редизайн: от 3 недель. Точный срок фиксирую до начала работы.",
  },
  {
    q: "Как проходит работа?",
    a: "Сначала уточняю задачу и собираю структуру. Затем делаю дизайн, адаптивную вёрстку и запускаю сайт. На каждом этапе показываю результат и согласовываю правки.",
  },
  {
    q: "Вы работаете удалённо?",
    a: "Да, работаю удалённо с клиентами по всей России. Общаемся и согласовываем этапы в Telegram, материалы передаём онлайн.",
  },
  {
    q: "Делаете редизайн существующего сайта?",
    a: "Да. Разбираю, что мешает текущему сайту приносить заявки, обновляю структуру и дизайн, заново собираю адаптивную вёрстку.",
  },
  {
    q: "Что нужно, чтобы начать?",
    a: "Напишите, чем занимаетесь и какую задачу должен решить сайт. Если сайт уже есть, пришлите ссылку. После этого я уточню детали и предложу структуру работы.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      details.open = !details.open;
      return;
    }

    gsap.killTweensOf(panel);

    if (!details.open) {
      details.open = true;
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => gsap.set(panel, { clearProps: "height" }),
        },
      );
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          details.open = false;
          gsap.set(panel, { clearProps: "height,opacity" });
        },
      });
    }
  };

  return (
    <details className={styles.item} ref={detailsRef}>
      <summary className={styles.question} onClick={toggle}>
        {q}
        <span className={styles.plus} aria-hidden="true">
          +
        </span>
      </summary>
      <div className={styles.panel} ref={panelRef}>
        <p className={styles.answer}>{a}</p>
      </div>
    </details>
  );
}

export function Faq() {
  return (
    <section className={styles.section} id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.label}>
            <span className={styles.kicker}>{"// 04 Вопросы"}</span>
            <h2 className={styles.kickerSub}>Вопросы о создании сайта</h2>
          </div>

          <div className={styles.list}>
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}

            <a
              className={styles.closing}
              href={TG_HANDLE_URL}
              onClick={() => reachGoal("tg_click")}
              rel="noreferrer"
              target="_blank"
            >
              Задать вопрос в Telegram
              <span className={styles.closingPlus} aria-hidden="true">
                +
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
