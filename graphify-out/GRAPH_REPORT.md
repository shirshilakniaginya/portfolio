# Graph Report - MY PORTFOLIO SITE  (2026-07-08)

## Corpus Check
- 39 files · ~19,601 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 301 nodes · 311 edges · 26 communities (20 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f0f8f99`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_AboutDemo.tsx  AboutDemo()|AboutDemo.tsx / AboutDemo()]]
- [[_COMMUNITY_Clean Presentation Over Decorative Complexity|Clean Presentation Over Decorative Complexity / ]]
- [[_COMMUNITY_components.json  aliases|components.json / aliases]]
- [[_COMMUNITY_DESIGN.json  accent-green|DESIGN.json / accent-green]]
- [[_COMMUNITY_tsconfig.json  compilerOptions|tsconfig.json / compilerOptions]]
- [[_COMMUNITY_page.tsx  Home()|page.tsx / Home()]]
- [[_COMMUNITY_eslint.config.mjs  package.json|eslint.config.mjs / package.json]]
- [[_COMMUNITY_layout.tsx  geist|layout.tsx / geist]]
- [[_COMMUNITY_dependencies  @base-uireact|dependencies / @base-ui/react]]
- [[_COMMUNITY_motion.ts  createCascadeTransition()|motion.ts / createCascadeTransition()]]
- [[_COMMUNITY_Silk.jsx  hexToNormalizedRGB()|Silk.jsx / hexToNormalizedRGB()]]
- [[_COMMUNITY_SilkBackground.tsx  createProgram()|SilkBackground.tsx / createProgram()]]
- [[_COMMUNITY_SystemCard.tsx  colors|SystemCard.tsx / colors]]
- [[_COMMUNITY_shot.js  { chromium }|shot.js / { chromium }]]
- [[_COMMUNITY_postcss.config.mjs  config|postcss.config.mjs / config]]
- [[_COMMUNITY_scroll-reveal.tsx|scroll-reveal.tsx]]
- [[_COMMUNITY_fitness-ai-refactor.ps1|fitness-ai-refactor.ps1]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Design System: Portfolio Site` - 12 edges
3. `Тексты кворков` - 12 edges
4. `Product` - 8 edges
5. `Components` - 7 edges
6. `Product Purpose` - 7 edges
7. `colorMeta` - 6 edges
8. `tailwind` - 6 edges
9. `aliases` - 6 edges
10. `Colors` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Design System: Portfolio Site` --conceptually_related_to--> `Anti-references`  [INFERRED]
  DESIGN.md → PRODUCT.md
- `Design System: Portfolio Site` --conceptually_related_to--> `Brand Personality`  [INFERRED]
  DESIGN.md → PRODUCT.md
- `Structured Editorial Grid (Creative North Star)` --conceptually_related_to--> `Designing Websites as Systems`  [INFERRED]
  DESIGN.md → PRODUCT.md
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `Preserve Author's Voice and Visual Identity` --conceptually_related_to--> `Brand Personality`  [INFERRED]
  AGENTS.md → PRODUCT.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Structure-First Design Philosophy** — design_structured_editorial_grid, product_websites_as_systems, agents_clean_presentation_over_decoration, design_visible_structure_rule [INFERRED 0.80]
- **Restraint Guardrails Against Decoration** — product_anti_references, design_rare_accent_rule, design_flat_by_default_rule, design_purposeful_motion [INFERRED 0.75]

## Communities (26 total, 6 thin omitted)

### Community 0 - "AboutDemo.tsx / AboutDemo()"
Cohesion: 0.06
Nodes (27): AboutDemo(), AboutDemoProps, StageRow, stageRows, BuildDemo(), BuildDemoProps, codeFragments, CodeLine (+19 more)

### Community 1 - "Clean Presentation Over Decorative Complexity / "
Cohesion: 0.06
Nodes (33): Buttons, Cards / Containers, Chips, Color Tokens / Palette, Colors, Components, Design System: Portfolio Site, Do: (+25 more)

### Community 2 - "components.json / aliases"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 3 - "DESIGN.json / accent-green"
Cohesion: 0.10
Nodes (21): canonical, displayName, role, canonical, displayName, role, canonical, displayName (+13 more)

### Community 4 - "tsconfig.json / compilerOptions"
Cohesion: 0.10
Nodes (19): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+11 more)

### Community 5 - "page.tsx / Home()"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "eslint.config.mjs / package.json"
Cohesion: 0.12
Nodes (9): Contact(), Fields, Status, Footer(), Hero(), hoverTransition, WorkCard, workCards (+1 more)

### Community 7 - "layout.tsx / geist"
Cohesion: 0.17
Nodes (11): geist, hikasami, manrope, metadata, RootLayout(), NAV, SiteHeader(), cn() (+3 more)

### Community 8 - "dependencies / @base-ui/react"
Cohesion: 0.14
Nodes (13): do, dont, extensions, doDont, motion, northStar, generatedAt, defaultEase (+5 more)

### Community 9 - "motion.ts / createCascadeTransition()"
Cohesion: 0.13
Nodes (15): dependencies, @base-ui/react, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hcaptcha/react-hcaptcha (+7 more)

### Community 10 - "Silk.jsx / hexToNormalizedRGB()"
Cohesion: 0.40
Nodes (3): createProgram(), createShader(), SilkBackgroundProps

### Community 11 - "SilkBackground.tsx / createProgram()"
Cohesion: 0.33
Nodes (3): easeOutExpo, easeOutQuint, revealViewport

### Community 12 - "SystemCard.tsx / colors"
Cohesion: 0.40
Nodes (3): colors, spacing, typeScale

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (17): Clean Presentation Over Decorative Complexity, Expectations, Preserve Author's Voice and Visual Identity, Project, Project Rules, Purposeful Motion (Clarify Not Perform), The Visible Structure Rule, Accessibility & Inclusion (+9 more)

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (15): 10. Доработка и правки сайта, 1. Лендинг на Tilda (Zero Block), 2. Многостраничный сайт на Tilda, 3. Лендинг на Next.js / React, 4. Сайт на Next.js + CMS (Sanity), 5. Сайт на WordPress (ACF, Classic, без Gutenberg), 6. Дизайн сайта в Figma (UI/UX с нуля), 7. Вёрстка по макету Figma (+7 more)

## Knowledge Gaps
- **171 isolated node(s):** `schemaVersion`, `generatedAt`, `title`, `name`, `summary` (+166 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design System: Portfolio Site` connect `Clean Presentation Over Decorative Complexity / ` to `Community 22`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `colorMeta` connect `DESIGN.json / accent-green` to `dependencies / @base-ui/react`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `dependencies` connect `motion.ts / createCascadeTransition()` to `tsconfig.json / compilerOptions`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Design System: Portfolio Site` (e.g. with `Anti-references` and `Brand Personality`) actually correct?**
  _`Design System: Portfolio Site` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `schemaVersion`, `generatedAt`, `title` to the rest of the system?**
  _174 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AboutDemo.tsx / AboutDemo()` be split into smaller, more focused modules?**
  _Cohesion score 0.059233449477351915 - nodes in this community are weakly interconnected._
- **Should `Clean Presentation Over Decorative Complexity / ` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._