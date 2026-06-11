"use client";

import { flushSync } from "react-dom";
import type { Ref } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-setup";
import { heroPanels } from "@/lib/portfolio-content";
import { AboutDemo } from "./AboutDemo";
import { BuildDemo } from "./BuildDemo";
import { DesignSystemPanel } from "./DesignSystemPanel";
import { UserFlowDemo } from "./UserFlowDemo";
import styles from "./hero.module.css";

type HeroPanel = (typeof heroPanels)[number];

function clampHeroIndex(index: number) {
  return (index + heroPanels.length) % heroPanels.length;
}

function getPanelSecondaryLabel(panel: HeroPanel) {
  return "skills" in panel && panel.skills
    ? ("skillsLabel" in panel ? panel.skillsLabel : "Навыки")
    : "Фокус";
}

function getRevealItems(node: HTMLDivElement | null) {
  return node
    ? Array.from(node.querySelectorAll<HTMLElement>("[data-hero-reveal]"))
    : [];
}

function getTitleLines(node: HTMLHeadingElement | null) {
  return node
    ? Array.from(node.querySelectorAll<HTMLElement>("[data-hero-title-line]"))
    : [];
}

function PanelDemo({ panel, playing }: { panel: HeroPanel; playing: boolean }) {
  switch (panel.id) {
    case "about":
      return <AboutDemo playing={playing} />;
    case "structure":
      return <DesignSystemPanel playing={playing} />;
    case "visual":
      return <UserFlowDemo playing={playing} />;
    case "handoff":
      return <BuildDemo playing={playing} />;
    default:
      return null;
  }
}

type HeroPanelContentProps = {
  panel: HeroPanel;
  contentRef?: Ref<HTMLDivElement>;
  overlay?: boolean;
  titleRef?: Ref<HTMLHeadingElement>;
};

