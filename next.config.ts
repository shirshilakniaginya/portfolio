import type { NextConfig } from "next";

// Cases are static HTML folders in public/cases/*. In production the host
// (Timeweb) serves index.html for a folder URL automatically. `next dev`
// does not, so clean case URLs 404 locally — these rewrites fix local dev
// only and are ignored by `output: "export"` (skipped in production).
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
};

// Only attach rewrites in dev. Defining the key at all makes `output: "export"`
// warn ("rewrites will not work with export"), so we keep prod builds clean.
if (isDev) {
  nextConfig.rewrites = async () => {
    const cases = ["coffeeshop", "horseschool/live", "noxa"];
    return cases.flatMap((c) => [
      { source: `/cases/${c}`, destination: `/cases/${c}/index.html` },
      { source: `/cases/${c}/`, destination: `/cases/${c}/index.html` },
    ]);
  };
}

export default nextConfig;
