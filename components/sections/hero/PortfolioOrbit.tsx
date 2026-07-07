"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./portfolio-orbit.module.css";

type AvatarNode = {
  label: string;
  mark: string;
  icon?: string;
  image?: string;
  orbit: 1 | 2 | 3 | 4;
  angle: number;
  size: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "squircle";
  tone: "violet" | "amber" | "blue" | "pink" | "neutral";
  delay: string;
};

const avatarNodes: AvatarNode[] = [
  {
    label: "WordPress",
    mark: "WP",
    icon: "/about/tools/wordpress.svg",
    orbit: 1,
    angle: 270,
    size: "md",
    shape: "circle",
    tone: "neutral",
    delay: "0.6s",
  },
  {
    label: "Claude",
    mark: "C",
    icon: "/about/tools/claude.svg",
    orbit: 2,
    angle: 58,
    size: "lg",
    shape: "circle",
    tone: "amber",
    delay: "0.85s",
  },
  {
    label: "Figma",
    mark: "F",
    icon: "/about/tools/figma.svg",
    orbit: 2,
    angle: 180,
    size: "lg",
    shape: "squircle",
    tone: "pink",
    delay: "1.05s",
  },
  {
    label: "Codex",
    mark: ">_",
    icon: "/about/tools/codex.svg",
    orbit: 2,
    angle: 300,
    size: "md",
    shape: "squircle",
    tone: "blue",
    delay: "1.25s",
  },
  {
    label: "React",
    mark: "R",
    icon: "/about/tools/react.svg",
    orbit: 3,
    angle: 130,
    size: "lg",
    shape: "circle",
    tone: "blue",
    delay: "1.45s",
  },
  {
    label: "Next.js",
    mark: "Next",
    icon: "/about/tools/nextjs.svg",
    orbit: 4,
    angle: 30,
    size: "md",
    shape: "circle",
    tone: "neutral",
    delay: "1.65s",
  },
  {
    label: "Photoshop",
    mark: "Ps",
    icon: "/about/tools/photoshop.svg",
    orbit: 3,
    angle: 248,
    size: "md",
    shape: "squircle",
    tone: "blue",
    delay: "1.85s",
  },
  {
    label: "Tilda",
    mark: "T",
    icon: "/about/tools/tilda.svg",
    orbit: 4,
    angle: 220,
    size: "md",
    shape: "circle",
    tone: "neutral",
    delay: "2.05s",
  },
];

const orbitConfig = {
  1: { className: styles.orbitOne, spin: styles.spinLeft, spinDir: "left", radius: "var(--orbit-1-radius)" },
  2: { className: styles.orbitTwo, spin: styles.spinRight, spinDir: "right", radius: "var(--orbit-2-radius)" },
  3: { className: styles.orbitThree, spin: styles.spinRight, spinDir: "right", radius: "var(--orbit-3-radius)" },
  4: { className: styles.orbitFour, spin: styles.spinLeft, spinDir: "left", radius: "var(--orbit-4-radius)" },
} satisfies Record<
  AvatarNode["orbit"],
  { className: string; spin: string; spinDir: "left" | "right"; radius: string }
>;

function nodeStyle(node: AvatarNode) {
  return {
    "--avatar-angle": `${node.angle}deg`,
    "--avatar-radius": orbitConfig[node.orbit].radius,
    "--avatar-delay": node.delay,
  } as CSSProperties;
}

function renderAvatar(node: AvatarNode) {
  if (node.image) {
    return (
      <Image
        src={node.image}
        alt=""
        className={styles.avatarPhoto}
        data-avatar-photo
        width={96}
        height={96}
      />
    );
  }

  if (node.icon) {
    return (
      <Image
        src={node.icon}
        alt=""
        className={styles.avatarIcon}
        data-avatar-icon
        width={96}
        height={96}
      />
    );
  }

  return (
    <span className={styles.avatarMark} data-avatar-mark>
      {node.mark}
    </span>
  );
}

export function PortfolioOrbit() {
  return (
    <div className={styles.visual} data-portfolio-orbit aria-label="Portfolio orbit visualization">
      {([4, 3, 2, 1] as const).map((orbit) => {
        const config = orbitConfig[orbit];
        const nodes = avatarNodes.filter((node) => node.orbit === orbit);

        return (
          <div
            className={`${styles.orbit} ${config.className} ${config.spin}`}
            data-portfolio-orbit-layer
            data-orbit={orbit}
            data-spin={config.spinDir}
            key={orbit}
          >
            <div className={styles.orbitBorder} data-orbit-border aria-hidden="true" />

            {nodes.map((node) => (
              <div className={styles.avatarSlot} data-avatar-slot style={nodeStyle(node)} key={node.label}>
                <div className={styles.upright} data-upright>
                  <div
                    className={`${styles.avatar} ${styles[node.size]} ${styles[node.tone]} ${
                      node.shape === "squircle" ? styles.squircle : styles.circle
                    }`}
                    data-avatar
                    data-size={node.size}
                    data-tone={node.tone}
                    data-shape={node.shape === "squircle" ? "squircle" : "circle"}
                  >
                    {renderAvatar(node)}
                  </div>
                  <span className={styles.avatarLabel} data-avatar-label>
                    {node.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <div className={styles.centerPortrait} data-center-portrait>
        <Image src="/about/portraitnobg-512.webp" alt="" data-center-photo width={512} height={512} priority />
      </div>
    </div>
  );
}
