import Link from "next/link";
import styles from "./flip-button.module.css";

type Tone = "dark" | "light" | "primary";

type BaseProps = {
  label: string;
  tone?: Tone;
  className?: string;
};

type LinkButtonProps = BaseProps & {
  href: string;
};

type AnchorButtonProps = BaseProps & {
  href: string;
  rel?: string;
  target?: string;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function toneClass(tone: Tone) {
  if (tone === "light") {
    return styles.light;
  }

  if (tone === "primary") {
    return styles.primary;
  }

  return styles.dark;
}

export function FlipLinkButton({ href, label, tone = "dark", className }: LinkButtonProps) {
  return (
    <Link className={cx(styles.button, toneClass(tone), className)} href={href}>
      <span className={cx(styles.face, styles.faceFront)}>{label}</span>
      <span className={cx(styles.face, styles.faceBack)}>{label}</span>
    </Link>
  );
}

export function FlipAnchorButton({ href, label, tone = "dark", className, rel, target }: AnchorButtonProps) {
  return (
    <a className={cx(styles.button, toneClass(tone), className)} href={href} rel={rel} target={target}>
      <span className={cx(styles.face, styles.faceFront)}>{label}</span>
      <span className={cx(styles.face, styles.faceBack)}>{label}</span>
    </a>
  );
}
