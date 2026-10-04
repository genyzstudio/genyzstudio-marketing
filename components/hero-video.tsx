"use client";

import { useRef } from "react";
import { useSilentAutoplay } from "@/lib/use-silent-autoplay";
import { Pause, Play, ArrowUpRight } from "@phosphor-icons/react";
import { getHome, type Locale } from "@/content/locales";

/** A silent, first-party studio excerpt. Motion is optional, never required to read the page. */
export function HeroVideo({ src, poster, title, url, autoPlay = false, locale = "vi" }: { src: string; poster: string; title: string; url: string; autoPlay?: boolean; locale?: Locale }) {
  const home = getHome(locale);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playing, failed, toggle, events } = useSilentAutoplay(videoRef, autoPlay);

  return <div className="native-gallery-player">
    <video ref={videoRef} className="gallery-motion" muted loop playsInline preload="none" poster={poster} aria-hidden="true" {...events}>
      <source src={src} type="video/mp4" />
    </video>
    <div className="gallery-player-controls">

      <div className="hero-playback">
        <span className={`hero-playback-note${failed ? " playback-error" : ""}`} role="status">{failed ? home.hero.playbackError : home.hero.silentExcerpt}</span>
        {!failed && <button type="button" className="cinema-control" onClick={toggle} aria-label={`${playing ? home.hero.pause : home.hero.play}: ${title}`}>{playing ? <Pause size={17} weight="fill" aria-hidden="true" /> : <Play size={17} weight="fill" aria-hidden="true" />}<span>{playing ? home.hero.pause : home.hero.play}</span></button>}
        <a className="cinema-control" href={url} target="_blank" rel="noopener noreferrer">{home.hero.fullFilm}<ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </div>
  </div>;
}
