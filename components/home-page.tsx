import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Plus } from "@phosphor-icons/react/dist/ssr";
import { Header, Wordmark } from "@/components/header";
import { Registration } from "@/components/registration";
import { ContactDetails } from "@/components/contact-details";
import { WorkshopDetails } from "@/components/workshop-details";
import { Instructor } from "@/components/instructor";
import { siteConfig } from "@/config/site";
import { getHome, interfaceCopy, type Locale } from "@/content/locales";
import { structuredData } from "@/lib/seo";
import { HeroGallery } from "@/components/hero-gallery";
import { StudioHero, StudioPaths } from "@/components/studio-sections";
import { WorkflowExplorer } from "@/components/workflow-explorer";
import { studioCopy } from "@/content/studio";
import { StickyRegistration } from "@/components/sticky-registration";
import { LoopClip } from "@/components/loop-clip";

import { ProjectSelectionProvider, ProjectOnly } from "./project-selection";

const PROCESS_STEPS = 5;

function BoardCaption({ label, meta, children }: { label: string; meta: string; children: ReactNode }) {
  return <div className="board-caption"><div className="board-meta"><strong>{label}</strong><span>{meta}</span></div>{children}</div>;
}

const stepOf = (step: number) => `${step}/${PROCESS_STEPS}`;

