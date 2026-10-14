import type { LessonStep, WorkshopLesson } from '../content/workshop/types';
import results from './workshop-director-test-results.json';
import plans from './workshop-director-planning-results.json';

/** Pair each exact submitted prompt with its own inputs and observed output. */
export function attachDirectorResults(locale: 'vi' | 'en', lessons: WorkshopLesson[]): WorkshopLesson[] {
  const vi = locale === 'vi';
  const image = (name: string) => `/api/workshop/examples/${name}.png`;
  return lessons.map(lesson => ({ ...lesson, steps: lesson.steps.flatMap((step): LessonStep[] => {
    const runs = results.filter(run => run.sourcePrompt === step.prompt);
    if (!runs.length) {
      const plan = plans.find(item => item.sourcePrompt === step.prompt);
      return [plan ? {...step, resultText: vi ? plan.vi : plan.en, promptEvidence: vi ? 'Bản trả lời bằng văn bản do ChatGPT soạn cho prompt này. Các lượt tạo ảnh và video được ghi riêng ở những bước tiếp theo.' : 'A worked text response authored by ChatGPT for this prompt. Image and video runs are documented separately in the following steps.'} : step];
    }
    return runs.map(run => {
      const title = vi ? run.titleVi : run.titleEn;
      const review = vi ? run.reviewVi : run.reviewEn;
      const common: LessonStep = {
        ...step, title, prompt: run.prompt, tool: run.provider,
        instruction: step.instruction.replace('Prompt bên dưới chưa chạy thử. ', '').replace('The prompts are untested. ', ''),
        referenceImages: run.inputs.map(name => ({label: `${name}.png`, src: image(name)})),
        promptEvidence: run.kind === 'video'
          ? (vi ? `Đã chạy trong Google Flow với Veo 3.1 Fast: ${run.settings}. Clip đầy đủ được giữ lại để kiểm tra cả lỗi ở cuối.` : `Run in Google Flow with Veo 3.1 Fast: ${run.settings}. The full clip is retained to expose late failures.`)
          : (vi ? 'Đã chạy bằng ChatGPT imagegen với đúng prompt tiếng Việt và ảnh mẫu bên dưới.' : 'Run with ChatGPT imagegen using this exact Vietnamese prompt and the recorded references.'),
        save: `${run.file}.${run.kind === 'image' ? 'png' : 'mp4'} + prompt.txt + review.txt`,
      };
      return run.kind === 'image' ? {...common, testedExample: {image: image(run.file), width: run.width, height: run.height, inputImage: image(run.inputs[0]), inputWidth: 1672, inputHeight: 941, alt: title, tool: run.provider, date: run.date, review}}
        : {...common, resultReview: review, media: [{label: title, kind: 'video', src: `/api/workshop/examples/${run.file}.mp4`, poster: `/api/workshop/examples/${run.file}-poster.jpg`, width: run.width, height: run.height}]};
    });
  }) }));
}
