"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap-setup";
import styles from "./design-system-visual.module.css";

gsap.registerPlugin(useGSAP);

const typeRows = [
  { label: "H1", scale: "64/72" },
  { label: "H2", scale: "36/44" },
  { label: "Body", scale: "16/24" },
  { label: "Caption", scale: "12/16" },
] as const;

const tokenRows = [
  { label: "BG", tone: styles.tokenBg },
  { label: "SURFACE", tone: styles.tokenSurface },
  { label: "TEXT", tone: styles.tokenText },
  { label: "ACCENT", tone: styles.tokenAccent },
] as const;

const spacingRows = [
  { label: "16", width: styles.bar16 },
  { label: "24", width: styles.bar24 },
  { label: "48", width: styles.bar48 },
] as const;

export function DesignSystemVisual() {
  const rootRef = useRef<HTMLElement | null>(null);
  const linePositions = Array.from({ length: 12 }, (_, index) => {
    const width = 1200;
    const gap = 10;
    const totalGap = gap * 11;
    const columnWidth = (width - totalGap) / 12;
    const x = index * (columnWidth + gap) + columnWidth / 2;
    return x;
  });

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const board = rootRef.current;

      if (!board) {
        return;
      }

      const q = gsap.utils.selector(board);
      const lines = q("[data-draw-line]");
      const blocks = q("[data-ds-block]");
      const types = q("[data-ds-type]");
      const swatches = q("[data-ds-swatch]");
      const bars = q("[data-ds-bar]");
      const reveals = q("[data-ds-reveal]");
      const number = q("[data-ds-number]");

      gsap.set(board, { opacity: 0 });
      gsap.set(blocks, { opacity: 0, y: 10 });
      gsap.set(types, { opacity: 0, y: 12 });
      gsap.set(swatches, { opacity: 0, scale: 0.92, transformOrigin: "center center" });
      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(reveals, { opacity: 0, y: 10 });
      gsap.set(number, { opacity: 0, y: 10 });
      gsap.set(lines, { opacity: 1, drawSVG: "0%" });

      if (reduceMotion) {
        gsap
          .timeline()
          .to(board, { opacity: 1, duration: 0.18 })
          .to(
            [blocks, types, swatches, bars, reveals, number],
            {
              opacity: 1,
              y: 0,
              scale: 1,
              scaleX: 1,
              duration: 0.18,
              clearProps: "all",
            },
            "<",
          )
          .set(lines, { drawSVG: "100%", clearProps: "all" });
        return;
      }

      gsap
        .timeline()
        .to(board, { opacity: 1, duration: 0.18 })
        .to(
          lines,
          {
            drawSVG: "100%",
            stagger: 0.04,
            duration: 0.55,
            ease: "editorialOut",
          },
          "<0.02",
        )
        .to(
          blocks,
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.38,
            ease: "editorialOut",
          },
          "<0.06",
        )
        .to(
          types,
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "editorialOut",
          },
          "<0.04",
        )
        .to(
          swatches,
          {
            opacity: 1,
            scale: 1,
            stagger: 0.04,
            duration: 0.32,
            ease: "editorialSoft",
          },
          "<0.02",
        )
        .to(
          bars,
          {
            scaleX: 1,
            stagger: 0.04,
            duration: 0.35,
            ease: "editorialOut",
          },
          "<0.02",
        )
        .to(
          reveals,
          {
            opacity: 1,
            y: 0,
            stagger: 0.045,
            duration: 0.4,
            ease: "editorialOut",
          },
          "<0.03",
        )
        .to(
          number,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "editorialOut",
            clearProps: "all",
          },
          "<0.08",
        )
        .set([board, lines, blocks, types, swatches, bars, reveals], { clearProps: "all" });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.board} aria-hidden="true">
      <div className={styles.topbar}>
        <div className={styles.systemLabel} data-ds-reveal>
          <span className={styles.accentDot} />
          <span>SYSTEM</span>
        </div>
        <div className={styles.number} data-ds-number>
          02
        </div>
      </div>

      <div className={styles.contentGrid}>
        <section className={styles.typeZone}>
          <span className={styles.sectionLabel} data-ds-reveal>
            TYPE
          </span>
          <div className={styles.typeList}>
            {typeRows.map((row) => (
              <div key={row.label} className={styles.typeRow} data-ds-type>
                <span className={styles.typeName}>{row.label}</span>
                <span className={styles.typeScale}>{row.scale}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.gridZone}>
          <div className={styles.gridHead}>
            <span className={styles.sectionLabel} data-ds-reveal>
              GRID
            </span>
            <span className={styles.gridCount} data-ds-reveal>
              12
            </span>
          </div>

          <div className={styles.gridFrame} data-ds-reveal>
            <div className={styles.gridColumns}>
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} className={styles.gridColumnFill} />
              ))}
            </div>
            <svg className={styles.gridLinesSvg} viewBox="0 0 1200 1000" preserveAspectRatio="none">
              {linePositions.map((x) => (
                <line
                  key={x}
                  x1={x}
                  x2={x}
                  y1="0"
                  y2="1000"
                  className={styles.gridLine}
                  data-draw-line
                />
              ))}
            </svg>

            <div className={styles.blockWide} data-ds-block />
            <div className={styles.blockTall} data-ds-block />
            <div className={styles.blockLow} data-ds-block />
            <div className={styles.blockAccent} data-ds-block />
          </div>
        </section>

        <section className={styles.tokensZone}>
          <span className={styles.sectionLabel} data-ds-reveal>
            TOKENS
          </span>
          <div className={styles.tokenList}>
            {tokenRows.map((token) => (
              <div key={token.label} className={styles.tokenRow} data-ds-swatch>
                <span className={`${styles.tokenSwatch} ${token.tone}`} />
                <span className={styles.tokenLabel}>{token.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.spacingGroup}>
            {spacingRows.map((row) => (
              <div key={row.label} className={styles.spacingRow}>
                <span className={styles.spacingLabel}>{row.label}</span>
                <span className={`${styles.spacingBar} ${row.width}`} data-ds-bar />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
