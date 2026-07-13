"use client";

import { useEffect, useRef } from "react";
import { projects, type Project } from "@/lib/home-content";
import { BrowserMock } from "./BrowserMock";
import { DashboardMock } from "./DashboardMock";
import styles from "./projects.module.css";

function ProjectRow({ project }: { project: Project }) {
  return (
    <li className={styles.row} id={`work-${project.index}`} data-reveal>
      <span className={styles.rowGhost} aria-hidden="true">
        {project.index}
      </span>

      <div className={styles.rowCard}>
      <div className={styles.rowInfo}>
        <span className={styles.rowKicker}>{project.kind}</span>
        <h3 className={styles.rowName}>{project.name}</h3>
        <p className={styles.rowSummary}>{project.summary}</p>
      </div>

      <a
        className={styles.rowMock}
        href={project.href}
        aria-label={`Смотреть проект ${project.name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.mock === "dashboard" ? (
          <DashboardMock brand={project.name.split(" ")[0]} />
        ) : (
          <BrowserMock
            brand={project.name}
            imageSrc={project.previewImage}
            imageAlt={`Превью проекта ${project.name}`}
          />
        )}
      </a>

      <div className={styles.rowMeta}>
        <div className={styles.rowMetaGroup}>
          <div className={styles.rowField}>
            <span className="d-label">Тип</span>
            <span className="d-value">{project.kind}</span>
          </div>
          <div className={styles.rowField}>
            <span className="d-label">Теги</span>
            <span className="d-value">{project.tags.join(", ")}</span>
          </div>
        </div>

        <a
          className={styles.rowOpen}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Открыть проект ${project.name}`}
        >
          +
        </a>
      </div>
      </div>
    </li>
  );
}

export function Projects() {
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
    // Safety: never leave a section blank if the observer never fires.
    const fallback = window.setTimeout(() => els.forEach((el) => el.classList.add(styles.in)), 1600);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section ref={rootRef} className={styles.section} id="work">
      <div className={styles.inner}>
        <header className={styles.head} data-reveal>
          <div className={styles.headLeft}>
            <span className={styles.kicker}>{"// 01 Работы"}</span>
            <h2 className={styles.kickerSub}>Избранные сайты</h2>
          </div>

          <a
            className={styles.allLink}
            href="https://kwork.ru/user/dmitrydezign"
            target="_blank"
            rel="noreferrer"
          >
            Больше работ
            <span className={styles.allPlus} aria-hidden="true">
              +
            </span>
          </a>
        </header>

        <ol className={styles.rows}>
          {projects.map((p) => (
            <ProjectRow key={p.index} project={p} />
          ))}
        </ol>
      </div>
    </section>
  );
}
