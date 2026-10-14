import Image from 'next/image';
import { workshopImagePreview, workshopPreviewWidths } from '../content/workshop/image-preview';

export function WorkshopImage({ src, alt, width, height, sizes }: { src: string; alt: string; width: number; height: number; sizes: string }) {
  if (!/^\/api\/workshop\/examples\/[a-z0-9-]+\.png$/.test(src)) return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} />;
  // Prebuilt variants retain the same authenticated route as the originals.
  return <picture>
    <source type="image/webp" sizes={sizes} srcSet={workshopPreviewWidths.map(size => `${workshopImagePreview(src, size)} ${Math.min(size, width)}w`).join(', ')} />
    <Image src={src} alt={alt} width={width} height={height} sizes={sizes} unoptimized loading="lazy" decoding="async" />
  </picture>;
}
