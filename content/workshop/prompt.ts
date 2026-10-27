/** Add sentence breaks for reading and copying without rewriting generation instructions. */
export function formatWorkshopPrompt(text: string, language: 'vi' | 'en', format: 'text' | 'yaml' = 'text'): string {
  if (format === 'yaml') return text;
  const sentences = new Intl.Segmenter(language, { granularity: 'sentence' });
  return text.split('\n').map(line =>
    Array.from(sentences.segment(line), part => part.segment.trim()).join('\n')
  ).join('\n');
}
