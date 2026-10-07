import Image from 'next/image';
import { Play, FrameCorners, ArrowsClockwise, Waveform, FilmStrip, Quotes, CheckCircle } from '@phosphor-icons/react';
import type { PipelineId } from '@/content/pipeline';
import type { WorkflowProject } from '@/content/workflows';
import type { Locale } from '@/content/locales';

/** Thumbnail previews use project sources; schematic steps never pretend to be production records. */
export function PipelineArt({ id, project, locale }: { id: PipelineId; project: WorkflowProject; locale: Locale }) {
  const en = locale === 'en';
  const image = (src: string, index = 0) => <Image key={`${src}-${index}`} src={src} alt="" width={480} height={270} sizes="(max-width:760px) 85vw, 25vw" />;
  const story = project.stages.story;
  const refs = project.stages.characters?.media;
  const boards = project.stages.storyboard?.media;
  const motion = project.stages.motion?.media;
  if (id === 'story' && story) return <div className="journey-art journey-script"><Quotes size={24} weight="fill" /><p>{story.quote || story.title}</p><span>{en ? 'Script excerpt' : 'Trích kịch bản'}</span></div>;
  if (id === 'references' && refs) return <div className={`journey-art journey-references refs-${refs.length}`}>{refs.map((item,i) => image(item.src,i))}</div>;
  if (id === 'planning' && boards) return <div className={`journey-art journey-boards boards-${boards.length}`}>{boards.map((item,i) => image(item.src,i))}</div>;
  if (id === 'motion' && motion) return <div className="journey-art journey-footage">{image(motion[motion.length-1].poster || project.cover)}<Play size={38} weight="fill" /></div>;
  if (id === 'delivery') return <div className="journey-art journey-footage">{image(project.stages.film?.film?.thumbnail || project.cover)}<Play size={38} weight="fill" /></div>;
  if (id === 'edit') return <div className="journey-art journey-edit"><FilmStrip size={28} /><div className="journey-timeline">{[0,1,2].map(i => <span key={i}>{image(boards?.[i % boards.length]?.src || project.cover,i)}</span>)}</div><span>{en ? 'Editing concept' : 'Minh hoạ cách dựng'}</span></div>;
  if (id === 'sound') return <div className="journey-art journey-sound">{(en ? ['Voice','Ambience','Music'] : ['Thoại','Không gian','Nhạc']).map((label,i) => <div key={label}><span>{label}</span><i className={`audio-layer layer-${i}`}><Waveform size={22}/></i></div>)}</div>;
  if (id === 'review') return <div className="journey-art journey-review"><ArrowsClockwise size={30} /><div>{(en ? ['Continuity','Performance','Timing'] : ['Nhất quán','Diễn xuất','Nhịp']).map(label=><span key={label}><CheckCircle size={16}/>{label}</span>)}</div></div>;
  return <div className="journey-art journey-empty"><FrameCorners size={42} weight="thin"/><span>{en ? 'From intention to image' : 'Từ ý tưởng đến khung hình'}</span></div>;
}
