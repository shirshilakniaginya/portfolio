"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-setup";
import styles from "./user-flow-demo.module.css";

function WireLine({ short = false }: { short?: boolean }) {
  return (
    <span
      className={short ? `${styles.wireLine} ${styles.wireLineShort}` : styles.wireLine}
      aria-hidden="true"
    />
  );
}

type FlowRow = {
  index: string;
  note: string;
  block: ReactNode;
};

const flowRows: FlowRow[] = [
  {
    index: "01",
    note: "Первый взгляд",
    block: (
      <div className={`${styles.wireBlock} ${styles.wireHero}`} data-flow-block>
        <div className={styles.heroChrome} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.heroCopy} aria-hidden="true">
          <span className={styles.wireKicker} />
          <span className={styles.heroHeadline} />
          <span className={`${styles.heroHeadline} ${styles.heroHeadlineShort}`} />
          <span className={styles.heroGhostButton} />
        </div>
        <span className={styles.heroMedia} aria-hidden="true" />
      </div>
    ),
  },
  {
    index: "02",
    note: "Доверие",
    block: (
      <div className={`${styles.wireBlock} ${styles.wireCards}`} data-flow-block>
        {[0, 1, 2].map((card) => (
          <div className={styles.wireCard} key={card}>
            <span className={styles.wireThumb} aria-hidden="true" />
            <span className={styles.wireKicker} aria-hidden="true" />
            <WireLine />
            <div className={styles.wireCardMeta} aria-hidden="true">
              <span className={styles.wireCardMetaBar} />
              <span className={styles.wireCardArrow}>→</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    index: "03",
    note: "Снять вопросы",
    block: (
      <div className={`${styles.wireBlock} ${styles.wireTrust}`} data-flow-block>
        <div className={styles.trustHead} aria-hidden="true">
          <span className={styles.wireAvatar} />
          <div className={styles.trustName}>
            <WireLine />
            <WireLine short />
          </div>
        </div>
        <div className={styles.trustRating} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span className={styles.trustRatingEmpty} />
        </div>
        <div className={styles.trustQuote} aria-hidden="true">
          <WireLine />
          <WireLine />
          <WireLine short />
        </div>
        <div className={styles.wireTrustBadges} aria-hidden="true">
          <span />
          <span />
        </div>
      </div>
    ),
  },
  {
    index: "04",
    note: "Целевое действие",
    block: (
      <div className={`${styles.wireBlock} ${styles.wireCta}`} data-flow-block>
        <span className={styles.ctaField} aria-hidden="true">
          <span className={styles.ctaFieldBar} />
        </span>
        <span className={styles.ctaButton} data-flow-cta>
          Целевой шаг
        </span>
        <div className={styles.ctaSupport} aria-hidden="true">
          <WireLine />
          <WireLine short />
        </div>
      </div>
    ),
  },
];

type UserFlowDemoProps = {
  playing: boolean;
};

export function UserFlowDemo({ playing }: UserFlowDemoProps) {
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
          const cells = gsap.utils.toArray<HTMLElement>("[data-flow-cell]", root);
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

        const progress = root.querySelector<HTMLElement>("[data-flow-progress]");
        const dot = root.querySelector<HTMLElement>("[data-flow-travel]");
        const markers = gsap.utils.toArray<HTMLElement>("[data-flow-marker]", root);
        const blocks = gsap.utils.toArray<HTMLElement>("[data-flow-block]", root);
        const notes = gsap.utils.toArray<HTMLElement>("[data-flow-note]", root);
        const cta = root.querySelector<HTMLElement>("[data-flow-cta]");

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
      <div className={styles.flowGrid} data-flow-grid>
        <div className={styles.progressRail} data-flow-progress>
          <svg
            className={styles.railSvg}
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 6 L100 6" className={styles.railPath} />
          </svg>

          <span className={styles.travelDot} data-flow-travel aria-hidden="true" />

          {flowRows.map((row, index) => (
            <div
              className={styles.progressStep}
              key={row.index}
              style={{ left: `${(index / (flowRows.length - 1)) * 100}%` }}
            >
              <span className={styles.stepMarker} data-flow-marker />
              <span className={styles.stepIndex}>{row.index}</span>
            </div>
          ))}
        </div>

        <div className={styles.flowStage}>
          {flowRows.map((row) => (
            <div className={styles.flowRow} data-flow-cell key={row.index}>
              <div className={styles.wireCell}>{row.block}</div>
              <div className={styles.noteCell}>
                <span className={styles.noteIndex} aria-hidden="true">
                  {row.index}
                </span>
                <span className={styles.noteText} data-flow-note>
                  {row.note}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className={styles.caption}>Структура страницы решает, дойдёт ли человек до заявки.</p>
    </div>
  );
}
