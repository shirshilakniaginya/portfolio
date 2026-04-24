import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { ScrollReveal } from "@/components/scroll-reveal";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const hikasami = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    {
      path: "./fonts/Hikasami-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Hikasami-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Hikasami-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Портфолио-дизайнера и сайт с акцентом на структуру, ритм и чистый UI.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${hikasami.variable}`}>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
