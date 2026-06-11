"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import styles from "./header.module.css";

const NAV = [
  { id: "about", label: "Обо мне" },
  { id: "work", label: "Работы" },
  { id: "contact", label: "Контакты" },
] as const;

const HEADER_OFFSET = "top 72px";

function HeaderArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.ctaArrow}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <path
        d="M10.5 5.5L15 10L10.5 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // The header is always visible; it gains a solid background once the page
  // scrolls off the hero's decorative band so the labels stay legible.
  useEffect(() => {
    const hero = document.getElementById("about");
    if (!hero) {
      const raf = requestAnimationFrame(() => setScrolled(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-54px 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Track which section is centered in the viewport for the active nav state.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Close the drop-down menu on Escape; move focus to its first item on open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Delegate all in-header hash links through ScrollSmoother for a clean glide.
  const handleNavClick = (e: React.MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
      toggleRef.current?.focus();
    }
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, HEADER_OFFSET);
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      onClick={handleNavClick}
    >
      <div className={styles.inner}>
        <a className={styles.brand} href="#about" aria-label="В начало">
          <Image
            alt="Логотип"
            className={styles.brandLogo}
            height={58}
            priority
            src="/about/LogoTransparent.svg"
            width={40}
          />
        </a>

        <nav className={styles.nav} aria-label="Разделы">
          {NAV.map((item) => (
            <a
              key={item.id}
              aria-current={active === item.id ? "true" : undefined}
              className={`${styles.navLink} ${active === item.id ? styles.navLinkActive : ""}`}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.ctaLink} href="#contact">
          Обсудить проект
          <HeaderArrowIcon />
        </a>

        <button
          ref={toggleRef}
          aria-controls="site-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((open) => !open);
          }}
          type="button"
        >
          <span className={styles.burgerBox}>
            <span className={styles.burgerLine} />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
        id="site-menu"
        inert={!menuOpen}
      >
        <nav className={styles.menuNav} aria-label="Мобильная навигация">
          {NAV.map((item) => (
            <a
              key={item.id}
              aria-current={active === item.id ? "true" : undefined}
              className={`${styles.menuLink} ${active === item.id ? styles.menuLinkActive : ""}`}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.menuCtaLink} href="#contact">
          Обсудить проект
          <HeaderArrowIcon />
        </a>
      </div>
    </header>
  );
}
