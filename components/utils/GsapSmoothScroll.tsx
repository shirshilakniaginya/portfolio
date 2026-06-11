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
    if (reduceMotion) return;

    // Allow Ctrl+wheel browser zoom — intercept before GSAP's normalizeScroll takes it
    const allowCtrlZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.stopImmediatePropagation();
    };
    window.addEventListener("wheel", allowCtrlZoom, { capture: true, passive: true });

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    // --- Custom Scrollbar Logic ---
    const updateThumbHeight = () => {
      if (!thumbRef.current) return;
      const vh = window.innerHeight;
      const sh = document.documentElement.scrollHeight;
      // Proportional height, min 30px, minus 8px for margins
      const height = Math.max(30, (vh / sh) * vh - 8);
      gsap.set(thumbRef.current, { height });
      
      // Refresh ScrollTrigger to recalculate max scroll distances
      ScrollTrigger.refresh();
    };

    updateThumbHeight();
    window.addEventListener("resize", updateThumbHeight);

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
