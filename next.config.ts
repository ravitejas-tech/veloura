import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export: `npm run build` writes a plain HTML/CSS/JS site to /out
   * that can be hosted anywhere (Vercel, Netlify, Cloudflare Pages, GitHub
   * Pages, cPanel, S3…). Remove this line if you add server-only features.
   */
  output: "export",
  poweredByHeader: false,
};

export default nextConfig;
