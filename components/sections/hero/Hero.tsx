import { HeroGuides } from "@/components/sections/hero/HeroGuides";
import { FlipLinkButton } from "@/components/shared/buttons/FlipButton";
import { heroContent } from "@/lib/portfolio-content";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section data-ui="hero-section" className={styles.heroSection}>
      <div data-ui="hero-grid" className={`main-container ${styles.heroGrid}`}>
        <div data-ui="hero-copy" className={styles.heroCopy}>
          <p data-ui="hero-eyebrow" className={styles.heroEyebrow}>{heroContent.eyebrow}</p>
          <h1 data-ui="hero-title">{heroContent.title}</h1>
          <p data-ui="hero-lead" className={styles.heroLead}>{heroContent.lead}</p>

          <div data-ui="hero-actions" className={styles.heroActions}>
            <FlipLinkButton href="#work" label={heroContent.ctaPrimary} tone="dark" />
            <FlipLinkButton href="#contact" label={heroContent.ctaSecondary} tone="light" />
          </div>

          <div data-ui="hero-availability" className={styles.heroAvailability}>
            <span data-ui="hero-availability-dot" className={styles.heroAvailabilityDot} />
            <span>{heroContent.availability}</span>
          </div>
        </div>

        <HeroGuides />
      </div>
    </section>
  );
}
