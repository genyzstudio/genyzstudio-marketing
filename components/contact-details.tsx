import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { SiteConfig } from "@/config/site";
import { getHome, type Locale } from "@/content/locales";

export function ContactDetails({ contact, locale = "vi" }: { contact: SiteConfig["contact"]; locale?: Locale }) {
  const home = getHome(locale);
  return <>
    {contact.qrImage && contact.zaloUrl && <figure className="qr"><Image src={contact.qrImage} width={156} height={156} alt={home.contact.qrAlt} unoptimized /><figcaption>{home.contact.qrLabel}</figcaption></figure>}
    {(contact.phone || contact.email || contact.socialLinks.length > 0) && <div className="contact-links">
      {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={17} aria-hidden="true" /></a>}
      {contact.phone && <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}<ArrowUpRight size={17} aria-hidden="true" /></a>}
      {contact.socialLinks.map(link => <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={17} aria-hidden="true" /></a>)}
    </div>}
  </>;
}
