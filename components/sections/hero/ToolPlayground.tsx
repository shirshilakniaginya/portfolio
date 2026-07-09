"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap-setup";
import styles from "./tool-playground.module.css";

type Chip =
  | { id: string; kind: "tool"; label: string; icon: string }
  | { id: string; kind: "tag"; label: string }
  | { id: string; kind: "portrait" };

const chips: Chip[] = [
  { id: "portrait", kind: "portrait" },
  { id: "figma", kind: "tool", label: "Figma", icon: "/about/tools/figma.svg" },
  { id: "photoshop", kind: "tool", label: "Photoshop", icon: "/about/tools/photoshop.svg" },
  { id: "react", kind: "tool", label: "React", icon: "/about/tools/react.svg" },
  { id: "nextjs", kind: "tool", label: "Next.js", icon: "/about/tools/nextjs.svg" },
  { id: "wordpress", kind: "tool", label: "WordPress", icon: "/about/tools/wordpress.svg" },
  { id: "tilda", kind: "tool", label: "Tilda", icon: "/about/tools/tilda.svg" },
  { id: "claude", kind: "tool", label: "Claude", icon: "/about/tools/claude.svg" },
  { id: "codex", kind: "tool", label: "Codex", icon: "/about/tools/codex.svg" },
  { id: "html5", kind: "tool", label: "HTML5", icon: "/about/tools/html5.svg" },
  { id: "css3", kind: "tool", label: "CSS3", icon: "/about/tools/css3.svg" },
  { id: "tag-landing", kind: "tag", label: "Лендинги" },
  { id: "tag-motion", kind: "tag", label: "Анимации" },
  { id: "tag-system", kind: "tag", label: "Системный дизайн" },
  { id: "tag-code", kind: "tag", label: "Чистый код" },
  { id: "tag-mind", kind: "tag", label: "Осознанный подход" },
  { id: "tag-uxui", kind: "tag", label: "UX/UI" },
  { id: "tag-adaptive", kind: "tag", label: "Адаптив" },
];

// Smaller set for narrow stages so the ordered grid still fits
const compactChipIds = new Set([
  "portrait",
  "figma",
  "react",
  "nextjs",
  "wordpress",
  "tilda",
  "claude",
  "html5",
  "tag-landing",
  "tag-system",
  "tag-code",
  "tag-adaptive",
]);

