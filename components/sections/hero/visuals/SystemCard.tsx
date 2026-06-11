import styles from "./system-card.module.css";

const colors = [
  { hex: "#0D0D10", name: "Canvas" },
  { hex: "#15151A", name: "Panel" },
  { hex: "#1B1B22", name: "Raised" },
  { hex: "#F1EEE8", name: "Ink" },
  { hex: "#9B87E5", name: "Accent" },
  { hex: "#3FB64F", name: "Signal" },
] as const;

const typeScale = [
  { label: "H1", size: "80 / 88", sample: 30 },
  { label: "H2", size: "52 / 56", sample: 23 },
  { label: "H3", size: "32 / 36", sample: 18 },
  { label: "Body", size: "16 / 26", sample: 14 },
  { label: "Label", size: "10 / 16", sample: 11 },
] as const;

const spacing = [8, 16, 24, 32, 48, 64] as const;

export function SystemCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <header className={styles.header}>
        <span className={styles.label}>
          <span className={styles.dot} />
          02 &nbsp;Система
        </span>
        <span className={styles.headTokens}>
          <span>radius 0px</span>
          <span>border 1px</span>
        </span>
      </header>

      <div className={styles.intro}>
        <h3 className={styles.title}>
          Система
          <br />
          дизайна
        </h3>
        <p className={styles.subtitle}>
          Цвета, типографика, сетка и spacing собираются под бренд, а не случайно.
        </p>
      </div>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Color</span>
        <div className={styles.swatches}>
          {colors.map((c) => (
            <div className={styles.swatch} key={c.hex}>
              <span className={styles.swatchChip} style={{ background: c.hex }} />
              <span className={styles.swatchHex}>{c.hex}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        <section className={styles.section}>
          <span className={styles.sectionLabel}>Typography scale</span>
          <div className={styles.scale}>
            {typeScale.map((t) => (
              <div className={styles.scaleRow} key={t.label}>
                <span
                  className={styles.scaleSample}
                  style={{ fontSize: `${t.sample}px` }}
                >
                  {t.label}
                </span>
                <span className={styles.scaleSize}>{t.size}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionLabel}>Spacing</span>
          <div className={styles.spacingRows}>
            {spacing.map((v) => (
              <div className={styles.spacingRow} key={v}>
                <span className={styles.spacingVal}>{v}</span>
                <span
                  className={styles.spacingBar}
                  style={{ width: `${(v / 64) * 100}%` }}
                />
              </div>
            ))}
          </div>

          <div className={styles.fonts}>
            <div className={styles.fontItem}>
              <span className={styles.fontGlyph} style={{ fontFamily: "var(--font-display), sans-serif" }}>
                Aa
              </span>
              <span className={styles.fontMeta}>
                <span className={styles.fontRole}>Display</span>
                <span className={styles.fontName}>Hikasami</span>
              </span>
            </div>
            <div className={styles.fontItem}>
              <span className={styles.fontGlyph} style={{ fontFamily: "var(--font-body), sans-serif" }}>
                Aa
              </span>
              <span className={styles.fontMeta}>
                <span className={styles.fontRole}>Body</span>
                <span className={styles.fontName}>Manrope</span>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
