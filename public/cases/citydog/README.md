# CITY DOG Screenshot Build

This folder contains a CMS-ready static reproduction of the approved CITY DOG homepage direction.

## Structure

- `index.html` — semantic homepage markup, each section tagged with `<!-- pattern: ... -->`
- `assets/css/fonts.css` — self-hosted local font faces with `unicode-range`
- `assets/css/tokens.css` — WordPress-style presets and semantic aliases
- `assets/css/base.css` — reset, buttons, header, layout primitives, accessibility
- `assets/css/sections.css` — section-specific layout and component styling
- `assets/js/app.js` — sticky header, mobile nav, reviews scroller

## Section to CMS Pattern Mapping

- `hero-section` -> `pattern: hero`
- `facts-section` -> `pattern: feature-facts`
- `programs-section` -> `pattern: programs`
- `doctor-section` -> `pattern: doctor`
- `spaces-section` -> `pattern: gallery`
- `pricing-section` -> `pattern: pricing`
- `reviews-section` -> `pattern: reviews`
- `cta-section` -> `pattern: cta`
- `site-footer` -> `pattern: footer`

## Token to theme.json Mapping

- `--wp--preset--color--*` -> `settings.color.palette`
- `--wp--preset--font-family--*` -> `settings.typography.fontFamilies`
- `--wp--preset--font-size--*` -> `settings.typography.fontSizes`
- `--wp--preset--spacing--*` -> `settings.spacing.spacingSizes`

Semantic aliases in `tokens.css` already reference WordPress-style preset variables, so the later port can reuse the CSS with minimal changes.

## Notes

- Image slots intentionally use the local placeholder text `image here` per current instruction.
- Fonts are local. No CDN is required.
- The page is prepared for a future block-theme transfer, not a classic PHP theme.