export function HomePage({ locale }: { locale: Locale }) {
  const home = getHome(locale);
  const copy = interfaceCopy[locale];
  const studio = studioCopy[locale];
  const zaloUrl = siteConfig.contact.zaloUrl;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c") }} />
    <a className="skip-link" href="#main">{home.footer.skip}</a>
    <Header locale={locale} />
    <ProjectSelectionProvider><main id="main">
      <StudioHero locale={locale} />
      <StudioPaths locale={locale} />
      <div className="shell gallery-intro"><h2>{studio.galleryTitle}</h2><p>{studio.galleryDescription}</p></div>
      <HeroGallery locale={locale} />
      <WorkflowExplorer locale={locale} />

      <section id="lo-trinh" className="section shell journey" aria-labelledby="journey-title">
        <div className="section-intro"><h2 id="journey-title">{home.journey.title}</h2><p className="section-description">{home.journey.description}</p><a href="#workshop" className="text-link">{copy.firstStep}</a></div>
        <ol className="journey-list">{home.journey.steps.map((step, i) => <li key={step.title} className={step.inWorkshop ? "in-workshop" : undefined}>
          <span className="step-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <div><p className="step-tag">{step.tag}</p><h3>{step.title}</h3><p>{step.text}</p>{step.inWorkshop && <p className="workshop-badge"><Check size={14} weight="bold" aria-hidden="true" />{home.journey.workshopTag}</p>}</div>
        </li>)}</ol>
      </section>

      <section id="workshop" className="section workshop-section" aria-labelledby="workshop-title"><div className="shell workshop-grid">
        <div className="workshop-copy"><h2 id="workshop-title">{home.workshop.title}</h2><p>{home.workshop.description}</p><ul>{home.workshop.items.map(item => <li key={item}><Check size={18} weight="bold" aria-hidden="true" />{item}</li>)}</ul></div>
        <div className="ticket">
          <div className="ticket-price"><span>{home.workshop.tuition}</span><strong>{home.workshop.price}</strong></div>
          <WorkshopDetails locale={locale} workshop={siteConfig.workshop} />
          <Registration locale={locale} url={zaloUrl} />
          <p className="ticket-note">{home.workshop.interest}</p>
          <p className="ticket-note">{home.workshop.costs}</p>
        </div>
      </div></section>

      <Instructor locale={locale} instructor={siteConfig.instructor} />

      <section className="shell skool-section" aria-labelledby="skool-title"><div><h2 id="skool-title">{home.skool.title}</h2><p>{siteConfig.skool.status === "available" ? home.skool.availableDescription : home.skool.description}</p></div>{siteConfig.skool.status === "available" && siteConfig.skool.url ? <a className="text-link" href={siteConfig.skool.url} target="_blank" rel="noopener noreferrer">{home.skool.link}<ArrowUpRight size={16} aria-hidden="true" /></a> : <span className="status-label">{home.skool.soon}</span>}</section>

      <ProjectOnly url="https://www.youtube.com/watch?v=1_EZiRh8o_o"><details className="production-notebook"><summary className="shell">{studio.notebook}<Plus size={24} aria-hidden="true" /></summary>
      <section className="section process-section" aria-labelledby="process-title"><div className="shell">
        <div className="section-intro wide"><h2 id="process-title">{home.process.title}</h2><p className="section-description">{home.process.description}</p></div>
        <ol className="board">
          <li className="board-panel">
            <div className="board-frame board-script"><blockquote lang="en">{home.process.prompt.body}</blockquote></div>
            <BoardCaption label={home.process.prompt.label} meta={stepOf(1)}><p>{home.process.prompt.text}</p></BoardCaption>
          </li>
          <li className="board-panel">
            <div className="board-frame"><LoopClip locale={locale} src={home.process.blocking.src} poster={home.process.blocking.poster} label={home.process.blocking.alt} /></div>
            <BoardCaption label={home.process.blocking.label} meta={stepOf(2)}><h3>{home.process.blocking.title}</h3><p>{home.process.blocking.text}</p></BoardCaption>
          </li>
          <li className="board-panel">
            <div className="board-frame board-plan"><Image src={home.process.plan.image} alt={home.process.plan.alt} width={home.process.plan.width} height={home.process.plan.height} sizes="(max-width: 760px) 100vw, 50vw" /></div>
            <BoardCaption label={home.process.plan.label} meta={stepOf(3)}><h3>{home.process.plan.title}</h3><p>{home.process.plan.text}</p></BoardCaption>
          </li>
          <li className="board-panel">
            <div className="board-frame"><LoopClip locale={locale} src={home.process.shot.src} poster={home.process.shot.poster} label={home.process.shot.alt} /></div>
            <BoardCaption label={home.process.shot.label} meta={stepOf(4)}><h3>{home.process.shot.title}</h3><p>{home.process.shot.text}</p></BoardCaption>
          </li>
          <li className="board-panel board-wide">
            <div className="board-frame"><Image src="/images/studio-reel.jpg" alt={home.process.result.alt} width={1280} height={720} sizes="(max-width: 760px) 100vw, 50vw" /></div>
            <BoardCaption label={home.process.result.label} meta={stepOf(5)}><h3>{home.process.result.title}</h3><p>{home.process.result.text}</p><a className="text-link" href="#san-pham">{home.process.result.link}</a></BoardCaption>
          </li>
        </ol>
        <p className="figure-note">{home.process.note}</p>
      </div></section>

      <section className="section wip-section" aria-labelledby="wip-title"><div className="shell">
        <div className="section-intro wide"><h2 id="wip-title">{home.wip.title}</h2><p className="section-description">{home.wip.description}</p></div>
        <ol className="board">
          <li className="board-panel board-wide">
            <div className="board-frame board-plan board-plan-light"><Image src={home.wip.board.image} alt={home.wip.board.alt} width={home.wip.board.width} height={home.wip.board.height} sizes="(max-width: 760px) 100vw, 640px" /></div>
            <BoardCaption label={home.wip.board.label} meta={home.wip.board.meta}><h3>{home.wip.board.title}</h3><p>{home.wip.board.text}</p></BoardCaption>
          </li>
          {home.wip.clips.map(clip => <li key={clip.src} className="board-panel">
            <div className="board-frame"><LoopClip locale={locale} src={clip.src} poster={clip.poster} label={clip.alt} /></div>
            <BoardCaption label={clip.label} meta={clip.meta}><h3>{clip.title}</h3><p>{clip.text}</p></BoardCaption>
          </li>)}
        </ol>
        <p className="figure-note">{home.wip.note}</p>
      </div></section>

      </details></ProjectOnly>

      <section id="hoi-dap" className="section shell faq-section" aria-labelledby="faq-title"><div className="section-intro"><h2 id="faq-title">{home.faq.title}</h2><p className="section-description">{home.faq.description}</p></div><div className="faq-list">{home.faq.items.map(item => <details key={item.question} name="faq"><summary>{item.question}<Plus size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>

      <section id="lien-he" className="section contact-section" aria-labelledby="contact-title"><div className="shell contact-inner"><h2 id="contact-title">{studio.contactTitle}</h2><div className="contact-action"><p>{studio.contactDescription}</p><div className="contact-options">{siteConfig.contact.email && <a className="button button-secondary" href={`mailto:${siteConfig.contact.email}?subject=Video%20project`}>{studio.projectEmail}<ArrowUpRight size={18} aria-hidden="true" /></a>}<Registration locale={locale} url={zaloUrl} /></div><p className="contact-note">{home.contact.accountNote}</p><ContactDetails locale={locale} contact={siteConfig.contact} /></div></div></section>
    </main></ProjectSelectionProvider>
    <StickyRegistration locale={locale} url={zaloUrl} />
    <footer className="shell footer"><div><a className="brand" href="#" aria-label={copy.top}><Wordmark /></a><p>{home.footer.description}</p></div><div className="footer-right"><a className="text-link" href="#">{home.footer.back}</a><p>{home.footer.note}</p><span>© {new Date().getFullYear()} {home.footer.rights}</span></div></footer>
  </>;
}
