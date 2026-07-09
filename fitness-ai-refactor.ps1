$themeJson = @'
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "appearanceTools": true,
    "layout": {
      "contentSize": "1120px",
      "wideSize": "1280px"
    },
    "useRootPaddingAwareAlignments": false,
    "color": {
      "palette": [
        {
          "slug": "dark",
          "name": "Dark",
          "color": "#000504"
        },
        {
          "slug": "light",
          "name": "Light",
          "color": "#d7e4df"
        },
        {
          "slug": "muted",
          "name": "Muted",
          "color": "#90a09a"
        },
        {
          "slug": "accent",
          "name": "Accent",
          "color": "#ff3344"
        }
      ]
    },
    "custom": {
      "color": {
        "bg-deep": "#000302",
        "text-strong": "rgba(233, 247, 242, 0.9)",
        "text-heading": "rgba(233, 247, 242, 0.85)",
        "text-ui": "rgba(232, 246, 240, 0.82)",
        "text-soft": "rgba(232, 246, 240, 0.72)",
        "text-subtle": "rgba(232, 246, 240, 0.56)",
        "text-faint": "rgba(232, 246, 240, 0.45)",
        "text-ghost": "rgba(232, 246, 240, 0.22)",
        "line": "rgba(215, 228, 223, 0.2)",
        "line-strong": "rgba(215, 228, 223, 0.34)",
        "header-bg": "rgba(0, 5, 4, 0.78)",
        "header-bg-scrolled": "rgba(0, 5, 4, 0.92)",
        "header-border": "rgba(215, 228, 223, 0.08)",
        "header-border-strong": "rgba(215, 228, 223, 0.12)",
        "surface-hover": "rgba(232, 246, 240, 0.022)",
        "panel": "rgba(7, 14, 13, 0.86)",
        "panel-strong": "rgba(10, 18, 17, 0.94)",
        "accent-soft": "rgba(255, 51, 68, 0.5)",
        "accent-glow": "rgba(255, 51, 68, 0.95)",
        "atmosphere-left": "rgba(4, 61, 58, 0.78)",
        "atmosphere-right": "rgba(12, 54, 48, 0.5)"
      },
      "layout": {
        "site-max": "1440px",
        "hero-max": "1680px",
        "hero-min": "max(54.6875rem, 100svh)",
        "hero-tablet-min": "51.25rem",
        "hero-mobile-min": "47.5rem",
        "hero-content-max": "42.5rem",
        "philosophy-min": "clamp(40rem, 68vw, 53.75rem)",
        "visual-tablet-min": "40rem",
        "visual-mobile-min": "30rem",
        "pricing-media-height": "clamp(11.5rem, 18vw, 16rem)"
      },
      "spacing": {
        "pad": "clamp(1.5rem, 5vw, 6rem)",
        "section-y": "clamp(4.75rem, 9vw, 8.25rem)",
        "header-y": "1.125rem",
        "header-y-tablet": "1rem",
        "header-y-mobile": "0.875rem",
        "header-brand-gap": "1rem",
        "line-link-gap": "1.125rem",
        "nav-gap": "2.75rem",
        "nav-gap-footer": "2rem",
        "hero-copy-top": "clamp(7.5rem, 16vh, 10.625rem)",
        "hero-copy-bottom": "clamp(3rem, 6vh, 4.5rem)",
        "philosophy-y": "clamp(4rem, 7vw, 6rem)",
        "pricing-gap": "clamp(1.25rem, 2.4vw, 2.25rem)",
        "pricing-card-gap": "1.25rem",
        "footer-gap": "clamp(3rem, 7vw, 7.5rem)",
        "footer-top": "clamp(4rem, 8vw, 7rem)",
        "footer-bottom": "clamp(2.25rem, 4vw, 3.25rem)",
        "footer-nav-y": "clamp(1.375rem, 2.8vw, 2.25rem)"
      },
      "size": {
        "button-min": "7.625rem",
        "dot": "2.375rem",
        "index-track": "4.5rem",
        "line-link": "7.625rem",
        "line-link-hover": "9.375rem",
        "scroll-track": "4.375rem",
        "scroll-glow": "1.625rem"
      },
      "typography": {
        "meta-size": "0.75rem",
        "tiny-size": "0.6875rem",
        "body-copy-size": "1rem",
        "price-size": "clamp(1.75rem, 3vw, 2.5rem)",
        "tracking-tight": "-0.04em",
        "tracking-wide": "0.18em",
        "tracking-wider": "0.2em",
        "tracking-meta": "0.1em",
        "tracking-ultra": "0.24em",
        "tracking-footer": "0.16em",
        "line-body": "1.65",
        "line-copy": "1.8",
        "line-display": "1.02",
        "weight-display": "200",
        "weight-copy": "300"
      }
    },
    "typography": {
      "fluid": true,
      "fontFamilies": [
        {
          "slug": "system",
          "name": "System Sans",
          "fontFamily": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
        }
      ],
      "fontSizes": [
        {
          "slug": "small",
          "name": "Small",
          "size": "0.875rem"
        },
        {
          "slug": "base",
          "name": "Base",
          "size": "1rem"
        },
        {
          "slug": "large",
          "name": "Large",
          "size": "clamp(1.75rem, 2.4vw, 2.6875rem)"
        },
        {
          "slug": "xl",
          "name": "XL",
          "size": "clamp(2.875rem, 5.3vw, 4.625rem)"
        },
        {
          "slug": "hero",
          "name": "Hero",
          "size": "clamp(4.25rem, 8.1vw, 8.75rem)"
        }
      ],
      "lineHeight": true,
      "letterSpacing": true
    },
    "spacing": {
      "blockGap": true,
      "margin": true,
      "padding": true,
      "spacingScale": {
        "operator": "*",
        "increment": 1.5,
        "steps": 7,
        "mediumStep": 1,
        "unit": "rem"
      },
      "spacingSizes": [
        {
          "slug": "20",
          "name": "2XS",
          "size": "0.5rem"
        },
        {
          "slug": "30",
          "name": "XS",
          "size": "0.75rem"
        },
        {
          "slug": "40",
          "name": "S",
          "size": "1rem"
        },
        {
          "slug": "50",
          "name": "M",
          "size": "1.5rem"
        },
        {
          "slug": "60",
          "name": "L",
          "size": "2rem"
        },
        {
          "slug": "70",
          "name": "XL",
          "size": "3rem"
        },
        {
          "slug": "80",
          "name": "2XL",
          "size": "4rem"
        }
      ]
    },
    "blocks": {
      "core/button": {
        "border": {
          "radius": "999px"
        }
      }
    }
  },
  "styles": {
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--system)",
      "fontSize": "var(--wp--preset--font-size--base)",
      "lineHeight": "var(--wp--custom--typography--line-body)",
      "letterSpacing": "-0.01em"
    },
    "color": {
      "background": "var(--wp--preset--color--dark)",
      "text": "var(--wp--preset--color--light)"
    },
    "elements": {
      "heading": {
        "color": {
          "text": "var(--wp--custom--color--text-strong)"
        },
        "typography": {
          "fontWeight": "var(--wp--custom--typography--weight-display)",
          "lineHeight": "var(--wp--custom--typography--line-display)",
          "letterSpacing": "var(--wp--custom--typography--tracking-tight)"
        }
      },
      "link": {
        "color": {
          "text": "var(--wp--preset--color--light)"
        },
        ":hover": {
          "color": {
            "text": "var(--wp--preset--color--accent)"
          }
        }
      },
      "button": {
        "color": {
          "background": "transparent",
          "text": "var(--wp--preset--color--light)"
        },
        "border": {
          "color": "var(--wp--custom--color--line-strong)",
          "radius": "999px",
          "width": "1px"
        },
        "spacing": {
          "padding": {
            "top": "0.85rem",
            "right": "1.35rem",
            "bottom": "0.85rem",
            "left": "1.35rem"
          }
        },
        "typography": {
          "fontWeight": "400",
          "letterSpacing": "0.08em",
          "textTransform": "uppercase",
          "fontSize": "var(--wp--custom--typography--meta-size)"
        }
      }
    },
    "blocks": {
      "core/site-title": {
        "typography": {
          "fontWeight": "600",
          "fontSize": "var(--wp--custom--typography--meta-size)",
          "letterSpacing": "var(--wp--custom--typography--tracking-wide)",
          "textTransform": "uppercase"
        }
      },
      "core/navigation": {
        "typography": {
          "fontSize": "var(--wp--custom--typography--meta-size)",
          "letterSpacing": "var(--wp--custom--typography--tracking-wide)",
          "textTransform": "uppercase"
        }
      }
    }
  },
  "templateParts": [
    {
      "name": "header",
      "title": "Header",
      "area": "header"
    },
    {
      "name": "footer",
      "title": "Footer",
      "area": "footer"
    }
  ]
}
'@

