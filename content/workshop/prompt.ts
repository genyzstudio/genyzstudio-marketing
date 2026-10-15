/** Add sentence breaks for reading and copying without rewriting generation instructions. */
export function formatWorkshopPrompt(text: string, language: 'vi' | 'en'): string {
  const sentences = new Intl.Segmenter(language, { granularity: 'sentence' });
  return text.split('\n').map(line =>
    Array.from(sentences.segment(line), part => part.segment.trim()).join('\n')
  ).join('\n');
}
