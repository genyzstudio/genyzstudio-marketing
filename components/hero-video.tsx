"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, ArrowUpRight } from "@phosphor-icons/react";
import { home } from "@/content/home";

/** A silent, first-party studio excerpt. Motion is optional, never required to read the page. */
export function HeroVideo({ src, poster, title, url, autoPlay = false }: { src: string; poster: string; title: string; url: string; autoPlay?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intent = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    intent.current = autoPlay && !preference.matches;
    let visible = true;
    const sync = () => {
      if (intent.current && visible && !document.hidden) {
        void video.play().catch(() => { /* Keep the poster and manual play control when autoplay is blocked. */ });
      } else video.pause();
    };
    const changePreference = () => { intent.current = autoPlay && !preference.matches; sync(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0 });
    observer.observe(video);
    preference.addEventListener("change", changePreference);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", changePreference);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [autoPlay]);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) { intent.current = false; video.pause(); }
    else {
      intent.current = true;
      try { await video.play(); setFailed(false); }
      catch { intent.current = false; setFailed(true); }
    }
  };

  return <div className="native-gallery-player">
    <video ref={videoRef} className="gallery-motion" muted loop playsInline preload="none" poster={poster} aria-hidden="true" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }}>
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