$mainCss = @'
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  overflow-x: hidden;
  isolation: isolate;
  color-scheme: dark;
}

.wp-site-blocks {
  --fitness-bg: var(--wp--preset--color--dark);
  --fitness-bg-deep: var(--wp--custom--color--bg-deep);
  --fitness-text: var(--wp--preset--color--light);
  --fitness-text-strong: var(--wp--custom--color--text-strong);
  --fitness-text-heading: var(--wp--custom--color--text-heading);
  --fitness-text-ui: var(--wp--custom--color--text-ui);
  --fitness-text-soft: var(--wp--custom--color--text-soft);
  --fitness-text-subtle: var(--wp--custom--color--text-subtle);
  --fitness-text-faint: var(--wp--custom--color--text-faint);
  --fitness-text-ghost: var(--wp--custom--color--text-ghost);
  --fitness-line: var(--wp--custom--color--line);
  --fitness-line-strong: var(--wp--custom--color--line-strong);
  --fitness-red: var(--wp--preset--color--accent);
  --fitness-red-soft: var(--wp--custom--color--accent-soft);
  --fitness-red-glow: var(--wp--custom--color--accent-glow);
  --fitness-panel: var(--wp--custom--color--panel);
  --fitness-panel-strong: var(--wp--custom--color--panel-strong);
  --fitness-header-bg: var(--wp--custom--color--header-bg);
  --fitness-header-bg-scrolled: var(--wp--custom--color--header-bg-scrolled);
  --fitness-header-border: var(--wp--custom--color--header-border);
  --fitness-header-border-strong: var(--wp--custom--color--header-border-strong);
  --fitness-surface-hover: var(--wp--custom--color--surface-hover);
  --fitness-max: var(--wp--custom--layout--site-max);
  --fitness-hero-max: var(--wp--custom--layout--hero-max);
  --fitness-pad: var(--wp--custom--spacing--pad);
  --fitness-gutter: max(var(--fitness-pad), calc((100% - var(--fitness-max)) / 2));
  --fitness-hero-gutter: max(var(--fitness-pad), calc((100% - var(--fitness-hero-max)) / 2));
  --fitness-section-y: var(--wp--custom--spacing--section-y);
  position: relative;
  z-index: 1;
  overflow-x: clip;
}

* {
  box-sizing: border-box;
}

.site-atmosphere,
.site-noise,
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
}

body::before {
  z-index: 0;
  transition: opacity 0.35s ease;
  background:
    radial-gradient(circle at 70% 20%, var(--wp--custom--color--atmosphere-left), transparent 32%),
    radial-gradient(circle at 30% 75%, var(--wp--custom--color--atmosphere-right), transparent 26%),
    linear-gradient(180deg, var(--fitness-bg) 0%, var(--fitness-bg-deep) 100%);
}

.has-shader body::before {
  opacity: 0;
}

.site-atmosphere {
  z-index: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  opacity: 0;
}

.site-noise {
  z-index: 2;
  background-image: url("../noxa/grain.png");
  background-size: 220px 220px;
  background-repeat: repeat;
  opacity: 0.07;
  mix-blend-mode: soft-light;
}

body,
a,
button,
input,
textarea,
select {
  color: inherit;
}

a {
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

:focus-visible {
  outline: 2px solid var(--fitness-red);
  outline-offset: 4px;
  border-radius: 2px;
}

#services,
#about,
#pricing,
#reviews,
#contact {
  scroll-margin-top: 96px;
}

header.wp-block-template-part {
  position: fixed;
  inset: 0 0 auto;
  z-index: 10;
}

body.admin-bar header.wp-block-template-part {
  top: 0;
}

.site-header {
  width: 100%;
  padding: var(--wp--custom--spacing--header-y) var(--fitness-hero-gutter);
  color: var(--fitness-text-ui);
  background: var(--fitness-header-bg);
  border-bottom: 1px solid var(--fitness-header-border);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 220ms ease, border-color 220ms ease;
}

.is-scrolled .site-header {
  background: var(--fitness-header-bg-scrolled);
  border-color: var(--fitness-header-border-strong);
}

.header-brand {
  gap: var(--wp--custom--spacing--header-brand-gap);
}

.footer-dot {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: var(--wp--custom--size--dot);
  height: var(--wp--custom--size--dot);
  margin: 0;
  border: 1px solid var(--fitness-line-strong);
  border-radius: 999px;
  font-size: var(--wp--custom--typography--tiny-size);
  letter-spacing: var(--wp--custom--typography--meta-size);
}

.nav {
  color: var(--fitness-text-soft);
}

.nav .wp-block-navigation-item,
.nav .wp-block-navigation-item__content {
  min-height: auto;
}

.nav a,
.header-actions a,
.footer-links a,
.footer-bottom a,
.line-link {
  transition: color 180ms ease, opacity 180ms ease;
}

.nav a,
.header-actions a {
  padding-block: 1rem;
}

.nav a:hover,
.header-actions a:hover,
.footer-links a:hover,
.footer-bottom a:hover,
.line-link:hover {
  color: var(--fitness-text);
}

