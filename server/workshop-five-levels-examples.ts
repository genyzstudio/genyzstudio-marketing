import type { LessonStep } from '../content/workshop/types';

// Each entry is added only after generating with the exact Vietnamese step prompt
// and visually reviewing the saved image. No still image validates video motion.
export function fiveLevelExamples(locale: 'vi' | 'en'): Record<string, NonNullable<LessonStep['testedExample']>> {
  const t = (vi: string, en: string) => locale === 'vi' ? vi : en;
  return {
    'references:0': {
      image: '/api/workshop/examples/repairer-front-vi-v1.png', width: 1145, height: 1374,
      alt: t('Nhân vật thợ sửa đèn hư cấu nhìn chính diện, áo chàm và tạp dề be.', 'A fictional repairer facing forward in an indigo jacket and beige apron.'),
      tool: 'imagegen', date: '2026-10-13',
      review: t("Đã tạo bằng câu lệnh tiếng Việt. Ảnh cho thấy rõ khuôn mặt chính diện, tóc ngắn, áo chàm xắn tay và tạp dề be. Nền đơn giản, không có chữ hay logo. Công cụ tự chọn một nhân vật nam vì câu lệnh chưa chỉ định giới tính. Có thể lưu ảnh này để làm ảnh tham chiếu cho nhân vật ở các bài sau.", 'Generated with the Vietnamese prompt. Clear frontal face, short hair, rolled indigo sleeves, beige apron and a plain background; no lettering or logo. The tool chose a male character because gender was unspecified. This image can serve as the identity reference for later exercises.'),
    },
    'references:2': {
      image: '/api/workshop/examples/lantern-close-vi-v1.png', width: 1672, height: 941,
      inputImage: '/api/workshop/examples/lantern-vi-v1.png', inputWidth: 1672, inputHeight: 941,
      alt: t('Ảnh gần chiếc đèn đồng đang tắt, mép trên của quai và đáy đèn nằm ngoài khung.', 'Close-up of the unlit brass lantern, with the top handle edge and base outside the frame.'),
      tool: 'imagegen', date: '2026-10-13',
      review: t("Đã dùng ảnh đèn ở Cấp 1 làm đầu vào và chạy câu lệnh tiếng Việt. Kết quả là cảnh gần hơn, giữ được thiết kế chiếc đèn, trạng thái đèn tắt và ánh sáng xanh từ bên trái. Phần trên của quai và đáy đèn nằm ngoài khung hình: chưa phù hợp nếu cần thấy toàn bộ sản phẩm. Muốn giữ trọn đèn, thử thêm “để toàn bộ quai và đáy nằm trong ảnh, chừa khoảng trống quanh đèn”; câu sửa này chưa chạy thử.", 'Tested with the Level 1 lantern image and the Vietnamese prompt. The result is tighter and retains the lantern type, unlit state and left-side blue light. The handle and base are cropped, so it is unsuitable when the whole product must be visible. A possible revision is to request the entire handle and base with margins; that revision has not been tested.'),
    },
    'reference-pack:0': {
      image: '/api/workshop/examples/repairer-angle-vi-v1.png', width: 1145, height: 1374,
      inputImage: '/api/workshop/examples/repairer-front-vi-v1.png', inputWidth: 1145, inputHeight: 1374,
      alt: t('Cùng nhân vật thợ sửa đèn, vai và mặt xoay nhẹ, vẫn thấy cả hai mắt.', 'The same fictional repairer with shoulders and face slightly turned, both eyes visible.'),
      tool: 'imagegen', date: '2026-10-13',
      review: t("Đã dùng chân dung chính diện làm đầu vào và chạy câu lệnh tiếng Việt. Khuôn mặt, tóc, áo và tạp dề vẫn nhận ra được. Vai xoay nhiều hơn khuôn mặt, nên kết quả chưa thể hiện rõ góc nhìn 3/4. Nếu muốn góc xoay rõ hơn, thử ghi “xoay cả đầu khoảng 35–45 độ, không chỉ xoay vai”; câu sửa này chưa chạy thử. Ảnh này không kiểm chứng chuyển động quay đầu trong video.", 'Tested with the frontal portrait and Vietnamese prompt. Face, hair, jacket and apron remain recognizable. The shoulders turn more than the face; this is a slight turn, not a strong three-quarter view. An untested revision is to request a 35–45 degree head turn rather than only turning the shoulders. This still does not validate a head-turn animation.'),
    },
    'story:2': {
      image: '/api/workshop/examples/lantern-vi-v1.png', width: 1672, height: 941,
      alt: t('Đèn đồng đang tắt trên bàn gỗ, ánh sáng xanh từ cửa sổ bên trái.', 'An unlit brass lantern on a wooden bench, lit by a blue window on the left.'),
      tool: 'imagegen', date: '2026-10-13',
      review: t("Đã tạo bằng đúng câu lệnh tiếng Việt ở trên. Ảnh có một đèn đồng đang tắt, quai tròn, phần kính hình trụ và cửa sổ bên trái. Công cụ chọn kiểu đèn dầu; prompt không chỉ định bóng điện. Ảnh khá tối nhưng vẫn thấy rõ hình dáng chiếc đèn. Sau khi dùng làm ảnh mở đầu, bạn cần xem lại video để kiểm tra quá trình đèn sáng lên.", 'Generated with the exact Vietnamese prompt above. One unlit brass lantern, round handle, cylindrical glass and left window are visible. The tool chose an oil-lamp design; the prompt did not specify an electric bulb. The image is dark but the lantern is readable. This is a start image, not proof of successful animation.'),
    },
  };
}
