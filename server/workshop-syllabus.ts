import { getPipeline, pipelineCopy } from '../content/pipeline';

const details = {
  story: { minutes: 20, summary: 'Biến một ý tưởng nhỏ thành câu chuyện có mở đầu, thay đổi và kết thúc.', output: 'Kịch bản 20 giây, 4 shot' },
  references: { minutes: 30, summary: 'Chốt chiếc thuyền, bối cảnh và phong cách để các cảnh cùng một thế giới.', output: '2 ảnh tham chiếu + mô tả cố định' },
  planning: { minutes: 25, summary: 'Vẽ nháp câu chuyện, chọn góc nhìn và tính thời gian trước khi tạo video.', output: 'Bảng 4 cảnh theo thứ tự' },
  frames: { minutes: 40, summary: 'Tạo từng ảnh đầu vào sạch, đúng bố cục và giữ nguyên chiếc thuyền.', output: '4 khung hình đầu vào' },
  motion: { minutes: 40, summary: 'Cho ảnh chuyển động bằng một hành động rõ ràng trong mỗi shot.', output: '4 clip thử + prompt đã dùng' },
  review: { minutes: 20, summary: 'Tìm đoạn dùng được, ghi lỗi và sửa đúng một vấn đề mỗi lần.', output: 'Danh sách clip được chọn' },
  edit: { minutes: 30, summary: 'Nối các cảnh, cắt đoạn lỗi và tạo nhịp kể chuyện trong CapCut.', output: 'Bản dựng hình khoảng 20 giây' },
  sound: { minutes: 25, summary: 'Thêm tiếng nước, nhạc nhẹ và lời dẫn tuỳ chọn; nghe để cân bằng.', output: 'Bản dựng có âm thanh' },
  delivery: { minutes: 20, summary: 'Xuất file, xem lại và chuẩn bị tiêu đề, mô tả trước khi chia sẻ.', output: 'Phim MP4 + bảng kiểm cuối' },
};
export const workshopSyllabus = getPipeline('en').map(step => ({
  id: step.id, title: step.title, phase: step.phase, ...details[step.id],
}));
export const workshopPhases = pipelineCopy.en.phases;
export const workshopTools = [
  { name: 'Gemini', href: 'https://gemini.google.com/', purpose: 'Viết kịch bản và tạo ảnh tham chiếu. Bạn cũng có thể dùng công cụ chat/tạo ảnh quen thuộc.' },
  { name: 'Google Flow', href: 'https://flow.google/', purpose: 'Tạo video từ ảnh. Cần tài khoản có quyền sử dụng và đủ lượt tạo (credit).' },
  { name: 'CapCut', href: 'https://www.capcut.com/', purpose: 'Ghép clip, thêm âm thanh và xuất phim. Dùng bản máy tính để dễ thao tác.' },
];
export const workshopGlossary = [
  ['Prompt', 'Câu lệnh bạn nhập để mô tả điều muốn AI tạo.'],
  ['Shot', 'Một cảnh quay liên tục, trước khi cắt sang góc khác.'],
  ['Frame', 'Một ảnh đơn lẻ trong video; ở đây thường là khung hình đầu vào.'],
  ['Reference', 'Ảnh tham chiếu giúp giữ hình dáng, màu sắc và phong cách.'],
  ['Storyboard', 'Bảng tranh nháp kể câu chuyện theo thứ tự.'],
  ['Take', 'Một lần tạo thử của cùng một shot.'],
  ['Timeline', 'Dòng thời gian để xếp và cắt clip trong phần mềm dựng.'],
  ['Credit', 'Lượt/điểm sử dụng công cụ AI. Trong phần cuối phim, credits còn có nghĩa là phần ghi công.'],
];

export const workshopPreparation = {
  title: "Chuẩn bị trước buổi học",
  intro: "Hướng dẫn bằng tiếng Việt; tên module, thuật ngữ và nhãn công cụ giữ nguyên tiếng Anh. Prompt dùng tiếng Anh, với yêu cầu đầu ra tiếng Việt khi cần lời dẫn hoặc văn bản cho phim. Bạn chưa cần biết dựng phim hay viết prompt.",
  steps: [
    { heading: "Một máy tính, tai nghe và thư mục dự án.", text: "Đặt tên thư mục Chiec-thuyen-nho; tạo các thư mục con frames, clips, exports. Điện thoại dùng để đọc bài và xem bản xuất." },
    { heading: "Đăng nhập công cụ bằng tài khoản của bạn.", text: "Quyền sử dụng và số lượt tạo phụ thuộc tài khoản. Mã workshop chỉ mở bài học, không bao gồm phí công cụ AI. Kiểm tra chi phí hiển thị trước mỗi lần tạo." },
    { heading: "Học một module, lưu một đầu ra.", text: "Dán prompt vào đúng công cụ được ghi ở mỗi bước. Đọc lại kết quả AI, lưu file, rồi tự kiểm tra. Dành khoảng 4–5 giờ thực hành; thời gian chờ tạo và sửa có thể kéo dài hơn." },
    { heading: "Giữ bài đầu thật đơn giản.", text: "Phim “Chiếc thuyền nhỏ”, 4 cảnh, khoảng 20 giây, khung ngang 16:9. Không cần người thật, đồng bộ môi hay giọng nhân bản. Có thể dựng bằng ảnh tĩnh nếu chưa có lượt tạo video." },
  ],
  note: "Tên nút và tính năng công cụ có thể thay đổi. Tìm chức năng tương đương; nếu chưa có quyền truy cập, dừng để kiểm tra tài khoản thay vì mua gói theo phỏng đoán.",
};