.header-actions {
  gap: 0;
}

.round-link .wp-element-button {
  min-width: var(--wp--custom--size--button-min);
}

.section-frame {
  position: relative;
  isolation: isolate;
  padding-inline: var(--fitness-gutter);
  border-bottom: 1px solid var(--fitness-line);
}

.hero {
  min-height: var(--wp--custom--layout--hero-min);
  display: grid;
  align-items: end;
  overflow: hidden;
  padding-inline: var(--fitness-hero-gutter);
  padding-top: 0;
  padding-bottom: 0;
  background-image: url("../noxa/first_generation_2k_transparent.webp");
  background-repeat: no-repeat;
  background-position: right -9vw center;
  background-size: auto min(100%, 1020px);
  filter: saturate(1.08) contrast(1.02);
}

.hero__content {
  width: min(var(--wp--custom--layout--hero-content-max), 60vw);
  padding-block: var(--wp--custom--spacing--hero-copy-top) var(--wp--custom--spacing--hero-copy-bottom);
}

.hero > .hero__content.alignwide {
  max-width: none;
  margin-left: 0 !important;
  margin-right: auto !important;
}

.eyebrow,
.tech-header__label,
.tech-header__counter,
.spine-item__num,
.spine-item__label,
.pricing-card__eyebrow,
.footer-links,
.footer-bottom,
.scroll-note,
.line-link,
.fitness-contact-shortcode .wpcf7-submit,
.fitness-contact-shortcode input[type="submit"] {
  text-transform: uppercase;
}

.eyebrow,
.tech-header__label,
.tech-header__counter,
.pricing-card__eyebrow,
.scroll-note,
.line-link,
.footer-links,
.footer-bottom {
  font-size: var(--wp--custom--typography--meta-size);
  letter-spacing: var(--wp--custom--typography--tracking-wide);
}

.eyebrow {
  margin: 0 0 1.5rem;
  color: var(--fitness-text-soft);
  letter-spacing: var(--wp--custom--typography--tracking-wider);
}

.eyebrow span {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-left: 12px;
  border-radius: 999px;
  background: var(--fitness-red);
  vertical-align: middle;
  box-shadow: 0 0 18px var(--fitness-red);
}

.accent-dot {
  color: var(--fitness-red);
  text-shadow: 0 0 18px var(--fitness-red-soft);
}

h1,
h2,
h3,
p,
ul {
  margin-top: 0;
}

.hero h1,
.philosophy__stack h2,
.technology h2,
.pricing-intro h2,
.footer-heading h2,
.pricing-card h3,
.tech-row__name {
  font-weight: var(--wp--custom--typography--weight-display);
  line-height: var(--wp--custom--typography--line-display);
  letter-spacing: var(--wp--custom--typography--tracking-tight);
  text-wrap: balance;
  color: var(--fitness-text-strong);
}

.hero h1 {
  position: relative;
  margin-bottom: 3.375rem;
  font-size: var(--wp--preset--font-size--hero);
}

.philosophy__stack h2,
.technology h2,
.pricing-intro h2,
.footer-heading h2 {
  margin-bottom: 2rem;
  font-size: var(--wp--preset--font-size--xl);
}

.pricing-card h3,
.tech-row__name {
  margin-bottom: 1rem;
  font-size: var(--wp--preset--font-size--large);
  color: var(--fitness-text-heading);
}

.index-line {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 3rem;
  color: var(--fitness-text-faint);
  font-size: 0.8125rem;
  letter-spacing: var(--wp--custom--typography--tracking-meta);
}

.index-line p {
  margin: 0;
}

.index-line__track {
  width: var(--wp--custom--size--index-track);
  height: 2px;
  background: var(--fitness-line);
  position: relative;
  overflow: hidden;
}

.index-line__track::after {
  content: "";
  position: absolute;
  inset: 0;
  width: 25%;
  background: var(--fitness-red);
  box-shadow: 0 0 8px var(--fitness-red-soft);
}

.hero__copy,
.philosophy__copy,
.tech-row__copy,
.pricing-intro > p,
.pricing-card__body > p,
.footer-heading > p,
.fitness-contact-shortcode,
.fitness-contact-shortcode p {
  color: var(--fitness-text-soft);
  font-size: var(--wp--custom--typography--body-copy-size);
  font-weight: var(--wp--custom--typography--weight-copy);
  line-height: var(--wp--custom--typography--line-copy);
  text-wrap: pretty;
}

.hero__copy,
.pricing-intro > p,
.footer-heading > p {
  max-width: 34ch;
}

.hero__copy {
  margin-bottom: 2.875rem;
}

.line-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--wp--custom--spacing--line-link-gap);
  color: var(--fitness-text-soft);
  letter-spacing: var(--wp--custom--typography--tracking-wider);
}

.line-link::before {
  content: "";
  display: inline-block;
  width: var(--wp--custom--size--line-link);
  height: 1px;
  background: var(--fitness-line-strong);
  transition: width 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms ease;
}

