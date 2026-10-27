import type { Curriculum } from './workshop-content';

/** Vietnamese teaching copy only. Prompts, evidence, filenames and English content stay intact. */
export function polishSeedanceVietnamese(course: Curriculum): void {
  const preparation = course.preparation;
  preparation.intro = 'Bạn sẽ bắt đầu với câu chuyện “Ai đang gọi mình?” và làm quen với các công cụ. Bài 2 hướng dẫn tạo nhân vật; bài 3 chuẩn bị bối cảnh và khung hình đầu; bài 4 viết prompt. Đến bài 5, bạn mới tạo clip đầu tiên từ những gì đã chuẩn bị. Cuối khóa, bạn sẽ thử thay đổi một chi tiết rồi lên ý tưởng cho phim của riêng mình. Bạn không cần biết lập trình. Thời gian ghi trong khóa chỉ để bạn sắp xếp lịch học.';
  const prep = [
    'Nếu có quyền dùng Seedance 2.5 và có ngân sách, bạn có thể tạo video và ghi lại kết quả sau mỗi lần thử. Nếu chưa có lượt tạo, bạn vẫn làm được ảnh, prompt và storyboard; sau đó ghép ảnh tĩnh thành một bản dựng nháp theo thời gian, gọi là animatic. Hãy ghi “chưa thử video” cho các phần chưa thực hiện. Animatic giúp bạn luyện kể chuyện, nhưng chưa cho thấy bạn đã tạo được video. Dấu hoàn thành chỉ dùng để theo dõi tiến độ, không phải chứng chỉ.',
    'Mỗi công cụ có một việc: dùng ChatGPT hoặc Claude để viết, Codex hoặc Nano Banana để tạo ảnh, Seedance để tạo video và CapCut để dựng. Bạn chỉ cần chọn một trợ lý viết và một công cụ tạo ảnh phù hợp với tài khoản của mình.',
    'Chuẩn bị máy tính, một nơi lưu file, tài khoản công cụ và khoản tiền bạn sẵn sàng chi. Ở bài 1, bạn sẽ kiểm tra công cụ trước khi tạo. Mỗi bước đều ghi rõ cần dùng gì và lưu file ở đâu. Bạn có thể tải sổ thực hành ở thanh bên để giữ hướng dẫn và prompt. Mỗi lần yêu cầu AI, chỉ sao chép một bản tiếng Việt hoặc tiếng Anh.',
    'Làm các bước chính, đối chiếu với danh sách kiểm tra rồi đánh dấu hoàn thành. Các prompt thực hành chưa được chạy thử thành video; ảnh GPT Image và câu trả lời của Claude có ghi rõ nguồn. Bài có nhãn “Tùy chọn” không bắt buộc. Nếu hết ngân sách, bạn có thể dùng ảnh tĩnh để dựng nháp.',
    'Khóa học được cập nhật ngày 26–27/10/2026. Dấu hoàn thành cũ vẫn còn, nhưng các bài tập mới có thể khác trước. Hãy xem lại từ bài 1 và kiểm tra từng bài; bạn có thể bỏ dấu rồi đánh dấu lại sau khi thực hành. Tiến độ của các khóa khác không bị ảnh hưởng.',
  ];
  preparation.steps.forEach((step, i) => { if (prep[i]) step.text = prep[i]; });
  preparation.steps[0].heading = 'Chọn cách học phù hợp';
  preparation.note = 'Các ảnh thực hành được tạo bằng GPT Image trong Codex. Video minh họa Seedance 2.5, ví dụ lỗi và bản sửa, cùng buổi thử khóa học với người mới vẫn chưa được thực hiện. Tính năng có thể khác nhau giữa các nhà cung cấp; trước khi tạo, hãy kiểm tra model, chế độ, đầu vào và giá trên màn hình của bạn.';

  const revisions: Record<string, Record<number, { title?: string; instruction: string }>> = {
    story: {
      1: { title: 'Tạo thư mục để lưu bài', instruction: 'Tạo thư mục GenYZ-Lan. Bên trong, tạo các thư mục 00-project, 01-character, 02-location, 03-prompts, 04-clips, 05-edit và 06-delivery. Tạo thêm 04-clips/frames và 05-edit/audio. Trước khi bấm Tạo, xem chi phí đang hiển thị và quyết định mức bạn sẵn sàng chi. Bạn không cần lập bảng hay tạo file ghi ngân sách.' },
      2: { title: 'Lên câu chuyện cho ba shot', instruction: 'Mở một cuộc trò chuyện mới với ChatGPT hoặc Claude. Chọn một prompt bên dưới, tiếng Việt hoặc tiếng Anh, rồi dán vào cuộc trò chuyện. Trong câu chuyện mẫu “Ai đang gọi mình?”, Lan đến chòi, chiếc đèn sáng lên và cô nhìn ra con đường xuống thung lũng. Đọc bảng AI trả lời và bỏ những nhân vật hoặc sự kiện nó tự thêm. Dùng tỷ lệ 16:9 cho cả dự án. Trước tiên, hãy hướng tới một clip dùng được; phim cuối có thể dài khoảng 15–30 giây hoặc ngắn hơn nếu câu chuyện vẫn rõ. Kiểm tra lại các thư mục đã tạo ở bước 2, sao chép ảnh mẫu vào đúng nơi và giữ file gốc. Thêm -v02 vào tên bản sửa. Dòng “Lưu lại” ở cuối mỗi bước cho biết nơi đặt file, không phải lệnh cần gõ.' },
    },
    references: {
      0: { title: 'Chọn ảnh chuẩn của nhân vật', instruction: 'Dùng ảnh chân dung để đối chiếu khuôn mặt. Ảnh toàn thân giúp kiểm tra tỷ lệ, trang phục và ba lô; bảng nhiều góc giúp bạn so sánh các góc nhìn, nhưng không dùng nguyên bảng làm ảnh đầu của video. Tải từng ảnh mẫu bên dưới rồi so đường chân tóc, dáng mặt, mắt, bím tóc, cổ áo và dây ba lô. Bộ ZIP đầy đủ ở bài 7 dành cho học viên đã đăng ký hoặc khi toàn bộ khóa được mở công khai. Một ảnh có màu áo giống chưa chắc đã giữ đúng người. Khi tạo góc mới, hãy quay lại ảnh chuẩn đã duyệt thay vì dùng nối tiếp một ảnh đã bị lệch.' },
      2: { title: 'Tạo bảng nhân vật toàn thân', instruction: 'Trong cuộc trò chuyện tạo ảnh, đính kèm lại lan-portrait.png bằng nút tải file hoặc kéo thả, rồi dán prompt tạo bảng nhiều góc. So mắt, mũi, bím tóc, áo và ba lô của từng góc với ảnh chân dung. Góc sau không cần thấy mặt. Nếu các góc trông như hai người khác nhau, hãy tạo lại. Khi đã chọn được một bảng phù hợp, tải về và lưu thành lan-turnaround.png.' },
    },
    planning: {
      0: { title: 'Vẽ sơ đồ chòi và hướng di chuyển', instruction: 'Trước khi tạo thêm góc nhìn, ghi lại vị trí các vật: ghế sát vách bên phải, cây bên trái lối vào, con đường xuống thung lũng và đường Lan đi tới ghế. Vẽ sơ đồ nhìn từ trên xuống: một hình chữ nhật cho chòi, một nét cho ghế, một chấm cho Lan và mũi tên chỉ đường đi. Đường nối Lan với ghế được gọi là trục hành động. Đặt camera A ở một bên trục, camera B cũng ở bên đó nhưng gần hơn. Nếu chuyển camera sang phía đối diện, hướng di chuyển trên màn hình có thể bị đảo. Đây là sơ đồ để lên kế hoạch, không phải bản đo chính xác từ ảnh AI. Ở shot Lan nhìn ra thung lũng, mặt cô có thể bị che. Bạn có thể chủ ý giữ góc đó hoặc chọn góc nghiêng để thấy một phần mặt; đừng đánh giá khuôn mặt ở khung hình không thấy mặt.' },
    },
    frames: {
      0: { title: 'Một prompt video cần những gì?', instruction: 'Hãy mô tả những điều người xem cần thấy: ảnh được dùng làm gì, cảnh bắt đầu ra sao, nhân vật làm gì, camera hoạt động thế nào và những chi tiết nào cần giữ ổn định. Thêm điểm kết thúc hoặc âm thanh khi cần; không phải shot nào cũng cần mọi mục. Chọn thời lượng và độ phân giải trong giao diện. Viết “8K masterpiece” không thay được thiết lập, còn “cinematic” chưa cho biết nhân vật làm gì. Dùng bảng bên dưới để bỏ câu thừa và tìm những yêu cầu mâu thuẫn.' },
      2: { title: 'Đính kèm ảnh và nhờ AI viết prompt', instruction: 'Trong cùng cuộc trò chuyện, bấm dấu + hoặc kéo shot-01-start.png vào ô nhập. Chờ ảnh thu nhỏ xuất hiện rồi dán yêu cầu cho shot 1. Đọc lại phần AI mô tả vai trò của ảnh: đây là ảnh mở đầu của cảnh, không phải một nhân vật mới hay một video. Nếu dùng nhiều ảnh, hãy ghi tên và vai trò của từng file.' },
      6: { title: 'Xem một ví dụ viết prompt với Claude', instruction: 'Trong ví dụ này, Claude Code nhận bản mô tả bằng chữ: Lan đứng ở lối vào, đèn tắt trên ghế, bước hai bước nhỏ về phía ghế rồi dừng; camera cố định; 5 giây, 720p, 16:9. Claude không xem ảnh và không chạy Seedance. Bên dưới là bản dịch tiếng Việt của câu trả lời thật; bản tiếng Anh gốc được lưu trong hồ sơ biên tập. Codex đã rà những chi tiết Claude tự thêm và sửa lại theo bản mô tả. Ví dụ này cho thấy cách tạo và chỉnh prompt bằng chữ; khóa học chưa có video được tạo từ lượt trao đổi đó.' },
    },
    motion: {
      5: { title: 'Tìm nguyên nhân trước khi tạo lại', instruction: 'Trước khi tạo thêm, dùng bảng bên dưới để xem lỗi đã có trong ảnh đầu hay chỉ xuất hiện khi video chạy. Xem clip ở tốc độ bình thường, rồi xem từng khung nếu cần tìm thời điểm bắt đầu lỗi. Mỗi lượt chỉ đổi một yếu tố để dễ so sánh. Khóa học đặt giới hạn ba lượt cho mỗi shot; đây là mức tối đa, không bảo đảm ba lượt sẽ đủ. Khi hết ngân sách, bạn có thể giữ đoạn tốt, dùng ảnh tĩnh hoặc đơn giản hóa cảnh. Chọn một ngôn ngữ prompt và giữ ổn định giữa các lượt; nếu đổi ngôn ngữ, ghi lại trong nhật ký. Khóa học chưa so sánh ngôn ngữ nào cho kết quả tốt hơn. Trước khi tạo, ghi ảnh đầu, chế độ, file prompt, thời lượng, tỷ lệ, độ phân giải, giá và số lượt còn lại. Khi có video, thêm tên file, thời điểm lỗi và quyết định giữ, cắt hay sửa.' },
    },
    review: {
      0: { title: 'Kiểm tra tính liên tục giữa các cảnh', instruction: 'Trước khi tạo shot tiếp theo, lập bảng ghi nhân vật và đồ vật đang ở đâu, đèn đang tắt hay sáng. Ảnh dùng để nối phải lấy đúng tại điểm cắt bạn chọn. Nếu đã bỏ đoạn cuối của clip, đừng lấy khung cuối của file gốc. Trong câu chuyện này, đèn tắt suốt shot 1, sáng lên ở shot 2 và vẫn sáng ở shot 3. Nếu chưa có video, hãy dùng ba ảnh đã duyệt làm storyboard hoặc animatic, điền bảng với nhãn “dự kiến” rồi chuyển sang bài 7. Khi đó, bạn chưa kiểm tra được chuyển động và điểm nối giữa các video.' },
      1: { title: 'Lưu khung hình ở điểm cắt', instruction: 'Trong CapCut Desktop, tạo dự án GenYZ-Lan. Chọn Import, đưa clip shot 1 vào dự án rồi kéo xuống timeline. Giữ dự án này để nối các cảnh và dựng tiếp ở bài 7. Di chuyển vạch phát đến một khung rõ gần cuối đoạn bạn định giữ. Nếu phiên bản CapCut có Export still frame, dùng chức năng đó. Nếu không, phóng to khung xem, dừng đúng khung, chụp màn hình rồi cắt bỏ viền và nút điều khiển; đừng kéo giãn ảnh. Đánh dấu đúng vị trí vừa lấy ảnh làm điểm cắt cuối của shot 1.' },
    },
    delivery: {
      0: { title: 'Chọn bản bạn sẽ hoàn thành', instruction: 'Nếu đã có video, bạn sẽ dựng các clip đã duyệt. Nếu chưa tạo video, hãy kéo ba ảnh vào timeline, để mỗi ảnh khoảng 3–5 giây rồi nối bằng các điểm cắt đơn giản. Xuất bản này dưới dạng animatic và thêm ANIMATIC vào tên file. Các bước nhập, cắt và xuất bên dưới cũng áp dụng cho ảnh tĩnh. Ghi rõ bạn chưa thử phần tạo video. Trong thư mục 06-delivery, lưu bản xuất, README, danh sách đầu vào và nhật ký. Giữ lại các file gốc khi dựng.' },
      6: { title: 'Tự đánh giá bài làm', instruction: 'Dùng thang 0–3 bên dưới để xem lại từng tiêu chí. Với phần chưa thực hiện, ghi N/A (chưa đánh giá), không chấm điểm theo cảm giác. Phần chuẩn bị đạt khi Brief, Tham chiếu, Prompt và Dựng đều từ 2 điểm trở lên. Phần video chỉ đạt khi Chuyển động, Liên tục và Sửa lỗi & chi phí đều từ 2 điểm trở lên, có clip thật và mốc giây để đối chiếu. Nếu chưa có clip, ghi “phần video chưa đánh giá”; N/A không được tính là đạt. Để đánh giá khả năng làm độc lập, bạn cần một đồ án mới và giải thích được các lựa chọn của mình. Đây là thang tự đánh giá của khóa, chưa được kiểm định qua nghiên cứu với người học và không thay cho chứng chỉ nghề. Trước khi hoàn thành, mở 06-delivery trong Finder hoặc File Explorer, kiểm tra file MP4, project-note, export-notes, prompt đã dùng và danh sách ảnh/clip đầu vào. Nếu nộp animatic, thêm ANIMATIC vào tên file và ghi rõ shot nào chưa có video.' },
    },
  };
  for (const lesson of course.lessons) {
    for (const [index, revision] of Object.entries(revisions[lesson.id] ?? {})) {
      const step = lesson.steps[Number(index)];
      if (!step) throw new Error(`Missing Seedance lesson step ${lesson.id}/${index}`);
      if (revision.title) step.title = revision.title;
      step.instruction = revision.instruction;
    }
    // Keep provider names, prompt bodies and saved filenames untouched. These
    // substitutions apply only to the explanatory text shown to learners.
    for (const lab of lesson.techniques ?? []) {
      const phrases: [string, string][] = [
        ['mỗi mode', 'mỗi chế độ'], ['một mode', 'một chế độ'],
        ['Chọn mode', 'Chọn chế độ'], ['Nếu mode', 'Nếu chế độ'],
        ['các take', 'các lượt tạo'], ['một take', 'một lượt tạo'],
        ['đầu vào là gì', 'cần chuẩn bị gì'], ['đường chuẩn bị', 'phần chuẩn bị'],
      ];
      const polish = (text: string) => phrases.reduce((value, [from, to]) => value.replaceAll(from, to), text);
      lab.goal = polish(lab.goal);
      lab.input = polish(lab.input);
      lab.check = polish(lab.check);
      lab.fix = polish(lab.fix);
      for (const step of lab.steps) step.instruction = polish(step.instruction);
    }
  }
  const references = course.lessons.find(lesson => lesson.id === 'references');
  if (references) references.steps[4].instruction += ' Với mỗi bản v02, chỉ sửa một loại lỗi, chẳng hạn tóc hoặc bàn tay. So v02 với v01 ở cùng kích thước, ghi lại điều đã thay đổi rồi chọn ảnh chuẩn cho shot. Đừng dùng một ảnh còn lỗi nhỏ cho nhiều shot vì lỗi có thể lặp lại trong cả phim.';
}
