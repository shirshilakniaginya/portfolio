# Graph Report - .  (2026-07-08)

## Corpus Check
- 26 files · ~19,601 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 230 nodes · 246 edges · 22 communities (17 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

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
- [[_COMMUNITY_design-system.ts  designTokens|design-system.ts / designTokens]]
- [[_COMMUNITY_postcss.config.mjs  config|postcss.config.mjs / config]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Design System: Portfolio Site` - 7 edges
3. `colorMeta` - 6 edges
4. `tailwind` - 6 edges
5. `aliases` - 6 edges
6. `Product Purpose` - 6 edges
7. `extensions` - 5 edges
8. `role` - 5 edges
9. `displayName` - 5 edges
10. `canonical` - 5 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `Preserve Author's Voice and Visual Identity` --conceptually_related_to--> `Brand Personality (Adult, Precise, Editorial)`  [INFERRED]
  AGENTS.md → PRODUCT.md
- `Clean Presentation Over Decorative Complexity` --conceptually_related_to--> `The Visible Structure Rule`  [INFERRED]
  AGENTS.md → DESIGN.md
- `Design System: Portfolio Site` --conceptually_related_to--> `Anti-references`  [INFERRED]
  DESIGN.md → PRODUCT.md
- `Design System: Portfolio Site` --conceptually_related_to--> `Brand Personality (Adult, Precise, Editorial)`  [INFERRED]
  DESIGN.md → PRODUCT.md

## Import Cycles
- None detected.

## Communities (22 total, 5 thin omitted)

### Community 0 - "AboutDemo.tsx / AboutDemo()"
Cohesion: 0.06
Nodes (24): AboutDemo(), AboutDemoProps, StageRow, stageRows, BuildDemoProps, codeFragments, CodeLine, CodeToken (+16 more)

### Community 1 - "Clean Presentation Over Decorative Complexity / "
Cohesion: 0.11
Nodes (24): Clean Presentation Over Decorative Complexity, Preserve Author's Voice and Visual Identity, Project Rules, Color Tokens / Palette, Elevation / Flat Planar System, The Flat By Default Rule, Hard Corners / Non-Cardified Surfaces, Design System: Portfolio Site (+16 more)

### Community 2 - "components.json / aliases"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 3 - "DESIGN.json / accent-green"
Cohesion: 0.13
Nodes (22): accent-green, accent-violet, background, surface, surface-soft, do, dont, extensions (+14 more)

### Community 4 - "tsconfig.json / compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 5 - "page.tsx / Home()"
Cohesion: 0.12
Nodes (8): Contact(), Fields, Status, Footer(), hoverTransition, WorkCard, workCards, WorkGallery()

### Community 6 - "eslint.config.mjs / package.json"
Cohesion: 0.11
Nodes (17): devDependencies, eslint, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, typescript, name (+9 more)

### Community 7 - "layout.tsx / geist"
Cohesion: 0.17
Nodes (10): geist, hikasami, manrope, metadata, RootLayout(), NAV, SiteHeader(), cn() (+2 more)

### Community 8 - "dependencies / @base-ui/react"
Cohesion: 0.13
Nodes (15): dependencies, @base-ui/react, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hcaptcha/react-hcaptcha (+7 more)

### Community 9 - "motion.ts / createCascadeTransition()"
Cohesion: 0.33
Nodes (3): easeOutExpo, easeOutQuint, revealViewport

### Community 12 - "SystemCard.tsx / colors"
Cohesion: 0.50
Nodes (3): colors, spacing, typeScale

## Knowledge Gaps
- **116 isolated node(s):** `schemaVersion`, `generatedAt`, `title`, `name`, `summary` (+111 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies / @base-ui/react` to `eslint.config.mjs / package.json`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Design System: Portfolio Site` (e.g. with `Anti-references` and `Brand Personality (Adult, Precise, Editorial)`) actually correct?**
  _`Design System: Portfolio Site` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `schemaVersion`, `generatedAt`, `title` to the rest of the system?**
  _119 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AboutDemo.tsx / AboutDemo()` be split into smaller, more focused modules?**
  _Cohesion score 0.06258890469416785 - nodes in this community are weakly interconnected._
- **Should `Clean Presentation Over Decorative Complexity / ` be split into smaller, more focused modules?**
  _Cohesion score 0.10507246376811594 - nodes in this community are weakly interconnected._
- **Should `components.json / aliases` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `DESIGN.json / accent-green` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._