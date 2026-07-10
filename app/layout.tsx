import type { Metadata } from "next";
import { Manrope, Geist, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { GsapSmoothScroll } from "@/components/utils/GsapSmoothScroll";
import { SiteHeader } from "@/components/shared/header/Header";
import "./globals.css";
import styles from "./layout.module.css";
import { cn } from "@/lib/utils";

// Geist is the redesigned homepage's grotesk system family (headlines + body + labels).
// Cyrillic subset is required for the Russian copy in the hero/projects.
const geist = Geist({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "block" });

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "block",
});

// Dossier system: mono face for archive labels, codes and data pairs.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "block",
});

const hikasami = localFont({
  variable: "--font-display",
  display: "block",
  src: [
    {
      path: "./fonts/Hikasami-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Hikasami-Bold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Hikasami-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shtq.pro";
const SITE_NAME = "Дмитрий — создание и редизайн сайтов";
const SITE_DESCRIPTION =
  "Создаю и редизайню сайты под заявки: лендинги, промо-сайты, сайты услуг и интернет-магазины. Продумываю структуру, дизайн, адаптивную верстку и разработку.";
const SITE_TITLE = "Создание и редизайн сайтов — веб-дизайнер и веб-разработчик Дмитрий";
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
      image: `${SITE_URL}/about/portraitnobg.png`,
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
            name: "Создание сайта под ключ",
            description: "Структура, веб-дизайн, адаптивная верстка и разработка лендинга, промо-сайта или сайта услуг.",
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
    "лендинг под ключ",
    "сайт услуг",
    "сайт для бизнеса",
    "промо-сайт",
    "интернет-магазин",
    "проектирование интерфейса",
    "адаптивная верстка",
    "дизайнер сайтов",
    "исполнитель для сайта",
  ],
  authors: [{ name: "Дмитрий" }],
  creator: "Дмитрий",
  publisher: "Дмитрий",
  applicationName: SITE_NAME,
  category: "создание сайтов, веб-дизайн, редизайн сайтов",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/shtq-favicon.svg",
    shortcut: "/shtq-favicon.svg",
    apple: "/shtq-favicon.svg",
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
      className={cn(manrope.variable, hikasami.variable, "font-sans", geist.variable, jetbrainsMono.variable)}
    >
      <body className={styles.body}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
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
