import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChatCircleText, FilmStrip, MagicWand, Sparkle, Plus, BookOpen, Lightbulb, FrameCorners } from "@phosphor-icons/react/dist/ssr";
import { Header, Wordmark } from "@/components/header";
import { Registration } from "@/components/registration";
import { ContactDetails } from "@/components/contact-details";
import { WorkshopDetails } from "@/components/workshop-details";
import { siteConfig } from "@/config/site";
import { home } from "@/content/home";
import { HeroGallery } from "@/components/hero-gallery";
import { Showcase } from "@/components/showcase";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">{home.footer.skip}</a>
    <Header />
    <main id="main">
      <section className="gallery-hero shell" aria-labelledby="hero-title">
        <div className="gallery-intro">
          <div><p className="eyebrow"><span className="tiny-line" />{home.hero.eyebrow}</p><h1 id="hero-title">{home.hero.title} <span className="coral-text">{home.hero.highlight}</span><br />{home.hero.ending}</h1></div>
          <div className="gallery-intro-action"><p>{home.hero.description}</p><Registration url={siteConfig.contact.zaloUrl} /><a className="text-link" href="#lo-trinh">Khám phá cách học<ArrowDown size={18} aria-hidden="true" /></a></div>
        </div>
        <HeroGallery />
      </section>
      <div className="reassurance shell">{home.reassurance.map(text => <span key={text}><Check size={18} weight="bold" aria-hidden="true" />{text}</span>)}<span className="reassurance-note">Bắt đầu đơn giản. Sáng tạo theo cách của bạn.</span></div>

      <Showcase />

      <section id="ket-qua" className="section shell outcomes" aria-labelledby="outcomes-title">
        <div className="outcomes-intro"><h2 id="outcomes-title">{home.outcomes.title}</h2><p className="section-description">{home.outcomes.description}</p><a href="#workshop" className="text-link">Bắt đầu với workshop miễn phí<ArrowUpRight size={20} aria-hidden="true" /></a></div>
        <div className="outcome-list">{home.outcomes.items.map((item, i) => {
          const Icon = [ChatCircleText, FrameCorners, FilmStrip][i];
          return <article key={item.title} className="outcome-item"><div className="icon-tile"><Icon size={26} weight="light" aria-hidden="true" /></div><div><h3>{item.title}</h3><p>{item.text}</p></div></article>;
        })}</div>
      </section>

      <section className="process-section" aria-labelledby="process-title"><div className="shell section">
        <div className="section-heading"><h2 id="process-title">{home.process.title}</h2><p className="section-description">{home.process.description}</p></div>
        <div className="process-grid">
          <div className="prompt-card"><div className="process-label"><ChatCircleText size={20} aria-hidden="true" />{home.process.promptLabel}</div><p>“{home.process.prompt}”</p><span className="prompt-footer">Không cần câu lệnh phức tạp.<br />Bắt đầu bằng điều bạn hình dung.</span></div>
          <figure className="process-frame"><Image src="/images/hero-vietnam.webp" alt="Khung hình minh hoạ AI được dùng để giải thích cách chuyển ý tưởng thành hình ảnh" width={768} height={512} sizes="(max-width: 760px) 100vw, 38vw" /><figcaption>{home.process.imageLabel}</figcaption></figure>
          <div className="motion-card"><div className="process-label"><FilmStrip size={20} aria-hidden="true" />{home.process.motionLabel}</div><div className="motion-symbol" aria-hidden="true"><ArrowRight size={54} weight="thin" /></div><p>{home.process.motion}</p></div>
        </div><p className="figure-note">{home.process.note}</p>
      </div></section>


      <section id="lo-trinh" className="section shell journey" aria-labelledby="journey-title">
        <div className="journey-intro"><span className="section-icon"><BookOpen size={28} weight="light" aria-hidden="true" /></span><h2 id="journey-title">{home.journey.title}</h2><p className="section-description">{home.journey.description}</p><a href="#workshop" className="text-link">Thử bước đầu tiên<ArrowDown size={18} aria-hidden="true" /></a></div>
        <ol className="journey-list">{home.journey.steps.map((step, i) => <li key={step.title}><span className="step-number">0{i + 1}</span><div><span className="step-tag">{step.tag}</span><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
      </section>

      <section id="workshop" className="workshop-section" aria-labelledby="workshop-title"><div className="shell workshop-grid">
        <div className="workshop-copy"><p className="eyebrow"><Sparkle size={19} weight="fill" aria-hidden="true" />{home.workshop.eyebrow}</p><h2 id="workshop-title">{home.workshop.title}</h2><p>{home.workshop.description}</p><ul>{home.workshop.items.map(item => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul></div>
        <div className="workshop-card"><div className="tuition"><span>{home.workshop.tuition}</span><strong>{home.workshop.price}<Sparkle size={28} weight="light" aria-hidden="true" /></strong></div><WorkshopDetails workshop={siteConfig.workshop} /><Registration url={siteConfig.contact.zaloUrl} /><p className="interest-note">{home.workshop.interest}</p><p className="cost-note">{home.workshop.costs}</p></div>
      </div></section>

      <section className="shell skool-section" aria-labelledby="skool-title"><div className="skool-icon"><BookOpen size={36} weight="light" aria-hidden="true" /></div><div><h2 id="skool-title">{home.skool.title}</h2><p>{siteConfig.skool.status === "available" ? home.skool.availableDescription : home.skool.description}</p></div>{siteConfig.skool.status === "available" && siteConfig.skool.url ? <a className="text-link" href={siteConfig.skool.url} target="_blank" rel="noopener noreferrer">{home.skool.link}<ArrowUpRight size={18} aria-hidden="true" /></a> : <span className="status-label">{home.skool.soon}</span>}</section>

      <section id="hoi-dap" className="section shell faq-section" aria-labelledby="faq-title"><div><h2 id="faq-title">{home.faq.title}</h2><p className="section-description">{home.faq.description}</p><Lightbulb className="faq-lightbulb" size={72} weight="thin" aria-hidden="true" /></div><div className="faq-list">{home.faq.items.map(item => <details key={item.question} name="faq"><summary>{item.question}<Plus size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>

      <section id="lien-he" className="contact-section" aria-labelledby="contact-title"><div className="shell contact-inner"><MagicWand size={34} weight="light" aria-hidden="true" /><h2 id="contact-title">{home.contact.title}</h2><p>{home.contact.description}</p><Registration url={siteConfig.contact.zaloUrl} /><p className="contact-note">{home.contact.accountNote}</p><ContactDetails contact={siteConfig.contact} /></div></section>
    </main>
    <footer className="shell footer"><div><a className="brand" href="#" aria-label="GenYZ Studio — về đầu trang"><Wordmark /></a><p>{home.footer.description}</p></div><div className="footer-right"><a className="text-link" href="#">{home.footer.back}<ArrowUpRight size={18} aria-hidden="true" /></a><p>{home.footer.note}</p><span>© {new Date().getFullYear()} {home.footer.rights}</span></div></footer>
  </>;
}
