import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "./config/site";
import { studioVideos } from "./content/showcase";
import { validateShowcase } from "./lib/showcase";
import { validateSite } from "./lib/site";

export default function config(): NextConfig {
  const errors = [...validateSite(siteConfig), ...validateShowcase(studioVideos)];
  for (const video of studioVideos) {
    if (video.previewSrc && !existsSync(path.join(process.cwd(), "public", video.previewSrc))) errors.push(`Studio video preview missing: ${video.previewSrc}`);
    if (video.thumbnail && !existsSync(path.join(process.cwd(), "public", video.thumbnail))) errors.push(`Studio video thumbnail missing: ${video.thumbnail}`);
  }
  if (siteConfig.contact.qrImage && !existsSync(path.join(process.cwd(), "public", siteConfig.contact.qrImage))) errors.push("contact.qrImage: the configured image is missing from public/.");
  if (errors.length) throw new Error(`Site configuration error (config/site.ts):\n- ${errors.join("\n- ")}`);
  return {
    output: "export",
    images: { unoptimized: true },
    poweredByHeader: false,
    turbopack: { root: process.cwd() },
  };
}
