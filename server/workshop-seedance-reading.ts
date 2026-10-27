import type { Curriculum } from './workshop-content';
import type { LessonStep } from '../content/workshop/types';

type ReadingGroup = {
  lesson: string;
  step: number;
  save: string;
  lab?: string;
  intro?: [string, string];
  vi: string[];
  en: string[];
};

// Authored breakpoints keep related sentences together, including caveats.
// Retain the source wording so future factual edits are not shadowed by a copy.
const groups: ReadingGroup[] = [
  { lesson: 'references', step: 0, save: '01-character/reference-qa.txt',
    intro: ['Chọn ảnh theo việc bạn cần kiểm tra:', 'Choose each reference for what you need to check:'],
    vi: ['Dùng ảnh chân dung', 'Ảnh toàn thân', 'Tải từng ảnh mẫu', 'Bộ ZIP đầy đủ', 'Một ảnh có màu áo'],
    en: ['The portrait is', 'Use the individual', 'Matching colors'] },
  { lesson: 'references', step: 1, save: '01-character/lan-portrait.png',
    intro: ['Chọn một trong hai cách tạo ảnh, rồi tải ảnh đã kiểm tra về máy:', 'Choose one image-generation route, then download the image after checking it:'],
    vi: ['Cách A (Codex)', 'Cách B (Gemini)', 'Chờ đến khi', 'Nếu công cụ chỉ'],
    en: ['Route A (Codex)', 'Route B (Gemini)', 'Wait for a real image', 'If the tool only'] },
  { lesson: 'references', step: 4, save: '01-character/reference-qa.txt + lan-full.png',
    vi: ['Ghi chú ba', 'Kiểm tra file', 'Khi nhờ GPT Image', 'Mục tiêu là', 'Khi ảnh đầu vào', 'Khi là ảnh bạn', 'Với mỗi bản v02'],
    en: ['Note three features', 'Check the lan-full.png', 'When you ask GPT Image', 'The aim is', 'When the input', 'When it is your own'] },
  { lesson: 'planning', step: 0, save: '02-location/floorplan.txt',
    vi: ['Vẽ sơ đồ', 'Đường nối Lan', 'Đây là sơ đồ', 'Ở shot Lan'],
    en: ['Then sketch', 'The line from Lan', 'This sketch', 'When Lan looks'] },
  { lesson: 'planning', step: 3, save: '02-location/shot-01-start.png',
    vi: ['Kiểm tra xem kết quả', 'Nếu bạn chưa ghép', 'Sau khi vẽ sơ đồ', 'Giữ con đường'],
    en: ['Check that you have', 'If you cannot get', 'After drawing', 'Keep the path'] },
  { lesson: 'frames', step: 0, save: '03-prompts/prompt-anatomy.txt',
    intro: ['Một prompt video nên làm rõ các ý sau:', 'A video prompt should make these points clear:'],
    vi: ['Hãy mô tả', 'Thêm điểm kết thúc', 'Chọn thời lượng', 'Dùng bảng bên dưới'],
    en: ['A useful prompt', 'Not every shot', 'Set the duration', 'Use the explanation'] },
  { lesson: 'frames', step: 3, save: '03-prompts/shot-01-final.txt',
    vi: ['Kiểm tra xem', 'Xóa những hành động', 'Chọn thời lượng'],
    en: ['Check that it covers', 'Delete any actions', 'Choose the duration'] },
  { lesson: 'frames', step: 6, save: '03-prompts/assistant-comparison.txt',
    vi: ['Claude không xem', 'Bên dưới là', 'Codex đã rà', 'Ví dụ này'],
    en: ['Claude did NOT', 'Below is the actual', 'Codex checked', 'This is evidence', 'Repair one kind'] },
  { lesson: 'motion', step: 3, save: '04-clips/take-log.txt',
    vi: ['Tự hỏi:', 'Ba lô có', 'Chiếc đèn có', 'Bàn chân có', 'Ghi lại mốc giây', 'Clip đạt khi'],
    en: ['Ask yourself:', 'Is the backpack', 'Does the unlit', 'Do her feet', 'Write down the timestamp', 'The clip passes'] },
  { lesson: 'motion', step: 5, save: '04-clips/diagnosis.txt',
    vi: ['Xem clip ở', 'Mỗi lượt chỉ', 'Khóa học đặt', 'Chọn một ngôn ngữ', 'Trước khi tạo, ghi', 'Khi có video'],
    en: ['Separate defects', 'Watch at normal', 'Change only one', 'This exercise allows', 'Choose one prompt language', 'Before you generate, fill', 'When the video finishes'] },
  { lesson: 'review', step: 0, save: '04-clips/continuity.tsv',
    vi: ['Ảnh dùng để nối', 'Trong câu chuyện này', 'Nếu chưa có video'],
    en: ['The ending frame', 'Keep the lantern', 'If you are on'] },
  { lesson: 'review', step: 3, save: '04-clips/shot-03-take-01.mp4 + 04-clips/continuity-notes.txt',
    vi: ['Chiếc đèn phải', 'Tải clip shot 3', 'Xem liên tiếp', 'Nếu khuôn mặt', 'Ở mỗi điểm nối', 'Lan nghe một tiếng'],
    en: ['The lantern must', 'Download the shot 3', 'Watch the end', 'If the face', 'At each join', 'Lan hears a call'] },
  { lesson: 'delivery', step: 0, save: '06-delivery/README.txt',
    intro: ['Chọn bản phù hợp với những file bạn đã có:', 'Choose the version that matches the files you have:'],
    vi: ['Nếu đã có video', 'Nếu chưa tạo video', 'Trong thư mục'],
    en: ['Video path:', 'Preparation path:', 'Create a 06-delivery'] },
  { lesson: 'delivery', step: 6, save: '06-delivery/variation/decision-log.txt',
    vi: ['Liệt kê những file', 'Ví dụ, khung 9:16', 'Làm một shot', 'Bạn được nhờ'],
    en: ['List the files', 'For example, a 9:16', 'Make one shot', 'An assistant may'] },
  { lesson: 'delivery', step: 7, save: '06-delivery/capstone/',
    vi: ['Ví dụ:', 'Giữ trong giới hạn', 'Nộp brief', 'Giải thích ít nhất', 'Bạn có thể dùng', 'Nếu thiếu credit'],
    en: ['Some examples:', 'Keep the project small', 'Hand in the brief', 'Explain at least', 'You may use', 'If you do not have'] },
  { lesson: 'delivery', step: 8, save: '06-delivery/assessment.tsv',
    vi: ['Với phần chưa', 'Phần chuẩn bị đạt', 'Phần video chỉ đạt', 'Để đánh giá', 'Đây là thang', 'Trước khi hoàn thành', 'Nếu nộp animatic'],
    en: ['For anything', 'The preparation foundations', 'The video foundations', 'Working independently', 'This is the course', 'Before you call it complete', 'If you submit an animatic'] },
  { lesson: 'motion', lab: 'sd25-camera-ab', step: 0, save: '04-clips/camera-ab.txt',
    intro: ['So sánh hai cách đặt camera với cùng một ảnh đầu:', 'Compare two camera choices using the same starting image:'],
    vi: ['A:', 'B:', 'Ghi báo giá', 'So sánh đầu', 'Kết quả AI', 'Nếu hết credit'],
    en: ['A:', 'B:', 'Write down both', 'Compare the start', 'AI results vary', 'If you have no credits'] },
  { lesson: 'motion', lab: 'sd25-draft-final', step: 0, save: '04-clips/finalization-decision.txt',
    vi: ['Chỉ dùng cách này', 'Nếu bạn chỉ đổi', 'Upscale chỉ', 'Kể cả khi'],
    en: ['Use this only', 'If you only change', 'Upscaling just', 'Even when finalizing'] },
  { lesson: 'review', lab: 'sd25-modes', step: 0, save: '04-clips/mode-comparison.txt',
    intro: ['Chọn chế độ theo đầu vào bạn muốn dùng:', 'Choose a mode for the inputs you want to use:'],
    vi: ['Text-to-video', 'Với omni reference:', 'Nếu giao diện tự tạo', 'Bỏ bớt những', 'Chỉ cần chọn'],
    en: ['Text-to-video', 'For omni reference,', 'If the interface creates', 'Remove references', 'Pick just one'] },
  { lesson: 'review', lab: 'sd25-audio-performance', step: 0, save: '05-edit/audio/audio-review.tsv',
    vi: ['Lên kế hoạch ba lớp', 'Nếu chế độ hỗ trợ', 'Nếu không, hãy tạo', 'Ghi chữ'],
    en: ['Plan three layers', 'If the mode supports', 'If it does not', 'Writing “Vietnamese”'] },
  { lesson: 'review', lab: 'sd25-advanced-control', step: 1, save: '04-clips/advanced-control-review.txt',
    vi: ['Phông xanh:', 'Hai nhân vật:', 'Đừng bắt đầu'],
    en: ['Green screen:', 'Two characters:', 'Do not start'] },
];