.line-link span {
  position: relative;
  display: inline-block;
  width: 22px;
  height: 12px;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.line-link span::before,
.line-link span::after {
  content: "";
  position: absolute;
  display: block;
}

.line-link span::before {
  width: 22px;
  height: 1px;
  background: var(--fitness-red);
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.line-link span::after {
  width: 8px;
  height: 8px;
  border-top: 1px solid var(--fitness-red);
  border-right: 1px solid var(--fitness-red);
  top: 50%;
  right: -1px;
  transform: translateY(-50%) rotate(45deg);
}

.line-link:hover::before {
  width: var(--wp--custom--size--line-link-hover);
  background: var(--fitness-red-soft);
}

.line-link:hover span {
  transform: translateX(8px);
}

.wp-block-button.line-link .wp-element-button {
  padding: 0;
  border: 0;
  background: transparent;
  font-size: var(--wp--custom--typography--meta-size);
  letter-spacing: var(--wp--custom--typography--tracking-wider);
}

.scroll-note {
  position: absolute;
  right: calc(var(--fitness-hero-gutter) + var(--wp--custom--spacing--nav-gap));
  bottom: 80px;
  display: grid;
  gap: 10px;
  justify-items: center;
  text-align: center;
  color: var(--fitness-text-soft);
  letter-spacing: var(--wp--custom--typography--tracking-wider);
}

.scroll-note p {
  margin: 0;
}

.scroll-note__track {
  position: relative;
  width: 1px;
  height: var(--wp--custom--size--scroll-track);
  margin: 1rem auto 0;
  border: 0;
  overflow: hidden;
  background: linear-gradient(180deg, transparent, var(--fitness-line-strong) 28%, var(--fitness-line-strong) 72%, transparent);
}

.scroll-note__track::after {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: var(--wp--custom--size--scroll-glow);
  background: linear-gradient(180deg, transparent, var(--fitness-red-glow) 70%, rgba(255, 150, 150, 0.95));
  box-shadow: 0 0 12px rgba(255, 51, 68, 0.55);
  transform: translateY(calc(-1 * var(--wp--custom--size--scroll-glow)));
  animation: scrollTravel 2.4s cubic-bezier(0.6, 0.04, 0.3, 1) infinite;
}

.philosophy {
  padding-block: 0;
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 176px minmax(0, 1.3fr);
  align-items: stretch;
  min-height: var(--wp--custom--layout--philosophy-min);
  gap: 0;
}

.philosophy > * {
  max-width: none !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.philosophy__content {
  display: flex;
  align-items: center;
  align-self: stretch;
  min-width: 0;
  padding-block: var(--wp--custom--spacing--philosophy-y);
  padding-right: clamp(2rem, 4vw, 3.5rem);
}

.philosophy__stack {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.philosophy__stack > * {
  margin-inline: 0;
}

.philosophy__marker,
.pricing-marker {
  display: block;
  margin-bottom: 1rem;
  color: var(--fitness-red);
  font-size: 0.8125rem;
  letter-spacing: var(--wp--custom--typography--tracking-ultra);
  font-variant-numeric: tabular-nums;
}

.philosophy__copy {
  max-width: 30ch;
  margin-bottom: 2.75rem;
}

.philosophy__bridge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-self: stretch;
  min-width: 0;
}

.philosophy__bridge::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 28px;
  width: 1px;
  background: linear-gradient(180deg, transparent 0%, var(--fitness-line) 12%, var(--fitness-line-strong) 38%, rgba(255, 51, 68, 0.72) 55%, var(--fitness-line) 76%, transparent 100%);
}

.philosophy__timeline {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(2rem, 4.5vw, 3.5rem);
  padding: clamp(3rem, 6vw, 5rem) 24px clamp(3rem, 6vw, 5rem) 52px;
  width: 100%;
  min-height: 100%;
}

.spine-item {
  display: flex;
  flex-direction: column;
  gap: 9px;
  position: relative;
}

.spine-item::before {
  content: "";
  position: absolute;
  left: -24px;
  top: 8px;
  width: 18px;
  height: 1px;
  background: var(--fitness-line-strong);
}

.spine-item::after {
  content: "";
  position: absolute;
  left: -28px;
  top: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--fitness-bg-deep);
  border: 1px solid var(--fitness-line-strong);
}

.spine-item__num {
  color: var(--fitness-red);
  font-size: var(--wp--custom--typography--meta-size);
  letter-spacing: var(--wp--custom--typography--tracking-ultra);
  margin: 0;
}

.spine-item__label {
  color: var(--fitness-text-soft);
  font-size: var(--wp--custom--typography--tiny-size);
  line-height: 1.6;
  letter-spacing: var(--wp--custom--typography--tracking-wide);
  margin: 0;
}

.philosophy__visual {
  position: relative;
  align-self: stretch;
  width: calc(100% + var(--fitness-gutter));
  min-width: 0;
  min-height: 100%;
  overflow: hidden;
  background-image: url("../noxa/noxa-philosophy-model.webp");
  background-position: center bottom;
  background-size: auto 100%;
  background-repeat: no-repeat;
  margin-right: calc(-1 * var(--fitness-gutter));
}

.technology,
.pricing-section {
  padding-block: var(--fitness-section-y);
}

.tech-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.tech-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: clamp(1.25rem, 2.8vw, 2.25rem);
  border-bottom: 1px solid var(--fitness-line);
}

.tech-header__label {
  color: var(--fitness-text-subtle);
}

.tech-header__counter {
  color: var(--fitness-text-ghost);
  letter-spacing: var(--wp--custom--typography--tracking-ultra);
  font-variant-numeric: tabular-nums;
}

.tech-row {
  display: grid;
  grid-template-columns: clamp(56px, 6vw, 80px) 1fr 1fr clamp(36px, 3vw, 52px);
  align-items: center;
  column-gap: clamp(1.25rem, 3vw, 3rem);
  padding-block: clamp(1.75rem, 3.5vw, 2.875rem);
  padding-inline: clamp(0.875rem, 1.8vw, 1.5rem);
  border-bottom: 1px solid var(--fitness-line);
  transition: background-color 240ms ease;
}

.tech-row:hover {
  background-color: var(--fitness-surface-hover);
}

.tech-row__num,
.tech-row__name,
.tech-row__copy,
.tech-row__arrow {
  margin: 0;
}

.tech-row__num {
  font-size: clamp(2.5rem, 4.4vw, 4.125rem);
  font-weight: var(--wp--custom--typography--weight-display);
  line-height: 1;
  letter-spacing: var(--wp--custom--typography--tracking-tight);
  color: var(--fitness-red);
  font-variant-numeric: tabular-nums;
  opacity: 0.82;
}

.tech-row__copy {
  max-width: 38ch;
}

.tech-row__arrow {
  justify-self: end;
  width: 28px;
  height: 12px;
  position: relative;
}

.tech-row__arrow::before,
.tech-row__arrow::after {
  content: "";
  position: absolute;
}

.tech-row__arrow::before {
  top: 50%;
  left: 0;
  width: 20px;
  height: 1px;
  background: var(--fitness-line-strong);
}

.tech-row__arrow::after {
  top: 50%;
  right: 0;
  width: 7px;
  height: 7px;
  border-top: 1px solid var(--fitness-line-strong);
  border-right: 1px solid var(--fitness-line-strong);
  transform: translate(-2px, -50%) rotate(45deg);
}

.pricing-shell {
  display: grid;
  grid-template-columns: minmax(280px, 0.42fr) minmax(0, 0.58fr);
  gap: var(--wp--custom--spacing--pricing-gap);
  align-items: start;
}

.pricing-intro {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.pricing-intro > * {
  margin-inline: 0;
}

.pricing-intro .wp-block-buttons {
  margin-top: 2.75rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--wp--custom--spacing--pricing-card-gap);
}

.pricing-card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
  background: linear-gradient(180deg, var(--fitness-panel) 0%, var(--fitness-panel-strong) 100%);
  border: 1px solid var(--fitness-line);
}

.pricing-card figure,
.pricing-card .wp-block-image {
  margin: 0;
}

.pricing-card__media img {
  display: block;
  width: 100%;
  height: var(--wp--custom--layout--pricing-media-height);
  object-fit: cover;
}

.pricing-card__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  height: 100%;
}

.pricing-card__eyebrow {
  margin: 0;
  color: var(--fitness-text-subtle);
}

.pricing-card__price {
  margin: 0;
  font-size: var(--wp--custom--typography--price-size);
  line-height: 1;
  letter-spacing: var(--wp--custom--typography--tracking-tight);
  color: var(--fitness-red);
}

.pricing-card__list {
  margin: 0;
  padding-left: 1.125rem;
  color: var(--fitness-text-soft);
  font-size: var(--wp--custom--typography--body-copy-size);
  font-weight: var(--wp--custom--typography--weight-copy);
  line-height: var(--wp--custom--typography--line-copy);
}

.pricing-card__list li + li {
  margin-top: 0.5rem;
}

