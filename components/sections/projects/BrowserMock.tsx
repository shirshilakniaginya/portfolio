import Image from "next/image";
import styles from "./mock.module.css";

type BrowserMockProps = {
  brand?: string;
  imageSrc: string;
  imageAlt: string;
};

export function BrowserMock({
  brand = "Project",
  imageSrc,
  imageAlt,
}: BrowserMockProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.preview}>
        <Image
          className={styles.previewImage}
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1000px) 100vw, 48vw"
        />
        <div className={styles.previewShade} aria-hidden="true" />
        <div className={styles.previewCaption}>
          <span>{brand}</span>
          <span>Смотреть работу ↗</span>
        </div>
      </div>
    </div>
  );
}
