"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "@phosphor-icons/react";
import type { StudioVideo } from "@/content/showcase";
import { interfaceCopy, type Locale } from "@/content/locales";
import { getVideoEmbed } from "@/lib/video";

export function VideoPlayer({ video, locale = "vi" }: { video: StudioVideo; locale?: Locale }) {
  const copy = interfaceCopy[locale];
  const [active, setActive] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const posterRef = useRef<HTMLButtonElement>(null);
  const wasActive = useRef(false);
  useEffect(() => {
    if (active) closeRef.current?.focus();
    else if (wasActive.current) posterRef.current?.focus();
    wasActive.current = active;
  }, [active]);
  const embed = getVideoEmbed(video, locale);
  if (!embed) return null;
  return <div className="video-player">
    {active ? <>
      <iframe src={embed} title={`${video.title} — ${video.platform}`} allow="encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      <button ref={closeRef} className="video-close" aria-label={`${copy.closePlayer}: ${video.title}`} onClick={() => setActive(false)}><X size={18} aria-hidden="true" /></button>
    </> : <button ref={posterRef} className="video-poster" onClick={() => setActive(true)} aria-label={`${copy.load}: ${video.title}`}>
      {video.thumbnail && <Image src={video.thumbnail} alt="" fill sizes="(max-width: 760px) 100vw, 65vw" />}
      <span className="video-play"><Play size={24} weight="fill" aria-hidden="true" /></span>
      <span className="video-load-label">{copy.load}</span>
    </button>}
  </div>;
}
