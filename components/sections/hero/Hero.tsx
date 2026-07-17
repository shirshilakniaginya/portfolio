"use client";

import type { MouseEvent } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { gsap } from "@/lib/gsap-setup";
import styles from "./hero.module.css";

const TITLE_LINES = ["Создаю сайты", "для услуг и бизнеса."] as const;

const PARAGRAPH =
  "Делаю лендинги, промо-сайты и сайты услуг. Сам отвечаю за структуру, дизайн и разработку — от первого экрана до запуска.";

const CAPTION =
  "Один исполнитель на весь проект. Без передачи между дизайнером и разработчиком.";

const RAIL_NAV = [
  { href: "#work", num: "01", label: "Работы" },
  { href: "#about", num: "02", label: "Обо мне" },
  { href: "#contact", num: "03", label: "Контакты" },
  { href: "#faq", num: "04", label: "FAQ" },
] as const;

const FIELDS = [
  { label: "Сайты", value: "Лендинги · Промо-сайты" },
] as const;

function scrollToHash(event: MouseEvent<HTMLElement>) {
  const anchor = (event.target as HTMLElement).closest("a");
  const href = anchor?.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  event.preventDefault();
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(target, true, "top 72px");
  else target.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const clockRef = useRef<HTMLSpanElement | null>(null);

  // Live local time — DOM-direct so the component never re-renders.
  useEffect(() => {
    const node = clockRef.current;
    if (!node) return;
    const tick = () => {
      node.textContent = new Date().toLocaleTimeString("ru-RU", { hour12: false });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const masks = gsap.utils.toArray<HTMLElement>("[data-d-title]", root);
    const reveals = gsap.utils.toArray<HTMLElement>("[data-d-reveal]", root);
    const portrait = root.querySelector<HTMLElement>("[data-d-portrait]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;

    if (reduce || mobile) {
      root.dataset.introReady = "true";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "editorialOut" } });
      tl.fromTo(
        masks,
        { opacity: 0, yPercent: 110 },
        { opacity: 1, yPercent: 0, duration: 0.9, stagger: 0.1 },
        0.15,
      ).fromTo(
        reveals,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 },
        0.35,
      );
      if (portrait) {
        tl.fromTo(
          portrait,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1.1, ease: "editorialSoft" },
          0.3,
        );
      }
      root.dataset.introReady = "true";
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.hero} id="hero" data-ui="hero-section">
      <div className={styles.inner}>
        {/* Col 1 — system rail (~120px) */}
        <aside className={styles.rail}>
          <a className={styles.railBox} href="#hero" onClick={scrollToHash} aria-label="В начало">
            SHTQ
          </a>

          <nav className={styles.railNav} aria-label="Разделы" onClick={scrollToHash}>
            {RAIL_NAV.map((item) => (
              <a className={styles.railLink} href={item.href} key={item.href}>
                <em>{item.num}</em>
                <span className={styles.railLinkLabel}>{item.label}</span>
              </a>
            ))}
          </nav>

          <span className={styles.railStatus}>
            <em>Статус</em>
            <span className={styles.railStatusValue}>
              На связи
              <i className={styles.railStatusDot} aria-hidden="true" />
            </span>
          </span>
        </aside>

        {/* Col 2 — empty spacer (~220px) */}
        <div className={styles.spacer} aria-hidden="true" />

        {/* Col 3 — central hero (~1400px) */}
        <div className={styles.center}>
          <div className={styles.codes}>
            <span className={styles.code} data-d-reveal>
              <em>Статус</em>Открыт к проектам
            </span>
            <span className={styles.code} data-d-reveal>
              <em>Формат</em>Удалённо по России
            </span>
          </div>

          <div className={styles.centerStage}>
            {/* Portrait as a backdrop, anchored to the hero bottom */}
            <div className={styles.portraitWrap} data-d-portrait aria-hidden="true">
              <video
                className={styles.portrait}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/about/hero-portrait-dima.webp"
              >
                <source src="/about/hero-portrait-dima-loop.mp4" type="video/mp4" />
              </video>
              <Image
                src="/about/hero-portrait-dima.webp"
                alt=""
                className={`${styles.portrait} ${styles.portraitFallback}`}
                width={1280}
                height={720}
                priority
              />
            </div>

            <div className={styles.left}>
              <span className={styles.kicker} data-d-reveal>
                Веб-дизайн и разработка сайтов
              </span>

              <h1 className={styles.title}>
                {TITLE_LINES.map((line) => (
                  <span className={styles.lineMask} key={line}>
                    <span className={styles.titleLine} data-d-title>
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <p className={styles.sub} data-d-reveal>
                {PARAGRAPH}
              </p>

              <a className={styles.cta} href="#contact" onClick={scrollToHash} data-d-reveal>
                Рассказать о задаче
                <span className={styles.ctaPlus} aria-hidden="true">
                  +
                </span>
              </a>

              <span className={styles.squares} data-d-reveal aria-hidden="true">
                <i className={styles.squareOn} />
                <i />
                <i />
                <i />
              </span>
            </div>

            <div className={styles.right}>
              <span className={styles.ghost} data-d-reveal aria-hidden="true">
                <em>IX</em>01
              </span>

              <span className={styles.radar} data-d-reveal aria-hidden="true">
                <i className={styles.radarDot} />
                <i className={styles.radarTick} />
              </span>

              <p className={styles.caption} data-d-reveal>
                {CAPTION}
              </p>
            </div>
          </div>
        </div>

        {/* Col 4 — time + data pairs (~188px) */}
        <div className={styles.colA}>
          <span className={styles.code} data-d-reveal>
            <em>Локальное время</em>
            <span ref={clockRef} className={styles.clock}>
              --:--:--
            </span>
          </span>

          <dl className={styles.fields}>
            {FIELDS.map((field) => (
              <div className={styles.field} data-d-reveal key={field.label}>
                <dt className="d-label">{field.label}</dt>
                <dd className="d-value">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Col 5 — decorative archive column (~188px) */}
        <div className={styles.colB} aria-hidden="true">
          <svg className={styles.crosshair} viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" />
          </svg>

          <span className={styles.colBLabel}>Лендинги · сайты услуг · редизайн</span>
        </div>
      </div>
    </section>
  );
}
