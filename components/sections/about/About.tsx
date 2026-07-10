"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { profile } from "@/lib/home-content";
import styles from "./about.module.css";

const FIELDS = [
  { label: "Имя", value: "Дмитрий" },
  { label: "Роль", value: profile.role },
  { label: "Формат", value: "Удалённо" },
  { label: "Статус", value: "Открыт к проектам" },
] as const;

const SKILLS = [
  { label: "UX/UI дизайн", value: 95 },
  { label: "Веб-дизайн", value: 92 },
  { label: "Проектирование", value: 88 },
  { label: "Фронтенд", value: 80 },
] as const;

const SECOND_PARAGRAPH =
  "Верю в ясность, точность и осознанный подход: каждый блок и каждый пиксель на странице работают на заявку.";

export function About() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add(styles.in));
      return;
    }

    els.forEach((el) => el.classList.add(styles.pre));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const fallback = window.setTimeout(() => els.forEach((el) => el.classList.add(styles.in)), 1600);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section ref={rootRef} className={styles.section} id="about">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.label} data-reveal>
            <span className={styles.kicker}>{"// 02 Обо мне"}</span>
            <span className={styles.kickerSub}>Профиль</span>
          </div>

          <div className={styles.photoWrap} data-reveal>
            <Image
              src="/about/section-portrait.png"
              alt="Дмитрий — веб-дизайнер и разработчик"
              className={styles.photo}
              width={1254}
              height={1254}
            />
          </div>

          <dl className={styles.fields} data-reveal>
            {FIELDS.map((field) => (
              <div className={styles.field} key={field.label}>
                <dt className="d-label">{field.label}</dt>
                <dd className="d-value">{field.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.text} data-reveal>
            <p>{profile.about}</p>
            <p>{SECOND_PARAGRAPH}</p>
          </div>

          <div className={styles.bars}>
            {SKILLS.map((skill) => (
              <div className={styles.bar} data-reveal key={skill.label}>
                <div className={styles.barHead}>
                  <span className={styles.barLabel}>{skill.label}</span>
                  <span className={styles.barValue}>{skill.value}%</span>
                </div>
                <span className={styles.barTrack}>
                  <i
                    className={styles.barFill}
                    style={{ "--bar-w": `${skill.value}%` } as React.CSSProperties}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
