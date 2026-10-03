import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { existsSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "./config/site";
import { studioVideos } from "./content/showcase";
import { validateShowcase } from "./lib/showcase";
import { canIndex, isPreview, validateSite } from "./lib/site";

export default function config(phase: string): NextConfig {
  const errors = [...validateSite(siteConfig, phase === PHASE_PRODUCTION_BUILD && !isPreview()), ...validateShowcase(studioVideos)];
  for (const video of studioVideos) {
    if (video.thumbnail && !existsSync(path.join(process.cwd(), "public", video.thumbnail))) errors.push(`Studio video thumbnail missing: ${video.thumbnail}`);
  }
  if (siteConfig.contact.qrImage && !existsSync(path.join(process.cwd(), "public", siteConfig.contact.qrImage))) errors.push("contact.qrImage: the configured image is missing from public/.");
  if (errors.length) throw new Error(`Site configuration error (config/site.ts):\n- ${errors.join("\n- ")}`);
  return {
    poweredByHeader: false,
    turbopack: { root: process.cwd() },
    async headers() {
      return [{ source: "/:path*", headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ...(!canIndex() ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
      ] }];
    },
  };
}
