'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { WorkflowStage } from '@/content/workflows';
import type { Locale } from '@/content/locales';

export function StoryboardSequence({ media, locale }: { media: NonNullable<WorkflowStage['media']>; locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const frame = media[selected];
  return <div className="sequence-study"><figure><Image src={frame.src} alt={frame.alt} width={1280} height={720} sizes="(max-width:760px) 90vw, 600px"/><figcaption aria-live="polite">{frame.caption}</figcaption></figure><div className="sequence-strip" role="group" aria-label={locale === 'en' ? 'Explore storyboard frames' : 'Khám phá khung storyboard'}>{media.map((item,index)=><button type="button" key={item.src} aria-pressed={selected === index} aria-label={`${index+1}: ${item.caption}`} onClick={()=>setSelected(index)}><Image src={item.src} alt="" width={240} height={135}/><span>{String(index+1).padStart(2,'0')}</span></button>)}</div></div>;
}
