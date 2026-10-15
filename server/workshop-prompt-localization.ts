import type { Curriculum } from './workshop-content';
import type { LessonStep } from '../content/workshop/types';
import frameVi from './workshop-frame-prompts.json';
import frameEn from './workshop-frame-prompts-en.json';
import directorRuns from './workshop-director-test-results.json';
import directorPlans from './workshop-director-planning-results.json';
import directorEn from './workshop-director-prompts-en.json';
import exampleEn from './workshop-example-prompts-en.json';

const recordedTranslations = new Map<string, string>([
  ...Object.entries(frameVi).map(([key, prompt]): [string, string] => [prompt, frameEn[key as keyof typeof frameEn]]),
  ...directorRuns.map((run): [string, string] => [run.prompt, directorEn[run.file as keyof typeof directorEn]]),
  [directorPlans[0].sourcePrompt, directorEn['script-analysis']],
  [directorPlans[1].sourcePrompt, directorEn['shot-prompts']],
]);

/** Keep submitted Vietnamese wording intact; translations never inherit a tested-output claim. */
export function localizeWorkshopPrompts(curriculum: Curriculum, locale: 'vi' | 'en'): Curriculum {
  const note = locale === 'vi'
    ? ' Bản tiếng Anh là bản dịch để đọc và thực hành, chưa chạy thử; kết quả minh họa dùng prompt tiếng Việt gốc.'
    : ' The English version is a translation for reading and practice and has not been run; the illustrated output used the original Vietnamese prompt.';
  const toolNames: Record<string, string> = {
    'Ghi chú / Notes': 'Notes', 'Trình xem ảnh / Image viewer': 'Image viewer',
    'Trình phát video / Video player': 'Video player', 'Công cụ chat / Chat assistant': 'Chat assistant',
    'Thư mục dự án / Project folder': 'Project folder',
    'TopView + trình phát / video player': 'TopView + video player',
    'TopView · Canvas hoặc / or thư mục dự án / project folders': 'TopView · Canvas or project folders',
  };
  const localizeStep = (step: LessonStep): LessonStep => {
    step = locale === 'en' && toolNames[step.tool] ? {...step, tool: toolNames[step.tool]} : step;
    if (!step.prompt || step.promptLanguage !== 'vi' || step.promptVi) return step;
    const translation = recordedTranslations.get(step.prompt);
    if (!translation) return step;
    const evidence = step.promptEvidence || (step.testedExample
      ? (locale === 'vi'
        ? 'Ảnh được tạo bằng prompt tiếng Việt gốc. ' + (step.referenceImages?.length ? 'Các ảnh tham chiếu thực tế nằm trong danh sách đầu vào.' : 'Lượt này không đính kèm ảnh tham chiếu.')
        : 'The image was generated with the original Vietnamese prompt. ' + (step.referenceImages?.length ? 'The actual references are listed as inputs.' : 'No reference image was attached for this run.'))
      : '');
    const translationNote = step.resultText
      ? (locale === 'vi' ? ' Bản dịch tiếng Anh chưa chạy thử; phần trả lời mẫu được soạn riêng, không phải kết quả của một lượt chạy bản dịch.' : ' The English translation has not been run; the authored worked response is not a result generated with that translation.')
      : note;
    return { ...step, prompt: translation, promptVi: step.prompt, promptLanguage: 'en', promptEvidence: evidence + translationNote };
  };
  return {
    ...curriculum,
    lessons: curriculum.lessons.map(lesson => ({
      ...lesson,
      steps: lesson.steps.map(localizeStep),
      ...(lesson.techniques ? { techniques: lesson.techniques.map(lab => ({...lab, steps: lab.steps.map(localizeStep)})) } : {}),
      ...(lesson.visualExamples ? { visualExamples: lesson.visualExamples.map(example => {
        const translation = exampleEn.fiveLevels[example.id as keyof typeof exampleEn.fiveLevels];
        return example.promptVi && translation ? {...example, promptEn: translation, settings: example.settings + note} : example;
      }) } : {}),
    })),
    preparation: { ...curriculum.preparation,
      ...(curriculum.preparation.visualGuide ? { visualGuide: curriculum.preparation.visualGuide.map(guide => {
        if (!guide.recreation) return guide;
        const key = guide.image.match(/overview-(shots|lens|light|identity)-/)?.[1] as keyof typeof exampleEn.overview | undefined;
        return key ? {...guide, recreation: {...guide.recreation, promptEn: exampleEn.overview[key], evidence: guide.recreation.evidence + note}} : guide;
      }) } : {}),
    },
  };
}
