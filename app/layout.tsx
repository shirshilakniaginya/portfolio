import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, JetBrains_Mono } from "next/font/google";
import { METRIKA_ID } from "@/lib/metrika";
import { GsapSmoothScroll } from "@/components/utils/GsapSmoothScroll";
import { SiteHeader } from "@/components/shared/header/Header";
import "./globals.css";
import styles from "./layout.module.css";
import { cn } from "@/lib/utils";

// Geist is the redesigned homepage's grotesk system family (headlines + body + labels).
// Cyrillic subset is required for the Russian copy in the hero/projects.
const geist = Geist({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });

// Dossier system: mono face for archive labels, codes and data pairs.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shtq.pro";
const SITE_NAME = "Дмитрий — веб-дизайн и разработка сайтов";
const SITE_DESCRIPTION =
  "Делаю лендинги, промо-сайты и сайты услуг: продумываю структуру, создаю дизайн и собираю адаптивную версию. Также занимаюсь редизайном.";
const SITE_TITLE = "Веб-дизайн и разработка сайтов — Дмитрий";
const OG_IMAGE = "/og.jpg";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "ru-RU",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Дмитрий",
      url: SITE_URL,
      image: `${SITE_URL}/about/portrait-schema.webp`,
      jobTitle: "Веб-дизайнер и веб-разработчик",
      sameAs: ["https://kwork.ru/user/dmitrydezign", "https://dribbble.com/Shtutik"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}${OG_IMAGE}`,
      description: SITE_DESCRIPTION,
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: {
        "@type": "Country",
        name: "Россия",
      },
      availableLanguage: ["ru"],
      serviceType: [
        "Создание сайтов",
        "Редизайн сайтов",
        "Дизайн лендингов",
        "Разработка сайтов",
        "Проектирование интерфейсов",
        "Адаптивная верстка",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Дизайн и разработка сайта",
            description: "Структура, дизайн, адаптивная верстка и запуск лендинга, промо-сайта или сайта услуг.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Редизайн сайта",
            description: "Обновление визуала, структуры, интерфейса и пользовательского пути существующего сайта.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Верстка и разработка сайта",
            description: "Сборка адаптивного сайта с понятной структурой, быстрыми страницами и аккуратной работой на мобильных устройствах.",
          },
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#service` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}${OG_IMAGE}`,
      },
      inLanguage: "ru-RU",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — создание сайтов",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "создание сайта",
    "заказать сайт",
    "редизайн сайта",
    "веб-дизайнер",
    "веб-разработчик",
    "разработчик сайтов",
    "дизайн сайта",
    "создание лендинга",
    "сайт услуг",
    "сайт для услуг",
    "сайт для эксперта",
    "сайт для малого бизнеса",
    "сайт для бизнеса",
    "промо-сайт",
    "редизайн лендинга",
    "проектирование интерфейса",
    "адаптивная верстка",
    "дизайнер сайтов",
  ],
  authors: [{ name: "Дмитрий" }],
  creator: "Дмитрий",
  publisher: "Дмитрий",
  applicationName: SITE_NAME,
  category: "создание сайтов, веб-дизайн, редизайн сайтов",
  alternates: {
    canonical: "/",
  },
  // SVG for modern browsers + PNG fallback (Yandex requires ≥120×120).
  // The png files live in app/ (icon.png 512², apple-icon.png 180²).
  icons: {
    icon: [
      { url: "/shtq-favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/shtq-favicon.svg",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Верификация в поисковиках. Подставь коды из консолей (это вариант через мета-тег,
  // альтернатива HTML-файлу): Google Search Console → "HTML-тег", Yandex Webmaster → "Мета-тег".
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      className={cn("font-sans", geist.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.dataset.js = 'true';",
          }}
        />
      </head>
      <body className={styles.body}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {/* Yandex.Metrika: поведенческая аналитика + вебвизор. Цели шлём через lib/metrika.ts. */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}', 'ym');

            ym(${METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <GsapSmoothScroll />
        <SiteHeader />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