const DROP_DELAY_MS = 650;
// Spawn stack tops out around y = -1500, ceiling must sit above it
const CEILING_Y = -1900;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ToolPlayground() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orderedRef = useRef(false);
  const toggleRef = useRef<(() => void) | null>(null);
  const [ordered, setOrdered] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 560px)");
  const hydrated = useHydrated();

  const activeChips = compact ? chips.filter((chip) => compactChipIds.has(chip.id)) : chips;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !hydrated || reduced) return;

    let disposed = false;
    let raf = 0;
    let running = false;
    let inView = true;
    let started = false;
    let startTimer = 0;
    const cleanups: (() => void)[] = [];

    (async () => {
      const mod = await import("matter-js");
      const Matter = (mod.default ?? mod) as typeof import("matter-js");
      if (disposed) return;

      const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Query, Sleeping } = Matter;

      const engine = Engine.create({ enableSleeping: true });
      engine.gravity.y = 1.3;

      const els = chipRefs.current.filter(Boolean) as HTMLDivElement[];
      const sizes = els.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));

      let stageW = stage.clientWidth;
      let stageH = stage.clientHeight;

      const WALL = 120;
      const floor = Bodies.rectangle(stageW / 2, stageH + WALL / 2, stageW + 800, WALL, { isStatic: true });
      const left = Bodies.rectangle(-WALL / 2, stageH / 2 - 400, WALL, stageH + 1600, { isStatic: true });
      const right = Bodies.rectangle(stageW + WALL / 2, stageH / 2 - 400, WALL, stageH + 1600, { isStatic: true });
      const ceiling = Bodies.rectangle(stageW / 2, CEILING_Y - WALL / 2, stageW + 800, WALL, { isStatic: true });

      const bodies = els.map((el, i) => {
        const { w, h } = sizes[i];
        const x = rand(w / 2 + 24, Math.max(w / 2 + 25, stageW - w / 2 - 24));
        const y = -(90 + i * 78) - h;
        const common = {
          restitution: 0.32,
          friction: 0.42,
          frictionAir: 0.014,
          density: 0.0022,
          angle: rand(-0.35, 0.35),
        };
        return activeChips[i].kind === "portrait"
          ? Bodies.circle(x, y, w / 2, common)
          : Bodies.rectangle(x, y, w, h, { ...common, chamfer: { radius: Math.min(h / 2, 26) } });
      });

      Composite.add(engine.world, [floor, left, right, ceiling]);

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      let mouseConstraint: Matter.MouseConstraint | null = null;

      if (finePointer) {
        const mouse = Mouse.create(stage);
        mouseConstraint = MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.2, damping: 0.12 },
        });
        // Keep page scroll + native touch behaviour: physics only owns plain mouse input
        const m = mouse as unknown as Record<string, EventListener>;
        mouse.element.removeEventListener("wheel", m.mousewheel);
        mouse.element.removeEventListener("mousewheel", m.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", m.mousewheel);
        mouse.element.removeEventListener("touchmove", m.mousemove);
        mouse.element.removeEventListener("touchstart", m.mousedown);
        mouse.element.removeEventListener("touchend", m.mouseup);
        Composite.add(engine.world, mouseConstraint);

        const onDown = () => stage.classList.add(styles.grabbing);
        const onUp = () => stage.classList.remove(styles.grabbing);
        stage.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        cleanups.push(() => {
          stage.removeEventListener("mousedown", onDown);
          window.removeEventListener("mouseup", onUp);
        });
      } else {
        // Coarse pointer: a tap tosses the chip instead of dragging
        const onPointerDown = (event: PointerEvent) => {
          if (orderedRef.current) return;
          const rect = stage.getBoundingClientRect();
          const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
          const hit = Query.point(bodies, point)[0];
          if (!hit) return;
          Sleeping.set(hit, false);
          Body.setVelocity(hit, { x: rand(-4, 4), y: rand(-10, -6) });
          Body.setAngularVelocity(hit, rand(-0.2, 0.2));
        };
        stage.addEventListener("pointerdown", onPointerDown);
        cleanups.push(() => stage.removeEventListener("pointerdown", onPointerDown));
      }

      const sync = () => {
        for (let i = 0; i < els.length; i += 1) {
          const body = bodies[i];
          const { w, h } = sizes[i];
          els[i].style.transform = `translate3d(${body.position.x - w / 2}px, ${
            body.position.y - h / 2
          }px, 0) rotate(${body.angle}rad)`;
        }
      };

      const tick = () => {
        Engine.update(engine, 1000 / 60);
        sync();
        raf = requestAnimationFrame(tick);
      };

      const play = () => {
        if (!running && started && inView && !document.hidden) {
          running = true;
          raf = requestAnimationFrame(tick);
        }
      };

      const pause = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      const start = () => {
        if (started || disposed) return;
        started = true;
        Composite.add(engine.world, bodies);
        for (const el of els) el.style.opacity = "1";
        play();
      };

      startTimer = window.setTimeout(start, DROP_DELAY_MS);

      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) play();
        else pause();
      });
      io.observe(stage);
      cleanups.push(() => io.disconnect());

      const onVisibility = () => {
        if (document.hidden) pause();
        else play();
      };
      document.addEventListener("visibilitychange", onVisibility);
      cleanups.push(() => document.removeEventListener("visibilitychange", onVisibility));

      const computeSlots = () => {
        const gap = 14;
        const pad = 26;
        const maxW = stageW - pad * 2;
        const rows: { indices: number[]; width: number; height: number }[] = [];
        let row: number[] = [];
        let rowW = 0;
        let rowH = 0;

        sizes.forEach((_, i) => {
          const { w, h } = sizes[i];
          const next = rowW === 0 ? w : rowW + gap + w;
          if (next > maxW && row.length > 0) {
            rows.push({ indices: row, width: rowW, height: rowH });
            row = [];
            rowW = 0;
            rowH = 0;
          }
          row.push(i);
          rowW = rowW === 0 ? w : rowW + gap + w;
          rowH = Math.max(rowH, h);
        });
        if (row.length > 0) rows.push({ indices: row, width: rowW, height: rowH });

        const totalH = rows.reduce((acc, r) => acc + r.height, 0) + gap * (rows.length - 1);
        let y = Math.max(pad, stageH - pad - totalH);
        const slots: { x: number; y: number }[] = new Array(sizes.length);

        for (const r of rows) {
          let x = (stageW - r.width) / 2;
          for (const i of r.indices) {
            const { w } = sizes[i];
            slots[i] = { x: x + w / 2, y: y + r.height / 2 };
            x += w + gap;
          }
          y += r.height + gap;
        }
        return slots;
      };

      const applyOrder = () => {
        const slots = computeSlots();
        if (mouseConstraint) Composite.remove(engine.world, mouseConstraint);
        bodies.forEach((body, i) => {
          Sleeping.set(body, false);
          Body.setStatic(body, true);
          const proxy = { x: body.position.x, y: body.position.y, angle: body.angle };
          gsap.to(proxy, {
            x: slots[i].x,
            y: slots[i].y,
            angle: 0,
            duration: 0.75,
            delay: i * 0.035,
            ease: "power3.inOut",
            overwrite: true,
            onUpdate: () => {
              Body.setPosition(body, { x: proxy.x, y: proxy.y });
              Body.setAngle(body, proxy.angle);
            },
          });
        });
      };

      const applyChaos = () => {
        bodies.forEach((body) => {
          gsap.killTweensOf(body);
          Body.setStatic(body, false);
          Sleeping.set(body, false);
          Body.setVelocity(body, { x: rand(-5, 5), y: rand(-9, -3) });
          Body.setAngularVelocity(body, rand(-0.22, 0.22));
        });
        if (mouseConstraint) Composite.add(engine.world, mouseConstraint);
      };

      toggleRef.current = () => {
        const next = !orderedRef.current;
        orderedRef.current = next;
        setOrdered(next);
        if (next) applyOrder();
        else applyChaos();
      };

      const ro = new ResizeObserver(() => {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (Math.abs(w - stageW) < 2 && Math.abs(h - stageH) < 2) return;
        stageW = w;
        stageH = h;
        Body.setPosition(floor, { x: stageW / 2, y: stageH + WALL / 2 });
        Body.setPosition(right, { x: stageW + WALL / 2, y: stageH / 2 - 400 });
        Body.setPosition(ceiling, { x: stageW / 2, y: CEILING_Y - WALL / 2 });
        bodies.forEach((body, i) => {
          const { w: bw } = sizes[i];
          const clampedX = Math.min(Math.max(body.position.x, bw / 2 + 4), stageW - bw / 2 - 4);
          const clampedY = Math.min(body.position.y, stageH - sizes[i].h / 2 - 2);
          Sleeping.set(body, false);
          Body.setPosition(body, { x: clampedX, y: clampedY });
        });
        if (orderedRef.current) applyOrder();
      });
      ro.observe(stage);
      cleanups.push(() => ro.disconnect());

      cleanups.push(() => {
        pause();
        window.clearTimeout(startTimer);
        bodies.forEach((body) => gsap.killTweensOf(body));
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        toggleRef.current = null;
      });
    })();

    return () => {
      disposed = true;
      window.clearTimeout(startTimer);
      for (const fn of cleanups.splice(0)) fn();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, reduced, compact]);

  return (
    <div
      className={`${styles.playground} ${reduced ? styles.reduced : ""}`}
      aria-label="Инструменты и подход — интерактивная сцена"
    >
      <div className={styles.controls}>
        <span className={styles.controlLabel}>Стек и подход</span>
        <button
          type="button"
          className={styles.orderButton}
          onClick={() => toggleRef.current?.()}
          disabled={reduced}
        >
          <span className={styles.orderDot} aria-hidden="true" />
          {ordered ? "Вернуть хаос" : "Навести порядок"}
        </button>
      </div>

      <div ref={stageRef} className={styles.stage} aria-hidden="true">
        {activeChips.map((chip, i) => (
          <div
            key={chip.id}
            ref={(node) => {
              chipRefs.current[i] = node;
            }}
            className={`${styles.chip} ${
              chip.kind === "tag" ? styles.chipTag : chip.kind === "portrait" ? styles.chipPortrait : ""
            }`}
          >
            {chip.kind === "portrait" ? (
              <Image
                src="/about/portraitnobg-512.webp"
                alt=""
                className={styles.portraitPhoto}
                width={220}
                height={220}
                priority
              />
            ) : chip.kind === "tool" ? (
              <>
                <Image src={chip.icon} alt="" className={styles.chipIcon} width={36} height={36} />
                <span>{chip.label}</span>
              </>
            ) : (
              <span>{chip.label}</span>
            )}
          </div>
        ))}
      </div>

      <p className={styles.hint}>
        <span className={styles.hintFine}>Тяни и бросай — физика настоящая</span>
        <span className={styles.hintCoarse}>Тапни по фишке — физика настоящая</span>
      </p>
    </div>
  );
}
