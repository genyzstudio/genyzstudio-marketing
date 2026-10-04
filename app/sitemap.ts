import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { canIndex, getSiteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return canIndex() ? [{ url: getSiteUrl(siteConfig), changeFrequency: "monthly", priority: 1 }] : [];
}
