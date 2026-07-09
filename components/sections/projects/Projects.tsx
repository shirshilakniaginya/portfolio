"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/home-content";
import { BrowserMock } from "./BrowserMock";
import { DashboardMock } from "./DashboardMock";
import styles from "./projects.module.css";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" fill="none" width="18" height="18" className={className}>
      <path d="M3.5 14.5 14.5 3.5M14.5 3.5H6M14.5 3.5V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.row} id={`work-${project.index}`} data-reveal>
      <div className={styles.rowIndex}>
        <span className={styles.rowNum}>{project.index}</span>
        <span className={styles.rowKicker}>Избранный проект</span>
        <button
          type="button"
          className={`${styles.expand} ${open ? styles.expandOpen : ""}`}
          aria-expanded={open}
          aria-label={open ? `Скрыть детали проекта ${project.name}` : `Показать детали проекта ${project.name}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className={styles.rowBody}>
        <div className={styles.rowHeading}>
          <h3 className={styles.rowName}>{project.name}</h3>
          <span className={styles.rowKind}>{project.kind}</span>
        </div>

        <p className={styles.rowSummary}>{project.summary}</p>

        <div className={`${styles.details} ${open ? styles.detailsOpen : ""}`}>
          <div className={styles.detailsInner}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Роль</span>
              <span className={styles.detailValue}>{project.role}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Команда</span>
              <span className={styles.detailValue}>{project.team}</span>
            </div>
          </div>
        </div>

        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>

        <a
          className={styles.rowLink}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Посмотреть работу
          <ArrowIcon className={styles.rowLinkArrow} />
        </a>
      </div>

      <div className={styles.rowMock}>
        <a
          className={styles.mockLink}
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
              url={project.previewUrl}
              imageSrc={project.previewImage}
              imageAlt={`Превью проекта ${project.name}`}
            />
          )}
        </a>
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
          <h2 className={styles.headTitle}>
            Работы
            <sup className={styles.headCount}>({String(projects.length).padStart(2, "0")})</sup>
          </h2>
          <span className={styles.headNote}>Избранные проекты</span>
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
