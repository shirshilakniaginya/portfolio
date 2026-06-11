"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-setup";
import styles from "./design-system-panel.module.css";

const colorTokens = [
  "#0D0D10",
  "#15151A",
  "#1B1B22",
  "#F1EEE8",
  "#9B87E5",
  "#3FB64F",
];

const typeScale = [
  { name: "H1", px: "80px", accent: true },
  { name: "H2", px: "52px", accent: true },
  { name: "H3", px: "32px", accent: true },
  { name: "Body", px: "16px", accent: true },
  { name: "Lab", px: "10px", accent: false },
];

const spacingScale = [8, 16, 24, 32, 48, 64];

type DesignSystemPanelProps = {
  playing: boolean;
};

export function DesignSystemPanel({ playing }: DesignSystemPanelProps) {
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

    const ctx = gsap.context(() => {
      const swatches = gsap.utils.toArray<HTMLElement>("[data-ds-swatch]", root);
      const bars = gsap.utils.toArray<HTMLElement>("[data-ds-bar]", root);
      const boxes = gsap.utils.toArray<HTMLElement>("[data-ds-box]", root);

      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 3 });

      // One calm "audit pass" over the system: color, then spacing, then components
      tl.to(swatches, { y: -4, duration: 0.35, ease: "power2.out", stagger: 0.06 }, 0);
      tl.to(swatches, { y: 0, duration: 0.5, ease: "power2.inOut", stagger: 0.06 }, 0.42);

      tl.set(bars, { scaleX: 0, transformOrigin: "0% 50%" }, 1.2);
      tl.to(bars, { scaleX: 1, duration: 0.55, ease: "expo.out", stagger: 0.06 }, 1.25);

      tl.fromTo(
        boxes,
        { borderColor: "rgba(255, 255, 255, 0.12)" },
        {
          borderColor: "rgba(155, 135, 229, 0.6)",
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.18,
        },
        2.15,
      );
      tl.to(
        boxes,
        {
          borderColor: "rgba(255, 255, 255, 0.12)",
          duration: 0.55,
          ease: "power2.inOut",
          stagger: 0.18,
        },
        2.75,
      );

      timelineRef.current = tl;
    }, root);

    return () => {
      timelineRef.current = null;
      ctx.revert();
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
    <div ref={rootRef} className={styles.panel}>
      <div className={styles.gridSystemNote}>
        <span className={styles.noteLabel}>Grid system</span>
        <span className={styles.noteTicks} aria-hidden="true">
          <span />
          <span />
          <span className={styles.noteTickTall} />
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className={styles.table}>
        <div className={styles.rowTop}>
          <div className={styles.cellColor}>
            <span className={styles.cellLabel}>Color</span>
            <div className={styles.swatches}>
              {colorTokens.map((hex) => (
                <div className={styles.swatch} data-ds-swatch key={hex}>
                  <span className={styles.swatchColor} style={{ background: hex }} aria-hidden="true" />
                  <span className={styles.swatchHex}>{hex}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cellComponents}>
            <span className={styles.cellLabel}>Components</span>
            <div className={styles.componentRow}>
              <span className={styles.componentBox} data-ds-box aria-hidden="true">
                <svg
                  className={styles.componentArrow}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10H15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                  <path
                    d="M10.5 5.5L15 10L10.5 14.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </svg>
              </span>
              <span className={styles.componentBox} data-ds-box aria-hidden="true">
                <span className={styles.componentCircle} />
              </span>
              <span className={styles.componentBox} data-ds-box aria-hidden="true">
                <span className={styles.componentPlus}>+</span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.rowMid}>
          <div className={styles.cellTypography}>
            <span className={styles.cellLabel}>Typography</span>
            <div className={styles.typeSamples}>
              <div className={styles.typeSample}>
                <span className={styles.typeDisplay}>Aa</span>
                <span className={styles.typeCaption}>
                  <span className={styles.typeCaptionRole}>Display</span>
                  <span className={styles.typeCaptionName}>Hikasami</span>
                </span>
              </div>
              <div className={styles.typeSample}>
                <span className={styles.typeBody}>Aa</span>
                <span className={styles.typeCaption}>
                  <span className={styles.typeCaptionRole}>Body</span>
                  <span className={styles.typeCaptionName}>Manrope</span>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.cellScale}>
            <span className={styles.cellLabel}>Type scale</span>
            <div className={styles.scaleRows}>
              {typeScale.map((step) => (
                <div className={styles.scaleRow} key={step.name}>
                  <span
                    className={step.accent ? styles.scaleBullet : `${styles.scaleBullet} ${styles.scaleBulletNeutral}`}
                    aria-hidden="true"
                  />
                  <span className={styles.scaleName}>{step.name}</span>
                  <span className={styles.scalePx}>{step.px}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cellSpacing}>
            <span className={styles.cellLabel}>Spacing</span>
            <div className={styles.spacingRows}>
              {spacingScale.map((value) => (
                <div className={styles.spacingRow} key={value}>
                  <span className={styles.spacingValue}>{value}</span>
                  <span
                    className={styles.spacingBar}
                    style={{ width: `${Math.max(value * 3.2, 34)}px` }}
                    data-ds-bar
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rowBottom}>
          <span className={styles.cellLabel}>Baseline grid</span>
          <span className={styles.baselineTicks} aria-hidden="true" />
          <span className={styles.sharpLayout}>
            <span className={styles.cellLabel}>Sharp layout</span>
            <span className={styles.sharpCross} aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}
