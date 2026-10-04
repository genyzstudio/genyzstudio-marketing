"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Plays a muted first-party clip only while it is on screen, the tab is visible and the
 * visitor has not asked for reduced motion. Returns state and a manual toggle so motion
 * is always optional.
 */
export function useSilentAutoplay(videoRef: RefObject<HTMLVideoElement | null>, autoPlay: boolean) {
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
  }, [autoPlay, videoRef]);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) { intent.current = false; video.pause(); return; }
    intent.current = true;
    try { await video.play(); setFailed(false); }
    catch { intent.current = false; setFailed(true); }
  };

  const events = {
    onPlaying: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onError: () => { setFailed(true); setPlaying(false); },
  };

  return { playing, failed, toggle, events };
}
