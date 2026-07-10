const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const reviewsTrack = document.querySelector("[data-reviews-track]");
const reviewsPrev = document.querySelector("[data-reviews-prev]");
const reviewsNext = document.querySelector("[data-reviews-next]");
const factsTrack = document.querySelector("[data-facts-track]");
const factsPrev = document.querySelector("[data-facts-prev]");
const factsNext = document.querySelector("[data-facts-next]");
const leadForm = document.querySelector("[data-lead-form]");
const leadStatus = document.querySelector("[data-lead-status]");

if (header) {
  const syncHeader = () => {
    header.classList.toggle("is-condensed", window.scrollY > 24);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.innerHTML = isOpen
      ? '<svg width="24" height="24" aria-hidden="true"><use href="#icon-close"></use></svg><span class="sr-only">Закрыть меню</span>'
      : '<svg width="24" height="24" aria-hidden="true"><use href="#icon-menu"></use></svg><span class="sr-only">Открыть меню</span>';
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.innerHTML =
        '<svg width="24" height="24" aria-hidden="true"><use href="#icon-menu"></use></svg><span class="sr-only">Открыть меню</span>';
    });
  });
}

if (reviewsTrack && reviewsPrev && reviewsNext) {
  const getStep = () => reviewsTrack.clientWidth / (window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3);

  reviewsPrev.addEventListener("click", () => {
    reviewsTrack.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  reviewsNext.addEventListener("click", () => {
    reviewsTrack.scrollBy({ left: getStep(), behavior: "smooth" });
  });
}

if (factsTrack && factsPrev && factsNext) {
  factsPrev.addEventListener("click", () => {
    factsTrack.scrollBy({ left: -factsTrack.clientWidth, behavior: "smooth" });
  });

  factsNext.addEventListener("click", () => {
    factsTrack.scrollBy({ left: factsTrack.clientWidth, behavior: "smooth" });
  });
}

if (leadForm && leadStatus) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    leadStatus.textContent = "Спасибо! Мы получили заявку и свяжемся с вами, чтобы уточнить детали.";
    leadForm.reset();
  });
}

const initMotion = () => {
  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("has-gsap");

  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTimeline
      .from(".site-header__bar", { y: -18, autoAlpha: 0, duration: 0.6 })
      .from(".hero-media", { scale: 0.985, autoAlpha: 0, duration: 0.9 }, 0.08)
      .from(".hero-copy > *", { y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.18)
      .from(".hero-rail", { x: 32, autoAlpha: 0, duration: 0.75 }, 0.16);

    const revealGroups = [
      [".facts-section", ".facts-section .section-heading, .facts-section .fact-card"],
      [".programs-section", ".programs-copy > *, .programs-list li"],
      [".doctor-section", ".doctor-card__media, .doctor-card__content > *"],
      [".spaces-section", ".spaces-copy > *, .spaces-gallery > *"],
      [".pricing-section", ".pricing-section .section-heading > *, .price-card, .section-note"],
      [".reviews-section", ".reviews-section .section-heading, .review-card"],
      [".cta-section", ".cta-card__media, .cta-card__copy > *"],
      [".site-footer", ".footer-grid > *, .footer-bottom"],
    ];

    revealGroups.forEach(([trigger, selector]) => {
      const targets = gsap.utils.toArray(selector);

      if (!targets.length) {
        return;
      }

      gsap.from(targets, {
        y: 34,
        autoAlpha: 0,
        duration: 0.72,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      heroTimeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });

  media.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
    const cards = gsap.utils.toArray(".fact-card, .price-card, .review-card");
    const cleanups = [];

    cards.forEach((card) => {
      const mediaTarget = card.querySelector(".fact-card__media");
      const arrow = card.querySelector(".fact-card__price svg, .price-card__meta svg");
      const isReviewCard = card.classList.contains("review-card");
      const restShadow = "0 8px 22px rgba(51, 37, 26, 0.045)";

      gsap.set(card, { boxShadow: restShadow });

      const handleEnter = () => {
        if (isReviewCard) {
          gsap.set(card, { zIndex: 2 });
        }

        gsap.to(card, {
          y: -8,
          boxShadow: "0 22px 45px rgba(51, 37, 26, 0.14)",
          duration: 0.38,
          ease: "power3.out",
          overwrite: "auto",
        });

        if (mediaTarget) {
          gsap.to(mediaTarget, { scale: 1.025, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }

        if (arrow) {
          gsap.to(arrow, { x: 5, duration: 0.3, ease: "power3.out", overwrite: "auto" });
        }
      };

      const handleLeave = () => {
        gsap.to(card, {
          y: 0,
          boxShadow: restShadow,
          duration: 0.48,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            if (isReviewCard && !card.matches(":hover")) {
              gsap.set(card, { zIndex: 0 });
            }
          },
        });

        if (mediaTarget) {
          gsap.to(mediaTarget, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }

        if (arrow) {
          gsap.to(arrow, { x: 0, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        }
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
};

initMotion();
