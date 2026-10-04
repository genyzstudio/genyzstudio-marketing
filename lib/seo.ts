import type { Metadata } from 'next';
import { siteConfig } from '../config/site';
import { getHome, localePath, type Locale } from '../content/locales';
import { canIndex, getSiteUrl } from './site';

export function pageMetadata(locale: Locale): Metadata {
  const home = getHome(locale);
  const origin = getSiteUrl(siteConfig);
  const url = new URL(localePath(locale), origin).href;
  return {
    metadataBase: new URL(origin), title: home.metadata.title, description: home.metadata.description,
    alternates: { canonical: url, languages: { vi: new URL('/', origin).href, en: new URL('/en', origin).href, 'x-default': new URL('/', origin).href } },
    openGraph: { type: 'website', locale: locale === 'vi' ? 'vi_VN' : 'en_US', alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'], siteName: 'GenYZ Studio', title: home.metadata.title, description: home.metadata.description, url, images: [{ url: '/images/social-preview.jpg', width: 1200, height: 630, alt: home.metadata.title }] },
    twitter: { card: 'summary_large_image', title: home.metadata.title, description: home.metadata.description, images: ['/images/social-preview.jpg'] },
    robots: { index: canIndex(), follow: canIndex() },
  };
}

export function structuredData(locale: Locale) {
  const home = getHome(locale);
  const origin = getSiteUrl(siteConfig);
  const url = new URL(localePath(locale), origin).href;
  const organizationId = `${origin}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': organizationId, name: 'GenYZ Studio', url: origin, logo: new URL('/images/brand/leo-mio-master.png', origin).href, ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}), sameAs: siteConfig.contact.socialLinks.map(link => link.url) },
      { '@type': 'WebSite', '@id': `${origin}/#website`, url: origin, name: 'GenYZ Studio', inLanguage: ['vi', 'en'], publisher: { '@id': organizationId } },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: home.metadata.title, description: home.metadata.description, inLanguage: locale, isPartOf: { '@id': `${origin}/#website` }, about: { '@id': organizationId } }
    ]
  };
}
