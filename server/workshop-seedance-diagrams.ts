import type { Curriculum } from './workshop-content';
import type { LessonStep } from '../content/workshop/types';

export function addSeedanceDiagrams(course: Curriculum, locale: 'vi' | 'en'): void {
  const t = (vi: string, en: string) => locale === 'vi' ? vi : en;
  const attach = (id: string, index: number, diagram: NonNullable<LessonStep['diagram']>) => {
    const step = course.lessons.find(lesson => lesson.id === id)?.steps[index];
    if (!step) throw new Error(`Missing Seedance diagram step: ${id}/${index}`);
    step.diagram = diagram;
  };
  attach('planning', 3, {
    kind: 'compose', title: t('Từ ảnh tham chiếu đến một khung hình', 'From references to one starting frame'),
    items: [
      { label: t('1 · Chân dung', '1 · Portrait'), detail: t('Giữ khuôn mặt', 'Face reference'), image: {src:'/api/workshop/examples/sd25-portrait.png', alt:t('Ảnh chân dung mẫu của Lan', 'Lan’s sample portrait'), width:1448, height:1086} },
      { label: t('2 · Toàn thân', '2 · Full body'), detail: t('Giữ trang phục và ba lô', 'Clothes and backpack') },
      { label: t('3 · Chòi trống', '3 · Empty shelter'), detail: t('Giữ bố cục', 'Location and layout'), image: {src:'/api/workshop/examples/sd25-location.png', alt:t('Ảnh chòi mẫu không có nhân vật', 'Sample empty shelter'), width:1672, height:941} },
      { label: t('4 · Đèn tắt', '4 · Unlit lantern'), detail: t('Giữ hình dáng đạo cụ', 'Prop reference') },
      { label: t('Ví dụ một ảnh đầu', 'Example start image'), detail: t('Một Lan · một đèn · đường đi trống', 'One Lan · one lantern · clear path'), image: {src:'/api/workshop/examples/sd25-start.png', alt:t('Ảnh mẫu Lan trong chòi, đèn ở trên ghế', 'Sample image of Lan in the shelter with a lantern on the bench'), width:1672, height:941} },
    ],
    caption: t('Sơ đồ minh họa cách ghép bốn ảnh theo đúng thứ tự trong bài. Ảnh đầu ở cuối sơ đồ là ảnh mẫu tạo trực tiếp bằng GPT Image, không phải kết quả của phép ghép này. Nếu công cụ nhận ít ảnh hơn, làm bài “Ghép khi thiếu ô tải” và dùng prompt tương ứng.', 'This diagram plans the four-image composite in the lesson’s order. The sample start image was generated directly with GPT Image; it is not the output of this composite. If your tool accepts fewer images, follow “Fewer upload slots” and use its matching prompt.'),
  });
  attach('motion', 1, {
    kind: 'upload', title: t('Trước khi bấm tạo video', 'Before generating video'),
    items: [
      { label: t('Ảnh đầu', 'Start image'), detail: 'shot-01-start.png' },
      { label: t('Ô khung hình đầu', 'First-frame slot'), detail: t('Chờ ảnh thu nhỏ hiện ra', 'Wait for the thumbnail') },
      { label: t('Thiết lập', 'Settings'), detail: t('16:9 · gần 5 giây · xem giá', '16:9 · about 5 seconds · check price') },
      { label: t('Trong ngân sách?', 'Within budget?'), detail: t('Có: tạo một lượt. Không: dừng lại.', 'Yes: generate once. No: stop.') },
    ],
    caption: t('Đây là sơ đồ, không phải giao diện thật. Tên nút và lựa chọn tùy nhà cung cấp. Kiểm tra model, chế độ, ảnh và giá trên màn hình của bạn; đến bước này chưa có video nào được tạo.', 'This is a schematic, not a real interface. Names and options vary by provider. Check the model, mode, image and price in your own interface; no video has been generated at this point.'),
  });
  attach('review', 1, {
    kind: 'cut', title: t('Lấy ảnh tại điểm bạn cắt', 'Export a frame at your chosen cut'),
    items: [
      { label: t('Đoạn giữ lại', 'Keep this section'), detail: t('Xem và chọn đoạn dùng được', 'Review and select the usable section') },
      { label: t('Điểm cắt', 'Cut point'), detail: t('Dừng tại khung hình rõ', 'Pause on a clear frame') },
      { label: t('Đoạn bỏ', 'Trimmed tail'), detail: t('Không lấy khung cuối của file này', 'Do not use the file’s last frame') },
      { label: t('Ảnh cho shot sau', 'Image for next shot'), detail: 'shot-01-end.png' },
    ],
    caption: t('Lấy ảnh tại điểm kết thúc của đoạn bạn giữ, rồi dùng ảnh đó làm khung đầu cho shot tiếp theo. Các ô trên chỉ minh họa; đây không phải một clip đã tạo.', 'Export the frame at the end of the section you keep, then use it as the next shot’s starting image. The blocks are illustrative; they are not a generated clip.'),
  });
}
