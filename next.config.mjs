import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
// GitHub Pages project sites live at https://<user>.github.io/<repo>/ — set NEXT_PUBLIC_BASE_PATH=/<repo>
// User sites (username.github.io repo) should use NEXT_PUBLIC_BASE_PATH= (empty)
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
  output: "export",
  basePath: basePath || undefined,
};

export default nextConfig