function splitExplanation(step: LessonStep, starts: string[], intro?: string) {
  const positions = starts.map(start => {
    const position = step.instruction.indexOf(start);
    if (position < 0 || step.instruction.indexOf(start, position + 1) >= 0) {
      throw new Error(`Missing or ambiguous reading breakpoint in ${step.save}: ${start}`);
    }
    return position;
  });
  if (positions.some((position, index) => index > 0 && position <= positions[index - 1])) {
    throw new Error(`Reading breakpoints out of order in ${step.save}`);
  }
  const lead = step.instruction.slice(0, positions[0]).trim();
  if ((intro && lead) || (!intro && !lead) || step.instructionPoints?.length) {
    throw new Error(`Conflicting reading introduction in ${step.save}`);
  }
  step.instructionPoints = positions.map((position, index) => step.instruction.slice(position, positions[index + 1]).trim());
  step.instruction = intro ?? lead;
}

export function formatSeedanceExplanations(course: Curriculum, locale: 'vi' | 'en'): void {
  for (const group of groups) {
    const lesson = course.lessons.find(item => item.id === group.lesson);
    const steps = group.lab ? lesson?.techniques?.find(item => item.id === group.lab)?.steps : lesson?.steps;
    const step = steps?.[group.step];
    if (!step || step.save !== group.save) throw new Error(`Missing reading section: ${group.lesson}/${group.save}`);
    splitExplanation(step, group[locale], group.intro?.[locale === 'vi' ? 0 : 1]);
  }
}
