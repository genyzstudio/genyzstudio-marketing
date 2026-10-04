import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getHome, type Locale } from "@/content/locales";
import { isZaloUrl } from "@/lib/site";

export function Registration({ url, className = "", locale = "vi" }: { url: string; className?: string; locale?: Locale }) {
  const home = getHome(locale);
  if (!isZaloUrl(url)) return <span className={`button button-unavailable ${className}`} aria-disabled="true">{home.contact.unavailable}</span>;
  return <a className={`button ${className}`} href={url} target="_blank" rel="noopener noreferrer">{home.contact.cta}<ArrowUpRight size={20} aria-hidden="true" /></a>;
}
