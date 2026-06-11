import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase, SplitText, DrawSVGPlugin);

CustomEase.create("editorialOut", "M0,0 C0.16,1 0.3,1 1,1");
CustomEase.create("editorialSoft", "M0,0 C0.22,0.61 0.36,1 1,1");

// MorphSVG stays out of the runtime bundle for now.
// Introduce it only for real path-to-path transitions such as:
// - logo mark morph
// - check icon to arrow
// - abstract mark transitions
// - section symbol transitions
export { gsap, SplitText };
