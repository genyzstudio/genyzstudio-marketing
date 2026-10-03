import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { studioVideos, showcaseCopy } from "@/content/showcase";

export function Showcase() {
  if (!studioVideos.length) return null;
  return <section id="san-pham" className="section shell" aria-labelledby="showcase-title"><div className="section-heading"><p className="eyebrow">{showcaseCopy.eyebrow}</p><h2 id="showcase-title">{showcaseCopy.title}</h2><p className="section-description">{showcaseCopy.description}</p></div><div className="showcase-grid">{studioVideos.map(video => <article className="showcase-card" key={video.url}>{video.thumbnail && <Image src={video.thumbnail} alt={video.title} width={800} height={450} sizes="(max-width: 760px) 100vw, 33vw" />}<h3>{video.title}</h3><p>{video.description}</p><a className="text-link" href={video.url} target="_blank" rel="noopener noreferrer">{showcaseCopy.watch} {video.platform}<ArrowUpRight size={18} aria-hidden="true" /></a></article>)}</div></section>;
}
