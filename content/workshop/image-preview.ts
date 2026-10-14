export const workshopPreviewWidths = [480, 1280] as const;

export function workshopImagePreview(src: string, width: number): string {
  return src.replace(/\.png$/, `-preview-${width}.webp`);
}
