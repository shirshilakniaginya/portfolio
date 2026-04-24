"use client";

import Image from "next/image";
import CardSwap, { Card } from "@/components/card-swap";

const heroCards = [
  {
    step: "01",
    eyebrow: "Brand strategy & web design",
    title: "Собираю ясную подачу вокруг оффера и доверия.",
    copy: "Минимальная e-commerce подача с упором на чистую структуру, аргументы и продуктовую ясность.",
    image: "/work-gallery/editorial-01.webp",
    tags: ["Portfolio", "UX Strategy", "Web Design"],
  },
  {
    step: "02",
    eyebrow: "Interface direction",
    title: "Упаковываю продукт в спокойный и дорогой интерфейс.",
    copy: "Ритм, сетка, типографика и preview-блоки работают на ощущение качества без перегруза.",
    image: "/work-gallery/editorial-02.webp",
    tags: ["Product", "UI System", "Editorial"],
  },
  {
    step: "03",
    eyebrow: "Frontend-ready layout",
    title: "Собираю экраны так, чтобы они были готовы к росту.",
    copy: "Чистая база, аккуратный responsive и компоненты, которые потом можно развивать без хаоса.",
    image: "/work-gallery/editorial-03.avif",
    tags: ["Responsive", "Frontend", "Scale"],
  },
];

export function HeroGuides() {
  return (
    <div className="hero-guides" aria-hidden="true">
      <div className="hero-guides__surface">
        <CardSwap
          width={868}
          height={452}
          cardDistance={32}
          verticalDistance={18}
          delay={3200}
          autoPlay={false}
          pauseOnHover={false}
          skewAmount={0}
          easing="linear"
        >
          {heroCards.map((card) => (
            <Card className="hero-editorial-card" key={card.step}>
              <div className="hero-editorial-card__inner">
                <div className="hero-editorial-card__content">
                  <div className="hero-editorial-card__copy">
                    <div className="hero-editorial-card__copy-main">
                      <h3>{card.title}</h3>
                      <p>{card.copy}</p>
                    </div>

                    <div className="hero-editorial-card__copy-footer">
                      <a href="#work">View case</a>
                    </div>
                  </div>

                  <div className="hero-editorial-card__visual">
                    <Image
                      alt={card.title}
                      fill
                      priority={card.step === "01"}
                      sizes="340px"
                      src={card.image}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
}
