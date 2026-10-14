import { mkdir, stat, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { workshopMedia } from '../server/workshop-media';
import { workshopImagePreview, workshopPreviewWidths } from '../content/workshop/image-preview';

async function main() {
  const report = [];
  for (const [src, type] of Object.entries(workshopMedia)) {
    if (type !== 'image/png') continue;
    const original = `public${src}`;
    const originalBytes = (await stat(original)).size;
    const previews = [];
    for (const width of workshopPreviewWidths) {
      const path = `public${workshopImagePreview(src, width)}`;
      const result = await sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(path);
      previews.push({ path, width: result.width, height: result.height, bytes: result.size });
    }
    report.push({ original, originalBytes, previews });
  }
  await mkdir('artifacts', { recursive: true });
  await writeFile('artifacts/workshop-image-optimization.json', JSON.stringify(report, null, 2));
  const originalBytes = report.reduce((sum, image) => sum + image.originalBytes, 0);
  const previewBytes = report.reduce((sum, image) => sum + image.previews.at(-1)!.bytes, 0);
  console.log(`${report.length} images: ${(originalBytes / 1e6).toFixed(2)} MB originals → ${(previewBytes / 1e6).toFixed(2)} MB large previews (${(100 * (1 - previewBytes / originalBytes)).toFixed(1)}% smaller).`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
