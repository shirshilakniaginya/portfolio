"use client";

import type { MouseEvent } from "react";
import { useLayoutEffect, useRef } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { gsap } from "@/lib/gsap-setup";
import { ToolPlayground } from "./ToolPlayground";
import styles from "./hero.module.css";

const TITLE_LINES = ["Создам сайт", "Сделаю редизайн" ] as const;

const PARAGRAPH =
  "Делаю лендинги, промо-сайты и сайты услуг для бизнеса: продумываю структуру, дизайн, адаптив и фронтенд так, чтобы страница выглядела цельно и вела человека к заявке.";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" width="22" height="22" className={styles.ctaArrow}>
      <path d="M4 11h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path
        d="M11.5 5.5 17 11l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("contact");
    if (!target) return;

    event.preventDefault();

    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 72);
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(top, true);
    else window.scrollTo({ top, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", root);
    const reveals = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]", root);
    const demo = root.querySelector<HTMLElement>("[data-hero-demo]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set([...lines, ...reveals], { opacity: 1, yPercent: 0, y: 0 });
      if (demo) gsap.set(demo, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(lines, { yPercent: 115 });
      gsap.set(reveals, { opacity: 0, y: 18 });
      if (demo) gsap.set(demo, { opacity: 0, y: 24, scale: 0.985 });

      const tl = gsap.timeline({ defaults: { ease: "editorialOut" } });
      if (demo) {
        tl.to(demo, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "editorialSoft" }, 0.32);
      }
      tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.09 }, 0.1).to(
        reveals,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        0.5,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.hero} id="about" data-ui="hero-section">
      <span className={styles.railLabel} aria-hidden="true">
        Сайты под заявки — 2026
      </span>

      <div className={styles.top}>
        <div className={styles.metaRow} data-hero-reveal>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Веб-дизайн и разработка сайтов
          </span>
          <span className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            Открыт к проектам
          </span>
        </div>

        <h1 className={styles.title}>
          <span className={styles.lineMask}>
            <span className={styles.line} data-hero-line>
              {TITLE_LINES[0]}
            </span>
          </span>
          <span className={`${styles.lineMask} ${styles.lineMaskShift}`}>
            <span className={`${styles.line} ${styles.lineOutline}`} data-hero-line>
              {TITLE_LINES[1]}
            </span>
          </span>
        </h1>

        <div className={styles.subRow}>
          <p className={styles.lead} data-hero-reveal>
            {PARAGRAPH}
          </p>

          <a className={styles.cta} href="#contact" onClick={handleContactClick} data-hero-reveal>
            <span className={styles.ctaText}>Обсудить сайт</span>
            <span className={styles.ctaCircle} aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>

      <div className={styles.stageBand} data-hero-demo>
        <ToolPlayground />
      </div>
    </section>
  );
}
