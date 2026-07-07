/* ==========================================================================
   main.js — interaction + GSAP choreography for Formwork Studio.
   Motion is gated behind gsap.matchMedia(prefers-reduced-motion: no-preference)
   and always animates FROM a hidden state toward the page's visible default,
   so content is never hidden when JS or motion is unavailable.
   ========================================================================== */
(function () {
  "use strict";
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Nav: condense on scroll + mobile menu ---------- */
  const nav = document.getElementById("nav");
  const toggle = nav.querySelector(".nav__toggle");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  nav.querySelectorAll(".nav__links a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    })
  );

  /* ---------- Form stub ---------- */
  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector(".form__success");
      if (msg) msg.hidden = false;
      form.reset();
    });
  }

  /* ---------- Count-up helper ---------- */
  function countUp(el, opts) {
    const target = parseInt(el.dataset.count, 10);
    const obj = { v: 0 };
    el.textContent = "0";
    gsap.to(obj, Object.assign({
      v: target,
      duration: 1.4,
      ease: "power2.out",
      onUpdate() { el.textContent = Math.round(obj.v); },
    }, opts));
  }

  /* ---------- Motion (only when the user welcomes it) ---------- */
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    /* HERO load sequence */
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".nav__inner", { y: -24, autoAlpha: 0, duration: 0.8 })
      .from(".hero__title .line__in", { yPercent: 115, duration: 1.1, stagger: 0.12 }, 0.1)
      .fromTo(".hero__media",
        { clipPath: "inset(0 0 100% 0)", scale: 1.1 },
        { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.3 }, 0.2)
      .from(".hero__stats .stat", { y: 32, autoAlpha: 0, duration: 0.9, stagger: 0.15 }, 0.55)
      .from(".hero__explore", { scale: 0.6, autoAlpha: 0, duration: 0.8 }, 0.7);

    document.querySelectorAll(".hero__stats [data-count]").forEach((el, i) =>
      countUp(el, { delay: 0.6 + i * 0.15 })
    );

    /* WORKS */
    gsap.from(".works__bar > *", {
      y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.1,
      scrollTrigger: { trigger: ".works__bar", start: "top 88%" },
    });
    gsap.from(".works__title", {
      yPercent: 30, autoAlpha: 0, duration: 1,
      scrollTrigger: { trigger: ".works__title", start: "top 92%" },
    });
    gsap.utils.toArray(".work").forEach((row) => {
      gsap.from(row, {
        y: 44, autoAlpha: 0, duration: 0.9,
        scrollTrigger: { trigger: row, start: "top 88%" },
      });
      gsap.fromTo(row.querySelector(".media-img"),
        { yPercent: -8 }, { yPercent: 8, ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* MATERIAL SPECIFICATION */
    gsap.from(".spec__left > *", {
      y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.12,
      scrollTrigger: { trigger: ".spec__left", start: "top 85%" },
    });
    gsap.from(".spec__headline", {
      y: 30, autoAlpha: 0, duration: 0.9,
      scrollTrigger: { trigger: ".spec__headline", start: "top 88%" },
    });
    gsap.from(".spec__item", {
      x: -24, autoAlpha: 0, duration: 0.7, stagger: 0.08,
      scrollTrigger: { trigger: ".spec__legend", start: "top 88%" },
    });
    gsap.fromTo(".spec__drawing",
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: ".spec__drawing", start: "top 85%" } });
    document.querySelectorAll(".spec__left [data-count]").forEach((el) =>
      countUp(el, { scrollTrigger: { trigger: el, start: "top 88%", once: true } })
    );

    /* CONTACT */
    gsap.fromTo(".contact__diagram",
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: ".contact__diagram", start: "top 85%" } });
    gsap.from(".contact__headline", {
      y: 30, autoAlpha: 0, duration: 0.9,
      scrollTrigger: { trigger: ".contact__headline", start: "top 88%" },
    });
    gsap.from(".contact__lede .body-copy", {
      y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.12,
      scrollTrigger: { trigger: ".contact__lede", start: "top 88%" },
    });
    gsap.from([".form__legend", ".form__row", ".field--full", ".form__actions"], {
      y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.08,
      scrollTrigger: { trigger: ".form", start: "top 85%" },
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
