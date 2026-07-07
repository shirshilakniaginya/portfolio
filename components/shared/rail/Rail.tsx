"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { gsap } from "@/lib/gsap-setup";
import { profile, projects, skills, socials } from "@/lib/home-content";
import styles from "./rail.module.css";

const dribbble = socials.find((s) => s.label === "Dribbble");

// Pin at the very top so the left column's content aligns with the right
// column's first row; nav clicks keep a small breathing offset.
const PIN_START = "top top";
const SCROLL_OFFSET = "top 40px";

export function Rail() {
  const [active, setActive] = useState(projects[0]?.index ?? "01");
  const railRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  // Scroll-spy: highlight the project the viewport is currently centered on.
  useEffect(() => {
    const rows = projects
      .map((p) => document.getElementById(`work-${p.index}`))
      .filter((el): el is HTMLElement => el !== null);
    if (rows.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace("work-", ""));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  // Keep the whole left column fixed while only the projects column scrolls.
  // ScrollSmoother applies a transform to #smooth-content which breaks native
  // position:sticky/fixed, so pin the column with ScrollTrigger across the whole
  // shell (its height is driven by the taller projects column). Pinning starts
  // already-passed at scroll 0, so the column reads as fixed from the very top.
  // gsap.matchMedia recreates/kills the pin per breakpoint; reduced-motion has no
  // smoother and falls back to CSS sticky (rail.module.css).
  useEffect(() => {
    const rail = railRef.current;
    const sticky = stickyRef.current;
    const shell = rail?.parentElement;
    if (!rail || !sticky || !shell) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1001px) and (prefers-reduced-motion: no-preference)", () => {
      if (!ScrollSmoother.get()) return;
      const st = ScrollTrigger.create({
        trigger: shell,
        start: PIN_START,
        end: "bottom bottom",
        pin: sticky,
        pinSpacing: false,
        pinType: "transform",
        invalidateOnRefresh: true,
      });
      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, SCROLL_OFFSET);
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside ref={railRef} className={styles.rail}>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.identity}>
          <span className={styles.name}>{profile.name}</span>
          <span className={styles.role}>{profile.role}</span>
          <p className={styles.about}>{profile.about}</p>

          <div className={styles.actions}>
            <a
              className={styles.actionPrimary}
              href="#contact"
              onClick={(e) => scrollTo(e, "contact")}
            >
              Обсудить проект
            </a>
            {dribbble && (
              <a
                className={styles.actionGhost}
                href={dribbble.href}
                target="_blank"
                rel="noreferrer"
              >
                Dribbble ↗
              </a>
            )}
          </div>
        </div>

        <div className={styles.block}>
          <span className={styles.label}>Навыки</span>
          <ul className={styles.skills}>
            {skills.map((skill) => (
              <li className={styles.skill} key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.block} ${styles.indexBlock}`}>
          <span className={styles.label}>Проекты</span>
          <ol className={styles.index}>
            {projects.map((p) => (
              <li key={p.index}>
                <a
                  className={`${styles.indexLink} ${active === p.index ? styles.indexLinkActive : ""}`}
                  href={`#work-${p.index}`}
                  onClick={(e) => scrollTo(e, `work-${p.index}`)}
                >
                  <span className={styles.indexNum}>{p.index}</span>
                  <span className={styles.indexName}>{p.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.availability}>
          <span className={styles.availDot} aria-hidden="true" />
          <span className={styles.availText}>Доступен для проектов</span>
          <span className={styles.availDate}>Лето 2026</span>
        </div>
      </div>
    </aside>
  );
}
