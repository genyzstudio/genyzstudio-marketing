import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageSwitch } from '../components/language-switch';
import { Header } from '../components/header';

test('VN / EN navigation stays on the matching page in both editions', () => {
  for (const locale of ['vi', 'en'] as const) {
    for (const page of ['home', 'workshop'] as const) {
      const html = renderToStaticMarkup(<LanguageSwitch locale={locale} page={page} />);
      const suffix = page === 'workshop' ? '/workshop' : '';
      assert.ok(html.includes(`href="${suffix || '/'}"`));
      assert.ok(html.includes(`href="/en${suffix}"`));
      assert.match(html, />VN<\/a>/);
      assert.match(html, />EN<\/a>/);
      assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
      assert.ok(html.includes(`lang="${locale}" hrefLang="${locale}" aria-current="page"`));
    }
    const header = renderToStaticMarkup(<Header locale={locale} />);
    const mobile = header.slice(header.indexOf('id="mobile-nav"'));
    assert.ok(mobile.includes(`href="${locale === 'en' ? '/en' : ''}/workshop"`));
  }
});


test('five-level language switch preserves the selected course', () => {
  for (const locale of ['vi', 'en'] as const) {
    const html = renderToStaticMarkup(<LanguageSwitch locale={locale} page="workshop" course="five-levels" />);
    assert.ok(html.includes('href="/workshop/five-levels"'));
    assert.ok(html.includes('href="/en/workshop/five-levels"'));
  }
});
