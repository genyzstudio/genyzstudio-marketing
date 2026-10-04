import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { canIndex, getSiteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return canIndex() ? ["/", "/en"].map(path => ({ url: new URL(path, getSiteUrl(siteConfig)).href, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.8 })) : [];
}
