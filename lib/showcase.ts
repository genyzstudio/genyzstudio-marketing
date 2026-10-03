import type { StudioVideo } from "../content/showcase";
import { isHttpsUrl } from "./site";

export function validateShowcase(videos: StudioVideo[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  videos.forEach((video, index) => {
    const field = `studioVideos[${index}]`;
    const hosts = video.platform === "YouTube" ? ["www.youtube.com", "youtube.com", "youtu.be"] : video.platform === "TikTok" ? ["www.tiktok.com", "tiktok.com", "vm.tiktok.com", "vt.tiktok.com"] : [];
    if (!hosts.some(host => isHttpsUrl(video.url, host)) || new URL(video.url).pathname === "/") errors.push(`${field}.url: enter an HTTPS video URL on the selected YouTube/TikTok platform.`);
    if (!video.title.trim() || !video.description.trim()) errors.push(`${field}: provide a title and description.`);
    if (seen.has(video.url)) errors.push(`${field}.url: duplicate video URL.`);
    seen.add(video.url);
    if (video.thumbnail && !/^\/images\/[a-zA-Z0-9_/-]+\.(png|jpg|jpeg|webp)$/.test(video.thumbnail)) errors.push(`${field}.thumbnail: use a local /images/ PNG/JPEG/WebP path or leave empty.`);
  });
  return errors;
}
