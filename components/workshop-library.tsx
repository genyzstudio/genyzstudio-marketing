'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, BookOpen, FilmStrip, MagnifyingGlass, SlidersHorizontal } from '@phosphor-icons/react';
import type { WorkshopLocale } from '../content/workshop/copy';
import { findWorkshops, workshopHref, workshopLevel, workshopTopics, type WorkshopTopic } from '../content/workshop/catalog';
import { WorkshopHeader } from './workshop-navigation';

export function WorkshopLibrary({ locale }: { locale: WorkshopLocale }) {
  const vi = locale === 'vi';
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<WorkshopTopic | 'all'>('all');
  const [presenting, setPresenting] = useState(false);
  const [slide, setSlide] = useState(0);
  const results = findWorkshops(query, topic);
  const activeSlide = Math.min(slide, Math.max(0, results.length - 1));
  const visibleCourses = presenting ? results.slice(activeSlide, activeSlide + 1) : results;
  const icons = {foundations: BookOpen, visuals: SlidersHorizontal, production: FilmStrip};
  return <div className="wk-page wk-library-page">
    <a href="#workshop-library" className="skip-link">{vi ? 'Đến danh sách workshop' : 'Skip to workshops'}</a>
    <WorkshopHeader locale={locale} />
    <main id="workshop-library" className="wk-library-main">
      <div className="wk-library-intro"><p className="wk-eyebrow">GenYZ Studio · Workshops</p><h1>{vi ? 'Chọn điều bạn muốn' : 'Choose what to'}<br /><span>{vi ? 'làm tốt hơn.' : 'create next.'}</span></h1><p>{vi ? 'Chọn một bài thực hành để bắt đầu kể chuyện, luyện cách quay hoặc hoàn thiện bộ phim của bạn.' : 'Choose a practical project to start telling stories, practise camera work or improve your next film.'}</p></div>
      <div className="wk-library-filters">
        <label className="wk-search"><MagnifyingGlass size={21} aria-hidden="true" /><span className="sr-only">{vi ? 'Tìm workshop' : 'Search workshops'}</span><input type="search" value={query} onChange={event => { setQuery(event.target.value); setSlide(0); }} placeholder={vi ? 'Tìm theo tên, chủ đề hoặc công cụ…' : 'Search by title, topic or tool…'} /></label>
        <label className="wk-topic-filter"><span>{vi ? 'Chủ đề' : 'Topic'}</span><select value={topic} onChange={event => { setTopic(event.target.value as WorkshopTopic | 'all'); setSlide(0); }}><option value="all">{vi ? 'Tất cả chủ đề' : 'All topics'}</option>{Object.entries(workshopTopics).map(([value, title]) => <option key={value} value={value}>{title[locale]}</option>)}</select></label>
      </div>
      <div className="wk-library-meta"><p role="status">{results.length} {vi ? 'workshop' : results.length === 1 ? 'workshop' : 'workshops'}</p><div className="wk-library-views" role="group" aria-label={vi ? 'Cách xem thư viện' : 'Library view'}><button type="button" aria-pressed={!presenting} onClick={() => setPresenting(false)}>{vi ? 'Thư viện ảnh' : 'Gallery'}</button><button type="button" aria-pressed={presenting} onClick={() => setPresenting(true)}>{vi ? 'Trình chiếu' : 'Presenter view'}</button></div></div>
      {presenting && results.length > 0 && <div className="wk-presenter-controls"><button type="button" disabled={activeSlide === 0} onClick={() => setSlide(activeSlide - 1)}>{vi ? 'Workshop trước' : 'Previous workshop'}</button><p role="status" aria-live="polite">{activeSlide + 1} / {results.length}</p><button type="button" disabled={activeSlide === results.length - 1} onClick={() => setSlide(activeSlide + 1)}>{vi ? 'Workshop tiếp' : 'Next workshop'}</button></div>}
      <div className={`wk-library-grid${presenting ? ' wk-library-presenter' : ''}`}>{visibleCourses.map((item, index) => {
        const Icon = icons[item.topic];
        return <a className="wk-course-card" href={workshopHref(item.id, locale)} key={item.id}>
          <div className="wk-card-cover"><Image src={item.cover.src} alt={item.cover.alt[locale]} width={960} height={540} unoptimized loading={index < 3 ? 'eager' : 'lazy'} sizes={presenting ? '(max-width: 760px) 100vw, 60vw' : '(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw'} /></div>
          <div className="wk-card-content">
          <div className="wk-card-top"><Icon size={29} weight="light" aria-hidden="true" /><span>{workshopTopics[item.topic][locale]}</span></div>
          <h2>{item.title[locale]}</h2><p>{item.description[locale]}</p>
          <div className="wk-card-bottom"><span>{workshopLevel(item.level, locale)}</span><span className="wk-card-action">{vi ? 'Mở workshop' : 'Open workshop'}<ArrowUpRight size={19} aria-hidden="true" /></span></div>
          </div>
        </a>;
      })}</div>
      {results.length === 0 && <div className="wk-empty wk-library-empty"><h2>{vi ? 'Chưa tìm thấy workshop phù hợp' : 'No matching workshops'}</h2><p>{vi ? 'Thử một từ khóa khác hoặc xem lại tất cả chủ đề.' : 'Try another keyword or browse all topics.'}</p><button className="button button-secondary" onClick={() => { setQuery(''); setTopic('all'); setSlide(0); }}>{vi ? 'Xóa bộ lọc' : 'Clear filters'}</button></div>}
      <p className="wk-library-note">{vi ? 'Mỗi workshop có lộ trình riêng. Để mở bài học yêu cầu quyền truy cập, hãy đăng nhập bằng email đã đăng ký học.' : 'Each workshop has its own learning path. For lessons that require access, sign in with the email you enrolled with.'}</p>
    </main>
    <footer className="wk-footer"><span>{vi ? 'GenYZ Studio · Học bằng cách làm.' : 'GenYZ Studio · Learn by doing.'}</span><a href={vi ? '/' : '/en'}>{vi ? 'Về studio' : 'Back to studio'}</a></footer>
  </div>;
}
