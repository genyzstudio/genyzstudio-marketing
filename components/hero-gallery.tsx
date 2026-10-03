import { HeroVideo } from "./hero-video";
import { VideoPlayer } from "./video-player";
import { heroGallery } from "@/content/hero-gallery";
import { studioVideos } from "@/content/showcase";

export function HeroGallery() {
  const titus = studioVideos.find(video => video.title === "The Legend of Titus");
  return <div className="technique-gallery">
    <div className="gallery-heading"><p>{heroGallery.intro}</p><span aria-hidden="true">GENYZ / FILM STUDIES</span></div>
    <div className="technique-grid">
      {heroGallery.clips.map((clip, index) => <article className="technique-card" key={clip.src}>
        <HeroVideo src={clip.src} poster={clip.poster} title={clip.title} url={clip.url} autoPlay={index === 0} />
        <div className="technique-caption"><span>{clip.technique}</span><h2>{clip.title}</h2><p>{clip.description}</p><small>{clip.film}</small></div>
      </article>)}
      {titus && <article className="technique-card"><VideoPlayer video={titus} /><div className="technique-caption"><span>{heroGallery.titus.technique}</span><h2>{heroGallery.titus.title}</h2><p>{heroGallery.titus.description}</p><a className="text-link" href={titus.url} target="_blank" rel="noopener noreferrer">The Legend of Titus ↗</a></div></article>}
    </div>
    <p className="gallery-note">{heroGallery.note}</p>
  </div>;
}
