# Graph Report - .  (2026-06-11)

## Corpus Check
- Corpus is ~11,973 words - fits in a single context window. You may not need a graph.

## Summary
- 248 nodes · 257 edges · 22 communities (17 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Hero Demo Animations|Hero Demo Animations]]
- [[_COMMUNITY_Design Principles & System|Design Principles & System]]
- [[_COMMUNITY_shadcn Components Config|shadcn Components Config]]
- [[_COMMUNITY_Theme Tokens & Roles|Theme Tokens & Roles]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Page Sections & Contact|Page Sections & Contact]]
- [[_COMMUNITY_Layout, Fonts & Header|Layout, Fonts & Header]]
- [[_COMMUNITY_DESIGN.json Tokens|DESIGN.json Tokens]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Silk Shader Background|Silk Shader Background]]
- [[_COMMUNITY_Motion Helpers|Motion Helpers]]
- [[_COMMUNITY_System Card Visual|System Card Visual]]
- [[_COMMUNITY_Silk WebGL Plane|Silk WebGL Plane]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Design Tokens Module|Design Tokens Module]]
- [[_COMMUNITY_Next Config|Next Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Design System: Portfolio Site` - 7 edges
3. `colorMeta` - 6 edges
4. `tailwind` - 6 edges
5. `aliases` - 6 edges
6. `Product Purpose` - 6 edges
7. `extensions` - 5 edges
8. `cn()` - 5 edges
9. `scripts` - 5 edges
10. `Structured Editorial Grid (Creative North Star)` - 5 edges

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

## Hyperedges (group relationships)
- **Structure-First Design Philosophy** — design_structured_editorial_grid, product_websites_as_systems, agents_clean_presentation_over_decoration, design_visible_structure_rule [INFERRED 0.80]
- **Restraint Guardrails Against Decoration** — product_anti_references, design_rare_accent_rule, design_flat_by_default_rule, design_purposeful_motion [INFERRED 0.75]

## Communities (22 total, 5 thin omitted)

### Community 0 - "Hero Demo Animations"
Cohesion: 0.06
Nodes (27): AboutDemo(), AboutDemoProps, StageRow, stageRows, BuildDemo(), BuildDemoProps, codeFragments, CodeLine (+19 more)

### Community 1 - "Design Principles & System"
Cohesion: 0.11
Nodes (24): Clean Presentation Over Decorative Complexity, Preserve Author's Voice and Visual Identity, Project Rules, Color Tokens / Palette, Elevation / Flat Planar System, The Flat By Default Rule, Hard Corners / Non-Cardified Surfaces, Design System: Portfolio Site (+16 more)

### Community 2 - "shadcn Components Config"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 3 - "Theme Tokens & Roles"
Cohesion: 0.10
Nodes (21): canonical, displayName, role, canonical, displayName, role, canonical, displayName (+13 more)

### Community 4 - "Dev Dependencies"
Cohesion: 0.10
Nodes (19): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+11 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Page Sections & Contact"
Cohesion: 0.13
Nodes (8): Contact(), Status, Footer(), Hero(), hoverTransition, WorkCard, workCards, WorkGallery()

### Community 7 - "Layout, Fonts & Header"
Cohesion: 0.18
Nodes (11): geist, hikasami, manrope, metadata, RootLayout(), NAV, SiteHeader(), cn() (+3 more)

### Community 8 - "DESIGN.json Tokens"
Cohesion: 0.14
Nodes (13): do, dont, extensions, doDont, motion, northStar, generatedAt, defaultEase (+5 more)

### Community 9 - "Runtime Dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @base-ui/react, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, lucide-react (+6 more)

### Community 10 - "Silk Shader Background"
Cohesion: 0.40
Nodes (3): createProgram(), createShader(), SilkBackgroundProps

### Community 11 - "Motion Helpers"
Cohesion: 0.33
Nodes (3): easeOutExpo, easeOutQuint, revealViewport

### Community 12 - "System Card Visual"
Cohesion: 0.40
Nodes (3): colors, spacing, typeScale

## Knowledge Gaps
- **134 isolated node(s):** `schemaVersion`, `generatedAt`, `title`, `name`, `summary` (+129 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `colorMeta` connect `Theme Tokens & Roles` to `DESIGN.json Tokens`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Dev Dependencies`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `extensions` connect `DESIGN.json Tokens` to `Theme Tokens & Roles`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Design System: Portfolio Site` (e.g. with `Anti-references` and `Brand Personality (Adult, Precise, Editorial)`) actually correct?**
  _`Design System: Portfolio Site` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `schemaVersion`, `generatedAt`, `title` to the rest of the system?**
  _137 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Hero Demo Animations` be split into smaller, more focused modules?**
  _Cohesion score 0.059233449477351915 - nodes in this community are weakly interconnected._
- **Should `Design Principles & System` be split into smaller, more focused modules?**
  _Cohesion score 0.10507246376811594 - nodes in this community are weakly interconnected._