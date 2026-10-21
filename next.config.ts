import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% statique : `next build` produit le dossier out/
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
