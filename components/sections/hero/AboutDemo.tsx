"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-setup";
import styles from "./about-demo.module.css";

function Line({ short = false }: { short?: boolean }) {
  return (
    <span
      className={short ? `${styles.line} ${styles.lineShort}` : styles.line}
      aria-hidden="true"
    />
  );
}

type StageRow = {
  index: string;
  note: string;
  block: ReactNode;
};

// Same horizontal progress logic as the user-flow demo, but the four
// scenes describe the design process: brief → skeleton → route → visual.
const stageRows: StageRow[] = [
  {
    index: "01",
    note: "Задача",
    block: (
      <div className={`${styles.wireBlock} ${styles.blockBrief}`} data-about-block>
        <span className={styles.kicker} aria-hidden="true" />
        <div className={styles.briefLines} aria-hidden="true">
          <Line />
          <Line />
          <Line short />
        </div>
        <div className={styles.briefChecks} aria-hidden="true">
          <div className={styles.briefCheck}>
            <span className={styles.checkBox} />
            <Line />
          </div>
          <div className={styles.briefCheck}>
            <span className={styles.checkBox} />
            <Line short />
          </div>
          <div className={styles.briefCheck}>
            <span className={`${styles.checkBox} ${styles.checkBoxEmpty}`} />
            <Line />
          </div>
        </div>
      </div>
    ),
  },
  {
    index: "02",
    note: "Структура",
    block: (
      <div className={`${styles.wireBlock} ${styles.blockFrame}`} data-about-block>
        <span className={styles.frameHeader} aria-hidden="true" />
        <div className={styles.frameCols} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className={styles.frameFooter} aria-hidden="true" />
      </div>
    ),
  },
  {
    index: "03",
    note: "Путь пользователя",
    block: (
      <div className={`${styles.wireBlock} ${styles.blockRoute}`} data-about-block>
        <div className={styles.routeNode} aria-hidden="true">
          <span className={styles.routeDot} />
          <Line />
        </div>
        <div className={styles.routeNode} aria-hidden="true">
          <span className={styles.routeDot} />
          <Line short />
        </div>
        <div className={styles.routeNode} aria-hidden="true">
          <span className={`${styles.routeDot} ${styles.routeDotFilled}`} />
          <Line />
        </div>
      </div>
    ),
  },
  {
    index: "04",
    note: "Визуал",
    block: (
      <div className={`${styles.wireBlock} ${styles.blockVisual}`} data-about-block>
        <span className={styles.kicker} aria-hidden="true" />
        <span className={styles.visualHeadline} aria-hidden="true" />
        <span
          className={`${styles.visualHeadline} ${styles.visualHeadlineShort}`}
          aria-hidden="true"
        />
        <span className={styles.visualMedia} aria-hidden="true" />
        <span className={styles.visualCta} data-about-cta aria-hidden="true" />
      </div>
    ),
  },
];

type AboutDemoProps = {
  playing: boolean;
};

