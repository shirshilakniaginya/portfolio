---
name: Portfolio Site
description: Dark editorial portfolio for a UI/UX and web designer.
colors:
  background: "#0d0d10"
  surface: "#15151a"
  surface-soft: "#1b1b22"
  surface-strong: "#20202a"
  text-primary: "#f1eee8"
  text-muted: "#aaa39a"
  text-muted-soft: "#888279"
  border-subtle: "#ffffff1f"
  accent-violet: "#9b87e5"
  accent-violet-strong: "#af9af2"
  accent-violet-soft: "#9b87e529"
  accent-green: "#3fb64f"
typography:
  display:
    fontFamily: "var(--font-display), var(--font-body), sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 4rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "var(--font-display), var(--font-body), sans-serif"
    fontSize: "clamp(2rem, 2vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-0.03em"
  body:
    fontFamily: "var(--font-body), sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-body), sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  section: "64px"
components:
  selector-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "34px 40px 36px"
  work-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "40px 28px"
  contact-action:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "0 0"
---

# Design System: Portfolio Site

## Overview

**Creative North Star: "Structured Editorial Grid"**

This portfolio is no longer a warm card-based presentation surface. It is a dark, linear, grid-first brand system where structure is visible at all times. The page reads like a designed canvas: fixed bands, exposed separators, controlled spacing, and typography that carries authority without theatrics.

The visual language should communicate a designer who builds websites as systems. The interface needs to feel calm, exact, and technically composed. It should show that hierarchy, user flow, visual rhythm, and handoff quality are considered before decoration. Motion exists, but only to clarify sequencing and state.

Key Characteristics:

- near-black background with restrained warm text
- visible grid lines and section borders as part of the composition
- square, non-cardified surfaces with almost no rounding
- sparse violet accents used for cues, not decoration
- large editorial typography paired with quiet metadata

## Colors

The palette is dark-first and restraint-driven. Most of the page lives inside a narrow range of charcoal surfaces, with one violet accent and one green utility signal.

### Primary

- **Signal Violet** (`#9b87e5`): Main accent for active dots, icons, directional cues, and small moments of emphasis. Its rarity is the point.
- **Lifted Violet** (`#af9af2`): Stronger accent state for hover-adjacent emphasis and brighter confirmation moments.

### Secondary

- **Utility Green** (`#3fb64f`): Reserved for active state signaling where the UI needs a distinct confirmation color.

### Tertiary

- **Violet Wash** (`#9b87e529`): Soft translucent accent layer used for restrained tinting, not for dominant surfaces.

### Neutral

- **Midnight Canvas** (`#0d0d10`): Main page background and the dominant visual field.
- **Panel Black** (`#15151a`): Core surface color for cards, content zones, and interaction rows.
- **Raised Charcoal** (`#1b1b22`): Secondary surface used behind imagery and lower-contrast panels.
- **Dense Surface** (`#20202a`): Stronger surface for internal elevation without introducing gloss.
- **Paper Ink** (`#f1eee8`): Primary text color and high-priority UI content.
- **Quiet Copy** (`#aaa39a`): Supporting paragraphs and secondary descriptive copy.
- **Faded Meta** (`#888279`): Labels, counts, and low-priority metadata.
- **Grid Line** (`#ffffff1f`): Borders, dividers, structural lines, and visible grid separators.

### Named Rules

**The Visible Structure Rule.** Lines are not decoration. Borders and separators make the system legible and should remain consistently present across major sections.

**The Rare Accent Rule.** Violet does not fill sections, gradient backgrounds, or decorative effects. It appears in small, deliberate moments only.

## Typography

**Display Font:** `var(--font-display), var(--font-body), sans-serif`
**Body Font:** `var(--font-body), sans-serif`
**Label/Meta Font:** `var(--font-body), sans-serif`

**Character:** Typography is calm, adult, and exact. Display type carries the brand voice through proportion and rhythm, while body copy stays readable, quiet, and controlled.

### Hierarchy

