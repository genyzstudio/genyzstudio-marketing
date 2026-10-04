"use client";

import { useRef } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { getHome, type Locale } from "@/content/locales";
import { useSilentAutoplay } from "@/lib/use-silent-autoplay";

/** A short silent production clip that loops while visible, with a pause control (never with reduced motion). */
export function LoopClip({ src, poster, label, locale }: { src: string; poster: string; label: string; locale: Locale }) {
  const home = getHome(locale);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playing, failed, toggle, events } = useSilentAutoplay(videoRef, true);
  const action = playing ? home.hero.pause : home.hero.play;

  return <div className="loop-clip">
    <video ref={videoRef} muted loop playsInline preload="none" poster={poster} aria-label={label} {...events}>
      <source src={src} type="video/mp4" />
    </video>
    {!failed && <button type="button" className="loop-toggle" onClick={toggle} aria-label={`${action}: ${label}`}>{playing ? <Pause size={16} weight="fill" aria-hidden="true" /> : <Play size={16} weight="fill" aria-hidden="true" />}</button>}
  </div>;
}
