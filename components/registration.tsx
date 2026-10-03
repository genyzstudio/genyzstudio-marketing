import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { home } from "@/content/home";
import { isZaloUrl } from "@/lib/site";

export function Registration({ url, className = "" }: { url: string; className?: string }) {
  if (!isZaloUrl(url)) return <span className={`button button-unavailable ${className}`} aria-disabled="true">{home.contact.unavailable}</span>;
  return <a className={`button ${className}`} href={url} target="_blank" rel="noopener noreferrer">{home.contact.cta}<ArrowUpRight size={20} aria-hidden="true" /></a>;
}
