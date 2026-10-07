'use client';

import { useProjectSelection } from './project-selection';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, FilmStrip, GraduationCap } from '@phosphor-icons/react';
import type { Locale } from '@/content/locales';
import { studioCopy } from '@/content/studio';
import { getWorkflows, workflowCopy } from '@/content/workflows';

export function StudioHero({ locale }: { locale: Locale }) {
  const copy = studioCopy[locale];
  const { selectProject } = useProjectSelection();
  return <section className="studio-hero shell" aria-labelledby="hero-title">
    <div className="studio-hero-copy"><p className="eyebrow">{copy.eyebrow}</p><h1 id="hero-title">{copy.title}</h1><p className="studio-lede">{copy.description}</p><div className="hero-actions"><a className="button" href="#san-pham">{copy.work}<ArrowDownRight size={20} aria-hidden="true" /></a><a className="button button-secondary" href="#lo-trinh">{copy.learn}<ArrowUpRight size={20} aria-hidden="true" /></a></div></div>
    <div className="studio-hero-art studio-mosaic">{getWorkflows(locale).map(project => <figure key={project.id}><a href="#cau-chuyen" onClick={() => selectProject(project.stages.film!.film!.url)} aria-label={`${workflowCopy[locale].stages}: ${project.title}`}><Image src={project.cover} alt={project.title} width={640} height={360} sizes="(max-width: 760px) 100vw, 35vw" priority={project.id === 'great-gulp'} /></a><figcaption>{project.title}</figcaption></figure>)}</div>
  </section>;
}

export function StudioPaths({ locale }: { locale: Locale }) {
  const copy = studioCopy[locale];
  return <section className="studio-paths shell" aria-labelledby="paths-title"><h2 id="paths-title" className="sr-only">{copy.pathsTitle}</h2><article className="studio-path"><FilmStrip className="path-icon" size={28} aria-hidden="true" /><h3>{copy.studioTitle}</h3><p>{copy.studioDescription}</p><ul>{copy.studioTags.map(tag => <li key={tag}>{tag}</li>)}</ul><a className="text-link" href="#lien-he">{copy.contact}<ArrowUpRight size={18} aria-hidden="true" /></a></article><article className="studio-path"><GraduationCap className="path-icon" size={30} aria-hidden="true" /><h3>{copy.trainingTitle}</h3><p>{copy.trainingDescription}</p><ul>{copy.trainingTags.map(tag => <li key={tag}>{tag}</li>)}</ul><a className="text-link" href="#lo-trinh">{copy.learn}<ArrowUpRight size={18} aria-hidden="true" /></a></article></section>;
}