.footer-cta {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-block: var(--wp--custom--spacing--footer-top) var(--wp--custom--spacing--footer-bottom);
}

.footer-upper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--wp--custom--spacing--footer-gap);
  align-items: end;
  padding-bottom: clamp(2.75rem, 5.5vw, 4.5rem);
}

.footer-heading {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.signup {
  display: grid;
  gap: 1.25rem;
}

.fitness-contact-shortcode,
.signup p,
.fitness-contact-shortcode p {
  margin-bottom: 0;
}

.fitness-contact-shortcode {
  border-top: 1px solid var(--fitness-line);
  padding-top: 1.375rem;
}

.fitness-contact-shortcode .wpcf7-form,
.fitness-contact-shortcode form {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
}

.fitness-contact-shortcode input,
.fitness-contact-shortcode textarea,
.fitness-contact-shortcode select {
  width: 100%;
  min-height: 44px;
  padding: 0.875rem 0;
  border: 0;
  border-bottom: 1px solid var(--fitness-line-strong);
  background: transparent;
}

.fitness-contact-shortcode input:focus,
.fitness-contact-shortcode textarea:focus,
.fitness-contact-shortcode select:focus {
  outline: none;
  border-bottom-color: var(--fitness-red);
}

.fitness-contact-shortcode input[type="submit"],
.fitness-contact-shortcode button,
.fitness-contact-shortcode .wpcf7-submit {
  width: auto;
  min-height: 44px;
  padding: 0 1.5rem;
  border: 1px solid var(--fitness-line-strong);
  border-radius: 999px;
  background: transparent;
  font-size: var(--wp--custom--typography--meta-size);
  letter-spacing: var(--wp--custom--typography--tracking-wide);
}

.footer-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: var(--wp--custom--spacing--footer-nav-y);
  border-top: 1px solid var(--fitness-line);
  border-bottom: 1px solid var(--fitness-line);
}

.footer-links {
  display: flex;
  flex-direction: row;
  gap: var(--wp--custom--spacing--nav-gap-footer);
  color: var(--fitness-text-subtle);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: var(--wp--custom--spacing--footer-nav-y);
  color: var(--fitness-text-faint);
  letter-spacing: var(--wp--custom--typography--tracking-footer);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.footer-bottom__links {
  display: flex;
  gap: 2.125rem;
}

.wp-element-button {
  transition: color 180ms ease, border-color 180ms ease, background-color 180ms ease, opacity 180ms ease;
}

.wp-block-button .wp-element-button:hover {
  border-color: var(--fitness-text);
}

@keyframes scrollTravel {
  0% {
    transform: translateY(calc(-1 * var(--wp--custom--size--scroll-glow)));
    opacity: 0;
  }

  16% {
    opacity: 1;
  }

  84% {
    opacity: 1;
  }

  100% {
    transform: translateY(var(--wp--custom--size--scroll-track));
    opacity: 0;
  }
}

@media (max-width: 1180px) {
  .nav {
    display: none;
  }

  .site-header {
    padding: var(--wp--custom--spacing--header-y-tablet) var(--fitness-hero-gutter);
  }

  .hero {
    min-height: var(--wp--custom--layout--hero-tablet-min);
  }

  .philosophy {
    grid-template-columns: 1fr 1.2fr;
    min-height: 0;
    padding-block: 0;
  }

  .philosophy__bridge {
    display: none;
  }

  .philosophy__content {
    padding: 4.5rem var(--fitness-pad) 3.75rem var(--fitness-pad);
    min-height: 0;
  }

  .philosophy__visual {
    width: calc(100% + var(--fitness-gutter));
    min-height: var(--wp--custom--layout--visual-tablet-min);
    background-position: center bottom;
  }

  .pricing-shell,
  .footer-upper {
    grid-template-columns: 1fr;
  }

  .pricing-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .hero {
    min-height: var(--wp--custom--layout--hero-mobile-min);
    align-items: end;
    padding-top: 0;
    padding-bottom: 3.75rem;
    background-position: 78% bottom;
    background-size: auto 62%;
  }

  .hero__content {
    width: 100%;
    margin-left: 0;
    padding-top: 7.5rem;
  }

  .scroll-note {
    display: none;
  }

  .line-link::before {
    width: 50px;
  }

  .philosophy {
    grid-template-columns: 1fr;
    padding-block: 0;
  }

  .philosophy__content {
    padding: 4rem 1.5rem 3rem;
  }

  .philosophy__visual {
    width: 100%;
    margin-right: 0;
    min-height: var(--wp--custom--layout--visual-mobile-min);
    background-position: 60% bottom;
  }

  .tech-row {
    grid-template-columns: clamp(44px, 8vw, 60px) 1fr clamp(36px, 3vw, 44px);
    grid-template-rows: auto auto;
  }

  .tech-row__copy {
    grid-column: 2;
    grid-row: 2;
    padding-top: 10px;
    font-size: 0.875rem;
  }

  .tech-row__arrow {
    grid-column: 3;
    grid-row: 1;
    align-self: center;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .footer-upper,
  .footer-nav,
  .footer-bottom {
    gap: 1.75rem;
  }

  .footer-nav,
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-links,
  .footer-bottom__links {
    flex-wrap: wrap;
    gap: 1rem 1.75rem;
  }
}

@media (max-width: 600px) {
  body.admin-bar header.wp-block-template-part {
    top: 0;
  }

  .site-header {
    padding: var(--wp--custom--spacing--header-y-mobile) var(--fitness-hero-gutter);
  }

  .hero {
    background-position: 86% bottom;
    background-size: auto 56%;
  }
}

@media (min-width: 2000px) {
  .hero {
    background-position: right -3vw center;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
'@

$headerHtml = @'
<!-- wp:group {"className":"site-header","layout":{"type":"constrained"}} -->
<div class="wp-block-group site-header">
	<!-- wp:group {"align":"wide","layout":{"type":"flex","justifyContent":"space-between","flexWrap":"nowrap","verticalAlignment":"center"}} -->
	<div class="wp-block-group alignwide">
		<!-- wp:group {"className":"header-brand","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
		<div class="wp-block-group header-brand">
			<!-- wp:paragraph {"className":"footer-dot"} -->
			<p class="footer-dot">FA</p>
			<!-- /wp:paragraph -->

			<!-- wp:site-title {"level":0} /-->
		</div>
		<!-- /wp:group -->

		<!-- wp:navigation {"overlayMenu":"mobile","className":"nav","layout":{"type":"flex","justifyContent":"center"}} -->
			<!-- wp:navigation-link {"label":"Tech","url":"#about","kind":"custom"} /-->
			<!-- wp:navigation-link {"label":"Mission","url":"#services","kind":"custom"} /-->
			<!-- wp:navigation-link {"label":"Pricing","url":"#pricing","kind":"custom"} /-->
			<!-- wp:navigation-link {"label":"Journal","url":"#reviews","kind":"custom"} /-->
		<!-- /wp:navigation -->

		<!-- wp:buttons {"className":"header-actions"} -->
		<div class="wp-block-buttons header-actions">
			<!-- wp:button {"className":"round-link"} -->
			<div class="wp-block-button round-link"><a class="wp-block-button__link wp-element-button" href="#contact">Start</a></div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
'@

$footerHtml = @'
<!-- wp:group {"className":"footer-cta section-frame","layout":{"type":"constrained"}} -->
<div class="wp-block-group footer-cta section-frame">
	<!-- wp:group {"align":"wide","className":"footer-nav","layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap","verticalAlignment":"center"}} -->
	<div class="wp-block-group alignwide footer-nav">
		<!-- wp:navigation {"className":"footer-links footer-links--social","overlayMenu":"never","layout":{"type":"flex","justifyContent":"left"}} -->
			<!-- wp:navigation-link {"label":"Instagram","url":"#","kind":"custom"} /-->
			<!-- wp:navigation-link {"label":"Telegram","url":"#","kind":"custom"} /-->
			<!-- wp:navigation-link {"label":"YouTube","url":"#","kind":"custom"} /-->
		<!-- /wp:navigation -->

		<!-- wp:navigation {"className":"footer-links footer-links--company","overlayMenu":"never","layout":{"type":"flex","justifyContent":"right"}} -->
			<!-- wp:navigation-link {"label":"Contact","url":"#contact","kind":"custom"} /-->
			<!-- wp:navigation-link {"label":"Programs","url":"#pricing","kind":"custom"} /-->
			<!-- wp:navigation-link {"label":"Terms","url":"#","kind":"custom"} /-->
		<!-- /wp:navigation -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"align":"wide","className":"footer-bottom","layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap","verticalAlignment":"bottom"}} -->
	<div class="wp-block-group alignwide footer-bottom">
		<!-- wp:group {"className":"footer-brand","layout":{"type":"default"}} -->
		<div class="wp-block-group footer-brand">
			<!-- wp:paragraph {"className":"footer-dot"} -->
			<p class="footer-dot">FA</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"fontSize":"small"} -->
			<p class="has-small-font-size">© 2026 Fitness AI Labs</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"footer-bottom__links","layout":{"type":"flex","flexWrap":"wrap"}} -->
		<div class="wp-block-group footer-bottom__links">
			<!-- wp:paragraph {"fontSize":"small"} -->
			<p class="has-small-font-size">Privacy</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"fontSize":"small"} -->
			<p class="has-small-font-size">Terms</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"fontSize":"small"} -->
			<p class="has-small-font-size">Accessibility</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
