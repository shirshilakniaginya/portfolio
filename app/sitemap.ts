import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shtq.pro";

export const dynamic = "force-static";

// Bump manually when page content meaningfully changes — a fresh date on every
// build teaches crawlers to ignore lastmod.
const LAST_MODIFIED = new Date("2026-07-11");

// Demo cases in public/cases/* are noindex on purpose (concept works, not real
// businesses) — they must not be listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
