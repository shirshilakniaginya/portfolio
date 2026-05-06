"use client";

import CardSwap, { Card } from "@/components/card-swap";

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
    <div className="sys-panel">
      <div className="sys-panel__section">
        <span className="sys-panel__label">Typography</span>
        <div className="sys-panel__type">
          <span className="sys-panel__type-char">Aa</span>
          <div className="sys-panel__type-bars">
            <span className="sys-panel__type-bar" style={{ width: "100%" }} />
            <span className="sys-panel__type-bar" style={{ width: "76%" }} />
            <span className="sys-panel__type-bar" style={{ width: "52%" }} />
          </div>
        </div>
      </div>
      <div className="sys-panel__section">
        <span className="sys-panel__label">Colors</span>
        <div className="sys-panel__swatches">
          <span className="sys-panel__swatch" style={{ background: "#151515" }} />
          <span className="sys-panel__swatch" style={{ background: "#a984dd" }} />
          <span className="sys-panel__swatch" style={{ background: "#7d788b" }} />
          <span className="sys-panel__swatch" style={{ background: "#e5dfd7" }} />
        </div>
      </div>
      <div className="sys-panel__section">
        <span className="sys-panel__label">Buttons</span>
        <div className="sys-panel__buttons">
          <span className="sys-panel__btn sys-panel__btn--primary">Primary</span>
          <span className="sys-panel__btn sys-panel__btn--outline">Outline</span>
        </div>
      </div>
      <div className="sys-panel__section">
        <span className="sys-panel__label">Tags</span>
        <div className="sys-panel__tags">
          <span className="sys-panel__tag">UI</span>
          <span className="sys-panel__tag">UX</span>
          <span className="sys-panel__tag">DEV</span>
        </div>
      </div>
    </div>
  );
}

function UIMockup() {
  return (
    <div className="ui-mockup">
      <div className="ui-mockup__header">
        <span className="ui-mockup__logo" />
        <div className="ui-mockup__nav">
          <span className="ui-mockup__nav-item" />
          <span className="ui-mockup__nav-item" />
          <span className="ui-mockup__nav-item" />
        </div>
      </div>
      <div className="ui-mockup__hero">
        <div className="ui-mockup__hero-text">
          <span className="ui-mockup__line ui-mockup__line--l1" />
          <span className="ui-mockup__line ui-mockup__line--l2" />
          <span className="ui-mockup__line ui-mockup__line--l3" />
        </div>
        <div className="ui-mockup__hero-visual" />
      </div>
      <div className="ui-mockup__features">
        <span className="ui-mockup__feature" />
        <span className="ui-mockup__feature" />
        <span className="ui-mockup__feature" />
      </div>
      <div className="ui-mockup__footer">
        <span className="ui-mockup__line ui-mockup__line--s1" />
        <span className="ui-mockup__btn-bar" />
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className="mobile-preview">
      <div className="mobile-preview__notch" />
      <div className="mobile-preview__body">
        <span className="mobile-preview__line" style={{ width: "66%" }} />
        <span className="mobile-preview__line" style={{ width: "44%" }} />
        <div className="mobile-preview__block" />
      </div>
    </div>
  );
}

export function HeroGuides() {
  return (
    <div className="hero-guides" aria-hidden="true">
      <div className="hero-guides__surface">
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
            <Card className="hero-editorial-card" key={card.step}>
              <div className="hero-editorial-card__inner">
                <div className="hero-editorial-card__top">
                  <span className="hero-editorial-card__label">{card.label}</span>
                  <div className="hero-editorial-card__tags">
                    {card.tags.map((tag) => (
                      <span key={tag} className="hero-editorial-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <h3 className="hero-editorial-card__project-name">{card.projectName}</h3>

                <div className="hero-editorial-card__main">
                  <div className="hero-editorial-card__preview-col">
                    <UIMockup />
                  </div>
                  <div className="hero-editorial-card__side-col">
                    <DesignSystemPanel />
                    <MobilePreview />
                  </div>
                </div>

                <div className="hero-editorial-card__bottom">
                  <div className="hero-editorial-card__meta">
                    <span className="hero-editorial-card__meta-item">
                      <span className="hero-editorial-card__meta-label">Role</span>
                      <span className="hero-editorial-card__meta-value">{card.role}</span>
                    </span>
                    <span className="hero-editorial-card__meta-item">
                      <span className="hero-editorial-card__meta-label">Tools</span>
                      <span className="hero-editorial-card__meta-value">{card.tools}</span>
                    </span>
                  </div>
                  <a href="#work" className="hero-editorial-card__cta">View case</a>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
}