'@

$heroPattern = @'
<?php
/**
 * Title: Hero
 * Slug: fitness-ai/hero
 * Categories: featured
 * Inserter: no
 */
?>
<!-- wp:group {"tagName":"section","templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"hero section-frame","layout":{"type":"constrained"}} -->
<section class="wp-block-group hero section-frame">
	<!-- wp:group {"align":"wide","className":"hero__content","layout":{"type":"default"}} -->
	<div class="wp-block-group alignwide hero__content">
		<!-- wp:paragraph {"className":"eyebrow"} -->
		<p class="eyebrow">Intelligent coaching <span></span></p>
		<!-- /wp:paragraph -->

		<!-- wp:heading {"level":1,"fontSize":"hero"} -->
		<h1 class="wp-block-heading has-hero-font-size">Strength<br />System<br />Evolved<span class="accent-dot">.</span></h1>
		<!-- /wp:heading -->

		<!-- wp:group {"className":"index-line","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
		<div class="wp-block-group index-line">
			<!-- wp:group {"className":"index-line__track","layout":{"type":"default"}} -->
			<div class="wp-block-group index-line__track"></div>
			<!-- /wp:group -->

			<!-- wp:paragraph -->
			<p><strong>01</strong></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p><em>/ 06</em></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:paragraph {"className":"hero__copy"} -->
		<p class="hero__copy">Fitness AI merges training, recovery and nutrition into one adaptive system that responds to your schedule, your body and your actual level of discipline.</p>
		<!-- /wp:paragraph -->

		<!-- wp:buttons -->
		<div class="wp-block-buttons">
			<!-- wp:button {"className":"line-link line-link--arrow"} -->
			<div class="wp-block-button line-link line-link--arrow"><a class="wp-block-button__link wp-element-button" href="#about">Discover the system <span></span></a></div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"className":"scroll-note","layout":{"type":"default"}} -->
	<div class="wp-block-group scroll-note">
		<!-- wp:paragraph -->
		<p>Scroll</p>
		<!-- /wp:paragraph -->

		<!-- wp:paragraph -->
		<p>to explore</p>
		<!-- /wp:paragraph -->

		<!-- wp:separator {"className":"scroll-note__track"} -->
		<hr class="wp-block-separator has-alpha-channel-opacity scroll-note__track"/>
		<!-- /wp:separator -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
'@

$servicesPattern = @'
<?php
/**
 * Title: Services
 * Slug: fitness-ai/services
 * Categories: featured
 * Inserter: no
 */
?>
<!-- wp:group {"tagName":"section","anchor":"services","templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"philosophy section-frame","layout":{"type":"constrained"}} -->
<section id="services" class="wp-block-group philosophy section-frame">
	<!-- wp:group {"className":"philosophy__content","layout":{"type":"default"}} -->
	<div class="wp-block-group philosophy__content">
		<!-- wp:group {"className":"philosophy__stack","layout":{"type":"default"}} -->
		<div class="wp-block-group philosophy__stack">
			<!-- wp:paragraph {"className":"philosophy__marker"} -->
			<p class="philosophy__marker">02</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"fontSize":"xl"} -->
			<h2 class="wp-block-heading has-xl-font-size">Training<br />Should Simplify.<br />You Shouldn't<span class="accent-dot">.</span></h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"philosophy__copy"} -->
			<p class="philosophy__copy">The system adapts to your pace, makes technique clearer, and removes the noise that usually kills consistency after the first burst of motivation.</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"className":"line-link line-link--arrow"} -->
				<div class="wp-block-button line-link line-link--arrow"><a class="wp-block-button__link wp-element-button" href="#about">Discover the method <span></span></a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"className":"philosophy__bridge","layout":{"type":"default"}} -->
	<div class="wp-block-group philosophy__bridge">
		<!-- wp:group {"className":"philosophy__timeline","layout":{"type":"default"}} -->
		<div class="wp-block-group philosophy__timeline">
			<!-- wp:group {"className":"spine-item","layout":{"type":"default"}} -->
			<div class="wp-block-group spine-item">
				<!-- wp:paragraph {"className":"spine-item__num"} -->
				<p class="spine-item__num">01</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"spine-item__label"} -->
				<p class="spine-item__label">Adaptive<br />Training</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"className":"spine-item","layout":{"type":"default"}} -->
			<div class="wp-block-group spine-item">
				<!-- wp:paragraph {"className":"spine-item__num"} -->
				<p class="spine-item__num">02</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"spine-item__label"} -->
				<p class="spine-item__label">Biometric<br />Recovery</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"className":"spine-item","layout":{"type":"default"}} -->
			<div class="wp-block-group spine-item">
				<!-- wp:paragraph {"className":"spine-item__num"} -->
				<p class="spine-item__num">03</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"spine-item__label"} -->
				<p class="spine-item__label">Effortless<br />Form</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"className":"philosophy__visual","layout":{"type":"default"}} -->
	<div class="wp-block-group philosophy__visual" aria-hidden="true"></div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
