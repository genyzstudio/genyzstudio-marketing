import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { canIndex, getSiteUrl } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return canIndex() ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${getSiteUrl(siteConfig)}/sitemap.xml` } : { rules: { userAgent: "*", disallow: "/" } };
}
