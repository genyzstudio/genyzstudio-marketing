"use client";
import { useState } from "react";
import Image from "next/image";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { getHome, interfaceCopy, localePath, type Locale } from "@/content/locales";
import { studioCopy } from "@/content/studio";

export function Wordmark() {
  return <span className="brand-lockup"><Image className="brand-characters" src="/images/brand/leo-mio.webp" alt="" width={64} height={64} sizes="(max-width: 760px) 54px, 80px" /><span className="wordmark">gen<span className="wordmark-yz">yz</span><span className="wordmark-studio">studio<span className="brand-dot">.</span></span></span></span>;
}
export function Header({ locale = "vi" }: { locale?: Locale }) {
  const home = getHome(locale);
  const copy = interfaceCopy[locale];
  const [open, setOpen] = useState(false);
  return <header className="header" onKeyDown={(e) => { if (e.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } }}>
    <div className="shell header-inner">
      <a className="brand" href="#" aria-label={copy.top} onClick={() => setOpen(false)}><Wordmark /></a>
      <nav aria-label={copy.navigation} className="desktop-nav">{home.nav.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
      <nav className="language-switch" aria-label={locale === "vi" ? "Ngôn ngữ" : "Language"}>{(["vi", "en"] as const).map(language => <a key={language} href={localePath(language)} lang={language} hrefLang={language} aria-current={language === locale ? "page" : undefined} aria-label={language === "vi" ? "Tiếng Việt" : "English"}>{language.toUpperCase()}</a>)}</nav>
      <a className="header-contact header-register" href="#lien-he">{studioCopy[locale].contact}<ArrowUpRight size={17} aria-hidden="true" /></a>
      <button id="menu-toggle" className="menu-toggle" aria-label={open ? copy.close : copy.open} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X size={25} /> : <List size={25} />}</button>
    </div>
    <nav id="mobile-nav" aria-label={copy.mobileNavigation} className="mobile-nav" hidden={!open}>{[...home.nav, { label: copy.contact, href: "#lien-he" }].map(link => <a href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</nav>
  </header>;
}
