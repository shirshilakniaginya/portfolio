import type { Metadata } from "next";
import { Manrope, Geist } from "next/font/google";
import localFont from "next/font/local";
import { GsapSmoothScroll } from "@/components/utils/GsapSmoothScroll";
import { SiteHeader } from "@/components/shared/header/Header";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const hikasami = localFont({
  variable: "--font-display",
  display: "swap",
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
const SITE_NAME = "Дмитрий — дизайн и фронтенд";
const SITE_DESCRIPTION =
  "Портфолио дизайнера и фронтенд-разработчика: промо-сайты, интернет-магазины и лендинги с акцентом на структуру, ритм и чистый UI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Портфолио — дизайн и фронтенд",
    template: "%s — Портфолио",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "портфолио",
    "веб-дизайн",
    "фронтенд",
    "разработка сайтов",
    "лендинг",
    "интернет-магазин",
    "Next.js",
    "UI",
  ],
  authors: [{ name: "Дмитрий" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Портфолио — дизайн и фронтенд",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Портфолио — дизайн и фронтенд",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Портфолио — дизайн и фронтенд",
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
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
    <html lang="ru" data-theme="dark" className={cn(manrope.variable, hikasami.variable, "font-sans", geist.variable)}>
      <body>
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
