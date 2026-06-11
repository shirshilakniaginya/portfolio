import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shtq.pro";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/cases/horseschool/live/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cases/coffeeshop/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cases/noxa/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
