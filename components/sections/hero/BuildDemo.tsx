"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap-setup";
import styles from "./build-demo.module.css";

type CodeToken = { t: string; c?: "sel" | "prop" | "val" };
type CodeLine = CodeToken[];

// Each fragment types out on the left, then its element lands on the right:
// grid → heading → lede → CTA.
const codeFragments: { id: string; lines: CodeLine[] }[] = [
  {
    id: "page",
    lines: [
      [{ t: ".page", c: "sel" }, { t: " {" }],
      [
        { t: "  " },
        { t: "grid", c: "prop" },
        { t: ": " },
        { t: "auto / repeat(4, 1fr)", c: "val" },
        { t: ";" },
      ],
      [{ t: "}" }],
    ],
  },
  {
    id: "hero",
    lines: [
      [{ t: ".hero", c: "sel" }, { t: " {" }],
      [
        { t: "  " },
        { t: "font", c: "prop" },
        { t: ": " },
        { t: '500 64px "Hikasami"', c: "val" },
        { t: ";" },
      ],
      [{ t: "  " }, { t: "color", c: "prop" }, { t: ": " }, { t: "#F1EEE8", c: "val" }, { t: ";" }],
      [{ t: "}" }],
    ],
  },
  {
    id: "lede",
    lines: [
      [{ t: ".lede", c: "sel" }, { t: " {" }],
      [{ t: "  " }, { t: "color", c: "prop" }, { t: ": " }, { t: "#AAA39A", c: "val" }, { t: ";" }],
      [
        { t: "  " },
        { t: "max-width", c: "prop" },
        { t: ": " },
        { t: "30ch", c: "val" },
        { t: ";" },
      ],
      [{ t: "}" }],
    ],
  },
  {
    id: "cta",
    lines: [
      [{ t: ".cta", c: "sel" }, { t: " {" }],
      [
        { t: "  " },
        { t: "background", c: "prop" },
        { t: ": " },
        { t: "#9B87E5", c: "val" },
        { t: ";" },
      ],
      [
        { t: "  " },
        { t: "padding", c: "prop" },
        { t: ": " },
        { t: "16px 40px", c: "val" },
        { t: ";" },
      ],
      [{ t: "}" }],
    ],
  },
];

const tokenClass: Record<NonNullable<CodeToken["c"]>, string> = {
  sel: styles.lineSelector,
  prop: styles.lineProperty,
  val: styles.lineValue,
};

type BuildDemoProps = {
  playing: boolean;
};

export function BuildDemo({ playing }: BuildDemoProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const blocks = gsap.utils.toArray<HTMLElement>("[data-code-block]", root);
    const gridLines = gsap.utils.toArray<HTMLElement>("[data-prev-gridline]", root);
    const heading = root.querySelector<HTMLElement>("[data-prev-heading]");
    const lede = root.querySelector<HTMLElement>("[data-prev-lede]");
    const button = root.querySelector<HTMLElement>("[data-prev-button]");
    const deploy = root.querySelector<HTMLElement>("[data-prev-deploy]");

    if (blocks.length !== 4 || !heading || !lede || !button || !deploy) {
      return;
    }

    const splits = blocks.map((block) => new SplitText(block, { type: "chars" }));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, repeat: -1 });

      // Reset state: empty editor, empty preview
      splits.forEach((split) => tl.set(split.chars, { opacity: 0 }, 0));
      tl.set(blocks, { opacity: 0.45 }, 0);
      tl.set(gridLines, { scaleY: 0, opacity: 0, transformOrigin: "50% 0%" }, 0);
      tl.set(heading, { opacity: 0, y: 10 }, 0);
      tl.set(lede, { opacity: 0, y: 8 }, 0);
      tl.set(button, { opacity: 0, y: 8 }, 0);
      tl.set(deploy, { opacity: 0, y: 6 }, 0);

      // code → render loop: type a fragment, its element appears
      const reveals = [
        (at: number) => {
          tl.to(
            gridLines,
            { scaleY: 1, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08 },
            at,
          );
        },
        (at: number) => {
          tl.to(heading, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, at);
        },
        (at: number) => {
          tl.to(lede, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, at);
        },
        (at: number) => {
          tl.to(button, { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" }, at);
        },
      ];

      let cursor = 0.35;
      splits.forEach((split, index) => {
        tl.to(blocks[index], { opacity: 1, duration: 0.25, ease: "none" }, cursor);
        if (index > 0) {
          tl.to(blocks[index - 1], { opacity: 0.45, duration: 0.4, ease: "none" }, cursor);
        }
        tl.to(split.chars, { opacity: 1, duration: 0.01, stagger: 0.014, ease: "none" }, cursor);

        const typeEnd = cursor + split.chars.length * 0.014;
        reveals[index](typeEnd + 0.15);
        cursor = typeEnd + 0.85;
      });

      // Deploy confirmation once the page is assembled
      tl.to(deploy, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, cursor - 0.2);

      // Hold, then dissolve and restart
      const holdEnd = cursor + 2.2;
      tl.to(
        [...splits.flatMap((split) => split.chars), ...gridLines, heading, lede, button, deploy],
        { opacity: 0, duration: 0.45, ease: "power2.inOut" },
        holdEnd,
      );
      tl.to({}, { duration: 0.25 }, holdEnd + 0.45);

      timelineRef.current = tl;
    }, root);

    return () => {
      timelineRef.current = null;
      ctx.revert();
      splits.forEach((split) => split.revert());
    };
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) {
      return;
    }

    if (playing) {
      tl.play();
    } else {
      tl.pause();
    }
  }, [playing]);

  return (
    <div ref={rootRef} className={styles.demo}>
      <div className={styles.browser}>
        <div className={styles.browserBar}>
          <span className={styles.browserDots} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className={styles.browserUrl}>portfolio.local</span>
          <span className={styles.browserTab}>hero.css</span>
        </div>

        <div className={styles.workspace}>
          <div className={styles.editor} aria-label="Код стилей, который печатается">
            {codeFragments.map((fragment, index) => (
              <pre className={styles.code} data-code-block={index} key={fragment.id}>
                {fragment.lines.map((line, lineIndex) => (
                  <span className={styles.codeLine} key={lineIndex}>
                    {line.map((token, tokenIndex) =>
                      token.c ? (
                        <span className={tokenClass[token.c]} key={tokenIndex}>
                          {token.t}
                        </span>
                      ) : (
                        <span className={styles.linePunct} key={tokenIndex}>
                          {token.t}
                        </span>
                      ),
                    )}
                  </span>
                ))}
              </pre>
            ))}
          </div>

          <div className={styles.preview} aria-label="Страница, собирающаяся из кода">
            <div className={styles.previewGrid} aria-hidden="true">
              <span data-prev-gridline />
              <span data-prev-gridline />
              <span data-prev-gridline />
            </div>
            <div className={styles.previewContent}>
              <div className={styles.previewHeading} data-prev-heading>
                Чистая
                <br />
                структура.
              </div>
              <p className={styles.previewLede} data-prev-lede>
                Сетка, типографика и ритм.
              </p>
              <span className={styles.previewButton} data-prev-button>
                Обсудить проект
              </span>
            </div>
          </div>
        </div>

        <div className={styles.statusBar}>
          <span className={styles.statusBuild}>build</span>
          <span className={styles.statusDeploy} data-prev-deploy>
            <span className={styles.statusCheck} aria-hidden="true">
              ✓
            </span>
            deployed · 142ms
          </span>
        </div>
      </div>
    </div>
  );
}
