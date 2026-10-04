"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { HeroVideo } from "./hero-video";
import { VideoPlayer } from "./video-player";
import { studioVideos } from "@/content/showcase";

import { studioVideosEn } from "@/content/showcase-en";
import { getHome, interfaceCopy, type Locale } from "@/content/locales";

// The only mounted player belongs to the current film. Changing its key destroys playback.
export function HeroGallery({ locale = "vi" }: { locale?: Locale }) {
  const videos = locale === "en" ? studioVideosEn : studioVideos;
  const films = [...videos.filter(v => v.previewSrc), ...videos.filter(v => !v.previewSrc)];
  const copy = interfaceCopy[locale];
  const home = getHome(locale);
  const [selected, setSelected] = useState(0);
  const previews = useRef<(HTMLButtonElement | null)[]>([]);
  const film = films[selected];
  const select = (index: number, focus = false) => {
    const next = (index + films.length) % films.length;
    setSelected(next);
    const button = previews.current[next];
    const strip = button?.parentElement;
    if (button && strip) strip.scrollTo({ left: button.offsetLeft - strip.offsetLeft, behavior: "instant" });
    if (focus) previews.current[next]?.focus();
  };
  return <section id="san-pham" className="film-gallery" aria-label={copy.gallery} aria-roledescription="carousel">
    <div className="film-gallery-heading"><span>{home.hero.caption}</span><div className="film-navigation"><span className="film-counter" aria-live="polite">{String(selected + 1).padStart(2, "0")} / {String(films.length).padStart(2, "0")}</span><button type="button" aria-label={copy.previous} onClick={() => select(selected - 1)}><ArrowLeft size={20} /></button><button type="button" aria-label={copy.next} onClick={() => select(selected + 1)}><ArrowRight size={20} /></button></div></div>
    <div className="film-stage">
      <div className="film-screen" key={film.url}>
        {film.previewSrc ? <HeroVideo locale={locale} src={film.previewSrc} poster={film.thumbnail} title={film.title} url={film.url} autoPlay /> : <VideoPlayer locale={locale} video={film} />}
      </div>
      <div className="film-story" aria-live="polite"><span className="film-lesson">{film.lesson}</span><h2>{film.title}</h2><p>{film.description}</p><a className="text-link" href={film.url} target="_blank" rel="noopener noreferrer">{copy.watch} {film.platform}<ArrowUpRight size={17} /></a><span className="film-mode">{film.previewSrc ? home.hero.silentExcerpt : `${copy.playerHint} ${film.platform}`}</span></div>
    </div>
    <div className="film-strip" role="group" aria-label={copy.choose} onKeyDown={event => {
      const index = previews.current.indexOf(document.activeElement as HTMLButtonElement);
      if (index < 0) return;
      if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        select(event.key === "Home" ? 0 : event.key === "End" ? films.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1), true);
      }
    }}>{films.map((item, index) => <button type="button" ref={element => { previews.current[index] = element; }} key={item.url} aria-pressed={index === selected} aria-label={`${copy.chooseVideo} ${index + 1}: ${item.title}`} onClick={() => select(index)}><span className="film-thumb"><Image src={item.thumbnail} alt="" fill sizes="180px" /><span>{String(index + 1).padStart(2, "0")}</span></span><span className="film-thumb-title">{item.title}</span><small>{item.platform}</small></button>)}</div>
    <p className="gallery-note">{copy.note}</p>
  </section>;
}
