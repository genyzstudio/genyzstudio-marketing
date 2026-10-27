'use client';

import type { Locale } from '../content/locales';

/** Keep the current page and section when switching language editions. */
export function LanguageSwitch({ locale, page = 'home', course = 'clever-rat' }: { locale: Locale; page?: 'home' | 'workshop' | 'library'; course?: 'clever-rat' | 'five-levels' | 'master-frame' | 'directors-framework' | 'fight-scenes' | 'ai-cinema-workflow' | 'visual-effects' | 'seedance-masterclass' }) {
  return <nav className="language-switch" aria-label={locale === 'vi' ? 'Ngôn ngữ' : 'Language'}>
    {(['vi', 'en'] as const).map(language => {
      const href = `${language === 'en' ? '/en' : ''}${page === 'library' ? '/workshops' : page === 'workshop' ? `/workshop${course === 'clever-rat' ? '' : `/${course}`}` : ''}` || '/';
      return <a key={language} href={href} lang={language} hrefLang={language}
        aria-current={language === locale ? 'page' : undefined}
        aria-label={language === 'vi' ? 'Tiếng Việt' : 'English'}
        onClick={event => { event.currentTarget.hash = window.location.hash; }}>
        {language === 'vi' ? 'VN' : 'EN'}
      </a>;
    })}
  </nav>;
}