- **Display** (`500`, `clamp(2rem, 3.5vw, 4rem)`, `0.94`): Used for the largest contact statement and major editorial hero moments.
- **Headline** (`500`, `clamp(2rem, 2vw, 3rem)`, `1.03`): Used for active hero titles and section-defining statements.
- **Title** (`500`, `clamp(1.85rem, 1.6vw, 2.2rem)`, `0.98-1.08`): Used for selector cards, work card titles, and compact focal headings.
- **Body** (`400`, `16px`, `1.6-1.65`): Used for explanatory copy, case summaries, and content blocks. Keep measure controlled and avoid dense paragraph walls.
- **Label** (`600`, `10px`, `0.12em`, uppercase): Used for labels, indices, navigation metadata, and section markers.

### Named Rules

**The Type Carries Authority Rule.** Hierarchy must come from scale, spacing, and placement before color. If the type needs decorative treatment to feel important, the system is already off.

## Elevation

This system is visually flat. Depth comes from tonal separation, image scale, and the grid itself rather than from floating surfaces. Shadows exist in the token layer, but the interface should read as planar and architectural before it reads as lifted.

### Shadow Vocabulary

- **Deep Ambient** (`0 20px 60px rgba(0, 0, 0, 0.28)`): Available for selective elevated states, but should stay subtle and secondary to borders.
- **Soft Hover** (`var(--card-hover)` with tonal shift): Hover feedback is primarily a background-tone change, not a dramatic lift effect.

### Named Rules

**The Flat By Default Rule.** Sections sit on the same plane unless interaction requires a slight tonal response. If a surface starts to look glossy or floating, it has gone too far.

## Components

### Buttons

- **Style:** The current system does not rely on classic filled CTA buttons as a primary pattern. Actions are embedded into rows, icon links, and structured surfaces.
- **Behavior:** Interaction should come through exact hover states, icon movement, and restrained tonal feedback rather than through loud button styling.

### Chips

- **Style:** The system avoids decorative chip collections. Small uppercase metadata and inline skill strings do the labeling work instead.
- **State:** If chips are introduced later, they should stay thin, quiet, and structurally aligned with the grid.

### Cards / Containers

- **Corner Style:** Hard corners (`0px`) are the default. The system avoids soft card language.
- **Background:** Dark tonal panels close to the page background. Surfaces should feel integrated into the grid, not placed on top of it.
- **Shadow Strategy:** Minimal to none. Tonal hover shifts are preferred over visible drop shadows.
- **Border:** Thin structural lines are mandatory. Borders are part of the composition language.
- **Internal Padding:** Most content zones sit in the `24px` to `64px` range depending on section density.

### Inputs / Fields

- **Style:** The project currently exposes contact actions rather than a form system. Any future fields should inherit the same dark surface, thin line, and quiet typography.
- **Focus:** Focus treatment should be exact and readable, using line clarity and restrained contrast shifts before glows or fills.

### Navigation

- **Style:** Navigation is quiet, inline, and metadata-like. It should support orientation without turning into a dominant hero element.
- **Active Treatment:** Small icons, uppercase labels, and spacing rhythm are preferred over underlines, tabs, or boxed states.

### Signature Component

The signature pattern of the current system is the split editorial hero:

- four selector panels with fixed structural rhythm
- a 2-column image and content composition beneath
- visible linework across both inactive and active states
- uppercase metadata paired with large calm type

## Do's and Don'ts

### Do:

- **Do** keep the page on a near-black background with low-gloss charcoal surfaces and visible linework.
- **Do** preserve the feeling of an exposed grid where structure remains visible across hero, works, contact, and footer.
- **Do** use violet as a sparse signal color for active markers, icons, and selective emphasis.
- **Do** let typography, spacing, and image scale carry the premium feeling.
- **Do** keep motion purposeful, quiet, and tied to state changes or sequencing.

### Don't:

- **Don't** revert the site to warm off-white backgrounds, soft beige cards, or light editorial surfaces.
- **Don't** turn the interface into Generic agency landing pages with oversized marketing claims and shallow case tiles.
- **Don't** introduce Loud SaaS dashboard aesthetics, neon gradient page treatments, or glassmorphism-heavy surfaces.
- **Don't** build Noisy portfolio galleries that rely on motion instead of hierarchy.
- **Don't** add Generic AI-looking sections that repeat the same card pattern without a point of view.
- **Don't** add Over-decorated 3D scenes, blobs, particles, or unrelated illustration systems.