'@

$aboutPattern = @'
<?php
/**
 * Title: About
 * Slug: fitness-ai/about
 * Categories: featured
 * Inserter: no
 */
?>
<!-- wp:group {"tagName":"section","anchor":"about","templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"technology section-frame","layout":{"type":"constrained"}} -->
<section id="about" class="wp-block-group technology section-frame">
	<!-- wp:group {"align":"wide","className":"tech-inner","layout":{"type":"default"}} -->
	<div class="wp-block-group alignwide tech-inner">
		<!-- wp:group {"className":"tech-header","layout":{"type":"flex","justifyContent":"space-between","flexWrap":"nowrap","verticalAlignment":"center"}} -->
		<div class="wp-block-group tech-header">
			<!-- wp:paragraph {"className":"tech-header__label"} -->
			<p class="tech-header__label">Engineered for real life</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"tech-header__counter"} -->
			<p class="tech-header__counter">03</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"tech-row","layout":{"type":"grid","columnCount":4}} -->
		<div class="wp-block-group tech-row">
			<!-- wp:paragraph {"className":"tech-row__num"} -->
			<p class="tech-row__num">01</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"className":"tech-row__name"} -->
			<h3 class="wp-block-heading tech-row__name">Adaptive Training</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"tech-row__copy"} -->
			<p class="tech-row__copy">Workouts scale to your current form, schedule and recovery instead of forcing you into a generic volume plan.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"tech-row__arrow"} -->
			<p class="tech-row__arrow"></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"tech-row","layout":{"type":"grid","columnCount":4}} -->
		<div class="wp-block-group tech-row">
			<!-- wp:paragraph {"className":"tech-row__num"} -->
			<p class="tech-row__num">02</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"className":"tech-row__name"} -->
			<h3 class="wp-block-heading tech-row__name">Biometric Recovery</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"tech-row__copy"} -->
			<p class="tech-row__copy">Sleep, stress and fatigue are translated into practical adjustments so your system keeps moving instead of stalling.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"tech-row__arrow"} -->
			<p class="tech-row__arrow"></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"tech-row","layout":{"type":"grid","columnCount":4}} -->
		<div class="wp-block-group tech-row">
			<!-- wp:paragraph {"className":"tech-row__num"} -->
			<p class="tech-row__num">03</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"className":"tech-row__name"} -->
			<h3 class="wp-block-heading tech-row__name">Effortless Form</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"tech-row__copy"} -->
			<p class="tech-row__copy">Nutrition, body composition and movement quality start to align, so looking strong becomes a side effect of living better.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"tech-row__arrow"} -->
			<p class="tech-row__arrow"></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
'@

$pricingPattern = @'
<?php
/**
 * Title: Pricing
 * Slug: fitness-ai/pricing
 * Categories: featured
 * Inserter: no
 */
$plan_one = esc_url( get_theme_file_uri( 'assets/noxa/Lastgrid1.webp' ) );
$plan_two = esc_url( get_theme_file_uri( 'assets/noxa/lastgrid2.webp' ) );
$plan_three = esc_url( get_theme_file_uri( 'assets/noxa/lastgrid4.webp' ) );
?>
<!-- wp:group {"tagName":"section","anchor":"pricing","templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"pricing-section section-frame","layout":{"type":"constrained"}} -->
<section id="pricing" class="wp-block-group pricing-section section-frame">
	<!-- wp:group {"align":"wide","className":"pricing-shell","layout":{"type":"default"}} -->
	<div class="wp-block-group alignwide pricing-shell">
		<!-- wp:group {"className":"pricing-intro","layout":{"type":"default"}} -->
		<div class="wp-block-group pricing-intro">
			<!-- wp:paragraph {"className":"pricing-marker"} -->
			<p class="pricing-marker">04</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"fontSize":"xl"} -->
			<h2 class="wp-block-heading has-xl-font-size">Choose the<br />support level<br />you need<span class="accent-dot">.</span></h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Each plan keeps the same method, but changes response speed, feedback depth and how closely I track your weekly execution.</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"className":"line-link line-link--arrow"} -->
				<div class="wp-block-button line-link line-link--arrow"><a class="wp-block-button__link wp-element-button" href="#contact">Start with a request <span></span></a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"pricing-grid","layout":{"type":"default"}} -->
		<div class="wp-block-group pricing-grid">
			<!-- wp:group {"className":"pricing-card","layout":{"type":"default"}} -->
			<div class="wp-block-group pricing-card">
				<!-- wp:image {"sizeSlug":"full","linkDestination":"none","className":"pricing-card__media"} -->
				<figure class="wp-block-image size-full pricing-card__media"><img src="<?php echo $plan_one; ?>" alt="Hybrid coaching plan"/></figure>
				<!-- /wp:image -->

				<!-- wp:group {"className":"pricing-card__body","layout":{"type":"default"}} -->
				<div class="wp-block-group pricing-card__body">
					<!-- wp:paragraph {"className":"pricing-card__eyebrow"} -->
					<p class="pricing-card__eyebrow">Hybrid coaching</p>
					<!-- /wp:paragraph -->

					<!-- wp:heading {"level":3} -->
					<h3 class="wp-block-heading">Precision System</h3>
					<!-- /wp:heading -->

					<!-- wp:paragraph {"className":"pricing-card__price"} -->
					<p class="pricing-card__price">$320 / month</p>
					<!-- /wp:paragraph -->

					<!-- wp:list {"className":"pricing-card__list"} -->
					<ul class="wp-block-list pricing-card__list"><li>Weekly plan updates</li><li>Form review with video feedback</li><li>Nutrition and recovery adjustments</li></ul>
					<!-- /wp:list -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"className":"pricing-card","layout":{"type":"default"}} -->
			<div class="wp-block-group pricing-card">
				<!-- wp:image {"sizeSlug":"full","linkDestination":"none","className":"pricing-card__media"} -->
				<figure class="wp-block-image size-full pricing-card__media"><img src="<?php echo $plan_two; ?>" alt="Monthly check-in plan"/></figure>
				<!-- /wp:image -->

				<!-- wp:group {"className":"pricing-card__body","layout":{"type":"default"}} -->
				<div class="wp-block-group pricing-card__body">
					<!-- wp:paragraph {"className":"pricing-card__eyebrow"} -->
					<p class="pricing-card__eyebrow">Monthly focus</p>
					<!-- /wp:paragraph -->

					<!-- wp:heading {"level":3} -->
					<h3 class="wp-block-heading">Signal Reset</h3>
					<!-- /wp:heading -->

					<!-- wp:paragraph {"className":"pricing-card__price"} -->
					<p class="pricing-card__price">$180 / month</p>
					<!-- /wp:paragraph -->

					<!-- wp:list {"className":"pricing-card__list"} -->
					<ul class="wp-block-list pricing-card__list"><li>One structured update per week</li><li>Monthly movement audit</li><li>Nutrition checkpoints</li></ul>
					<!-- /wp:list -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"className":"pricing-card","layout":{"type":"default"}} -->
			<div class="wp-block-group pricing-card">
				<!-- wp:image {"sizeSlug":"full","linkDestination":"none","className":"pricing-card__media"} -->
				<figure class="wp-block-image size-full pricing-card__media"><img src="<?php echo $plan_three; ?>" alt="Strategy consultation plan"/></figure>
				<!-- /wp:image -->

				<!-- wp:group {"className":"pricing-card__body","layout":{"type":"default"}} -->
				<div class="wp-block-group pricing-card__body">
					<!-- wp:paragraph {"className":"pricing-card__eyebrow"} -->
					<p class="pricing-card__eyebrow">Single session</p>
					<!-- /wp:paragraph -->

					<!-- wp:heading {"level":3} -->
					<h3 class="wp-block-heading">System Audit</h3>
					<!-- /wp:heading -->

					<!-- wp:paragraph {"className":"pricing-card__price"} -->
					<p class="pricing-card__price">$95 / session</p>
					<!-- /wp:paragraph -->

					<!-- wp:list {"className":"pricing-card__list"} -->
					<ul class="wp-block-list pricing-card__list"><li>90-minute consultation</li><li>Action plan in writing</li><li>Clear next-step roadmap</li></ul>
					<!-- /wp:list -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
