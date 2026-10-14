'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { WorkshopImage as Image } from './workshop-image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Copy, DownloadSimple, LockKey, SignOut, BookOpen } from '@phosphor-icons/react';
import { Wordmark } from './header';
import { LanguageSwitch } from './language-switch';
import type { LessonStep, WorkshopContent, WorkshopLesson, WorkshopProgress } from '../content/workshop/types';
import type { PipelineId } from '../content/pipeline';
import { workshopText, type WorkshopLocale } from '../content/workshop/copy';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';
import { siteConfig } from '../config/site';

class AccessError extends Error { constructor(message: string, public status: number) { super(message); } }
async function api<T>(locale: WorkshopLocale, route: string, method = 'GET', body?: unknown, signal?: AbortSignal): Promise<T> {
  const t = workshopText(locale);
  const result = await fetch(`/api/workshop/${route}${route.includes("?") ? "&" : "?"}locale=${locale}`, { method, credentials: 'same-origin', cache: 'no-store', signal,
    ...(body !== undefined ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
  });
  if (!result.headers.get('Content-Type')?.includes('application/json')) throw new AccessError(t("Lớp học chưa kết nối được. Vui lòng thử lại sau hoặc liên hệ GenYZ."), 503);
  const payload = await result.json();
  if (!result.ok) throw new AccessError(payload.error || t("Có lỗi kết nối. Vui lòng thử lại."), result.status);
  return payload as T;
}
function DownloadWorkbook({ content, locale }: { content: WorkshopContent; locale: WorkshopLocale }) {
  const t = workshopText(locale);
  function download() {
    const text = formatWorkshopWorkbook(content, locale);
    const url = URL.createObjectURL(new Blob(['\uFEFF', text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `${content.workbookName || 'GenYZ-Clever-Rat'}-workbook-${locale}.txt`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <button className="wk-text-button" onClick={download}><DownloadSimple size={18} aria-hidden="true" />{t("Tải sổ thực hành")}</button>;
}
function Prompt({ text, locale, language = "en" }: { text: string; locale: WorkshopLocale; language?: "vi" | "en" }) {
  const t = workshopText(locale);
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return <div className="wk-prompt"><div className="wk-prompt-top"><span>{language === "vi" ? "Prompt tiếng Việt" : t("Prompt (English) · sửa phần [trong ngoặc] nếu có")}</span><button onClick={async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setFailed(false); }
    catch { setFailed(true); }
  }}><Copy size={16} aria-hidden="true" />{copied ? t("Đã sao chép") : t("Sao chép")}</button></div><pre lang={language} tabIndex={0}>{text}</pre><span role="status" className={failed ? 'wk-copy-error' : 'sr-only'}>{failed ? t("Không sao chép tự động được. Chọn phần văn bản phía trên để sao chép thủ công.") : copied ? t("Đã sao chép prompt.") : ''}</span></div>;
}
export function StepPrompt({ step, locale }: { step: LessonStep; locale: WorkshopLocale }) {
  if (!step.prompt) return null;
  const vi = locale === 'vi';
  const example = step.testedExample;
  return <div className="wk-step-prompt">
    {step.promptEvidence && <p className="wk-small">{step.promptEvidence}</p>}
    {step.promptVi && !step.promptEvidence && <p className="wk-small">{example
      ? (vi ? 'Đã thử tạo ảnh bằng câu lệnh tiếng Việt · xem kết quả bên dưới.' : 'Image tested with the Vietnamese prompt; see the result below.')
      : step.promptKind === 'video'
        ? (vi ? 'Câu lệnh này chưa chạy thử. Các câu lệnh đã thử và video kết quả nằm ở phần ví dụ của bài học.' : 'This exact prompt has not been run. Tested prompts and their videos are in this level’s examples.')
        : (vi ? 'Câu lệnh này chưa chạy thử. Hãy kiểm tra kết quả sau khi tạo.' : 'This prompt has not been run. Review its output after generation.')}</p>}
    {step.referenceImages?.length ? <details><summary>{vi ? 'Ảnh mẫu cần tải lên' : 'Reference images to upload'}</summary><ul>{step.referenceImages.map(input => <li key={input.src}><a href={input.src} target="_blank" rel="noreferrer">{input.label}</a></li>)}</ul></details> : null}
    <Prompt text={vi && step.promptVi ? step.promptVi : step.prompt} locale={locale} language={vi && step.promptVi ? 'vi' : step.promptLanguage || 'en'} />
    {step.promptVi && <details className="wk-prompt-alternative"><summary>{vi ? 'Bản tiếng Anh — dùng khi cần' : 'Vietnamese version'}</summary><Prompt text={vi ? step.prompt : step.promptVi} locale={locale} language={vi ? 'en' : 'vi'} /></details>}
    {step.resultText && <section className="wk-planning-result"><h3>{vi ? 'Bản phân tích mẫu' : 'Worked planning response'}</h3><pre>{step.resultText}</pre></section>}
    {example && <figure className="wk-tested-example">
      <h3>{vi ? 'Kết quả đã tạo từ câu lệnh tiếng Việt' : 'Result generated with the Vietnamese prompt'}</h3>
      {example.inputImage && <details><summary>{vi ? 'Ảnh đầu vào đã dùng' : 'Input image used'}</summary><Image src={example.inputImage} alt={vi ? 'Ảnh đầu vào để so với kết quả chỉnh sửa' : 'Input image for comparison with the edit'} width={example.inputWidth || example.width} height={example.inputHeight || example.height} sizes="(max-width: 760px) 100vw, 700px" /></details>}
      <a href={example.image} target="_blank" rel="noreferrer"><Image src={example.image} alt={example.alt} width={example.width} height={example.height} sizes="(max-width: 760px) 100vw, 700px" /></a>
      <figcaption><p>{example.review}</p></figcaption>
    </figure>}
  </div>;
}
export function WorkshopVisualExamples({ lesson, locale }: { lesson: WorkshopLesson; locale: WorkshopLocale }) {
  if (!lesson.visualExamples?.length) return null;
  const en = locale === 'en';
  return <section className="wk-visual-examples" id={`visuals-${lesson.id}`}>
    <h2>{en ? 'Watch, compare, then try' : 'Xem kết quả, so sánh rồi làm thử'}</h2>
    {lesson.visualExamples.map(example => <article className="wk-visual-example" key={example.id}>
      <h3>{example.title}</h3><p>{example.instruction}</p>
      <div className="wk-visual-grid">{example.outputs.map(output => <figure key={output.src}>
        <h4>{output.label}</h4>
        {output.kind === 'video' ? <video controls preload="none" playsInline width={output.width} height={output.height} poster={output.poster} src={output.src} aria-label={output.label} /> : <a href={output.src} target="_blank" rel="noreferrer"><Image src={output.src} alt={output.label} width={output.width} height={output.height} sizes="(max-width: 760px) 100vw, 700px" /></a>}
        <a className="wk-text-button" href={output.src} download>{en ? 'Download' : 'Tải file'} · {output.label}</a>
      </figure>)}</div>
      <p className="wk-visual-review">{example.review}</p>
      <details><summary>{en ? 'Reproduce this example' : 'Cách tạo lại ví dụ này'}</summary>
        <p>{example.settings}</p>
        {example.inputs.length > 0 && <ul>{example.inputs.map(input => <li key={input.src}><a href={input.src} target="_blank" rel="noreferrer">{input.label}</a></li>)}</ul>}
        {example.promptVi && <Prompt text={example.promptVi} locale={locale} language="vi" />}
      </details>
    </article>)}
  </section>;
}
export function StepMedia({ step, locale }: { step: LessonStep; locale: WorkshopLocale }) {
  if (!step.media?.length) return null;
  return <><div className="wk-visual-grid">{step.media.map(output => <figure key={output.src}>
    <h3>{output.label}</h3>
    {output.kind === 'video' ? <video controls preload="none" playsInline width={output.width} height={output.height} poster={output.poster} src={output.src} aria-label={output.label} /> : <a href={output.src} target="_blank" rel="noreferrer"><Image src={output.src} alt={output.label} width={output.width} height={output.height} sizes="(max-width: 760px) 100vw, 700px" /></a>}
    <a className="wk-text-button" href={output.src} download>{locale === 'vi' ? 'Tải file' : 'Download'} · {output.label}</a>
  </figure>)}</div>{step.resultReview && <p className="wk-visual-review">{step.resultReview}</p>}</>;
}
function Preparation({ content, locale }: { content: WorkshopContent; locale: WorkshopLocale }) {
  const t = workshopText(locale);
  const { preparation, tools, glossary } = content;
  return <section className="wk-preparation" aria-labelledby="prepare-title">
    <div><h2 id="prepare-title">{preparation.title}</h2><p>{preparation.intro}</p></div>
    {content.source && <p className="wk-source"><a href={content.source.href} target="_blank" rel="noreferrer">{content.source.author} · {content.source.title}</a><br />{content.source.note}</p>}
    <ol className={preparation.visualGuide ? 'wk-workflow-map' : 'wk-setup-list'} aria-label={locale === 'vi' ? 'Quy trình thực hành' : 'Practice workflow'}>{preparation.steps.map((step, index) => <li key={step.heading}>{preparation.visualGuide && <span className="wk-workflow-number" aria-hidden="true">{index + 1}</span>}<strong>{step.heading}</strong><p>{step.text}</p>{preparation.visualGuide && index < preparation.steps.length - 1 && <span className="wk-workflow-arrow" aria-hidden="true">→</span>}</li>)}</ol>
    {preparation.toolPaths && <div className="wk-tool-paths">{preparation.toolPaths.map(path => <section key={path.title}><h3>{path.title}</h3><ol>{path.steps.map(item => <li key={item}>{item}</li>)}</ol></section>)}</div>}
    {preparation.visualGuide?.map(guide => <section className="wk-concept-card" key={guide.title}>
      <h3>{guide.title}</h3><p>{guide.intro}</p>
      <a href={guide.image} target="_blank" rel="noreferrer"><Image src={guide.image} alt={`${guide.title}: ${guide.captions.join('; ')}`} width={guide.width} height={guide.height} sizes="(max-width: 760px) 100vw, 900px" /></a>
      <ol className="wk-concept-captions">{guide.captions.map(caption => <li key={caption}>{caption}</li>)}</ol>
      <p className="wk-concept-try"><strong>{locale === 'vi' ? 'Làm thử: ' : 'Try: '}</strong>{guide.tryIt}</p>
      {guide.recreation && <details className="wk-recreate">
        <summary>{locale === 'vi' ? 'Xem prompt và tải ảnh tham chiếu' : 'Recreate this comparison · prompt & references'}</summary>
        <p>{guide.recreation.evidence}</p>
        {guide.recreation.references.map(reference => <figure key={reference.src}>
          <a href={reference.src} target="_blank" rel="noreferrer"><Image src={reference.src} alt={reference.label} width={reference.width} height={reference.height} sizes="(max-width: 760px) 100vw, 360px" /></a>
          <figcaption><a href={reference.src} download>{locale === 'vi' ? 'Tải ảnh mẫu: ' : 'Download reference: '}{reference.label}</a></figcaption>
        </figure>)}
        <ol>{guide.recreation.instructions.map(instruction => <li key={instruction}>{instruction}</li>)}</ol>
        <Prompt text={guide.recreation.promptVi} locale={locale} language="vi" />
      </details>}
    </section>)}
    <div className="wk-tools">{tools.map(tool => <div key={tool.name}><a href={tool.href} target="_blank" rel="noreferrer">{tool.name} <ArrowRight size={15} aria-hidden="true" /></a><p>{tool.purpose}</p></div>)}</div>
    <details className="wk-glossary"><summary>{glossary.length} {t("thuật ngữ bạn sẽ gặp")}</summary><dl>{glossary.map(([term, definition]) => <div key={term}><dt lang="en">{term}</dt><dd>{definition}</dd></div>)}</dl></details>
    <p className="wk-small">{preparation.note}</p>
  </section>;
}
export function WorkshopTechniqueLibrary({ lesson, locale }: { lesson: WorkshopLesson; locale: WorkshopLocale }) {
  if (!lesson.techniques?.length) return null;
  const en = locale === 'en';
  return <section className="wk-techniques" id={`techniques-${lesson.id}`}>
    <p className="wk-eyebrow">{lesson.techniques.length} {en ? 'detailed labs' : 'bài thực hành chi tiết'}</p>
    <h2>{en ? 'Techniques & examples' : 'Kỹ thuật & ví dụ thực hành'}</h2>
    <p>{en ? 'Open a lab to see its inputs, method, prompt, deliverables and review criteria. Choose the techniques your project needs; the core checklist tracks the main lesson.' : 'Mở từng bài để xem đầu vào, cách làm, prompt, file cần lưu và tiêu chí duyệt. Chọn kỹ thuật dự án cần; checklist hoàn thành áp dụng cho lộ trình chính.'}</p>
    {lesson.techniques.map((lab, index) => <details key={lab.id} className="wk-technique">
      <summary><span>{String(index + 1).padStart(2, '0')}</span> {lab.title}</summary>
      <div className="wk-technique-body"><p>{lab.goal}</p><p className="wk-input"><strong>{en ? 'Inputs: ' : 'Đầu vào: '}</strong>{lab.input}</p>
        <ol className="wk-steps">{lab.steps.map((step, i) => <li key={step.title}><span className="wk-step-count" aria-hidden="true">{i + 1}</span><div><p className="wk-tool-label">{step.tool}</p><h3>{step.title}</h3><p>{step.instruction}</p>{step.prompt && <StepPrompt step={step} locale={locale} />}<StepMedia step={step} locale={locale} /><p className="wk-save"><strong>{en ? 'Save: ' : 'Lưu lại: '}</strong>{step.save}</p></div></li>)}</ol>
        <p className="wk-technique-check"><strong>{en ? 'Review: ' : 'Kiểm tra: '}</strong>{lab.check}</p>
        <p><strong>{en ? 'If it fails: ' : 'Nếu chưa đạt: '}</strong>{lab.fix}</p>
      </div>
    </details>)}
  </section>;
}
export function Lesson({ locale, lesson, workshopSyllabus, completed, busy, onComplete }: { locale: WorkshopLocale; workshopSyllabus: WorkshopContent['syllabus']; lesson: WorkshopLesson; completed: boolean; busy: boolean; onComplete: () => void }) {
  const t = workshopText(locale);
  const [checked, setChecked] = useState<string[]>(completed ? lesson.checks : []);
  const syllabus = workshopSyllabus.find(module => module.id === lesson.id)!;
  const index = workshopSyllabus.indexOf(syllabus);
  return <article className="wk-lesson" aria-labelledby="lesson-title">
    <p className="wk-eyebrow">Module {String(index + 1).padStart(2, '0')} · {syllabus.minutes} {t("phút thực hành dự kiến")}</p>
    <h1 id="lesson-title" lang={locale} tabIndex={-1}>{syllabus.title}</h1><p className="wk-lesson-goal">{lesson.goal}</p>
    <div className="wk-input"><BookOpen size={22} aria-hidden="true" /><div><strong>{t("Trước khi bắt đầu")}</strong><p>{lesson.input}</p><p className="wk-small">{lesson.terms}</p></div></div>
    {lesson.visualExamples?.length ? <a className="wk-text-button" href={`#visuals-${lesson.id}`}>{locale === 'en' ? 'Watch the tested examples ↓' : 'Xem ảnh và video đã tạo thử ↓'}</a> : null}
    {lesson.techniques?.length ? <a className="wk-text-button" href={`#techniques-${lesson.id}`}>{locale === 'en' ? `Explore ${lesson.techniques.length} detailed technique labs ↓` : `Khám phá ${lesson.techniques.length} bài kỹ thuật chi tiết ↓`}</a> : null}
    <ol className="wk-steps">{lesson.steps.map((step, i) => <li key={step.title}>
      <span className="wk-step-count" aria-hidden="true">{i + 1}</span><div><p className="wk-tool-label">{step.tool}</p><h2>{step.title}</h2><p>{step.instruction}</p>{step.prompt && <StepPrompt step={step} locale={locale} />}<StepMedia step={step} locale={locale} /><p className="wk-save"><DownloadSimple size={16} aria-hidden="true" /><span><strong>{t("Lưu lại:")}</strong> {step.save}</span></p></div>
    </li>)}</ol>
    <WorkshopVisualExamples lesson={lesson} locale={locale} />
    <WorkshopTechniqueLibrary lesson={lesson} locale={locale} />
    <section className="wk-example"><p className="wk-eyebrow">{t("Góc nhìn từ studio")}</p><h2>{lesson.example.title}</h2><p>{lesson.example.text}</p>
      {lesson.example.image && <Image src={lesson.example.image} alt={lesson.example.title} width={960} height={540} sizes="(max-width: 760px) 100vw, 700px" />}
      {lesson.example.video && <video controls preload="none" playsInline poster={lesson.example.poster} src={lesson.example.video} aria-label={lesson.example.title} />}
      {lesson.example.audio && <audio controls preload="none" src={lesson.example.audio} aria-label={lesson.example.title} />}
      {lesson.example.href && <a className="wk-text-button" href={lesson.example.href} target="_blank" rel="noreferrer">{locale === "en" ? "Watch source chapter" : "Xem chương video nguồn"} <ArrowRight size={16} aria-hidden="true" /></a>}
      <a className="wk-text-button" href={locale === "en" ? "/en#pipeline-map" : "/#pipeline-map"} target="_blank" rel="noreferrer">{t("Khám phá tư liệu các phim")} <ArrowRight size={16} aria-hidden="true" /></a>
    </section>
    <section className="wk-fixes"><h2>{t("Nếu kết quả chưa như ý")}</h2>{lesson.troubleshooting.map(item => <details key={item.problem}><summary>{item.problem}</summary><p>{item.fix}</p></details>)}</section>
    <fieldset className="wk-checklist"><legend>{t("Kiểm tra trước khi đi tiếp")}</legend><p>{t("Tự kiểm tra đầu ra của bạn, rồi đánh dấu từng mục.")}</p>{lesson.checks.map(check => <label key={check}><input type="checkbox" checked={checked.includes(check)} disabled={completed || busy} onChange={event => setChecked(event.target.checked ? [...checked, check] : checked.filter(item => item !== check))} /><span>{check}</span></label>)}
      <button className="button button-primary" disabled={busy || (!completed && checked.length !== lesson.checks.length)} onClick={onComplete}><Check size={18} aria-hidden="true" />{busy ? t("Đang lưu…") : completed ? t("Đánh dấu cần ôn lại") : t("Lưu hoàn thành module")}</button>
      {completed && <p className="wk-small">{t("Module đã hoàn thành. Bạn vẫn có thể đọc lại và sao chép prompt.")}</p>}
    </fieldset>
  </article>;
}

export function WorkshopClassroom({ locale = "vi", course = "clever-rat" }: { locale?: WorkshopLocale; course?: "clever-rat" | "five-levels" | "master-frame" | "directors-framework" | "fight-scenes" }) {
  const t = workshopText(locale);
  const home = locale === "en" ? "/en" : "/";
  const [content, setContent] = useState<WorkshopContent | null>(null);
  const [selected, setSelected] = useState<PipelineId>('story');
  const [preparing, setPreparing] = useState(course === 'master-frame' || course === 'directors-framework' || course === 'fight-scenes');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const lessonArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    api<WorkshopContent>(locale, `content?course=${course}`, 'GET', undefined, controller.signal).then(data => { setContent(data); setSelected(data.progress.current); }).catch(err => {
      if (err.name !== 'AbortError' && !(err instanceof AccessError && err.status === 401)) setError(err instanceof AccessError ? err.message : t("Không kết nối được lớp học. Kiểm tra mạng và thử lại."));
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [locale, t, course]);
  useEffect(() => {
    if (!content) return;
    const timer = setTimeout(() => { setContent(null); setError(t("Phiên học đã hết hạn. Nhập lại mã để tiếp tục.")); }, Math.max(0, content.sessionExpiresAt - Date.now()));
    return () => clearTimeout(timer);
  }, [content, t]);
  const fail = (err: unknown) => {
    if (err instanceof AccessError && err.status === 401) setContent(null);
    setError(err instanceof AccessError ? err.message : t("Mất kết nối. Tiến độ chưa được lưu; vui lòng thử lại."));
  };
  async function requestCode(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const result = await api<{message: string}>(locale, 'request-code', 'POST', { email });
      setSent(true); setNotice(result.message); setCode('');
      requestAnimationFrame(() => input.current?.focus());
    } catch (err) { fail(err); } finally { setBusy(false); }
  }
  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      await api(locale, 'login', 'POST', { email, code });
      const data = await api<WorkshopContent>(locale, `content?course=${course}`);
      setContent(data); setSelected(data.progress.current); setCode(''); setPreparing(course === 'master-frame' || course === 'directors-framework' || course === 'fight-scenes');
      requestAnimationFrame(() => lessonArea.current?.focus());
    } catch (err) { fail(err); } finally { setBusy(false); }
  }
  async function saveProgress(progress: WorkshopProgress) {
    setBusy(true); setError(''); setNotice('');
    try { await api(locale, `progress?course=${course}`, 'PUT', progress); setContent(previous => previous ? { ...previous, progress } : null); setNotice(t("Đã lưu tiến độ.")); }
    catch (err) { fail(err); } finally { setBusy(false); }
  }
  async function navigate(id: PipelineId) {
    if (!content) return;
    setSelected(id); setPreparing(false);
    lessonArea.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    requestAnimationFrame(() => lessonArea.current?.focus());
    await saveProgress({ ...content.progress, current: id });
  }
  const workshopSyllabus = content?.syllabus || [];
  const workshopPhases = content?.phases || [];
  const index = workshopSyllabus.findIndex(module => module.id === selected);
  const completed = content?.progress.completed || [];
  const lesson = content?.lessons.find(item => item.id === selected);

  return <div className="wk-page">
    <a href="#classroom" className="skip-link">{t("Đến nội dung học")}</a>
    <header className="wk-header"><Link href={home} aria-label={t("GenYZ Studio — trang chủ")}><Wordmark /></Link><span className="wk-header-label">{t("Lớp học trực tuyến")} <span>{t("Tiếng Việt")}</span></span><LanguageSwitch locale={locale} page="workshop" course={course} /><Link href={home} className="wk-back"><ArrowLeft size={16} aria-hidden="true" />{t("Về studio")}</Link></header>
    <nav className="wk-course-nav" aria-label={locale === 'en' ? 'Choose a workshop' : 'Chọn workshop'}>
      <a href={`${locale === 'en' ? '/en' : ''}/workshop`} aria-current={course === 'clever-rat' ? 'page' : undefined}>{locale === 'en' ? 'The Clever Little Rat' : 'Chú chuột nhỏ thông minh'}</a>
      <a href={`${locale === 'en' ? '/en' : ''}/workshop/five-levels`} aria-current={course === 'five-levels' ? 'page' : undefined}>{locale === 'en' ? '5 Levels of AI Filmmaking' : '5 cấp độ làm phim AI'}</a>
      <a href={`${locale === 'en' ? '/en' : ''}/workshop/master-frame`} aria-current={course === 'master-frame' ? 'page' : undefined}>{locale === 'en' ? 'Master the Frame' : 'Làm chủ khung hình'}</a>
      <a href={`${locale === 'en' ? '/en' : ''}/workshop/fight-scenes`} aria-current={course === 'fight-scenes' ? 'page' : undefined}>{locale === 'en' ? 'AI Action Scenes' : 'Dàn dựng cảnh hành động'}</a>
      <a href={`${locale === 'en' ? '/en' : ''}/workshop/directors-framework`} aria-current={course === 'directors-framework' ? 'page' : undefined}>{locale === 'en' ? 'Director’s Framework' : 'Tư duy đạo diễn'}</a>
    </nav>
    {!content ? <main id="classroom" className="wk-public">
      <section className="wk-welcome"><div className="wk-welcome-copy"><p className="wk-eyebrow">GenYZ Studio · {course === "five-levels" ? (locale === "en" ? "5 Levels of AI Filmmaking" : "5 cấp độ làm phim AI") : "Workshop"}</p><h1>{t("Lớp học riêng.")}<br /><em>{t("Truy cập bằng mã.")}</em></h1><p>{t("Dùng email đã được cấp quyền học để nhận mã đăng nhập. Nội dung workshop chỉ mở sau khi xác thực email và mã.")}</p></div>
        <div className="wk-admission"><div className="wk-ticket-heading"><LockKey size={28} aria-hidden="true" /><span>{t("Vé vào lớp học")}</span></div><h2>{t("Đăng nhập bằng email")}</h2><p>{t("Nhập email đã đăng ký để nhận mã đăng nhập qua hộp thư.")}</p><form onSubmit={sent ? login : requestCode}>
          <label htmlFor="workshop-email">Email</label><input id="workshop-email" type="email" autoComplete="email" required maxLength={254} value={email} disabled={busy} onChange={event => { setEmail(event.target.value); setSent(false); setNotice(''); setCode(''); }} placeholder="you@example.com" />
          {sent && <><label htmlFor="workshop-code">{t("Mã truy cập")}</label><input id="workshop-code" ref={input} value={code} onChange={event => setCode(event.target.value)} type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" required minLength={6} maxLength={6} aria-describedby="login-help" placeholder="000000" /></>}
          <button className="button button-primary" type="submit" disabled={busy || loading}>{loading ? t("Đang kiểm tra phiên học…") : busy ? t("Đang xử lý…") : sent ? t("Vào học") : t("Gửi mã đăng nhập")}<ArrowRight size={18} aria-hidden="true" /></button>
          {sent && <button type="button" className="wk-text-button" disabled={busy} onClick={() => { setSent(false); setNotice(''); setCode(''); }}>{t("Yêu cầu mã mới")}</button>}
          </form>{notice && <p role="status" className="wk-small">{notice}</p>}
          <p id="login-help" className="wk-small">{t("Mã dùng một lần, hết hạn sau 10 phút. Đợi ít nhất 60 giây trước khi yêu cầu mã mới. Tiến độ được lưu theo email.")}</p>{error && <p className="wk-error" role="alert">{error}</p>}
          <div className="wk-ticket-bottom"><strong>{t("Chưa có quyền học?")}</strong><a href={siteConfig.contact.zaloUrl} target="_blank" rel="noreferrer">{t("Liên hệ GenYZ qua Zalo")} <ArrowRight size={16} aria-hidden="true" /></a><p>{t("GenYZ hiện xác nhận thanh toán và cấp quyền học theo email. Thanh toán MoMo chưa mở.")}</p></div>
        </div>
      </section>
    </main> : <main id="classroom" className="wk-classroom">
      <aside className="wk-sidebar"><div className="wk-sidebar-title"><p className="wk-eyebrow">{t("Phim đầu tiên của bạn")}</p><h2>{content.courseTitle}</h2></div><label className="wk-progress-label" htmlFor="course-progress">{completed.length}/{workshopSyllabus.length} {t("module hoàn thành")}</label><progress id="course-progress" value={completed.length} max={workshopSyllabus.length} />
        <nav aria-label={t("Nội dung workshop")}><button className="wk-prepare-button" aria-current={preparing ? 'page' : undefined} onClick={() => setPreparing(true)}>{(course === 'master-frame' || course === 'directors-framework' || course === 'fight-scenes') ? (locale === 'vi' ? 'Bắt đầu: quy trình tổng thể' : 'Start · Overall workflow') : t("Chuẩn bị & thuật ngữ")}</button>{workshopPhases.map((phase, p) => <div key={phase} className="wk-nav-phase"><h3 lang="en">{phase}</h3>{workshopSyllabus.filter(module => module.phase === p).map(module => <button key={module.id} disabled={busy} aria-current={!preparing && selected === module.id ? 'step' : undefined} onClick={() => void navigate(module.id)}><span>{completed.includes(module.id) ? <Check size={17} aria-label={t("Đã hoàn thành")} /> : String(workshopSyllabus.indexOf(module) + 1).padStart(2, '0')}</span><span className="wk-nav-title" lang="en">{module.title}</span></button>)}</div>)}</nav>
        <DownloadWorkbook locale={locale} content={content} /><p className="wk-small">{t("Sổ gồm hướng dẫn và prompt để thực hành ngoại tuyến. Tiến độ chỉ được lưu khi có kết nối.")}</p><button className="wk-text-button" disabled={busy} onClick={async () => {
          setBusy(true); setError('');
          try { await api(locale, 'logout', 'POST', {}); setContent(null); setNotice(''); setCode(''); }
          catch (err) { fail(err); } finally { setBusy(false); }
        }}><SignOut size={17} aria-hidden="true" />{t("Đăng xuất")}</button>
      </aside>
      <div className="wk-lesson-area" ref={lessonArea} tabIndex={-1}>
        <div className="wk-status" aria-live="polite">{notice}</div>{error && <p className="wk-error" role="alert">{error}</p>}
        {completed.length === workshopSyllabus.length && <div className="wk-finished"><Check size={25} aria-hidden="true" /><div><strong>{t("Bạn đã đi hết quy trình!")}</strong><p>{course === 'master-frame' ? (locale === 'vi' ? 'Lưu lại các frame, storyboard và sổ thực hành. Hãy thử áp dụng quy trình này cho một câu chuyện của riêng bạn.' : 'Save your frames, storyboard and workbook. Try applying this workflow to your own story.') : t("Giữ bản phim và sổ thực hành. Bây giờ hãy thử kể một câu chuyện của riêng bạn.")}</p></div></div>}
        {preparing ? <><Preparation locale={locale} content={content} /><button className="button button-primary" disabled={busy} onClick={() => (course === 'master-frame' || course === 'directors-framework' || course === 'fight-scenes') ? void navigate('story') : setPreparing(false)}>{course === 'fight-scenes' ? (locale === 'vi' ? 'Bắt đầu · Quy tắc đọc cảnh' : 'Start · Readable action') : course === 'directors-framework' ? (locale === 'vi' ? 'Bắt đầu · Hai shot, một câu chuyện' : 'Start · Two shots, one story') : course === 'master-frame' ? (locale === 'vi' ? 'Bắt đầu ví dụ · Hộ Vệ Sông Hồng' : 'Start the example · Guardians of the Red River') : t("Trở lại bài học")} <ArrowRight size={18} /></button></> : lesson && <>
          <Lesson locale={locale} key={`${lesson.id}-${completed.includes(lesson.id)}`} lesson={lesson} workshopSyllabus={workshopSyllabus} completed={completed.includes(lesson.id)} busy={busy} onComplete={() => void saveProgress({ current: selected, completed: completed.includes(selected) ? completed.filter(id => id !== selected) : [...completed, selected] })} />
          <nav className="wk-lesson-navigation" aria-label={t("Chuyển module")}><button disabled={index === 0 || busy} onClick={() => void navigate(workshopSyllabus[index - 1].id)}><ArrowLeft size={18} aria-hidden="true" />{t("Module trước")}</button><span>{index + 1} / {workshopSyllabus.length}</span><button disabled={index === workshopSyllabus.length - 1 || busy} onClick={() => void navigate(workshopSyllabus[index + 1].id)}>{t("Module sau")}<ArrowRight size={18} aria-hidden="true" /></button></nav>
        </>}
      </div>
    </main>}
    <footer className="wk-footer"><span>{t("GenYZ Studio · Học bằng cách làm.")}</span><a href={siteConfig.contact.zaloUrl} target="_blank" rel="noreferrer">{t("Cần hỗ trợ? Liên hệ qua Zalo")}</a></footer>
  </div>;
}
