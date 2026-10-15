import type { LessonStep, WorkshopLesson } from '../content/workshop/types';
import results from './workshop-director-test-results.json';
import plans from './workshop-director-planning-results.json';
import { attachRegeneratedDirectorVideos } from './workshop-regenerated-videos';

/** Pair each exact submitted prompt with its own inputs and observed output. */
export function attachDirectorResults(locale: 'vi' | 'en', lessons: WorkshopLesson[]): WorkshopLesson[] {
  const vi = locale === 'vi';
  const image = (name: string) => `/api/workshop/examples/${name}.png`;
  return attachRegeneratedDirectorVideos(locale, lessons.map(lesson => ({ ...lesson, steps: lesson.steps.flatMap((step): LessonStep[] => {
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
      if (run.file === 'director-wide-static-v1') common.instruction = vi
        ? 'Dùng frame-repair-v1 làm ảnh mở đầu. So clip với ảnh gốc: camera có đứng yên, vị trí hai người và lõi có giữ nguyên không? Xem toàn bộ tám giây trước khi chọn đoạn ổn định 3–5 giây; không suy ra clip đạt chỉ vì phần đầu giống ảnh.'
        : 'Use frame-repair-v1 as the start. Compare the full take with the image: is the camera fixed and do both characters and the core hold position? Review all eight seconds before selecting a stable 3–5 second range; a matching opening alone does not approve the take.';
      if (run.file === 'director-medium-static-v1') common.instruction = vi
        ? 'Dùng frame-medium-v1 với tay phải đã nâng làm ảnh đầu. Kiểm tra tư thế giữ yên, miệng, vòng tay và góc nhìn ở đầu, giữa, cuối. Clip giữ tư thế không minh họa động tác nâng tay; chỉ chọn đoạn còn đạt và ghi lỗi cuối clip.'
        : 'Use frame-medium-v1 with the right hand already raised. Check the held pose, mouth, bracelet and framing at the start, middle and end. A held-pose clip does not demonstrate raising the hand; select only usable footage and record late failures.';
      const instructions: Record<string, [string, string]> = {
        'director-l1-a-v1': ['Tạo bản A với Linh ở một phần ba trái. Đối chiếu kích thước nhân vật, khoảng nhìn, ánh sáng và tay đeo vòng với ảnh gốc trước khi so với B.','Create A with Linh on the left third. Check subject size, looking room, lighting and bracelet arm against the original before comparing with B.'],
        'director-l1-b-v1': ['Tạo bản B nhỏ hơn trong khung và có thêm khoảng nhìn bên phải. So với A: vị trí có giúp gợi đối thủ ngoài hình không? Lượt đầu đã nâng sai tay; không duyệt chỉ vì bố cục đẹp.','Create B with a smaller subject and more looking room on the right. Does it suggest the offscreen opponent better than A? This first attempt raises the wrong arm; attractive framing is not enough for approval.'],
        'director-l1-b-v2': ['Đính kèm ảnh B bị lỗi làm đầu vào. Chỉ sửa tay phải có vòng ngọc lam nâng ngang ngực và tay trái hạ xuống, giữ bố cục. So lại mặt, cả hai cổ tay và khoảng nhìn sau khi sửa.','Attach the failed B as input. Raise the right bracelet arm to chest height and lower the left, preserving layout. Recheck face, both wrists and looking room after the repair.'],
        'director-medium-dolly-v1': ['Dùng lại frame medium và thử camera tiến gần. Xem tay, miệng và hậu cảnh tách biệt với đường máy. Lượt này sai tư thế; ghi cụ thể lỗi trước khi xem bản sửa, không dùng làm mẫu dolly đã đạt.','Reuse the medium and test a move closer. Review hands, mouth and background separately from the camera path. This take fails the pose brief; record its defects before reviewing the revision rather than treating it as an approved dolly.'],
        'director-medium-dolly-v2': ['Dùng lại cùng frame, nhưng prompt nhấn mạnh tay trái hạ, tay phải giữ nguyên và miệng khép. So với lượt đầu; kiểm tra cả khung cuối. Mức 10% chỉ là hướng dẫn trong prompt, không phải số đo camera đã được xác nhận.','Reuse the same frame with stronger directions for left arm down, right hand held and mouth closed. Compare with the first take and inspect the ending. The 10% request is prompt guidance, not a measured camera move.'],
        'director-lighting-v1': ['Yêu cầu lõi tăng sáng nhẹ một lần và ánh hắt đổi tương ứng. Xem nguồn, phản chiếu và chi tiết giáp. Lượt này có flare lớn, nên chỉ dùng để tìm lỗi chứ chưa đạt yêu cầu ánh sáng tinh tế.','Request one subtle core-brightness increase with matching light spill. Inspect source, reflections and armor detail. This take has a large flare and remains a diagnostic example.'],
        'director-lighting-v2': ['Bản sửa yêu cầu giữ kích thước lõi, giảm thay đổi độ sáng và cấm flare. So toàn bộ clip với lượt đầu: hiệu ứng giảm chưa đồng nghĩa đã đạt. Nếu lõi vẫn trắng cháy, chọn ánh sáng ổn định hoặc tạo thử riêng.','The revision locks core size, reduces the brightness change and forbids flare. Compare the entire clip: less effect is not necessarily success. If the core still blooms white, choose stable lighting or run a separate test.'],
      };
      if (instructions[run.file]) common.instruction = instructions[run.file][vi ? 0 : 1];
      return run.kind === 'image' ? {...common, testedExample: {image: image(run.file), width: run.width, height: run.height, inputImage: image(run.inputs[0]), inputWidth: 1672, inputHeight: 941, alt: title, tool: run.provider, date: run.date, review}}
        : {...common, resultReview: review, media: [{label: title, kind: 'video', src: `/api/workshop/examples/${run.file}.mp4`, poster: `/api/workshop/examples/${run.file}-poster.jpg`, width: run.width, height: run.height}]};
    });
  }) })));
}
