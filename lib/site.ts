import type { SiteConfig } from "../config/site";

type Environment = Record<string, string | undefined>;
export function isHttpsUrl(value: string, host?: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && !url.port && (!host || url.hostname === host);
  } catch { return false; }
}
export function isZaloUrl(value: string): boolean {
  if (!isHttpsUrl(value, "zalo.me")) return false;
  const path = new URL(value).pathname;
  return /^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*\/?$/.test(path);
}
export function isPreview(env: Environment = process.env): boolean {
  // A Vercel production deployment can never bypass the launch check.
  if (env.VERCEL_ENV) return env.VERCEL_ENV !== "production";
  return env.SITE_BUILD_MODE === "preview";
}
export function validateSite(config: SiteConfig, requireLaunch: boolean): string[] {
  const errors: string[] = [];
  if ((requireLaunch || config.contact.zaloUrl) && !isZaloUrl(config.contact.zaloUrl)) errors.push("contact.zaloUrl: enter a real HTTPS profile/group URL on zalo.me before production launch.");
  if (config.siteUrl && (!isHttpsUrl(config.siteUrl) || new URL(config.siteUrl).pathname !== "/" || new URL(config.siteUrl).search || new URL(config.siteUrl).hash)) errors.push("siteUrl: use an HTTPS origin without a path, query or fragment.");
  if (config.contact.qrImage && (!/^\/images\/[a-zA-Z0-9_/-]+\.(png|jpg|jpeg|webp)$/.test(config.contact.qrImage) || !config.contact.zaloUrl)) errors.push("contact.qrImage: use a local /images/ PNG/JPEG/WebP path and configure zaloUrl first.");
  if (config.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contact.email)) errors.push("contact.email: enter a valid public email address.");
  if (config.contact.phone && !/^\+?[\d ()-]{6,25}$/.test(config.contact.phone)) errors.push("contact.phone: enter a public phone number using digits, spaces, +, - or parentheses.");
  for (const social of config.contact.socialLinks) if (!social.label.trim() || !isHttpsUrl(social.url)) errors.push("contact.socialLinks: each link needs a label and an HTTPS URL.");
  if (config.workshop.capacity !== null && (!Number.isInteger(config.workshop.capacity) || config.workshop.capacity < 1)) errors.push("workshop.capacity: use a positive whole number or null.");
  if ((config.skool.status === "available" || config.skool.url) && (!isHttpsUrl(config.skool.url, "www.skool.com") || new URL(config.skool.url).pathname === "/")) errors.push("skool.url: use an HTTPS course/community URL on www.skool.com.");
  return errors;
}
export function getSiteUrl(config: SiteConfig, env: Environment = process.env): string {
  if (isPreview(env) && env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return config.siteUrl || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
}
export function canIndex(env: Environment = process.env): boolean {
  return env.VERCEL_ENV === "production";
}
