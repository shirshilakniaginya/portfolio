"use client";

import { useRef } from "react";
import gsap from "gsap";
import styles from "./faq.module.css";

// Answers must stay in sync with the visible text: the same strings feed the
// FAQPage JSON-LD below, and Yandex/Google check that markup matches the page.
const FAQ_ITEMS = [
  {
    q: "Сколько стоит сделать сайт?",
    a: "Зависит от объёма: одностраничный лендинг — один бюджет, многостраничный сайт услуг или редизайн — другой. После короткого брифа называю фиксированную цену и срок, дальше они не меняются.",
  },
  {
    q: "Сколько времени занимает создание сайта?",
    a: "Лендинг обычно занимает одну-две недели, сайт побольше или редизайн — от трёх. Точный срок фиксируем до старта вместе с ценой.",
  },
  {
    q: "Как проходит работа?",
    a: "Вы описываете задачу — я собираю структуру страницы, затем дизайн, затем адаптивная вёрстка и запуск. На каждом этапе показываю результат и вношу правки.",
  },
  {
    q: "Вы работаете удалённо?",
    a: "Да, полностью удалённо — с клиентами из Москвы и всей России. Общение и согласования — в Telegram, все материалы передаются онлайн.",
  },
  {
    q: "Делаете редизайн существующего сайта?",
    a: "Да. Разбираю, что мешает текущему сайту приносить заявки, обновляю структуру и дизайн, заново собираю адаптивную вёрстку.",
  },
  {
    q: "Что нужно, чтобы начать?",
    a: "Короткое описание: чем занимаетесь и какую задачу должен решать сайт. Если сайт уже есть — ссылка на него. Дальше бриф и предложение по структуре.",
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
          </div>
        </div>
      </div>
    </section>
  );
}