function HeroPanelContent({ panel, contentRef, overlay = false, titleRef }: HeroPanelContentProps) {
  const contentClassName = overlay
    ? `${styles.heroContentInner} ${styles.heroContentOverlay}`
    : styles.heroContentInner;
  const secondaryText = panel.paragraphs[1] ?? "";

  return (
    <div ref={contentRef} className={contentClassName}>
      <div className={styles.centerPanelMeta}>
        <span className={styles.centerPanelLabel} data-hero-reveal>
          {panel.label}
        </span>
      </div>
      <h2 ref={titleRef} className={styles.centerTitle}>
        {panel.activeTitleLines.map((line) => (
          <span className={styles.titleLineMask} key={line}>
            <span className={styles.titleLine} data-hero-title-line>
              {line}
            </span>
          </span>
        ))}
      </h2>

      <div className={styles.centerTextBlock}>
        {panel.paragraphs.map((paragraph, index) => (
          <p
            key={`${panel.id}-${index}`}
            className={styles.centerText}
            data-hero-reveal
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className={styles.centerSkillsGroup} data-hero-reveal>
        <span className={styles.metaLabel}>{getPanelSecondaryLabel(panel)}</span>
        {"skills" in panel && panel.skills ? (
          <p className={styles.skillsText}>
            {panel.skills.map((skill, index) => (
              <span className={styles.skillItem} key={skill}>
                {index > 0 && <span className={styles.skillDivider} aria-hidden="true" />}
                <span>{skill}</span>
              </span>
            ))}
          </p>
        ) : (
          <p className={styles.skillsText}>{secondaryText}</p>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const visualFrameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeContentRef = useRef<HTMLDivElement | null>(null);
  const activeTitleRef = useRef<HTMLHeadingElement | null>(null);
  const incomingContentRef = useRef<HTMLDivElement | null>(null);
  const incomingTitleRef = useRef<HTMLHeadingElement | null>(null);
  const isAnimatingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const activePanel = heroPanels[activeIndex] ?? heroPanels[0];
  const incomingPanel = incomingIndex === null ? null : (heroPanels[incomingIndex] ?? null);
  const displayIndex = incomingIndex ?? activeIndex;
  const displayPanel = heroPanels[displayIndex] ?? activePanel;

  useLayoutEffect(() => {
    if (!activeContentRef.current) {
      return;
    }

    gsap.set(activeContentRef.current, { opacity: 1, y: 0 });
    gsap.set(getTitleLines(activeTitleRef.current), { opacity: 1, yPercent: 0 });
    gsap.set(getRevealItems(activeContentRef.current), { opacity: 1, y: 0 });
  }, []);

  const handleSelect = (nextIndex: number) => {
    if (nextIndex === activeIndex || isAnimating || isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;
    setIsAnimating(true);

    const currentFrame = visualFrameRefs.current[activeIndex];
    const currentContent = activeContentRef.current;

    if (!currentFrame || !currentContent) {
      isAnimatingRef.current = false;
      setIsAnimating(false);
      setActiveIndex(nextIndex);
      setSelectedIndex(nextIndex);
      return;
    }

    setSelectedIndex(nextIndex);

    flushSync(() => {
      setIncomingIndex(nextIndex);
    });

    const nextFrame = visualFrameRefs.current[nextIndex];
    const nextContent = incomingContentRef.current;
    const nextTitleLines = getTitleLines(incomingTitleRef.current);
    const nextRevealItems = getRevealItems(incomingContentRef.current);

    if (!nextFrame || !nextContent || nextTitleLines.length === 0) {
      flushSync(() => {
        setActiveIndex(nextIndex);
        setIncomingIndex(null);
      });
      isAnimatingRef.current = false;
      setIsAnimating(false);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.killTweensOf([
      currentFrame,
      currentContent,
      nextFrame,
      nextContent,
      ...nextTitleLines,
      ...nextRevealItems,
    ]);

    const timeline = gsap.timeline({
      defaults: { ease: reduceMotion ? "none" : "editorialOut" },
      onComplete: () => {
        flushSync(() => {
          setActiveIndex(nextIndex);
          setIncomingIndex(null);
        });

        gsap.set([currentFrame, nextFrame], { clearProps: "opacity,transform,zIndex" });

        isAnimatingRef.current = false;
        setIsAnimating(false);
      },
    });

    if (reduceMotion) {
      gsap.set(nextFrame, { opacity: 0, zIndex: 2 });
      gsap.set(nextContent, { opacity: 1, y: 0 });
      gsap.set(nextTitleLines, { opacity: 0, yPercent: 0 });
      gsap.set(nextRevealItems, { opacity: 0, y: 0 });

      timeline
        .to(currentFrame, { opacity: 0, duration: 0.18 })
        .to(currentContent, { opacity: 0, duration: 0.18 }, "<")
        .to(nextFrame, { opacity: 1, duration: 0.22 }, "<")
        .to(
          nextTitleLines,
          {
            opacity: 1,
            duration: 0.18,
            stagger: 0.04,
          },
          "<0.08",
        )
        .to(
          nextRevealItems,
          {
            opacity: 1,
            duration: 0.18,
          },
          "<",
        );

      return;
    }

    gsap.set(nextFrame, { opacity: 0, scale: 1.025, zIndex: 2, transformOrigin: "50% 50%" });
    gsap.set(nextContent, { opacity: 1, y: 0 });
    gsap.set(nextTitleLines, { opacity: 0, yPercent: 110 });
    gsap.set(nextRevealItems, { opacity: 0, y: 18 });

    timeline
      .to(currentFrame, {
        opacity: 0,
        duration: 0.22,
        scale: 0.99,
        ease: "editorialSoft",
      })
      .to(
        currentContent,
        {
          opacity: 0,
          y: 8,
          duration: 0.22,
          ease: "editorialSoft",
        },
        "<",
      )
      .to(
        nextFrame,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
        },
        "<0.08",
      )
      .to(
        nextTitleLines,
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.08,
          duration: 0.72,
        },
        "<0.16",
      )
      .to(
        nextRevealItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.06,
        },
        "<0.08",
      );
  };

  const handleMobileStep = (direction: -1 | 1) => {
    handleSelect(clampHeroIndex(activeIndex + direction));
  };

  return (
    <section ref={heroRef} data-ui="hero-section" className={styles.heroSection} id="about">
      <div className={styles.heroInner}>
        <div className={styles.heroFrame}>
          <div className={styles.bottomBand}>
            <div className={styles.selectorRow}>
              {heroPanels.map((panel, index) => (
                <button
                  key={panel.id}
                  type="button"
                  className={`${styles.switchCard} ${selectedIndex === index ? styles.switchCardActive : ""}`}
                  disabled={isAnimating}
                  onClick={() => handleSelect(index)}
                >
                  <span className={styles.switchMeta}>
                    <span className={styles.switchIndex}>{panel.index}</span>
                    <span className={styles.switchLabel}>{panel.label}</span>
                  </span>
                  <strong className={styles.switchTitle}>{panel.shortTitle}</strong>
                  <p className={styles.switchDescription}>{panel.shortText}</p>
                  <span className={styles.selectorDot} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className={styles.activeHero}>
              <article className={styles.heroContentColumn}>
                <div className={styles.heroContentStage}>
                  {/* Hidden copies of every panel reserve the max content height,
                      so the band never jumps when switching panels */}
                  {heroPanels.map((panel) => (
                    <div
                      key={`sizer-${panel.id}`}
                      className={styles.heroContentSizer}
                      aria-hidden="true"
                    >
                      <HeroPanelContent panel={panel} />
                    </div>
                  ))}
                  <HeroPanelContent
                    key={activePanel.id}
                    panel={activePanel}
                    contentRef={activeContentRef}
                    titleRef={activeTitleRef}
                  />
                  {incomingPanel && (
                    <HeroPanelContent
                      key={`incoming-${incomingPanel.id}`}
                      overlay
                      panel={incomingPanel}
                      contentRef={incomingContentRef}
                      titleRef={incomingTitleRef}
                    />
                  )}
                </div>
              </article>

              <div className={styles.mobileHeroNavigator}>
                <div className={styles.mobileHeroNavTop}>
                  <span className={styles.mobileHeroCount}>
                    {displayPanel.index} / {heroPanels[heroPanels.length - 1]?.index ?? "04"}
                  </span>
                  <strong className={styles.mobileHeroNavTitle}>{displayPanel.shortTitle}</strong>
                </div>

                <div className={styles.mobileHeroNavBottom}>
                  <button
                    type="button"
                    className={styles.mobileHeroArrow}
                    onClick={() => handleMobileStep(-1)}
                    disabled={isAnimating}
                    aria-label="Previous hero card"
                  >
                    <span aria-hidden="true">{"<"}</span>
                  </button>

                  <div className={styles.mobileHeroSteps}>
                    {heroPanels.map((panel, index) => (
                      <button
                        key={`mobile-${panel.id}`}
                        type="button"
                        className={`${styles.mobileHeroStep} ${
                          selectedIndex === index ? styles.mobileHeroStepActive : ""
                        }`}
                        onClick={() => handleSelect(index)}
                        disabled={isAnimating}
                        aria-label={`Go to ${panel.shortTitle}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.mobileHeroArrow}
                    onClick={() => handleMobileStep(1)}
                    disabled={isAnimating}
                    aria-label="Next hero card"
                  >
                    <span aria-hidden="true">{">"}</span>
                  </button>
                </div>
              </div>

              <div className={styles.heroVisualStage}>
                {heroPanels.map((panel, index) => (
                  <div
                    key={panel.id}
                    ref={(node) => {
                      visualFrameRefs.current[index] = node;
                    }}
                    className={`${styles.heroVisualFrame} ${
                      index === activeIndex ? styles.heroVisualFrameActive : ""
                    }`}
                  >
                    <PanelDemo panel={panel} playing={index === displayIndex} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
