import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { HomePage } from '../components/home-page';
import { pageMetadata, structuredData } from '../lib/seo';
import { studioVideosEn } from '../content/showcase-en';
import { studioVideos } from '../content/showcase';
import { getVideoEmbed } from '../lib/video';

test('each locale has a self canonical and reciprocal hreflang links', () => {
  for (const locale of ['vi', 'en'] as const) {
    const metadata = pageMetadata(locale);
    assert.equal(metadata.alternates?.canonical, `https://genyzstudio.com/${locale === 'en' ? 'en' : ''}`);
    assert.deepEqual(metadata.alternates?.languages, { vi: 'https://genyzstudio.com/', en: 'https://genyzstudio.com/en', 'x-default': 'https://genyzstudio.com/' });
    assert.equal(metadata.openGraph?.url, metadata.alternates?.canonical);
    assert.ok(metadata.description);
  }
});

test('English page includes translated navigation, disclosures, gallery and registration', () => {
  const html = renderToStaticMarkup(<HomePage locale="en" />);
  for (const text of ['Create your first', 'Express interest via Zalo', 'To be announced', 'Coming soon', 'Previous video', 'Next video', 'Open menu', 'Vietnamese', 'Free tuition does not include']) assert.ok(html.includes(text), text);
  for (const text of ['Đăng ký', 'Sẽ thông báo', 'Video tiếp theo', 'Liên hệ', 'Tạm dừng']) assert.ok(!html.includes(text), text);
  // Hero, workshop and contact buttons, plus the header and sticky mobile registration links.
  assert.equal((html.match(/href="https:\/\/zalo.me\/0358155746"/g) || []).length, 5);
  assert.match(html, /href="\/en"[^>]*aria-current="page"/);
  assert.match(html, /href="\/" lang="vi"/);
});

test('structured data uses published studio identity without fabricated course or event claims', () => {
  const data = structuredData('en');
  assert.deepEqual(data['@graph'].map(item => item['@type']), ['Organization', 'WebSite', 'WebPage']);
  assert.equal(data['@graph'][2].inLanguage, 'en');
  assert.equal(data['@graph'][2].url, 'https://genyzstudio.com/en');
  const html = renderToStaticMarkup(<HomePage locale="en" />);
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match);
  assert.deepEqual(JSON.parse(match[1]), data);
});

test('all studio films retain their sources and have English teaching notes', () => {
  assert.equal(studioVideosEn.length, studioVideos.length);
  studioVideosEn.forEach((video, index) => {
    assert.equal(video.url, studioVideos[index].url);
    assert.notEqual(video.description, studioVideos[index].description);
    assert.notEqual(video.lesson, studioVideos[index].lesson);
  });
  assert.match(getVideoEmbed(studioVideos[0], 'en') || '', /hl=en$/);
});
