# NOXA landing page

Static HTML/CSS/WebGL build based on the generated editorial sci-fi landing reference.

Files:
- index.html - page markup and loader boot sequence
- css/styles.css - all styles and fixed background layering
- js/smoke-bg.js - bake-to-texture WebGL smoke background
- js/main.js - interaction layer
- assets/ - cropped visual assets and grain texture

## Smoke background recipe

This case now uses the optimized NOXA background architecture:
- fullscreen fixed canvas as the real background layer
- preserveDrawingBuffer false
- DPR capped to 1
- fbm reduced to 5 iterations
- smoke reduced to 2 layers
- scroll factor 0.16
- heavy procedural pass baked once into an offscreen texture
- cheap display pass on scroll and resize with one texture sample plus dither
- rebake only when width changes, the page grows beyond baked height, or page height changes materially

Why this is faster:
- the old version re-ran the full procedural smoke shader on every scroll event
- the new version precomputes the page-space smoke once and only shifts UVs during scroll
- this removes the main mobile scroll bottleneck while keeping the same visual language

Related implementation details:
- body fallback background matches the shader base color to avoid a flash before first paint
- the smoke texture is baked at 0.5x resolution because the effect is soft and upscales cleanly
- dither stays in the display pass so grain is not blurred by the baked texture upscale

Open index.html in a browser or upload the whole folder to any static hosting.
