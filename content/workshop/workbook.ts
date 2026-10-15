import type { LessonStep, WorkshopContent } from './types';
import type { WorkshopLocale } from './copy';

export function formatWorkshopWorkbook(content: WorkshopContent, locale: WorkshopLocale): string {
  const t = (vi: string, en: string) => locale === 'en' ? en : vi;
  const steps = (items: LessonStep[]) => items.map((step, i) => {
    const english = step.prompt ? `PROMPT (${step.promptLanguage === 'vi' ? 'Vietnamese' : 'English'}):\n${step.prompt}` : '';
    const vietnamese = step.promptVi ? `${t('CÂU LỆNH TIẾNG VIỆT', 'PROMPT (Vietnamese)')}:\n${step.promptVi}` : '';
    const example = step.testedExample;
    const evidence = step.promptEvidence || (!step.promptVi ? '' : example
      ? [
        `${t('ĐÃ THỬ TẠO ẢNH BẰNG TIẾNG VIỆT', 'IMAGE TESTED WITH VIETNAMESE PROMPT')} · ${example.tool} · ${example.date}`,
        ...(example.inputImage ? [`Input: https://genyzstudio.com${example.inputImage}`] : []),
        `https://genyzstudio.com${example.image}`, example.review,
      ].join('\n')
      : `${t('CHƯA CHẠY THỬ', 'NOT YET TESTED')}${step.promptKind === 'video' ? t(' — chưa có video kết quả', ' — no video result') : ''}`);
    return [
      `${i + 1}. ${step.title}`, step.tool, step.instruction,
      ...(locale === 'vi' ? [vietnamese, english] : [english, vietnamese]), evidence,
      ...(step.referenceImages || []).map(input => `${input.label}: https://genyzstudio.com${input.src}`),
      ...(example && (!step.promptVi || step.promptEvidence) ? [`https://genyzstudio.com${example.image}`, example.review] : []),
      ...(step.media || []).map(media => `${media.label}: https://genyzstudio.com${media.src}`),
      step.resultText || '', step.resultReview || '',
      `${t('Lưu:', 'Save:')} ${step.save}`, `${t('Ghi chú của tôi:', 'My notes:')} __________________`,
    ].filter(Boolean).join('\n\n');
  }).join('\n\n');
  return [
    `GENYZ STUDIO · ${content.courseTitle}`, content.durationLabel || '',
    ...(content.source ? [content.source.title, content.source.author, content.source.href, content.source.note] : []),
    ...(content.lessons.some(lesson => [...lesson.steps, ...(lesson.techniques || []).flatMap(lab => lab.steps)].some(step => step.testedExample || step.media?.length)) ? [t('Liên kết ảnh và video ví dụ cần có mạng và đăng nhập workshop trong cùng trình duyệt. Bạn có thể tải file bằng liên kết trong lớp.', 'Example image and video links require internet and a workshop login in the same browser. Use the download links in the classroom to save files locally.')] : []),
    content.preparation.title, content.preparation.intro,
    ...content.preparation.steps.map(step => `${step.heading}\n${step.text}`), content.preparation.note,
    ...(content.preparation.toolPaths || []).flatMap(path => [path.title, ...path.steps]),
    ...(content.preparation.visualGuide || []).flatMap(guide => [guide.title, guide.intro, `https://genyzstudio.com${guide.image}`, ...guide.captions, guide.tryIt,
      ...(guide.recreation ? [guide.recreation.evidence, ...guide.recreation.instructions, ...guide.recreation.references.map(reference => `${reference.label}: https://genyzstudio.com${reference.src}`), ...(guide.recreation.promptEn ? [`PROMPT (English):\n${guide.recreation.promptEn}`] : []), `PROMPT (Vietnamese):\n${guide.recreation.promptVi}`] : [])]),
    ...content.tools.map(tool => `${tool.name}: ${tool.href}\n${tool.purpose}`),
    ...content.glossary.map(([term, meaning]) => `${term}: ${meaning}`),
    ...content.lessons.map((lesson, i) => [
      `\nMODULE ${i + 1} · ${content.syllabus.find(item => item.id === lesson.id)?.title || lesson.id}`,
      lesson.goal, lesson.terms, `${t('Đầu vào:', 'Inputs:')} ${lesson.input}`, steps(lesson.steps),
      ...(lesson.visualExamples || []).map(example => [example.title, example.instruction, example.settings,
        ...example.inputs.map(input => `${input.label}: https://genyzstudio.com${input.src}`),
        ...(example.promptEn ? [`PROMPT (English):\n${example.promptEn}`] : []), example.promptVi ? `PROMPT (Vietnamese):\n${example.promptVi}` : '', ...example.outputs.map(output => `${output.label}: https://genyzstudio.com${output.src}`), example.review].join('\n\n')),
      ...(lesson.techniques || []).map((lab, n) => [
        `\n${t('BÀI KỸ THUẬT', 'TECHNIQUE LAB')} ${n + 1} · ${lab.title}`, lab.goal,
        `${t('Đầu vào:', 'Inputs:')} ${lab.input}`, steps(lab.steps),
        `${t('Kiểm tra:', 'Review:')} ${lab.check}`, `${t('Nếu chưa đạt:', 'If it fails:')} ${lab.fix}`,
      ].join('\n\n')),
      lesson.example.title, lesson.example.text, lesson.example.href || '',
      ...lesson.troubleshooting.map(item => `${item.problem}\n${item.fix}`),
      t('KIỂM TRA LỘ TRÌNH CHÍNH', 'CORE PATH CHECKLIST'), ...lesson.checks.map(check => `[ ] ${check}`),
    ].join('\n\n')),
  ].join('\n\n');
}
