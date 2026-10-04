import { Registration } from "@/components/registration";
import { getHome, type Locale } from "@/content/locales";
import { isZaloUrl } from "@/lib/site";

export function HeroRegistration({ url, locale }: { url: string; locale: Locale }) {
  return <div className="hero-registration">
    <Registration locale={locale} url={url} />
    {isZaloUrl(url) && <p className="cta-note">{getHome(locale).hero.ctaNote}</p>}
  </div>;
}
