import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
// Subpath hosts (GitHub Pages project sites): NEXT_PUBLIC_BASE_PATH=/<repo>
// Root hosts (e.g. Cloudflare Workers *.workers.dev, custom apex): leave empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || "";

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "standalone",
  basePath: basePath || undefined,
};

export default nextConfig
