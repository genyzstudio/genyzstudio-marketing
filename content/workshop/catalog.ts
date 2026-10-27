import type { WorkshopCourseId } from './access';
import type { WorkshopLocale } from './copy';

type Translation = Record<WorkshopLocale, string>;
export type WorkshopTopic = 'foundations' | 'visuals' | 'production';
export const workshopTopics: Record<WorkshopTopic, Translation> = {
  foundations: { vi: 'Nền tảng', en: 'Foundations' },
  visuals: { vi: 'Ngôn ngữ hình ảnh', en: 'Visual storytelling' },
  production: { vi: 'Quy trình làm phim', en: 'Production' },
};
export interface WorkshopListing {
  id: WorkshopCourseId;
  title: Translation;
  description: Translation;
  topic: WorkshopTopic;
  level: 'intro' | 'practice';
  keywords: string;
  cover: { src: string; alt: Translation };
}
/** Public discovery copy only. Never import the protected curriculum into the catalog. */
export const workshopCatalog: WorkshopListing[] = [
  { id: 'clever-rat', cover: {"src":"/images/workshops/clever-rat.webp","alt":{"vi":"Leo và Mio chơi xếp hình trong căn phòng ngập nắng.","en":"Leo and Mio play with blocks in a sunlit bedroom."}}, title: { vi: 'Chú chuột nhỏ thông minh', en: 'The Clever Little Rat' }, description: { vi: 'Bắt đầu từ một câu chuyện nhỏ. Học cách nối hai shot thành một cảnh có tính liên tục.', en: 'Start with a small story. Learn to connect two shots into one continuous scene.' }, topic: 'foundations', level: 'intro', keywords: 'story character continuity câu chuyện nhân vật liên tục' },
  { id: 'five-levels', cover: {"src":"/images/workshops/five-levels.webp","alt":{"vi":"Chiếc đèn lồng thắp sáng trên bàn thợ sửa.","en":"A glowing lantern on a repairer’s workbench."}}, title: { vi: '5 cấp độ làm phim AI', en: '5 Levels of AI Filmmaking' }, description: { vi: 'Tìm hiểu từng cấp độ làm phim AI: từ chọn ảnh và tạo chuyển động đến tổ chức cả bộ phim.', en: 'Learn how much control each level gives you over the images, movement and production of an AI film.' }, topic: 'foundations', level: 'intro', keywords: 'image video motion Seedance chuyển động' },
  { id: 'master-frame', cover: {"src":"/images/workshops/master-frame.webp","alt":{"vi":"Linh ở tiền cảnh, phía sau là cây cầu và thành phố đêm.","en":"Linh in the foreground, with a bridge and night city behind her."}}, title: { vi: 'Làm chủ khung hình', en: 'Master the Frame' }, description: { vi: 'Thử các cỡ cảnh, góc máy và cách chiếu sáng. Kiểm tra xem nhân vật có giữ được ngoại hình qua từng ảnh không.', en: 'Try different framing, camera angles and lighting, and learn to keep your character recognizable across images.' }, topic: 'visuals', level: 'practice', keywords: 'lens lighting camera storyboard ánh sáng bố cục' },
  { id: 'directors-framework', cover: {"src":"/images/workshops/directors-framework.webp","alt":{"vi":"Linh đứng bên cây cầu, được bố trí giữa các đường dẫn trong khung hình.","en":"Linh staged beside a bridge, framed by the scene’s leading lines."}}, title: { vi: 'Tư duy đạo diễn', en: 'Director’s Framework' }, description: { vi: 'Chọn cách thể hiện câu chuyện qua nhân vật, bố cục và những chi tiết nối các shot với nhau.', en: 'Decide what each shot needs to show, then choose characters, composition and connections between shots that tell the story.' }, topic: 'visuals', level: 'practice', keywords: 'direction story composition đạo diễn bố cục' },
  { id: 'fight-scenes', cover: {"src":"/images/workshops/fight-scenes.webp","alt":{"vi":"Hai nhân vật đối mặt trên cây cầu, chuẩn bị cảnh hành động.","en":"Two characters face each other on a bridge before an action scene."}}, title: { vi: 'Dàn dựng cảnh hành động', en: 'AI Action Scenes' }, description: { vi: 'Lên động tác, chọn nhịp nhanh chậm và đặt máy quay để người xem theo dõi được cảnh hành động.', en: 'Plan the moves, pace and camera positions so viewers can follow the action.' }, topic: 'production', level: 'practice', keywords: 'fight action choreography Seedance chuyển động nhịp độ' },
  { id: 'ai-cinema-workflow', cover: {"src":"/images/workshops/ai-cinema-workflow.webp","alt":{"vi":"Ảnh minh họa: storyboard, máy quay và màn hình dựng phim trên bàn làm việc.","en":"Illustration: storyboards, a camera and an editing monitor on a film production desk."}}, title: { vi: 'Quy trình làm phim AI', en: 'AI Cinema Workflow' }, description: { vi: 'Học cách dựng cảnh, điều khiển camera và cắt dựng. Dùng storyboard và prompt YAML để chuẩn bị video nhiều shot.', en: 'Build scenes, control the camera and edit the footage. Use storyboards and YAML prompts to plan videos with several shots.' }, topic: 'production', level: 'practice', keywords: 'Freepik Kling Luma Seedance YAML camera cinema workflow' },
  { id: 'visual-effects', cover: {"src":"/images/workshops/visual-effects.webp","alt":{"vi":"Ảnh minh họa: Minh bên trụ cầu vỡ trong ánh sáng chiều và bụi mỏng.","en":"Illustration: Minh beside a broken bridge pier in evening light and fine dust."}}, title: { vi: 'Hiệu ứng hình ảnh chân thực', en: 'Visual Effects · Cinematic Realism' }, description: { vi: 'Học sáu cách làm hình ảnh trông chân thực hơn, rồi viết prompt YAML để thực hành một cảnh 5 giây.', en: 'Learn six ways to make a scene look more realistic, then write a YAML prompt and practise with a five-second scene.' }, topic: 'visuals', level: 'practice', keywords: 'VFX visual effects LED fire rain wire miniature hybrid YAML hiệu ứng hình ảnh mưa lửa thị sai' },
  { id: 'seedance-masterclass', cover: {"src":"/images/workshops/seedance-masterclass.webp","alt":{"vi":"Lan đứng trong chòi gỗ nhìn ra thung lũng, đèn lồng đặt trên ghế.","en":"Lan stands in a wooden shelter overlooking a valley, with a lantern on the bench."}}, title: { vi: 'Seedance 2.5 · Từ clip đầu tiên đến bộ phim của bạn', en: 'Seedance 2.5 · From Your First Clip to Your Own Film' }, description: { vi: 'Tạo nhân vật và ảnh tham chiếu bằng GPT Image, viết prompt với ChatGPT hoặc Claude, rồi tạo clip đầu tiên và học cách sửa lỗi video. Bạn sẽ chọn góc quay, làm một bộ phim riêng và tự kiểm tra theo hướng dẫn.', en: 'Create character and reference images with GPT Image, write prompts with ChatGPT or Claude, then generate your first clip. Learn to choose camera angles and fix problems before making a film of your own. Use the course checklist to review it.' }, topic: 'production', level: 'intro', keywords: 'Seedance beginner ChatGPT Claude Codex GPT Image Nano Banana character location reference continuity người mới nhân vật bối cảnh prompt' },
];
export function workshopHref(id: WorkshopCourseId, locale: WorkshopLocale) {
  return `${locale === 'en' ? '/en' : ''}/workshop${id === 'clever-rat' ? '' : `/${id}`}`;
}
export function libraryHref(locale: WorkshopLocale) { return `${locale === 'en' ? '/en' : ''}/workshops`; }
export function workshopLevel(level: WorkshopListing['level'], locale: WorkshopLocale) {
  return level === 'intro' ? (locale === 'vi' ? 'Nhập môn' : 'Introductory') : (locale === 'vi' ? 'Thực hành chuyên đề' : 'Focused practice');
}
function normalize(text: string) { return text.normalize('NFD').replace(/\p{M}/gu, '').replace(/[đĐ]/g, 'd').toLowerCase(); }
export function findWorkshops(query: string, topic: WorkshopTopic | 'all' = 'all') {
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  return workshopCatalog.filter(course => (topic === 'all' || course.topic === topic) && words.every(word => normalize([course.title.vi, course.title.en, course.description.vi, course.description.en, course.keywords, workshopTopics[course.topic].vi, workshopTopics[course.topic].en].join(' ')).includes(word)));
}
