'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import type { WorkshopAdminCourse, WorkshopProtection } from '../content/workshop/access';
import './workshop-admin.css';

class AdminError extends Error { constructor(message: string, public status: number) { super(message); } }
async function request<T>(route: string, method = 'GET', body?: unknown): Promise<T> {
  const result = await fetch(`/api/workshop/${route}`, { method, credentials: 'same-origin', cache: 'no-store',
    ...(body === undefined ? {} : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
  });
  if (!result.headers.get('Content-Type')?.includes('application/json')) throw new AdminError('Không kết nối được máy chủ. Vui lòng thử lại.', 503);
  const data = await result.json();
  if (!result.ok) throw new AdminError(data.error || 'Không thể lưu thay đổi.', result.status);
  return data;
}
type Dashboard = { email: string; courses: WorkshopAdminCourse[] };
function AccessEditor({ course, onSaved, onError }: { course: WorkshopAdminCourse; onSaved(): Promise<void>; onError(error: unknown): void }) {
  const [mode, setMode] = useState<WorkshopProtection>(course.mode);
  const [publicLessons, setPublicLessons] = useState(course.publicLessons);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const dirty = mode !== course.mode || JSON.stringify(publicLessons) !== JSON.stringify(course.publicLessons);
  const valid = mode !== 'partial' || publicLessons.length > 0 && publicLessons.length < course.lessons.length;
  async function save(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice('');
    try {
      await request(`save-access?course=${course.id}`, 'PUT', { mode, publicLessons: mode === 'partial' ? publicLessons : [] });
      await onSaved(); if (mode !== 'partial') setPublicLessons([]); setNotice('Đã lưu và kiểm tra lại quyền truy cập.');
    } catch (error) { onError(error); } finally { setBusy(false); }
  }
  return <form className="wa-card" onSubmit={save}>
    <h2>{course.title}</h2>
    <fieldset disabled={busy}><legend>Quyền truy cập</legend>
      {([['protected', 'Bảo vệ toàn bộ', 'Tất cả bài học yêu cầu đăng nhập bằng email đã được cấp quyền.'], ['public', 'Công khai toàn bộ', 'Mọi người có thể xem tất cả bài học và phần chuẩn bị.'], ['partial', 'Công khai một phần', 'Chọn các bài được xem miễn phí. Các bài còn lại và phần chuẩn bị yêu cầu đăng nhập.']] as const).map(([value, label, detail]) => <label className="wa-option" key={value}>
        <input type="radio" name={`mode-${course.id}`} value={value} checked={mode === value} onChange={() => { setMode(value); setNotice(''); }} /><span><strong>{label}</strong><small>{detail}</small></span>
      </label>)}
      {mode === 'partial' && <div className="wa-lessons"><p>Đánh dấu bài công khai. Ví dụ: chọn bài 1 và 2 để bảo vệ từ bài 3.</p>{course.lessons.map((lesson, index) => <label key={lesson.id}>
        <input type="checkbox" checked={publicLessons.includes(lesson.id)} onChange={event => { setPublicLessons(event.target.checked ? [...publicLessons, lesson.id] : publicLessons.filter(id => id !== lesson.id)); setNotice(''); }} />{index + 1}. {lesson.title}
      </label>)}{!valid && <p>Chọn ít nhất một bài và giữ lại ít nhất một bài được bảo vệ; nếu không, dùng chế độ toàn bộ.</p>}</div>}
    </fieldset>
    <div className="wa-actions"><button className="button button-primary" disabled={!dirty || !valid || busy}>{busy ? 'Đang lưu…' : 'Lưu quyền truy cập'}</button><a href={course.id === 'clever-rat' ? '/workshop' : `/workshop/${course.id}`} target="_blank" rel="noreferrer">Mở workshop ↗</a></div>
    <p role="status">{notice}</p>
  </form>;
}
export function WorkshopAdmin() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  function fail(error: unknown) {
    if (error instanceof AdminError && (error.status === 401 || error.status === 403)) setDashboard(null);
    setError(error instanceof Error ? error.message : 'Không kết nối được máy chủ. Vui lòng thử lại.');
  }
  async function load() { setDashboard(await request<Dashboard>('admin-access')); }
  useEffect(() => { let active = true; request<Dashboard>('admin-access').then(data => { if (active) setDashboard(data); }).catch(error => { if (active && !(error instanceof AdminError && error.status === 401)) fail(error); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  async function signIn(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      if (sent) { await request('login', 'POST', { email: 'genyzstudio@gmail.com', code }); await load(); setCode(''); }
      else { const data = await request<{message: string}>('request-code', 'POST', { email: 'genyzstudio@gmail.com' }); setSent(true); setNotice(data.message); }
    } catch (error) { fail(error); } finally { setBusy(false); }
  }
  return <main className="wa-page"><header><Link href="/">← GenYZ Studio</Link><p>QUẢN TRỊ WORKSHOP</p><h1>Quyền truy cập bài học</h1><p>Thiết lập riêng cho từng workshop, áp dụng cho cả bản tiếng Việt và tiếng Anh.</p></header>
    {error && <p className="wk-error" role="alert">{error}</p>}
    {loading ? <p role="status">Đang kiểm tra phiên đăng nhập…</p> : !dashboard ? <form className="wa-card wa-login" onSubmit={signIn}><h2>Đăng nhập quản trị</h2><p>Mã xác thực được gửi đến <strong>genyzstudio@gmail.com</strong>.</p>
      {sent && <label>Mã đăng nhập<input autoFocus aria-label="Mã đăng nhập" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" required minLength={6} maxLength={6} value={code} onChange={event => setCode(event.target.value)} /></label>}
      <button className="button button-primary" disabled={busy}>{busy ? 'Đang xử lý…' : sent ? 'Đăng nhập' : 'Gửi mã đăng nhập'}</button>
      {sent && <button type="button" className="wk-text-button" disabled={busy} onClick={() => { setSent(false); setCode(''); setNotice(''); }}>Yêu cầu mã mới</button>}<p role="status">{notice}</p>
    </form> : <><div className="wa-account"><span>{dashboard.email}</span><button className="wk-text-button" disabled={busy} onClick={async () => { setBusy(true); try { await request('logout', 'POST', {}); setDashboard(null); setSent(false); setCode(''); setError(''); } catch (error) { fail(error); } finally { setBusy(false); } }}>Đăng xuất</button></div>
      <p>Thay đổi có hiệu lực với các yêu cầu tải nội dung tiếp theo. Nội dung đã tải hoặc sao chép trước đó không thể thu hồi. Ảnh/video dùng chung với bài công khai cũng sẽ công khai.</p>
      <div className="wa-grid">{dashboard.courses.map(course => <AccessEditor key={course.id} course={course} onSaved={async () => { setError(''); await load(); }} onError={fail} />)}</div>
    </>}
  </main>;
}
