import type { WorkshopLesson, WorkshopVisualExample } from '../content/workshop/types';
import runs from './workshop-regenerated-videos.json';

const image = (name: string) => `/api/workshop/examples/${name}.png`;
const outputs = (run: typeof runs[number], title: string): WorkshopVisualExample['outputs'] => [{
  label: title, kind: 'video', src: `/api/workshop/examples/${run.file}.mp4`,
  poster: `/api/workshop/examples/${run.file}-poster.jpg`, width: run.width, height: run.height,
}];
const evidence = (vi: boolean) => vi
  ? 'Bản tiếng Anh bên dưới là prompt đã chạy thực tế. Bản tiếng Việt là bản dịch để đọc và thực hành, chưa chạy riêng. Xem toàn bộ clip và đối chiếu với ảnh đầu vào.'
  : 'The English prompt below was actually run. The Vietnamese version is a reading and practice translation, not a separately tested run. Compare the full clip with its input.';

/** Keep the original attempts inspectable and pair each replacement with its own provenance. */
export function attachRegeneratedDirectorVideos(locale: 'vi' | 'en', lessons: WorkshopLesson[]): WorkshopLesson[] {
  const vi = locale === 'vi';
  return lessons.map(lesson => {
    const visualExamples: WorkshopVisualExample[] = [...(lesson.visualExamples || [])];
    const anchors = [
      ...lesson.steps.flatMap(step => step.media || []),
      ...visualExamples.flatMap(example => example.outputs),
    ];
    const replacements = runs.filter(run => run.course === 'directors-framework' && anchors.some(media => media.src.endsWith(`/${run.anchor}.mp4`)));
    for (const run of replacements) {
      const title = vi ? run.titleVi : run.titleEn;
        visualExamples.push({
          id: run.file, title, instruction: vi ? run.instructionVi : run.instructionEn,
          promptVi: run.promptVi, promptEn: run.promptEn,
          settings: `${run.provider} · ${run.settings}. ${evidence(vi)} · ${run.sourceId}`,
          inputs: run.inputs.map(name => ({label: `${name}.png`, src: image(name)})),
          outputs: outputs(run, title), review: vi ? run.reviewVi : run.reviewEn,
        });
    }
    return {...lesson, ...(visualExamples.length ? {visualExamples} : {})};
  });
}

export function regeneratedFiveLevelExamples(locale: 'vi' | 'en', lesson: string): WorkshopVisualExample[] {
  const vi = locale === 'vi';
  const examples: WorkshopVisualExample[] = runs.filter(run => run.course === 'five-levels' && run.lesson === lesson).map(run => {
    const title = vi ? run.titleVi : run.titleEn;
    return {
      id: run.file, title, instruction: vi ? run.instructionVi : run.instructionEn,
      promptVi: run.promptVi, promptEn: run.promptEn, settings: `${run.provider} · ${run.settings}. ${evidence(vi)} · ${run.sourceId}`,
      inputs: run.inputs.map(name => ({label: `${name}.png`, src: image(name)})),
      outputs: outputs(run, title), review: vi ? run.reviewVi : run.reviewEn,
    };
  });
  if (lesson === 'delivery') examples.push({
    id: 'edit-v2', title: vi ? 'Ngọn đèn cuối cùng · Bản dựng mới 20 giây' : 'The Last Lantern · New 20-second edit',
    instruction: vi ? 'Xếp bốn clip mới theo thứ tự bên dưới, lấy 0–5 giây mỗi clip. Cắt sang cận mặt để lược bỏ nhịp rút diêm và hạ kính; trở lại cảnh chèn có người thợ vẫn ở phía sau đèn.' : 'Assemble the four new clips below, using 0–5 seconds from each. The close-up cutaway elides match withdrawal and closing the chimney; return to an insert with the repairer still behind the lamp.',
    settings: 'camera-static-vi-v3 → lantern-ignition-vi-v2 → reaction-close-vi-v2 → lantern-hold-vi-v2 · 4 × 5s · hard cuts · 852×480 · 24fps · H.264 · audio removed',
    inputs: ['camera-static-vi-v3', 'lantern-ignition-vi-v2', 'reaction-close-vi-v2', 'lantern-hold-vi-v2'].map((name, i) => ({label: `Shot ${i + 1} · ${name}`, src: `/api/workshop/examples/${name}.mp4`})),
    outputs: [{label: vi ? 'Bản dựng mới · 20 giây' : 'New edit · 20 seconds', kind: 'video', src: '/api/workshop/examples/last-lantern-edit-vi-v2.mp4', poster: '/api/workshop/examples/last-lantern-edit-vi-v2-poster.jpg', width: 852, height: 480}],
    review: vi ? 'Đã có nguyên nhân nhìn thấy được cho việc đèn sáng, đúng cận mặt phản ứng và người thợ vẫn hiện diện trong hai cảnh chèn. Cắt cảnh chủ động lược bỏ thao tác đóng kính; không giả định bốn shot là một hành động liên tục không ngắt. Bản dựng không có âm thanh, chưa minh họa voice reference, lip-sync hoặc VFX trên video người thật.' : 'Shows a visible cause for ignition, the intended reaction close-up and the repairer present in both inserts. The cutaway deliberately elides closing the chimney; these are four edited shots, not an uninterrupted procedure. Silent edit; does not demonstrate voice reference, lip sync or live-action VFX.',
  });
  return examples;
}
