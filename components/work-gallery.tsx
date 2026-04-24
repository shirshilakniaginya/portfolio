import Image from "next/image";
import { works } from "@/lib/portfolio-content";

const previewImages = [
  "/work-gallery/editorial-01.webp",
  "/work-gallery/editorial-02.webp",
  "/work-gallery/editorial-03.avif",
  "/work-gallery/editorial-01.webp",
] as const;

const galleryCases = works.map((work, index) => ({
  title: work.title,
  description: work.description,
  image: previewImages[index % previewImages.length],
}));

export function WorkGallery() {
  return (
    <section className="works-list-section reveal-block" id="work">
      <div className="main-container">
        <div className="section-head works-list-head">
          <div>
            <p className="eyebrow">ИЗБРАННЫЕ РАБОТЫ</p>
            <h2>Работы</h2>
            <p className="works-list-head__copy">
              Короткая curated selection из реальных направлений: портфолио, экспертный сайт,
              продуктовая подача и редакторская презентация кейсов.
            </p>
          </div>
        </div>

        <div className="works-list-grid">
          {galleryCases.map((work, index) => (
            <article className="work-list-card" key={work.title}>
              <div className="work-list-card__visual">
                <Image
                  alt={work.title}
                  className="work-list-card__image"
                  fill
                  priority={index === 0}
                  sizes="(max-width: 900px) 100vw, 25vw"
                  src={work.image}
                />
              </div>

              <div className="work-list-card__copy">
                <h3>{work.title}</h3>
                <p>{work.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
