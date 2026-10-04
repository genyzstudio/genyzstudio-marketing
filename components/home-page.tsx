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
import { HeroRegistration } from "@/components/hero-registration";
import { StickyRegistration } from "@/components/sticky-registration";

export function HomePage({ locale }: { locale: Locale }) {
  const home = getHome(locale);
  const copy = interfaceCopy[locale];
  const zaloUrl = siteConfig.contact.zaloUrl;
  const processCount = home.process.steps.length + 2;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c") }} />
    <a className="skip-link" href="#main">{home.footer.skip}</a>
    <Header locale={locale} registrationUrl={zaloUrl} />
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-grid">
          <h1 id="hero-title">{home.hero.title}</h1>
          <div className="hero-action">
            <p className="hero-lede">{home.hero.description}</p>
            <HeroRegistration locale={locale} url={zaloUrl} />
            <ul className="reassurance">{home.reassurance.map(text => <li key={text}><Check size={16} weight="bold" aria-hidden="true" />{text}</li>)}</ul>
          </div>
        </div>
        <figure className="turnaround">
          <div className="turnaround-stage"><Image src="/images/process/leo-turnaround.webp" alt={home.hero.turnaround.alt} width={1600} height={560} sizes="(max-width: 760px) 100vw, 1200px" priority /></div>
          <figcaption>{home.hero.turnaround.caption}</figcaption>
        </figure>
      </section>

      <HeroGallery locale={locale} />

      <section id="ket-qua" className="section shell outcomes" aria-labelledby="outcomes-title">
        <div className="section-intro"><h2 id="outcomes-title">{home.outcomes.title}</h2><p className="section-description">{home.outcomes.description}</p><a href="#workshop" className="text-link">{copy.start}</a></div>
        <ol className="outcome-list">{home.outcomes.items.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>
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

      <section className="section process-section" aria-labelledby="process-title"><div className="shell">
        <div className="section-intro wide"><h2 id="process-title">{home.process.title}</h2><p className="section-description">{home.process.description}</p></div>
        <ol className="board">
          {home.process.steps.map((step, i) => <li key={step.label} className="board-panel">
            <div className="board-frame"><Image src={step.image} alt={step.alt} width={step.width} height={step.height} sizes="(max-width: 760px) 100vw, 50vw" /></div>
            <div className="board-caption"><div className="board-meta"><strong>{step.label}</strong><span>{i + 1}/{processCount}</span></div><h3>{step.title}</h3><p>{step.text}</p></div>
          </li>)}
          <li className="board-panel">
            <div className="board-frame board-script"><blockquote lang="en">{home.process.prompt}</blockquote></div>
            <div className="board-caption"><div className="board-meta"><strong>{home.process.promptLabel}</strong><span>{processCount - 1}/{processCount}</span></div><p>{home.process.promptNote}</p></div>
          </li>
          <li className="board-panel">
            <div className="board-frame"><Image src="/images/studio-reel.jpg" alt={home.process.result.alt} width={1280} height={720} sizes="(max-width: 760px) 100vw, 50vw" /></div>
            <div className="board-caption"><div className="board-meta"><strong>{home.process.result.label}</strong><span>{processCount}/{processCount}</span></div><h3>{home.process.result.title}</h3><p>{home.process.result.text}</p><a className="text-link" href="#san-pham">{home.process.result.link}</a></div>
          </li>
        </ol>
        <p className="figure-note">{home.process.note}</p>
      </div></section>

      <section id="lo-trinh" className="section shell journey" aria-labelledby="journey-title">
        <div className="section-intro"><h2 id="journey-title">{home.journey.title}</h2><p className="section-description">{home.journey.description}</p><a href="#workshop" className="text-link">{copy.firstStep}</a></div>
        <ol className="journey-list">{home.journey.steps.map((step, i) => <li key={step.title} className={step.inWorkshop ? "in-workshop" : undefined}>
          <span className="step-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <div><p className="step-tag">{step.tag}</p><h3>{step.title}</h3><p>{step.text}</p>{step.inWorkshop && <p className="workshop-badge"><Check size={14} weight="bold" aria-hidden="true" />{home.journey.workshopTag}</p>}</div>
        </li>)}</ol>
      </section>

      <section className="shell skool-section" aria-labelledby="skool-title"><div><h2 id="skool-title">{home.skool.title}</h2><p>{siteConfig.skool.status === "available" ? home.skool.availableDescription : home.skool.description}</p></div>{siteConfig.skool.status === "available" && siteConfig.skool.url ? <a className="text-link" href={siteConfig.skool.url} target="_blank" rel="noopener noreferrer">{home.skool.link}<ArrowUpRight size={16} aria-hidden="true" /></a> : <span className="status-label">{home.skool.soon}</span>}</section>

      <section id="hoi-dap" className="section shell faq-section" aria-labelledby="faq-title"><div className="section-intro"><h2 id="faq-title">{home.faq.title}</h2><p className="section-description">{home.faq.description}</p></div><div className="faq-list">{home.faq.items.map(item => <details key={item.question} name="faq"><summary>{item.question}<Plus size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>

      <section id="lien-he" className="section contact-section" aria-labelledby="contact-title"><div className="shell contact-inner"><h2 id="contact-title">{home.contact.title}</h2><div className="contact-action"><p>{home.contact.description}</p><Registration locale={locale} url={zaloUrl} /><p className="contact-note">{home.contact.accountNote}</p><ContactDetails locale={locale} contact={siteConfig.contact} /></div></div></section>
    </main>
    <StickyRegistration locale={locale} url={zaloUrl} />
    <footer className="shell footer"><div><a className="brand" href="#" aria-label={copy.top}><Wordmark /></a><p>{home.footer.description}</p></div><div className="footer-right"><a className="text-link" href="#">{home.footer.back}</a><p>{home.footer.note}</p><span>© {new Date().getFullYear()} {home.footer.rights}</span></div></footer>
  </>;
}
