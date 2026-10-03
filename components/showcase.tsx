import { ArrowUpRight, YoutubeLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import { studioVideos, showcaseCopy } from "@/content/showcase";
import { siteConfig } from "@/config/site";
import { VideoPlayer } from "./video-player";

export function Showcase() {
  if (!studioVideos.length) return null;
  return <section id="san-pham" className="section shell showcase-section" aria-labelledby="showcase-title">
    <div className="section-heading"><h2 id="showcase-title">{showcaseCopy.title}</h2><p className="section-description">{showcaseCopy.description}</p></div>
    <div className="showcase-grid">{studioVideos.map(video => <article className="showcase-card" key={video.url}>
      <VideoPlayer video={video} />
      <div className="showcase-info">
      <div className="video-meta"><span>{video.lesson}</span><span>{video.platform === "YouTube" ? <YoutubeLogo size={17} aria-hidden="true" /> : <TiktokLogo size={16} aria-hidden="true" />}{video.platform}</span></div>
      <h3>{video.title}</h3><p>{video.description}</p>
      <a className="text-link" href={video.url} target="_blank" rel="noopener noreferrer">{showcaseCopy.watch} {video.platform}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </article>)}</div>
    <p className="video-privacy-note">{showcaseCopy.playerNote}</p>
    <div className="showcase-channels"><span>{showcaseCopy.channels}</span>{siteConfig.contact.socialLinks.filter(link => ["YouTube", "TikTok"].includes(link.label)).map(link => <a className="text-link" key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</div>
  </section>;
}
