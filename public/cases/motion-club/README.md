# Minglee Fitness Coach — landing (standalone HTML/CSS)

Production-ready static build, architected to drop into a WordPress 6.7+ **block theme**
with no re-layout. Russian copy, fully responsive, no jQuery, no external CDN.

## Run locally
Any static server, e.g.:

```
npx http-server site -p 5781
```

then open <http://localhost:5781>.

## Structure
```
site/
  index.html              # full page; every <section> is tagged  <!-- pattern: name -->
  assets/css/
    fonts.css             # @font-face — self-hosted woff2 (no CDN)
    tokens.css            # design tokens == theme.json presets (single source of truth)
    base.css              # reset, typography, buttons, accessibility
    sections.css          # per-section styles
  assets/js/main.js       # sticky header, mobile nav, results carousel, CF7-stub form
  assets/fonts/*.woff2    # Oswald, Anton, Manrope (Latin + Cyrillic subsets)
  assets/img/             # hero-bg + hero-man (your assets) · placeholder.svg · stock photos
```

## Fonts
- Display (RU headings): **Oswald** 600/700 — Cyrillic-capable stand-in for the brandbook's
  Anton (Anton ships no Cyrillic glyphs).
- Latin accents only: **Anton** (decorative watermarks).
- Body: **Manrope** 400–800.

All self-hosted → map to `theme.json > settings.typography.fontFamilies`.

## Brand palette (from BRANDBOOK)
`ink #001A16` · `graphite #131C1D` · `sky #3FA0E4` · `aqua #23C1B4` ·
`turquoise #66E0D1` · `lime #C0D72B` · `off-white #F1F3F2` · `stone #D2D6D3`

## WordPress transfer map
| HTML section (`<!-- pattern: x -->`) | WP file |
|---|---|
| header   | `parts/header.html` |
| hero     | `patterns/hero.php` |
| services | `patterns/services.php` |
| about    | `patterns/about.php` |
| pricing  | `patterns/pricing.php` |
| results  | `patterns/results.php` |
| contact  | `patterns/contact.php` → replace `.contact-form` with `[contact-form-7 id="…"]` |
| footer   | `parts/footer.html` |

**Tokens → theme.json.** Every `--wp--preset--color--*`, `--font-family--*`,
`--font-size--*` and `--spacing--*` in `tokens.css` is named exactly as WordPress
generates them. Declare the same values under `theme.json > settings`; the identical
custom properties are auto-generated, so `base.css` / `sections.css` work unchanged.

**contentOnly locking.** Each section's editable nodes (headings, paragraphs, prices,
list items, images) are plain text/`<img>`. Wrap each pattern's markup in a group block
with `"templateLock":"contentOnly"` so the client edits copy/photos/prices without
breaking the layout.

**Icons.** Inline SVG `<symbol>` sprite sits at the top of `index.html`; move it into a
small reusable block or the header part.

## Replace later
- Hero already uses your real assets (`assets/img/hero-bg.webp`, `hero-man.webp`).
- About + results photos are stock/placeholder — just swap the `<img src>`.
