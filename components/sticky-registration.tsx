"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { getHome, type Locale } from "@/content/locales";
import { isZaloUrl } from "@/lib/site";

// The bar steps aside whenever another registration button, the contact section or the footer is on screen.
const COMPETING_TARGETS = "[data-registration], #lien-he, .footer";

export function StickyRegistration({ url, locale }: { url: string; locale: Locale }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targets = [...document.querySelectorAll(COMPETING_TARGETS)];
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setIsVisible(onScreen.size === 0);
    });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  if (!isZaloUrl(url)) return null;
  const home = getHome(locale);
  return <div className="sticky-registration" data-visible={isVisible} aria-hidden={!isVisible}>
    <p>{home.hero.ctaNote}</p>
    <a className="button" href={url} target="_blank" rel="noopener noreferrer" tabIndex={isVisible ? undefined : -1}>{home.contact.cta}<ArrowUpRight size={18} aria-hidden="true" /></a>
  </div>;
}
