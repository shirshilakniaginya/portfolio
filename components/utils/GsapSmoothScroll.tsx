"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function GsapSmoothScroll() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    if (reduceMotion || mobile) return;

    // Allow Ctrl+wheel browser zoom — intercept before GSAP's normalizeScroll takes it
    const allowCtrlZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.stopImmediatePropagation();
    };
    window.addEventListener("wheel", allowCtrlZoom, { capture: true, passive: true });

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.25,
      effects: false,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });

    // --- Custom Scrollbar Logic ---
    let thumbRaf = 0;
    let refreshTimer = 0;

    const updateThumbHeight = () => {
      if (!thumbRef.current) return;
      if (thumbRaf) window.cancelAnimationFrame(thumbRaf);
      thumbRaf = window.requestAnimationFrame(() => {
        if (!thumbRef.current) return;
        const vh = window.innerHeight;
        const sh = document.documentElement.scrollHeight;
        // Proportional height, min 30px, minus 8px for margins
        const height = Math.max(30, (vh / sh) * vh - 8);
        gsap.set(thumbRef.current, { height });
      });

      // Body resize can fire repeatedly while images/fonts settle on reload.
      // Debounce the expensive global ScrollTrigger recalculation.
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    };

    updateThumbHeight();
    window.addEventListener("resize", updateThumbHeight);
    window.addEventListener("load", updateThumbHeight, { once: true });

    const observer = new ResizeObserver(updateThumbHeight);
    observer.observe(document.body);

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      animation: gsap.fromTo(
        thumbRef.current,
        { y: 0 },
        {
          y: () => window.innerHeight - (thumbRef.current?.offsetHeight || 0) - 8,
          ease: "none",
        }
      ),
      scrub: true,
    });

    return () => {
      window.removeEventListener("wheel", allowCtrlZoom, { capture: true });
      observer.disconnect();
      window.removeEventListener("resize", updateThumbHeight);
      window.removeEventListener("load", updateThumbHeight);
      window.cancelAnimationFrame(thumbRaf);
      window.clearTimeout(refreshTimer);
      st.kill();
      smoother.kill();
    };
  }, []);

  return (
    <div className="custom-scrollbar-track">
      <div className="custom-scrollbar-thumb" ref={thumbRef} />
    </div>
  );
}
