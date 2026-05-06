"use client";

import CardSwap, { Card } from "@/components/sections/card-swap/CardSwap";
import styles from "./hero.module.css";

const heroCards = [
  {
    step: "01",
    projectName: "Fintech Landing",
    tags: ["UI/UX", "Design System", "Next.js"],
    role: "UX / UI / Frontend",
    tools: "Figma / Next.js / Framer Motion",
    label: "SELECTED WORK",
  },
  {
    step: "02",
    projectName: "Portfolio System",
    tags: ["Editorial", "Design Tokens", "Responsive"],
    role: "Design Lead / Frontend",
    tools: "Figma / GSAP / Next.js",
    label: "SELECTED WORK",
  },
  {
    step: "03",
    projectName: "SaaS Dashboard",
    tags: ["Product UI", "Component Library", "Data viz"],
    role: "UI Design / System",
    tools: "Figma / React / Tailwind",
    label: "SELECTED WORK",
  },
];

function DesignSystemPanel() {
  return (
    <div className={styles.systemPanel}>
      <div className={styles.systemPanelSection}>
        <span className={styles.systemPanelLabel}>Typography</span>
        <div className={styles.systemPanelType}>
          <span className={styles.systemPanelTypeChar}>Aa</span>
          <div className={styles.systemPanelTypeBars}>
            <span className={styles.systemPanelTypeBar} style={{ width: "100%" }} />
            <span className={styles.systemPanelTypeBar} style={{ width: "76%" }} />
            <span className={styles.systemPanelTypeBar} style={{ width: "52%" }} />
          </div>
        </div>
      </div>
      <div className={styles.systemPanelSection}>
        <span className={styles.systemPanelLabel}>Colors</span>
        <div className={styles.systemPanelSwatches}>
          <span className={styles.systemPanelSwatch} style={{ background: "#151515" }} />
          <span className={styles.systemPanelSwatch} style={{ background: "#a984dd" }} />
          <span className={styles.systemPanelSwatch} style={{ background: "#7d788b" }} />
          <span className={styles.systemPanelSwatch} style={{ background: "#e5dfd7" }} />
        </div>
      </div>
      <div className={styles.systemPanelSection}>
        <span className={styles.systemPanelLabel}>Buttons</span>
        <div className={styles.systemPanelButtons}>
          <span className={`${styles.systemPanelButton} ${styles.systemPanelButtonPrimary}`}>Primary</span>
          <span className={`${styles.systemPanelButton} ${styles.systemPanelButtonOutline}`}>Outline</span>
        </div>
      </div>
      <div className={styles.systemPanelSection}>
        <span className={styles.systemPanelLabel}>Tags</span>
        <div className={styles.systemPanelTags}>
          <span className={styles.systemPanelTag}>UI</span>
          <span className={styles.systemPanelTag}>UX</span>
          <span className={styles.systemPanelTag}>DEV</span>
        </div>
      </div>
    </div>
  );
}

function UIMockup() {
  return (
    <div className={styles.uiMockup}>
      <div className={styles.uiMockupHeader}>
        <span className={styles.uiMockupLogo} />
        <div className={styles.uiMockupNav}>
          <span className={styles.uiMockupNavItem} />
          <span className={styles.uiMockupNavItem} />
          <span className={styles.uiMockupNavItem} />
        </div>
      </div>
      <div className={styles.uiMockupHero}>
        <div className={styles.uiMockupHeroText}>
          <span className={`${styles.uiMockupLine} ${styles.uiMockupLineL1}`} />
          <span className={`${styles.uiMockupLine} ${styles.uiMockupLineL2}`} />
          <span className={`${styles.uiMockupLine} ${styles.uiMockupLineL3}`} />
        </div>
        <div className={styles.uiMockupHeroVisual} />
      </div>
      <div className={styles.uiMockupFeatures}>
        <span className={styles.uiMockupFeature} />
        <span className={styles.uiMockupFeature} />
        <span className={styles.uiMockupFeature} />
      </div>
      <div className={styles.uiMockupFooter}>
        <span className={`${styles.uiMockupLine} ${styles.uiMockupLineS1}`} />
        <span className={styles.uiMockupButtonBar} />
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className={styles.mobilePreview}>
      <div className={styles.mobilePreviewNotch} />
      <div className={styles.mobilePreviewBody}>
        <span className={styles.mobilePreviewLine} style={{ width: "66%" }} />
        <span className={styles.mobilePreviewLine} style={{ width: "44%" }} />
        <div className={styles.mobilePreviewBlock} />
      </div>
    </div>
  );
}

export function HeroGuides() {
  return (
    <div data-ui="hero-guides" className={styles.heroGuides} aria-hidden="true">
      <div data-ui="hero-guides-surface" className={styles.heroGuidesSurface}>
        <CardSwap
          width={868}
          height={620}
          cardDistance={32}
          verticalDistance={18}
          delay={3200}
          autoPlay={false}
          pauseOnHover={false}
          skewAmount={0}
          easing="linear"
        >
          {heroCards.map((card) => (
            <Card className={styles.heroEditorialCard} key={card.step}>
              <div data-ui="hero-editorial-card-inner" className={styles.heroEditorialCardInner}>
                <div data-ui="hero-editorial-card-top" className={styles.heroEditorialCardTop}>
                  <span data-ui="hero-editorial-card-label" className={styles.heroEditorialCardLabel}>{card.label}</span>
                  <div data-ui="hero-editorial-card-tags" className={styles.heroEditorialCardTags}>
                    {card.tags.map((tag) => (
                      <span key={tag} data-ui="hero-editorial-card-tag" className={styles.heroEditorialCardTag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <h3 data-ui="hero-editorial-card-project-name" className={styles.heroEditorialCardProjectName}>{card.projectName}</h3>

                <div data-ui="hero-editorial-card-main" className={styles.heroEditorialCardMain}>
                  <div data-ui="hero-editorial-card-preview-col" className={styles.heroEditorialCardPreviewCol}>
                    <UIMockup />
                  </div>
                  <div data-ui="hero-editorial-card-side-col" className={styles.heroEditorialCardSideCol}>
                    <DesignSystemPanel />
                    <MobilePreview />
                  </div>
                </div>

                <div data-ui="hero-editorial-card-bottom" className={styles.heroEditorialCardBottom}>
                  <div data-ui="hero-editorial-card-meta" className={styles.heroEditorialCardMeta}>
                    <span data-ui="hero-editorial-card-meta-item" className={styles.heroEditorialCardMetaItem}>
                      <span data-ui="hero-editorial-card-meta-label" className={styles.heroEditorialCardMetaLabel}>Role</span>
                      <span data-ui="hero-editorial-card-meta-value" className={styles.heroEditorialCardMetaValue}>{card.role}</span>
                    </span>
                    <span data-ui="hero-editorial-card-meta-item" className={styles.heroEditorialCardMetaItem}>
                      <span data-ui="hero-editorial-card-meta-label" className={styles.heroEditorialCardMetaLabel}>Tools</span>
                      <span data-ui="hero-editorial-card-meta-value" className={styles.heroEditorialCardMetaValue}>{card.tools}</span>
                    </span>
                  </div>
                  <a data-ui="hero-editorial-card-cta" href="#work" className={styles.heroEditorialCardCta}>View case</a>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
}
