import type { StudioVideo } from "../content/showcase";

/** Derive trusted player URLs; never accept arbitrary iframe sources in content. */
export function getVideoEmbed(video: Pick<StudioVideo, "platform" | "url">, locale: "vi" | "en" = "vi"): string | null {
  try {
    const url = new URL(video.url);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    if (video.platform === "YouTube") {
      let id: string | null = null;
      if (url.hostname === "youtu.be") id = url.pathname.slice(1);
      else if (["www.youtube.com", "youtube.com"].includes(url.hostname)) {
        id = url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/shorts\/([\w-]+)\/?$/)?.[1] || null;
      }
      return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&hl=${locale}` : null;
    }
    if (video.platform === "TikTok" && ["www.tiktok.com", "tiktok.com"].includes(url.hostname)) {
      const id = url.pathname.match(/^\/@[\w.-]+\/video\/(\d{15,25})\/?$/)?.[1];
      return id ? `https://www.tiktok.com/player/v1/${id}?autoplay=0&rel=0&description=0` : null;
    }
    return null;
  } catch { return null; }
}
