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
  for (const text of ['An idea today', 'Express interest via Zalo', 'To be announced', 'Coming soon', 'Previous video', 'Next video', 'Open menu', 'Vietnamese', 'Free tuition does not include']) assert.ok(html.includes(text), text);
  for (const text of ['Đăng ký', 'Sẽ thông báo', 'Video tiếp theo', 'Liên hệ', 'Tạm dừng']) assert.ok(!html.includes(text), text);
  // The studio and training journeys have distinct, reachable destinations.
  for (const id of ['san-pham', 'cau-chuyen', 'lo-trinh', 'workshop', 'lien-he']) {
    assert.ok(html.includes(`id="${id}"`), id);
    assert.ok(html.includes(`href="#${id}"`), id);
  }
  assert.match(html, /href="mailto:genyzstudio@gmail.com\?subject=Video%20project"/);
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

test('project workflows ship verified media and reserve missing stages', async () => {
  const { existsSync, statSync } = await import('node:fs');
  const { greatGulp, studioCopy } = await import('../content/studio');
  for (const asset of [greatGulp.poster, greatGulp.preview, ...studioCopy.en.chapters.map(chapter => chapter.image)]) {
    assert.ok(existsSync(`public${asset}`), asset);
    assert.ok(statSync(`public${asset}`).size > 0, asset);
  }
  const { getWorkflows, stageIds } = await import('../content/workflows');
  for (const locale of ['vi', 'en'] as const) {
    const projects = getWorkflows(locale);
    assert.equal(projects.length, 3);
    assert.deepEqual(Object.keys(projects[2].stages), ['film']);
    for (const project of projects) {
      assert.ok(project.stages.film?.film && getVideoEmbed(project.stages.film.film, locale));
      for (const stage of Object.values(project.stages)) {
        for (const media of stage.media || []) {
          for (const asset of [media.src, media.poster].filter((asset): asset is string => Boolean(asset))) assert.ok(existsSync(`public${asset}`), asset);
        }
      }
    }
    for (const project of projects.slice(0, 2)) assert.deepEqual(Object.keys(project.stages), [...stageIds]);
    assert.equal(projects[0].stages.film?.film?.url, greatGulp.url);
    const html = renderToStaticMarkup(<HomePage locale={locale} />);
    assert.ok(html.includes(locale === 'en' ? 'Original storyboard' : 'Storyboard gốc'));
    for (const title of ['The Great Gulp', 'Clever Little Rat', 'The Legend of Titus']) assert.ok(html.includes(title));
    assert.doesNotMatch(html, /flow\.google\.com|data:image|<iframe/);
    assert.equal((html.match(/aria-controls="workflow-panel"/g) || []).length, 8);
  }
});

test('every gallery selection resolves to its own film without borrowing another production breakdown', async () => {
  const { getSelectedWorkflow } = await import('../content/workflows');
  for (const locale of ['vi', 'en'] as const) {
    for (const film of locale === 'en' ? studioVideosEn : studioVideos) {
      const project = getSelectedWorkflow(locale, film.url);
      assert.equal(project.stages.film?.film?.url, film.url);
      if (!['https://www.youtube.com/watch?v=MsXyfqlA1Fw', 'https://www.youtube.com/watch?v=1_EZiRh8o_o'].includes(film.url)) {
        assert.deepEqual(Object.keys(project.stages), ['film']);
        assert.ok(project.notice);
      }
    }
    const html = renderToStaticMarkup(<HomePage locale={locale} />);
    assert.ok(!html.includes('class="production-notebook"'), 'Little Rat notebook is hidden for the initial Great Gulp selection');
  }
});
