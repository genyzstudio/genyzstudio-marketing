'use client';

import { useState } from 'react';
import { useProjectSelection } from './project-selection';
import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react';
import { getWorkflows, getSelectedWorkflow, stageIds, workflowCopy, type StageId } from '@/content/workflows';
import type { Locale } from '@/content/locales';
import { LoopClip } from './loop-clip';
import { VideoPlayer } from './video-player';

export function WorkflowExplorer({ locale }: { locale: Locale }) {
  const projects = getWorkflows(locale);
  const copy = workflowCopy[locale];
  const { selectedUrl, selectProject } = useProjectSelection();
  const [preferredStage, setStageId] = useState<StageId>('story');
  const project = getSelectedWorkflow(locale, selectedUrl);
  const projectId = project.id;
  const stageId = project.stages[preferredStage] ? preferredStage : 'film';
  const stage = project.stages[stageId]!;

  return <section id="cau-chuyen" className="section case-study" aria-labelledby="workflow-title"><div className="shell">
    <div className="case-intro"><h2 id="workflow-title">{copy.title}</h2><p>{copy.description}</p></div>
    <div className="workflow-projects" role="group" aria-label={copy.projects}>
      {projects.map(item => <button type="button" key={item.id} aria-pressed={item.id === projectId} aria-controls="workflow-panel" onClick={() => selectProject(item.stages.film!.film!.url)}>
        <Image src={item.cover} alt="" width={640} height={360} sizes="(max-width: 760px) 230px, 33vw" />
        <span className="workflow-project-title">{item.title}<ArrowUpRight size={18} aria-hidden="true" /></span><span className="workflow-project-subtitle">{item.subtitle}</span>
      </button>)}
    </div>
    <div className="workflow-stages" role="group" aria-label={copy.stages}>
      {stageIds.map((id,index) => <button type="button" key={id} disabled={!project.stages[id]} aria-pressed={stageId === id} aria-controls="workflow-panel" onClick={() => setStageId(id)}><span aria-hidden="true">0{index+1}</span>{copy.labels[index]}{!project.stages[id] && <small>{copy.unavailable}</small>}</button>)}
    </div>
    {project.notice && <p className="workflow-notice" role="status">{project.notice}</p>}
    <div className="workflow-panel" id="workflow-panel" key={`${projectId}-${stageId}`}>
      <div className="workflow-media">
        {stage.film && <><VideoPlayer locale={locale} video={stage.film} /><a className="text-link" href={stage.film.url} target="_blank" rel="noopener noreferrer">{copy.watch}<ArrowUpRight size={18} aria-hidden="true" /></a></>}
        {stage.media && <div className={`workflow-assets workflow-assets-${stage.media.length}`}>{stage.media.map(media => <figure key={media.src}>
          {media.poster ? <div className="workflow-clip"><LoopClip locale={locale} src={media.src} poster={media.poster} label={media.alt} /></div> : <Image src={media.src} alt={media.alt} width={1280} height={720} sizes="(max-width: 760px) 100vw, 65vw" />}
          <figcaption>{media.caption}</figcaption>
        </figure>)}</div>}
      </div>
      <div className="workflow-copy" aria-live="polite" aria-atomic="true"><p className="workflow-context">{project.title} / {copy.labels[stageIds.indexOf(stageId)]}</p><h3>{stage.title}</h3><p>{stage.text}</p>{stage.quote && <blockquote lang="en">{stage.quote}</blockquote>}<div className="workflow-lesson"><h4>{copy.lesson}</h4><p>{stage.lesson}</p><a className="text-link" href="#lo-trinh">{copy.learn}<ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
    </div>
    <p className="gallery-note">{copy.note}</p>
  </div></section>;
}