export function AboutDemo({ playing }: AboutDemoProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    let ctx: gsap.Context | null = null;
    let resizeTimer: number | undefined;

    const build = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        // Mobile mini version: one full-width scene at a time, crossfading
        if (window.matchMedia("(max-width: 700px)").matches) {
          const cells = gsap.utils.toArray<HTMLElement>("[data-about-cell]", root);
          if (cells.length === 0) {
            return;
          }

          const wasPlayingMobile = timelineRef.current ? !timelineRef.current.paused() : false;
          const tl = gsap.timeline({ paused: true, repeat: -1 });

          tl.set(cells, { autoAlpha: 0 }, 0);

          let at = 0.1;
          cells.forEach((cell) => {
            tl.to(cell, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, at);
            tl.to(cell, { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, at + 2.5);
            at += 3.05;
          });

          timelineRef.current = tl;
          if (wasPlayingMobile) {
            tl.play();
          }
          return;
        }

        const progress = root.querySelector<HTMLElement>("[data-about-progress]");
        const dot = root.querySelector<HTMLElement>("[data-about-travel]");
        const markers = gsap.utils.toArray<HTMLElement>("[data-about-marker]", root);
        const blocks = gsap.utils.toArray<HTMLElement>("[data-about-block]", root);
        const notes = gsap.utils.toArray<HTMLElement>("[data-about-note]", root);
        const cta = root.querySelector<HTMLElement>("[data-about-cta]");

        if (!progress || !dot || markers.length === 0) {
          return;
        }

        const progressRect = progress.getBoundingClientRect();
        const stops = markers.map((marker) => {
          const rect = marker.getBoundingClientRect();
          return rect.left - progressRect.left + rect.width / 2;
        });

        const wasPlaying = timelineRef.current ? !timelineRef.current.paused() : false;
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.9 });

        gsap.set(dot, { clearProps: "transform" });
        tl.set(dot, { opacity: 0, x: stops[0], y: 0 }, 0);
        tl.set(markers, { scale: 1, transformOrigin: "50% 50%" }, 0);

        tl.to(dot, { opacity: 1, duration: 0.25, ease: "power2.out" }, 0.2);

        let cursor = 0.2;
        stops.forEach((stop, index) => {
          if (index > 0) {
            tl.to(dot, { x: stop, duration: 0.75, ease: "power2.inOut" }, cursor);
            cursor += 0.75;
          }

          tl.fromTo(
            markers[index],
            { scale: 1 },
            { scale: 1.7, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 },
            cursor,
          );
          if (blocks[index]) {
            tl.fromTo(
              blocks[index],
              { borderColor: "rgba(255, 255, 255, 0.12)" },
              {
                borderColor: "rgba(241, 238, 232, 0.42)",
                duration: 0.3,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                repeatDelay: 0.35,
              },
              cursor,
            );
          }
          if (notes[index]) {
            tl.fromTo(
              notes[index],
              { color: "#aaa39a" },
              {
                color: "#f1eee8",
                duration: 0.3,
                ease: "none",
                yoyo: true,
                repeat: 1,
                repeatDelay: 0.35,
              },
              cursor,
            );
          }

          cursor += 0.55;
        });

        if (cta) {
          tl.fromTo(
            cta,
            { scale: 1 },
            {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
              transformOrigin: "50% 50%",
            },
            cursor - 0.4,
          );
        }

        tl.to(dot, { opacity: 0, duration: 0.35, ease: "power2.in" }, cursor + 0.3);

        timelineRef.current = tl;
        if (wasPlaying) {
          tl.play();
        }
      }, root);
    };

    build();

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
      timelineRef.current = null;
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) {
      return;
    }

    if (playing) {
      tl.play();
    } else {
      tl.pause();
    }
  }, [playing]);

  return (
    <div ref={rootRef} className={styles.demo}>
      <div className={styles.stageGrid}>
        <div className={styles.progressRail} data-about-progress>
          <svg
            className={styles.railSvg}
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 6 L100 6" className={styles.railPath} />
          </svg>

          <span className={styles.travelDot} data-about-travel aria-hidden="true" />

          {stageRows.map((row, index) => (
            <div
              className={styles.progressStep}
              key={row.index}
              style={{ left: `${(index / (stageRows.length - 1)) * 100}%` }}
            >
              <span className={styles.stepMarker} data-about-marker />
              <span className={styles.stepIndex}>{row.index}</span>
            </div>
          ))}
        </div>

        <div className={styles.stageRow}>
          {stageRows.map((row) => (
            <div className={styles.stageCell} data-about-cell key={row.index}>
              <div className={styles.wireCell}>{row.block}</div>
              <div className={styles.noteCell}>
                <span className={styles.noteIndex} aria-hidden="true">
                  {row.index}
                </span>
                <span className={styles.noteText} data-about-note>
                  {row.note}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className={styles.caption}>Визуал собираю последним — когда структура и путь уже работают.</p>
    </div>
  );
}
