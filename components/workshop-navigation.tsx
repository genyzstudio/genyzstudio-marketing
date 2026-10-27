'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CaretDown, Check, MagnifyingGlass, SquaresFour, X } from '@phosphor-icons/react';
import { Wordmark } from './header';
import { LanguageSwitch } from './language-switch';
import type { WorkshopCourseId } from '../content/workshop/access';
import type { WorkshopLocale } from '../content/workshop/copy';
import { findWorkshops, libraryHref, workshopCatalog, workshopHref, workshopTopics } from '../content/workshop/catalog';

export function WorkshopHeader({ locale, course }: { locale: WorkshopLocale; course?: WorkshopCourseId }) {
  const vi = locale === 'vi';
  return <header className="wk-header wk-learning-header">
    <a href={vi ? '/' : '/en'} aria-label={vi ? 'GenYZ Studio: trang chủ' : 'GenYZ Studio: home'}><Wordmark /></a>
    <span className="wk-learning-label">{vi ? 'Không gian học tập' : 'Learning studio'}</span>
    <LanguageSwitch locale={locale} page={course ? 'workshop' : 'library'} course={course} />
    <a href={vi ? '/' : '/en'} className="wk-back"><ArrowLeft size={16} aria-hidden="true" />{vi ? 'Về studio' : 'Back to studio'}</a>
  </header>;
}

export function WorkshopSwitcher({ locale, course }: { locale: WorkshopLocale; course: WorkshopCourseId }) {
  const vi = locale === 'vi';
  const current = workshopCatalog.find(item => item.id === course)!;
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const results = findWorkshops(query);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  return <div className="wk-course-bar">
    <a className="wk-library-link" href={libraryHref(locale)}><SquaresFour size={19} aria-hidden="true" /><span>{vi ? 'Thư viện workshop' : 'Workshop library'}</span></a>
    <span className="wk-course-divider" aria-hidden="true">/</span>
    <button className="wk-switch-trigger" aria-haspopup="dialog" aria-expanded={open} aria-controls={dialogId} onClick={() => {
      setQuery(''); dialog.current?.showModal(); setOpen(true); search.current?.focus();
    }}><span><small>{vi ? 'Workshop hiện tại' : 'Current workshop'}</small><strong>{current.title[locale]}</strong></span><CaretDown size={18} aria-hidden="true" /><span className="sr-only">{vi ? 'Đổi workshop' : 'Switch workshop'}</span></button>
    <dialog ref={dialog} id={dialogId} className="wk-switch-dialog" aria-labelledby={titleId} onClose={() => setOpen(false)} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); dialog.current?.close(); } }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="wk-switch-content">
        <div className="wk-switch-heading"><h2 id={titleId}>{vi ? 'Chọn workshop' : 'Choose a workshop'}</h2><button className="wk-icon-button" aria-label={vi ? 'Đóng danh sách workshop' : 'Close workshop list'} onClick={() => dialog.current?.close()}><X size={22} aria-hidden="true" /></button></div>
        <label className="wk-search"><MagnifyingGlass size={20} aria-hidden="true" /><span className="sr-only">{vi ? 'Tìm workshop' : 'Search workshops'}</span><input ref={search} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={vi ? 'Tên workshop, chủ đề hoặc công cụ…' : 'Workshop, topic or tool…'} /></label>
        <p className="wk-result-count" role="status">{results.length} {vi ? 'workshop' : results.length === 1 ? 'workshop' : 'workshops'}</p>
        <nav className="wk-switch-results" aria-label={vi ? 'Chọn workshop' : 'Choose a workshop'}>{results.map(item => <a key={item.id} href={workshopHref(item.id, locale)} aria-current={item.id === course ? 'page' : undefined}>
          <span><strong>{item.title[locale]}</strong><small>{workshopTopics[item.topic][locale]}</small></span>{item.id === course ? <><span className="wk-current-label">{vi ? 'Hiện tại' : 'Current'}</span><Check size={19} aria-hidden="true" /></> : <ArrowRight size={18} aria-hidden="true" />}
        </a>)}</nav>
        {results.length === 0 && <div className="wk-empty"><p>{vi ? 'Không tìm thấy workshop phù hợp.' : 'No matching workshops.'}</p><button className="wk-text-button" onClick={() => { setQuery(''); search.current?.focus(); }}>{vi ? 'Xóa tìm kiếm' : 'Clear search'}</button></div>}
        <a className="wk-switch-library" href={libraryHref(locale)}>{vi ? 'Khám phá toàn bộ thư viện' : 'Explore the full library'}<ArrowRight size={18} aria-hidden="true" /></a>
      </div>
    </dialog>
  </div>;
}
