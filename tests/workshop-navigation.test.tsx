import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { findWorkshops, libraryHref, workshopCatalog, workshopHref } from '../content/workshop/catalog';
import { workshopCourses } from '../content/workshop/access';
import { WorkshopLibrary } from '../components/workshop-library';
import { WorkshopSwitcher } from '../components/workshop-navigation';
import { LanguageSwitch } from '../components/language-switch';

test('catalog covers all registered courses and preserves every existing localized course URL', () => {
  assert.deepEqual(workshopCatalog.map(item => item.id).sort(), [...workshopCourses].sort());
  assert.equal(workshopHref('clever-rat','vi'), '/workshop');
  for (const locale of ['vi','en'] as const) {
    for (const item of workshopCatalog) {
      const href = workshopHref(item.id, locale);
      assert.ok(existsSync(`app/${locale === 'vi' ? '(vi)' : 'en'}${href.replace(/^\/en/, '')}/page.tsx`));
    }
    const html = renderToStaticMarkup(<WorkshopLibrary locale={locale} />);
    for (const item of workshopCatalog) assert.ok(html.includes(`href="${workshopHref(item.id,locale)}"`));
    assert.ok(!html.includes('character_modeling:'));
    const language = renderToStaticMarkup(<LanguageSwitch locale={locale} page="library" />);
    assert.ok(language.includes(`href="${libraryHref('vi')}"`));
    assert.ok(language.includes(`href="${libraryHref('en')}"`));
  }
});

test('workshop search supports accents, both languages, tools, combined filters and no matches', () => {
  assert.deepEqual(findWorkshops('TU DUY DAO DIEN').map(item => item.id), ['directors-framework']);
  assert.deepEqual(findWorkshops('Tư duy đạo diễn').map(item => item.id), ['directors-framework']);
  assert.deepEqual(findWorkshops('master frame').map(item => item.id), ['master-frame']);
  assert.deepEqual(findWorkshops('Kling YAML').map(item => item.id), ['ai-cinema-workflow']);
  assert.deepEqual(findWorkshops('Kling', 'foundations'), []);
  assert.deepEqual(findWorkshops('nonexistent-workshop'), []);
  assert.equal(findWorkshops('   ').length, workshopCatalog.length);
  assert.ok(findWorkshops('', 'visuals').every(item => item.topic === 'visuals'));
});

test('switcher uses a labelled dialog and real localized links with one current course', () => {
  for (const locale of ['vi','en'] as const) {
    const html = renderToStaticMarkup(<WorkshopSwitcher locale={locale} course="ai-cinema-workflow" />);
    assert.match(html, /<dialog[^>]*aria-labelledby=/);
    assert.match(html, /aria-haspopup="dialog"/);
    assert.match(html, /aria-expanded="false"/);
    assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
    for (const item of workshopCatalog) assert.ok(html.includes(`href="${workshopHref(item.id,locale)}"`));
  }
});
