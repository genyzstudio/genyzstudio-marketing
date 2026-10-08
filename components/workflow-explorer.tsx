'use client';

import { useRef, useState } from 'react';
import { useProjectSelection } from './project-selection';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, ArrowLeft, X, ArrowsClockwise } from '@phosphor-icons/react';
import { getWorkflows, getSelectedWorkflow, workflowCopy } from '@/content/workflows';
import type { Locale } from '@/content/locales';
import { getPipeline, getPipelineEvidence, pipelineCopy, type PipelineId } from '@/content/pipeline';
import { LoopClip } from './loop-clip';
import { VideoPlayer } from './video-player';
import { StoryboardSequence } from './storyboard-sequence';
import { PipelineArt } from './pipeline-art';

export function WorkflowExplorer({ locale }: { locale: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);
  const en = locale === 'en';
  const projects = getWorkflows(locale);
  const copy = workflowCopy[locale];
  const { selectedUrl, selectProject } = useProjectSelection();
  const [stageId, setStageId] = useState<PipelineId>('story');
  const pipeline = getPipeline(locale);
  const processCopy = pipelineCopy[locale];
  const step = pipeline.find(item => item.id === stageId)!;
  const project = getSelectedWorkflow(locale, selectedUrl);
  const projectId = project.id;
  const stage = getPipelineEvidence(project, stageId, locale);

  return <section id="cau-chuyen" className="section case-study" aria-labelledby="workflow-title"><div className="shell">
    <div className="case-intro"><h2 id="workflow-title">{copy.title}</h2><p>{copy.description}</p></div>
    <div className="workflow-projects" role="group" aria-label={copy.projects}>
      {projects.map(item => <button type="button" key={item.id} aria-pressed={item.id === projectId} aria-controls="pipeline-map" onClick={() => selectProject(item.stages.film!.film!.url)}>
        <Image src={item.cover} alt="" width={640} height={360} sizes="(max-width: 760px) 230px, 33vw" />
        <span className="workflow-project-title">{item.title}<ArrowUpRight size={18} aria-hidden="true" /></span><span className="workflow-project-subtitle">{item.subtitle}</span>
      </button>)}
    </div>
    <div className="pipeline-heading"><h3>{processCopy.title}</h3><p>{processCopy.intro}</p><p className="workflow-context" aria-live="polite">{processCopy.selected}: {project.title}</p></div>
    <p className="journey-instruction">{en ? 'Explore the making of a film. Choose any step to look inside.' : 'Khám phá cách làm nên bộ phim. Chọn một bước để xem chi tiết.'}</p>
    <div id="pipeline-map" className="journey-map" role="group" aria-label={copy.stages}>
      {processCopy.phases.map((phase, phaseIndex) => <div className="journey-phase" key={phase}>
        <div className="journey-phase-heading"><span>0{phaseIndex + 1}</span><h4>{phase}</h4><p>{(en ? ['Imagine the story','Bring it to life','Make it a film'] : ['Hình dung câu chuyện','Thổi hồn vào hình ảnh','Kết nối thành bộ phim'])[phaseIndex]}</p></div>
        <ol>{pipeline.filter(item => item.phase === phaseIndex).map(item => <li key={item.id}>
          <button className="journey-node" type="button" aria-label={item.title} aria-haspopup="dialog" aria-controls="pipeline-detail" onClick={() => { setStageId(item.id); setOpened(true); dialog.current?.showModal(); }}>
            <PipelineArt id={item.id} project={project} locale={locale}/>
            <span className="journey-node-copy"><span className="journey-node-number">{String(pipeline.findIndex(p=>p.id===item.id)+1).padStart(2,'0')}</span><span><strong>{item.title}</strong><small>{item.id === 'edit' || item.id === 'sound' || item.id === 'review' ? (en ? 'Illustrated method' : 'Minh hoạ phương pháp') : getPipelineEvidence(project,item.id,locale) ? (item.id === 'planning' ? (en ? 'Original storyboard' : 'Storyboard gốc') : processCopy.evidence) : processCopy.method}</small></span><ArrowUpRight size={18}/></span>
          </button>
        </li>)}</ol>
        {phaseIndex === 1 && <div className="journey-loop"><ArrowsClockwise size={18}/><span>{processCopy.loop}</span></div>}
      </div>)}
    </div>
    <dialog ref={dialog} id="pipeline-detail" className="journey-dialog" aria-labelledby="step-title" onClose={() => setOpened(false)} onClick={event => { if (event.target === dialog.current) { const box = dialog.current.getBoundingClientRect(); if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current.close(); } }}>
    <div className="journey-dialog-top"><p>{project.title}<span>{processCopy.phases[step.phase]} / {String(pipeline.indexOf(step)+1).padStart(2,'0')}</span></p><button type="button" onClick={()=>dialog.current?.close()} aria-label={en ? 'Close step' : 'Đóng bước'}><X size={24}/></button></div>
    <div className="pipeline-detail" aria-live="polite"><h3 id="step-title">{step.title}</h3><p>{step.action}</p><dl><div><dt>{processCopy.output}</dt><dd>{step.output}</dd></div><div><dt>{processCopy.check}</dt><dd>{step.check}</dd></div></dl></div>
    {project.notice && <p className="workflow-notice" role="status">{project.notice}</p>}
    {opened && (stage ? <div className="workflow-panel" id="workflow-panel" key={`${projectId}-${stageId}`}>
      <div className="workflow-media">
        {stage.audio && <div className="workflow-audio">{stage.audio.map(track => <label key={track.src}>{track.label}<audio controls preload="none" src={track.src} onPlay={event => { const current = event.currentTarget; current.closest('.workflow-audio')?.querySelectorAll('audio').forEach(player => { if(player !== current) player.pause(); }); }}/></label>)}</div>}
        {stage.film && <><VideoPlayer locale={locale} video={stage.film} /><a className="text-link" href={stage.film.url} target="_blank" rel="noopener noreferrer">{locale === 'en' ? `Watch on ${stage.film.platform}` : `Xem trên ${stage.film.platform}`}<ArrowUpRight size={18} aria-hidden="true" /></a></>}
        {stage.media && stage.media.length > 1 && stage.media.every(item => !item.poster) ? <StoryboardSequence media={stage.media} locale={locale}/> : stage.media && <div className={`workflow-assets workflow-assets-${stage.media.length}`}>{stage.media.map(media => <figure key={media.src}>
          {media.poster ? <div className="workflow-clip"><LoopClip locale={locale} src={media.src} poster={media.poster} label={media.alt} /></div> : <Image src={media.src} alt={media.alt} width={1280} height={720} sizes="(max-width: 760px) 100vw, 65vw" />}
          <figcaption>{media.caption}</figcaption>
        </figure>)}</div>}
      </div>
      <div className="workflow-copy" aria-live="polite" aria-atomic="true"><p className="workflow-context">{project.title} / {step.title}</p><h3>{stage.title}</h3><p>{stage.text}</p>{stage.quote && <blockquote lang="en">{stage.quote}</blockquote>}<div className="workflow-lesson"><h4>{copy.lesson}</h4><p>{stage.lesson}</p><a className="text-link" href="#lo-trinh">{copy.learn}<ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
    </div> : <div className="pipeline-missing" id="workflow-panel"><h4>{project.title}: {processCopy.missing}</h4><p>{processCopy.missingText}</p></div>)}
    <div className="journey-step-nav"><button type="button" disabled={pipeline.indexOf(step) === 0} onClick={()=>{setStageId(pipeline[pipeline.indexOf(step)-1].id); dialog.current?.scrollTo({top:0});}}><ArrowLeft size={18}/>{en ? 'Previous step' : 'Bước trước'}</button><button type="button" disabled={pipeline.indexOf(step) === pipeline.length-1} onClick={()=>{setStageId(pipeline[pipeline.indexOf(step)+1].id); dialog.current?.scrollTo({top:0});}}>{en ? 'Next step' : 'Bước tiếp'}<ArrowRight size={18}/></button></div>
    </dialog>
    <p className="gallery-note">{processCopy.evidenceNote}</p>
    <details className="pipeline-comparison"><summary>{processCopy.mapping}</summary><p>{processCopy.comparison}</p><p>{processCopy.optional}</p></details>
    <p className="gallery-note">{copy.note}</p>
  </div></section>;
}