'@

$reviewsPattern = @'
<?php
/**
 * Title: Reviews
 * Slug: fitness-ai/reviews
 * Categories: featured
 * Inserter: no
 */
?>
<!-- wp:group {"tagName":"section","anchor":"reviews","templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"technology section-frame","layout":{"type":"constrained"}} -->
<section id="reviews" class="wp-block-group technology section-frame">
	<!-- wp:group {"align":"wide","className":"tech-inner","layout":{"type":"default"}} -->
	<div class="wp-block-group alignwide tech-inner">
		<!-- wp:group {"className":"tech-header","layout":{"type":"flex","justifyContent":"space-between","flexWrap":"nowrap","verticalAlignment":"center"}} -->
		<div class="wp-block-group tech-header">
			<!-- wp:paragraph {"className":"tech-header__label"} -->
			<p class="tech-header__label">Journal</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"tech-header__counter"} -->
			<p class="tech-header__counter">05</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"tech-row","layout":{"type":"grid","columnCount":4}} -->
		<div class="wp-block-group tech-row">
			<!-- wp:paragraph {"className":"tech-row__num"} -->
			<p class="tech-row__num">A1</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"className":"tech-row__name"} -->
			<h3 class="wp-block-heading tech-row__name">“The plan finally feels quiet.”</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"tech-row__copy"} -->
			<p class="tech-row__copy">Maria, 34. Eight kilograms down, more energy, no crash-and-burn cycle. The system fits work and family instead of fighting them.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"tech-row__arrow"} -->
			<p class="tech-row__arrow"></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"tech-row","layout":{"type":"grid","columnCount":4}} -->
		<div class="wp-block-group tech-row">
			<!-- wp:paragraph {"className":"tech-row__num"} -->
			<p class="tech-row__num">A2</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"className":"tech-row__name"} -->
			<h3 class="wp-block-heading tech-row__name">“I stopped restarting every Monday.”</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"tech-row__copy"} -->
			<p class="tech-row__copy">Alexey, 29. Better movement quality, visible shape and a training rhythm that does not collapse as soon as the week gets busy.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"tech-row__arrow"} -->
			<p class="tech-row__arrow"></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"tech-row","layout":{"type":"grid","columnCount":4}} -->
		<div class="wp-block-group tech-row">
			<!-- wp:paragraph {"className":"tech-row__num"} -->
			<p class="tech-row__num">A3</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"className":"tech-row__name"} -->
			<h3 class="wp-block-heading tech-row__name">“Discipline became physical.”</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"tech-row__copy"} -->
			<p class="tech-row__copy">Ekaterina, 41. The process feels calm, but the changes are obvious: posture, strength and more control over recovery and food.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"tech-row__arrow"} -->
			<p class="tech-row__arrow"></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
'@

$contactPattern = @'
<?php
/**
 * Title: Contact
 * Slug: fitness-ai/contact
 * Categories: featured
 * Inserter: no
 */
?>
<!-- wp:group {"tagName":"section","anchor":"contact","templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"footer-cta section-frame","layout":{"type":"constrained"}} -->
<section id="contact" class="wp-block-group footer-cta section-frame">
	<!-- wp:group {"align":"wide","className":"footer-upper","layout":{"type":"grid","columnCount":2}} -->
	<div class="wp-block-group alignwide footer-upper">
		<!-- wp:group {"className":"footer-heading","layout":{"type":"default"}} -->
		<div class="wp-block-group footer-heading">
			<!-- wp:heading {"level":2,"fontSize":"xl"} -->
			<h2 class="wp-block-heading has-xl-font-size">Stay Ahead<br />of What's Next</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Tell me your goal, your starting point and your schedule. I will map the cleanest route toward a stronger body and a calmer system.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"className":"signup","layout":{"type":"default"}} -->
		<div class="wp-block-group signup">
			<!-- wp:paragraph {"fontSize":"small"} -->
			<p class="has-small-font-size">Use the form below</p>
			<!-- /wp:paragraph -->

			<!-- wp:group {"className":"fitness-contact-shortcode","layout":{"type":"default"}} -->
			<div class="wp-block-group fitness-contact-shortcode">
				<!-- wp:shortcode -->
				[contact-form-7 id="14" title="Contact form 1"]
				<!-- /wp:shortcode -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
'@

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
$themeRoot = 'C:\Users\Shtutik\Local Sites\fitness-landing\app\public\wp-content\themes\fitness-ai'

[System.IO.File]::WriteAllText((Join-Path $themeRoot 'theme.json'), $themeJson, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $themeRoot 'assets\css\main.css'), $mainCss, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $themeRoot 'parts\header.html'), $headerHtml, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $themeRoot 'parts\footer.html'), $footerHtml, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $themeRoot 'patterns\hero.php'), $heroPattern, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $themeRoot 'patterns\services.php'), $servicesPattern, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $themeRoot 'patterns\about.php'), $aboutPattern, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $themeRoot 'patterns\pricing.php'), $pricingPattern, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $themeRoot 'patterns\reviews.php'), $reviewsPattern, $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $themeRoot 'patterns\contact.php'), $contactPattern, $utf8NoBom)
